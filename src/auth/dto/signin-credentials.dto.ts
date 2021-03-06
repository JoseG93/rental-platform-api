import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class SignInCredentialsDto {
    @IsString()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    /* @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { message: 'password too weak' },
    ) */ 
    password: string;
}
