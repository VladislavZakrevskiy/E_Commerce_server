import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/UpdateUser';
import { FileService, fileType } from 'src/files/files.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService, private fileService: FileService) {}

	async getAll(skip = 1, take = 5, to_id?: string) {
		const users = this.prisma.user.findMany({
			skip: (+skip - 1) * +take,
			take: +take,
			where: { Message: { some: { to_id } } },
			include: { Message: { take: 100, where: { to_id } } }
		});
		return users;
	}

	async getOne(id: string) {
		const user = this.prisma.user.findUnique({ where: { user_id: id } });
		return user;
	}

	async delete(id: string) {
		const user = this.prisma.user.delete({ where: { user_id: id } });
		return user;
	}

  async update(dto: UpdateUserDto, file: object) {
    let fileName = ''
    if(file) {
      fileName = this.fileService.createFile(fileType.IMAGE, file)
    }
    if (fileName) {
      dto.photo = fileName
    }

    const user = await this.prisma.user.update({
      data: {...dto},
      where: {user_id: dto.user_id}
    })
    return user
  }
}
