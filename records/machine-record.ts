import { FieldPacket } from 'mysql2';

import { pool } from '../config/db';

type MachineRecordResult = [MachineRecord[], FieldPacket[]];

export class MachineRecord {
  id?: string;

  machine: string;

  constructor(obj: MachineRecord) {
    this.id = obj.id;
    this.machine = obj.machine;
  }

  static async listAllMachines(): Promise<MachineRecord[]> {
    const [results] = (await pool.execute('SELECT `machine` FROM `machines`')) as MachineRecordResult;
    return results.map((obj) => new MachineRecord(obj));
  }
}
