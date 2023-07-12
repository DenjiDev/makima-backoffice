import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
    @IsString()
    @IsPhoneNumber("BR")
    @ApiProperty({
        description: 'Customer phone number',
        default: "557388015449",
        type: String
    })
    phone: string;

    @IsString()
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

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Customer email',
        default: "gabrielqueiroz@hotmail.com",
        type: String
    })
    email: string;
}
