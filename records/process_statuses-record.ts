import { pool } from '../config/db';
import { FieldPacket } from 'mysql2';

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
			'SELECT `id`,`statuses` FROM `process_statuses`'
		)) as ProcessStatusesRecordResult;
		return results.map(obj => new ProcessStatusesRecord(obj));
	}
}
