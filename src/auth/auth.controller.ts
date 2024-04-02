import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/users.interface';
import { Request, Response } from 'express';
import { RolesService } from 'src/roles/roles.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import path from 'path';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private rolesService: RolesService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @UseGuards(ThrottlerGuard)
  @Post('/login')
  @ResponseMessage('Login successfully!')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Public()
  @Get('/download')
  async downloadResume(@Res() res: Response) {
    const fileName = 'AI0 Tools Active Win 11.zip'; // Tên file muốn tải xuống
    const filePath = path.join('./src/auth/', fileName); // Đường dẫn đến file hi.txt

    res.download(filePath, fileName, (err) => {
      if (err) {
        // Xử lý lỗi nếu có
        console.log('TEST');
        console.error('Lỗi khi tải xuống file:', err);
        res.status(500).send('Đã xảy ra lỗi khi tải xuống file');
      }
    });
  }

  @ResponseMessage('Register successfully!')
  @Public()
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @ResponseMessage('Get user information')
  @UseGuards(ThrottlerGuard)
  @Get('/account')
  async handleGetAccount(@User() user: IUser) {
    const temp = (await this.rolesService.findOne(user.role._id)) as any;
    user.permissions = temp.permissions;
    return { user };
  }

  @Public()
  @ResponseMessage('Get user by refresh token')
  @Get('/refresh')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];
    return this.authService.processNewToken(refreshToken, response);
  }

  @ResponseMessage('Logout user')
  @Post('/logout')
  handleLogout(
    @User() user: IUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(user, response);
  }
}
