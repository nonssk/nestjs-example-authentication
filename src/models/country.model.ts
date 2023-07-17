import { prop } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";

export class Country extends BaseModel {
  @prop()
  public name!: string;
}
