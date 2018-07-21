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

  router.route('/babl').get(function(req, res) {
    Sprint.find({
      current: true
    }).exec(function(err, sprints) {
      Task.find({
        name: sprints[0].task1
      }).exec(function(err1, first_task) {
        Task.find({
          name: sprints[0].task2
        }).exec(function(err2, second_task) {
          const mess = 'Йо-хо-хо! Наша следующая цель шхуна ' + sprints[0].name +
          '! Если нам удастся захватить её с ' + sprints[0].begin + ' до ' +
          sprints[0].end + ', мы получим: ';
          const task1_mess = first_task[0].text + sprints[0].count1 + first_task[0].text_end;
          const task2_mess = second_task[0].text  + sprints[0].count2 + second_task[0].text_end;
          res.json({main: mess, prise: {prise: 'gold', count: sprints[0].gold},
            task1: {mess: task1_mess, prise: first_task[0].prize, count: sprints[0].count1},
            task2: {mess: task2_mess, prise: second_task[0].prize, count: sprints[0].count2}});
        });
      });
    });
  });

  router.route('/boarding').put(function(req, res) {
    Sprint.find({
      current: true
    }).exec(function(err, sprints) {
      let upd;
      if (sprints[0].gold === sprints[0].curr_gold) {
        const gold = sprints[0].gold + sprints[0].total_gold;
        const parrot = sprints[0].parrot + sprints[0].total_parrot;
        const skull = sprints[0].skull + sprints[0].total_skull;
        const crown = sprints[0].crown + sprints[0].total_crown;
        const diamond = sprints[0].diamond + sprints[0].total_diamond;
        upd = {win: true, current: false, total_gold: gold, total_parrot: parrot, total_skull: skull,
        total_crown: crown, total_diamond: diamond, battle: sprints[0].battle + 1};
      } else {
        upd = {win: false, current: false, fail_battle: sprints[0].fail_battle + 1};
      }
      Sprint.findOneAndUpdate({ current: true }, upd, (err1) => {
        if (err1) { return console.error(err1); }
        res.sendStatus(200);
      });
    });
  });

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
