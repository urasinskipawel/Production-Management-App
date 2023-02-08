import { Router, Request, Response } from 'express';

export const workerRouter = Router();

workerRouter
	.get('/', async (req: Request, res: Response): Promise<void> => {
		res.render('worker/worker-login', {
			style: 'login.css',
		});
	})

	.post('/', async (req: Request, res: Response): Promise<void> => {
		res.redirect('/worker/panel/');
	});
