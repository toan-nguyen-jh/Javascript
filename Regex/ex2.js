function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

const passwordList = [
  "Secure123!",
  "P@ssw0rd!",
  "StrongPass1%",
  "Valid#Pass9",
  "A1b2C3d4@",
  "password1!",
  "PASSWORD1!",
  "Password!",
  "Passw1!",
  "12345678A@",
  "OnlylettersUPPER",
  "P@ssword",
  "123456789@",
];

passwordList.forEach((password) => {
  console.log(password, isValidPassword(password));
});
