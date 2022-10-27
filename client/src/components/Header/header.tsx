import { FC } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './header.css';

export const Header : FC = () => {
    return (
        <div className="header">
            <>​</>
            <h2>Sudopass</h2>
            <div className="profile-button">
                <AccountCircleIcon fontSize="large"/>
            </div>
        </div>
    );
}