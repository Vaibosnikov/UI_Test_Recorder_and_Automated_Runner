import fs from "fs";
import path from "path";

export async function loadJSONFilesFromPath(directory) {
  const dir = path.resolve(directory);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

  return files.map((file) => {
    const filePath = path.join(dir, file);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  });
}
