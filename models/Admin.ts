import { Schema, model, Document, Mongoose } from "mongoose";
import bcrypt from "bcryptjs";

interface Admin extends Document {
  email: string;
  password: string;
  name: string;
}

const AdminSchema: Schema<Admin> = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

AdminSchema.methods.toJSON = function (): any {
  const admin = this._doc;
  admin.id = this._id.toString();
  delete admin._id;
  return admin;
};

AdminSchema.pre("save", async function (next): Promise<void> {
  // Solo hashear la contraseña si ha sido modificada o es nueva
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(this.password, 15);

    // Reemplazar la contraseña en texto plano por la contraseña hasheada
    this.password = hashedPassword;

    next();
  } catch (error: any) {
    next(error);
  }
});

const Admin =  model<Admin> ("Admin", AdminSchema);

export {Admin}



