import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { CountryService } from "./country.service";
import { CountryController } from "./country.controller";
import { Country } from "../../models/country.model";

@Module({
  imports: [TypegooseModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
