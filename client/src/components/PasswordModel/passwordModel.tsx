import { FC, useState } from "react";
import { Tooltip } from '@mui/material';
import './passwordModel.css';

interface IPasswordModelProps{
    password: string;
    domain: string;
    alias: string;
    iconUrl?: string;
};

export const PasswordModel:FC<IPasswordModelProps> = ({
    password, 
    domain,
    alias,
    iconUrl
}) => {
    const [copyMessage, setCopyMessage] = useState("Copy Message");

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopyMessage("Copied!");
        setTimeout(() => {
            setCopyMessage("Copy Message");
        }
        , 2000);
    }

    return (
        <div className="password-model">
            <div className="password-info">
                {iconUrl && <img src={iconUrl} className="password-icon" alt="icon"/>}
                <div className="password-info-text">
                    <span>{alias}</span>
                    <span>{domain}</span>
                </div>
                <div className="password-secret">
                    <Tooltip title={copyMessage} placement="top">
                        <input type="password" value={password} readOnly onClick={()=>handleCopy()}/>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};