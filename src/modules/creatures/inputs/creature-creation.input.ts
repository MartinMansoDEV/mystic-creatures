import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl, Matches, Min } from 'class-validator';
import { MysticCreatureGender } from 'src/entities/mystic-creature.entity';

@InputType()
export class CreatureNameCreationInput {
  @Field(() => String)
  first: string;

  @Field(() => String)
  last: string;

  @Field(() => String)
  title: string;
}

@InputType()
export class CreatureCreationInput {
  @Field(() => CreatureNameCreationInput, { description: 'Creature Name' })
  name: CreatureNameCreationInput;

  @Field(() => MysticCreatureGender)
  gender: MysticCreatureGender;

  @Field(() => String)
  description: string;

  @Field(() => [String], { description: 'Nationality array' })
  @Matches('^[A-Z]{2,3}$', undefined, { each: true })
  nationality: string[];

  @Field(() => String)
  @IsUrl()
  image: string;

  @Field(() => Number)
  goldBalance: number;

  @Field(() => Number)
  @Min(0)
  speed: number;

  @Field(() => Number)
  @Min(0)
  health: number;

  @Field(() => String)
  @IsNotEmpty()
  secretNotes: string;

  @Field(() => String)
  @IsNotEmpty()
  monsterPassword: string;
}
