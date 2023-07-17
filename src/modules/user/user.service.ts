import { Injectable } from "@nestjs/common";
import { User } from "../../models/user.model";
import { Country } from "../../models/country.model";
import { Md5 } from "ts-md5/dist/md5";
import { CustomException } from "../../middlewares/customException.middleware";
import { CreateUserDTO } from "./dto/createUser.dto";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { isValidObjectId } from "mongoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
    @InjectModel(Country)
    private readonly CountryModel: ReturnModelType<typeof Country>
  ) {}

  /**
   * Create user
   * @param data is user detail
   * @returns void
   */
  async create(data: CreateUserDTO): Promise<void> {
    try {
      const { username, password, name, country } = data;

      if (!username || !password || !name || !isValidObjectId(country))
        throw new CustomException("Invalid request body", 400);

      const checkCountry = await this.CountryModel.findById(
        country,
        {},
        { lean: true }
      ).exec();
      if (!checkCountry) throw new CustomException("Not found country", 400);

      const checkUserExist = await this.UserModel.find(
        { username },
        { _id: 1 },
        { lean: true }
      ).exec();

      if (checkUserExist.length !== 0)
        throw new CustomException("User already exist", 400);

      const hashPassword = Md5.hashStr(password).toString();
      data.password = hashPassword;
      const result = await this.UserModel.create(data);
    } catch (error) {
      if (error.statusCode) throw error;
      const err = error as Error;
      throw new CustomException(err.message, 500);
    }
  }

  /**
   * Get all user
   * @returns users
   */
  async findAll(): Promise<User[] | null> {
    try {
      return await this.UserModel.find(
        {
          active: true,
          delete: false,
        },
        { password: 0 },
        { lean: true }
      ).exec();
    } catch (error) {
      const err = error as Error;
      throw new CustomException(err.message, 500);
    }
  }

  /**
   * Find user by objectId
   * @param id is id of user
   * @returns user detail
   */
  async findById(id: string): Promise<User | null> {
    try {
      return await this.UserModel.findById(
        id,
        { password: 0 },
        { lean: true }
      ).exec();
    } catch (error) {
      const err = error as Error;
      throw new CustomException(err.message, 500);
    }
  }

  /**
   * Get list user
   * @returns users
   */
  async list(): Promise<unknown> {
    try {
      return this.UserModel.aggregate([
        {
          $lookup: {
            from: "countries",
            localField: "country",
            foreignField: "_id",
            as: "countryData",
          },
        },
        {
          $unwind: {
            path: "$countryData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            name: "$name",
            country: "$countryData.name",
          },
        },
      ]).exec();
    } catch (error) {
      const err = error as Error;
      throw new CustomException(err.message, 500);
    }
  }
}
