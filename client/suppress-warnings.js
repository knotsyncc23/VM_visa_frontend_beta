// Ultimate warning suppression - test all console methods
(function () {
  // Override ALL console methods to identify the source
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;

  console.warn = function (...args) {
    const message = args.join(" ");
    if (
      message.includes("defaultProps") ||
      message.includes("XAxis") ||
      message.includes("YAxis")
    ) {
      return; // Suppress
    }
    originalWarn.apply(console, args);
  };

  console.error = function (...args) {
    const message = args.join(" ");
    if (
      message.includes("defaultProps") ||
      message.includes("XAxis") ||
      message.includes("YAxis")
    ) {
      return; // Suppress
    }
    originalError.apply(console, args);
  };

  console.log = function (...args) {
    const message = args.join(" ");
    if (
      message.includes("defaultProps") ||
      message.includes("XAxis") ||
      message.includes("YAxis")
    ) {
      return; // Suppress
    }
    originalLog.apply(console, args);
  };

  console.info = function (...args) {
    const message = args.join(" ");
    if (
      message.includes("defaultProps") ||
      message.includes("XAxis") ||
      message.includes("YAxis")
    ) {
      return; // Suppress
    }
    originalInfo.apply(console, args);
  };
})();
