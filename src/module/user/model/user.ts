import { Substructure } from 'src/module/shared/model/substructure';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import { hash } from 'bcrypt';

@Entity()
@Index(['username'], { unique: true })
export class User extends Substructure {
  @Column()
  username: string;

  @Column()
  password: string;

  toJSON() {
    const { password, ...rest } = this;
    return rest;
  }

  @BeforeInsert()
  private async beforeWrite() {
    this.password = await hash(this.password, 12);
  }
}
