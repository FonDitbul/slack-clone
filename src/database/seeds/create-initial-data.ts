import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { WorkspacesEntity } from '../../entities/Workspaces.entity';
import { ChannelsEntity } from '../../entities/Channels.entity';
import { UsersEntity } from '../../entities/Users.entity';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    // const Workspace = new WorkspacesEntity();
    // Workspace.id = 1;
    // Workspace.name = 'sleact';
    // Workspace.url = 'sleact';
    //
    // await connection.getRepository(WorkspacesEntity).save(Workspace);

    // await connection.createQueryBuilder().insert().into(WorkspacesEntity);
    //   .values([{ id: 1, name: 'sleact', url: 'sleact' }])
    //   .execute();

    // await connection.createQueryBuilder().insert().into(ChannelsEntity);
    // .values([{ id: 1, name: '일반', WorkspaceId: 1 }])
    // .execute();
    await connection.createQueryBuilder().insert().into(UsersEntity);
  }
}
