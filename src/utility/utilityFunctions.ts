const formatData = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes.toFixed(0) + 'B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + 'KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024 * 1024)).toFixed(2) + 'TB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + 'PB';
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
    return (
      (bytes / (1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + 'EB'
    );
  } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
    return (
      (bytes / (1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) +
      'ZB'
    );
  } else {
    return (
      (bytes / (1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(
        2,
      ) + 'YB'
    );
  }
};

export { formatData };
