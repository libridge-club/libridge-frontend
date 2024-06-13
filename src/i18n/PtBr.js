import En from "./En";

export default class PtBr extends En{
    correct = () => "Correto!";
    drawRandomHand = () => "Nova mão aleatória";
    error_failedToConnectToServer = () => "Falha na conexão com o servidor :("
    error_failedToGetBidFromServer = () => "Falha ao buscar voz esperada :(";
    theExpectedBidWas = (expectedBid,bid) => "A voz esperada era " + expectedBid + " mas você disse " + bid;
}
