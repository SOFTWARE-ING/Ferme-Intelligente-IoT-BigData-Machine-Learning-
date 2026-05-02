const socketIO = require('socket.io');

let io = null;

const initSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      credentials: true
    }
  });
  
  io.on('connection', (socket) => {
    console.log(`🔌 Nouveau client connecté: ${socket.id}`);
    
    const token = socket.handshake.auth.token;
    if (!token) {
      socket.disconnect();
      return;
    }
    
    socket.on('join_building', (buildingId) => {
      socket.join(`building_${buildingId}`);
      console.log(`Client ${socket.id} a rejoint building_${buildingId}`);
    });
    
    socket.on('leave_building', (buildingId) => {
      socket.leave(`building_${buildingId}`);
    });
    
    socket.on('disconnect', () => {
      console.log(`🔌 Client déconnecté: ${socket.id}`);
    });
  });
  
  return io;
};

const sendSocketEvent = (event, data, room = null) => {
  if (io) {
    if (room) {
      io.to(room).emit(event, data);
    } else {
      io.emit(event, data);
    }
  }
};

module.exports = { initSocket, sendSocketEvent };
