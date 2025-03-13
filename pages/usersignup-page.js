const { expect } = require("@playwright/test");
const Actions = require("../uttilities/actions");

class UserSignUpPage extends Actions {

    constructor(page) {

        // this.page = page;
        super(page);
        // this.actions = new Actions(page);
        //input fields 
        this.txtFirstName = page.locator('#UserDataFirstName');
        this.txtLastName = page.locator('#UserDataLastName');
        this.txtHhaName = page.locator('#UserDataHHAName');
        this.txtHhaAddress = page.locator('#UserDataHHAAddress');
        this.txtCity = page.locator('#UserDataCity');
        this.txtState = page.locator('//select[@aria-label="UserDataState"]');
        this.txtZip = page.locator('#UserDataZip');
        this.txtPhone = page.locator('#UserDataPhone');
        this.txtEmail = page.locator('#UserDataEmail');
        this.txtPassword = page.locator('#PassSignup');
        this.txtConfirmPassword = page.locator('#ConfirmPassSignup');
        //buttons
        this.btnSignUP = page.locator('#SignupBtn');
        this.btnOk = page.getByRole('button', { name: 'Ok' });
       
        //messages - validations
        this.successMsg = page.locator('div.card-title');
        this.passwordMismatchError = page.locator('//div[contains(text(),"Password does not match")]');
        this.emailAlreadyExistError = page.locator('//div[contains(text(),"Email already exist!")]');
        this.invalidPhoneNumberError = page.locator('//span[normalize-space()="Invalid phone number format."]');
        this.invalidEmailFormatError = page.locator('//div[contains(text(),"Please provide a valid email")]');

        this.validationErrors = {
            email: page.locator('//div[contains(text(),"Email is required.")]'),
            password: page.locator('//div[normalize-space()="Password is required."]/div/div'),
            confirmPassword: page.locator('//div[contains(text(),"Confirm Password is required.")]'),
            firstName: page.locator('//div[contains(text(),"First Name is required")]'),
            lastName: page.locator('//div[contains(text(),"Last Name is required")]'),
            hhaName: page.locator('//div[contains(text(),"HHA name is required.")]'),
            hhaAddress: page.locator('//div[contains(text(),"HHA address is required.")]'),
            city: page.locator('//div[contains(text(),"City is required.")]'),
            state: page.locator('//div[contains(text(),"State is required.")]'),
            zip: page.locator('//div[contains(text(),"Zip is required.")]'),
            phone: page.locator('//div[contains(text(),"Phone number is required.")]')
        };


    }
    
    async performUserSignup(

            firstname,
            lastname,
            hhaname,
            hhaaddress,
            city,
            state,
            zip,
            phone,
            email,
            password,
            confirmpassword 
    ) {
            
            await this.typeText(this.txtFirstName, firstname);
            await this.typeText(this.txtLastName, lastname);
            await this.typeText(this.txtHhaName, hhaname);
            await this.typeText(this.txtHhaAddress, hhaaddress);    
            await this.typeText(this.txtCity, city);
            await this.selectByLabel(this.txtState, state);
            await this.typeText(this.txtZip, zip);
            await this.typeText(this.txtPhone, phone);
            await this.typeText(this.txtEmail, email);
            await this.typeText(this.txtPassword, password);
            await this.typeText(this.txtConfirmPassword, confirmpassword);
            await this.clickSignUpButton();
    }
   
  
    async assertAccountCreatedSuccessMessageIsVisible(){

        await expect(this.successMsg).toBeVisible();
        await expect(this.successMsg).toContainText('Account created successfully!');
    } 

    async clickOkButton(){

        await this.performClick(this.btnOk);
    }

    async clickSignUpButton(){

        await this.performClick(this.btnSignUP);

    }

    async getPasswordMismatchValidation(){
        
        const passwordError = await this.getText(this.passwordMismatchError);
        return passwordError;
    }

    async getEmailExistedValidation(){
        
        const emailExistedError = await this.getText(this.emailAlreadyExistError);
        return emailExistedError;
    }

    async getInvalidEmailFormatValidation(){
        
        const invalidEmailFormatError = await this.getText(this.invalidEmailFormatError);
        return invalidEmailFormatError;
    }

    async getInvalidPhoneValidation(){
        
        const invalidPhoneError = await this.getText(this.invalidPhoneNumberError);
        return invalidPhoneError;
    }


    async getValidationMessage(fieldName) {
        if (!this.validationErrors[fieldName]) {
            throw new Error(`Field '${fieldName}' does not exist in validation map`);
        }
        return await this.getText(this.validationErrors[fieldName]);
    }
    

    async assertAllValidationMessages() {
        const expectedMessages = {
            email: "Email is required.",
            password: "Password is required.",
            confirmPassword: "Confirm Password is required.",
            firstName: "First Name is required",
            lastName: " Last Name is required ",
            hhaName: "HHA name is required.",
            hhaAddress: "HHA address is required.",
            city: "City is required.",
            state: "State is required.",
            zip: "Zip is required.",
            phone: "Phone number is required."
        };
    
        for (const [field, message] of Object.entries(expectedMessages)) {
            await expect(this.validationErrors[field]).toHaveText(message);
        }
    }
    

    


}
module.exports = UserSignUpPage;