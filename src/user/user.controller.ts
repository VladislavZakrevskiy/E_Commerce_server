import { Body, Controller, Delete, Get, Param, Patch, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/UpdateUser';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get('all')
	getAll(
		@Query('skip') skip: number,
		@Query('take') take: number,
		@Query('to_id') to_id: string
	) {
		const users = this.userService.getAll(skip, take, to_id);
		return users;
	}

	@Get('/:id')
	getOne(@Param('id') id: string) {
		const user = this.userService.getOne(id);
		return user;
	}

	@Delete('/:id')
	delete(@Param('id') id: string) {
		const user = this.userService.delete(id);
		return user;
	}

    @UseInterceptors(FileFieldsInterceptor([
        {name: 'photo', maxCount: 1}
    ]))
    @Patch('/update')
    async update(@Body() dto: UpdateUserDto, @UploadedFiles() file: object) {
        const user = await this.userService.update(dto, file)
        return user
    }
}
