///
export const practiceFormPage = {
  buttons: {
    maleRadioButton: "#gender-radio-1",
    hobbiesRadioButton: "#hobbies-checkbox-2",
    uploadFileButton: "#uploadPicture",
    submitButton: "#submit",
  },
  labels: {
    firstNameInputField: "#firstName",
    lastNameInputField: "#lastName",
    emailInputField: "#userEmail",
    mobileNumberField: "#userNumber",
    dateOfBirthInputField: "#dateOfBirthInput",
    monthSelection: ".react-datepicker__month-select",
    yearSelection: ".react-datepicker__year-select",
    day: ".react-datepicker__day ",
    subjectsInputField: "#subjectsContainer",
    selectedSubjects: "#react-select-2-option-0",
    currentAddressInputField: "#currentAddress",
    dropDownStateField: "#react-select-3-input",
    firstOptionInStateDropDown: "#react-select-3-option-0",
    dropDowncityField: "#react-select-4-input",
    firstOptionInCityDropDown: "#react-select-4-option-0",
    submittedFormModalTable: ".modal-body",
  },
  choosingDate() {
    cy.get(this.labels.dateOfBirthInputField).click();
    cy.get(this.labels.monthSelection).select("0");
    cy.get(this.labels.yearSelection).select("1985");
    cy.get(this.labels.day).eq(4).click();
  },
  uploadingFile() {
    cy.fixture("IMG_20200630_184251.jpg").then((fileContent) => {
      cy.get(this.buttons.uploadFileButton).attachFile({
        fileContent: fileContent,
        fileName: "IMG_20200630_184251.jpg",
        mimeType: "image/jpeg",
      });
    });
  },
};
