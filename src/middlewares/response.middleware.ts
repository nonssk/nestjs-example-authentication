import http from "http";
import { Request, Response } from "express";

export interface ResponseError {
  message: string;
  stacktrace: string;
}

export interface ResponseMessage {
  statusCode?: number;
  responseCode?: number;
  message: string;
  errors?: ResponseError[];
}

declare global {
  namespace Express {
    interface Response {
      respond(resultCode: number, msg: string): any;
      respond(resultCode: string, msg: string): any;
      respond(resultCode: number, msg: string, data: any): any;
      respond(resultCode: string, msg: string, data: any): any;
      respond(resultCode: number, msg: string, data: any, metadata: any): any;
      respond(resultCode: string, msg: string, data: any, metadata: any): any;

      /**
       * @deprecated Since version 1.0. Will be deleted in version 3.0. Use respond instead
       */
      reject(errors: ResponseError[]): any;
    }
  }

  namespace http {
    interface ServerResponse {
      respond(): any;
    }
  }
}

export function respond(
  response: http.ServerResponse,
  message: ResponseMessage
) {
  response.setHeader("content-type", "application/json");
  if (message.errors && message.errors.length > 0) {
    response.statusCode = message.statusCode || 500;
  }

  if (message.statusCode) {
    delete message.statusCode;
  }

  response.end(JSON.stringify(message));
}

export const expressMiddleware =
  () =>
  (req: Request, res: Response, next: any): void => {
    res.respond = (
      resultCode: number | string,
      msg: string,
      data?: any,
      metadata?: any
    ): void => {
      const responseMessage = {
        _metadata: metadata,
        statusCode: resultCode,
        message: msg,
        data,
      };

      if (!data) {
        delete responseMessage.data;
      }

      if (!metadata) {
        delete responseMessage._metadata;
      }

      res.send(responseMessage);
      return;
    };

    res.reject = (errors: ResponseError[]) => {
      res.status(502);
      res.send({
        data: null,
        errors,
      });
      return;
    };

    next && next();
  };
