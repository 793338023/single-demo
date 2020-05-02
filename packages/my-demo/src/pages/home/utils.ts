export class Stack {
  next: any = null;
  fn: Function | any = null;
  constructor(fn: Function) {
    this.fn = fn;
  }
  setNextStack = (stack: any) => {
    this.next = stack;
  };
  passRequest = (...args: any[]) => {
    const [status, ret] = this.fn(...args);
    if (typeof status === "boolean" && status) {
      if (this.next) {
        if (Array.isArray(ret)) {
          this.next.passRequest(...ret);
        } else {
          this.next.passRequest(ret);
        }
      }
    }
    return ret;
  };
}

function coupon100(pay: number, num: number) {
  if (pay * num > 100) {
    console.log(`已经优惠了100，实付${pay * num - 100}`);
    return [false, `已经优惠了100，实付${pay * num - 100}`];
  } else {
    return [true, [pay, num]];
  }
}

function coupon50(pay: number, num: number) {
  if (pay * num > 50) {
    console.log(`已经优惠了50，实付${pay * num - 50}`);
    return [false, `已经优惠了50，实付${pay * num - 50}`];
  } else {
    return [true, [pay, num]];
  }
}

function coupon200(pay: number, num: number) {
  if (pay * num > 200) {
    console.log(`已经优惠了200，实付${pay * num - 200}`);
    return [false, `已经优惠了200，实付${pay * num - 200}`];
  } else {
    return [true, [pay, num]];
  }
}

const stack200 = new Stack(coupon200);
const stack100 = new Stack(coupon100);
const stack50 = new Stack(coupon50);

stack200.setNextStack(stack100);
stack100.setNextStack(stack50);

stack200.passRequest(43, 2);
