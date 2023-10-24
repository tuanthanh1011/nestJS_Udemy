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
import aqp from 'api-query-params';
import { Role, RoleDocument } from 'src/roles/schema/role.schema';
import { USER_ROLE } from 'src/databases/sample';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(UserM.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>
  ) { }
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

    //fetch userRole 
    const userRole = await this.roleModel.findOne({ name: USER_ROLE })

    const hassPassword = this.getHashPassword(password);
    let user = await this.userModel.create({
      name, email, password: hassPassword, age, gender, address,
      role: userRole?._id,
    })
    
    return {
      _id: user?._id,
      createdAt: user?.createdAt
    };
  }

  async findAll(page: number, limit: number, rq: string) {
    // const query = aqp(queryString);
    // const offset = (currentPage - 1) * limit;
    // delete query.filter.page;
    // return await this.companyModel.find(query.filter).skip(offset).limit(limit).populate('createdBy');

    const { filter, projection, population } = aqp(rq);
    let { sort } = aqp(rq);
    let offset = (+page - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10; // Không truyền limit set mặc định: 10

    delete filter.current;
    delete filter.pageSize;

    const totalItems = (await this.userModel.find(filter)).length; // Tổng SL bản ghi TM
    const totalPages = Math.ceil(totalItems / defaultLimit); // Số trang cần để hiển thị hết bản ghi

    const result = await this.userModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .populate(population)
      .exec()

    return {
      meta: {
        current: page,
        pageSize: limit,
        pages: totalPages,
        total: totalItems
      },
      result
    }
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return 'Not found user';

    const result = await this.userModel.findOne({
      _id: id
    }).select('-password').populate({ path: "role", select: { name: 1, _id: 1 } })
    return result;
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({
      email: username
    }).populate({ path: 'role', select: { name: 1 } })
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
      throw new BadRequestException('Not found user');

    let foundUser = await this.userModel.findById(id);
    if (foundUser && foundUser.email === 'admin@gmail.com') {
      throw new BadRequestException('Không thể xóa tài khoản admin!');
    }

    await this.userModel.updateOne({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })

    const result = this.userModel.softDelete({ _id: id })
    return result;
  }

  updateUserToken = async (refreshToken: string, _id: string) => {
    return await this.userModel.updateOne({ _id }, { refreshToken })
  }

  findUserByToken = async (refreshToken: string) => {
    return (await this.userModel.findOne({ refreshToken })).populate({
      path: 'role',
      select: { name: 1 }
    })
  }
}
