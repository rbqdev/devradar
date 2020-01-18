const DevModel = require('../models/DevModel');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async searchDevs(request, response) {
    const { longitude, latitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await DevModel.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });
    
    return response.json({ devs });
  }
};