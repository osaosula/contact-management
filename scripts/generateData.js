// generateData.js (ES Module Version - Ensure this is the ONLY content in your NEW file)

// Import modules using ES module syntax
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Built-in Node.js module for ES modules

// --- CRITICAL SECTION: Define __filename and __dirname for ES Modules ---
// These lines are essential because __dirname is not directly available in ES modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- END CRITICAL SECTION ---

const NUM_RECORDS = 700;
const OUTPUT_FILE_NAME = "fictitious_contacts.csv";

function generateFictitiousData(count) {
  const data = [];
  // Add CSV header
  data.push("name,email"); // CSV header row

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const email = faker.internet
      .email({ firstName: firstName, lastName: lastName })
      .toLowerCase();

    // Ensure no commas within fields if you're not quoting them (simpler CSV)
    const cleanName = name.replace(/,/g, "");
    const cleanEmail = email.replace(/,/g, "");

    data.push(`${cleanName},${cleanEmail}`);
  }
  return data.join("\n"); // Join rows with a newline character
}

const csvData = generateFictitiousData(NUM_RECORDS);
const outputPath = path.join(__dirname, OUTPUT_FILE_NAME);

// Write the CSV data to a file
fs.writeFileSync(outputPath, csvData, "utf8");

console.log(
  `Successfully generated ${NUM_RECORDS} fictitious contacts to ${outputPath}`
);
