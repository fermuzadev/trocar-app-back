const { mongoose } = require("../db");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    phone: String,
    address: String,
  },
  { timestamps: true },
);

// userSchema.methods.toJSON = function () {
//   const user = this._doc;
//   user.id = this._id.toString();
//   delete user._id;
//   return user;
// };

// userSchema.virtual("slug").get(function () {
//   return slugify(`${this.firstname} ${this.lastname}`, {
//     replacement: "-", // replace spaces with replacement character, defaults to `-`
//     remove: undefined, // remove characters that match regex, defaults to `undefined`
//     lower: true, // convert to lower case, defaults to `false`
//     strict: true, // strip special characters except replacement, defaults to `false`
//     locale: "en", // language code of the locale to use
//     trim: true, // trim leading and trailing replacement chars, defaults to `true`
//   });
// });

userSchema.pre("save", async function (next) {
  // Solo hashear la contraseña si ha sido modificada o es nueva

  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(this.password, 10);

    // Reemplazar la contraseña en texto plano por la contraseña hasheada
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});


module.exports = mongoose.model("User", userSchema);
