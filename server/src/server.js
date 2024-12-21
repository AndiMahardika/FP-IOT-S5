// Backend Smart Bird Cage
import express from 'express';
import mqtt from 'mqtt';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors(
  {
    origin: '*'
  }
));

// Setup SQLite database
const db = new sqlite3.Database('./smart-bird-cage.sqlite');
const dbCleaningInfo = new sqlite3.Database('./cleaning-info.sqlite');

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS BirdCageData (
    time TEXT NOT NULL,
    weight REAL NOT NULL,
    motionDetected TEXT NOT NULL,
    relayStatus TEXT NOT NULL,
    servoPosition INTEGER NOT NULL
  )
`);

dbCleaningInfo.run(`
  CREATE TABLE IF NOT EXISTS CleaningInfo (
    time TEXT NOT NULL,
    date TEXT NOT NULL,
    timeCleaning TEXT NOT NULL,
    day REAL NOT NULL,
    info TEXT
  )
`);

// Connect to MQTT broker
const client = mqtt.connect('mqtt://exlxu4u.localto.net', { port: 6369 });

client.on('connect', () => {
  console.log('Connected to MQTT Broker');
  client.subscribe('smartBirdCage');
});

client.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("Received MQTT message:", data);
    const currentTime = new Date().toISOString();

    // Save data to SQLite database
    db.run(
      'INSERT INTO BirdCageData (time, weight, motionDetected, relayStatus, servoPosition) VALUES (?, ?, ?, ?, ?)',
      [currentTime, data.weight, data.motionDetected, data.relayStatus, data.servoPosition],
      (err) => {
        if (err) {
          console.error('Error inserting data:', err);
        }
      }
    );

    // Save cleaning info to SQLite database
    if(data.cleaningInfo){
      const dataCleaning = data.cleaningInfo;
      console.log("Waktu cleaning info:", dataCleaning);
      dbCleaningInfo.run(
        'INSERT INTO CleaningInfo (time, date, timeCleaning, day, info) VALUES (?, ?, ?, ?, ?)',
        [currentTime, dataCleaning.date, dataCleaning.time, dataCleaning.day, dataCleaning.info],
        (err) => {
          if (err) {
            console.error('Error inserting cleaning info:', err);
          }
        }
      );
    }

  } catch (error) {
    console.error('Error parsing MQTT message:', error);
  }
});

// API to get the latest data
app.get('/api/data', (req, res) => {
  db.all('SELECT * FROM BirdCageData ORDER BY time DESC LIMIT 1', (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching data');
    } else {
      res.json(rows[0]);
    }
  });
});

// API to get all cleaning info
app.get('/api/cleanings', (req, res) => {
  dbCleaningInfo.all('SELECT * FROM CleaningInfo', (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching cleaning info');
    } else {
      res.json(rows);
    }
  });
});

// test
app.get('/api/data', (req, res) => {
  res.json({ message: 'Data received successfully' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
