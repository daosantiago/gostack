/**
 * Arquivo de definição de tipos de um Appointment
 * É criada uma classe
 */

import { v4 } from 'uuid';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor(provider: string, date: Date) {
    this.id = v4();
    this.provider = provider;
    this.date = date;
  }
}


export default Appointment;
