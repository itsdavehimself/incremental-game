const formatData = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes.toFixed(0) + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024 * 1024)).toFixed(2) + ' TB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + ' PB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
    return (
      (bytes / (1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + ' EB'
    );
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
    return (
      (bytes / (1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) +
      ' ZB'
    );
  } else {
    return (
      (bytes / (1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(
        2,
      ) + ' YB'
    );
  }
};

const formatTimeElapsed = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const milliseconds = Math.floor(totalSeconds * 1000) % 1000;
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
