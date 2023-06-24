import {
	HttpException,
	HttpStatus,
	Injectable,
	NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {verify} from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		try {
			const authHeader = req.headers.authorization;
			if (!authHeader) {
				throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
			}
			const accessToken = authHeader.split(' ')[1];
			if (!accessToken) {
				throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
			}
			const userData = verify(accessToken, process.env.JWT_ACCESS_SECRET);
			if (!userData) {
				throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
			}
			next();
		} catch (e) {
			next(new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED));
		}
	}
}
