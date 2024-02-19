import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ResponseMessage("Create a new User")
  @Post()
  create(@Body() CreateUserDto: CreateUserDto, @User() user: IUser) {
    return this.usersService.create(CreateUserDto, user);
  }

  @Get()
  @ResponseMessage("FETCH LIST USERS")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string // Không truyền gì hiểu là lấy tất cả
  ) {
    return this.usersService.findAll(+currentPage, +limit, queryString);
  }

  @ResponseMessage("Fetch user by id")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
    // Mặc định: +id -> Chuyển string sang number
  }

  @ResponseMessage("Update a new User")
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return this.usersService.update(updateUserDto, user);
  }

  @ResponseMessage("Delete a User")
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
