import En from "./En";

export default class PtBr extends En{
    avoidPassHands = () => "Não mostrar mãos que passam."
    benDescription = () => "ben é uma engine de Bridge que utiliza IA. Siga o link para saber mais.";
    correct = () => "Correto!";
    drawRandomHand = () => "Nova mão aleatória";
    error_failedToConnectToServer = () => "Falha na conexão com o servidor :("
    error_failedToGetBidFromServer = () => "Falha ao buscar voz esperada :(";
    theExpectedBidWas = (expectedBid:string,bid:string) => "A voz esperada era " + expectedBid + " mas você escolheu " + bid;
    whoIsBen = () => "Quem é ben?";
}
