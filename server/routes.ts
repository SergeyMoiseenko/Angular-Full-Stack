import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import SprintCtrl from './controllers/sprint';
import CrewCtrl from './controllers/crew';
import TaskCtrl from './controllers/task';
import Cat from './models/cat';
import User from './models/user';
import Sprint from './models/sprint';
import Crew from './models/crew';
import Task from './models/task';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const sprintCtrl = new SprintCtrl();
  const crewCtrl = new CrewCtrl();
  const taskCtrl = new TaskCtrl();

  // Sprint
  router.route('/sprint').get(sprintCtrl.getAll);
  router.route('/sprint/:name').get(sprintCtrl.getByName);
  router.route('/sprint/current/:current').get(sprintCtrl.getCurrent);
  router.route('/sprint/:name').put(sprintCtrl.updateByName);
  router.route('/sprint').post(sprintCtrl.insert);

  // Crew
  router.route('/crew').get(crewCtrl.getAll);
  router.route('/crew/:name').get(crewCtrl.getByName);
  router.route('/crew/:name').put(crewCtrl.updateByName);
  router.route('/crew').post(crewCtrl.insert);

  // Task
  router.route('/task').get(taskCtrl.getAll);
  router.route('/task/:name').get(taskCtrl.getByName);
  router.route('/task/:name').put(taskCtrl.updateByName);
  router.route('/task').post(taskCtrl.insert);

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
