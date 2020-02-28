import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Org } from '../orgs/orgs.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fullName: string;

  @OneToMany(
    type => Org,
    org => org.user,
  )
  orgs: Org[];
}
