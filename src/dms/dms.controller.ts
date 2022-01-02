import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('DM')
@Controller('api/workspaces/:url/dms')
export class DmsController {
  @Get()
  getAllChannels() {}

  @Post(':name')
  createChannel() {}

  @Get(':name')
  getSpecificChannel() {}

  @ApiParam({
    name: 'name',
    required: true,
    description: '사용자 아이디',
  })
  @ApiQuery({
    name: 'perPage',
    required: true,
    description: '한번에 가져오는 개수',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: '한번에 가져오는 페이지',
  })
  @Get(':name/chats')
  getChat(@Query() query) {
    console.log(query);
  }

  @Post(':name/chats')
  postChat() {}

  @Get(':name/members')
  getAllMembers() {}

  @Post(':name/members')
  inviteMembers() {}
}
