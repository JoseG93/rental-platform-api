import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { PublicationStatus } from './publication-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Publication extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: PublicationStatus;

  @ManyToOne(type => User, user => user.publications, { eager: false })
  user: User;
  
  @Column()
  userId: number;
}
