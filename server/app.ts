import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import {Sprint} from './models/sprint';

import setRoutes from './routes';

const app = express();
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
        win: true
      });
      first_sprint.save((err, item) => {});
    });

    if (!module.parent) {
      app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
    }
  })
  .catch(err => console.error(err));

export { app };
