import React from "react";
import DialogCreateCard from "./DialogCreateCard";

describe("<DialogCreateCard />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DialogCreateCard titleBtn="Test" />);
  });
});
