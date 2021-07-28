import { Substructure } from 'src/module/shared/model/substructure';
import { AfterLoad, Column, Entity, OneToMany } from 'typeorm';
import { Reservation } from 'src/module/reservation/model/reservation';

@Entity()
export class Hotel extends Substructure {
  @Column()
  name: string;

  @OneToMany(() => Reservation, (r) => r.hotel, { cascade: true })
  reservations: Reservation[];

  @AfterLoad()
  // Sorting reservations by their id
  sortItems() {
    if (this?.reservations?.length) {
      this.reservations.sort(
        (a, b) => parseInt(String(a.id)) - parseInt(String(b.id)),
      );
    }
  }
}
