const loginModel = require('./model/login');

const login = async () => {
    const address = 'reoharada@yahoo.co.jp';
    const password = 'hogehoge';
    const currentUser = await loginModel.login(address, password);
    console.log(currentUser);
}
//login();

const logout = () => {
    const sessionToken = 'NMf2csBLVCOgOs81ziurNc4kb';
    const isLogout = loginModel.logout(sessionToken);
}
//logout();

const checkLogin = async () => {
    const userId = 'mANrn8XIwgXtYUKO';
    const sessionToken = 'NMf2csBLVCOgOs81ziurNc4kb';
    const isLogin = await loginModel.isSessionEnabled(userId, sessionToken);
    console.log(isLogin);
}
//checkLogin();
