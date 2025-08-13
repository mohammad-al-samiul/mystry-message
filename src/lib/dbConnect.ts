// import mongoose from "mongoose";

import mongoose from "mongoose";

// export type TConnectionObject = {
//   isConnected?: boolean;
// };

// const connection: TConnectionObject = {};
// export async function dbConnect() {
//   if (connection.isConnected) {
//     console.log("Already connected to the database");
//     return;
//   }
//   try {
//     const db = await mongoose.connect(`${process.env.DB_URI}` || "");
//     connection.isConnected = db.connections[0].readyState === 1;
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Database Conneciton failed", error);
//     process.exit(1);
//   }

// }

export type TConnectionObject = {
  isConnected?: boolean;
};

const connection: TConnectionObject = {};

export async function dbConnect() {
  if (connection.isConnected) {
    console.log("Database Already Connected");
    return;
  }
  try {
    const db = await mongoose.connect(`${process.env.DB_URI}` || "");
    connection.isConnected = db.connections[0].readyState === 1;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}
