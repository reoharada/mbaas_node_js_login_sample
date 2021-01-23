const express = require('express');
const loginModel = require('../model/login');
const router = new express.Router();

router.post('/', async (req, res) => {
    const sessionToken = req.cookies['WC-SESSION-TOKEN'];
    const userId = req.cookies['USER-ID'];
    let isLogin = false;
    if (typeof sessionToken !== 'undefined' && typeof userId !== 'undefined') {
        isLogin = await loginModel.logout(sessionToken);
    }
    res.clearCookie('WC-SESSION-TOKEN');
    res.clearCookie('USER-ID');
    res.redirect('/')
});

module.exports = router;
