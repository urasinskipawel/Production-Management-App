import { Router, Request, Response } from 'express';
import { progressStatuses } from '../utils/constants';

export const workerRouter = Router();

workerRouter
	.get('/', async (req: Request, res: Response): Promise<void> => {
		res.render('worker/worker-login', {
			style: 'login.css',
		});
	})

	.post('/', async (req: Request, res: Response): Promise<void> => {
		const workerName: string = encodeURIComponent(req.body.name);
		const workerLastname: string = encodeURIComponent(req.body.lastname);
		res.redirect(`/worker/panel/${workerName}/${workerLastname}`);
	})

	.get('/panel/:workerName/:workerLastname', async (req: Request, res: Response): Promise<void> => {
		const workerName: string = req.params.workerName;
		const workerLastname: string = req.params.workerLastname;
		res.render('worker/worker-panel', {
			style: 'admin.css',
			progressStatuses,
			workerName,
			workerLastname,
		});
	});
