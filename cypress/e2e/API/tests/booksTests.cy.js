/// <reference types="Cypress" />
import { generateUserCredentials } from "../methods/generateUserCredentials.js";
import { requestMethods } from "../methods/requestMethods.js";
import { consts } from "../methods/consts.js";

const registerUrl = "https://demoqa.com/Account/v1/User";
const loginUrl = "https://demoqa.com/Account/v1/GenerateToken";
const addBookUrl = "https://demoqa.com/BookStore/v1/Books";

const userData = generateUserCredentials.randomizedGoodCredentials();
const bookISBN = "9781449325862";
const bookISBN2 = "9781449331818";

describe("Bookstore - managing books ", () => {
  let userId;
  let token;
  let originalUserData = userData;

  beforeEach("Register and login user", () => {
    requestMethods.postRequest(registerUrl, userData).then((response) => {
      expect(response.status).to.eq(201); // assert that Status is "Created" (Status code = 201)
      userId = response.body.userID;
      console.log(originalUserData);
      requestMethods
        .postRequest(loginUrl, originalUserData)
        .then((tokenResponse) => {
          expect(tokenResponse.status).to.be.eq(200); // assert that Status is "OK" (Status code = 200)
          expect(tokenResponse.body).to.have.property("token"); // assert that token is visible in the response body
          token = tokenResponse.body.token;
        });
    });
  });
  afterEach("Delete user", () => {
    requestMethods.deleteRequest(registerUrl + "/" + userId, token);
    cy.clearCookies();
  });
  it("Add a book, get it and assert it", () => {
    requestMethods
      .postRequestWithAuthorization(
        addBookUrl,
        consts.generateAddBookBody(userId, bookISBN),
        token
      )
      .then((addBookResponse) => {
        expect(addBookResponse.status).to.eq(201); //assert tha Status is "Created" (Status code =2 01)
      });
    requestMethods
      .getRequest(consts.generateProfileUrl(userId), token)
      .then((profileResponse) => {
        expect(profileResponse.status).to.eq(200);
        const books = profileResponse.body.books;
        expect(books.some((book) => book.title === "Git Pocket Guide")).to.be //assert that the book is visible in response body
          .true;
      });
  });

  it("Add book without Authorization", () => {
    requestMethods
      .postRequest(addBookUrl, consts.generateAddBookBody(userId, bookISBN))
      .then((addBookResponse) => {
        expect(addBookResponse.status).to.eq(401); //assert that Status is "Unauthorized" (Status code = 401)
        expect(addBookResponse)
          .property("body")
          .to.contain({ message: "User not authorized!" }); //assert error message in response body
      });
  });
  it("Add two books to user's profile", () => {
    requestMethods
      .postRequestWithAuthorization(
        addBookUrl,
        consts.generateAddTwoBooksBody(userId, bookISBN, bookISBN2),
        token
      )
      .then((addTwoBooksResponse) => {
        expect(addTwoBooksResponse.status).to.eq(201); //assert Status  is "Created" ( Status code = 201)
        expect(addTwoBooksResponse)
          .property("body")
          .to.deep.equal({
            books: [
              {
                isbn: "9781449325862",
              },
              {
                isbn: "9781449331818",
              },
            ],
          });
      });
  });
  it("Delete all books with Authorization", () => {
    requestMethods.postRequestWithAuthorization(
      addBookUrl,
      consts.generateAddTwoBooksBody(userId, bookISBN, bookISBN2),
      token
    );
    requestMethods
      .deleteRequest(consts.generateDeleteBooksUrl(userId), token)
      .then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(204); //assert that Status is "No content" ( Status code = 204)
      });
  });

  it("Delete all books without Authorization", () => {
    requestMethods
      .deleteRequestWithoutAuthorization(consts.generateDeleteBooksUrl(userId))
      .then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(401); //assert that Status is "Unauthorized" (Status code = 401)
        expect(deleteResponse)
          .property("body")
          .to.contain({ message: "User not authorized!" }); //assert error message in response body
      });
  });
  it("Delete all books with wrong Url", () => {
    requestMethods.postRequestWithAuthorization(
      addBookUrl,
      consts.generateAddTwoBooksBody(userId, bookISBN, bookISBN2),
      token
    );
    requestMethods.deleteRequest(addBookUrl, token).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(401); //assert that Status is "Unauthorized" (Status code = 401)
      expect(deleteResponse)
        .property("body")
        .to.contain({ message: "User Id not correct!" }); //assert error message
    });
  });
});
