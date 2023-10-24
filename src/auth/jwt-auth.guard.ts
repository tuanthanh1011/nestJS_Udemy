import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from 'src/decorator/customize';

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

  handleRequest(err, user, info, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const isSkipPermission = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION, [
      context.getHandler(),
      context.getClass(),
    ]);

    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException("Token không hợp lệ or không có token ở Bearer tpken ở Header request!");
    }

    //check permissions
    const targetMethod = request.method;
    const targerEndpoint = request.route?.path as string;

    const permissions = user?.permissions ?? [];
    let isExist = permissions.find(permission => {
      return targetMethod == permission.method
        &&
        targerEndpoint == permission.apiPath
    })

    if (targerEndpoint.startsWith("/api/v1/auth")) isExist = true;
    if (!isExist && !isSkipPermission) {
      throw new ForbiddenException("Bạn không có để truy cập endpoint này!");
    }
    return user;
  }
}
