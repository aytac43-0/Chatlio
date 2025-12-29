export function isEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function passwordStrength(password: string) {
  const length = password.length;
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const score = [length >= 8, hasNumber, hasUpper, hasLower].filter(Boolean).length;
  return {
    score,
    valid: score >= 3 && length >= 8
  };
}
