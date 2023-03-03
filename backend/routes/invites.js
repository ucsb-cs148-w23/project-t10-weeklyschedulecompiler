const express = require('express');

const router = express.Router();

const {
    sendInvite,
    acceptInvite,
    declineInvite,
} = require('../controllers/inviteController');

router.patch('/send', sendInvite);

router.patch('/accept', acceptInvite);

router.patch('/decline', declineInvite);

module.exports = router;
