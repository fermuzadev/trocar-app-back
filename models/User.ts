import { Schema, model, Document, Mongoose } from "mongoose";
import bcrypt from "bcryptjs";

interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  createdAt: Date
}

const userSchema: Schema<User> = new Schema(
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
  { timestamps: true }
);

userSchema.pre("save", async function (next): Promise<void> {
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
  } catch (error: any) {
    next(error);
  }
});

const User = model<User>("User", userSchema);

export {User}