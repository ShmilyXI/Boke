const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(fn) {
  let self = this;
  self.value = null;
  self.error = null;
  self.status = PENDING;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.status === PENDING) {
      setTimeout(function () {
        self.status = FULFILLED;
        self.value = value;
        self.onFulfilledCallbacks.forEach((callback) => callback(self.value));
      });
    }
  }

  function reject(error) {
    if (self.status === PENDING) {
      setTimeout(function () {
        self.status = REJECTED;
        self.error = error;
        self.onRejectedCallbacks.forEach((callback) => callback(self.error));
      });
    }
  }
  fn(resolve, reject);
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === PENDING) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value);
  } else if (this.status === REJECTED) {
    onRejected(this.error);
  }
  return this;
};


module.exports = MyPromise;
