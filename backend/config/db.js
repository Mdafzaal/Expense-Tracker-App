import mongoose from "mongoose";
import dns, { setServers } from "dns"

dns.setServers(["1.1.1.1", "8.8.8.8" ]);

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://mdafzaal0111_db_user:Afzaal123@cluster0.6i3tusk.mongodb.net/Expense")
    .then(() => console.log("DB CONNECTED"));
}