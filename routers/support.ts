import { Router, Request, Response } from 'express';

export const supportRouter = Router();

supportRouter.get('/', async (req: Request, res: Response): Promise<void> => {
	res.render('support/support', {
		style: 'support.css',
	});
});
