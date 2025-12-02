
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>Oops! Page Not Found</h2>
                <p>
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>
                <Link to="/" className="home-btn">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
