/// <reference types='Cypress'/>

import { practiceFormPage } from "../pages/practiceFormPage";

describe("Validate Practice Form", () => {
  let userData;

  before("Reading fixture files", () => {
    cy.fixture("userData").then((data) => {
      userData = data;
    });
  });
  beforeEach("Visiting webpage", () => {
    cy.visit("https://demoqa.com/automation-practice-form");
  });
  afterEach("CleanUp", () => {
    cy.end();
  });
  it("Validate submitted data is correct", () => {
    cy.get(practiceFormPage.labels.firstNameInputField).type(
      userData.firstName
    );
    cy.get(practiceFormPage.labels.lastNameInputField).type(userData.lastName);
    cy.get(practiceFormPage.labels.emailInputField).type(userData.email);
    cy.get(practiceFormPage.buttons.maleRadioButton).check({ force: true });
    cy.get(practiceFormPage.labels.mobileNumberField).type(
      userData.mobileNumber
    );
    practiceFormPage.choosingDate();
    cy.get(practiceFormPage.labels.subjectsInputField).type(userData.subjects);
    cy.get(practiceFormPage.labels.selectedSubjects).click({ force: true });
    cy.get(practiceFormPage.buttons.hobbiesRadioButton).check({ force: true });

    practiceFormPage.uploadingFile();

    cy.get(practiceFormPage.labels.currentAddressInputField).type(
      userData.currentAddress
    );
    cy.get(practiceFormPage.labels.dropDownStateField).click({ force: true });
    cy.get(practiceFormPage.labels.firstOptionInStateDropDown).click({
      force: true,
    });
    cy.get(practiceFormPage.labels.dropDowncityField).click({ force: true });
    cy.get(practiceFormPage.labels.firstOptionInCityDropDown).click({
      force: true,
    });
    cy.get(practiceFormPage.buttons.submitButton).click({ force: true });
    //assert that submitted form modal contains all data specified in Practice form
    cy.get(practiceFormPage.labels.submittedFormModalTable)
      .should("contain", userData.firstName)
      .and("contain", userData.lastName)
      .and("contain", userData.email)
      .and("contain", "Male")
      .and("contain", userData.mobileNumber)
      .and("contain", "03", "Jan", "1985")
      .and("contain", userData.subjects)
      .and("contain", "Reading")
      .and("contain", "IMG_20200630_184251.jpg")
      .and("contain", userData.currentAddress)
      .and("contain", "NCR")
      .and("contain", "Delhi");
  });
});
