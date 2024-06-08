import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URL, PORT } from '../src/config/config.js';
import { User } from '../src/models/UserModel.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/user/signup', async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password_hash ||
      !req.body.full_name
    ) {
      return res.status(400).json({
        status: 400,
        message:
          'Do not leave out required fields: Username, Email, Password and Full Name.',
      });
    }

    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password_hash: req.body.password_hash,
      full_name: req.body.full_name,
      profile_picture: req.body.profile_picture,
      cover_photo: req.body.cover_photo,
      bio: req.body.bio,
      date_of_birth: req.body.date_of_birth,
      location: req.body.location,
      last_login_timestamp: req.body.last_login_timestamp,
      account_status: req.body.account_status,
      security_tokens: {
        verification_token: req.body.security_tokens?.verification_token,
        password_reset_token: req.body.security_tokens?.password_reset_token,
      },
      social_links: {
        twitter: req.body.social_links?.twitter,
        instagram: req.body.social_links?.instagram,
      },
      friends_list: req.body.friends_list,
      post_history: req.body.post_history,
    };

    const user = await User.create(newUser);
    console.log('Successful user creation.');
    return res.status(201).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('SUCCESS: App connected to database!');
    app.listen(PORT, () => {
      console.log(`SUCCESS: App is listening to port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
