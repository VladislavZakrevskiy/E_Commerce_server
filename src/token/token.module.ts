import {Module} from '@nestjs/common'
import { TokenService } from './token.service';
import { PrismaModule } from 'src/prisma.module';



@Module({
    providers: [TokenService],
    imports: [PrismaModule]
})
export class TokenModule {}