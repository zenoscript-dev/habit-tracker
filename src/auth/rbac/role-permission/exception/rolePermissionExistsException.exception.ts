import { HttpException, HttpStatus } from '@nestjs/common';

export class RolePermissionExistsException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(
      msg || 'Role permission already exists',
      status || HttpStatus.BAD_REQUEST,
    );
  }
}
