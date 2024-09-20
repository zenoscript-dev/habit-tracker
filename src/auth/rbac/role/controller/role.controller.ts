import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { RoleService } from '../service/role.service';
import { CreateRoleDto } from '../dto/createRole.dto';
import { UpdateRoleDto } from '../dto/updateRole.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { AssignRolesDto } from '../dto/assignRole.dto';

@Controller('role')
export class RoleController {
  purchaseOrderService: any;

  constructor(
    private readonly roleservice: RoleService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOkResponse({ description: 'Fetched Successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are missing' })
  async create(
    @Body() createRole: CreateRoleDto,
    @Req() req: any,
  ): Promise<any> {
    try {
      this.logger.log('Calling .. create role API .. ', RoleController.name);

      return await this.roleservice.create(createRole);
    } catch (error) {
      throw error;
    }
  }
  @Put('/:id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Updated Succesfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are missing' })
  async update(
    @Param('id') id: string,
    @Body() updateRole: UpdateRoleDto,
    @Req() req: any,
  ): Promise<any> {
    try {
      this.logger.log(
        'Calling .. update role API ..with id :  ' + id,
        RoleController.name,
      );

      return await this.roleservice.update(id, updateRole);
    } catch (error) {
      throw error;
    }
  }

  @Get('/role-by-id/:id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Updated Succesfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are missing' })
  async getOne(@Param('id') id: string): Promise<any> {
    try {
      this.logger.log(
        'Calling .. Get role API ..with id :  ' + id,
        RoleController.name,
      );

      return await this.roleservice.getOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('role-all')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Fetched Successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are Missing' })
  async getAllRole(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('sort', new DefaultValuePipe('ASC')) sort: string,
    @Query('type', new DefaultValuePipe(null)) type: string,
    @Query('status', new DefaultValuePipe('active')) status: string,
    @Query('role', new DefaultValuePipe(null)) role: string,
    @Req() req: any,
  ): Promise<any> {
    try {
      const options: IPaginationOptions = {
        limit,
        page,
      };

      if (role === 'getAll') {
        return await this.roleservice.getAllRole();
      }
    } catch (err) {
      throw err;
    }
  }

  @Delete('/:id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Deleted Succesfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are missing' })
  async delete(@Param('id') id: string, @Req() req: any): Promise<any> {
    try {
      this.logger.log('Calling .. delete role API .. ', RoleController.name);

      return await this.roleservice.delete(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/assign-roles/create')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Roles assigned successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are missing' })
  async assignRoles(
    @Body() assignRolesDto: AssignRolesDto,
    @Req() req: any,
  ): Promise<any> {
    try {
      this.logger.log('Assigning roles to user', RoleController.name);

      return await this.roleservice.assignRoleToUsers(assignRolesDto);
    } catch (error) {
      throw error;
    }
  }
}
