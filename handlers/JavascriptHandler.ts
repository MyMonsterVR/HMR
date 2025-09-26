import Config from "../lib/config";
import BaseRegistry from "./BaseRegistry";
import HandlerRegistry from "./HandlerRegistry";

export default class JavascriptHandler implements BaseRegistry {
    constructor(private config: Config, handler: HandlerRegistry) {
        this.config = config
        handler.addHandler('javascript', this)
    }

    changeHandler(filePath: string): void {
        throw new Error("Method not implemented.");
    }

    fileChange(filePath: string) {

    }
}