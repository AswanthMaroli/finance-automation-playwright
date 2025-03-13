const Actions = require("../uttilities/actions");
const DashboardPage = require("./dashboard-page");


class LoginPage extends Actions{

    constructor(page){

        super(page);
        // this.page = page;
        // this.actions = new Actions(page);
        this.txtUserName = page.locator("Input#UserEmail");
        this.txtPassword = page.locator("Input#UserPassword");
        this.loginMenu = page.locator('//a[normalize-space()="Login"]');
        this.btnLogin = page.locator("button#SignupBtn");


    }
     
  
    async performLogin(username,password){
        await this.page.waitForTimeout(1000);  
        await this.txtUserName.waitFor();      
        await this.typeText(this.txtUserName,username);
        await this.txtPassword.waitFor();      
        await this.typeText(this.txtPassword,password);
        await this.btnLogin.waitFor();   
        await this.performClick(this.btnLogin);
        return await new DashboardPage(this.page);

    }

}
module.exports = LoginPage; 