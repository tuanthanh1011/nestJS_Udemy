import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, ResponseMessage } from "src/decorator/customize";
import { AuthGuard } from "@nestjs/passport";
import { RegisterUserDto } from "src/users/dto/create-user.dto";


@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @ResponseMessage("Login successfully!")
    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    handleLogin(@Request() req) {
        return this.authService.login(req.user);
    }

    @ResponseMessage("Register successfully!")
    @Public()
    @Post('/register')
    handleRegister(@Body() registerUserDto: RegisterUserDto) {
        console.log(registerUserDto)
        return this.authService.registerUser(registerUserDto);
    }
}