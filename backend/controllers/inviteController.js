const Group = require('../models/groupModel');
const User = require('../models/userModel');

// Patch request that sends invites to user
async function sendInvite(req, res) {
    // request body should have groupId, groupName, and email
    const groupId = req.body.groupId;
    const groupName = req.body.groupName;
    const email = req.body.email;

    // find user with email
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ error: 'No such user' });
    }

    // check if user already has invite from group
    if (!user.groupIds.includes(groupId) && !user.invites.some((invite) => invite[0] === groupId)) {
        user.invites.push([groupId, groupName]);
    }

    user.save();

    res.status(200).json({ message: 'Invite sent', user: user });
}

async function acceptInvite(req, res) {
    const googleId = req.body.id;
    const groupId = req.body.groupId;

    const user = await User.findOne({ googleId: googleId });
    const group = await Group.findOne({ _id: groupId });

    if (!user) {
        return res.status(400).json({ error: 'No such user' });
    }

    // Whether group exists or not, remove invite from user
    user.invites = user.invites.filter((invite) => invite[0] !== groupId);

    // Check if group exists (may have been deleted before invite is accepted)
    if (!group) {
        return res.status(400).json({ error: 'No such group' });
    }

    // Add user to group
    if (!user.groupIds.includes(groupId)) {
        user.groupIds.push(groupId);
        user.save();
    }

    if (!group.groupMembers.some((member) => member[0] === user.googleId)) {
        group.groupMembers.push([user.googleId, user.name, user.email]);
        group.save();
    }

    res.status(200).json({ message: 'Invite accepted', user: user });
}

async function declineInvite(req, res) {
    const googleId = req.body.id;
    const groupId = req.body.groupId;

    const user = await User.findOne({ googleId: googleId });

    if (!user) {
        return res.status(400).json({ error: 'No such user' });
    }

    user.invites = user.invites.filter((invite) => invite[0] !== groupId);
    user.save();

    res.status(200).json({ message: 'Invite declined', user: user });
}

module.exports = {
    sendInvite,
    acceptInvite,
    declineInvite,
};