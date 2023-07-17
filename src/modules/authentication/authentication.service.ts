import { JwtService } from "@nestjs/jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../../models/user.model";
import { Md5 } from "ts-md5/dist/md5";
import { CustomException } from "../../middlewares/customException.middleware";
import { SignInDTO } from "./dto/signIn.dto";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
    private jwtService: JwtService
  ) {}

  /**
   * SignIn system
   * @param data is signIn data ex. username, password
   * @returns token
   */
  async signIn(data: SignInDTO): Promise<string> {
    try {
      const { username, password } = data;
      const hashPassword = Md5.hashStr(password).toString();

      const getUserData = await this.UserModel.findOne(
        { username, password: hashPassword },
        {},
        { lean: true }
      ).exec();

      if (!getUserData) throw new UnauthorizedException(); //throw new CustomException("Not found user", 404);

      const { _id, name } = getUserData;

      const payload = {
        uid: _id.toString(),
        name: name,
      };

      return this.jwtService.signAsync(payload);
    } catch (error) {
      if (error.statusCode) throw error;
      const err = error as Error;
      throw new CustomException(err.message, 500);
    }
  }
}
