import express, { Response, Request } from 'express';
import { MongoClient, Db } from 'mongodb';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db: Db;

client.connect()
  .then(() => {
    db = client.db('mydatabase');
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err);
  });

app.post('/emails', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const emailscollection = db.collection('emails');
    await emailscollection.insertOne({ email });
    res.status(200).send("User added successfully to your database");
  } catch (error) {
    res.status(500).send('Error adding user');
    console.log("Error adding user", error);
  }
});

app.post('/passwords', async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const passwordcollection = db.collection('passwords');
    await passwordcollection.insertOne({ password });
    res.status(200).send("Password added successfully to your database");
  } catch (error) {
    res.status(500).send("Something went wrong inside the server code");
    console.log('Check server code', error);
  }
});
app.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailsCollection = db.collection('emails');
    const passwordsCollection = db.collection('passwords');

    const emailExists = await emailsCollection.findOne({ email });
    const passwordMatches = await passwordsCollection.findOne({ password });

    if (emailExists && passwordMatches) {
      res.status(200).send("Authentication successful");
    } else {
      res.status(401).send("Authentication failed");
    }
  } catch (error) {
    res.status(500).send("Something went wrong inside the server code");
    console.log('Check server code', error);
  }
});


// Obsługa sygnału SIGINT do zamknięcia połączenia z MongoDB przed wyłączeniem serwera
process.on('SIGINT', () => {
  client.close().then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Server is already running on port ${port}`);
});
