import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChannelChatsEntity } from './ChannelChats.entity';
import { ChannelMembersEntity } from './ChannelMembers.entity';
import { UsersEntity } from './Users.entity';
import { WorkspacesEntity } from './Workspaces.entity';

// @Index('WorkspaceId', ['WorkspaceId'], {})
@Entity({ name: 'channel' })
export class ChannelsEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @Column({
    name: 'private',
    nullable: true,
    // width: 1,
    // default: () => "'0'",
  })
  private: boolean | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('int', { name: 'WorkspaceId', nullable: true })
  WorkspaceId: number | null;

  @OneToMany(() => ChannelChatsEntity, (channelchats) => channelchats.Channel)
  ChannelChats: ChannelChatsEntity[];

  @OneToMany(
    () => ChannelMembersEntity,
    (channelMembers) => channelMembers.Channel,
    {
      cascade: ['insert'],
    },
  )
  ChannelMembers: ChannelMembersEntity[];

  @ManyToMany(() => UsersEntity, (users) => users.Channels)
  Members: UsersEntity[];

  @ManyToOne(() => WorkspacesEntity, (workspaces) => workspaces.Channels, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id' }])
  Workspace: WorkspacesEntity;
}
