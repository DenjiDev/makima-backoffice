import { IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCustomersDto {

  @IsString()
  @IsOptional()
  @IsPhoneNumber("BR")
  @ApiProperty({
      description: 'Customer phone number',
      default: "557388015449",
      type: String
  })
  phone: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
      description: 'Customer name',
      default: "Gabriel Queiroz",
      type: String
  })
  name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
      description: 'Number of groups where customer can insert Makima in',
      default: 1,
      type: Number
  })
  credit?: number;

}