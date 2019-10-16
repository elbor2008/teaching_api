import {
  OverrideMiddleware,
  GlobalErrorHandlerMiddleware,
  Err,
  Res,
  Response
} from '@tsed/common';
import { Exception } from 'ts-httpexceptions/lib/core';
import { CustomResponse } from '../utils/CustomResponse';

@OverrideMiddleware(GlobalErrorHandlerMiddleware)
export class ErrorMiddleware {
  use(@Err() error: any, @Res() response: Response): any {
    if (error instanceof Exception || error.status) {
      response
        .status(error.status)
        .json(CustomResponse.format(0, error.message, error.body || []));
      return;
    }
    // if (typeof error === 'string') {
    //   response.status(404).send(error);
    //   return;
    // }
    response
      .status(error.status || 500)
      .json(
        CustomResponse.format(
          0,
          error.message || 'Internal Error',
          error.body || []
        )
      );
    return;
  }
}
