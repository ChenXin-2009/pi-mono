/**
 * Simple test for --tools and --exclude-tools flags
 */

// Mock allTools for testing
const allTools = {
  read: { name: "read", description: "Read file" },
  bash: { name: "bash", description: "Execute bash" },
  edit: { name: "edit", description: "Edit file" },
  write: { name: "write", description: "Write file" },
  grep: { name: "grep", description: "Search files" },
  find: { name: "find", description: "Find files" },
  ls: { name: "ls", description: "List directory" },
};

console.log("Testing --tools and --exclude-tools logic...\n");

// Test 1: Filter tools with --tools flag
function filterTools(parsedTools: string[] | undefined, parsedExcludeTools: string[] | undefined): string[] {
  if (!parsedTools || parsedTools.length === 0) {
    return [];
  }

  // Get all tool names (built-in + extensions)
  const allToolNames = Object.keys(allTools);
  const extensionToolNames = ["ext_tool1", "ext_tool2"]; // Mock extension tools
  const allToolNamesWithExtensions = [...allToolNames, ...extensionToolNames];

  // Filter tools based on --tools flag
  const validTools = parsedTools.filter((name) => allToolNamesWithExtensions.includes(name));

  // Apply --exclude-tools if specified
  if (parsedExcludeTools && parsedExcludeTools.length > 0) {
    const excludeToolNames = parsedExcludeTools.filter((name) => allToolNamesWithExtensions.includes(name));
    return validTools.filter((name) => !excludeToolNames.includes(name));
  }

  return validTools;
}

// Test 2: Basic --tools flag
const result1 = filterTools(["read", "bash", "edit"], undefined);
console.log("Test 1 - Basic --tools:");
console.log(`  Input: ["read", "bash", "edit"]`);
console.log(`  Expected: ["read", "bash", "edit"]`);
console.log(`  Result: ${JSON.stringify(result1)}`);
console.log(`  ${JSON.stringify(result1) === JSON.stringify(["read", "bash", "edit"]) ? "✓ PASS" : "✗ FAIL"}\n`);

// Test 3: --exclude-tools flag
const result2 = filterTools(["read", "bash", "edit", "write"], ["write"]);
console.log("Test 2 - --exclude-tools:");
console.log(`  Input: ["read", "bash", "edit", "write"]`);
console.log(`  Exclude: ["write"]`);
console.log(`  Expected: ["read", "bash", "edit"]`);
console.log(`  Result: ${JSON.stringify(result2)}`);
console.log(`  ${JSON.stringify(result2) === JSON.stringify(["read", "bash", "edit"]) ? "✓ PASS" : "✗ FAIL"}\n`);

// Test 4: --exclude-tools with invalid tool
const result3 = filterTools(["read", "bash"], ["invalid", "write"]);
console.log("Test 3 - --exclude-tools with invalid tool:");
console.log(`  Input: ["read", "bash"]`);
console.log(`  Exclude: ["invalid", "write"]`);
console.log(`  Expected: ["read", "bash"]`);
console.log(`  Result: ${JSON.stringify(result3)}`);
console.log(`  ${JSON.stringify(result3) === JSON.stringify(["read", "bash"]) ? "✓ PASS" : "✗ FAIL"}\n`);

// Test 5: --exclude-tools with extension tool
const result4 = filterTools(["read", "bash", "ext_tool1"], ["ext_tool1"]);
console.log("Test 4 - --exclude-tools with extension tool:");
console.log(`  Input: ["read", "bash", "ext_tool1"]`);
console.log(`  Exclude: ["ext_tool1"]`);
console.log(`  Expected: ["read", "bash"]`);
console.log(`  Result: ${JSON.stringify(result4)}`);
console.log(`  ${JSON.stringify(result4) === JSON.stringify(["read", "bash"]) ? "✓ PASS" : "✗ FAIL"}\n`);

console.log("All tests completed!");
