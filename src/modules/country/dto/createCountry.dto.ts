import { ApiProperty } from "@nestjs/swagger";

export class CreateCountryDTO {
  @ApiProperty({
    type: String,
    description: "name is a required",
  })
  name: string;
}
