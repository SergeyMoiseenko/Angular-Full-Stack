import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import {Sprint} from './models/sprint';

import setRoutes from './routes';
import Task from './models/task';

const app = express();

const spawn = require('child_process').spawn;

dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}

mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI)
  .then(db => {
    console.log('Connected to MongoDB');

    setRoutes(app);
    // const obj = new Sprint({
    //   name: 'GeekGame'
    // });
    // obj.save((err, item) => {});
    //
    // app.get('/*', function(req, res) {
    //   res.sendFile(path.join(__dirname, '../public/index.html'));
    // });

    app.post('/first', function (req, res) {
      const first_sprint = new Sprint({
        number: 0,
        name: 'Start',
        begin: '16/07/2018',
        end: '19/07/2018',
        task1: 'String',
        task2: 'String',
        task3: 'tring',
        count1: 1,
        count2: 2,
        count3: 2,
        gold: 50,
        parrot: 2,
        skull: 0,
        crown: 0,
        diamond: 1,
        total_gold: 50,
        total_parrot: 2,
        total_skull: 0,
        total_crown: 0,
        total_diamond: 1,
        battle: 1,
        fail_battle: 0,
        big_gold: 50,
        win: true,
        current: false
      });
      first_sprint.save((err, item) => {});
      const task1 = new Task({
        name: 'Read map',
        text: 'Если юнга прочитает ',
        text_end: ' зашифрованные карты',
        prize: 'parrot',
        prize_size: 1
      });
      task1.save((err, item) => {});
      const task2 = new Task({
        name: 'Tales',
        text: 'Если боцман поведает ',
        text_end: ' йо-хо-хо-ительные истории',
        prize: 'skull',
        prize_size: 1
      });
      task2.save((err, item) => {});
      const task3 = new Task({
        name: 'Leak',
        text: 'Если капитан устранит ',
        text_end: ' протечку в трюме',
        prize: 'diamond',
        prize_size: 1
      });
      task3.save((err, item) => {});
    });

    app.get('/babl', function(req, res) {
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

    app.put('/boarding', function(req, res) {
      Sprint.find({
        current: true
      }).exec(function(err, sprints) {
        var upd;
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

    console.log(path.join(process.cwd(), 'server'));
    const pt = spawn('python3', ['./external/updater.py'], {
        cwd: path.join(process.cwd(), 'server')
    });
    pt.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    setInterval(function() {
      spawn('python3', ['./external/updater.py'], {
          cwd: path.join(process.cwd(), 'server')
      });
      }, 30000);

    if (!module.parent) {
      app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
    }
  })
  .catch(err => console.error(err));

export { app };
