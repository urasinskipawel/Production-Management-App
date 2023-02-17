import { pool } from '../config/db';
// import { ValidationError } from '../utils/errors';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';

type AdminRecordResult = [AdminRecord[], FieldPacket[]];

export class AdminRecord {
	id?: string;
	firstname: string;
	lastname: string;

	constructor(obj: AdminRecord) {
		this.id = obj.id;
		this.firstname = obj.firstname;
		this.lastname = obj.lastname;
	}

	async insertWorker(): Promise<string> {
		if (!this.id) {
			this.id = uuid();
		}

		await pool.execute('INSERT INTO `workers`(`id`, `firstname`, `lastname`) VALUES(:id, :firstname,:lastname)', {
			id: this.id,
			firstname: this.firstname,
			lastname: this.lastname,
		});

		return this.id;
	}
	static async listAllWorkers(): Promise<AdminRecord[]> {
		const [results] = (await pool.execute('SELECT * FROM `workers`')) as AdminRecordResult;
		return results.map(obj => new AdminRecord(obj));
	}
}
