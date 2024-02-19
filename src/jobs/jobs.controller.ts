import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("jobs")
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @ResponseMessage("Create a new job")
  @Post()
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @ResponseMessage("FETCH LIST JOB")
  @Get()
  @Public()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string, // Không truyền gì hiểu là lấy tất cả
    @Req() req: Request
  ) {
    return this.jobsService.findAll(+currentPage, +limit, queryString, req);
  }

  @ResponseMessage("Fetch user by id")
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @ResponseMessage("Update a job")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @User() user: IUser) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @ResponseMessage("Delete a job")
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
