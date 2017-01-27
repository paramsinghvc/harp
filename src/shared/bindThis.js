export default function bindThis(...args) {
    const [target, key, descriptor] = args;
    const { configurable, enumerable, writable } = descriptor;
    var fn = descriptor.value;
    return {
        configurable: true,
        get() {
            if (this === target.prototype || this.hasOwnProperty(key))
                return fn;

            var boundFn = fn.bind(this);
            Object.defineProperty(this, key, {
                configurable: true,
                get() {
                    return boundFn;
                }
            })
            return boundFn;
        }
    }
}