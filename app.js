const express = require('express');
const app = express();
const ejs = require('ejs');

const PORT = process.env.PORT || 8080;

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});