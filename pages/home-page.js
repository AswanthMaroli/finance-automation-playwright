const Actions = require("../uttilities/actions");
const LoginPage = require("./login-page");

class HomePage extends Actions{


    constructor(page){

        super(page);
        // this.actions = new Actions(page);
        this.loginMenu = page.locator('//a[normalize-space()="Login"]');
        this.signUpMenu = page.locator('//a[normalize-space()="Signup"]');

    }

    async clickLoginMenu(){

        await this.performClick(this.loginMenu);
        return await new LoginPage(this.page);
    }

    async clickSignUpMenu(){

        await this.performClick(this.signUpMenu);

    }


}
module.exports = HomePage;