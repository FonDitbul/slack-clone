import { PickType } from '@nestjs/swagger';
import { ChannelChatsEntity } from '../../entities/ChannelChats.entity';

export class PostChatDto extends PickType(ChannelChatsEntity, ['content']) {}
