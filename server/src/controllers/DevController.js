const axios = require('axios');
const DevModel = require('../models/DevModel');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async list(request, response) {
    const devs = await DevModel.find();

    return response.json(devs);
  },

  async create (request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    
    const devAlreadyExist = await DevModel.findOne({ github_username });

    if(devAlreadyExist) {
      return response.json({ 
        type: "error", 
        message: "Dev already exist on database!" 
      });
    }

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
    const { name = login, avatar_url, bio } = apiResponse.data;
  
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    const techsArray = parseStringAsArray(techs);
  
    const devCreated = await DevModel.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });
  
    return response.json(devCreated);
  },

  async update(id) {

  },

  async delete(id) {

  }
};