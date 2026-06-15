import { test } from "../fixture/BaseFixture.ts";
import testData from "../test-data/testFile.json";

test("Invalid Route", async ({ homePage }) => {

    await homePage.AbhiBusURL();
    await homePage.fromInputField(testData.Invalid_Journey_Detail.BOARDING_CITY);
    await homePage.toInputField(testData.Invalid_Journey_Detail.DESTINATION_CITY);
    await homePage.selectDate(testData.Invalid_Journey_Detail.DATE_OF_JOURNEY);
    await homePage.pressSearchButton();

    await homePage.verifyNoServiceMessage();
})