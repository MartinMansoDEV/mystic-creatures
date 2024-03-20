import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { MysticCreature } from 'src/entities/mystic-creature.entity';
import { CreatureCreationInput, CreatureUpdateInput } from '../inputs';
import { CreatureService } from '../services/creature.service';

@Resolver(() => MysticCreature)
export class CreaturesResolver {
  constructor(private readonly creatureService: CreatureService) {}

  @Mutation(() => MysticCreature)
  public async createCreature(
    @Args('creature', { type: () => CreatureCreationInput })
    creature: CreatureCreationInput,
  ): Promise<MysticCreature> {
    return this.creatureService.create(creature);
  }

  @Mutation(() => String)
  public async deleteCreature(
    @Args('id', { type: () => String }) id: string,
  ): Promise<string> {
    return this.creatureService.delete(id);
  }

  @Mutation(() => MysticCreature)
  public async updateCreature(
    @Args('id', { type: () => String }) id: string,
    @Args('creature', { type: () => CreatureUpdateInput })
    creature: CreatureUpdateInput,
  ): Promise<MysticCreature> {
    return this.creatureService.update(id, creature);
  }

  @Query(() => [MysticCreature])
  public async getAllCreatures(): Promise<MysticCreature[]> {
    return this.creatureService.getAll();
  }

  @Mutation(() => MysticCreature)
  public async modifyGoldBalance(
    @Args('id', { type: () => String }) id: string,
    @Args('goldAmount', { type: () => Number }) goldAmount: number,
  ): Promise<MysticCreature> {
    return this.creatureService.updateGoldAmount(id, goldAmount);
  }
}
