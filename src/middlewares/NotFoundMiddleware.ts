import { Middleware, Res, Response } from '@tsed/common';
import { CustomResponse } from '../utils/CustomResponse';

@Middleware()
export class NotFoundMiddleware {
  use(@Res() res: Response) {
    res.status(404).json(CustomResponse.format(0, 'Not Found', []));
  }
}
