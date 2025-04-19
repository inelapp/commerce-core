import { dayEnd, format, monthStart, tzDate } from '@formkit/tempo';
import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { timeZone } from '../constants';
import { formatDateToFilter } from '../../utils';

class ValidateQueryParamsInvalidDateException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

@Injectable()
export class ValidateQueryParamsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const dateFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    const defaultFromDate = formatDateToFilter(monthStart(tzDate(new Date(), timeZone)));
    const defaultToDate = formatDateToFilter(dayEnd(tzDate(new Date(), timeZone)));

    const { query } = req;
    if (query.page) {
      const page = parseInt(query.page as string);
      if (isNaN(page) || page < 1) {
        query.page = '1';
      }
    }

    if (query.limit) {
      const limit = parseInt(query.limit as string);
      if (isNaN(limit) || limit < 1) {
        query.limit = '10';
      }
    }

    if (query.fromDate) {
      if (!dateFormat.test(query.fromDate as string)) {
        throw new ValidateQueryParamsInvalidDateException('Invalid fromDate format. Expected format: YYYY-MM-DD HH:mm:ss');
      }
    }

    if (query.toDate) {
      if (!dateFormat.test(query.toDate as string)) {
        throw new ValidateQueryParamsInvalidDateException('Invalid toDate format. Expected format: YYYY-MM-DD HH:mm:ss');
      }
    }

    if (query.fromDate && query.toDate) {
      query.fromDate = formatDateToFilter(tzDate(query.fromDate as string, timeZone));
      query.toDate = formatDateToFilter(tzDate(query.toDate as string, timeZone));
    } else if (query.fromDate) {
      query.fromDate = formatDateToFilter(tzDate(query.fromDate as string, timeZone));
      query.toDate = defaultToDate;
    } else if (query.toDate) {
      query.fromDate = defaultFromDate;
      query.toDate = formatDateToFilter(tzDate(query.toDate as string, timeZone));
    } else {
      query.fromDate = defaultFromDate;
      query.toDate = defaultToDate;
    }
    
    const pageInt = parseInt(query.page as string);
    const limitInt = parseInt(query.limit as string);
    query.page = isNaN(pageInt) ? query.page : pageInt as any;
    query.limit = isNaN(limitInt) ? query.limit : limitInt as any;

    next();
  }
}
