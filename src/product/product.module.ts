import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/prisma.module';
import { FileService } from 'src/files/files.service';

@Module({
	controllers: [ProductController],
	imports: [PrismaModule],
	providers: [ProductService, FileService],
})
export class ProductModule {}
