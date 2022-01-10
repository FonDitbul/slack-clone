import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelsEntity } from '../entities/Channels.entity';
import { ChannelMembersEntity } from '../entities/ChannelMembers.entity';
import { WorkspacesEntity } from '../entities/Workspaces.entity';
import { ChannelChatsEntity } from '../entities/ChannelChats.entity';
import { UsersEntity } from '../entities/Users.entity';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(ChannelsEntity)
    private channelsRepository: Repository<ChannelsEntity>,
    @InjectRepository(ChannelMembersEntity)
    private channelMembersRepository: Repository<ChannelMembersEntity>,
    @InjectRepository(WorkspacesEntity)
    private workspacesRepository: Repository<WorkspacesEntity>,
    @InjectRepository(ChannelChatsEntity)
    private channelChatsRepository: Repository<ChannelChatsEntity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>, // private readonly eventsGateway: EventsGateway,
  ) {}

  async findById(id: number) {
    return this.channelsRepository.find({ where: { id } });
  }

  async getWorkspaceChannels(url: string, myId: number) {
    return this.channelsRepository
      .createQueryBuilder('channels')
      .innerJoinAndSelect(
        'channels.ChannelMembers',
        'channelMembers',
        'channelMembers.userId = :myId',
        { myId },
      )
      .innerJoinAndSelect(
        'channels.Workspace',
        'workspace',
        'workspace.url=:url',
        { url },
      )
      .getMany();
  }

  async getWorkspaceChannel(url: string, name: string) {
    return this.channelsRepository.findOne({
      where: {
        name,
      },
      relations: ['Workspace'],
    });
  }
}
