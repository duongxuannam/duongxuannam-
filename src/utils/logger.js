class Logger {
  static log(...params) {
    console.log(...params);
  }

  static warn(...params) {
    console.warn(...params);
  }

  static error(...params) {
    console.error(...params);
  }
}

export default Logger;
