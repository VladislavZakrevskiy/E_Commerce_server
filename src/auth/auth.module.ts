import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TokenService } from "src/token/token.service";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma.module";
import { FileService } from "src/files/files.service";





@Module({
    controllers: [AuthController],
    imports: [PrismaModule],
    providers: [TokenService, AuthService, FileService]
})
export class AuthModule {

}