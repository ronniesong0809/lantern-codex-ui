type LogListener = (message: string) => void;
const listeners: LogListener[] = [];

export const addLogListener = (listener: LogListener) => {
  listeners.push(listener);
};

export const removeLogListener = (listener: LogListener) => {
  const index = listeners.indexOf(listener);
  if (index > -1) {
    listeners.splice(index, 1);
  }
};

export const addLog = (message: string) => {
  listeners.forEach(listener => listener(message));
}; 