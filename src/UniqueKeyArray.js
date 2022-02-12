"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UniqueKeyArray {
    constructor() {
        this.items = new Map();
    }
    add(key, value) {
        const { items } = this;
        const current = items.get(key) || [];
        items.set(key, current);
        !current.includes(value) && current.push(value);
        return {
            unregister: () => this.remove(key, value)
        };
    }
    ;
    remove(key, value) {
        const { items } = this;
        const current = items.get(key);
        current && current.removeValue(value);
        current && current.length === 0 && items.delete(key);
    }
    hasKey(key) {
        const { items } = this;
        return items.has(key);
    }
    getValues(key) {
        const { items } = this;
        const values = items.get(key);
        if (!values) {
            return [];
        }
        return values;
    }
}
exports.default = UniqueKeyArray;
