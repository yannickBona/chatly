import mongoose from "mongoose";

/**
 * Create new database connection
 */
async function connect(test: boolean = false) {
  const dbUri = process.env.MONGO_URL!;
  const connection = mongoose.connect(dbUri);
  return connection;
}

// async function droptest(done) {
//   mongoose.connection.db.dropDatabase();
//   return;
// }

export default { connect };
