import { test, expect } from "../fixture/BaseFixture";
import { ENV } from "../config/env";
import testData from "../test-data/testFile.json";

test.describe("Bus Booking Flow", () => {

  test.beforeAll(async ({ }, workerInfo) => {
    console.log("beforeAll");
    console.log("worker:", workerInfo.workerIndex);
    console.log("Workers are assign for the test execution.")
  });

  //beforeEach hook that execute before every test starts executing
  test.beforeEach(async ({ homePage }) => {
    await homePage.AbhiBusURL();
    await homePage.fromInputField(testData.Journey_Detail.BOARDING_CITY);
    await homePage.toInputField(testData.Journey_Detail.DESTINATION_CITY);
    await homePage.selectDate(testData.Journey_Detail.DATE_OF_JOURNEY);
    await homePage.pressSearchButton();
  });
  
  test("Singel seat selection", { tag: '@regression' }, async ({ page, busfilter, passengerInfoPage, paymentpage, priceSlider }) => {
    test.setTimeout(600000);

    await page.waitForLoadState("load");

    await busfilter.boardingPointStatus();
    await busfilter.selectingBoardingCity();
    await page.waitForTimeout(2000);
    await busfilter.droppingPointStatus();
    await busfilter.selectingDroppingCity();
    await busfilter.busFilter();
    await page.waitForTimeout(2000);
    await priceSlider.setPriceRange(800, 2000);

    await busfilter.selectBusSeat(1);
    await busfilter.selectBoardingPoint();
    await busfilter.selectDroppingPoint();

    await passengerInfoPage.ClosingLoginModel();
    await passengerInfoPage.FillingUserInfo(testData.BOOKING_DETAILS.contactDetails, testData.BOOKING_DETAILS.passengers);

    await paymentpage.selectingpaymentOption();
    await paymentpage.GenerateQRCode();
  });

  test("Multiple Seat selection", { tag: "@smoke" }, async ({ page, busfilter, passengerInfoPage, paymentpage }) => {

    await page.waitForLoadState("load");

    await busfilter.boardingPointStatus();
    await busfilter.selectingBoardingCity();
    await page.waitForTimeout(2000);
    await busfilter.droppingPointStatus();
    await busfilter.selectingDroppingCity();
    await busfilter.busFilter();
    await page.waitForTimeout(2000);
    
    await busfilter.selectBusSeat(2);
    await busfilter.selectBusSeat(3);

    await busfilter.selectBoardingPoint();
    await busfilter.selectDroppingPoint();

    await passengerInfoPage.ClosingLoginModel();
    await passengerInfoPage.FillingUserInfo(ENV.BOOKING_DETAILS.contactDetails, ENV.BOOKING_DETAILS.passengers);

    await page.waitForLoadState("domcontentloaded");

    await paymentpage.selectingpaymentOption();
    await paymentpage.GenerateQRCode();
  });

})
