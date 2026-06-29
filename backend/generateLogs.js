const fs = require("fs");

const logs = [];

const roles = ["admin", "user", "system"];
const actions = ["CREATE", "UPDATE", "DELETE", "LOGIN"];
const severities = ["LOW", "MEDIUM", "HIGH"];
const statuses = ["Resolved", "Unresolved"];
const resourceTypes = ["USER", "FILE", "SERVER"];
const regions = ["us-east-1", "eu-west-1", "ap-south-1"];

for (let i = 0; i < 10000; i++) {
  logs.push({
    actor: `user${i}@company.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    resource: `/api/resource/${i}`,
    resourceType: resourceTypes[Math.floor(Math.random() * resourceTypes.length)],
    ipAddress: Math.random() > 0.2 ? `192.168.1.${i % 255}` : undefined,
    region: Math.random() > 0.2 ? regions[Math.floor(Math.random() * regions.length)] : undefined,
    severity: severities[Math.floor(Math.random() * severities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
  });
}

// Save to file
fs.writeFileSync("logs.json", JSON.stringify(logs, null, 2));

console.log(" 10,000 logs generated in logs.json");