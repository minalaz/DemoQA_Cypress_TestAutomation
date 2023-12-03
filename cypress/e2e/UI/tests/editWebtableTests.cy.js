/// <reference types="cypress" />
import { webtablePage } from "../pages/webtablePage.js";
import { registrationFormPage } from "../pages/registrationFormPage.js";

describe("Editing record in the table", () => {
  let userData;
  let invalidUserData;
  before("Reading fixture file", () => {
    cy.fixture("userData").then((data) => {
      userData = data;
    });
    cy.fixture("invalidUserData").then((data) => {
      invalidUserData = data;
    });
  });
  beforeEach("Visiting webpage", () => {
    cy.visit("https://demoqa.com/webtables");
  });
  afterEach("CleanUp", () => {
    cy.end();
  });
  it("Changing record data with all valid inputs", () => {
    cy.get(webtablePage.buttons.editFirstRecordButton)
      .scrollIntoView()
      .click({ force: true });
    registrationFormPage.clearingRegistrationForm();
    registrationFormPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.age,
      userData.salary,
      userData.department
    );
    cy.get(registrationFormPage.buttons.submitButton).click();
    //asert that edited record contains all specified data
    cy.get(webtablePage.labels.tableRows)
      .eq(0)
      .should("contain", userData.firstName)
      .and("contain", userData.lastName)
      .and("contain", userData.email)
      .and("contain", userData.age)
      .and("contain", userData.salary)
      .and("contain", userData.department);
  });
  it("Editing record without any entered data", () => {
    cy.get(webtablePage.buttons.editFirstRecordButton)
      .scrollIntoView()
      .click({ force: true });
    registrationFormPage.clearingRegistrationForm();
    cy.get(registrationFormPage.buttons.submitButton).click();
    //assert that the registration form is still opened so the record is not edited
    cy.get(registrationFormPage.labels.registrationFormModal).should(
      "be.visible"
    );
  });
  it("Editing record with invalid email", () => {
    cy.get(webtablePage.buttons.editFirstRecordButton)
      .scrollIntoView()
      .click({ force: true });
    registrationFormPage.clearingRegistrationForm();
    registrationFormPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      invalidUserData.email,
      userData.age,
      userData.salary,
      userData.department
    );
    cy.get(registrationFormPage.buttons.submitButton).click();
    //assert that the registration form is still opened so the record is not edited
    cy.get(registrationFormPage.labels.registrationFormModal).should(
      "be.visible"
    );
  });
});
