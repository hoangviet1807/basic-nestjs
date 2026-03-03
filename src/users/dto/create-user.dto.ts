import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsInt, Min, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: '' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({ example: 'admin', required: false })
  @IsOptional()
  @IsString()
  role?: string;
}
