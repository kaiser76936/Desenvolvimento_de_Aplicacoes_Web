"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const fs_1 = __importDefault(require("fs"));
const serverInfo = JSON.parse(fs_1.default.readFileSync('./server/serverInfo.json', 'utf-8'));
const host = serverInfo.host || 'localhost';
const port = process.env.PORT || serverInfo.port || 3000;
server_1.app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
});
