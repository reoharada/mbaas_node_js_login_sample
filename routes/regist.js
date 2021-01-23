const express = require('express');
const router = new express.Router();
const registModel = require('../model/regist');
const expireSecond = '86400';

router.post('/', async (req, res) => {
    const address = req.body.address;
    const password = req.body.password;
    const user = await registModel.regist(address, password);
    const userId = user.objectId;
    const sessionToken = user.sessionToken;
    if (typeof sessionToken !== 'undefined' && typeof userId !== 'undefined') {
        res.setHeader('Set-Cookie', [
            'USER-ID=' + userId + '; Max-Age=' + expireSecond,
            'WC-SESSION-TOKEN=' + sessionToken + '; Max-Age=' + expireSecond,
        ]);
    }
    res.redirect('/');
});

module.exports = router;
