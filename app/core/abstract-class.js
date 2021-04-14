class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) {
      throw new TypeError(
        "Cannot construct " +
          this.constructor.name +
          " class instances directly"
      );
    }

    let exceptions = {};
    let currProto = this;

    while (currProto.constructor !== AbstractClass) {
      // checks for abstract methods.
      for (let method of currProto.constructor.abstractMethods || []) {
        if (typeof this[method] !== "function")
          exceptions[method] = currProto.constructor.name;
      }
      currProto = Object.getPrototypeOf(currProto);
    }

    if (Object.keys(exceptions).length !== 0) {
      let exceptionsArray = [];
      for (let method in exceptions) {
        exceptionsArray.push(exceptions[method] + "." + method);
      }
      exceptionsArray.sort();
      throw new TypeError(
        "Must override the following: " + exceptionsArray.join(", ")
      );
    }
  }
}