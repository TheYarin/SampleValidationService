//#region Model types

export const SUPPORTED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];
type ParamType = "Int" | "String" | "Boolean" | "Date" | "Email" | "UUID" | "Auth-Token";

export type ParamModel = {
  name: string;
  types: ParamType[];
  required: boolean;
};

export type Model = {
  path: string;
  method: string;
  query_params: ParamModel[];
  headers: ParamModel[];
  body: ParamModel[];
};

//#endregion

//#region actual request types

export type Param = {
  name: string;
  value: any;
};

export type RequestToValidate = {
  path: string;
  method: string;
  query_params: Param[];
  headers: Param[];
  body: Param[];
};

//#endregion

export type ValidationError = { field: string; abnormality: string };
