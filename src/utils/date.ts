import { format, tzDate } from "@formkit/tempo";
import { timeZone } from "../core";

export const isValidDateString = (value: any): boolean => {
    if (typeof value !== 'string') return false;
    const dateFormat =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[+-]\d{2}:\d{2}|Z)$/;
    if (!dateFormat.test(value)) return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
};

export const formatDateToFilter = (date: Date): string => {
  return format({
    date,
    format: 'YYYY-MM-DDTHH:mm:ssZ',
    tz: timeZone,
    locale: 'en'
  });
};

export const formatDate = (date: Date | string): Date => {
    return tzDate(date, timeZone);
}