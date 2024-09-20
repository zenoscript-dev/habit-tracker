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
  UseGuards,
} from '@nestjs/common';
import { RolePermissionService } from '../service/role-permission.service';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { CreateRolePermissionDto } from '../dto/createRolePermission.dto';
import { RolePermissionI } from '../interface/rolePermission.interface';
import { UpdateRolePermissionDto } from '../dto/updateRolePermission.dto';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UserContext } from 'src/core/userContext.payload';

@Controller('role-permission')
export class RolePermissionController {
  constructor(
    private readonly rolePermissionService: RolePermissionService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOkResponse({ description: 'Created Succesfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are missing' })
  async create(
    @Body() createRolePermissionDto: CreateRolePermissionDto,
    @Req() req: any,
  ): Promise<RolePermissionI | RolePermissionI[]> {
    try {
      this.logger.log(
        'Calling .. create role permission API .. ',
        RolePermissionController.name,
      );
      return await this.rolePermissionService.create(createRolePermissionDto);
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
    @Param('id') id: number,
    @Body() updateRolePermissionDto: UpdateRolePermissionDto,
    @Req() req: any,
  ): Promise<RolePermissionI> {
    try {
      this.logger.log(
        'Calling .. update role permission API .. ' + id,
        RolePermissionController.name,
      );
      return await this.rolePermissionService.update(
        id,
        updateRolePermissionDto,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get('/role-permission-by-id/:id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Fetched Succesfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are missing' })
  async get(
    @Param('id') id: number,
    @Req() req: any,
  ): Promise<RolePermissionI> {
    try {
      this.logger.log(
        'Calling .. get role permission by Id  API .. ',
        RolePermissionController.name,
      );
      return await this.rolePermissionService.getById(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('role-permission-all')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Fetched Successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are Missing' })
  async getAllRolePermission(
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
        return await this.rolePermissionService.getAllRole();
      }
    } catch (err) {
      throw err;
    }
  }

  @Delete('/role/:roleId/permission/:permissionId')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Deleted Succesfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are missing' })
  async delete(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
    @Req() req: any,
  ): Promise<RolePermissionI> {
    try {
      this.logger.log(
        'Calling .. delete role permission API by roleId and permissionId.. ',
        RolePermissionController.name,
      );
      const userContext = req.user;
      return await this.rolePermissionService.deleteByRoleAndPermissionId(
        roleId,
        permissionId,
      );
    } catch (error) {
      throw error;
    }
  }
}
