import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow('JWT_AUTH_EXPRIRATION_MS'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
