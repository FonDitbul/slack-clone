import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChannelsService } from './channels.service';
import { User } from '../common/decorators/user.decorator';
import { UsersEntity } from '../entities/Users.entity';

@ApiTags('CHANNLE')
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @ApiOperation({ summary: '워크스페이스 채널 모두 가져오기' })
  @Get(':url/channels')
  async getWorkspaceChannels(@Param('url') url, @User() user: UsersEntity) {
    return this.channelsService.getWorkspaceChannels(url, user.id);
  }

  @ApiOperation({ summary: '워크스페이스 특정 채널 가져오기' })
  @Get(':url/channels/:name')
  async getWorkspaceChannel(@Param('url') url, @Param('name') name) {
    return this.channelsService.getWorkspaceChannel(url, name);
  }
}
