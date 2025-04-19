import { ValidateQueryParamsMiddleware } from './validate-query-params.middleware';

describe('ValidateQueryParamsMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateQueryParamsMiddleware()).toBeDefined();
  });
});
