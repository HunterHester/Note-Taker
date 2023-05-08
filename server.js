const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

//establishes middleware
app.use(express.json());
app.use(express.urlencoded( { extended: true}));
app.use(express.static('public'));

const api = require('./routes/notes');
const index = require('./routes/index');

app.use("/api", api);
app.use(index);

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})


//this allows the user to query for a specific note title
//app.get('/notes/:title, (req, res) => {
// console.log(req.params.title)
// })
//GET http://localhost:3001/notes/title