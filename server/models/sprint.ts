import * as mongoose from 'mongoose';

const sprintSchema = new mongoose.Schema({
  number: Number,
  name: String,
  begin: String,
  end: String,
  task1: String,
  task2: String,
  count1: Number,
  count2: Number,
  gold: Number,
  parrot: Number,
  skull: Number,
  crown: Number,
  diamond: Number,
  curr_gold: Number,
  curr_parrot: Number,
  curr_skull: Number,
  curr_crown: Number,
  curr_diamond: Number,
  total_gold: Number,
  total_parrot: Number,
  total_skull: Number,
  total_crown: Number,
  total_diamond: Number,
  battle: Number,
  fail_battle: Number,
  big_gold: Number,
  win: Boolean,
  current: Boolean
});

export const Sprint = mongoose.model('Sprint', sprintSchema);

export default Sprint;
