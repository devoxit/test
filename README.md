# 📘 Alert Rule Parser

A lightweight rule-based alert whitelisting and matching system. Designed for use in AWS Lambda pipelines with SNS/SQS, it supports intuitive rule syntax with boolean logic, comparison, regex, and list matching.

---

## 📐 Rule Syntax

Rules are written using a human-readable syntax that supports:

### ✅ Operators

| Operator | Meaning                            | Example                         |
|----------|------------------------------------|---------------------------------|
| `=`      | Equal to                           | `hostname = pc1`                |
| `!=`     | Not equal to                       | `user != root`                  |
| `>`      | Greater than                       | `count > 100`                   |
| `<`      | Less than                          | `age < 30`                      |
| `>=`     | Greater than or equal              | `size >= 512`                   |
| `<=`     | Less than or equal                 | `size <= 1024`                  |
| `=~`     | Matches regex                      | `commandline =~ "mimikatz.*"`   |
| `!~`     | Does not match regex               | `commandline !~ "powershell.*"` |
| `IN`     | Value is in list                   | `user IN [admin, root]`         |
| `NOT IN` | Value is not in list               | `ip NOT IN [192.168.1.1, 10.0.0.1]` |

---

### ✅ Boolean Logic

| Keyword | Usage                       |
|---------|-----------------------------|
| `AND`   | Combines conditions (AND)   |
| `OR`    | Combines conditions (OR)    |
| `(...)` | Grouping expressions        |

---

### ✅ Values

- **Strings**: quoted (`"value"`) or bare (`value`)
- **Regex**: written as strings with `=~` or `!~`
- **Numbers**: used directly (e.g. `status = 404`)
- **Lists**: `[item1, item2, "item3"]`

---

## 🧠 Grammar (BNF Style)

```bnf
<expression> ::= <term> ( "OR" <term> )*
<term>       ::= <factor> ( "AND" <factor> )*
<factor>     ::= "(" <expression> ")" | <condition>

<condition>  ::= <identifier> <operator> <value>
              | <identifier> "IN" <list>
              | <identifier> "NOT IN" <list>

<value>      ::= number | string | regex
<list>       ::= "[" <value> ("," <value>)* "]"
