/// <reference types='Cypress'/>

import { randomizingData } from "./randomizingData";

export const registrationFormPage = {
  buttons: {
    submitButton: "#submit",
    closeButton: ".close",
  },
  labels: {
    firstNameField: "#firstName",
    lastNameField: "#lastName",
    emailField: "#userEmail",
    ageField: "#age",
    salaryField: "#salary",
    departmentField: "#department",
    registrationFormModal: "#registration-form-modal",
  },
  fillRegistrationForm(firstName, lastName, email, age, salary, department) {
    cy.get(this.labels.firstNameField).type(firstName);
    cy.get(this.labels.lastNameField).type(lastName);
    cy.get(this.labels.emailField).type(email);
    cy.get(this.labels.ageField).type(age);
    cy.get(this.labels.salaryField).type(salary);
    cy.get(this.labels.departmentField).type(department);
  },
  clearingRegistrationForm() {
    cy.get(this.labels.firstNameField).clear();
    cy.get(this.labels.lastNameField).clear();
    cy.get(this.labels.emailField).clear();
    cy.get(this.labels.ageField).clear();
    cy.get(this.labels.salaryField).clear();
    cy.get(this.labels.departmentField).clear();
  },
  addingRandomizedDataInForm() {
    this.fillRegistrationForm(
      randomizingData.generateRandomString(5),
      randomizingData.generateRandomString(6),
      randomizingData.randomizeEmail("example.com"),
      randomizingData.randomizeNumber(2),
      randomizingData.randomizeNumber(5),
      randomizingData.generateRandomString(8)
    );
  },
};
