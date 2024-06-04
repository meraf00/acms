import { IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;
}
