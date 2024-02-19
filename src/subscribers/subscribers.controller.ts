import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { ResponseMessage, SkipCheckPermission, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("subscribers")
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) { }

  @ResponseMessage("Create a new Subcriber")
  @Post()
  create(@Body() createSubscriberDto: CreateSubscriberDto, @User() user: IUser) {
    return this.subscribersService.create(createSubscriberDto, user);
  }

  @Post("skills")
  @SkipCheckPermission()
  @ResponseMessage("Get subscriber's skills")
  getUserSkills(@User() user: IUser) {
    return this.subscribersService.getSkills(user);
  }

  @Get()
  @ResponseMessage("Fetch list Subcriber")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string // Không truyền gì hiểu là lấy tất cả
  ) {
    return this.subscribersService.findAll(+currentPage, +limit, queryString);
  }

  @Get(':id')
  @ResponseMessage("Fetch Subcriber by id")
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch()
  // @SkipCheckPermission()
  @ResponseMessage("Update a Subcriber")
  update(@Body() updateSubscriberDto: UpdateSubscriberDto, @User() user: IUser) {
    return this.subscribersService.update(updateSubscriberDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a Subcriber")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.subscribersService.remove(id, user);
  }
}
