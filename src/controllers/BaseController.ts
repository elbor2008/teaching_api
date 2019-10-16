import { validate } from 'class-validator';

export class BaseController<T> {
  protected errors: Array<string>;
  protected errorInfo: string;
  protected async validate(entity: T): Promise<boolean> {
    this.errors = [];
    const validationErrors = await validate(entity);
    if (validationErrors) {
      for (const validationError of validationErrors) {
        const { constraints } = validationError;
        for (const key in constraints) {
          this.errors.push(constraints[key]);
        }
      }
    }
    this.errorInfo = this.errors.join(',');
    return this.errors.length === 0;
  }
}
