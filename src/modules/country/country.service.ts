import { Injectable } from "@nestjs/common";
import { Country } from "../../models/country.model";
import { Md5 } from "ts-md5/dist/md5";
import { CustomException } from "../../middlewares/customException.middleware";
import { CreateCountryDTO } from "./dto/createCountry.dto";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country)
    private readonly CountryModel: ReturnModelType<typeof Country>
  ) {}

  /**
   * Create country
   * @param data is country detail
   * @returns country on created
   */
  async create(data: CreateCountryDTO): Promise<Country> {
    try {
      const { name } = data;

      if (!name) throw new CustomException("Invalid request body", 400);

      const checkUserExist = await this.CountryModel.find(
        { name },
        { _id: 1 },
        { lean: true }
      ).exec();

      if (checkUserExist.length !== 0)
        throw new CustomException("Country already exist", 400);

      return this.CountryModel.create(data);
    } catch (error) {
      if (error.statusCode) throw error;
      const err = error as Error;
      throw new CustomException(err.message, 500);
    }
  }

  /**
   * Get all country
   * @returns countries
   */
  async findAll(): Promise<Country[] | null> {
    try {
      return await this.CountryModel.find({}, {}, { lean: true }).exec();
    } catch (error) {
      const err = error as Error;
      throw new CustomException(err.message, 500);
    }
  }

  /**
   * Find country by obejectId
   * @param id is id of country
   * @returns country detail
   */
  async findById(id: string): Promise<Country | null> {
    try {
      return await this.CountryModel.findById(id, {}, { lean: true }).exec();
    } catch (error) {
      const err = error as Error;
      throw new CustomException(err.message, 500);
    }
  }
}
