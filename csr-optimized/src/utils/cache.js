export function saveToCache(key, data, ttl) {
    const wrapped = {
        data,
        timestamp: Date.now(),
        ttl
    };
    localStorage.setItem(key, JSON.stringify(wrapped));
}

export function loadFromCache(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.timestamp > parsed.ttl) {
            localStorage.removeItem(key);
            return null;
        }
        return parsed.data;
    } catch {
        return null;
    }
}