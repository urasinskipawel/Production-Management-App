import { FieldPacket } from 'mysql2';

import { pool } from '../config/db';

type ProcessStatusesRecordResult = [ProcessStatusesRecord[], FieldPacket[]];

export class ProcessStatusesRecord {
  id: string;

  statuses: string;

  constructor(obj: ProcessStatusesRecord) {
    this.id = obj.id;
    this.statuses = obj.statuses;
  }

  static async listAllStatuses(): Promise<ProcessStatusesRecord[]> {
    const [results] = (await pool.execute(
      'SELECT `id`,`statuses` FROM `process_statuses`',
    )) as ProcessStatusesRecordResult;
    return results.map((obj) => new ProcessStatusesRecord(obj));
  }

  static async getCurrentStatus(id: string): Promise<ProcessStatusesRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM `process_statuses` WHERE `id` = :id', {
      id,
    })) as ProcessStatusesRecordResult;
    return results.length === 0 ? null : new ProcessStatusesRecord(results[0]);
  }
}
