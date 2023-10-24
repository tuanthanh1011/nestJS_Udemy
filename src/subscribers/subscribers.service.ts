import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SubcriberDocument, Subscriber } from './schema/subscriber.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name) private subcriberModel: SoftDeleteModel<SubcriberDocument>,
  ) { }

  async create(createSubscriberDto: CreateSubscriberDto, user: IUser) {
    const { email } = createSubscriberDto;
    const isExist = await this.subcriberModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Email ${email} đã tồn tại trên hệ thống!`);
    }
    return await this.subcriberModel.create({
      ...createSubscriberDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async getSkills(user: IUser) {
    const { email } = user;
    return await this.subcriberModel.findOne({ email }, { skills: 1 })
  }

  async findAll(page: number, limit: number, rq: string) {
    const { filter, projection, population } = aqp(rq);
    let { sort } = aqp(rq);
    let offset = (+page - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10; // Không truyền limit set mặc định: 10

    delete filter.current;
    delete filter.pageSize;

    const totalItems = (await this.subcriberModel.find(filter)).length; // Tổng SL bản ghi TM
    const totalPages = Math.ceil(totalItems / defaultLimit); // Số trang cần để hiển thị hết bản ghi

    const result = await this.subcriberModel.find(filter)
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
      throw new BadRequestException('Not found company');
    const result = await this.subcriberModel.findOne({
      _id: id
    })
    return result;
  }

  async update(updateSubscriberDto: UpdateSubscriberDto, user: IUser) {
    const { email } = user;
    return await this.subcriberModel.updateOne({ email: email }, {
      ...updateSubscriberDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    },
      { upsert: true }
    );
  }

  async remove(id: string, user: IUser) {
    await this.subcriberModel.updateOne(
      { _id: id },
      {
        deletedby: {
          _id: user._id,
          email: user.email
        }
      }
    )
    return this.subcriberModel.softDelete({ _id: id });
  }
}
