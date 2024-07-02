import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const WrappingUp: React.FC = () => {
    const params = useParams();
    const characterId = params['id' as keyof typeof params];
    return (
        <div>
            <p>
                You're all done! The only thing left is to&nbsp;
                <Link to={`/Characters/${characterId}`}>
                    View Your Character Sheet
                </Link>.
            </p>
        </div>
    );
}