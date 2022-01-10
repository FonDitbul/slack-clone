import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkspacesService } from './workspaces.service';
import { User } from '../common/decorators/user.decorator';
import { UsersEntity } from '../entities/Users.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}
  @Get()
  getMyWorkspaces(@User() User: UsersEntity) {
    return this.workspacesService.findMyWorkspaces(User.id);
  }

  @Post()
  async createWorkspace(
    @User() user: UsersEntity,
    @Body() body: CreateWorkspaceDto,
  ) {
    return this.workspacesService.createWorkspace(
      body.workspace,
      body.url,
      user.id,
    );
  }

  @Get(':url/members')
  async getAllMembersFromWorkspace(@Param('url') url: string) {
    return this.workspacesService.getWorkspaceMembers(url);
  }

  @Post(':url/members')
  inviteMembersToWorkspace() {}

  @Delete(':url/members/:id')
  kickMembersFromWorkspace() {}

  @Get(':url/members/:id')
  async getMembersInfoInWorkspace(
    @Param('url') url: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.workspacesService.getWorkspaceMember(url, +id);
  }
}
