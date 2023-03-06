import { Router, Request, Response } from 'express';
import { AdminRecord } from '../records/admin-record';
import { ProcessStatusesRecord } from '../records/process_statuses-record';
import { TaskRecord } from '../records/task-record';

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
			res.redirect('/worker');
		}
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

	.patch('/panel/:taskId/:workerFirstName/:workerLastname', async (req: Request, res: Response): Promise<void> => {
		const workerFirstName: string = req.params.workerFirstName;
		const workerLastname: string = req.params.workerLastname;
		const task = await TaskRecord.getCurrentTask(req.params.taskId);

		const processStatus =
			req.body.statuses === '' ? null : await ProcessStatusesRecord.getCurrentStatus(req.body.statuses);

		task.process_statusesId = processStatus.id === null ? null : processStatus.id;
		task.updateTask();

		res.redirect(`/worker/panel/${workerFirstName}/${workerLastname}`);
	});
