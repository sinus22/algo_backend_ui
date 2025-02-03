import {HttpMethod} from '@app/core/base/http-method';
import {deepCopy} from '@app/core/base/deep-copy';
import urlJoin from "url-join";

type ResponseType = "json" | "blob";

const cleanObject = (obj: object) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v || v === 0));

const filterRangeObjects = (data: object) => {
  if (!data || typeof data !== "object") return data;
  return Object.entries(data).reduce((acc, [key, value]) => {
    key = key.replace(/_\d+$/, ""); // `_X` suffixni olib tashlash
    if (key === "sort" && typeof value === "string") {
      value = value.replace(/_\d+$/, "");
    }
    if (typeof value === "object" && value && "from" in value && "to" in value) {
      acc[key + "From"] = value.from;
      acc[key + "To"] = value.to;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};

export class AlgoRequestOptions {
  constructor(
    public params: any = {},
    public headers: any = {},
    public body: any = {},
    public responseType: ResponseType = "json",
    public contentType = "application/json"
  ) {}
}

export class AlgoRequest {
  constructor(
    private url: string,
    private method: HttpMethod,
    private options: AlgoRequestOptions = new AlgoRequestOptions()
  ) {
    this.updateParams(options.params)
    this.updateBody(options.body)
  }

  updateUrl(newUrl: string): void {
    this.url = newUrl
  }

  updateHeaders( newHeader: any ): void {
    this.options.headers = {...newHeader}
  }

  updateMethod(newMethod: HttpMethod): void {
    this.method = newMethod
  }


  getResponseType(): ResponseType {
    return this.options.responseType
  }

  getContentType() {
    return this.options.contentType;
  }

  updateResponseType(newResponseType: ResponseType) {
    this.options.responseType = newResponseType
  }

  updateContentType(newContentType: string) {
    this.options.contentType = newContentType
  }

  updateParams(params: object) {
    this.options.params = cleanObject({
      ...this.options.params,
      ...filterRangeObjects(params),
    });
  }

  clearParams() {
    this.options.params = {}
  }

  getHeaders() {
    return deepCopy(this.options.headers);
  }

  setBody(body: any) {
    this.options.body = body;
  }

  updateBody(body: object, clear = true) {
    if (clear) this.clearBody();
    this.options.body = { ...this.options.body, ...body };
  }

  clearBody() {
    this.options.body = {};
  }


  clone() {
    return new AlgoRequest(this.url, this.method, new AlgoRequestOptions(
      deepCopy(this.options.params),
      deepCopy(this.options.headers),
      deepCopy(this.options.body),
      this.options.responseType,
      this.options.contentType
    ));
  }


  setParam(key: string, value: any) {
    return this.setParams({ [key]: value });
  }

  setParams(params: object) {
    const request = this.clone();
    request.updateParams(params);
    return request;
  }

  removeParams(...keys: string[]) {
    const request = this.clone();
    keys.forEach(key => delete request.options.params[key]);
    return request;
  }

  getUrl(): string {
    return this.url;
  }

  getMethod(): HttpMethod {
    return this.method;
  }

  getBody() {
    return this.options.body;
  }
}

const formatUrl = (url: string | Array<string | number>) =>
  Array.isArray(url) ? urlJoin(...url.map(String)) : url;


export class AlgoGetRequest extends AlgoRequest {
  constructor(url: string | Array<string | number>, params?: object) {
    super(formatUrl(url), "get", new AlgoRequestOptions(params));
  }
}

export class AlgoTableRequest extends AlgoGetRequest {}

export class AlgoPostRequest extends AlgoRequest {
  constructor(url: string | Array<string | number>, body: object) {
    super(formatUrl(url), "post", new AlgoRequestOptions({}, {}, body));
  }
}

export class AlgoPatchRequest extends AlgoRequest {
  constructor(url: string | Array<string | number>, body: object) {
    super(formatUrl(url), "patch", new AlgoRequestOptions({}, {}, body));
  }
}

export class AlgoDeleteRequest extends AlgoRequest {
  constructor(url: string | Array<string | number>) {
    super(formatUrl(url), "delete");
  }
}
