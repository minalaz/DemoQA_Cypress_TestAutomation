export const requestMethods = {
  postRequest(url, body) {
    return cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: url,
      headers: { "Content-Type": "application/json" },
      body: body,
    });
  },
  postRequestWithAuthorization(url, body, token) {
    return cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: url,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: body,
    });
  },
  getRequest(url, token) {
    return cy.request({
      method: "GET",
      failOnStatusCode: false,
      url: url,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  },
  deleteRequest(url, token) {
    return cy.request({
      method: "DELETE",
      failOnStatusCode: false,
      url: url,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  },
  deleteRequestWithoutAuthorization(url) {
    return cy.request({
      method: "DELETE",
      failOnStatusCode: false,
      url: url,
    });
  },
};
