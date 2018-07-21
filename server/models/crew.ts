import * as mongoose from 'mongoose';

const crewSchema = new mongoose.Schema({
  name: String,
  login: String,
  rank: String,
  age: Number,
  parrot: Number,
  skull: Number,
  crown: Number,
  diamond: Number
});

const Crew = mongoose.model('Crew', crewSchema);

export default Crew;
