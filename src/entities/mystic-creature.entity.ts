import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum MysticCreatureGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

registerEnumType(MysticCreatureGender, {
  name: 'MysticCreatureGender',
});

@ObjectType()
export class MysticCreatureName {
  @Field(() => String)
  @Prop({ type: String })
  first: string;

  @Field(() => String)
  @Prop({ type: String })
  last: string;

  @Field(() => String)
  @Prop({ type: String })
  title: string;
}

@ObjectType()
@Schema({
  timestamps: true,
  versionKey: false,
})
export class MysticCreature {
  @Field(() => String, { nullable: true, description: 'Creature unique ID' })
  @Prop({ type: String, unique: true, index: true })
  id: string;

  @Field(() => MysticCreatureName, { description: 'Creature Name' })
  @Prop({ type: MysticCreatureName })
  name: MysticCreatureName;

  @Field(() => MysticCreatureGender)
  @Prop({ type: String })
  gender: MysticCreatureGender;

  @Field(() => String)
  @Prop({ type: String })
  description: string;

  @Field(() => [String], { description: 'Nationality array' })
  @Prop({ type: [String] })
  nationality: string[];

  @Field(() => String)
  @Prop({ type: String })
  image: string;

  @Field(() => Number)
  @Prop({ type: Number })
  goldBalance: number;

  @Field(() => Number)
  @Prop({ type: Number })
  speed: number;

  @Field(() => Number)
  @Prop({ type: Number })
  health: number;

  @Field(() => String)
  @Prop({ type: String })
  secretNotes: string;

  @Field(() => String)
  @Prop({ type: String })
  monsterPassword: string;
}

export type MysticCreatureDocument = MysticCreature & Document;
export const MysticCreatureSchema =
  SchemaFactory.createForClass(MysticCreature);
