import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from './Users.entity';
import { ChannelsEntity } from './Channels.entity';

// @Index('UserId', ['UserId'], {})
// @Index('ChannelId', ['ChannelId'], {})
@Entity({ name: 'channelchats' })
export class ChannelChatsEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'content' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('int', { name: 'UserId', nullable: true })
  UserId: number | null;

  @Column('int', { name: 'ChannelId', nullable: true })
  ChannelId: number | null;

  @ManyToOne(() => UsersEntity, (users) => users.ChannelChats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: UsersEntity;

  @ManyToOne(() => ChannelsEntity, (channels) => channels.ChannelChats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
  Channel: ChannelsEntity;
}
