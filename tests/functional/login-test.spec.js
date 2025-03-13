const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/login-page");
const HomePage = require("../../pages/home-page");
const testdata = JSON.parse(JSON.stringify(require("../../test-data/logindata.json")));

let baseURL;
let userName = "Hello Doe John";


const expectedBehaviors = {
  validLogin: async (page) => {
    await expect(page).toHaveURL(`${baseURL}/#/CustomerDashboard`, { timeout: 5000 });
  },
  invalidLogin: async (page) => {
    await expect(page.getByText("Invalid Username or Password!")).toBeVisible();
    await expect(page).toHaveURL(`${baseURL}/#/Login`, { timeout: 5000 });
  },
  missingEmail: async (page) => {
    await expect(page.getByText("Email is required.")).toBeVisible();
    await expect(page).toHaveURL(`${baseURL}/#/Login`, { timeout: 5000 });
  },
  missingPassword: async (page) => {
    await expect(page.getByText("Password is required.")).toBeVisible();
    await expect(page).toHaveURL(`${baseURL}/#/Login`, { timeout: 5000 });
  },
  missingBoth: async (page) => {
    await expect(page.getByText("Email is required.")).toBeVisible();
    await expect(page.getByText("Password is required.")).toBeVisible();
    await expect(page).toHaveURL(`${baseURL}/#/Login`, { timeout: 5000 });
  },
  invalidEmailFormat: async (page) => {
    await expect(page.getByText("Invalid Username or Password!")).toBeVisible();
    await expect(page).toHaveURL(`${baseURL}/#/Login`, { timeout: 5000 });
  },
};


test.beforeEach( async ({ page }) => {

  baseURL = test.info().project.use.baseURL || "https://costreport.net"; 

    try{
        await page.goto(baseURL);

    }catch(error){
        console.error(`Failed to navigate to the ${baseURL}:${error.message}`);
        throw error;
    }

});

test.describe("Functional Testing - Login", () => {

  try{
      for (const data of testdata) {
        test(`${data.test}`, async ({ page }) => {
          const homePage = new HomePage(page);
          const loginPage= await homePage.clickLoginMenu();
          const dashboardPage = await loginPage.performLogin(data.useremail, data.userpassword);
          const behaviorKey = getBehaviorKey(data.test);
          if (expectedBehaviors[behaviorKey]) {
            await expectedBehaviors[behaviorKey](page);
            if(behaviorKey == "validLogin"){
              expect(page).toHaveURL(`${baseURL}/#/CustomerDashboard`);
              let returnValue =await dashboardPage.isCostReportIsVisible();
              console.log("isCostReportIsVisible:",returnValue);
              let checkCustomerNameIsTrue=await dashboardPage.checkCustomerName(userName);
              console.log('checkCustomerNameIsTrue: ',checkCustomerNameIsTrue);
              expect(returnValue).toBeTruthy();
            }
          } else {
            throw new Error(`No assertions defined for test case: ${data.test}`);
          }
        });
      }
    }catch(error){
      console.error(`Error in login test : ${error.message}`);
      throw error;
    }
});


function getBehaviorKey(testName) {
  if (testName.includes("valid credentials")) return "validLogin";
  if (testName.includes("incorrect user credentials")) return "invalidLogin";
  if (testName.includes("email is null")) return "missingEmail";
  if (testName.includes("password is null")) return "missingPassword";
  if (testName.includes("both email and password is null")) return "missingBoth";
  if (testName.includes("invalid email format")) return "invalidEmailFormat";
  return null;
}
