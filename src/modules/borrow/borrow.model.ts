import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Book's copies cann't be less than 1"],
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Borrow = model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
