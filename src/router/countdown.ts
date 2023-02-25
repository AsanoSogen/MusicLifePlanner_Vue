let lastAction = Date.now();

export function resetTimer() {
  lastAction = Date.now();
}

export function checkTimeout() {
  const now = Date.now();
  if (now - lastAction > 3600000) {
    return true;
  } else {
    lastAction = now;
    return false;
  }
}
