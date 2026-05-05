import * as fs from "node:fs";
import { JSON_URL } from "./constants/json-url.js";

export class FileManager {
  add<T>(task: T) {
    try {
      fs.writeFileSync(JSON_URL, JSON.stringify(task));
    } catch (err) {
      console.error(err);
    }
  }

  read<T>() {
    try {
      const data = fs.readFileSync(JSON_URL, "utf8");

      if (!data || data.trim() === "") {
        return [] as T[];
      }

      return JSON.parse(data) as T[];
    } catch (err) {
      console.error(err);
      return [] as T[];
    }
  }
}
