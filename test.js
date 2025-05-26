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

const regexTests = [
  {
    description: "Match beginning of string",
    rule: `commandline =~ "^cmd"`,
    alert: { commandline: "cmd /c whoami" },
    expected: true
  },
  {
    description: "Match end of string",
    rule: `filename =~ ".exe$"`,
    alert: { filename: "mimikatz.exe" },
    expected: true
  },
  {
    description: "Dot wildcard matching",
    rule: `commandline =~ "mimi.katz"`,
    alert: { commandline: "mimi-katz" },
    expected: true
  },
  {
    description: "Optional group match",
    rule: `commandline =~ "mimikatz(\\.exe)?"`,
    alert: { commandline: "mimikatz.exe" },
    expected: true
  },
  {
    description: "Negated match with !~",
    rule: `process !~ "powershell"`,
    alert: { process: "cmd.exe" },
    expected: true
  },
  {
    description: "Match with escaped dot",
    rule: `filename =~ "secret\\.txt"`,
    alert: { filename: "secret.txt" },
    expected: true
  },
  {
    description: "Word boundary match",
    rule: `commandline =~ "\\bmimikatz\\b"`,
    alert: { commandline: "run mimikatz now" },
    expected: true
  },
  {
    description: "Regex case-sensitive match fails",
    rule: `commandline =~ "Mimikatz"`,
    alert: { commandline: "mimikatz" },
    expected: false
  },
  {
    description: "Complex regex with multiple patterns",
    rule: `commandline =~ "cmd.*(/c|/k).*mimikatz.*\\.exe"` ,
    alert: { commandline: "cmd /c start mimikatz.exe" },
    expected: true
  },
  {
    description: "Regex fail with unmatched pattern",
    rule: `commandline =~ "powershell.*Invoke-Expression"`,
    alert: { commandline: "cmd /c mimikatz.exe" },
    expected: false
  },
  {
    description: "Regex with multiple spaces",
    rule: `log =~ "failed\\s+to\\s+connect"`,
    alert: { log: "failed    to connect to server" },
    expected: true
  },
  {
    description: "Regex with character class",
    rule: `ip =~ "^192\\.168\\.[0-9]{1,3}\\.[0-9]{1,3}$"`,
    alert: { ip: "192.168.0.1" },
    expected: true
  },
  {
    description: "Negated regex fails on match",
    rule: `commandline !~ "mimikatz"`,
    alert: { commandline: "mimikatz.exe" },
    expected: false
  }
];

module.exports = tests;
