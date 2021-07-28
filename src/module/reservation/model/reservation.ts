import { Substructure } from 'src/module/shared/model/substructure';
import { BeforeInsert, Column, Entity, Index, ManyToOne } from 'typeorm';
import { randomBytes } from 'crypto';
import { Hotel } from 'src/module/hotel/model/hotel';
import { User } from 'src/module/user/model/user';

@Entity()
@Index(['phoneNumber', 'email'], { unique: true })
export class Reservation extends Substructure {
  @Column({ length: 16 })
  code: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;

  @Column()
  guestCount: number;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => Hotel, (h) => h.reservations)
  hotel: Hotel;

  @ManyToOne(() => User, (u) => u.reservations, { nullable: true, eager: true })
  changedBy: User;

  // Generating a random string for reservation code
  @BeforeInsert()
  async beforeWrite() {
    this.code = randomBytes(8).toString('hex');
  }
}
