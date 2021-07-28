import { Substructure } from 'src/module/shared/model/substructure';
import { BeforeInsert, Column, Entity, Index, OneToMany } from 'typeorm';
import { hash } from 'bcrypt';
import { Reservation } from 'src/module/reservation/model/reservation';

@Entity()
@Index(['username'], { unique: true })
export class User extends Substructure {
  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Reservation, (r) => r.changedBy, { nullable: true })
  reservations: Reservation[];

  toJSON() {
    const { password, ...rest } = this;
    return rest;
  }

  @BeforeInsert()
  private async beforeWrite() {
    this.password = await hash(this.password, 12);
  }
}
