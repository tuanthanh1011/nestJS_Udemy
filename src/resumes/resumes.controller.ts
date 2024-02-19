import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { Request, request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("resumes")
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  @Post()
  @ResponseMessage('Create a new resume')
  create(@Body() createResumeDto: CreateUserCvDto, @User() user: IUser) {
    return this.resumesService.create(createResumeDto, user);
  }

  @Get()
  @ResponseMessage("Fetch all resumes with paginate")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string, // Không truyền gì hiểu là lấy tất cả
    @Req() req: Request
  ) {
    return this.resumesService.findAll(+currentPage, +limit, queryString, req);
  }

  @Get(':id')
  @ResponseMessage("Fetch a resume by id")
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Update status resume")
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto, @User() user: IUser) {
    return this.resumesService.update(id, updateResumeDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a resume by id")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }

  @Post('by-user')
  @ResponseMessage("Get resume by User")
  getResumeByUser(@User() user: IUser) {
    return this.resumesService.findByUsers(user);
  }

}
