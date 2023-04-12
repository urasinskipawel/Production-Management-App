import { Router, Request, Response } from 'express';

import { AdminRecord } from '../records/admin-record';
import { MachineRecord } from '../records/machine-record';
import { ProcessStatusesRecord } from '../records/process_statuses-record';
import { ProcessStepsRecord } from '../records/process_steps-record';
import { TaskRecord } from '../records/task-record';
import { ValidationError } from '../utils/errors';

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
      throw new ValidationError('You typed wrong username or password. Please try again.');
    }
  })

  .get('/panel', async (req: Request, res: Response): Promise<void> => {
    const workersList = await AdminRecord.listAllWorkers();
    const tasksList = await TaskRecord.listAllTasks();
    const statusesList = await ProcessStatusesRecord.listAllStatuses();
    const stepsList = await ProcessStepsRecord.listAllSteps();

    res.render('admin/admin-panel', {
      style: 'admin.css',
      workersList,
      tasksList,
      statusesList,
      stepsList,
    });
  })

  .delete('/panel/deleteworker/:workerId', async (req: Request, res: Response): Promise<void> => {
    const worker = await AdminRecord.getCurrentWorker(req.params.workerId);
    worker.deleteWorker();
    res.redirect(`/admin/panel/deleteworker/${worker.id}`);
  })

  .get('/panel/deleteworker/:workerId', async (req: Request, res: Response): Promise<void> => {
    const currentPath = `/admin${req.path.slice(0, req.path.length - req.params.workerId.length)}`;
    res.render('messages/statement', {
      style: 'error.css',
      currentPath,
    });
  })

  .get('/panel/updatetask/:taskId', async (req: Request, res: Response): Promise<void> => {
    const currentPath = `/admin${req.path.slice(0, req.path.length - req.params.taskId.length)}`;
    const task = await TaskRecord.getCurrentTask(req.params.taskId);
    res.render('messages/statement', {
      style: 'error.css',
      task,
      currentPath,
    });
  })

  .get('/panel/deletetask/:taskId', async (req: Request, res: Response): Promise<void> => {
    const currentPath = `/admin${req.path.slice(0, req.path.length - req.params.taskId.length)}`;
    res.render('messages/statement', {
      style: 'error.css',
      currentPath,
    });
  })

  .patch('/panel/updatetask/:taskId', async (req: Request, res: Response): Promise<void> => {
    const task = await TaskRecord.getCurrentTask(req.params.taskId);

    const bodyResult = '';
    switch (bodyResult) {
      case req.body.statuses:
        throw new ValidationError("You have to select task's processing status.");
      case req.body.steps:
        throw new ValidationError("You have to select task's processing step.");
      case req.body.worker:
        throw new ValidationError('You have to select worker to perform this task.');
      default:
        const processStep = await ProcessStepsRecord.getCurrentStep(req.body.steps);
        const processStatus = await ProcessStatusesRecord.getCurrentStatus(req.body.statuses);
        const worker = await AdminRecord.getCurrentWorker(req.body.worker);

        task.process_stepsId = processStep.id === null ? null : processStep.id;
        task.process_statusesId = processStatus.id === null ? null : processStatus.id;
        worker.tasksId = task.id === null ? null : task.id;

        task.updateTask();
        worker.updateWorker();
        res.redirect(`/admin/panel/updatetask/${task.id}`);
    }
  })

  .delete('/panel/deletetask/:taskId', async (req: Request, res: Response): Promise<void> => {
    const task = await TaskRecord.getCurrentTask(req.params.taskId);
    const worker = await AdminRecord.getCurrentWorker(req.body.worker);

    if (worker) {
      task.process_stepsId = null;
      task.process_statusesId = null;
      worker.tasksId = null;
      task.updateTask();
      worker.updateWorker();
      task.deleteTask();
    }

    task.deleteTask();

    res.redirect(`/admin/panel/deletetask/${task.id}`);
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
      throw new ValidationError(`Worker ${firstname} ${lastname} is already exist.`);
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
      throw new ValidationError(`Project: ${project} with drawing number: ${drawing} was already added.`);
    } else {
      const newTask = new TaskRecord(task);
      await newTask.insertTask();
      res.redirect('/admin/panel');
    }
  });
