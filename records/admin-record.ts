import { pool } from '../config/db';
// import { ValidationError } from '../utils/errors';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';

type AdminRecordResult = [AdminRecord[], FieldPacket[]];

export class AdminRecord {
	id?: string;
	firstname: string;
	lastname: string;
	machinesId: string;
	tasksId: string;
	machine: string;
	drawing: string;
	project: string;

	constructor(obj: AdminRecord) {
		if (!obj.firstname || obj.firstname.length <= 2 || obj.firstname.length >= 50) {
			throw new Error('The firstname must be between 2 and 50 characters');
		}

		if (!obj.lastname || obj.lastname.length <= 2 || obj.lastname.length >= 75) {
			throw new Error('The lastname must be between 2 and 75 characters');
		}

		this.id = obj.id;
		this.firstname = obj.firstname;
		this.lastname = obj.lastname;
		this.machinesId = obj.machinesId;
		this.tasksId = obj.tasksId;
		this.machine = obj.machine;
		this.drawing = obj.drawing;
		this.project = obj.project;
	}

	async insertWorker(): Promise<string> {
		if (!this.id) {
			this.id = uuid();
		}

		await pool.execute(
			'INSERT INTO `workers`(`id`, `firstname`, `lastname`, `machinesId`) VALUES (:id, :firstname, :lastname, (SELECT `id` FROM `machines` WHERE `machine` = :machine) )',
			{
				id: this.id,
				firstname: this.firstname,
				lastname: this.lastname,
				machine: this.machine,
			}
		);

		return this.id;
	}

	static async listAllWorkers(): Promise<AdminRecord[]> {
		const [results] = (await pool.execute(
			'SELECT `workers`.`id`, `workers`.`firstname`,`workers`.`tasksId`, `workers`.`lastname`, `machines`.`machine`, `tasks`.`drawing`, `tasks`.`project` FROM `workers` LEFT JOIN `machines` ON `workers`.`machinesId` = `machines`.`id` LEFT JOIN `tasks` ON `workers`.`tasksId` = `tasks`.`id`'
		)) as AdminRecordResult;
		return results.map(obj => new AdminRecord(obj));
	}

	static async listAllWorkersTasks(firstname: string, lastname: string): Promise<AdminRecord[]> {
		const [results] = (await pool.execute(
			'SELECT `workers`.`firstname`, `workers`.`lastname`, `tasks`.`drawing`, `tasks`.`project` FROM `workers` LEFT JOIN `tasks` ON `workers`.`tasksId` = `tasks`.`id` WHERE `workers`.`firstname` = :firstname AND `workers`.`lastname` =:lastname',
			{
				firstname,
				lastname,
			}
		)) as AdminRecordResult;
		return results.map(obj => new AdminRecord(obj));
	}

	static async getCurrentWorker(id: string): Promise<AdminRecord | null> {
		const [results] = (await pool.execute('SELECT * FROM `workers` WHERE `id` = :id', {
			id,
		})) as AdminRecordResult;
		return results.length === 0 ? null : new AdminRecord(results[0]);
	}

	static async isWorkerExist(firstname: string, lastname: string): Promise<boolean> {
		const [results] = (await pool.execute(
			'SELECT `firstname`, `lastname` FROM `workers` WHERE `firstname` = :firstname AND `lastname` =:lastname',
			{
				firstname,
				lastname,
			}
		)) as AdminRecordResult;

		return results.length > 0;
	}

	async deleteWorker(): Promise<void> {
		await pool.execute('DELETE FROM `workers` WHERE `id` = :id', {
			id: this.id,
		});
	}
}
