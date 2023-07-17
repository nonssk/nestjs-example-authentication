import {
  Controller,
  Get,
  Post,
  Body,
  Next,
  Param,
  Req,
  Res,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { ApiTags } from "@nestjs/swagger";
import { isValidObjectId } from "mongoose";
import { CustomException } from "../../middlewares/customException.middleware";
import { Public } from "../authentication/decorators/public.decorator";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const result = await this.userService.findAll();
      return res.status(HttpStatus.OK).respond("APIO-XX-XXXX", "ok", result);
    } catch (error) {
      next(error);
    }
  }

  @Get("list")
  async getUserList(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const result = await this.userService.list();
      return res.status(HttpStatus.OK).respond("APIO-XX-XXXX", "ok", result);
    } catch (error) {
      next(error);
    }
  }

  @Get(":id")
  async getUserById(
    @Param("id") id: string,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    try {
      if (!isValidObjectId(id))
        throw new CustomException("Invalid params", 400);

      const result = await this.userService.findById(id);
      return res.status(HttpStatus.OK).respond("APIO-XX-XXXX", "ok", result);
    } catch (error) {
      next(error);
    }
  }

  @Public()
  @Post()
  async createUser(
    @Body() user: CreateUserDTO,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    try {
      await this.userService.create(user);
      return res.status(HttpStatus.OK).respond("APIO-XX-XXXX", "ok");
    } catch (error) {
      next(error);
    }
  }
}
