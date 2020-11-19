import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Publication } from '../publications/publication.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Publication, publication => publication.user, { eager: true })
    publications: Publication[];

    async validatePassword(password: string): Promise<Boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
