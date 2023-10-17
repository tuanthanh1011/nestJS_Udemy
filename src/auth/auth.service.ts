import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private configService: ConfigService) { }

    // username và pass là 2 tham số passport trả về
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user) {
            const isValid = this.usersService.isValidPassword(pass, user.password);
            if (isValid === true) {
                return user;
            }
        }
        return null;
    }

    async registerUser(registerUser: RegisterUserDto) {
        const result = await this.usersService.register(registerUser);
        return { result };
    }

    async login(user: IUser, response: Response) {
        const { _id, name, email, role } = user;
        const payload = {
            sub: "token login",
            iss: "from server",
            _id,
            name,
            email,
            role
        };
        const refresh_token = this.createRefreshToken(payload);

        await this.usersService.updateUserToken(refresh_token, _id);

        response.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))
        });
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                _id,
                name,
                email,
                role
            }
        };
    }

    createRefreshToken = (payload: any) => {
        const refresh_token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE")) / 1000
        });
        return refresh_token;
    }

    processNewToken = async (refreshToken: string, response: Response) => {
        try {
            this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            })

            let user = await this.usersService.findUserByToken(refreshToken);
            if (user) {
                //update refresh token
                const { _id, name, email, role } = user;
                const payload = {
                    sub: "token login",
                    iss: "from server",
                    _id,
                    name,
                    email,
                    role
                };
                const refresh_token = this.createRefreshToken(payload);

                // update user with refresh token
                await this.usersService.updateUserToken(refresh_token, _id.toString());

                //set refresh_token as cookies
                response.clearCookie('refresh_token')

                response.cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))
                });
                return {
                    access_token: this.jwtService.sign(payload),
                    user: {
                        _id,
                        name,
                        email,
                        role
                    }
                };
            }
            else
                throw new BadRequestException('Refresh token không hợp lệ. Vui lòng login.')
        }
        catch (error) {
            throw new BadRequestException('Refresh token không hợp lệ. Vui lòng login.')
        }
    }

    logout = async (user: IUser, response: Response) => {
        try {
            await this.usersService.updateUserToken(null, user._id);
            response.clearCookie('refresh_token');
            return 'ok';
        }
        catch (error) {
            console.log(error);
        }

    }
}
