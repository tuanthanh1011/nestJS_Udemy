import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "src/decorator/customize";
import { AuthGuard } from "@nestjs/passport";


@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('/login')

    handleLogin(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}