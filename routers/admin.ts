import { Router, Request, Response } from 'express';

export const adminRouter = Router();

const login = 'admin';
const password = '123';

adminRouter
	.get('/', async (req: Request, res: Response): Promise<void> => {
		res.render('admin/admin-login', {
			style: 'login.css',
		});
	})

	.post('/', async (req: Request, res: Response): Promise<void> => {
		const body = req.body;
		if (body.firstname === login && body.lastname === password) {
			res.redirect('/admin/panel');
		} else {
			res.redirect('/admin');
		}
	});
