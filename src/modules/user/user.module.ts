import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "../../models/user.model";
import { Country } from "../../models/country.model";

@Module({
  imports: [TypegooseModule.forFeature([User, Country])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
