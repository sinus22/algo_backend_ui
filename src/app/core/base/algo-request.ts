import {HttpMethod} from '@app/core/base/http-method';
import {deepCopy} from '@app/core/base/deep-copy';
import urlJoin from "url-join";

type ResponseType = 'json' | 'blob';

function equalsCheck(obj1: any, obj2: any) {
  return JSON.stringify(obj1) == JSON.stringify(obj2);
}

function filterRangeObjects(data: object) {
  if (!(data instanceof Object)) return data
  let newData: any = {}
  for (let key of Object.keys(data)) {
    const lastTwo = key.substring(key.length - 2);
    let value = data[key];

    if (lastTwo.charAt(0) == '_' && '0' <= lastTwo.charAt(1) && lastTwo.charAt(1) <= '9') {
      key = key.substring(0, key.length - 2);
    }


    if (key === 'sort' && typeof value == 'string') {
      if (/_\d+/.test(value)) {
        value = value.replace(/_\d+/, '')
      }
    }

    if (
      value instanceof Object &&
      equalsCheck(Object.keys(value), ['from', 'to'])
    ) {
      newData[key + 'From'] = value.from
      newData[key + 'To'] = value.to
    } else {
      newData[key] = value
    }
  }
  return newData
}

export class AlgoRequestOptions {
  constructor(
    public params?: any,
    public headers?: any,
    public body?: any,
    public responseType: ResponseType = 'json',
    public contentType = 'application/json',
  ) {
  }
}

export class AlgoRequest {
  constructor(
    private url: string,
    private method: HttpMethod,
    private options: AlgoRequestOptions = {
      params: {},
      body: {},
      headers: {},
      responseType: 'json',
      contentType: 'application/json',
    }
  ) {
    this.updateParams(options.params)
    this.updateBody(options.body)
  }

  updateUrl(newUrl: string): void {
    this.url = newUrl
  }

  updateHeaders({newHeader}: { newHeader: any }): void {
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
    this.options.params = {
      ...this.options.params,
      ...filterRangeObjects(params),
    }

    for (const key in this.options.params) {
      if (
        this.options.params[key] === null ||
        this.options.params[key] === '' ||
        this.options.params[key] === ' ' ||
        (this.options.params[key] === null && this.options.params.page != 0)
      ) {
        delete this.options.params[key]
      }
    }
  }

  clearParams() {
    this.options.params = {}
  }

  getHeaders() {
    return this.options.headers ? deepCopy(this.options.headers) : null;
  }

  setBody(body: any) {
    this.options.body = body;
  }

  updateBody(body: object, clear = true) {
    if (clear) this.clearBody()
    this.options.body = {
      ...this.options.body,
      ...body,
    }
  }

  clearBody() {
    this.options.body = {}
  }

  clone() {
    return new AlgoRequest(this.getUrl(), this.getMethod(), new AlgoRequestOptions(
      this.getParams(),
      this.getHeaders(),
      this.getBody(),
      this.getResponseType(),
      this.getContentType(),
    ));
  }

  getParams() {
    return deepCopy(this.options.params);
  }

  setParam(key: string, value: any) {
    return this.setParams({[key]: value});
  }

  setParams(params: object) {
    const request = this.clone();
    request.updateParams(params);
    return request;
  }

  removeParam(key: string) {
    const request = this.clone();
    const params = request.getParams();
    delete params[key];
    request.updateParams(params);
    return request;
  }

  removeParams(...keys: string[]) {
    const request = this.clone();
    const params = request.getParams();
    for (const key of keys) {
      delete params[key];
    }
    request.updateParams(params);
    return request;
  }

  _clearParams() {
    const request = this.clone();
    request.updateParams({});
    return request;
  }

  getUrl(): string {
    return this.url
  }

  setUrl(url: string) {
    const request = this.clone();
    request.updateUrl(url);
    return request;
  }

  getMethod(): HttpMethod {
    return this.method
  }

  setMethod(method: HttpMethod) {
    const request = this.clone();
    request.updateMethod(method);
    return request;
  }

  getBody() {
    return this.options.body;
  }

  _setBody(key: string, value: any) {
    const request = this.clone();
    request.updateBody({[key]: value}, false);
    return request;
  }

  _clearBody() {
    const request = this.clone();
    request.updateBody({});
    return request;
  }
}

export class AlgoGetRequest extends AlgoRequest {
  constructor(url: string | Array<string | number>, params?: object) {
    if (Array.isArray(url)) {
      url = urlJoin(...url.map(value => value.toString()));
    }

    super(url, 'get', new AlgoRequestOptions({...params}))
  }
}

export class AlgoTableRequest extends AlgoGetRequest {
  constructor(url: string | Array<string | number>, params?: object) {
    if (Array.isArray(url)) {
      url = urlJoin(...url.map(value => value.toString()));
    }

    super(url, params);
  }
}

export class AlgoPostRequest extends AlgoRequest {
  constructor(url: string | Array<string | number>, body: object) {
    if (Array.isArray(url)) {
      url = urlJoin(...url.map(value => value.toString()));
    }

    super(url, 'post', new AlgoRequestOptions({}, {}, body))
  }
}

export class AlgoPatchRequest extends AlgoRequest {
  constructor(url: string | Array<string | number>, body: object) {
    if (Array.isArray(url)) {
      url = urlJoin(...url.map(value => value.toString()));
    }

    super(url, 'patch', new AlgoRequestOptions({}, {}, body))
  }
}

export class AlgoDeleteRequest extends AlgoRequest {
  constructor(url: string | Array<string | number>) {
    if (Array.isArray(url)) {
      url = urlJoin(...url.map(value => value.toString()));
    }

    super(url, 'delete', new AlgoRequestOptions())
  }
}
