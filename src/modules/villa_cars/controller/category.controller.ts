import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from '../services';
import { createCategoryOkResponseSwagger, CreateCategoryRequestDto, createCategoryRequestSwagger, CreateCategoryResponseDto, DeleteCategoryResponseDto, deleteCategoryResponseSwagger, getCategoriesOkResponseSwagger, GetCategoriesRequestDto, GetCategoriesResponseDto, getCategoriesSwaggerParams, GetCategoryResponseDto, getCategoryResponseSwaggerSchema, UpdateCategoryRequestDto, updateCategoryRequestSwaggerSchema, UpdateCategoryResponseDto, updateCategoryResponseSwaggerSchema } from '../UsesCases';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormatDataParserInterceptor, genericBadRequestErrorResponse } from '../../../core';
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

    @Patch(':id')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('img'), FormatDataParserInterceptor)
    @ApiOperation({ summary: 'Update a category' })
    @ApiConsumes('multipart/form-data')
    @ApiBody(updateCategoryRequestSwaggerSchema)
    @ApiResponse(updateCategoryResponseSwaggerSchema)
    @ApiResponse(genericBadRequestErrorResponse)
    async updateCategory(
        @Param('id') id: string,
        @Body() request: UpdateCategoryRequestDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<UpdateCategoryResponseDto>{
        return await this.categoryService.updateCategory({ ...request, id, img: file?.filename });
    }

    @Get(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get a category by id' })
    @ApiParam({ schema: { type: 'string' }, name: 'id', description: 'Category ID' })
    @ApiResponse(getCategoryResponseSwaggerSchema)
    @ApiResponse(genericBadRequestErrorResponse)
    async getCategory(@Param('id') id: string): Promise<GetCategoryResponseDto> {
        return await this.categoryService.getCategory({ id, merchant: '680475d58c6ce2b9e4725210' });
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete a category' })
    @ApiParam({ schema: { type: 'string' }, name: 'id', description: 'Category ID' })
    @ApiResponse(deleteCategoryResponseSwagger)
    @ApiResponse(genericBadRequestErrorResponse)
    async deleteCategory(
        @Param('id') id: string
    ): Promise<DeleteCategoryResponseDto>{
        return await this.categoryService.deleteCategory({ id, merchant: '680475d58c6ce2b9e4725210' });
    }
}
