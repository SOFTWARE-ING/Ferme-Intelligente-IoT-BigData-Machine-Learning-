const mqtt = require('mqtt');
const IoTData = require('../models/SensorData');
const Building = require('../models/Building');
const { sendSocketEvent } = require('../config/socket');

let client = null;

const connectMQTT = () => {
  const options = {
    clientId: `manichicks_${Math.random().toString(16).substr(2, 8)}`,
    clean: true,
    reconnectPeriod: 5000,
    connectTimeout: 30000
  };
  
  if (process.env.MQTT_USERNAME) {
    options.username = process.env.MQTT_USERNAME;
    options.password = process.env.MQTT_PASSWORD;
  }
  
  client = mqtt.connect(process.env.MQTT_BROKER, options);
  
  client.on('connect', () => {
    console.log('✅ Connecté au broker MQTT');
    client.subscribe('iot/+/sensors');
    client.subscribe('iot/+/alerts');
  });
  
  client.on('message', async (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      const buildingId = topic.split('/')[1];
      
      console.log(`📨 Données reçues de ${buildingId}:`, payload);
      
      const iotData = new IoTData({
        buildingId,
        temperature: payload.temperature,
        humidite: payload.humidite,
        ammoniac: payload.ammoniac,
        consommationEau: payload.eau,
        consommationAliment: payload.aliment,
        timestamp: new Date()
      });
      
      await iotData.save();
      
      await Building.findOneAndUpdate(
        { buildingId },
        { temperature: payload.temperature, humidite: payload.humidite, ammoniac: payload.ammoniac, updatedAt: new Date() }
      );
      
      sendSocketEvent('iot_data', { buildingId, data: payload, timestamp: new Date() });
      
    } catch (error) {
      console.error('❌ Erreur MQTT:', error);
    }
  });
  
  client.on('error', (error) => {
    console.error('❌ Erreur MQTT:', error);
  });
};

module.exports = { connectMQTT };
