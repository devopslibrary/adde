import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Field, ObjectType, InputType, Int } from '@nestjs/graphql';

@ObjectType()
@InputType('SettingInput')
@Entity()
export class Setting {
  @Field((type) => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  nukeStaleBranches: boolean;

  @Field()
  @Column()
  nukeStalePRs: boolean;
}
