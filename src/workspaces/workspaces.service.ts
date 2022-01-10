import { Injectable } from '@nestjs/common';
import { WorkspacesEntity } from '../entities/Workspaces.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelsEntity } from '../entities/Channels.entity';
import { WorkspaceMembersEntity } from '../entities/WorkspaceMembers.entity';
import { ChannelMembersEntity } from '../entities/ChannelMembers.entity';
import { UsersEntity } from '../entities/Users.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(WorkspacesEntity)
    private workspacesRepository: Repository<WorkspacesEntity>,
    @InjectRepository(ChannelsEntity)
    private channelsRepository: Repository<ChannelsEntity>,
    @InjectRepository(WorkspaceMembersEntity)
    private workspaceMembersRepository: Repository<WorkspaceMembersEntity>,
    @InjectRepository(ChannelMembersEntity)
    private channelMembersRepository: Repository<ChannelMembersEntity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async findById(id: number) {
    return this.workspacesRepository.findOne({ where: { id } });
  }

  async findMyWorkspaces(myId: number) {
    return this.workspacesRepository.find({
      where: {
        WorkspaceMembers: [{ UserId: myId }],
      },
    });
  }

  async createWorkspace(name: string, url: string, myId: number) {
    const workspace = new WorkspacesEntity();
    workspace.name = name;
    workspace.url = url;
    workspace.OwnerId = myId;
    const returned = await this.workspacesRepository.save(workspace);

    const workspaceMember = new WorkspaceMembersEntity();
    workspaceMember.UserId = myId;
    workspaceMember.WorkspaceId = returned.id;
    await this.workspaceMembersRepository.save(workspaceMember);

    const channel = new ChannelsEntity();
    channel.name = '일반';
    channel.WorkspaceId = returned.id;
    const channelReturned = await this.channelsRepository.save(channel);

    const channelMember = new ChannelMembersEntity();
    channelMember.UserId = myId;
    channelMember.ChannelId = channelReturned.id;
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceMembers(url: string) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.WorkspaceMembers', 'members')
      .innerJoin('members.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .getMany();
  }
}
