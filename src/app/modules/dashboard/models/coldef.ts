export interface ColDef {
  label: string;
  key: string;
  sortable?: boolean;
  format?: (value: any) => string;
}
