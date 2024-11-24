import { app } from './server';
import fs from 'fs';

const serverInfo = JSON.parse(fs.readFileSync('./server/serverInfo.json', 'utf-8'));

const host = serverInfo.host || 'localhost';
const port = process.env.PORT || serverInfo.port || 3000;

app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});