import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(150)
  readonly age: number;

  @IsNotEmpty()
  @IsEmail()
  readonly emailAddress: string;
}
