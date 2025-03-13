
const { expect,test } = require("@playwright/test");
const UserSignUpPage = require("../../pages/usersignup-page");
const { generateRandomUserData } = require("../../uttilities/chance");
const HomePage = require("../../pages/home-page");

const jsondata = JSON.parse(JSON.stringify(require('../../test-data/signupdata.json')));
let baseURL;

test.beforeAll(() =>{

  if(!jsondata){

    throw new Error("Test data missing required login credentials");
  }

});

test.beforeEach( async ({ page }) => {

  baseURL = test.info().project.use.baseURL || "https://costreport.net"; 

    try{
        await page.goto(baseURL);

    }catch(error){
        console.error(`Failed to navigate to the ${baseURL}:${error.message}`);
        throw error;
    }

});

test("Very that user can sign up successfully", async ({ page }) => {

    const userSignUpPage = new UserSignUpPage(page);
    const homePage = new HomePage(page);
    try {
          const testdata = generateRandomUserData();
          await homePage.clickSignUpMenu();
          await userSignUpPage.performUserSignup(
              testdata.firstname,
              testdata.lastname,
              testdata.firstname,
              jsondata.hhaaddress,
              jsondata.city,
              jsondata.state,
              jsondata.zip,
              jsondata.phone,
              testdata.email,
              jsondata.password,
              jsondata.password
          );
          await userSignUpPage.assertAccountCreatedSuccessMessageIsVisible();
          
          await userSignUpPage.clickOkButton();  
          await expect(page).toHaveURL(`${baseURL}/#/Login`,{timeout:10000});
    } catch (error) {
          console.error(`Signup with valid data test failed: ${error.message}`);
          throw error;
    }
    
});

test("Verify all required fields show error messages when empty", async ({ page }) => {

  const homePage = new HomePage(page)
  const userSignUpPage = new UserSignUpPage(page);
  await homePage.clickSignUpMenu();
  await expect(page).toHaveURL(`${baseURL}/#/Signup`,{timeout:10000});
  await userSignUpPage.clickSignUpButton();
  await userSignUpPage.assertAllValidationMessages();
  await expect(page).toHaveURL(`${baseURL}/#/Signup`,{timeout:10000});
  
});

test("Verify password mismatch error message", async ({ page }) => {

  const homePage = new HomePage(page)
  const userSignUpPage = new UserSignUpPage(page);
  try {
        const testdata = generateRandomUserData();
        await homePage.clickSignUpMenu();
        await expect(page).toHaveURL(`${baseURL}/#/Signup`,{timeout:10000});
        await userSignUpPage.performUserSignup(
                  testdata.firstname,
                  testdata.lastname,
                  testdata.firstname,
                  jsondata.hhaaddress,
                  jsondata.city,
                  jsondata.state,
                  jsondata.zip,
                  jsondata.phone,
                  testdata.email,
                  jsondata.password,
                  '1234456'
              );
        await userSignUpPage.clickSignUpButton();
        const passwordDoesNotMatchError = await userSignUpPage.getPasswordMismatchValidation();
        await expect(passwordDoesNotMatchError).toContain('Password does not match');
        await expect(page).toHaveURL(`${baseURL}/#/Signup`,{timeout:10000});
      } catch (error) {
        console.error(`Signup with password&confirm password mismatch test failed: ${error.message}`);
        throw error;
      }
  
});

test("Verify invalid email error message is visible", async ({ page }) => {

  const homePage = new HomePage(page)
  const userSignUpPage = new UserSignUpPage(page);
  try {
        const testdata = generateRandomUserData();
        await homePage.clickSignUpMenu();
        await expect(page).toHaveURL(`${baseURL}/#/Signup`,{timeout:10000});
        await userSignUpPage.performUserSignup(
                  testdata.firstname,
                  testdata.lastname,
                  testdata.firstname,
                  jsondata.hhaaddress,
                  jsondata.city,
                  jsondata.state,
                  jsondata.zip,
                  jsondata.phone,
                  jsondata.invalidemail,
                  jsondata.password,
                  jsondata.password
              );
        await userSignUpPage.clickSignUpButton();
        const invalidEmailError = await userSignUpPage.getInvalidEmailFormatValidation();
        await expect(invalidEmailError).toContain('Please provide a valid email');
        await expect(page).toHaveURL(`${baseURL}/#/Signup`,{timeout:10000});
  } catch (error) {
        console.error(`Signup with invalid email test failed: ${error.message}`);
        throw error;
  }
  
});

test("Verify invalid phone number error message is visible", async ({ page }) => {

  const homePage = new HomePage(page)
  const userSignUpPage = new UserSignUpPage(page);
  const testdata = generateRandomUserData();
  await homePage.clickSignUpMenu();
  await expect(page).toHaveURL(`${baseURL}/#/Signup`,{timeout:10000});
  await userSignUpPage.performUserSignup(
            testdata.firstname,
            testdata.lastname,
            testdata.firstname,
            jsondata.hhaaddress,
            jsondata.city,
            jsondata.state,
            jsondata.zip,         
            jsondata.invalidphone,
            testdata.email,
            jsondata.password,
            jsondata.password                                                            
        );
  await userSignUpPage.clickSignUpButton();
  const invalidPhoneNumberError = await userSignUpPage.getInvalidPhoneValidation();
  await expect(invalidPhoneNumberError).toContain('Invalid phone number format.');
  await expect(page).toHaveURL(`${baseURL}/#/Signup`,{timeout:10000});
  
});


test("Verify that Email already exist validation message is visible", async ({ page }) => {

  const homePage = new HomePage(page)
  const userSignUpPage = new UserSignUpPage(page);
  const testdata = generateRandomUserData();
  await homePage.clickSignUpMenu();
  await expect(page).toHaveURL(`${baseURL}/#/Signup`,{timeout:10000});
  await userSignUpPage.performUserSignup(
            testdata.firstname,
            testdata.lastname,
            testdata.firstname,
            jsondata.hhaaddress,
            jsondata.city,
            jsondata.state,
            jsondata.zip,         
            jsondata.invalidphone,
            jsondata.registeredemail,
            jsondata.password,
            jsondata.password                                                            
        );
  await userSignUpPage.clickSignUpButton();
  const emailAlreadyExistError = await userSignUpPage.getEmailExistedValidation();
  await expect(emailAlreadyExistError).toContain('Email already exist!');
  await expect(page).toHaveURL(`${baseURL}/#/Signup`,{timeout:10000});
  
});