import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    street:{ type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
});
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address:{ type: addressSchema, required: true }
});

export const user = mongoose.model('user', userSchema);

export default user;