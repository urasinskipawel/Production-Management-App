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
			'SELECT `workers`.`id`,`workers`.`firstname`, `workers`.`lastname`, `machines`.`machine`FROM `workers` JOIN `machines` ON `workers`.`machinesId` = `machines`.`id`'
		)) as AdminRecordResult;
		return results.map(obj => new AdminRecord(obj));
	}
	static async listAllWorkersTasks(): Promise<AdminRecord[]> {
		const [results] = (await pool.execute(
			'SELECT `workers`.`id`, `workers`.`firstname`, `workers`.`lastname`, `tasks`.`drawing`, `tasks`.`project`, `machines`.`machine` FROM `tasks` JOIN `workers` ON `tasks`.`id` = `workers`.`tasksId` JOIN `machines` ON `workers`.`machinesId` = `machines`.`id`'
		)) as AdminRecordResult;
		return results.map(obj => new AdminRecord(obj));
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
}
