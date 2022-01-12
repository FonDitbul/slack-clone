import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/Users.entity';
import { WorkspaceMembersEntity } from '../entities/WorkspaceMembers.entity';
import { ChannelMembersEntity } from '../entities/ChannelMembers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      WorkspaceMembersEntity,
      ChannelMembersEntity,
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
