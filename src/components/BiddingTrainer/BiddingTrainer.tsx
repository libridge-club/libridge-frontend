import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PtBr from "../../i18n/PtBr";
import HTTPClient from "../../HTTPClient";



function BiddingTrainer() {

    const messages = useMemo(() => new PtBr(), []);
    const myHttpClient = useMemo(() => new HTTPClient(), []);
    const [boardInPbnStringFormat, setBoardInPbnStringFormat] = useState("");

    const handleSubmitForm = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
        event.preventDefault();
        setBoardInPbnStringFormat("");
        const callApiAndUpdateState = async () => {
            const randomBoard = await myHttpClient.getRandomBoard();
            if (!randomBoard) {
                alert(messages.error_failedToConnectToServer());
                return;
            }
            setBoardInPbnStringFormat(randomBoard["pbnDealTag"]);
        }
        callApiAndUpdateState();
    }, [setBoardInPbnStringFormat, messages, myHttpClient])


    return (
        <div className="BiddingTrainer" >
            <div className="HomeScreenLink" >
                <Link to="/" className="btn btn-primary">
                    <button type="button">
                        Go back to Home
                    </button>
                </Link>
            </div>

            <form className='BiddingTrainer_form' method="get" onSubmit={handleSubmitForm}>
                <button className='BiddingTrainer_drawNewBoardButton' type="submit">
                    {messages.drawRandomBoard()}
                </button>
            </form>

            {boardInPbnStringFormat}
        </div>
    );
}

export default BiddingTrainer