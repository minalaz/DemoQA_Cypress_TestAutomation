export const consts = {
  generateAddBookBody(userId, bookISBN) {
    const addBookBody = {
      userId: userId,
      collectionOfIsbns: [
        {
          isbn: bookISBN,
        },
      ],
    };
    return addBookBody;
  },
  generateAddTwoBooksBody(userId, bookISBN, bookISBN2) {
    const addTwoBooksBody = {
      userId: userId,
      collectionOfIsbns: [
        {
          isbn: bookISBN,
        },
        {
          isbn: bookISBN2,
        },
      ],
    };
    return addTwoBooksBody;
  },
  generateProfileUrl(userId) {
    const baseUrl = "https://demoqa.com/Account/v1/User";
    return `${baseUrl}/${userId}`;
  },
  generateDeleteBooksUrl(userId) {
    const deleteBooksUrl =
      "https://demoqa.com/BookStore/v1/Books?UserId=" + userId;
    return deleteBooksUrl;
  },
};
