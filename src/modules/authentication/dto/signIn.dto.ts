import { ApiProperty } from "@nestjs/swagger";

export class SignInDTO {
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
}
