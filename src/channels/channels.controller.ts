import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CHANNLE')
@Controller('channels')
export class ChannelsController {}
