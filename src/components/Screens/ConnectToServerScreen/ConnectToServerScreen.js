import { useState } from "react";

export default function ConnectToServerScreen({submitHandler}) {

    const [formNickname, setFormNickname] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        submitHandler(formNickname);
    }
    
    return <div className="ConnectForm">
        <form onSubmit={handleSubmit}>
            <label>Choose your nickname: 
                <input type="text" value={formNickname} onChange={(e) => setFormNickname(e.target.value)}/>
            </label>
            <button>Connect</button>
        </form>
    </div>
    
}


    
