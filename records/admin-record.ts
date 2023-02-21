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
			'INSERT INTO `workers`(`id`, `firstname`, `lastname`, `machinesId`,  ) VALUES (:id, :firstname, :lastname, (SELECT `id` FROM `machines` WHERE `machine` = :machine) )',
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
}
