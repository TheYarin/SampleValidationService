import express from "express";
import { RequestToValidate } from "./Entities";
import ValidationService from "./ValidationService";

const app = express();
app.use(express.json());
const port = 3000;

const service = new ValidationService();

app.post("/submitModels", (req, res) => {
  const models = req.body;
  service.loadModels(models);
  res.sendStatus(200);
});

app.post("/validateRequest", (req, res) => {
  // TODO gracefully handle any error that might be thrown in this function

  const requestToValidate: RequestToValidate = req.body; // Assuming the general structure of the request is valid because the request was already parsed by another internal server. Should be validated using a tool like https://github.com/woutervh-/typescript-is
  const [isValid, validationErrors] = service.validateRequest(requestToValidate);

  res.json({ isValid, validationErrors });
});
app.listen(port, () => console.log(`server is listening on ${port}`));
