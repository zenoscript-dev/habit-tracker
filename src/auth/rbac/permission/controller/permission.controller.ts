import {
  Body,
  Controller,
  DefaultValuePipe,
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
import { PermissionService } from '../service/permission.service';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreatePermissionDto } from '../dto/createPermission.dto';
import { UpdatePermissionDto } from '../dto/updatePremission.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Controller('permission')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
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
    @Body() CreatePermissionDto: CreatePermissionDto,
    @Req() req: any,
  ): Promise<any> {
    try {
      this.logger.log(
        'Calling .. create permission API .. ',
        PermissionController.name,
      );

      return await this.permissionService.create(CreatePermissionDto);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Fetched Successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are missing' })
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @Req() req: any,
  ): Promise<any> {
    try {
      this.logger.log(
        'Calling .. update permission API .. ' + id,
        PermissionController.name,
      );

      return await this.permissionService.update(id, updatePermissionDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('/permission-by-id/:id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Fetched Succesfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are missing' })
  async get(@Param('id') id: string, @Req() req: any): Promise<any> {
    try {
      this.logger.log(
        'Calling .. get permission by Id  API .. ',
        PermissionController.name,
      );

      return await this.permissionService.getById(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('/permission-all')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Fetched Successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Mandatory Fields are Missing' })
  async getAllPurchaseOrder(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('sort', new DefaultValuePipe('ASC')) sort: string,
    @Query('type', new DefaultValuePipe(null)) type: string,
    @Query('status', new DefaultValuePipe('active')) status: string,
    @Query('permission', new DefaultValuePipe(null)) permission: string,
    @Req() req: any,
  ): Promise<any> {
    try {
      const options: IPaginationOptions = {
        limit,
        page,
      };

      if (permission === 'getAll') {
        return await this.permissionService.getAllPermission();
      }
    } catch (err) {
      throw err;
    }
  }
}
