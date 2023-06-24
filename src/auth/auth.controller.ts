import { Body, Controller, Get, Param, Post, Req, Res, UseInterceptors, UploadedFiles } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration";
import { Request, Response } from "express";
import { AuthService } from './auth.service';
import { LoginDto } from "./dto/login";
import { FileFieldsInterceptor } from "@nestjs/platform-express";


@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseInterceptors(FileFieldsInterceptor([
        {name: 'photo', maxCount: 1}
    ]))
    @Post('/registration')
    async registration (@Body() dto: RegistrationDto, @Res() res: Response, @UploadedFiles() file: any) {
        dto.photo = file.photo
        const data = await this.authService.registration(dto)
        res.cookie('refresh_token', data.refreshToken)
        res.status(200).send(data)
    }

    
    @Post('/login/user')
    async loginUser (@Body() dto: LoginDto, @Res() res: Response) {
        const data = await this.authService.loginUser(dto)
        res.cookie('refresh_token', data.refreshToken)
        res.status(200).send(data)
    }

    @Post('/login/seller')
    async loginSeller (@Body() dto: LoginDto, @Res() res: Response) {
        const data = await this.authService.loginUser(dto)
        res.cookie('refresh_token', data.refreshToken)
        res.status(200).send(data)
    }

    @Post('/logout/:id')
    async logout (@Param('id') id: string, @Res() res: Response) {
        const data = await this.authService.logout(id)
        res.clearCookie('refresh_token')
        res.status(200).send(data)
    }

    @Get('/refresh')
    async refresh (@Req() req: Request, @Res() res: Response) {
        const cookies = req.cookies
        const data = await this.authService.refresh(cookies['refresh_token'])
        res.cookie('refresh_token', data.refreshToken)
        res.status(200).send(data)
    }
}

