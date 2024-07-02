export default function (
  length: number,
  includeUppercase: boolean = true,
  includeLowercase: boolean = true,
  includeNumbers: boolean = true,
  includeSymbols: boolean = true
): string {
  let password = "";
  
  if (length <= 0) {
    return "Length must be greater than 0.";
  }

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  let allChars = "";
  if (includeUppercase) {
    allChars += uppercaseChars;
  }
  if (includeLowercase) {
    allChars += lowercaseChars;
  }
  if (includeNumbers) {
    allChars += numberChars;
  }
  if (includeSymbols) {
    allChars += symbolChars;
  }

  if (allChars === "") {
    return "No character types selected. Please select at least one character type.";
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password
}