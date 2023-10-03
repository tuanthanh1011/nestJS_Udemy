import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  // name ở đây ko lquan tới tt name trong đối tượng User,
  // hiểu nó như là 1 ID định danh và cái ID đó sẽ ứng với model này
  // Việc import muốn nói cho app rằng ta đang muốn sd UserSchema
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }

// Việc sử dụng import sẽ giúp chúng ta có thể tương tác dữ liệu giữa các module khác nhau