const tests = [
  {
    description: "Basic equality match",
    rule: `hostname = pc1`,
    alert: { hostname: "pc1" },
    expected: true
  },
  {
    description: "Quoted string match",
    rule: `hostname = "pc1"`,
    alert: { hostname: "pc1" },
    expected: true
  },
  {
    description: "Regex match",
    rule: `commandline =~ "cmd.*mimikatz.*"`,
    alert: { commandline: "cmd /c mimikatz.exe" },
    expected: true
  },
  {
    description: "NOT regex match (should pass)",
    rule: `commandline !~ "powershell.*"`,
    alert: { commandline: "cmd.exe" },
    expected: true
  },
  {
    description: "Logical AND (all true)",
    rule: `hostname = pc1 AND user = root`,
    alert: { hostname: "pc1", user: "root" },
    expected: true
  },
  {
    description: "Logical OR (one true)",
    rule: `hostname = pc1 OR hostname = pc2`,
    alert: { hostname: "pc2" },
    expected: true
  },
  {
    description: "Grouped logic (OR inside AND)",
    rule: `hostname = pc1 AND (user = root OR user = admin)`,
    alert: { hostname: "pc1", user: "admin" },
    expected: true
  },
  {
    description: "Field IN list (quoted + unquoted)",
    rule: `username IN [admin, root, "user1"]`,
    alert: { username: "user1" },
    expected: true
  },
  {
    description: "Field NOT IN list",
    rule: `ip NOT IN [192.168.1.1, 10.0.0.1]`,
    alert: { ip: "127.0.0.1" },
    expected: true
  },
  {
    description: "Field IN numeric list",
    rule: `status IN [200, 404, 500]`,
    alert: { status: 404 },
    expected: true
  },
  {
    description: "Field NOT in list (should fail)",
    rule: `username IN [admin, root]`,
    alert: { username: "guest" },
    expected: false
  },
  {
    description: "Complex rule with AND and NOT IN",
    rule: `hostname = pc1 AND commandline =~ "mimikatz" AND username NOT IN [guest, "anonymous"]`,
    alert: {
      hostname: "pc1",
      commandline: "cmd /c mimikatz.exe",
      username: "admin"
    },
    expected: true
  }
];

module.exports = tests;
