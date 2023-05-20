export function Iterator(arr = [], cb = async (arg: Object) => {}) {
  let lastIndex = 0;
  return async function () {
    if (lastIndex < arr.length) {
      lastIndex++;
      console.log("call back util", cb);
      await cb({
        value: arr[lastIndex - 1],
        index: lastIndex - 1,
        done: false,
      });
      return { value: arr[lastIndex - 1], done: false };
    } else {
      await cb({ value: null, done: true });
      return { value: null, done: true };
    }
  };
}
