const { Router } = require('express');
const axios = require('axios');
const DevModel = require('./models/DevModel');

const routes = Router();

routes.post('/devs', async (request, response) => {
  const { github_username, techs, latitude, longitude } = request.body;

  const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

  const { name = login, avatar_url, bio } = apiResponse.data;

  const location = {
    type: 'Point',
    coordinates: [longitude, latitude]
  }

  const devCreated = await DevModel.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs,
    location
  });

  return response.json(devCreated);
});

module.exports = routes;