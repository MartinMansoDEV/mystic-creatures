import { Module } from '@nestjs/common';
import { CreaturesResolver } from './resolvers';
import {
  MysticCreature,
  MysticCreatureSchema,
} from 'src/entities/mystic-creature.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatureRepository } from './repositories';
import { CreatureService } from './services/creature.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MysticCreature.name, schema: MysticCreatureSchema },
    ]),
  ],
  providers: [CreaturesResolver, CreatureRepository, CreatureService],
})
export class CreaturesModule {}
