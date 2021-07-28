import { Substructure } from 'src/module/shared/model/substructure';
import { Column, Entity, OneToMany } from 'typeorm';
import { Reservation } from 'src/module/reservation/model/reservation';

@Entity()
export class Hotel extends Substructure {
  @Column()
  name: string;

  @OneToMany(() => Reservation, (r) => r.hotel)
  reservations: Reservation[];
}
