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
		const { login, password } = req.body;
		if (login === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD) {
			res.redirect('/admin/panel');
		} else {
			res.redirect('/admin');
		}
	})

	.get('/panel', async (req: Request, res: Response): Promise<void> => {
		const workersList = await AdminRecord.listAllWorkers();
		const tasksList = await TaskRecord.listAllTasks();
		res.render('admin/admin-panel', {
			style: 'admin.css',
			workersList,
			tasksList,
			progressStatuses,
			processSteps,
		});
	})

	.get('/panel/add-worker', async (req: Request, res: Response): Promise<void> => {
		const machinesList = await MachineRecord.listAllMachines();
		res.render('admin/add-worker', {
			style: 'login.css',
			machinesList,
		});
	})

	.post('/panel/add-worker', async (req: Request, res: Response): Promise<void> => {
		const { firstname, lastname } = req.body;
		const worker = new AdminRecord({
			...req.body,
			firstname,
			lastname,
		});

		if (await AdminRecord.isWorkerExist(firstname, lastname)) {
			throw new Error(`Worker ${firstname} ${lastname} is already exist`);
		} else {
			const newWorker = new AdminRecord(worker);
			await newWorker.insertWorker();
		}
		res.redirect('/admin/panel');
	})

	.get('/panel/add-task', async (req: Request, res: Response): Promise<void> => {
		res.render('admin/add-task', {
			style: 'login.css',
		});
	})

	.post('/panel/add-task', async (req: Request, res: Response): Promise<void> => {
		const { drawing, project } = req.body;

		const task = new TaskRecord({
			...req.body,
			drawing,
			project,
		});
		if (await TaskRecord.isTaskExist(drawing, project)) {
			throw new Error(`Worker ${drawing} ${project} is already exist`);
		} else {
			const newWorker = new TaskRecord(task);
			await newWorker.insertTask();
		}
		res.redirect('/admin/panel');
	});

// TODO : Nie dziala walidacja. Dodaje taki sam projekt
