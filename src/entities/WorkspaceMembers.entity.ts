import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { WorkspacesEntity } from './Workspaces.entity';
import { UsersEntity } from './Users.entity';

// @Index('UserId', ['UserId'], {})
@Entity('workspacemembers', {})
export class WorkspaceMembersEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('int', { primary: true, name: 'WorkspaceId' })
  WorkspaceId: number;

  @Column('int', { primary: true, name: 'UserId' })
  UserId: number;

  // @Column('datetime', { name: 'loggedInAt', nullable: true })
  // loggedInAt: Date | null;

  @ManyToOne(
    () => WorkspacesEntity,
    (workspaces) => workspaces.WorkspaceMembers,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id' }])
  Workspace: WorkspacesEntity;

  @ManyToOne(() => UsersEntity, (users) => users.WorkspaceMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: UsersEntity;
}
