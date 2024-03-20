import { Injectable } from '@nestjs/common';
import { CreatureRepository } from '../repositories';
import { CreatureCreationInput, CreatureUpdateInput } from '../inputs';
import { MysticCreature } from 'src/entities/mystic-creature.entity';
import { v4 } from 'uuid';
import { GraphQLError } from 'graphql';

@Injectable()
export class CreatureService {
  constructor(private readonly creatureRepository: CreatureRepository) {}

  public async create(
    creature: CreatureCreationInput,
  ): Promise<MysticCreature> {
    const mysticCreature = creature as MysticCreature;
    mysticCreature.id = v4();
    return this.creatureRepository.create(creature);
  }

  public async update(
    id: string,
    creature: CreatureUpdateInput,
  ): Promise<MysticCreature> {
    const existing = await this.creatureRepository.findOne({ id });
    if (!existing) {
      throw new GraphQLError('Creature not found', {
        extensions: { code: 'NOT_FOUND' },
      });
    }
    return this.creatureRepository.findOneAndUpdate({ id }, creature);
  }

  public async updateGoldAmount(
    id: string,
    goldAmount: number,
  ): Promise<MysticCreature> {
    const existing = await this.creatureRepository.findOne({ id });
    if (!existing) {
      throw new GraphQLError('Creature not found', {
        extensions: { code: 'NOT_FOUND' },
      });
    }
    return this.creatureRepository.findOneAndUpdate(
      { id },
      { $inc: { goldBalance: goldAmount } },
    );
  }

  public async delete(id: string): Promise<string> {
    return this.creatureRepository.delete(id);
  }

  public async getAll(): Promise<MysticCreature[]> {
    return this.creatureRepository.find({});
  }
}
