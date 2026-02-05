// Word bank for string generation (lorem ipsum style)
const words = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum"
];

/**
 * Generate an array of random integers
 * @param {number} count - Number of integers to generate
 * @param {number} min - Minimum value (default: -1000)
 * @param {number} max - Maximum value (default: 1000)
 * @returns {number[]}
 */
export function generateInts(count, min = -1000, max = 1000) {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

/**
 * Generate an array of random floats with 2 decimal places
 * @param {number} count - Number of floats to generate
 * @param {number} min - Minimum value (default: -1000)
 * @param {number} max - Maximum value (default: 1000)
 * @returns {number[]}
 */
export function generateFloats(count, min = -1000, max = 1000) {
  return Array.from({ length: count }, () =>
    parseFloat((Math.random() * (max - min) + min).toFixed(2))
  );
}

/**
 * Generate an array of random doubles with 6 decimal places
 * @param {number} count - Number of doubles to generate
 * @param {number} min - Minimum value (default: -1000)
 * @param {number} max - Maximum value (default: 1000)
 * @returns {number[]}
 */
export function generateDoubles(count, min = -1000, max = 1000) {
  return Array.from({ length: count }, () =>
    parseFloat((Math.random() * (max - min) + min).toFixed(6))
  );
}

/**
 * Generate an array of random words
 * @param {number} count - Number of strings to generate
 * @returns {string[]}
 */
export function generateStrings(count) {
  return Array.from({ length: count }, () =>
    words[Math.floor(Math.random() * words.length)]
  );
}

/**
 * Generate an array of random booleans
 * @param {number} count - Number of booleans to generate
 * @returns {boolean[]}
 */
export function generateBools(count) {
  return Array.from({ length: count }, () => Math.random() < 0.5);
}

/**
 * Format array output for display
 * @param {any[]} arr - The array to format
 * @param {string} type - The data type
 * @returns {string}
 */
export function formatOutput(arr, type) {
  if (type === "string") {
    return `[${arr.map(s => `"${s}"`).join(", ")}]`;
  }
  return `[${arr.join(", ")}]`;
}

/**
 * Generate code snippet for different languages
 * @param {any[]} arr - The array data
 * @param {string} type - The data type
 * @param {string} language - The programming language
 * @returns {string}
 */
export function generateCodeSnippet(arr, type, language) {
  const typeMap = {
    javascript: { int: "", float: "", double: "", string: "", bool: "" },
    python: { int: "", float: "", double: "", string: "", bool: "" },
    java: { int: "int", float: "float", double: "double", string: "String", bool: "boolean" },
    csharp: { int: "int", float: "float", double: "double", string: "string", bool: "bool" },
    cpp: { int: "int", float: "float", double: "double", string: "std::string", bool: "bool" },
  };

  const formattedValues = type === "string" 
    ? arr.map(s => `"${s}"`).join(", ")
    : arr.join(type === "float" ? "f, " : ", ") + (type === "float" && language !== "javascript" && language !== "python" ? "f" : "");

  switch (language) {
    case "javascript":
      return `const arr = [${formattedValues}];`;
    case "python":
      return `arr = [${formattedValues}]`;
    case "java":
      return `${typeMap.java[type]}[] arr = {${formattedValues}};`;
    case "csharp":
      return `${typeMap.csharp[type]}[] arr = {${formattedValues}};`;
    case "cpp":
      return `${typeMap.cpp[type]} arr[] = {${formattedValues}};`;
    default:
      return `[${formattedValues}]`;
  }
}
