/// <reference types="cypress" />
import { webtablePage } from "../pages/webtablePage";
import { registrationFormPage } from "../pages/registrationFormPage";

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
    cy.get(webtablePage.buttons.addButton).click();
  });
  afterEach("CleanUp", () => {
    cy.end();
  });
  it("Add new record with valid credentials", () => {
    registrationFormPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.age,
      userData.salary,
      userData.department
    );
    //assert that all values are entered into registration form
    registrationFormPage.assertDataIsEntered(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.age,
      userData.salary,
      userData.department
    );
    cy.get(registrationFormPage.buttons.submitButton).click();
    //assert that after submitting registration form webtable page is opened
    cy.url().should("include", "/webtables");

    //assert that new record in webtable contains specified data
    webtablePage.assertNewTableRowContainsEnteredData(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.age,
      userData.salary,
      userData.department
    );
  });
  it("Add new record without any data", () => {
    cy.get(registrationFormPage.buttons.submitButton).click();
    //assert that after submitting empty form, form is still opened

    cy.get(registrationFormPage.labels.registrationFormModal).should(
      "be.visible"
    );
    //closing rregistration form to check webtable
    cy.get(registrationFormPage.buttons.closeButton).click();
    //assert that the webtables page is opened
    cy.url().should("include", "/webtables");
    //assert that there is no new row with values
    cy.get(webtablePage.labels.tableRows).eq(3).should("not.contain.value");
  });
  it("Add new record with invalid email", () => {
    registrationFormPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      invalidUserData.email,
      userData.age,
      userData.salary,
      userData.department
    );
    registrationFormPage.assertDataIsEntered(
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
    //closing rregistration form to check webtable
    cy.get(registrationFormPage.buttons.closeButton).click();
    //assert that the webtables page is opened
    cy.url().should("include", "/webtables");
    //assert that there is no new row with values
    cy.get(webtablePage.labels.tableRows).eq(3).should("not.contain.value");
  });
  it("Add new record with invalid age", () => {
    registrationFormPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      userData.email,
      invalidUserData.age,
      userData.salary,
      userData.department
    );
    //assert that all valid and invalid data is entered
    registrationFormPage.assertDataIsEntered(
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
    //assert that the webtables page is opened
    cy.url().should("include", "/webtables");
    //assert that there is no new row with values
    cy.get(webtablePage.labels.tableRows).eq(3).should("not.contain.value");
  });
  it("Add new record with invalid salary", () => {
    registrationFormPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.age,
      invalidUserData.salary,
      userData.department
    );
    //assert that all valid and invalid data is entered

    registrationFormPage.assertDataIsEntered(
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
    //assert that the webtables page is opened
    cy.url().should("include", "/webtables");
    //assert that there is no new row with values
    cy.get(webtablePage.labels.tableRows).eq(3).should("not.contain.value");
  });
});
