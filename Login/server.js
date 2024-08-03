const express = require('express');
const mongoose = require('mongoose');
const { auth } = require('express-oauth2-jwt-bearer');

const app = express();
const port = process.env.PORT || 3000;

const authConfig = {
    audience: 'https://tifftoker.com/login',
    issuerBaseURL: 'dev-nr6w2ef4fy5je1rv.ca.auth0.com/',
};

mongoose.connect('mongodb://localhost:27017//users', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    auth0id: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.use(auth(authConfig));

app.get('/profile', (req, res) => {
    const user = req.user;
    User.findOne({ auth0Id: user.sub }, (err, userProfile) => {
      if (err) return res.status(500).send(err);
      if (!userProfile) {
        // create new user profile in MongoDB
        const newUser = new User({ auth0Id: user.sub, email: user.email, password: user.password });
        newUser.save((err, savedUser) => {
          if (err) return res.status(500).send(err);
          res.json(savedUser);
        });
      } else {
        res.json(userProfile);
      }
    });
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });