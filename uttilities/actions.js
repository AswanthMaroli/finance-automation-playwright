 class Actions{

    constructor(page){

        this.page = page;
    }

    async performClick(locator){
        
        await  locator.click();
    }
    
    async clear(locator){

        await locator.fill('');
    }

    async typeText(locator,value){
        await this.clear(locator);
        await locator.fill(value);
    }

    async selectByValue(locator, value) {
        await locator.selectOption({ value });
    }

    async selectByLabel(locator, label) {
        await locator.selectOption({ label });
    }

    async selectByIndex(locator, index) {
        await locator.selectOption({ index });
    }

    async getText(locator) {
        return await locator.innerText();
    }

    async uploadFile(locator, filePath) {
        await locator.setInputFiles(filePath);
        
        
        await this.page.waitForTimeout(1000);
        const uploadedFiles = await locator.evaluate(el => el.files.length);
        
        if (uploadedFiles === 0) {
            console.log("Re-uploading file as it was cleared!");
            await locator.setInputFiles(filePath); // Re-upload
        }
    }

    async dragAndDrop(sourceLocator, targetLocator) {
        await sourceLocator.dragTo(targetLocator);
    }

    async isElementVisible(locator,timeout = 30000) {
        return await locator.isVisible({timeout});
    }

    async isElementEnabled(locator) {
        return await locator.isEnabled(); 
    }
    
    async getCurrentURL(){
        return await this.page.url();
    }

    async waitForElementToBeVisible(locator,timeout=10000){


        await locator.waitFor({ state: 'visible', timeout });

    }

    async isValidationMessageIsVisible(locator){

        let validationMsg = await this.getText(locator);
        return validationMsg;
    }
}

module.exports = Actions;