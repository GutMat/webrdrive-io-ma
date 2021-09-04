function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
describe("RWA Scenario", () => {
  it("Wykonanie transakcji na nowym koncie użytkownika", async () => {
    // Rejestracja nowego użytkownika
    await browser.url("http://localhost:3000/");
    await browser.url("http://localhost:3000/signup");
    const firstNameInput = await $("#firstName");
    await firstNameInput.setValue("Mateusz");
    const lastNameInput = await $("#lastName");
    await lastNameInput.setValue("Gut");
    const usernameInput = await $("#username");
    await usernameInput.setValue("GutMat");
    const passwordInput = await $("#password");
    await passwordInput.setValue("Test123$%");
    const confirmPasswordInput = await $("#confirmPassword");
    await confirmPasswordInput.setValue("Test123$%");
    const signupButton = await $('button[data-test="signup-submit"]');
    await signupButton.click();
    await expect(browser).toHaveUrlContaining("/signin");
    const signinTitle = await $("h1");
    await expect(signinTitle).toHaveText("Sign in");

    // Logowanie nowo założonego użytkownika do aplikacji
    const usernameInputSignIn = await $("#username");
    await usernameInputSignIn.setValue("GutMat");
    const passwordInputSignIn = await $("#password");
    await passwordInputSignIn.setValue("Test123$%");
    const signinButton = await $('button[data-test="signin-submit"]');
    await expect(signinButton).toBeEnabled();
    await signinButton.click();

    // Wprowadzenie danych nowego użytkownika na ekranie startowym
    const onboardingDialog = await $('div[data-test="user-onboarding-dialog"]');
    await expect(onboardingDialog).toExist();
    const onboardingDialogTitle = await $(
      'div[data-test="user-onboarding-dialog-title"]'
    );
    await expect(onboardingDialogTitle).toHaveText(
      "Get Started with Real World App"
    );
    const startDialogButton = await $(
      'button[data-test="user-onboarding-next"]'
    );
    await expect(startDialogButton).toBeEnabled();
    await startDialogButton.click();
    const secondOnboardingTitle = await $(
      'div[data-test="user-onboarding-dialog-title"]'
    );
    await expect(secondOnboardingTitle).toHaveText("Create Bank Account");
    const bankNameInput = await $("#bankaccount-bankName-input");
    await bankNameInput.setValue("Narodowy Bank Polski");
    const routingNumberInput = await $("#bankaccount-routingNumber-input");
    await routingNumberInput.setValue("123456789");
    const accountNumberInput = await $("#bankaccount-accountNumber-input");
    await accountNumberInput.setValue("987654321");
    const saveDialogButton = await $('button[data-test="bankaccount-submit"]');
    await expect(saveDialogButton).toBeEnabled();
    await expect(saveDialogButton).toHaveText("SAVE");
    await saveDialogButton.click();
    const finishOnboardingTitle = await $(
      'div[data-test="user-onboarding-dialog-title"]'
    );
    await expect(finishOnboardingTitle).toHaveText("Finished");
    const finishDialogButton = await $(
      'button[data-test="user-onboarding-next"]'
    );
    await expect(finishDialogButton).toBeEnabled();
    await expect(finishDialogButton).toHaveText("DONE");
    await finishDialogButton.click();
    // const closedDialog = await $('div[data-test="user-onboarding-dialog"]');
    // const isExistingDialog = await closedDialog.isExisting();
    // await expect(isExistingDialog).to.equal(false);

    // Dodanie nowej transakcji
    const navUsernameText = await $('h6[data-test="sidenav-username"]');
    await expect(navUsernameText).toHaveText("@GutMat");
    await browser.url("http://localhost:3000/transaction/new");
    await expect(browser).toHaveUrlContaining("/transaction/new");
    const transactionUser = await $("li.MuiListItem-root");
    await transactionUser.click();
    const amountInput = await $("#amount");
    await amountInput.setValue("100");
    const transactionDescriptionInput = await $(
      "#transaction-create-description-input"
    );
    await transactionDescriptionInput.setValue("Pożyczka");
    const submitRequestTransactionButton = await $(
      'button[data-test="transaction-create-submit-request"]'
    );
    await expect(submitRequestTransactionButton).toBeEnabled();
    await submitRequestTransactionButton.click();
    const successAlertText = await $('div[data-test="alert-bar-success"]');
    await expect(successAlertText).toHaveText("Transaction Submitted!");
  });
});
