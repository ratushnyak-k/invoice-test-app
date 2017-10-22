const Logger = {
  log(...args) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(...args)
    }
  },
  info(...args) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(...args)
    }
  },
  warn(...args) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(...args)
    }
  },
  error(...args) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(...args)
    }
  },
}


export default Logger
