export default class En {
    correct = () => "Correct!";
    drawRandomHand = () => "Draw random hand";
    error_failedToConnectToServer = () => "Failed to connect to server :("
    error_failedToGetBidFromServer = () => "Failed to get expected bid from server :(";
    theExpectedBidWas = (expectedBid,bid) => "The expected bid was " + expectedBid + " but you bid " + bid;
}