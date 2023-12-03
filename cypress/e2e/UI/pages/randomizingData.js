export const randomizingData = {
  generateRandomString(length) {
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";

    for (var i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  },

  randomizeNumber(length) {
    let min = Math.pow(10, length - 1); // Minimum value based on length
    let max = Math.pow(10, length) - 1; // Maximum value based on length

    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random number within the range

    return randomNumber;
  },
  randomizeEmail(domain) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const emailLength = Math.floor(Math.random() * 10) + 5; // Random length between 5 and 14 characters

    let email = "";
    for (let i = 0; i < emailLength; i++) {
      email += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return email + "@" + domain;
  },
};
