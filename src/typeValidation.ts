import moment from "moment";
import { ParamType } from "./Entities";

interface ITypeValidator {
  type: ParamType;
  isOfType: (value: any) => boolean;
}

const intValidator: ITypeValidator = { type: "Int", isOfType: (value) => Number.isInteger(value) };
const stringValidator: ITypeValidator = { type: "String", isOfType: (value) => typeof value === "string" };
const boolValidator: ITypeValidator = { type: "Boolean", isOfType: (value) => typeof value == "boolean" };
const dateValidator: ITypeValidator = {
  type: "Date",
  isOfType: (value) => stringValidator.isOfType(value) && moment(value, "DD-MM-YYYY", true).isValid(),
};
const emailValidator: ITypeValidator = {
  type: "Email",
  isOfType: (value) =>
    stringValidator.isOfType(value) &&
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    ), // Shamelessly copied from https://emailregex.com/
};
const uuidValidator: ITypeValidator = {
  type: "UUID",
  isOfType: (value) => stringValidator.isOfType(value) && /^[a-zA-Z\d-]+$/.test(value),
};
const authTokenValidator: ITypeValidator = {
  type: "Auth-Token",
  isOfType: (value) => stringValidator.isOfType(value) && /^Bearer [a-zA-Z\d-]+$/.test(value),
};

const listValidator: ITypeValidator = {
  type: "List",
  isOfType: (value) => {
    // If the structure gets any more complex than that, consider using a schema validation package.
    if (!Array.isArray(value)) return false;

    for (const item of value) {
      if (typeof item !== "object") return false;

      const itemKeys = Object.keys(item);
      if (itemKeys.length !== 2) return false;
      if (!itemKeys.includes("id")) return false;
      if (!itemKeys.includes("amount")) return false;
      if (!stringValidator.isOfType(item["id"])) return false;
      if (typeof item["amount"] !== "number") return false;
    }

    // TODO consider enforcing a unique ID within the list

    return true;
  },
};

const typeValidators = [
  intValidator,
  stringValidator,
  boolValidator,
  dateValidator,
  emailValidator,
  uuidValidator,
  authTokenValidator,
  listValidator,
];

const validate: { [type: string]: (value: any) => boolean } = {};

for (const typeValidator of typeValidators) {
  validate[typeValidator.type] = typeValidator.isOfType;
}

export { validate };
