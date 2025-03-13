const { test, expect } = require("@playwright/test");

const baseURL = "https://services.costreport.net/api";
const jsonData = JSON.parse(JSON.stringify(require("../../test-data/api-testdata.json")));

test("CheckEmailExist?Email", async ({ request }) => {

    const response = await request.get(`${baseURL}/UserSignup/CheckEmailExist?Email=${jsonData[1].Email}`);

    expect(response.status()).toBe(200);
    var res = await response.json();
    console.log(res);

    if (res == true) {

        console.log("Email already exist");

    } else {

        console.log("Email is not exist , you can use it ");
    }
});


test("SignupUser", async ({ request }) => {

    const response = await request.post(`${baseURL}/UserSignup/SignupUser`, {

        data: {

            "UserID": jsonData[2].UserID,
            "FirstName": jsonData[2].FirstName,
            "LastName": jsonData[2].LastName,
            "HHAName": jsonData[2].HHAName,
            "HHAAddress": jsonData[2].HHAAddress,
            "City": jsonData[2].City,
            "State": jsonData[2].State,
            "Zip": jsonData[2].zip,
            "Email": jsonData[2].Email,
            "Phone": jsonData[2].Phone,
            "Password": jsonData[2].Password,
            "UserStatus": jsonData[2].UserStatus,
            "SignupDate": jsonData[2].SignupDate,
            "LoginTypeID": jsonData[2].LoginTypeID,
            "ModifiedUser": jsonData[2].ModifiedUser,
            "Validation": jsonData[2].Validation,
            "Message": jsonData[2].Message

        },

        headers: {

            "Content-Type": "application/json"
        }


    });

    expect(response.status()).toBe(200);
    var res = await response.json();
    expect(res.Saved).toBeTruthy();



});
