const crypto = require('crypto');
const conf = require('config');
const NCMB = require('ncmb');
const ncmb = new NCMB(conf.application_key, conf.client_key);
const loginModel = require('./login');

module.exports = {
    regist: (address, password) => {
        const sha256 = crypto.createHash('sha256');
        sha256.update(password);
        const encoding = 'base64';
        const sha256hash = sha256.digest(encoding);
        const user = new ncmb.User();
        user.set('userName', address)
        .set('password', sha256hash)
        .set('mailAddress', address);
        const loginUser = user.signUpByAccount()
        .then( async (data) => {
            return await loginModel.login(address, password);
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
        return loginUser;
    },
};
