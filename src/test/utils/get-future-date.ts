import { setYear, parseISO } from "date-fns";

/*
 * Receives 2022-01-01 and returns 2023-01-01
 */

export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}
