const BYTES_PER_KB = Math.pow(1024, 2);
const BYTES_PER_MB = Math.pow(1024, 3);
const BYTES_PER_GB = Math.pow(1024, 4);
const BYTES_PER_TB = Math.pow(1024, 5);
const BYTES_PER_PB = Math.pow(1024, 6);
const BYTES_PER_EB = Math.pow(1024, 7);
const BYTES_PER_ZB = Math.pow(1024, 8);
const BYTES_PER_YB = Math.pow(1024, 9);
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_SECOND = 1000;

const formatData = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes.toFixed(0) + ' B';
  } else if (bytes < BYTES_PER_KB) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < BYTES_PER_MB) {
    return (bytes / BYTES_PER_KB).toFixed(2) + ' MB';
  } else if (bytes < BYTES_PER_GB) {
    return (bytes / BYTES_PER_MB).toFixed(2) + ' GB';
  } else if (bytes < BYTES_PER_TB) {
    return (bytes / BYTES_PER_GB).toFixed(2) + ' TB';
  } else if (bytes < BYTES_PER_PB) {
    return (bytes / BYTES_PER_TB).toFixed(2) + ' PB';
  } else if (bytes < BYTES_PER_EB) {
    return (bytes / BYTES_PER_PB).toFixed(2) + ' EB';
  } else if (bytes < BYTES_PER_ZB) {
    return (bytes / BYTES_PER_EB).toFixed(2) + ' ZB';
  } else {
    return (bytes / BYTES_PER_YB).toFixed(2) + ' YB';
  }
};

const formatTimeElapsed = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
  );
  const seconds = Math.floor(totalSeconds % SECONDS_PER_MINUTE);

  const milliseconds =
    Math.floor(totalSeconds * MILLISECONDS_PER_SECOND) %
    MILLISECONDS_PER_SECOND;
  const formattedMilliseconds = milliseconds
    .toString()
    .padStart(3, '0')
    .slice(0, -1);

  const formattedTime = `${hours < 10 ? '00' : ''}:${
    minutes < 10 ? '0' : ''
  }${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${formattedMilliseconds}`;

  return formattedTime;
};

export { formatData, formatTimeElapsed };
