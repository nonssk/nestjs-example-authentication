export class CustomException extends Error {
  message: string;
  statusCode: number;
  code: any;

  constructor(message: string, statusCode = 400, code?: string) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.code = code || -1;
  }
}
