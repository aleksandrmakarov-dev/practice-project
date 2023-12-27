import {
  Body,
  Controller,
  Ip,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpLocalDto } from "./dto/sign-up-local.dto";
import { SignInLocalDto } from "./dto/sign-in-local.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { SendVerificationEmailDto } from "./dto/send-verification-email.dto";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  private readonly refreshTokenName: string = "42f9a32d87_refresh";

  constructor(private readonly authService: AuthService) {}

  @Post("/sign-up/local")
  async signUpLocal(@Body() body: SignUpLocalDto) {
    await this.authService.signUpLocal(body);

    return {
      message:
        "To complete registation, check your email for verification letter",
    };
  }

  @Post("/sign-in/local")
  async signInLocal(
    @Body() body: SignInLocalDto,
    @Ip() ipAddress: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const signInData = await this.authService.signInLocal(body, ipAddress);

    response.cookie(this.refreshTokenName, signInData.refreshToken, {
      httpOnly: true,
    });

    return signInData.account;
  }

  @Post("/verify-email/:token")
  async verifyEmail(@Param(ValidationPipe) params: VerifyEmailDto) {
    await this.authService.verifyEmail(params);

    return {
      message: "Verification successful, you can now login",
    };
  }

  @Post("/send-verification-email")
  async sendVerificationEmail(@Body() body: SendVerificationEmailDto) {
    await this.authService.sendVerificationEmail(body);

    return {
      message: "Check your email for verification letter",
    };
  }

  @Post("refresh-token")
  async refreshToken(@Req() request: Request) {
    const token: string | undefined = request.cookies[this.refreshTokenName];

    if (!token) {
      throw new UnauthorizedException("Refresh token not found");
    }

    const accountData = await this.authService.refreshToken(token);

    return accountData;
  }
}