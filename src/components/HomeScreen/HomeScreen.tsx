import { Link } from 'react-router-dom';

function HomeScreen() {

    return (
        <div className="HomeScreen" >
            <Link to="/openingTrainer">
                <button type="button">
                    Go to Opening Trainer
                </button>
            </Link>
        </div>
    );
}

export default HomeScreen