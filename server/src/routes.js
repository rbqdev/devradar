const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.list);
routes.post('/devs', DevController.create);

routes.get('/search', SearchController.searchDevs);

module.exports = routes;