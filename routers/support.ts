import { Router, Request, Response } from 'express';

import { mainMail } from '../utils/contact-form';
import { ValidationError } from '../utils/errors';

export const supportRouter = Router();

supportRouter
  .get('/', async (req: Request, res: Response): Promise<void> => {
    res.render('support/support', {
      style: 'support.css',
    });
  })

  .get('/contact', async (req: Request, res: Response): Promise<void> => {
    res.render('support/contact-form', {
      style: 'contact.css',
    });
  })

  .get('/contact/:user', async (req: Request, res: Response): Promise<void> => {
    const { user } = req.params;
    const currentPath = `/support${req.path.slice(0, req.path.length - user.length)}`;
    console.log(currentPath);
    res.render('messages/statement', {
      style: 'error.css',
      currentPath,
      user,
    });
  })

  .post('/contact', async (req: Request, res: Response): Promise<void> => {
    const { name, email, subject, message } = req.body;
    console.log(email);
    try {
      await mainMail(name, email, subject, message);

      res.redirect(`/support/contact/${name}`);
    } catch (error) {
      throw new ValidationError('Something goes wrong. Please try to contact us later');
    }
  });
