import mongoose from "mongoose";

const navbarSchema = new mongoose.Schema(
  {
    phone: String,
    menu: [
      {
        label: String,
        link: String,
      },
    ],
  },
  { timestamps: true }
);


export default mongoose.model("Navbar", navbarSchema);
