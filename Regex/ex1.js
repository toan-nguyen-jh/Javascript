function isValidEmail(email) {
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return emailRegex.test(email);
}

const emailList = [
  "toannq12122003@gmail.com",
  "a_toan@g.c",
  "a_toan@gmail.com",
  "a_toan@g.c",
  ".123toan12@gmail.com",
  "123toannq@gmail.com",
  "tweu2y327+@gmail.com",
];

emailList.forEach((email) => {
  console.log(email, isValidEmail(email));
});
