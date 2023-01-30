import { Router, Request, Response } from 'express';

export const adminRouter = Router();

const login = 'admin';
const password = '123';

let counter = 1;

const workers: [{}] = [{}];

adminRouter
	.get('/', async (req: Request, res: Response): Promise<void> => {
		res.render('admin/admin-login', {
			style: 'login.css',
		});
	})

	.post('/', async (req: Request, res: Response): Promise<void> => {
		const body = req.body;
		if (body.login === login && body.password === password) {
			res.redirect('/admin/panel');
		} else {
			res.redirect('/admin');
		}
	})
	.get('/panel', async (req: Request, res: Response): Promise<void> => {
		res.render('admin/admin-panel', {
			style: 'admin.css',
			workers,
		});
	})

	.post('/panel', async (req: Request, res: Response): Promise<void> => {
		workers.push({
			id: counter++,
			name: req.body.workerFirstname,
			lastname: req.body.workerLastname,
			machine: req.body.machine,
		});

		res.redirect('/admin/panel');
	});
