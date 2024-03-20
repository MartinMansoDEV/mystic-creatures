import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MysticCreature,
  MysticCreatureDocument,
} from 'src/entities/mystic-creature.entity';
import { EntityRepository } from 'src/database';

@Injectable()
export class CreatureRepository extends EntityRepository<MysticCreatureDocument> {
  constructor(
    @InjectModel(MysticCreature.name)
    private mysticCreatureModel: Model<MysticCreatureDocument>,
  ) {
    super(mysticCreatureModel);
  }
}
