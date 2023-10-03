import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {

    // gọi constructor của class cha 
    // tức là constructor của class AuthGuard mà JwtAuthGuard mở rộng (extends)
    super();
  }

  canActivate(context: ExecutionContext) {
    // lấy ra metadata gửi kèm với request
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException("Token không hợp lệ or không có token ở Bearer tpken ở Header request!");
    }
    return user;
  }
}
