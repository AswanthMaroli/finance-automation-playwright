const { test, expect } = require("@playwright/test");
const HomePage = require("../../pages/home-page");

const loginData = JSON.parse(JSON.stringify(require("../../test-data/logindata.json")));


let baseURL;
let userName = "Hello Doe John";

test.beforeAll( async () =>{

  if(!loginData[0].useremail || !loginData[0].userpassword){

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


test("Verify that dashboard should display correct customer name and cost report section", async ({ page }) => {

    const homePage = new HomePage(page);
    try{
          const loginPage = await homePage.clickLoginMenu(); 
          const dashboardPage = await loginPage.performLogin(loginData[0].useremail,loginData[0].userpassword);

          await page.waitForURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
          await expect(page).toHaveURL(`${baseURL}/#/CustomerDashboard`,{ timeout: 10000 });
          
          await dashboardPage.isCostReportIsVisible();
          let date = new Date();
          let currentYear =  date.getFullYear();
          let isYearExist =await dashboardPage.checkCostReportYear(currentYear);
          expect(isYearExist).toBeTruthy();
          await dashboardPage.isCustomerNameIsVisible();
          await dashboardPage.checkCustomerName(userName);
    }catch(error){

          console.error(`Verify the dashboard display correct datas Test Failed :${error.message}`);
          throw error;
    }

});

test("Verify that user should be redirected to cost reports page when clicking on cost report", async ({ page }) => {

    const homePage = new HomePage(page);
    try{
      const loginPage = await homePage.clickLoginMenu(); 
      const dashboardPage = await loginPage.performLogin(loginData[0].useremail,loginData[0].userpassword);

      await page.waitForURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
      await expect(page).toHaveURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
      await dashboardPage.clickCostReport();
      await expect(page).toHaveURL(`${baseURL}/#/MyCostReports`);
    
    }catch(error){
      console.error(`Verify the user should be redirected to cost reports page test failed ${error.message}`);
      throw error;
    }


});