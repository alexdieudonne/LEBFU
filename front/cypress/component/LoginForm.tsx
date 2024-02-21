import LoginForm from "@/components/Forms/LoginForm";

describe("LoginForm.cy.tsx", () => {
  it("playground", () => {
    cy.mount(<LoginForm />);

    cy.get("input[name='email']")
      .screenshot("email")
      .type("Alexdieudonne02@gmail.com");
    cy.get("input[name='password']").type("Alexdieudonne02@gmail.com");
    cy.get("button[type='submit']").click();
  });
});
