
function Stack() {
  let items = [];
  this.get = () => items;

  this.set = ele => {
    items = ele;
    return items;
  }

  this.peek = () => items[items.length - 1]

  this.push = (ele) => {
    items.push(ele)
  };

  this.pop = () => items.pop()

  this.size = () => items.length();

  this.isEmpty = () => items.length === 0;

  this.print = () => console.log('items :>> ', items.toString());
}

function decimalToBinary(decNumber, base) {
  const remStack = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decNumber;
  let rem;
  let baseString = '';
  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}

function parenthesesChecker(symbols) {
  const stack = new Stack();
  const open = '({[';
  const close = ')}]';
  let balanced = true;
  let index = 0;
  let symbol;
  let top;
  while (index < symbols.length && balanced) {
    symbol = symbols.charAt(index);
    if (open.indexOf(symbol) >= 0) {
      stack.push(symbol)
    } else if (stack.isEmpty()) {
      balanced = false;
    } else {
      top = stack.pop();
      if (!(open.indexOf(top) === close.indexOf(symbol))) {
        balanced = false;
      }
    }
    index++;
  }
  if (stack.isEmpty() && balanced) {
    return true;
  } else {
    return false;
  }
}
const a = parenthesesChecker("{{(())}}")
const b = parenthesesChecker("{{([})}}")
console.log('a', a)
console.log('b', b)