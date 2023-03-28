import { Router, Request, Response } from 'express';
import { AdminRecord } from '../records/admin-record';
import { ProcessStatusesRecord } from '../records/process_statuses-record';
import { TaskRecord } from '../records/task-record';
import { ValidationError } from '../utils/errors';

export const workerRouter = Router();

workerRouter
	.get('/', async (req: Request, res: Response): Promise<void> => {
		res.render('worker/worker-login', {
			style: 'login.css',
		});
	})

	.post('/', async (req: Request, res: Response): Promise<void> => {
		const { firstname, lastname } = req.body;
		const workersList = await AdminRecord.listAllWorkers();
		const foundLoginData = workersList.find(a => a.firstname === firstname && a.lastname === lastname);

		if (foundLoginData) {
			if (foundLoginData.firstname && foundLoginData.lastname) {
				const workerFirstName: string = encodeURIComponent(firstname);
				const workerLastname: string = encodeURIComponent(lastname);
				res.redirect(`/worker/panel/${workerFirstName}/${workerLastname}`);
			}
		} else {
			throw new ValidationError(`The user you provided does not exist. Verify the given data.`);
		}
	})

	.get('/panel/updatetask/:taskId', async (req: Request, res: Response): Promise<void> => {
		const task = await TaskRecord.getCurrentTask(req.params.taskId);
		const currentPath = `/worker${req.path.slice(0, req.path.length - req.params.taskId.length)}`;

		res.render('messages/statement', {
			style: 'error.css',
			task,
			currentPath,
		});
	})

	.get('/panel/:workerFirstName/:workerLastname', async (req: Request, res: Response): Promise<void> => {
		const workerFirstName: string = req.params.workerFirstName;
		const workerLastname: string = req.params.workerLastname;
		const workersTasksList = await AdminRecord.listAllWorkersTasks(workerFirstName, workerLastname);
		const statusesList = await ProcessStatusesRecord.listAllStatuses();
		res.render('worker/worker-panel', {
			style: 'admin.css',
			workersTasksList,
			statusesList,
			workerFirstName,
			workerLastname,
		});
	})

	.patch('/panel/updatetask/:taskId/', async (req: Request, res: Response): Promise<void> => {
		const task = await TaskRecord.getCurrentTask(req.params.taskId);

		if (!req.body.statuses) {
			throw new ValidationError(`You have to select status of your job.`);
		}

		const processStatus = await ProcessStatusesRecord.getCurrentStatus(req.body.statuses);
		task.process_statusesId = processStatus.id === null ? null : processStatus.id;

		const tasksList = await TaskRecord.listAllTasks();
		const found = tasksList.find(a => a.id === task.id);
		task.process_stepsId = found.process_stepsId;

		task.updateTask();

		res.redirect(`/worker/panel/updatetask/${task.id}`);
	});
