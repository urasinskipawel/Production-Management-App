import { pool } from '../config/db';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';

type TaskRecordResult = [TaskRecord[], FieldPacket[]];

export class TaskRecord {
	id?: string;
	drawing: string;
	project: string;

	constructor(obj: TaskRecord) {
		this.id = obj.id;
		this.drawing = obj.drawing;
		this.project = obj.project;
	}

	async insertTask(): Promise<string> {
		if (!this.id) {
			this.id = uuid();
		}

		await pool.execute('INSERT INTO `tasks` (`id`, `drawing`, `project` ) VALUES (:id, :drawing, :project )', {
			id: this.id,
			drawing: this.drawing,
			project: this.project,
		});

		return this.id;
	}

	static async listAllTasks(): Promise<TaskRecord[]> {
		const [results] = (await pool.execute('SELECT * FROM `tasks`')) as TaskRecordResult;
		return results.map(obj => new TaskRecord(obj));
	}
}
