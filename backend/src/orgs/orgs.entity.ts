import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Repo } from '../repos/repos.entity';
import { Setting } from '../settings/settings.entity';
import { User } from '../users/users.entity';
import { Field, ObjectType, InputType, Int } from '@nestjs/graphql';

@ObjectType()
@InputType('OrgInput')
@Entity()
export class Org {
  @Field((type) => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ length: 50 })
  name: string;

  @Field()
  @Column()
  installationId: number;

  @Field()
  @Column()
  lastSynced: Date;

  @Field((type) => [Repo], { nullable: true })
  @OneToMany((type) => Repo, (repo) => repo.org, {
    cascade: ['insert', 'update'],
  })
  repos: Repo[];

  @ManyToOne((type) => User, (user) => user.orgs, { lazy: true })
  user: User;

  @Field((type) => Setting, { nullable: true })
  @OneToOne((type) => Setting, { cascade: ['insert', 'update'] })
  @JoinColumn()
  setting: Setting;
}
