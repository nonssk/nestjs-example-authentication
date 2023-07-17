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
    @Body() data: SignInDTO,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    try {
      const result = await this.authenticationService.signIn(data);
      return res.respond("APIO-XX-XXXX", "ok", result);
    } catch (error) {
      next(error);
    }
  }
}
