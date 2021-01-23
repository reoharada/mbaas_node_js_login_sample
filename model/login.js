const crypto = require('crypto');
const conf = require('config');
const NCMB = require('ncmb');
const ncmb = new NCMB(conf.application_key, conf.client_key);

module.exports = {
    login: (address, password) => {
        const sha256 = crypto.createHash('sha256');
        sha256.update(password);
        const encoding = 'base64';
        const sha256hash = sha256.digest(encoding);
        const user = new ncmb.User({
            userName: address,
            password: sha256hash,
        });
        const isLogin = ncmb.User.login(user)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
        return isLogin;
    },
    logout: (sessionToken) => {
        const user = new ncmb.User({sessionToken: sessionToken});
        user.logout();
    },
    isSessionEnabled: (userId, sessionToken) => {
        ncmb.sessionToken = sessionToken;
        const now = new Date();
        const updateSuccess = ncmb.request({
            path: '/' + ncmb.version + '/users/' + userId,
            method: "PUT",
            data: {loginDate: now}
        }).then( (data) => {
            return true;
        }).catch( (err) => {
            console.log(err);
            return false;
        });
        return updateSuccess;
    },
};
