import { Param, ParamModel, ValidationError } from "./Entities";
import { validate } from "./typeValidation";

export function validateParameters(
  paramsModel: ParamModel[],
  paramsInRequest: Param[],
  paramSectionName: string
): ValidationError[] {
  const validationErrors: ValidationError[] = [];

  const namesOfParamsInModel = paramsModel.map((paramModel) => paramModel.name);
  const namesOfParamsInRequest = paramsInRequest.map((requestParam) => requestParam.name);

  validationErrors.push(...getMissingRequiredParameterErrors(paramsModel, namesOfParamsInRequest, paramSectionName));

  validationErrors.push(...getExtraParameterErrors(namesOfParamsInRequest, namesOfParamsInModel, paramSectionName));

  validationErrors.push(
    ...getParameterTypeErrors(paramsModel, namesOfParamsInModel, namesOfParamsInRequest, paramsInRequest, paramSectionName)
  );

  return validationErrors;
}

function* getMissingRequiredParameterErrors(
  paramsModel: ParamModel[],
  namesOfParamsInRequest: string[],
  paramSectionName: string
): IterableIterator<ValidationError> {
  const namesOfRequiredParams = paramsModel.filter((paramModel) => paramModel.required).map((paramModel) => paramModel.name);

  const namesOfMissingParams = namesOfRequiredParams.filter(
    (requiredParamName) => !namesOfParamsInRequest.includes(requiredParamName)
  );

  for (const nameOfMissingParam of namesOfMissingParams) {
    yield {
      field: `${paramSectionName}.${nameOfMissingParam}`,
      abnormality: "Field marked as required but is missing.",
    };
  }
}

function* getExtraParameterErrors(
  namesOfParamsInRequest: string[],
  namesOfParamsInModel: string[],
  paramSectionName: string
): IterableIterator<ValidationError> {
  const namesOfExtraParams = namesOfParamsInRequest.filter((requestParam) => !namesOfParamsInModel.includes(requestParam));

  for (const nameOfExtraParam of namesOfExtraParams) {
    yield {
      field: `${paramSectionName}.${nameOfExtraParam}`,
      abnormality: "Extra param, does not appear in the model.",
    };
  }
}

function* getParameterTypeErrors(
  paramsModel: ParamModel[],
  namesOfParamsInModel: string[],
  namesOfParamsInRequest: string[],
  paramsInRequest: Param[],
  paramSectionName: string
): IterableIterator<ValidationError> {
  const paramNameToModel = new Map(paramsModel.map((paramModel) => [paramModel.name, paramModel]));
  const namesOfParamsinBothModelAndRequest = namesOfParamsInModel.filter((item) => namesOfParamsInRequest.includes(item));
  const paramsThatCanBeValidated = paramsInRequest.filter((param) => namesOfParamsinBothModelAndRequest.includes(param.name));

  for (const requestParam of paramsThatCanBeValidated) {
    const paramModel = paramNameToModel.get(requestParam.name)!;

    if (paramModel.types.every((type) => !validate[type](requestParam.value))) {
      yield {
        field: `${paramSectionName}.${requestParam.name}`,
        abnormality: "value does not match the model's type",
      };
    }
  }
}
