import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/Users.entity';
import { WorkspacesEntity } from '../entities/Workspaces.entity';
import { ChannelsEntity } from '../entities/Channels.entity';
import { WorkspaceMembersEntity } from '../entities/WorkspaceMembers.entity';
import { ChannelMembersEntity } from '../entities/ChannelMembers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      WorkspacesEntity,
      ChannelsEntity,
      WorkspaceMembersEntity,
      ChannelMembersEntity,
    ]),
  ],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
