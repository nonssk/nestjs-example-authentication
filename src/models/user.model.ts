import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";
import { Country } from "./country.model";
import mongoose from "mongoose";

export class User extends BaseModel {
  @prop()
  public username!: string;

  @prop()
  public password!: string;

  @prop()
  public name!: string;

  @prop({ type: mongoose.Types.ObjectId })
  public country!: Ref<Country>;
}
