import CryptoJS from "crypto-js";


const encrypt = (plain_text:string, secret: string) => {
   const  encrypted = CryptoJS.AES.encrypt(plain_text, secret, {
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.AnsiX923
  });
  return encrypted.toString()
};


const decrypt = (cipher_text: any, secret: string) =>  {
    const bytes = CryptoJS.AES.decrypt(cipher_text, secret, {
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.AnsiX923
      });
    return bytes.toString(CryptoJS.enc.Utf8)
}

export { encrypt, decrypt };
