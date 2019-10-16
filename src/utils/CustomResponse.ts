export class CustomResponse {
  static format(code: number, message: string, body: any): {} {
    return {
      code,
      message,
      body
    };
  }
}
