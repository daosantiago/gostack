/**
 * Arquivo de definição de tipos de um Appointment
 * É criada uma classe
 */

import { v4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '../../../../users/infra/typeorm/User';

/**
 * Decorators ativados no tsconfig.json "experimentalDecorators" e "emitDecoratorMetadata"
 *
 * Nossa classe Appointment se torna um parâmetro da classe Entity ao usar decorator
 * Faz com que seja salvo no banco de dados
 * Necessário sinalizar o que é coluna e o que é apenas atributo de classe
 */
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Ao usar decoratos não é mais necessário utilizar o construtor
  // Pra não apresentar erro, necessário desabilidar "strictPropertyInitialization": false no tsconfig
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = v4();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
