import { Module } from "@nestjs/common";
import { TypegooseConnectionOptions, TypegooseModule } from "nestjs-typegoose";
import { UserModule } from "./modules/user/user.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { CountryModule } from "./modules/country/country.module";

@Module({
  imports: [
    TypegooseModule.forRoot(process.env.MONGO_HOST || "", {
      dbName: process.env.MONGO_DATABASE || "",
    } as TypegooseConnectionOptions),
    UserModule,
    AuthenticationModule,
    CountryModule,
  ],
})
export class AppModule {}
