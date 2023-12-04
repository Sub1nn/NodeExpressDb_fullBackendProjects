// set rules
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 60,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 23,
    max: 65,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 60,
    required: true,
    trim: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    trim: true,
  },
});

export const Teacher = mongoose.model("Teacher", teacherSchema);

// create folder
