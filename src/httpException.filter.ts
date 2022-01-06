import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | { message: any; statusCode: number }
      | { error: string; statusCode: 400; message: string[] }; //class validator
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // response.status(status).send({ msg: err });

    if (typeof err !== 'string' && err.statusCode === 400) {
      return (
        response
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .status(status)
          .send({ success: false, code: status, data: err.message })
      );
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.status(status).send({
      success: false,
      code: status,
      data: err.message,
    });
  }
}
