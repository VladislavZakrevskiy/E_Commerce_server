import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt';
import { TokenService } from '../token/token.service';
import { LoginDto } from './dto/login';
import { FileService, fileType } from 'src/files/files.service';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private tokenService: TokenService,
		private fileService: FileService
	) {}

	async registration(dto: RegistrationDto) {
		if (dto.role === 'user') {
			delete dto.role
			console.log(dto)
			const candidate = await this.prisma.user.findUnique({
				where: { email: dto.email },
			});
			if (!candidate) {
				const hashPassword = await hash(dto.password, 7);
				const { accessToken, refreshToken } = this.tokenService.generateTokens({
					email: dto.email,
					password: dto.password,
				});
				const photoPath = this.fileService.createFile(
					fileType.IMAGE,
					dto.photo[0]
				);
				const user = await this.prisma.user.create({
					data: {
						...dto,
						age: +dto.age,
						house_number: +dto.house_number,
						photo: photoPath,
						password: hashPassword,
					}
				});
				await this.tokenService.saveToken(user.user_id, refreshToken);

				return { accessToken, refreshToken, user };
			}
		} else if (dto.role === 'seller') {
			delete dto.role
			const candidate = await this.prisma.seller.findUnique({
				where: { email: dto.email },
			});
			if (!candidate) {
				const hashPassword = await hash(dto.password, 7);
				const { accessToken, refreshToken } = this.tokenService.generateTokens({
					email: dto.email,
					password: dto.password,
				});
				const photoPath = this.fileService.createFile(
					fileType.IMAGE,
					dto.photo[0]
				);
				const user = await this.prisma.seller.create({
					data: {
						...dto,
						age: +dto.age,
						house_number: +dto.house_number,
						photo: photoPath,
						password: hashPassword,
					},
				});
				await this.tokenService.saveToken(user.seller_id, refreshToken);

				return { accessToken, refreshToken, user };
			}
		} 
	}

	async loginSeller(dto: LoginDto) {
		const seller = await this.prisma.seller.findUnique({
			where: { email: dto.email },
		});
		if (!seller) {
			throw new HttpException(`User doesn't exist`, HttpStatus.UNAUTHORIZED);
		}
		const isPassEquals = await compare(dto.password, seller.password);
		if (!isPassEquals) {
			throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
		}
		const tokens = this.tokenService.generateTokens(dto);
		await this.tokenService.saveToken(seller.seller_id, tokens.refreshToken);

		return { ...tokens, user: seller };
	}

	async loginUser(dto: LoginDto) {
		console.log(dto)
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});
		if (!user) {
			throw new HttpException(`User doesn't exist`, HttpStatus.UNAUTHORIZED);
		}
		const isPassEquals = await compare(dto.password, user.password);
		if (!isPassEquals) {
			throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
		}
		const tokens = this.tokenService.generateTokens(dto);
		await this.tokenService.saveToken(user.user_id, tokens.refreshToken);

		return { ...tokens, user };
	}

	async logout(user_id: string) {
		const token = await this.tokenService.remove(user_id);
		return token;
	}

	async refresh(refresh_token: string) {
		if (!refresh_token) {
			throw new HttpException('no refresh token', HttpStatus.UNAUTHORIZED);
		}
		const userData = this.tokenService.validateRefreshToken(refresh_token);
		const tokenDB = await this.tokenService.find(refresh_token);
		if (!userData || !tokenDB) {
			throw new HttpException('error', HttpStatus.UNAUTHORIZED);
		}
		const seller = await this.prisma.seller.findUnique({
			where: { email: userData.email },
		});
		const user = await this.prisma.user.findUnique({
			where: {email: userData.email }
		})
		const tokens = this.tokenService.generateTokens(user || seller);
		await this.tokenService.saveToken(user.user_id || seller.seller_id, tokens.refreshToken);
		return { ...tokens, user: user || seller };
	}
}
