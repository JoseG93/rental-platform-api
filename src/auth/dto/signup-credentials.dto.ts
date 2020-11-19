import { IsString, MinLength, Matches } from 'class-validator';

export class SignUpCredentialsDto {
    @IsString()
    // @Matches()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @MinLength(6)
    password: string;
}
