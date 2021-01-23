const express = require('express');
const NCMB = require('ncmb');
const conf = require('config');
const crypto = require('crypto');
const ncmb = new NCMB(conf.application_key, conf.client_key);
const router = new express.Router();
const loginModel = require('../model/login');
const expireSecond = '86400';

router.post('/', async (req, res) => {
    const address = req.body.address;
    const password = req.body.password;
    const user = await loginModel.login(address, password);
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
