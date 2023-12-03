/// <reference types="Cypress" />

import { randomData } from "./randomData";

export const generateUserCredentials = {
  alreadyRegisteredUserCredentials() {
    return {
      userName: "minaCuraFina",
      password: "Mina123!@#srce",
    };
  },
  randomizedGoodCredentials() {
    return {
      userName: randomData.randomUsername(7),
      password: "MSr563829@#$@!!bhcsr",
    };
  },
  badCredentials() {
    return {
      userName: "ta",
      password: "jjljo",
    };
  },
};
