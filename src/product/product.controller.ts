import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/CreateProduct';
import { ProductService } from './product.service';
import { FileService, fileType } from 'src/files/files.service';
import { UpdateProductDto } from './dto/UpdateProduct';

@Controller('/product')
export class ProductController {
	constructor(
		private productService: ProductService,
		private fileService: FileService
	) {}

	@UseInterceptors(AnyFilesInterceptor())
	@Post('/create')
	async create(
		@Body() dto: CreateProductDto,
		@UploadedFiles() files: Array<Express.Multer.File>
	) {
		const media = this.fileService.createFiles(fileType.IMAGE, files);
		const product = await this.productService.create(dto, media);
		return product;
	}

	@Get('/all')
	async getAll(
		@Query('skip') skip: number,
		@Query('take') take: number,
		@Query('seller_id') seller_id: string
	) {
		const products = await this.productService.getAll(skip, take, seller_id);
		return products;
	}

	@Get('/:id')
	async getOne(@Param('id') id: string) {
		const product = await this.productService.getOne(id);
		return product;
	}

	@Delete('/:id')
	async delete(@Param('id') id: string) {
		const product = await this.productService.delete(id);
		return product;
	}

    @UseInterceptors(AnyFilesInterceptor())
	@Patch('/update')
	async update(@Body() dto: UpdateProductDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        console.log('1',dto, files)
		const product = await this.productService.update(dto, files);
		return product;
    } 
}
