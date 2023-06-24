import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/CreateProduct';
import { UpdateProductDto } from './dto/UpdateProduct';
import { FileService, fileType } from 'src/files/files.service';

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private fileService: FileService
	) {}

	async create(dto: CreateProductDto, media: string[]) {
		const product = await this.prisma.product.create({
			data: {
				created_At: new Date(),
				...dto,
				media,
			},
		});

		return product;
	}

	async getAll(skip = 1, take = 5, seller_id?: string) {
		const products = await this.prisma.product.findMany({
			skip: (skip - 1) * take,
			take: +take,
			where: {
				seller_id,
			},
		});
		return products;
	}

	async getOne(id: string) {
		const product = await this.prisma.product.findUnique({
			where: { product_id: id },
		});
		return product;
	}

	async delete(id: string) {
		const product = await this.prisma.product.delete({
			where: {
				product_id: id,
			},
			select: {
				message: true,
				media: true,
				name: true,
				price: true,
				product_id: true,
				seller_id: true,
			},
		});

		return product;
	}

	async update(dto: UpdateProductDto, filesToReplace: Array<Express.Multer.File>) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		dto.media = eval(dto.media)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore 
		dto.pastMedia = eval(dto.pastMedia)
		// upload files
		const media = this.fileService.createFiles(fileType.IMAGE, filesToReplace);
		// Replace files
		const pastMedia = [...dto.pastMedia]
		for (let i = 0; i < dto.pastMedia.length; i++) {
			for (let j = 0; j < dto.media.length; j++) { 
				if (dto.pastMedia[i] === dto.media[j]) {
					pastMedia[i] = media[j];
				}
			} 
		}
		// Create Product
		const product = await this.prisma.product.update({
			data: {
				message: dto.message,
				name: dto.name,
				price: dto.price,
				media: pastMedia,
			},
			where: { product_id: dto.product_id },
		});
		return product; 
	}
}
