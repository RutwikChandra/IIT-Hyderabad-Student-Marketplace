const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');

router.post('/signup', async (req, res) => {
  const { name, email, password, contact_info } = req.body;

    try {
        const query = 'INSERT INTO users(name, email, password_hash, contact_info) VALUES ($1, $2, $3,$4)';
        const values = [name, email, password, contact_info];
        pool.query(query, values)
          .then(result => {
            console.log('User inserted!');
            res.json({ message: 'Signed Up successful' });
            // window.location.href = '/login';
          })
          .catch(err => {   
            console.error('Error inserting user:', err);
            // res.status(500).send('Server Error');
            res.json({ message: 'Signing in Failed'});
          });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;
