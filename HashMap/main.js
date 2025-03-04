class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity * this.loadFactor)
      .fill(null)
      .map(() => []);
    this.length = 0;
  }

  resize() {
    this.capacity *= 2;
    const newBuckets = new Array(this.capacity * this.loadFactor)
      .fill(null)
      .map(() => []);
    for (const bucket of this.buckets) {
      for (const { key, value } of bucket) {
        const newHash = this.hash(key);
        newBuckets[newHash].push({ key, value });
      }
    }
    this.buckets = newBuckets;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) %
        Math.floor(this.loadFactor * this.capacity);
    }
    return hashCode;
  }

  bucket(key) {
    const hash = this.hash(key);
    return this.buckets[hash];
  }

  entry(bucket, key) {
    for (const el of bucket) {
      if (el.key === key) {
        return el;
      }
    }
    return null;
  }

  set(key, value) {
    const bucket = this.bucket(key);
    const el = this.entry(bucket, key);
    if (el) {
      el.value = value;
      return;
    }
    bucket.push({ key, value });
    this.length++;

    if (this.length >= this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const bucket = this.bucket(key);
    const el = this.entry(bucket, key);
    if (el) {
      return el.value;
    }
    return null;
  }

  has(key) {
    const bucket = this.bucket(key);
    const el = this.entry(bucket, key);
    if (el) {
      return true;
    }
    return false;
  }

  remove(key) {
    let bucket = this.bucket(key);
    const el = this.entry(bucket, key);
    if (el) {
      bucket.forEach((item, index, arr) => {
        if (item.key === key) {
          arr.splice(index, 1);
        }
      });
      this.length--;
      return true;
    }
    return false;
  }

  getLength() {
    return this.length;
  }

  clear() {
    this.capacity = 16;
    this.buckets = createBuckets(this.capacity * this.loadFactor);
    this.length = 0;
  }

  keys() {
    const keys = [
      ...this.buckets.flatMap((bucket) => bucket.map((el) => el.key)),
    ];
    return keys;
  }

  values() {
    const values = [
      ...this.buckets.flatMap((bucket) => bucket.map((el) => el.value)),
    ];
    return values;
  }

  entries() {
    const entries = [
      ...this.buckets.flatMap((bucket) =>
        bucket.map(({ key, value }) => [key, value])
      ),
    ];
    return entries;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");

console.log(test.entries());
console.log(test.keys());
console.log(test.values());

console.log(test.getLength());

console.log(test.remove("dog"));

console.log(test.getLength());

console.log(test.entries());

console.log("has", test.has("frog"));

console.log("get", test.get("carrot"));

console.log(test.entries());

console.log(test.getLength());
