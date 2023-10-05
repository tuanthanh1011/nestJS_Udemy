import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserM, UserDocument } from './schemas/user.schema';
import mongoose from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
// Khai báo như này vì import bcrypt và dùng hàm thì lỗi - Lỗi của thư viện
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {

  constructor(@InjectModel(UserM.name) public userModel: SoftDeleteModel<UserDocument>) { }
  // Cho app biết ta đang muốn dùng cái model đã được khai báo ở module ở đây
  // userModel thực chất là 1 biến có kiểu dữ liệu là Model<User> -- generic(ép kiểu về đúng Model User)

  getHashPassword = (password: string) => {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(password, salt);
    return hash;
  }

  async create(CreateUser: CreateUserDto, user: IUser) {
    const { name, email, password, age, gender, address, role, company } = CreateUser

    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Email ${email} đã tồn tại trên hệ thống!`);
    }
    const hassPassword = this.getHashPassword(password);
    let newUser = await this.userModel.create({
      name, email, password: hassPassword, age, gender, address, role, company
    })
    const result = {
      _id: user._id,
      createdAt: newUser.createdAt
    }
    return result;
  }

  async register(registerUser: RegisterUserDto) {
    const { name, email, password, age, gender, address } = registerUser
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Email ${email} đã tồn tại trên hệ thống!`);
    }
    const hassPassword = this.getHashPassword(password);
    let user = await this.userModel.create({
      name, email, password: hassPassword, age, gender, address,
      role: "User",
    })
    let result = {
      _id: user?._id,
      createdAt: user?.createdAt
    };
    return result;
  }

  async findAll() {
    const listUsers = await this.userModel.find({});
    return listUsers;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return 'Not found user';

    const result = await this.userModel.findOne({
      _id: id
    }).select('-password')
    return result;
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({
      email: username
    })
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {
    const result = await this.userModel.updateOne({ _id: updateUserDto._id }, {
      ...updateUserDto,
      updatedby: {
        _id: user._id,
        email: user.email
      }
    })
    return result;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return 'Not found user';

    this.userModel.updateOne({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })

    const result = await this.userModel.softDelete({ _id: id })
    return result;
  }

  updateUserToken = async (refreshToken: string, _id: string) => {
    return await this.userModel.updateOne({_id}, {refreshToken})
  }
}
