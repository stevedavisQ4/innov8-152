import path from "path";
import fs from "fs";

export class FileUtils {

    public static readFiles(dirname): Record<string, string> {
        const prompts: Record<string, string> = {};

        const filenames = fs.readdirSync(dirname);
      
        for (const filename of filenames) {
          const fileNamePath = dirname + filename;
          const content = fs.readFileSync(fileNamePath, 'utf-8')
          const fileNameWithoutExtension = path.parse(filename).name;
          prompts[fileNameWithoutExtension] = content;
        }

        return prompts;
    }

    public static createSource(dir: string, fileName: string, content: string): void {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      
        fs.writeFileSync(`${dir}/${fileName}`, content);
      
        console.log(`Finished writing for ${dir}`);
    }
}