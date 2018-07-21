import * as mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: String,
  text: String,
  text_end: String,
  prize: String,
  prize_size: Number
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
