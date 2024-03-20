import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUrl, Matches, Min } from 'class-validator';
import { MysticCreatureGender } from 'src/entities/mystic-creature.entity';

@InputType()
export class CreatureNameUpdateInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  first?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  last?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  title?: string;
}

@InputType()
export class CreatureUpdateInput {
  @Field(() => CreatureNameUpdateInput, {
    description: 'Creature Name',
    nullable: true,
  })
  @IsOptional()
  name?: CreatureNameUpdateInput;

  @Field(() => MysticCreatureGender, { nullable: true })
  @IsOptional()
  gender?: MysticCreatureGender;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => [String], { description: 'Nationality array', nullable: true })
  @Matches('^[A-Z]{2,3}$', undefined, { each: true })
  @IsOptional()
  nationality?: string[];

  @Field(() => String, { nullable: true })
  @IsUrl()
  @IsOptional()
  image?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  goldBalance?: number;

  @Field(() => Number, { nullable: true })
  @Min(0)
  @IsOptional()
  speed?: number;

  @Field(() => Number, { nullable: true })
  @Min(0)
  @IsOptional()
  health?: number;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsOptional()
  secretNotes?: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsOptional()
  monsterPassword?: string;
}
