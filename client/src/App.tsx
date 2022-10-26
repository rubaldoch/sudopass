import React from 'react';
import './App.css';
import { Header } from './components/Header/header';
import { PasswordModel } from './components/PasswordModel/passwordModel';

const fakePasswords = [
  {
    password: "password",
    domain: "google.com",
    alias: "google",
    iconUrl: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
  },
  {
    password: "password",
    domain: "facebook.com",
    alias: "facebook",
    iconUrl: "https://www.facebook.com/images/fb_icon_325x325.png"
  },
]


function App() {
  return (
    <div className='App'>
    <Header/>
    {fakePasswords.map((password) => (
        <PasswordModel
        password={password.password}
        domain={password.domain}
        alias={password.alias}
        iconUrl={password.iconUrl}
        />
      ))}
    </div>
  );
}

export default App;
