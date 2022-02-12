export default class UniqueKeyArray<T extends any> {
    protected items: Map<string, T[]>;
    add(key: string, value: T): {
        unregister: () => void;
    };
    remove(key: string, value: T): void;
    hasKey(key: string): boolean;
    getValues(key: string): T[];
}
