import { test, expect } from "@playwright/test";

const baseURL = "https://services.costreport.net/api";
const jsonData = JSON.parse(JSON.stringify(require('../../test-data/api-testdata.json')))

test("Authenticate",async ( { request } ) =>{

  const response = await request.post(`${baseURL}/Login/Authenticate`,{

    data:{
        "Email":jsonData.Email,
        "Password":jsonData.Password
    },
    headers:{
        "Content-Type": "application/json",
    }
  });

    console.log(await response.json());
    expect(response.status()).toBe(200);
    var res = await response.json();
    console.log("UserID: ", res.UserID);
    console.log("UserName: ", res.Name);
    expect(res.UserID).toEqual(jsonData.ID);
    expect(res.Email).toEqual(jsonData.Email);
    expect(res.Name).toEqual(jsonData.Name);


});
