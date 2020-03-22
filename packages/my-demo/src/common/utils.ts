export function generateUUID() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

// 发布订阅
interface TEvent {
  clientList: { [key: string]: Function[] };
  on: (key: string, fn: (...args: any[]) => void) => void;
  delete: (key: string, fn: (...args: any[]) => void) => void;
  emit: (type: string, args: any[]) => void;
}
export let event: TEvent = {
  clientList: {},
  on(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
  },
  emit(type, args) {
    let fns = this.clientList[type];
    if (!fns || fns.length === 0) {
      // 如果没有绑定对应的消息
      return false;
    }
    fns.forEach(fn => {
      fn.apply(this, [...args]);
    });
  },
  delete(key, fn) {
    if (!this.clientList[key]) {
      return false;
    }
    this.clientList[key] = this.clientList[key].filter(item => {
      return item !== fn;
    });
  }
};

export const req = (...args: any[]) => {
  setTimeout(() => {
    event.emit("axios", args);
  }, 2000);
};
