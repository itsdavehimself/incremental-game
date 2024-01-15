const generateRandomText = (text: string, revealCount: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=~`{}[]|:;"<>,.?/¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¿×÷';
  const revealedText = Array.from(text)
    .map((char, index) =>
      index < revealCount
        ? char
        : characters[Math.floor(Math.random() * characters.length)],
    )
    .join('');
  return revealedText;
};

export default generateRandomText;
