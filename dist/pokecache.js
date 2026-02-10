var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Cache_instances, _Cache_cache, _Cache_reapIntervalId, _Cache_interval, _Cache_reap, _Cache_startReapLoop;
export class Cache {
    constructor(interval) {
        _Cache_instances.add(this);
        _Cache_cache.set(this, new Map());
        _Cache_reapIntervalId.set(this, undefined);
        _Cache_interval.set(this, void 0);
        __classPrivateFieldSet(this, _Cache_interval, interval, "f");
        __classPrivateFieldGet(this, _Cache_instances, "m", _Cache_startReapLoop).call(this);
    }
    add(key, val) {
        __classPrivateFieldGet(this, _Cache_cache, "f").set(key, { createdAt: Date.now(), val });
    }
    get(key) {
        const entry = __classPrivateFieldGet(this, _Cache_cache, "f").get(key);
        if (!entry)
            return undefined;
        return entry.val;
    }
    stopReapLoop() {
        if (__classPrivateFieldGet(this, _Cache_reapIntervalId, "f"))
            clearInterval(__classPrivateFieldGet(this, _Cache_reapIntervalId, "f"));
        __classPrivateFieldSet(this, _Cache_reapIntervalId, undefined, "f");
    }
}
_Cache_cache = new WeakMap(), _Cache_reapIntervalId = new WeakMap(), _Cache_interval = new WeakMap(), _Cache_instances = new WeakSet(), _Cache_reap = function _Cache_reap() {
    const now = Date.now();
    for (const [key, entry] of __classPrivateFieldGet(this, _Cache_cache, "f")) {
        if (now - entry.createdAt > __classPrivateFieldGet(this, _Cache_interval, "f")) {
            __classPrivateFieldGet(this, _Cache_cache, "f").delete(key);
        }
    }
}, _Cache_startReapLoop = function _Cache_startReapLoop() {
    __classPrivateFieldSet(this, _Cache_reapIntervalId, setInterval(() => __classPrivateFieldGet(this, _Cache_instances, "m", _Cache_reap).call(this), __classPrivateFieldGet(this, _Cache_interval, "f")), "f");
};
