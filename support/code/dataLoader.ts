import * as fs from "fs";
import * as path from "path";

class TestDataLoader {
    private relativeDataPath: string;
    public assets: { [k: string]: any } = {};

    constructor(env: string, fileList?: string[]) {
        this.setLoadEnvironment(env);

        if (fileList.length > 0) {
            for (const fileName in fileList) {
                this.loadFile(fileList[fileName]);
            }
        }
    }

    setLoadEnvironment(environment: string): void {
        this.relativeDataPath = `/data/${environment}`;
    }

    loadFile(fileName: string) {
        let fullFileName: string = undefined;

        if (!fileName.includes(".json")) {
            fullFileName = `${fileName}.json`;
        } else {
            fullFileName = fileName;
            fileName = fileName.substring(0, fileName.indexOf(".json"));
        }

        const fileDescriptor = fs.openSync(path.join(process.cwd(), this.relativeDataPath, fullFileName), 'r');
        let contents = JSON.parse(fs.readFileSync(fileDescriptor, { encoding: 'utf8'}));
        this.assets[fileName] = contents;
    }
}

export { TestDataLoader };