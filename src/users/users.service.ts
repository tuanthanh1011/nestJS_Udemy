import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
// Khai báo như này vì import bcrypt và dùng hàm thì lỗi - Lỗi của thư viện
import { softDeletePlugin, SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>) { }
  // Cho app biết ta đang muốn dùng cái model đã được khai báo ở module ở đây
  // userModel thực chất là 1 biến có kiểu dữ liệu là Model<User> -- generic(ép kiểu về đúng Model User)

  getHashPassword = (password: string) => {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(password, salt);
    return hash;
  }

  async create(CreateUserDto: CreateUserDto) {
    const hassPassword = this.getHashPassword(CreateUserDto.password);
    let user = await this.userModel.create({
      email: CreateUserDto.email,
      password: hassPassword,
      name: CreateUserDto.name,
      address: CreateUserDto.address
    })
    return user;
  }

  async findAll() {
    return await this.userModel.find({});
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return 'Not found user';

    return this.userModel.findOne({
      _id: id
    })
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({
      email: username
    })
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: id }, updateUserDto)
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return 'Not found user';

    return this.userModel.softDelete({
      _id: id
    })
  }
}
