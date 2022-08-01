const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
//const routes = require('./controllers');
//const helpers = require('./utils/helpers')
//const sequelize = require('./config/connection');
//const { application } = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

//app.use(routes);

//testing home page
app.get('', (req, res) => {
  res.render('home');
})

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on port ${PORT} >🚀`));
// })

app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT} >🚀`));