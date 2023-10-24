import { Injectable } from '@nestjs/common';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schema/resume.schema';
import mongoose, { Model } from 'mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: SoftDeleteModel<ResumeDocument>,
    private authService: AuthService
  ) { }

  async create(createResumeDto: CreateUserCvDto, user: IUser) {
    let resume = await this.resumeModel.create({
      ...createResumeDto,
      userId: user._id,
      email: user.email,
      status: 'PENDING',
      history: [
        {
          status: 'PENDING',
          updatedAt: new Date(),
          updatedBy: {
            _id: user._id,
            email: user.email
          }
        }
      ],
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
    return {
      _id: resume._id,
      createAt: resume.createdAt
    };
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
      filter = { ...filter, 'companyId': addFilter }

    const totalItems = (await this.resumeModel.find(filter)).length; // Tổng SL bản ghi TM
    const totalPages = Math.ceil(totalItems / defaultLimit); // Số trang cần để hiển thị hết bản ghi

    const result = await this.resumeModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .populate(population)
      .select(projection as any)
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
      return 'Not found resume';

    const result = await this.resumeModel.findOne({
      _id: id
    })
    return result;
  }

  async update(id: string, updateResumeDto: UpdateResumeDto, user: IUser) {
    const { status } = updateResumeDto;
    let resume = this.resumeModel.updateOne({ _id: id }, {
      status,
      updatedBy: {
        _id: user._id,
        email: user.email
      },
      $push: {
        history: {
          status,
          updatedAt: new Date(),
          updatedBy: {
            _id: user._id,
            email: user.email
          }
        }
      }
    })

    return resume;
  }

  async remove(id: string, user: IUser) {
    await this.resumeModel.updateOne({ _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      })
    return this.resumeModel.softDelete({ _id: id });
  }

  async findByUsers(user: IUser) {
    let resume = await this.resumeModel.find({
      userId: user._id
    }).sort("createdAt").populate([
      {
        path: "companyId",
        select: { name: 1 }
      },
      {
        path: "jobId",
        select: { name: 1 }
      }
    ])
    return resume;
  }
}
