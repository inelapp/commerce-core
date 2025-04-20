import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { format, tzDate } from '@formkit/tempo';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private dateFieldPatterns = ['At', 'date', 'Date', 'Time', 'On', 'createdAt', 'updatedAt'];

  private formatDate(date: string | Date): string {
    return format(tzDate(date instanceof Date ? date.toISOString() : date, 'America/Lima'), 'DD-MM-YYYY, HH:mm:ss a', 'en');
  }

  private isDateField(fieldName: string): boolean {
    return this.dateFieldPatterns.some(pattern => 
      fieldName.includes(pattern) || fieldName.toLowerCase().includes('date')
    );
  }

  private processValue(value: any): any {
    if (value === null || value === undefined) return value;

    if (typeof value === 'object' && !Array.isArray(value)) {
      const processed = { ...value };
      
      Object.keys(processed).forEach(key => {
        if (processed[key] === null || processed[key] === undefined) {
          return;
        } else if (typeof processed[key] === 'object' && processed[key].length > 0) {
          processed[key] = this.processValue(processed[key]);
        } else if (this.isDateField(key)) {
          processed[key] = this.formatDate(processed[key]);
        }
      });
      
      return processed;
    }

    if (Array.isArray(value)) {
      return value.map(item => this.processValue(item));
    }

    return value;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const processedData = this.processValue(data);
        return {
          success: true,
          result: processedData,
        };
      })
    );
  }
}
