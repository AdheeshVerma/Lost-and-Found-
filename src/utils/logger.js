import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logFilePath = process.env.LOG_FILE || null;
let fileStream = null;
if (logFilePath) {
  const dir = dirname(logFilePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  fileStream = createWriteStream(logFilePath, { flags: 'a' });
}

function formatMessage(level, message) {
  const timestamp = new Date().toISOString();
  return `${timestamp} [${level}] ${message}`;
}

function write(level, message) {
  const formatted = formatMessage(level, message);
  console.log(formatted);
  if (fileStream) {
    fileStream.write(formatted + '\n');
  }
}

const logger = {
  info: (msg) => write('INFO', msg),
  warn: (msg) => write('WARN', msg),
  error: (msg) => write('ERROR', msg),
  debug: (msg) => {
    if (process.env.NODE_ENV !== 'production') {
      write('DEBUG', msg);
    }
  },
  log: (msg) => write('LOG', msg),
};

export default logger;
