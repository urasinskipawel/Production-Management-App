import { pool } from '../config/db';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';

type TaskRecordResult = [TaskRecord[], FieldPacket[]];

export class TaskRecord {
	id?: string;
	drawing: string;
	project: string;

	constructor(obj: TaskRecord) {
		if (!obj.drawing || obj.drawing.length !== 20) {
			throw new Error('The drawing name must be 20 characters long.');
		}

		if (!obj.project || obj.project.length !== 7) {
			throw new Error('The project name must be 7 characters long.');
		}

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

	static async isTaskExist(drawing: string, project: string): Promise<boolean> {
		const [results] = (await pool.execute(
			'SELECT `drawing`, `project` FROM `tasks` WHERE `project` = :drawing AND `project` =:project',
			{
				drawing,
				project,
			}
		)) as TaskRecordResult;

		return results.length > 0;
	}
}
