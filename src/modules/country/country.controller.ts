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
import { CountryService } from "./country.service";
import { CreateCountryDTO } from "./dto/createCountry.dto";
import { ApiTags } from "@nestjs/swagger";
import { isValidObjectId } from "mongoose";
import { CustomException } from "../../middlewares/customException.middleware";
import { Public } from "../authentication/decorators/public.decorator";

@ApiTags("countries")
@Controller("countries")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Public()
  @Get()
  async getCountry(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const result = await this.countryService.findAll();
      return res.status(HttpStatus.OK).respond("APIO-XX-XXXX", "ok", result);
    } catch (error) {
      next(error);
    }
  }

  @Public()
  @Get(":id")
  async getCountryById(
    @Param("id") id: string,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    try {
      if (!isValidObjectId(id))
        throw new CustomException("Invalid params", 400);

      const result = await this.countryService.findById(id);
      return res.status(HttpStatus.OK).respond("APIO-XX-XXXX", "ok", result);
    } catch (error) {
      next(error);
    }
  }

  @Public()
  @Post()
  async createCountry(
    @Body() user: CreateCountryDTO,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    try {
      const result = await this.countryService.create(user);
      return res.status(HttpStatus.OK).respond("APIO-XX-XXXX", "ok", result);
    } catch (error) {
      next(error);
    }
  }
}
