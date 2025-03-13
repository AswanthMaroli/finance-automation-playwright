const Actions = require("../uttilities/actions");
const MyCostReportPage = require("./mycostreport-page");

class DashboardPage extends Actions {


    constructor(page){
     
        // this.page =page;
        super(page);
        // this.actions = new Actions(page);
        this.costReportDiv = page.locator('//*[@id="ex1-tabs-1"]/div/div[1]');
        this.customerNameTitle =page.locator('h1.homebanner_text_org_Title');
        this.costReportTitle = page.locator('//*[@id="ex1-tabs-1"]/div/div/div/div[1]/p');

    }


    async clickCostReport(){

        
        await this.performClick(this.costReportDiv,{ timeout:5000 });
        return  new MyCostReportPage(this.page);
 
    }
    
    async isCostReportIsVisible() {
        
        await this.costReportDiv.waitFor();
        return await this.isElementVisible(this.costReportDiv,10000); 
    }

    async checkCostReportYear(year){

        await this.costReportTitle.waitFor();
        const text = await this.getText(this.costReportTitle);
        return text.includes(year); 
    }
        
    async isCustomerNameIsVisible(){

        return await this.isElementVisible(this.customerNameTitle,10000); 
          
    }

    async checkCustomerName(customername){

      let customerName= await this.getText(this.customerNameTitle);
       
      if(customerName == customername){

        return true;
        
      }

      return false;

    }
    



    }
module.exports = DashboardPage;