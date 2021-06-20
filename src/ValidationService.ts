import { Model, RequestToValidate, SUPPORTED_METHODS, ValidationError } from "./Entities";
import { validateParameters } from "./parameterValidation";

const getModelKey = ({ method, path }: { method: string; path: string }) => `${method}|${path}`;

export default class ValidationService {
  public models: Map<string, Model> = new Map();

  public loadModels(models: Model[]) {
    for (const model of models) {
      this.models.set(getModelKey(model), model);
    }
  }

  public validateRequest(request: RequestToValidate): [boolean /*isValid*/, ValidationError[] /*validationErrors*/] {
    const validationErrors: ValidationError[] = [];
    const { method, path } = request;

    const modelKey = getModelKey({ method, path });

    if (!this.models.has(modelKey)) {
      validationErrors.push({
        field: "path/method",
        abnormality: `Encountered an unsupported path/method combination: ${path} ${method}`,
      });

      return [false, validationErrors];
    }

    if (!SUPPORTED_METHODS.includes(method)) {
      validationErrors.push({ field: "method", abnormality: "Unsupported method type" });
      console.warn(`It seems like there's a model for handling an unsupported method "${method}". That's weird.`);
    }

    const model = this.models.get(modelKey)!;

    validationErrors.push(...validateParameters(model.query_params, request.query_params, "query_params"));
    validationErrors.push(...validateParameters(model.headers, request.headers, "headers"));
    validationErrors.push(...validateParameters(model.body, request.body, "body"));

    return [validationErrors.length === 0, validationErrors];
  }
}
