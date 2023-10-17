import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, ResponseMessage, User } from "src/decorator/customize";
import { AuthGuard } from "@nestjs/passport";
import { RegisterUserDto } from "src/users/dto/create-user.dto";
import { IUser } from "src/users/users.interface";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @ResponseMessage("Login successfully!")
    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
        return this.authService.login(req.user, response);
    }

    @ResponseMessage("Register successfully!")
    @Public()
    @Post('/register')
    handleRegister(@Body() registerUserDto: RegisterUserDto) {
        console.log(registerUserDto)
        return this.authService.registerUser(registerUserDto);
    }

    @ResponseMessage("Get user information")
    @Get('/account')
    handleGetAccount(@User() user: IUser) {
        return { user }
    }

    @Public()
    @ResponseMessage("Get user by refresh token")
    @Get('/refresh')
    handleRefreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const refreshToken = request.cookies['refresh_token'];
        return this.authService.processNewToken(refreshToken, response);
    }

    @ResponseMessage("Logout user")
    @Post('/logout')
    handleLogout(@User() user: IUser, @Res({ passthrough: true }) response: Response) {
        return this.authService.logout(user, response);
    }
}