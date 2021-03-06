import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChannelChatsEntity } from './ChannelChats.entity';
import { ChannelMembersEntity } from './ChannelMembers.entity';
import { ChannelsEntity } from './Channels.entity';
import { DMsEntity } from './DMs.entity';
import { MentionsEntity } from './Mentions.entity';
import { WorkspaceMembersEntity } from './WorkspaceMembers.entity';
import { WorkspacesEntity } from './Workspaces.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
// @Index('email', ['email'], { unique: true })
@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsEmail()
  @ApiProperty({
    example: 'gweongi@gmail.com',
    description: '이메일',
    required: true,
  })
  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'gweongi',
    description: '닉네임',
    required: true,
  })
  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'node',
    description: '비밀번호',
    required: true,
  })
  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ChannelChatsEntity, (channelchats) => channelchats.User)
  ChannelChats: ChannelChatsEntity[];

  @OneToMany(
    () => ChannelMembersEntity,
    (channelmembers) => channelmembers.User,
  )
  ChannelMembers: ChannelMembersEntity[];

  @OneToMany(() => DMsEntity, (dms) => dms.Sender)
  DMs: DMsEntity[];

  @OneToMany(() => DMsEntity, (dms) => dms.Receiver)
  DMs2: DMsEntity[];

  @OneToMany(() => MentionsEntity, (mentions) => mentions.Sender)
  Mentions: MentionsEntity[];

  @OneToMany(() => MentionsEntity, (mentions) => mentions.Receiver)
  Mentions2: MentionsEntity[];

  @OneToMany(
    () => WorkspaceMembersEntity,
    (workspacemembers) => workspacemembers.User,
  )
  WorkspaceMembers: WorkspaceMembersEntity[];

  @OneToMany(() => WorkspacesEntity, (workspaces) => workspaces.Owner)
  OwnedWorkspaces: WorkspacesEntity[];

  @ManyToMany(() => WorkspacesEntity, (workspaces) => workspaces.Members)
  @JoinTable({
    name: 'workspacemembers',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'WorkspaceId',
      referencedColumnName: 'id',
    },
  })
  Workspaces: WorkspacesEntity[];

  @ManyToMany(() => ChannelsEntity, (channels) => channels.Members)
  @JoinTable({
    name: 'channelmembers',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ChannelId',
      referencedColumnName: 'id',
    },
  })
  Channels: ChannelsEntity[];
}
