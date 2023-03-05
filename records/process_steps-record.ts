import { pool } from '../config/db';
import { FieldPacket } from 'mysql2';

type ProcessStepsRecordResult = [ProcessStepsRecord[], FieldPacket[]];

export class ProcessStepsRecord {
	id: string;
	steps: string;

	constructor(obj: ProcessStepsRecord) {
		this.id = obj.id;
		this.steps = obj.steps;
	}

	static async listAllSteps(): Promise<ProcessStepsRecord[]> {
		const [results] = (await pool.execute('SELECT `id`, `steps` FROM `process_steps`')) as ProcessStepsRecordResult;
		return results.map(obj => new ProcessStepsRecord(obj));
	}
}
