import { validate } from "./typeValidation";

test("Auth-Token validation sanity", () => {
  expect(validate["Auth-Token"]("Bearer 56ee9b7a-da8e-45a1-aade-a57761b912c4")).toBe(true);
  expect(validate["Auth-Token"]("Bearer: ebb3cbbe938c4776bd22a4ec2ea8b2ca")).toBe(false);
  expect(validate["Auth-Token"]("ebb3cbbe938c4776bd22a4ec2ea8b2ca")).toBe(false);
  expect(validate["Auth-Token"]("hello")).toBe(false);
});

test("UUID validation sanity", () => {
  expect(validate["UUID"]("ebb3cbb-e938c-4776bd22a-4ec2ea-8b2ca")).toBe(true);
  expect(validate["UUID"]("ebb3cbbe938c4776bd22a4ec2ea8b2ca")).toBe(true);
  expect(validate["UUID"]("Bearer: ebb3cbbe938c4776bd22a4ec2ea8b2ca")).toBe(false);
  expect(validate["UUID"]("hello")).toBe(true); // It fits the specs, technically
  expect(validate["UUID"](null)).toBe(false);
  expect(validate["UUID"](undefined)).toBe(false);
});

test("String validation sanity", () => {
  expect(validate["String"]("hello")).toBe(true);
  expect(validate["String"](null)).toBe(false);
  expect(validate["String"](undefined)).toBe(false);
  expect(validate["String"](5)).toBe(false);
});

test("Int validation sanity", () => {
  expect(validate["Int"](5)).toBe(true);
  expect(validate["Int"](-5)).toBe(true);
  expect(validate["Int"](0)).toBe(true);
  expect(validate["Int"](5.1)).toBe(false);
  expect(validate["Int"]("hello")).toBe(false);
  expect(validate["Int"](undefined)).toBe(false);
  expect(validate["Int"](null)).toBe(false);
});

test("Boolean validation sanity", () => {
  expect(validate["Boolean"](true)).toBe(true);
  expect(validate["Boolean"](false)).toBe(true);
  expect(validate["Boolean"](-5)).toBe(false);
  expect(validate["Boolean"](0)).toBe(false);
  expect(validate["Boolean"]("hello")).toBe(false);
  expect(validate["Boolean"](undefined)).toBe(false);
  expect(validate["Boolean"](null)).toBe(false);
});

test("Date validation sanity", () => {
  expect(validate["Date"]("01-01-1001")).toBe(true);
  expect(validate["Date"]("29-02-2021")).toBe(false); // Because Feb 2021 only had 28 days, so this date is invalid
  expect(validate["Date"]("01-01-1001 01:01")).toBe(false);
  expect(validate["Date"](null)).toBe(false);
  expect(validate["Date"](undefined)).toBe(false);
  expect(validate["Date"](5)).toBe(false);
});

test("Email validation sanity", () => {
  expect(validate["Email"]("a@a.com")).toBe(true);
  expect(validate["Email"]("hello")).toBe(false);
  expect(validate["Email"]("a@a.com ")).toBe(false);
  expect(validate["Email"](null)).toBe(false);
  expect(validate["Email"](undefined)).toBe(false);
  expect(validate["Email"](5)).toBe(false);
});

test("List validation sanity", () => {
  expect(
    validate["List"]([
      {
        id: "a1",
        amount: 3,
      },
    ])
  ).toBe(true);
  expect(validate["List"]([])).toBe(true);
  expect(
    validate["List"]([
      {
        id: "a1",
        amount: 3,
        extra: true,
      },
    ])
  ).toBe(false);
  expect(validate["List"]([{}])).toBe(false);
  expect(validate["List"]([{ id: 1, amount: "hello" }])).toBe(false);
  expect(
    validate["List"]([
      {
        id: "a1",
        amount: 3,
      },
      { id: 1, amount: "hello" },
    ])
  ).toBe(false);
  expect(validate["List"](null)).toBe(false);
  expect(validate["List"](undefined)).toBe(false);
  expect(validate["List"](5)).toBe(false);
});
