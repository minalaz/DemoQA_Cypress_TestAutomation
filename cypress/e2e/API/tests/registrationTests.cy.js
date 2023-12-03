/// <reference types="Cypress" />

import { generateUserCredentials } from "../methods/generateUserCredentials.js";
import { requestMethods } from "../methods/requestMethods.js";

describe("Bookstore Registration", () => {
  const registerUrl = "https://demoqa.com/Account/v1/User";

  before("Register User", () => {
    requestMethods.postRequest(
      registerUrl,
      generateUserCredentials.alreadyRegisteredUserCredentials()
    );
  });

  afterEach("CleanUp", () => {
    cy.clearCookies();
  });

  it("Register user with valid credentials", () => {
    requestMethods
      .postRequest(
        registerUrl,
        generateUserCredentials.randomizedGoodCredentials()
      )
      .then((response) => {
        expect(response.status).to.eq(201); //assert that the user is succesfuly created (status code: 201)
      });
  });
  it("Register user with invalid credentials", () => {
    requestMethods
      .postRequest(registerUrl, generateUserCredentials.badCredentials())
      .then((response) => {
        expect(response.status).to.eq(400); //assert that this is "Bad request" (status code: 400)
        expect(response).property("body").to.contain({
          message:
            "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
        }); //assert error message is visible in response body
      });
  });
  it("Register user without any data", () => {
    requestMethods.postRequest(registerUrl, null).then((response) => {
      expect(response.status).to.eq(400); //assert that this is bad request ( status code: 400)
      expect(response)
        .property("body")
        .to.contain({ message: "UserName and Password required." }); //assert error message in response body
    });
  });
  it("Register user with allreadyRegisteredUserData", () => {
    requestMethods
      .postRequest(
        registerUrl,
        generateUserCredentials.alreadyRegisteredUserCredentials()
      )
      .then((response) => {
        expect(response.status).to.eq(406); //assert that Status is "Not acceptable" (Status code: 406)
        expect(response)
          .property("body")
          .to.contain({ message: "User exists!" }); //assert error message in response body
      });
  });
});
