import keyv from "keyv";

const db = new keyv(
  "mongodb+srv://shynn:xuanhuy123@musepank.8k1ib.mongodb.net/discordbot?retryWrites=true&w=majority"
);

db.on("error", (err) => console.error("Keyv connection error:", err));

export default db;
