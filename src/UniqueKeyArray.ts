
export default class UniqueKeyArray<T extends any> {
  protected items = new Map<string, T[]>();

  public add (key: string, value: T) {
    const { items } = this;
    const current = items.get(key) || [];
    items.set(key, current);
    !current.includes(value) && current.push(value);
    return {
      unregister: () => this.remove(key, value)
    };
  };

  public remove (key: string, value: T) {
    const { items } = this;
    const current = items.get(key);
    current && current.removeValue(value);
    current && current.length === 0 && items.delete(key);
  }

  public hasKey (key: string) {
    const { items } = this;
    return items.has(key);
  }

  public getValues (key: string): T[] {
    const { items } = this;
    const values = items.get(key);
    if (!values) {
      return [];
    }
    return values;
  }
}
