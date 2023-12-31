const formatData = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes.toFixed(0) + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KiB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MiB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GiB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024 * 1024)).toFixed(2) + ' TiB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + ' PiB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
    return (
      (bytes / (1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + ' EiB'
    );
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
    return (
      (bytes / (1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) +
      ' ZiB'
    );
  } else {
    return (
      (bytes / (1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(
        2,
      ) + ' YiB'
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
