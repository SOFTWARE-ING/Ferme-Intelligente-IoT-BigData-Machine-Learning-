print("🌱 Seeding simplified ManiChicks database...");

const db = db.getSiblingDB('manichicks_db');

// 1. Buildings
const buildingId = db.buildings.insertOne({
  buildingCode: "BLD01",
  name: "Building A",
  type: "growing",
  capacity: 600,
  currentOccupancy: 585,
  temperature: 29.5,
  humidity: 68,
  ammonia: 12,
  status: "active",
  responsible: "Jean Mbarga"
}).insertedId;

// 2. Suppliers
db.suppliers.insertOne({
  code: "SUP001",
  name: "AgriChick Supplier",
  contactPerson: "Jean Nkoulou",
  phone: "+237699123456",
  products: ["Broiler chicks", "Feed"],
  rating: 4.5
});

// 3. Batches
const supplier = db.suppliers.findOne({ code: "SUP001" });
db.batches.insertOne({
  batchCode: "BATCH001",
  name: "Batch A - Broiler",
  supplierName: "AgriChick Supplier",
  buildingIds: [buildingId],
  startDate: new Date(),
  status: "growing",
  initialCount: 1000,
  currentCount: 985,
  ageDays: 15,
  avgWeightKg: 0.85,
  mortalityRate: 1.5,
  feedConsumptionKg: 125.5,
  waterConsumptionL: 280.3,
  avgTemperature: 29.5,
  avgHumidity: 68,
  nextVaccination: new Date(Date.now() + 7 * 86400000)
});

// 4. Timeseries collection (sensor_data)
db.createCollection("sensordata", {
  timeseries: { timeField: "timestamp", metaField: "sensorType", granularity: "seconds" }
});

// 5. Admin user (password = admin123)
db.users.insertOne({
  username: "admin",
  email: "admin@manichicks.com",
  passwordHash: "$2a$10$u5XdVw0xCgnEDw4ZDeTP4ugnOLPBZqR5l2TG6pdBwYwff7Z/N6tBG", // bcrypt hash of "password"
  firstName: "Admin",
  lastName: "System",
  role: "admin"
});

print("✅ Seeding done. Collections:", db.getCollectionNames().join(", "));