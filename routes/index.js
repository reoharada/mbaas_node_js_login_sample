const express = require('express');
const router = new express.Router();
const loginModel = require('../model/login');

router.get('/', async (req, res) => {
    const sessionToken = req.cookies['WC-SESSION-TOKEN'];
    const userId = req.cookies['USER-ID'];
    let isLogin = false;
    if (typeof sessionToken !== 'undefined' && typeof userId !== 'undefined') {
        isLogin = await loginModel.isSessionEnabled(userId, sessionToken);
    }
    const message = 'Hello World!';
    res.render('landing', {message: message, isLogin: isLogin});
});

module.exports = router;
