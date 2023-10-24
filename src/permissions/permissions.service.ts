import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './schema/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel(Permission.name) private permissionModel: SoftDeleteModel<PermissionDocument>) { }

  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    const { apiPath, method } = createPermissionDto;
    let findPermission = await this.permissionModel.findOne({
      apiPath, method
    })
    if (findPermission) {
      throw new BadRequestException('apiPath và method đã tồn tại!');
    }
    else {
      let permission = await this.permissionModel.create({
        ...createPermissionDto,
        createdBy: {
          _id: user._id,
          email: user.email
        }
      })
      return {
        _id: permission._id,
        createAt: permission.createdAt
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

    const totalItems = (await this.permissionModel.find(filter)).length; // Tổng SL bản ghi TM
    const totalPages = Math.ceil(totalItems / defaultLimit); // Số trang cần để hiển thị hết bản ghi

    const result = await this.permissionModel.find(filter)
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
    if (!mongoose.isValidObjectId(id))
      throw new BadRequestException('Not found permission')
    return await this.permissionModel.findOne({
      _id: id
    })
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
    if (!mongoose.isValidObjectId(id))
      throw new BadRequestException('Not found permission')
    return await this.permissionModel.updateOne({ _id: id }, {
      ...updatePermissionDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    })
  }

  async remove(id: string, user: IUser) {
    await this.permissionModel.updateOne({_id: id}, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return this.permissionModel.softDelete({_id: id})
  }
}
