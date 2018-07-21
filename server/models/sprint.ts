import * as mongoose from 'mongoose';

const sprintSchema = new mongoose.Schema({
  number: Number,
  name: String,
  begin: String,
  end: String,
  task1: String,
  task2: String,
  task3: String,
  count1: Number,
  count2: Number,
  count3: Number,
  gold: Number,
  parrot: Number,
  skull: Number,
  crown: Number,
  diamond: Number,
  total_gold: Number,
  total_parrot: Number,
  total_skull: Number,
  total_crown: Number,
  total_diamond: Number,
  battle: Number,
  fail_battle: Number,
  big_gold: Number,
  win: Boolean
});

export const Sprint = mongoose.model('Sprint', sprintSchema);

export default Sprint;
