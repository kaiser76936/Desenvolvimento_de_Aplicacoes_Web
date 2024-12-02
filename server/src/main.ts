import { app } from './server';
import fs from 'fs';

/**
 * Represents the server configuration information.
 */
const serverInfo = JSON.parse(fs.readFileSync('./server/serverInfo.json', 'utf-8'));

/**
 * The hostname where the server will run.
 * Defaults to 'localhost' if not specified in serverInfo.
 */
const host = serverInfo.host || 'localhost';

/**
 * The port number on which the server will listen.
 * Checks environment variable PORT, then serverInfo.port, and defaults to 3000.
 */
const port = process.env.PORT || serverInfo.port || 3000;

/**
 * Starts the server and listens on the specified host and port.
 */
app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});