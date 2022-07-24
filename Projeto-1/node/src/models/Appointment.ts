/**
 * Arquivo de definição de tipos de um Appointment
 * É criada uma classe
 */

import { v4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  provider: string;

  @Column('time with time zone')
  date: Date;

  // Ao usar decoratos não é mais necessário utilizar o construtor
  // Pra não apresentar erro, necessário desabilidar "strictPropertyInitialization": false no tsconfig
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = v4();
  //   this.provider = provider;
  //   this.date = date;
  // }
}


export default Appointment;
