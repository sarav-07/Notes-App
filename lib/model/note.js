import { Schema, models, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    date: {
      type: String, 
      required: true,
    },
    time: {
      type: String, 
      required: true,
    },
    order: {
      type: Number, 
      required: true,
    },
  },
);
const Note = models.Note || model('Note', noteSchema); 
export default Note;