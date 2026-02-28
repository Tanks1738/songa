const net = require("net");

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

console.log(`Testing connection to ${host}:${port}...`);

const socket = net.createConnection({ host, port }, () => {
  console.log(`✅ Connected successfully to ${host}:${port}`);
  socket.end();
});

socket.on("error", (err) => {
  console.error(`❌ Connection failed: ${err.message}`);
});