import { Body, Controller, Get, HttpCode, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from '../services';
import { createCategoryOkResponseSwagger, CreateCategoryRequestDto, createCategoryRequestSwagger, CreateCategoryResponseDto, getCategoriesOkResponseSwagger, GetCategoriesRequestDto, GetCategoriesResponseDto, getCategoriesSwaggerParams } from '../UsesCases';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormatDataParserInterceptor, genericBadRequestErrorResponse, ValidateFilePipe } from '../../../core';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('villa-cars/v1/category')
@ApiTags('Category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){}

    @Post()
    @HttpCode(201)
    @UseInterceptors(FileInterceptor('img'), FormatDataParserInterceptor)
    @ApiOperation({ summary: 'Create a new category' })
    @ApiConsumes('multipart/form-data')
    @ApiBody(createCategoryRequestSwagger)
    @ApiResponse(createCategoryOkResponseSwagger)
    @ApiResponse(genericBadRequestErrorResponse)
    async createCategory(
        @Body() request: CreateCategoryRequestDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<CreateCategoryResponseDto> {
        return await this.categoryService.createCategory({ ...request, merchant: '680475d58c6ce2b9e4725210', img: file });   
    }

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get categories' })
    @ApiQuery(getCategoriesSwaggerParams[0])
    @ApiQuery(getCategoriesSwaggerParams[1])
    @ApiQuery(getCategoriesSwaggerParams[2])
    @ApiQuery(getCategoriesSwaggerParams[3])
    @ApiResponse(getCategoriesOkResponseSwagger)
    @ApiResponse(genericBadRequestErrorResponse)
    async getCategories(@Query() query: GetCategoriesRequestDto): Promise<GetCategoriesResponseDto> {
        return await this.categoryService.getCategories({ ...query, merchant: '680475d58c6ce2b9e4725210' });
    }
}
