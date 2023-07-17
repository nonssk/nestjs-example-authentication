import {
  Controller,
  Get,
  Post,
  Body,
  Next,
  Req,
  Res,
  HttpStatus,
  HttpCode,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuthenticationService } from "./authentication.service";
import { SignInDTO } from "./dto/signIn.dto";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "./decorators/public.decorator";

@ApiTags("authentications")
@Controller("authentications")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signIn")
  async signIn(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    try {
      const auth = req.headers.authorization;
      if (!auth) throw new UnauthorizedException();
      const [username, password] = Buffer.from(auth.split(" ")[1], "base64")
        .toString()
        .split(":");

      const typeUsername = typeof username;
      if (typeUsername === "undefined" || typeUsername !== "string")
        throw new UnauthorizedException();

      const typePassword = typeof password;
      if (typePassword === "undefined" || typePassword !== "string")
        throw new UnauthorizedException();

      const data: SignInDTO = {
        username,
        password,
      };
      const result = await this.authenticationService.signIn(data);
      return res.respond("APIO-XX-XXXX", "ok", result);
    } catch (error) {
      next(error);
    }
  }
}
