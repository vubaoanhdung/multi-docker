import React from "react";
import { Link } from "react-router-dom";

export default function OtherPage() {
    return (
        <div>
            Other Page
            <div>
                <Link to="/">Go back to Home Page</Link>
            </div>
        </div>
    );
}
