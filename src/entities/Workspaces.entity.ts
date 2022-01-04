import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChannelsEntity } from './Channels.entity';
import { DMsEntity } from './DMs.entity';
import { MentionsEntity } from './Mentions.entity';
import { WorkspaceMembersEntity } from './WorkspaceMembers.entity';
import { UsersEntity } from './Users.entity';

@Index('name', ['name'], { unique: true })
@Index('url', ['url'], { unique: true })
@Index('OwnerId', ['OwnerId'], {})
@Entity({ schema: 'sleact', name: 'workspaces' })
export class WorkspacesEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 30 })
  name: string;

  @Column('varchar', { name: 'url', unique: true, length: 30 })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column('int', { name: 'OwnerId', nullable: true })
  OwnerId: number | null;

  @OneToMany(() => ChannelsEntity, (channels) => channels.Workspace)
  Channels: ChannelsEntity[];

  @OneToMany(() => DMsEntity, (dms) => dms.Workspace)
  DMs: DMsEntity[];

  @OneToMany(() => MentionsEntity, (mentions) => mentions.Workspace)
  Mentions: MentionsEntity[];

  @OneToMany(
    () => WorkspaceMembersEntity,
    (workspacemembers) => workspacemembers.Workspace,
    { cascade: ['insert'] },
  )
  WorkspaceMembers: WorkspaceMembersEntity[];

  @ManyToOne(() => UsersEntity, (users) => users.Workspaces, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
  Owner: UsersEntity;

  @ManyToMany(() => UsersEntity, (users) => users.Workspaces)
  Members: UsersEntity[];
}
