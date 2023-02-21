import { Router, Request, Response } from 'express';
import { AdminRecord } from '../records/admin-record';
import { progressStatuses } from '../utils/constants';

export const workerRouter = Router();

workerRouter
	.get('/', async (req: Request, res: Response): Promise<void> => {
		res.render('worker/worker-login', {
			style: 'login.css',
		});
	})

	.post('/', async (req: Request, res: Response): Promise<void> => {
		const workersList = await AdminRecord.listAllWorkers();

		const foundLoginData = workersList.find(a => a.firstname === req.body.firstname && a.lastname === req.body.lastname);

		if (foundLoginData) {
			if (foundLoginData.firstname && foundLoginData.lastname) {
				const workerFirstName: string = encodeURIComponent(req.body.firstname);
				const workerLastname: string = encodeURIComponent(req.body.lastname);
				res.redirect(`/worker/panel/${workerFirstName}/${workerLastname}`);
			}
		} else {
			res.redirect('/worker');
		}
	})

	.get('/panel/:workerFirstName/:workerLastname', async (req: Request, res: Response): Promise<void> => {
		const workerFirstName: string = req.params.workerFirstName;
		const workerLastname: string = req.params.workerLastname;
		res.render('worker/worker-panel', {
			style: 'admin.css',
			progressStatuses,
			workerFirstName,
			workerLastname,
		});
	});

// TODO4 : Zrobic listowanie zadan workersa w panelu workers
