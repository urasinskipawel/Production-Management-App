import { pool } from '../config/db';
import { v4 as uuid } from 'uuid';
import { FieldPacket } from 'mysql2';

type MachineRecordResult = [MachineRecord[], FieldPacket[]];

export class MachineRecord {
	id?: string;
	name: string;

	constructor(obj: MachineRecord) {
		this.id = obj.id;
		this.name = obj.name;
	}

	static async listAllMachines(): Promise<MachineRecord[]> {
		const [results] = (await pool.execute('SELECT * FROM `machines`')) as MachineRecordResult;
		return results.map(obj => new MachineRecord(obj));
	}
}
