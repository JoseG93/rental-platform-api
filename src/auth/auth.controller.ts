import { Controller, Body, Post, Get, Req, Res, Next, UseGuards, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

// dto
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return this.authService.signUp(signUpCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(signInCredentialsDto);
    }

    // @Post('forgot')
    // async forgotPassword(@Req() req: Request) {
    //     return await this.authService.sendForgotPasswordEmail(req.body.email);
    // }

    // @Get('reset/:token')
    // async validateResetToken(@Req() req: Request) {
    //     return await this.authService.validateResetToken(req.params.token);
    // }

    // @Post('reset/:token')
    // async resetPassword(@Req() req: Request) {
    //     return await this.authService.resetPassword(req.body, req.params.token);
    // }

    // @Post('verification/resend')
    // async resendVerificationEmail(@Req () req: Request) {
    //     return await this.authService.sendVerificationEmail(req.body.email);
    // }

    // @Get('verify/:token')
    // async verifyAccount(@Req() req: Request) {
    //     return await this.authService.verifyAccount(req.params.token);
    // }

}
