import { createMocks } from "node-mocks-http";
import handler from "./gather_data";

describe("API: /api/gather_data", () => {});

it("Should return a 200 status code for a successful request", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await handler(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getJSONData()).toEqual({ name: "John Doe" });
  expect(res.getHeader("Access-Control-Allow-Origin")).toBe("*");
  expect(res.getHeader("Access-Control-Allow-Methods")).toBe(
    "GET, POST, OPTIONS"
  );
  expect(res.getHeader("Access-Control-Allow-Headers")).toBe("Content-Type");
});

it("Should maintain CORS headers even when an error occurs in request processing", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  // Mock an error during request processing
  const mockError = new Error("Test error");
  jest.spyOn(res, "status").mockImplementationOnce(() => {
    throw mockError;
  });

  await expect(handler(req, res)).rejects.toThrow("Test error");

  expect(res.getHeader("Access-Control-Allow-Origin")).toBe("*");
  expect(res.getHeader("Access-Control-Allow-Methods")).toBe(
    "GET, POST, OPTIONS"
  );
  expect(res.getHeader("Access-Control-Allow-Headers")).toBe("Content-Type");
});

it("Should return a 405 status code for methods other than GET, POST, and OPTIONS", async () => {
  const { req, res } = createMocks({
    method: "PUT",
  });

  await handler(req, res);

  expect(res.statusCode).toBe(405);
  expect(res._getJSONData()).toEqual({ error: "Method Not Allowed" });
  expect(res.getHeader("Access-Control-Allow-Methods")).toBe(
    "GET, POST, OPTIONS"
  );
});

it("Should respond to POST requests with the correct JSON payload", async () => {
  const { req, res } = createMocks({
    method: "POST",
    body: { testData: "test" },
  });

  await handler(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getJSONData()).toEqual({ name: "John Doe" });
  expect(res.getHeader("Access-Control-Allow-Origin")).toBe("*");
  expect(res.getHeader("Access-Control-Allow-Methods")).toBe(
    "GET, POST, OPTIONS"
  );
  expect(res.getHeader("Access-Control-Allow-Headers")).toBe("Content-Type");
});

it("Should respond to GET requests with the correct JSON payload", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await handler(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getJSONData()).toEqual({ name: "John Doe" });
});

it("Should handle OPTIONS requests correctly", async () => {
  const { req, res } = createMocks({
    method: "OPTIONS",
  });

  await handler(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getJSONData()).toEqual({ name: "John Doe" });
  expect(res.getHeader("Access-Control-Allow-Origin")).toBe("*");
  expect(res.getHeader("Access-Control-Allow-Methods")).toBe(
    "GET, POST, OPTIONS"
  );
  expect(res.getHeader("Access-Control-Allow-Headers")).toBe("Content-Type");
});

it("Should include the 'Access-Control-Allow-Methods' header with value 'GET, POST, OPTIONS' in the response", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await handler(req, res);

  expect(res.getHeader("Access-Control-Allow-Methods")).toBe(
    "GET, POST, OPTIONS"
  );
});

it("Should include the 'Access-Control-Allow-Headers' header with value 'Content-Type' in the response", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await handler(req, res);

  expect(res.getHeader("Access-Control-Allow-Headers")).toBe("Content-Type");
});

it("Should include the 'Access-Control-Allow-Origin' header with value '*' in the response", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await handler(req, res);

  expect(res.getHeader("Access-Control-Allow-Origin")).toBe("*");
});
