import React from "react";
import { Link } from "react-router-dom";


export const StaticItemsIndicator: React.FC = () => (
    <div>
        You will also receive a <Link to="/Library/Equipment/Torch" target="_blank">torch</Link> and <Link to="/Library/Equipment/Lighter" target="_blank">lighter</Link>.
    </div>
)