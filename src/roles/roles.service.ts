import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './schema/role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { ADMIN_ROLE } from 'src/databases/sample';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>) { }
  
  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const { name } = createRoleDto;
    let findRole = await this.roleModel.findOne({ name });
    if (findRole)
      throw new BadRequestException('Role đã tồn tại!');
    else {
      let role = await this.roleModel.create({
        ...createRoleDto,
        createdBy: {
          _id: user._id,
          email: user.email
        }
      })
      return {
        _id: role._id,
        createAt: role.createdAt
      }
    }
  }

  async findAll(page: number, limit: number, rq: string) {
    const { filter, projection, population } = aqp(rq);
    let { sort } = aqp(rq);
    let offset = (+page - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10; // Không truyền limit set mặc định: 10

    delete filter.current;
    delete filter.pageSize;

    const totalItems = (await this.roleModel.find(filter)).length; // Tổng SL bản ghi TM
    const totalPages = Math.ceil(totalItems / defaultLimit); // Số trang cần để hiển thị hết bản ghi

    const result = await this.roleModel.find(filter)
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("not found role")
    }
    return (await this.roleModel.findById(id)).populate({
      path: "permissions",
      select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 }
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {

    return await this.roleModel.updateOne({ _id: id }, {
      ...updateRoleDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    })
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return 'Not found user';

    let foundRole = await this.roleModel.findById(id);
    if (foundRole.name === ADMIN_ROLE) {
      throw new BadRequestException('Không thể xóa role admin!');
    }

    await this.roleModel.updateOne({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return this.roleModel.softDelete({ _id: id });
  }
}
