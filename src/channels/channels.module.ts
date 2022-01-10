import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelsEntity } from '../entities/Channels.entity';
import { ChannelChatsEntity } from '../entities/ChannelChats.entity';
import { UsersEntity } from '../entities/Users.entity';
import { WorkspacesEntity } from '../entities/Workspaces.entity';
import { ChannelMembersEntity } from '../entities/ChannelMembers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChannelsEntity,
      ChannelChatsEntity,
      UsersEntity,
      WorkspacesEntity,
      ChannelMembersEntity,
    ]),
  ],
  providers: [ChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
