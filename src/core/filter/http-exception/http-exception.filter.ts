/**
 * http 异常过滤器
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的response对象
    const status = exception.getStatus(); // 获取异常状态码

    /**
     * @todo 这里后期要根据<status>状态码，对应的去映射<code>码给前端
     * code === -1 ：前端直接全局报message的错
     * code === [其它] 单独进行特殊场景判断
     */
    const exceptionResponse: any = exception.getResponse();
    let validMessage: string = '';
    for (const key in exception) {
      console.log('===异常过滤器===', key, exception[key]);
    }
    if (typeof exceptionResponse === 'object') {
      validMessage =
        typeof exceptionResponse.message === 'string'
          ? exceptionResponse.message
          : exceptionResponse.message[0];
    }

    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      data: {},
      message: validMessage || message,
      code: -1,
    };

    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
