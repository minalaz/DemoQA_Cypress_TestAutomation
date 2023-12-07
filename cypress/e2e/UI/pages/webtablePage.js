/// <reference types='Cypress'/>
export const webtablePage = {
  buttons: {
    addButton: "#addNewRecordButton",
    editFirstRecordButton: "#edit-record-1",
  },
  labels: { tableRows: ".rt-tr-group" },

  assertNewTableRowContainsEnteredData(
    firstName,
    lastName,
    email,
    age,
    salary,
    department
  ) {
    cy.get(this.labels.tableRows)
      .eq(3)
      .should("contain", firstName)
      .and("contain", lastName)
      .and("contain", email)
      .and("contain", age)
      .and("contain", salary)
      .and("contain", department);
  },
};
