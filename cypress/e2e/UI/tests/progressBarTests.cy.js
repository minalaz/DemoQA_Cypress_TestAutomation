/// <reference types="cypress" />
import { progressBarPage } from "../pages/progressBarPage";
describe("Testing Progres Bar", () => {
  beforeEach("Visiting webpage", () => {
    cy.visit("https://demoqa.com/progress-bar");
  });
  afterEach("CleanUp", () => {
    cy.end();
  });
  it("Start and Stop Process", () => {
    cy.clock();
    //click on start button and assert that it changes its text and funcionality into "Stop"
    cy.get(progressBarPage.buttons.startStopButton)
      .click()
      .should("have.text", "Stop");
    cy.tick(5000);
    cy.get(progressBarPage.buttons.startStopButton).click();
    //assert that progress bar has value that is specified by waiting to click "Stop" for 5 seconds
    cy.get(progressBarPage.labels.progressBar)
      .scrollIntoView()
      .invoke("attr", "aria-valuenow")
      .should("eq", "50");
    //assert that after clicking on Stop button it changes its text and functionality into "Start" again
    cy.get(progressBarPage.buttons.startStopButton).should(
      "have.text",
      "Start"
    );
  });
  it("Reset the progressBar", () => {
    cy.clock();
    cy.get(progressBarPage.buttons.startStopButton).click();
    cy.tick(10000);
    cy.get(progressBarPage.buttons.resetButton).click();
    //assert that after clicking on Reset button, progress bar has value 0
    cy.get(progressBarPage.labels.progressBar)
      .scrollIntoView()
      .invoke("attr", "aria-valuenow")
      .should("eq", "0");
    //assert that after clicking on Reset button it changes its text and functionality into "Start" again
    cy.get(progressBarPage.buttons.startStopButton).should(
      "have.text",
      "Start"
    );
  });
});
