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

	static async getCurrentStep(id: string): Promise<ProcessStepsRecord | null> {
		const [results] = (await pool.execute('SELECT * FROM `process_steps` WHERE `id` = :id', {
			id,
		})) as ProcessStepsRecordResult;
		return results.length === 0 ? null : new ProcessStepsRecord(results[0]);
	}
}
