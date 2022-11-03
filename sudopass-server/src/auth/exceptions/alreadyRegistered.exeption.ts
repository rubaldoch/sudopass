import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyRegisteredException extends HttpException {
  constructor() {
    super('Already registered email', HttpStatus.UNAUTHORIZED);
  }
}
