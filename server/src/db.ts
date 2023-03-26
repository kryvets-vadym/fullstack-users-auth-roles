import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import fetch from "node-fetch";
import UserItem, { UserItemI } from './models/UserItem.js';

dotenv.config()

export const connectDb = async () => {
  try {
    const DB_URL = process.env.DB_URL!;

    await mongoose
      .connect(DB_URL)
      .then(async () => {
        console.log('⚡️[database]: Connected to database');
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
  }
};

export const initDb = async () => {
  const dbUsersItems = await UserItem.countDocuments();

  if (dbUsersItems > 0) {
    return;
  }

  const users: any = await fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json());

  const usersToDb = users.map((user: any) => {
    const userDto: UserItemI = {
      userId: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: {
        street: user.address.street,
        city: user.address.city,
        zipcode: user.address.zipcode,
      },
      phone: user.phone.split(' ')[0],
      website: user.phone.website,
      companyName: user.company.name,
    }

    return userDto;
  });

  await UserItem.insertMany(usersToDb);
};
