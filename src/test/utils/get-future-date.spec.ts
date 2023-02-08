import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

test("increases date in 1 year", () => {
  const year = new Date().getFullYear();
  expect(getFutureDate(`${year}-01-01`).getFullYear()).toEqual(2024);
});
