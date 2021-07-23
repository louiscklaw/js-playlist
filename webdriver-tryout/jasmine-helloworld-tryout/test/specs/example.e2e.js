const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await expectAsync(SecurePage.flashAlert).toBeExisting();
        await expectAsync(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!');
    });
});


