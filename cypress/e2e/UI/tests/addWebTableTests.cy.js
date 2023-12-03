/// <reference types="cypress" />
import { webtablePage } from "../pages/webtablePage";
import { registrationFormPage } from "../pages/registrationFormPage";
import { randomizingData } from "../pages/randomizingData";

describe("Testing Add Record in WebTables", () => {
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
  it("Add new record with valid credentials", () => {
    cy.get(webtablePage.buttons.addButton).click();
    registrationFormPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.age,
      userData.salary,
      userData.department
    );

    cy.get(registrationFormPage.buttons.submitButton).click();
    //assert that new record contains specified data
    cy.get(webtablePage.labels.tableRows)
      .eq(3)
      .should("contain", userData.firstName)
      .and("contain", userData.lastName)
      .and("contain", userData.email)
      .and("contain", userData.age)
      .and("contain", userData.salary)
      .and("contain", userData.department);
  });
  it("Add new record without any data", () => {
    cy.get(webtablePage.buttons.addButton).click();
    cy.get(registrationFormPage.buttons.submitButton).click();
    //assert that after submitting empty form, form is still opened
    cy.get(registrationFormPage.labels.registrationFormModal).should(
      "be.visible"
    );
    cy.get(registrationFormPage.buttons.closeButton).click();
    //assert that there is no new row with values
    cy.get(webtablePage.labels.tableRows).eq(3).should("not.contain.value");
  });
  it("Add new record with invalid email", () => {
    cy.get(webtablePage.buttons.addButton).click();
    registrationFormPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      invalidUserData.email,
      userData.age,
      userData.salary,
      userData.department
    );
    cy.get(registrationFormPage.buttons.submitButton).click();
    //assert that after submitting invalid data, form is still opened
    cy.get(registrationFormPage.labels.registrationFormModal).should(
      "be.visible"
    );
    cy.get(registrationFormPage.buttons.closeButton).click();
    //assert that there is no new row with values
    cy.get(webtablePage.labels.tableRows).eq(3).should("not.contain.value");
  });
  it("Add new record with invalid age", () => {
    cy.get(webtablePage.buttons.addButton).click();
    registrationFormPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      userData.email,
      invalidUserData.age,
      userData.salary,
      userData.department
    );
    cy.get(registrationFormPage.buttons.submitButton).click();
    //assert that after submitting invalid data, form is still opened
    cy.get(registrationFormPage.labels.registrationFormModal).should(
      "be.visible"
    );
    cy.get(registrationFormPage.buttons.closeButton).click();
    //assert that there is no new row with values
    cy.get(webtablePage.labels.tableRows).eq(3).should("not.contain.value");
  });
  it("Add new record with invalid salary", () => {
    cy.get(webtablePage.buttons.addButton).click();
    registrationFormPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.age,
      invalidUserData.salary,
      userData.department
    );
    cy.get(registrationFormPage.buttons.submitButton).click();
    //assert that after submitting invalid data, form is still opened
    cy.get(registrationFormPage.labels.registrationFormModal).should(
      "be.visible"
    );
    cy.get(registrationFormPage.buttons.closeButton).click();
    //assert that there is no new row with values
    cy.get(webtablePage.labels.tableRows).eq(3).should("not.contain.value");
  });
  it("Add new record with three randomized valid inputs", () => {
    cy.get(webtablePage.buttons.addButton).click();
    cy.get(registrationFormPage.labels.firstNameField).type(
      randomizingData.generateRandomString(5)
    );
    cy.get(registrationFormPage.labels.emailField).type(
      randomizingData.randomizeEmail("example.com")
    );
    cy.get(registrationFormPage.labels.ageField).type(
      randomizingData.randomizeNumber(2)
    );
    cy.get(registrationFormPage.buttons.closeButton).click();
    //assert that there is no new row with values
    cy.get(webtablePage.labels.tableRows).eq(3).should("not.contain.value");
  });
});
