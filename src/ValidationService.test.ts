import ValidationService from "./ValidationService";

const validationService = new ValidationService();
validationService.loadModels([
  {
    path: "/users/info",
    method: "GET",
    query_params: [
      {
        name: "with_extra_data",
        types: ["Boolean"],
        required: false,
      },
      {
        name: "user_id",
        types: ["String", "UUID"],
        required: false,
      },
    ],
    headers: [
      {
        name: "Authorization",
        types: ["String", "Auth-Token"],
        required: true,
      },
    ],
    body: [],
  },
  {
    path: "/users/create",
    method: "POST",
    query_params: [],
    headers: [],
    body: [
      {
        name: "firstName",
        types: ["String"],
        required: true,
      },
      {
        name: "lastName",
        types: ["String"],
        required: true,
      },
      {
        name: "phone",
        types: ["String"],
        required: false,
      },
      {
        name: "email",
        types: ["String", "Email"],
        required: true,
      },
      {
        name: "username",
        types: ["String"],
        required: true,
      },
      {
        name: "password",
        types: ["String"],
        required: true,
      },
      {
        name: "address",
        types: ["String"],
        required: false,
      },
      {
        name: "dob",
        types: ["Date"],
        required: false,
      },
    ],
  },
  {
    path: "/orders/info",
    method: "GET",
    query_params: [
      {
        name: "order_id",
        types: ["String", "UUID"],
        required: false,
      },
    ],
    headers: [
      {
        name: "Authorization",
        types: ["String"],
        required: true,
      },
    ],
    body: [],
  },
  {
    path: "/orders/create",
    method: "POST",
    query_params: [],
    headers: [
      {
        name: "Authorization",
        types: ["String"],
        required: true,
      },
    ],
    body: [
      {
        name: "address",
        types: ["String"],
        required: true,
      },
      {
        name: "order_type",
        types: ["Int"],
        required: true,
      },
      {
        name: "items",
        // types: ["List"],
        types: ["String"],
        required: true,
      },
    ],
  },
  {
    path: "/orders/update",
    method: "PATCH",
    query_params: [],
    headers: [
      {
        name: "Authorization",
        types: ["String", "Auth-Token"],
        required: true,
      },
    ],
    body: [
      {
        name: "order_id",
        types: ["String", "UUID"],
        required: true,
      },
      {
        name: "address",
        types: ["String"],
        required: false,
      },
      {
        name: "order_type",
        types: ["Int"],
        required: false,
      },
      {
        name: "items",
        // types: ["List"],
        types: ["String"],
        required: false,
      },
    ],
  },
]);

test("example request #1", () => {
  const request = {
    path: "/users/info",
    method: "GET",
    query_params: [
      {
        name: "with_extra_data",
        value: false,
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Bearer 56ee9b7a-da8e-45a1-aade-a57761b912c4",
      },
    ],
    body: [],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(true);
  expect(validationErrors).toEqual([]);
});

test("example request #2", () => {
  const request = {
    path: "/users/info",
    method: "GET",
    query_params: [
      {
        name: "with_extra_data",
        value: true,
      },
      {
        name: "user_id",
        value: "d9b96787786b",
      },
    ],
    headers: [],
    body: [],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(false);
  expect(validationErrors[0].field).toBe("headers.Authorization");
});

test("example request #3", () => {
  const request = {
    path: "/users/info",
    method: "GET",
    query_params: [
      {
        name: "with_extra_data",
        value: false,
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Bearer 8aaadc6a-fe9c-4014-b425-75421022aebe",
      },
    ],
    body: [],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(true);
  expect(validationErrors).toEqual([]);
});

test("example request #4", () => {
  const request = {
    path: "/users/info",
    method: "GET",
    query_params: [
      {
        name: "user_id",
        value: "0769e264b503",
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Bearer 8c7d5996-7318-4a93-bc07-ea4734e333ce",
      },
    ],
    body: [],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(true);
  expect(validationErrors).toEqual([]);
});

test("example request #5", () => {
  const request = {
    path: "/users/create",
    method: "POST",
    query_params: [],
    headers: [],
    body: [
      {
        name: "firstName",
        value: "John",
      },
      {
        name: "lastName",
        value: "Doe",
      },
      {
        name: "phone",
        value: "0555555555",
      },
      {
        name: "email",
        value: "john@doe.test",
      },
      {
        name: "username",
        value: "john_doe",
      },
      {
        name: "password",
        value: "test",
      },
      {
        name: "address",
        value: "Test Road",
      },
      {
        name: "dob",
        value: "01-01-1980",
      },
    ],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(true);
  expect(validationErrors).toEqual([]);
});

test("example request #6", () => {
  const request = {
    path: "/users/create",
    method: "POST",
    query_params: [],
    headers: [],
    body: [
      {
        name: "lastName",
        value: "Doe2",
      },
      {
        name: "phone",
        value: "no",
      },
      {
        name: "email",
        value: "john2@doe.test",
      },
      {
        name: "username",
        value: "john_doe",
      },
      {
        name: "password",
        value: "test2",
      },
      {
        name: "address",
        value: "Test Road",
      },
      {
        name: "dob",
        value: "01-01-1980",
      },
    ],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(false);
  expect(validationErrors[0].field).toBe("body.firstName");
  expect(validationErrors[0].abnormality).toContain("missing");
});

test("example request #7", () => {
  const request = {
    path: "/users/create",
    method: "POST",
    query_params: [],
    headers: [],
    body: [
      {
        name: "firstName",
        value: "John3",
      },
      {
        name: "lastName",
        value: "Doe3",
      },
      {
        name: "phone",
        value: "0565555555",
      },
      {
        name: "email",
        value: "john3@doe3.test",
      },
      {
        name: "username",
        value: "john_doe3",
      },
      {
        name: "password",
        value: "test3",
      },
    ],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(true);
  expect(validationErrors).toEqual([]);
});

test("example request #8", () => {
  const request = {
    path: "/users/create",
    method: "POST",
    query_params: [],
    headers: [],
    body: [
      {
        name: "firstName",
        value: "John4",
      },
      {
        name: "lastName",
        value: "Doe4",
      },
      {
        name: "phone",
        value: "0555855555",
      },
      {
        name: "email",
        value: 777777,
      },
      {
        name: "username",
        value: "john_doe4",
      },
      {
        name: "password",
        value: "test4",
      },
      {
        name: "address",
        value: "Test Road",
      },
    ],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(false);
  expect(validationErrors.length).toBe(1);
  expect(validationErrors[0].field).toBe("body.email");
  expect(validationErrors[0].abnormality).toContain("does not match the model's type");
});

test("example request #9", () => {
  const request = {
    path: "/orders/info",
    method: "GET",
    query_params: [
      {
        name: "order_id",
        value: "8c7d5996-7318-4a93-bc07-ea4734e333ce",
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Bearer ebb3cbbe938c4776bd22a4ec2ea8b2ca",
      },
    ],
    body: [],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(true);
  expect(validationErrors).toEqual([]);
});

test("example request #10", () => {
  const request = {
    path: "/orders/info",
    method: "GET",
    query_params: [],
    headers: [
      {
        name: "Authorization",
        value: "Bearer ebb3cbbe938c4776bd22a4ec2ea8b2ca",
      },
    ],
    body: [],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(true);
  expect(validationErrors).toEqual([]);
});

test("example request #11", () => {
  const request = {
    path: "/orders/info",
    method: "GET",
    query_params: [
      {
        name: "order_id",
        value: 55555,
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Bearer ebb3cbbe938c4776bd22a4ec2ea8b2ca",
      },
    ],
    body: [],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(false);
  expect(validationErrors.length).toBe(1);
  expect(validationErrors[0].field).toBe("query_params.order_id");
  expect(validationErrors[0].abnormality).toContain("does not match the model's type");
});

test("example request #12", () => {
  const request = {
    path: "/orders/create",
    method: "POST",
    query_params: [],
    headers: [
      {
        name: "Authorization",
        value: "Bearer ebb3cbbe938c4776bd22a4ec2ea8b2ca",
      },
    ],
    body: [
      {
        name: "address",
        value: "Test Road",
      },
      {
        name: "order_type",
        value: 4,
      },
      {
        name: "items",
        value: [
          {
            id: "a5",
            amount: 5,
          },
          {
            id: "a3",
            amount: 2,
          },
        ],
      },
    ],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(false);
  expect(validationErrors.length).toBe(1);
  expect(validationErrors[0].field).toBe("query_params.order_id");
  expect(validationErrors[0].abnormality).toContain("does not match the model's type");
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

test("multiple type errors", () => {
  const request = {
    path: "/users/info",
    method: "GET",
    query_params: [
      {
        name: "with_extra_data",
        value: 5,
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: 5,
      },
    ],
    body: [],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(false);
  expect(validationErrors.length).toBe(2);
  expect(validationErrors[0].field).toBe("query_params.with_extra_data");
  expect(validationErrors[0].abnormality).toContain("does not match the model's type");
  expect(validationErrors[1].field).toBe("headers.Authorization");
  expect(validationErrors[1].abnormality).toContain("does not match the model's type");
});

test("extra parameters", () => {
  const request = {
    path: "/users/info",
    method: "GET",
    query_params: [
      {
        name: "with_extra_data",
        value: true,
      },
      {
        name: "extra1",
        value: "surprise",
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "hey",
      },
    ],
    body: [
      {
        name: "extra2",
        value: -149.5,
      },
    ],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(false);
  expect(validationErrors.length).toBe(2);
  expect(validationErrors[0].field).toBe("query_params.extra1");
  expect(validationErrors[0].abnormality).toContain("Extra param");
  expect(validationErrors[1].field).toBe("body.extra2");
  expect(validationErrors[1].abnormality).toContain("Extra param");
});

test("missing required parameter together with an extra parameter", () => {
  const request = {
    path: "/users/info",
    method: "GET",
    query_params: [],
    headers: [
      {
        name: "extra",
        value: "surprise",
      },
    ],
    body: [],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(false);
  expect(validationErrors.length).toBe(2);
  expect(validationErrors[0].field).toBe("headers.Authorization");
  expect(validationErrors[0].abnormality).toContain("required");
  expect(validationErrors[1].field).toBe("headers.extra");
  expect(validationErrors[1].abnormality).toContain("Extra param");
});

test("unsupported path/method combination", () => {
  const request = {
    path: "/users/info",
    method: "PUT",
    query_params: [],
    headers: [
      {
        name: "extra",
        value: "surprise",
      },
    ],
    body: [],
  };

  const [isValid, validationErrors] = validationService.validateRequest(request);

  expect(isValid).toBe(false);
  expect(validationErrors.length).toBe(1);
  expect(validationErrors[0].field).toBe("path/method");
  expect(validationErrors[0].abnormality).toContain("unsupported path/method");
});
