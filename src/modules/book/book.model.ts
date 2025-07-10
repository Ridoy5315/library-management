import { model, Schema } from "mongoose";
import { bookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook, bookModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
      uppercase: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      trim: true,
      unique: [true, "This ISBN already taken"],
      validate: {
        validator: function (value: string) {
          return /^\d{13}$/.test(value);
        },
        message:
          "Invalid ISBN, ISBN must be a valid ISBN-13 (e.g.  9780306406157)",
      },
    },
    description: {
      type: String,
      default: "",
    },
    copies: {
      type: Number,
      required: [true, "Genre is required"],
      min: [0, "Book's copies cann't be less than 0"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//static method for handling copies and available of books collection
bookSchema.statics.borrowBook = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }
  if(quantity <= 0){
    throw new Error("Please write the proper quantity");
  }
  
  if (book.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  book.copies = book.copies - quantity;

  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();

  return book;
};

//pre hook document middleware
bookSchema.pre("save", async function (next) {
  if (this.copies === 0) {
    this.available = false;
  } else this.available = true;

  next();
});

const Book = model<IBook, bookModel>("Book", bookSchema);

export default Book;
