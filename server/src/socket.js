const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistanceByKm = require('./utils/calculateDistanceByKm');

let io;
const connections = [];

exports.setupWebSocket = (server) => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringAsArray(techs)
    })
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    const isDistanceLessThan10 = calculateDistanceByKm(coordinates, connection.coordinates) < 10;

    const haveSomeTech = connection.techs.some(item => techs.includes(item));

    return isDistanceLessThan10 && haveSomeTech;
  });
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}