/// <reference types="Cypress" />

import { requestMethods } from "../methods/requestMethods";

describe("Bookstore Login", () => {
  let goodCredentials;
  let badCredentials;
  const loginURL = "https://demoqa.com/Account/v1/GenerateToken";
  before("Reading fixture file", () => {
    cy.fixture("goodCredentials").then((data) => {
      goodCredentials = data;
    });
    cy.fixture("badCredentials").then((data) => {
      badCredentials = data;
    });
  });
  afterEach("CleanUp", () => {
    cy.clearCookies();
  });

  it("Login with valid credentials", () => {
    requestMethods.postRequest(loginURL, goodCredentials).then((response) => {
      expect(response.status).to.be.eq(200); //assert that Status is "OK" (Status code: 200)
      expect(response.body).to.have.property("token"); //assert that token is visible in response body
    });
  });
  it("Login without credentials", () => {
    requestMethods.postRequest(loginURL, null).then((response) => {
      expect(response.status).to.be.eq(400); //assert that Status is "Not acceptable" (Status code: 400)
      expect(response)
        .property("body")
        .to.contain({ message: "UserName and Password required." }); //assert error message in response body
    });
  });
  it("Login with invalid credentials", () => {
    requestMethods.postRequest(loginURL, badCredentials).then((response) => {
      expect(response.status).to.be.eq(200); //assert that status code is "OK" (status code: 200)
      expect(response).property("body").to.deep.equal({
        token: null,
        expires: null,
        status: "Failed",
        result: "User authorization failed.", //assert that there is no token and it is not posible to authorize with invalid credentials
      });
    });
  });
});
