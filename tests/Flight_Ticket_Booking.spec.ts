import { test } from '../fixture/BaseFixture.ts'
import testData from "../test-data/testFile.json";

test('Flight booking flow', async ({ page, homePage, flightsPage, flightFilter, flightPassengerInfoPage, seatSelectionPage, paymentpage }) => {
    test.setTimeout(600000);

    await homePage.AbhiBusURL();
    await flightsPage.goToFlightsTab();

    await flightsPage.selectOrigin('Ahmedabad', 'Sardar Vallabhbhai Patel International Airport');
    await flightsPage.selectDestination('Mumbai', 'Mumbai, Maharashtra, India');

    await flightsPage.selectDepartureDate('June 25, 2026');

    await flightsPage.setTravellers(4);

    await flightsPage.pressSearchButton();

    await flightFilter.closeDialogBox();

    await flightFilter.selectAirline();
    await flightFilter.priceSlider.dragToValue(8000);
    await flightFilter.durationSlider.dragToValue(10);
    await page.waitForTimeout(1000);
    await flightFilter.selectDepartureAndArrivalTime();
    await flightFilter.proceedToBook();

    await flightPassengerInfoPage.cancleFreeCancellation();
    await flightPassengerInfoPage.fillAllPassengers(testData.Flight_Passenger_Detail);

    await flightPassengerInfoPage.addEmailAddress();

    await flightPassengerInfoPage.proceedToBook();
    await seatSelectionPage.selectFirstNAvailableSeats(4);
    await seatSelectionPage.skipToPaymentPage();    
    
    await seatSelectionPage.handleFareIncreasePopup();

    await paymentpage.selectingpaymentOption();
    await paymentpage.GenerateQRCode();
});