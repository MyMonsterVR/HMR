import Config from "../lib/config";
import HandlerRegistry from "./HandlerRegistry";
import chokidar from "chokidar";

export default class BaseRegistry {
    changeHandler(filePath: string) : void {}
}