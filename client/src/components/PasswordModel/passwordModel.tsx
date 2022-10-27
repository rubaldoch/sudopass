import { FC, useState } from "react";
import { Tooltip } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
    const [copyMessage, setCopyMessage] = useState("Copy Password");

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopyMessage("Copied!");
        setTimeout(() => {
            setCopyMessage("Copy Password");
        }
        , 2000);
    }

    return (
        <div className="password-model">
            <div className="password-info">
                {iconUrl && <img src={iconUrl} className="password-icon" alt="icon"/>}
                <div className="password-info-text">
                    <span>{alias}</span>
                    <span className="password-info-text-domain">{domain}</span>
                </div>
                <div className="password-secret">
                    <Tooltip title={copyMessage} placement="top">
                        <input type="password" value={password} readOnly onClick={()=>handleCopy()}/>
                    </Tooltip>
                    <ContentCopyIcon sx={{fontSize:15}}/>
                </div>
                <div className="password-buttons">
                    <Tooltip title="Edit Password" placement="right">
                        <div className="password-button">
                            <CreateIcon fontSize="small"/>
                        </div>
                    </Tooltip>
                    <Tooltip title="View Password" placement="right">
                        <div className="password-button">
                            <VisibilityIcon fontSize="small"/>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};