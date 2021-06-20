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

function getMissingRequiredParameterErrors(
  paramsModel: ParamModel[],
  namesOfParamsInRequest: string[],
  paramSectionName: string
): ValidationError[] {
  const namesOfRequiredParams = paramsModel.filter((paramModel) => paramModel.required).map((paramModel) => paramModel.name);

  const namesOfMissingParams = namesOfRequiredParams.filter(
    (requiredParamName) => !namesOfParamsInRequest.includes(requiredParamName)
  );

  return namesOfMissingParams.map((nameOfMissingParam) => ({
    field: `${paramSectionName}.${nameOfMissingParam}`,
    abnormality: "Field marked as required but is missing.",
  }));
}

function getExtraParameterErrors(
  namesOfParamsInRequest: string[],
  namesOfParamsInModel: string[],
  paramSectionName: string
): ValidationError[] {
  const namesOfExtraParams = namesOfParamsInRequest.filter((requestParam) => !namesOfParamsInModel.includes(requestParam));

  return namesOfExtraParams.map((nameOfExtraParam) => ({
    field: `${paramSectionName}.${nameOfExtraParam}`,
    abnormality: "Extra param, does not appear in the model.",
  }));
}

function getParameterTypeErrors(
  paramsModel: ParamModel[],
  namesOfParamsInModel: string[],
  namesOfParamsInRequest: string[],
  paramsInRequest: Param[],
  paramSectionName: string
): ValidationError[] {
  const paramNameToModel = new Map(paramsModel.map((paramModel) => [paramModel.name, paramModel]));
  const namesOfParamsinBothModelAndRequest = namesOfParamsInModel.filter((item) => namesOfParamsInRequest.includes(item));
  const paramsThatCanBeValidated = paramsInRequest.filter((param) => namesOfParamsinBothModelAndRequest.includes(param.name));

  const paramsWithInvalidType = paramsThatCanBeValidated.filter((requestParam) => {
    const paramModel = paramNameToModel.get(requestParam.name)!;
    return paramModel.types.every((type) => !validate[type](requestParam.value));
  });

  return paramsWithInvalidType.map((requestParamWithInvalidType) => ({
    field: `${paramSectionName}.${requestParamWithInvalidType.name}`,
    abnormality: "value does not match the model's type",
  }));
}
