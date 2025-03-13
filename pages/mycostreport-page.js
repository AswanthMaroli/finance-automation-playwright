const { expect } = require("@playwright/test");
const Actions = require("../uttilities/actions");

class MyCostReportPage extends Actions {


    constructor(page) {

        // this.page = page;
        super(page);

        this.customerFiles = page.locator('//*[@id="LegalAdvisorsSection03"]/div/div[2]/div[2]');
        this.completedFiles = page.locator('//*[@id="LegalAdvisorsSection03"]/div/div[3]/div[2]');
        this.fileUploadSection = page.locator('input#fileInput');
        this.saveBtn = page.locator('button#SignupBtn');
        this.removeBtn = page.locator('(//button[normalize-space()="Remove"])[1]');
        this.removePopup = page.locator('div.popup_Hhacost');
        this.removeConfirmBtn = page.locator('//button[normalize-space()="Yes"]');
        this.uploadedFile = page.locator('//*[@class="d-flex flex-column align-items-center justify-content-center"]/i');

        this.crCheckListBtn = page.locator('//p[normalize-space()="CR Checklist"]');
        this.crChecklistSubmitBtn = page.locator('#SubmitChecklit');

        this.hhaNameValidationSection = page.locator('//div[normalize-space()="Enter HHA name"]');
        this.hhaAddressValidationSection = page.locator('//div[normalize-space()="Enter HHA Address"]');
        this.hhaCityValidationSection = page.locator('//div[normalize-space()="Select City"]');
        this.hhaStateValidationSection = page.locator('//div[normalize-space()="Select State"]');
        this.hhaZipValidationSection = page.locator('//div[normalize-space()="Enter Zip code"]');
        this.hhaDateOfCertifiedValidationSection = page.locator('//div[normalize-space()="Enter Date certified medicare"]');
        this.hhaTypeOfOrganizationValidationSection = page.locator('//div[normalize-space()="Select type of organization"]');
        this.hhaMedicareProviderNumberValidationSection = page.locator('//div[normalize-space()="Please enter Mediare Provider Number"]');
   
        this.hhaNameField = page.locator('#HHANameCostreport');
        this.medicareProviderNumberField = page.locator('#MedicareProviderNumberHHA');
        this.hhaAddressField = page.locator('#HHAddress');
        this.hhaCityField = page.locator('#CityHHA');
        this.hhaStateField = page.locator('#StateHHA');
        this.hhaZipField = page.locator('#ZipHHA');
        this.hhaMedicareCertifiedDateField = page.locator('#DateCertifiedForMedicareHHA');
        this.hhaTypeOfOrganizationField = page.locator('#TypeOfOrganizationHHA');

        this.crCheckListSubmittedPopup = page.locator('div.popup_Hhacost');
        this.submittedPopupOkBtn = page.getByRole('button', { name: 'Ok' });



    }


    async checkCustomerFiles(customerFileName) {

        try {

            const pageText = await this.page.textContent('body');
            if (pageText.includes(customerFileName)) {

                console.log(`File ${customerFileName} is present in the customer files section`);
                return true;

            }
        } catch (error) {

            console.log(`File ${customerFileName} not found in Customer Files`);
            throw error;
        }
    }


    async checkCompletedFiles(completedFileName) {

        try {

            const pageText = await this.page.textContent('body',);
            if (pageText.includes(completedFileName)) {

                console.log(`File ${completedFileName} is present in the completed files section`);
                return true;
            }

        } catch (error) {

            console.log(`File ${completedFileName} not found in Completed Files`);
            throw error;

        }
    }


    async uploadCustomerFile(customerFileName, fileName) {

        const file = this.page.getByText(customerFileName, { exact: true });

        await this.waitForElementToBeVisible(file);
        const customerFileExist = await this.isElementVisible(file,10000);

        if (customerFileExist) {

            await this.performClick(file);
            await this.waitForElementToBeVisible(this.fileUploadSection);
            await this.page.waitForTimeout(4000);

        } else {

            console.error(`${customerFileName} is not present in the customer files section`);
            return false;
        }

        const isFileExist = await this.isElementVisible(this.uploadedFile,10000);

        if (!isFileExist) {
            await this.uploadFile(this.fileUploadSection, fileName);
            await this.page.waitForTimeout(2000);
            await this.waitForElementToBeVisible(this.saveBtn);
            await this.isElementEnabled(this.saveBtn);
            await this.performClick(this.saveBtn);
            await this.page.waitForTimeout(3000);
        } else {
            console.error(`Customer file ${customerFileName} is already uploaded`);
        }

    }


    async removeUploadedFile(customerFileName) {

        const file = this.page.getByText(customerFileName, { exact: true });

        await this.waitForElementToBeVisible(file);
        const customerFileExist = await this.isElementVisible(file,10000);

        if (customerFileExist) {

            await this.performClick(file);
            await this.waitForElementToBeVisible(this.fileUploadSection);
            await this.page.waitForTimeout(4000);

        } else {

            console.error(`${customerFileName} is not present in the customer files section`);
            return false;
        }

        const isRemoveBtnExist = await this.isElementVisible(this.removeBtn,10000);
        const isFileExist = await this.isElementVisible(this.uploadedFile,10000);

        if (isFileExist && isRemoveBtnExist) {
            await this.performClick(this.removeBtn);
            await this.page.waitForTimeout(2000);
            await this.waitForElementToBeVisible(this.removePopup);
            await this.isElementVisible(this.removePopup,10000);
            await this.performClick(this.removeConfirmBtn);
            await this.page.waitForTimeout(2000);

        } else {

            console.error(` File is not exist and remove button is not visible:${customerFileName}`);
        }
    }

    async isFieldValidationIsVisible(locator,message){
   
        const validationMsg =await this.isValidationMessageIsVisible(locator);
        expect(validationMsg).toContain(message);

    }

    async clickCRCheckList(){
        
        await this.performClick(this.crCheckListBtn);
    }

    async clickSubmitBtn(){
        
        await this.performClick(this.crChecklistSubmitBtn);
    }

    async inputHHAName(hhaName){

       await this.typeText(this.hhaNameField,hhaName)

    }

    async inputMedCareProviderNumber(number){

        await this.typeText(this.medicareProviderNumberField,number);
 
     }

     async inputHHAAddress(address){

        await this.typeText(this.hhaAddressField,address)
 
     }

     async inputCity(city){

        await this.typeText(this.hhaCityField,city)
 
     }

     async inputZipCode(zipCode){

        await this.typeText(this.hhaZipField,zipCode)
 
     }

     async inputDateofCertifiedMedicare(date){

        await this.typeText(this.hhaMedicareCertifiedDateField,date)
 
     }

     async selectState(state){

        try{
             await this.selectByLabel(this.hhaStateField,state);
        }catch(error){
            console.log(error);
        }
     }

     async selectTypeOfOrganization(organization){

        await this.selectByLabel(this.hhaTypeOfOrganizationField,organization);
     }

     async inputHHAPersonalInformation(hhaName,number,address,city,state,zipCode,date,organization){

        await this.inputHHAName(hhaName);
        await this.inputMedCareProviderNumber(number);
        await this.inputHHAAddress(address);
        await this.inputCity(city);
        await this.selectState(state);
        await this.inputZipCode(zipCode);
        await this.inputDateofCertifiedMedicare(date);
        await this.selectTypeOfOrganization(organization);

     }

     async isCrCheckListSubmittedPopupIsVisible(){
        await this.waitForElementToBeVisible(this.crCheckListSubmittedPopup,10000);
        let returnValue =await this.isElementVisible(this.crCheckListSubmittedPopup,10000);
        return returnValue; 
     }
    

     async clickOnSubmittedPopupOkBtn(){

        await this.performClick(this.submittedPopupOkBtn);

     }
    













}
module.exports = MyCostReportPage;