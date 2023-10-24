import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schemas';
import { IUser } from 'src/users/users.interface';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JobsService {

  constructor(
    @InjectModel(Job.name) private readonly jobModel: SoftDeleteModel<JobDocument>,
    private usersService: UsersService,
    private authService: AuthService,
  ) { }

  async create(createJobDto: CreateJobDto, user: IUser) {
    const { startDate, endDate } = createJobDto;
    if (this.handleDate(startDate, endDate)) {
      return await this.jobModel.create({
        ...createJobDto, createdBy: {
          _id: user._id,
          email: user.email
        }
      });
    }
    else
      throw new BadRequestException('Thời gian đặt không hợp lệ!');
  }

  async findAll(page: number, limit: number, rq: string, req: Request) {

    let { filter, projection, population } = aqp(rq);
    let { sort } = aqp(rq);
    let offset = (+page - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10; // Không truyền limit set mặc định: 10

    delete filter.current;
    delete filter.pageSize;

    let addFilter = await this.authService.handleFetchByHR(req);

    if (addFilter)
      filter = { ...filter, 'company._id': addFilter }

    const totalItems = (await this.jobModel.find(filter)).length; // Tổng SL bản ghi TM
    const totalPages = Math.ceil(totalItems / defaultLimit); // Số trang cần để hiển thị hết bản ghi

    const result = await this.jobModel.find(filter)
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
      return 'not found job';
    return await this.jobModel.findById(id);
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    const { startDate, endDate } = updateJobDto;
    if (this.handleDate(startDate, endDate)) {
      return await this.jobModel.updateOne({ _id: id }, {
        ...updateJobDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      });
    }
    else
      throw new BadRequestException('Thời gian đặt không hợp lệ!');
  }

  async remove(id: string, user: IUser) {
    await this.jobModel.updateOne({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })

    return this.jobModel.softDelete({ _id: id });
  }

  handleDate(startDate: Date, endDate: Date) {
    const today = dayjs();
    const startDateJS = dayjs(startDate);
    const endDateJS = dayjs(endDate);
    if (endDateJS.isAfter(today) && startDateJS.isBefore(endDateJS))
      return true;
    else
      return false;
  }
}
