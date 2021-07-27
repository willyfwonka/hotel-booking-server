import {
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  EntityNotFoundError,
  FindConditions,
  FindOneOptions,
  ObjectID,
  ObjectType,
  PrimaryColumn,
  SaveOptions,
  UpdateDateColumn,
} from 'typeorm';
import { plainToClassFromExist } from 'class-transformer';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UniqueID } from 'nodejs-snowflake';

export class Substructure extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: bigint;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  save(options?: SaveOptions): Promise<this> {
    return super.save(options).catch((error) => {
      if ('23505' === error?.code) {
        // 23505 is UniqueViolation handling for Postgres
        throw new ConflictException();
      }

      return this;
    });
  }

  static findOneOrFail<T extends BaseEntity>(
    this: ObjectType<T>,
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>,
  ): Promise<T>;
  /**
   * Finds first entity that matches given options.
   */
  static findOneOrFail<T extends BaseEntity>(
    this: ObjectType<T>,
    options?: FindOneOptions<T>,
  ): Promise<T>;
  /**
   * Finds first entity that matches given conditions.
   */
  static findOneOrFail<T extends BaseEntity>(
    this: ObjectType<T>,
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<T>;

  static findOneOrFail(...args) {
    if (args[0].id) {
      args[0].id = String(BigInt(args[0].id));
    }

    return super.findOneOrFail(...args).catch((error) => {
      // Out of range and overflow handling for invalid bigint
      // https://www.postgresql.org/docs/9.5/errcodes-appendix.html
      if (/22P02|22003/.test(error.code)) {
        throw new NotFoundException(this.name + ' not found');
      }

      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(this.name + ' not found');
      }

      throw error;
    });
  }

  static async findOneAndUpdate<T extends BaseEntity>({ id, ...payload }) {
    const entity = await this.findOneOrFail({ id });

    if (null == entity) {
      throw new NotFoundException(this.name + ' not found');
    }

    await plainToClassFromExist(entity, payload).save();

    return entity as unknown as T;
  }

  @BeforeInsert()
  private async generateSnowflake() {
    this.id = new UniqueID({
      customEpoch: 1609459200,
    }).getUniqueID() as bigint;
  }
}
