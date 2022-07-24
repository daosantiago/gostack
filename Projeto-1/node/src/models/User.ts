/**
 * Arquivo de definição de tipos de um Appointment
 * É criada uma classe
 */

import { v4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Decorators ativados no tsconfig.json "experimentalDecorators" e "emitDecoratorMetadata"
 *
 * Nossa classe Appointment se torna um parâmetro da classe Entity ao usar decorator
 * Faz com que seja salvo no banco de dados
 * Necessário sinalizar o que é coluna e o que é apenas atributo de classe
 */
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}


export default User;
