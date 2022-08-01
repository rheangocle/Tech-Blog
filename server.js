const path = require('path');
const express = require('express');
const exhbs = require('express-handlebars');
const routes = require('./controllers');
//add utils file
const helpers = require('./utils')
const sequelize = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exhbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT} >🚀`));
})
