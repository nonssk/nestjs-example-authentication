import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    description: "username is a required",
  })
  username: string;

  @ApiProperty({
    type: String,
    description: "password is a required",
  })
  password: string;

  @ApiProperty({
    type: String,
    description: "name is a required",
  })
  name: string;

  @ApiProperty({
    type: String,
    description: "country is a required",
  })
  country: string;
}
