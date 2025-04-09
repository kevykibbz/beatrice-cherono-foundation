const fs = require('fs');
const filePath = 'metrics.csv';

if (!fs.existsSync(filePath)) {
  const headers = 'timestamp,rss,heapTotal,heapUsed,cpuUser,cpuSystem\n';
  fs.writeFileSync(filePath, headers);
}

setInterval(() => {
  const mem = process.memoryUsage();
  const cpu = process.cpuUsage();
  const line = `${Date.now()},${mem.rss},${mem.heapTotal},${mem.heapUsed},${cpu.user},${cpu.system}\n`;
  fs.appendFileSync(filePath, line);
}, 5000);
