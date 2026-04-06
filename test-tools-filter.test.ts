/**
 * Test for --tools and --exclude-tools flags
 */

import { parseArgs } from "./packages/coding-agent/src/cli/args.js";

console.log("Testing --tools flag parsing...\n");

// Test 1: Basic --tools flag
const args1 = ["--tools", "read,bash,edit"];
const result1 = parseArgs(args1);
console.log("Test 1 - Basic --tools:");
console.log(`  Input: ${args1.join(" ")}`);
console.log(`  Tools: ${result1.tools?.join(", ") || "undefined"}`);
console.log(`  Expected: ["read", "bash", "edit"]`);
console.log(`  Result: ${JSON.stringify(result1.tools)}`);
console.log(`  ${JSON.stringify(result1.tools) === JSON.stringify(["read", "bash", "edit"]) ? "✓ PASS" : "✗ FAIL"}\n`);

// Test 2: --exclude-tools flag
const args2 = ["--tools", "read,bash,edit,write", "--exclude-tools", "write"];
const result2 = parseArgs(args2);
console.log("Test 2 - --exclude-tools:");
console.log(`  Input: ${args2.join(" ")}`);
console.log(`  Tools: ${result2.tools?.join(", ") || "undefined"}`);
console.log(`  ExcludeTools: ${result2.excludeTools?.join(", ") || "undefined"}`);
console.log(`  Expected: ["read", "bash", "edit"]`);
console.log(`  Result: ${JSON.stringify(result2.tools)}`);
console.log(`  ${JSON.stringify(result2.tools) === JSON.stringify(["read", "bash", "edit"]) ? "✓ PASS" : "✗ FAIL"}\n`);

// Test 3: --exclude-tools with invalid tool
const args3 = ["--tools", "read,bash", "--exclude-tools", "invalid,write"];
const result3 = parseArgs(args3);
console.log("Test 3 - --exclude-tools with invalid tool:");
console.log(`  Input: ${args3.join(" ")}`);
console.log(`  Tools: ${result3.tools?.join(", ") || "undefined"}`);
console.log(`  ExcludeTools: ${result3.excludeTools?.join(", ") || "undefined"}`);
console.log(`  Expected: ["read", "bash"]`);
console.log(`  Result: ${JSON.stringify(result3.tools)}`);
console.log(`  ${JSON.stringify(result3.tools) === JSON.stringify(["read", "bash"]) ? "✓ PASS" : "✗ FAIL"}\n`);

// Test 4: --no-tools with --exclude-tools
const args4 = ["--no-tools", "--exclude-tools", "bash,edit"];
const result4 = parseArgs(args4);
console.log("Test 4 - --no-tools with --exclude-tools:");
console.log(`  Input: ${args4.join(" ")}`);
console.log(`  Tools: ${result4.tools?.join(", ") || "undefined"}`);
console.log(`  Expected: []`);
console.log(`  Result: ${JSON.stringify(result4.tools)}`);
console.log(`  ${JSON.stringify(result4.tools) === JSON.stringify([]) ? "✓ PASS" : "✗ FAIL"}\n`);

console.log("All tests completed!");
