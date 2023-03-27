import { pool } from '../config/db';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';
import { ValidationError } from '../utils/errors';

type TaskRecordResult = [TaskRecord[], FieldPacket[]];

export class TaskRecord {
	id?: string;
	drawing: string;
	project: string;
	process_statusesId: string;
	process_stepsId: string;
	statuses: string;
	steps: string;
	firstname: string;
	lastname: string;

	constructor(obj: TaskRecord) {
		if (!obj.drawing || obj.drawing.length !== 20) {
			throw new ValidationError('The drawing name must be 20 characters long.');
		}

		if (!obj.project || obj.project.length !== 7) {
			throw new ValidationError('The project name must be 7 characters long.');
		}

		this.id = obj.id;
		this.drawing = obj.drawing;
		this.project = obj.project;
		this.process_statusesId = obj.process_statusesId;
		this.process_stepsId = obj.process_stepsId;
		this.statuses = obj.statuses;
		this.steps = obj.steps;
		this.firstname = obj.firstname;
		this.lastname = obj.lastname;
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
		const [results] = (await pool.execute(
			'SELECT `id`,`drawing`, `project`, `process_statusesId`, `process_stepsId` FROM `tasks`'
		)) as TaskRecordResult;
		return results.map(obj => new TaskRecord(obj));
	}

	static async getCurrentTask(id: string): Promise<TaskRecord | null> {
		const [results] = (await pool.execute(
			'SELECT `tasks`.`id`, `tasks`.`drawing`, `tasks`.`project`, `workers`.`firstname`, `workers`.`lastname` FROM `tasks` LEFT JOIN `workers` ON `tasks`.`id` = `workers`.`tasksId` WHERE `tasks`.`id` = :id',
			{
				id,
			}
		)) as TaskRecordResult;
		return results.length === 0 ? null : new TaskRecord(results[0]);
	}

	static async isTaskExist(drawing: string, project: string): Promise<boolean> {
		const [results] = (await pool.execute(
			'SELECT `drawing`, `project` FROM `tasks` WHERE `drawing` = :drawing AND `project` =:project',
			{
				drawing,
				project,
			}
		)) as TaskRecordResult;

		return results.length > 0;
	}

	async updateTask(): Promise<void> {
		await pool.execute(
			'UPDATE `tasks` SET `drawing` = :drawing, `project` = :project, `process_statusesId` = :process_statusesId, `process_stepsId` = :process_stepsId WHERE `id` = :id',
			{
				id: this.id,
				drawing: this.drawing,
				project: this.project,
				process_statusesId: this.process_statusesId,
				process_stepsId: this.process_stepsId,
			}
		);
	}
}
