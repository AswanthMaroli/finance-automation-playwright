
const HomePage =  require("../../pages/home-page");
const { test, expect } = require("@playwright/test");

const loginData = JSON.parse(JSON.stringify(require("../../test-data/logindata.json")));
const crChecklistData = JSON.parse(JSON.stringify(require("../../test-data/crchecklistdata.json")));


let baseURL;
let filePath = "files/Attendeeslist.pdf";

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

test("Verify that my cost report page contains all the customer files ", async ({ page }) => {

    const homePage = new HomePage(page);
    try{
      const loginPage = await homePage.clickLoginMenu(); 
      const dashboardPage = await loginPage.performLogin(loginData[0].useremail,loginData[0].userpassword);

      await page.waitForURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
      await expect(page).toHaveURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
      const myCostReportPage =await dashboardPage.clickCostReport();
      await page.waitForURL(`${baseURL}/#/MyCostReports`, { timeout: 10000 });
      await expect(page).toHaveURL(`${baseURL}/#/MyCostReports`);

      const customerFiles = ["Balance Sheet","Trial Balance","Profit and Loss"," PS&R CSV "," PS&R PDF "," CR Checklist "];

      for(const filename of customerFiles){

        await myCostReportPage.checkCustomerFiles(filename);
        
      }
        
    }catch(error){
      console.error(`Test Failed : ${error.message}`);
      throw error;
    }

});

test("Verify that my cost report page contains all the completed files ", async ({ page }) => {

  const homePage = new HomePage(page);
  try{
    const loginPage = await homePage.clickLoginMenu(); 
    const dashboardPage = await loginPage.performLogin(loginData[0].useremail,loginData[0].userpassword);

    await page.waitForURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    const myCostReportPage =await dashboardPage.clickCostReport();
    await page.waitForURL(`${baseURL}/#/MyCostReports`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/MyCostReports`);

    const completedFiles = ["AI File","PI File","SC File","Notes","Additional files and explanations"," CMS Correspondence "];

    for(const filename of completedFiles){

      await myCostReportPage.checkCompletedFiles(filename);
      
    }
      
  }catch(error){
    console.error(`Test Failed : ${error.message}`);
    throw error;
  }


});



test("Verify user can upload customer files ", async ({ page }) => {

  const homePage = new HomePage(page);
  try{
    const loginPage = await homePage.clickLoginMenu(); 
    const dashboardPage = await loginPage.performLogin(loginData[0].useremail,loginData[0].userpassword);

    await page.waitForURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    const myCostReportPage =await dashboardPage.clickCostReport();
    await page.waitForURL(`${baseURL}/#/MyCostReports`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/MyCostReports`);

    const customerFiles = ["Balance Sheet","Trial Balance","Profit and Loss"," PS&R CSV "," PS&R PDF "];

    for (const element of customerFiles) {

      await myCostReportPage.uploadCustomerFile(element, filePath);
      await page.goBack();
  }
      
  }catch(error){
    console.error(`File upload Failed : ${error.message}`);
    throw error;
  }


});


test("Verify that user can remove the uploaded files", async ({ page }) => {

  const homePage = new HomePage(page);
  try{
    const loginPage = await homePage.clickLoginMenu(); 
    const dashboardPage = await loginPage.performLogin(loginData[0].useremail,loginData[0].userpassword);

    await page.waitForURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    const myCostReportPage =await dashboardPage.clickCostReport();
    await page.waitForURL(`${baseURL}/#/MyCostReports`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/MyCostReports`);

    const customerFiles = ["Balance Sheet","Trial Balance","Profit and Loss"," PS&R CSV "," PS&R PDF "];

    for (const element of customerFiles) {

      await myCostReportPage.removeUploadedFile(element);
      await page.goBack();  
  }
      
  }catch(error){
    console.error(`File Remove Failed : ${error.message}`);
    throw error;
  }

});


test("Verify that validation message is visible for the mandatory fields", async ({ page }) => {

  const homePage = new HomePage(page);
  try{
    const loginPage = await homePage.clickLoginMenu(); 
    const dashboardPage = await loginPage.performLogin(loginData[0].useremail,loginData[0].userpassword);

    await page.waitForURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    const myCostReportPage =await dashboardPage.clickCostReport();
    await page.waitForURL(`${baseURL}/#/MyCostReports`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/MyCostReports`);
    await myCostReportPage.clickCRCheckList();
    await page.waitForURL(`${baseURL}/#/CreateCostReport`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/CreateCostReport`);
    await myCostReportPage.clickSubmitBtn();
    await myCostReportPage.isFieldValidationIsVisible(myCostReportPage.hhaNameValidationSection,"Enter HHA name");
    await myCostReportPage.isFieldValidationIsVisible(myCostReportPage.hhaAddressValidationSection,"Enter HHA Address");
    await myCostReportPage.isFieldValidationIsVisible(myCostReportPage.hhaMedicareProviderNumberValidationSection,"Please enter Mediare Provider Number");
    await myCostReportPage.isFieldValidationIsVisible(myCostReportPage.hhaCityValidationSection,"Select City");
    await myCostReportPage.isFieldValidationIsVisible(myCostReportPage.hhaStateValidationSection,"Select State");
    await myCostReportPage.isFieldValidationIsVisible(myCostReportPage.hhaZipValidationSection,"Enter Zip code");
    await myCostReportPage.isFieldValidationIsVisible(myCostReportPage.hhaDateOfCertifiedValidationSection,"Enter Date certified medicare");
    await myCostReportPage.isFieldValidationIsVisible(myCostReportPage.hhaTypeOfOrganizationValidationSection,"Select type of organization");
      
  }catch(error){
    console.error(`Validation check test failed : ${error.message}`);
    throw error;
  }

});

test("Verify that user can submit the CR Checklist form with valid data", async ({ page }) => {

  const homePage = new HomePage(page);
  try{
    const loginPage = await homePage.clickLoginMenu(); 
    const dashboardPage = await loginPage.performLogin(loginData[0].useremail,loginData[0].userpassword);

    await page.waitForURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    const myCostReportPage =await dashboardPage.clickCostReport();
    await page.waitForURL(`${baseURL}/#/MyCostReports`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/MyCostReports`);
    await myCostReportPage.clickCRCheckList();
    await page.waitForURL(`${baseURL}/#/CreateCostReport`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/CreateCostReport`);
    await page.waitForTimeout(10000);

    await myCostReportPage.inputHHAPersonalInformation(
      crChecklistData[0].HHAName,
      crChecklistData[0].MedicareProviderNo,
      crChecklistData[0].HHAAddress,
      crChecklistData[0].City,
      crChecklistData[0].State,
      crChecklistData[0].ZipCode,
      crChecklistData[0].Date,
      crChecklistData[0].OrganizationType
    );
    await myCostReportPage.clickSubmitBtn();
    let returnValue =await myCostReportPage.isCrCheckListSubmittedPopupIsVisible();

    if(returnValue){

      expect(returnValue).toBe(true);
      console.log("CR Checklist Submitted Popup is ",returnValue);
    }else{

      throw new Error("CR Checklist Submitted Popup is not visible");
    }

    await myCostReportPage.clickOnSubmittedPopupOkBtn();
    await page.waitForURL(`${baseURL}/#/MyCostReports`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/MyCostReports`);


  }catch(error){
    console.error(`CR Checklist Submission with valid data test is failed  : ${error.message}`);
    throw error;
  }

});

test("Verify that user can edit the CR Checklist form ", async ({ page }) => {

  const homePage = new HomePage(page);
  try{
    const loginPage = await homePage.clickLoginMenu(); 
    const dashboardPage = await loginPage.performLogin(loginData[0].useremail,loginData[0].userpassword);

    await page.waitForURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/CustomerDashboard`, { timeout: 10000 });
    const myCostReportPage =await dashboardPage.clickCostReport();
    await page.waitForURL(`${baseURL}/#/MyCostReports`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/MyCostReports`);
    await myCostReportPage.clickCRCheckList();
    await page.waitForURL(`${baseURL}/#/CreateCostReport`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/CreateCostReport`);
    await page.waitForTimeout(10000);

    await myCostReportPage.inputHHAPersonalInformation(
      crChecklistData[1].HHAName,
      crChecklistData[1].MedicareProviderNo,
      crChecklistData[1].HHAAddress,
      crChecklistData[1].City,
      crChecklistData[1].State,
      crChecklistData[1].ZipCode,
      crChecklistData[1].Date,
      crChecklistData[1].OrganizationType
    );
    await myCostReportPage.clickSubmitBtn();
    let returnValue =await myCostReportPage.isCrCheckListSubmittedPopupIsVisible();

    if(returnValue){

      expect(returnValue).toBe(true);
      console.log("CR Checklist Submitted Popup is ",returnValue);
    }else{

      throw new Error("CR Checklist Submitted Popup is not visible");
    }

    await myCostReportPage.clickOnSubmittedPopupOkBtn();
    await page.waitForURL(`${baseURL}/#/MyCostReports`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseURL}/#/MyCostReports`);


  }catch(error){
    console.error(`CR Checklist Edit  with valid data test is failed  : ${error.message}`);
    throw error;
  }

});

