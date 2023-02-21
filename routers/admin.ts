import { Router, Request, Response } from 'express';
import { progressStatuses } from '../utils/constants';
import { processSteps } from '../utils/constants';
import { AdminRecord } from '../records/admin-record';
import { MachineRecord } from '../records/machine-record';
import { TaskRecord } from '../records/task-record';

export const adminRouter = Router();

adminRouter
	.get('/', async (req: Request, res: Response): Promise<void> => {
		res.render('admin/admin-login', {
			style: 'login.css',
		});
	})

	.post('/', async (req: Request, res: Response): Promise<void> => {
		const body = req.body;
		if (body.login === process.env.ADMIN_LOGIN && body.password === process.env.ADMIN_PASSWORD) {
			res.redirect('/admin/panel');
		} else {
			res.redirect('/admin');
		}
	})

	.get('/panel', async (req: Request, res: Response): Promise<void> => {
		const workersList = await AdminRecord.listAllWorkers();
		const tasksList = await TaskRecord.listAllTasks();
		const machinesList = await MachineRecord.listAllMachines();
		// console.log(workersList);
		res.render('admin/admin-panel', {
			style: 'admin.css',
			workersList,
			tasksList,
			machinesList,
			progressStatuses,
			processSteps,
		});
	})

	.post('/panel', async (req: Request, res: Response): Promise<void> => {
		const newWorker = new AdminRecord(req.body);
		await newWorker.insertWorker();
		// const newTask = new TaskRecord(req.body);
		// await newTask.insertTask();
		// TODO2: Gryzie sie dodowanie newTask i newWorker
		res.redirect('/admin/panel');
	});
