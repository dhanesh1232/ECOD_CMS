export function generateRandomSlug() {
  const randomString = (length) => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  };

  const patterns = [
    // ecod-xxx-1234
    () => `ecod-${randomString(3)}-${Math.floor(1000 + Math.random() * 9000)}`,
    // xxx-ecod-1234
    () => `${randomString(3)}-ecod-${Math.floor(1000 + Math.random() * 9000)}`,
    // ecoxxx-xxd-1234
    () =>
      `eco${randomString(3)}-${randomString(2)}d-${Math.floor(
        1000 + Math.random() * 9000
      )}`,
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
}
