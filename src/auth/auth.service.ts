import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Request, Response } from 'express';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private rolesService: RolesService
    ) { }

    // username và pass là 2 tham số passport trả về
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user) {
            const isValid = this.usersService.isValidPassword(pass, user.password);
            if (isValid === true) {
                const userRole = user.role as unknown as { _id: string; name: string }
                const temp = await this.rolesService.findOne(userRole._id);

                const objUser = {
                    ...user.toObject(),
                    permissions: temp?.permissions ?? []
                }
                return objUser;
            }
        }
        return null;
    }

    async registerUser(registerUser: RegisterUserDto) {
        return await this.usersService.register(registerUser);
    }

    async login(user: IUser, response: Response) {
        const { _id, name, email, role, permissions } = user;
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
                role,
                permissions
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

                // fetch user's role
                const userRole = user.role as unknown as { _id: string; name: string }
                const temp = await this.rolesService.findOne(userRole._id)

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
                        role,
                        permissions: temp?.permissions ?? []
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

    handleFetchByHR = async (req: Request) => {
        let payload: IUser;
        const authorizationHeader = req.headers['authorization'];

        if (authorizationHeader) {
            const [bearer, token] = authorizationHeader.split(' ');

            if (bearer === 'Bearer' && token) {
                payload = await this.jwtService.verifyAsync(
                    token,
                    {
                        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET')
                    }
                );
                if (payload.role.name === 'HR') {
                    let user: any = await this.usersService.findOne(payload._id);
                    let companyByUser = user.company;
                    return companyByUser._id as string;
                }
            }
        }

        return '';
    }
}
