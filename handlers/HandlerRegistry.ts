import BaseRegistry from "./BaseRegistry";

export default class HandlerRegistry {
    registeredHandlers: Map<string, BaseRegistry> = new Map();

    addHandler(name: string, handler: BaseRegistry) {
        this.registeredHandlers.set(name, handler);
    }

    getHandlers() {
        return this.registeredHandlers;
    }

    getHandlerByName(name: string) {
        return this.registeredHandlers.get(name) || null;
    }
}