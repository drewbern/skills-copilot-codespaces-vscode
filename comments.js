// Create web server
// Run using: node comments.js
// Access using: http://localhost:3000/

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred while reading comments.json');
      return;
    }
    res.send(data);
  });
});

app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    res.status(400).send('Name and comment are required');
    return;
  }
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred while reading comments.json');
      return;
    }
    const comments = JSON.parse(data);
    comments.push({ name, comment });
    fs.writeFile('comments.json', JSON.stringify(comments, null, 2), err => {
      if (err) {
        res.status(500).send('An error occurred while writing comments.json');
        return;
      }
      res.send('Comment added');
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
}); 

//  In this code, we create an Express web server that listens on port 3000. We have two routes: one for reading comments and one for adding comments. The comments are stored in a file called  comments.json . 
//  To read comments, we use the  fs.readFile  function to read the contents of the  comments.json  file. We then send the contents back as a response. 
//  To add comments, we first check if the  name  and  comment  fields are present in the request body. If they are not, we send a 400 status code with an error message. 
//  We then read the contents of the  comments.json  file and parse it as JSON. We push the new comment into the array and write the updated array back to the file. 
//  To run the server, save the code to a file called  comments.js  and run it using the following command: 
//  node comments.js 
//  You can access the server