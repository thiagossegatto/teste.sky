import mongoose from "../../database";
import bcrypt from "bcryptjs";
import { Document, Schema } from "mongoose";

interface IPhone {
  numero: string;
  ddd: string;
}

export interface IUserDocument extends Document {
  id: string;
  nome: string;
  email: string;
  senha: string | undefined;
  token: string;
  data_criacao: Date;
  data_atualizacao: Date;
  ultimo_login: Date;
  telefones: IPhone[];
}

const UserSchema: Schema = new mongoose.Schema(
  {
    nome: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    senha: {
      type: String,
      require: true,
      select: false,
    },
    telefones: [
      {
        numero: {
          type: String,
          require: true,
        },
        ddd: {
          type: String,
          require: true,
        },
      },
    ],
    data_criacao: {
      type: Date,
      default: Date.now,
    },
    data_atualizacao: {
      type: Date,
    },
    ultimo_login: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { versionKey: false } }
);

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.get("senha"), 10);
  this.set("senha", hash);
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
