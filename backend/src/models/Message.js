import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema(
//   {
//     from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  
//     to:   { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional: PM
//     room: { type: String }, // optional: room/group
//     text: { type: String, required: true }
//   },
//   { timestamps: true }
// );

const messageSchema = new mongoose.Schema(
  {
    from: { type: String, required: true }, // 👈 sửa lại thành String
    to: { type: String },
    room: { type: String },
    text: { type: String, required: true },
  },
  { timestamps: true }
);


export default mongoose.model("Message", messageSchema);
