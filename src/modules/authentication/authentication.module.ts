import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypegooseModule } from "nestjs-typegoose";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { AuthGuard } from "./auth.guard";
import { User } from "../../models/user.model";

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET!,
      signOptions: {
        expiresIn: Number.parseInt(process.env.TOKEN_TTL ?? "3600"),
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
