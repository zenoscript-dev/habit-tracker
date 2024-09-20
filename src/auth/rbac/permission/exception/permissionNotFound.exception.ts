import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionNotFoundException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Permission not Found', status || HttpStatus.NOT_FOUND);
  }
}
