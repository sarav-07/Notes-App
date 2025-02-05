import { Schema, models, model } from 'mongoose';
import { type } from 'os';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true
    },
    img: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
);

const Note = models.Note || model('Note', noteSchema); // Fixed model name check

export default Note;