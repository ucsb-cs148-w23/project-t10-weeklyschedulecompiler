const Group = require('../models/groupModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const passport = require('passport');
const { calendar } = require('googleapis/build/src/apis/calendar');
const config = require('../config');
const { google } = require('googleapis');

const getGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such group' });
  }

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: 'No such group' });
  }

  res.status(200).json(group);
};

const createGroup = async (req, res) => {
  const groupName = req.body.groupName;
  const email = req.body.email;
  const username = req.body.username;
  const googleId = req.body.googleId;

  // add to the database
  try {
    const group = await Group.create({
      name: groupName,
      groupMembers: [[googleId, username, email]],
      calendarEvents: [],
    });

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: 'No such user' });
    }

    user.groupIds.push(group._id);
    user.save();

    updateGroupEventsHelper(group.groupMembers);

    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such group' });
  }

  const group = await Group.findOneAndDelete({ _id: id });

  if (!group) {
    return res.status(400).json({ error: 'No such group' });
  }

  res.status(200).json(group);
};

const updateGroup = async (req, res) => {
  const { id } = req.params;
  const email = req.body.email;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such group' });
  }

  let user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  user.groupIds.push(id);
  user.groupIds = [...new Set(user.groupIds)];
  user.save();

  let group = await Group.findOne({ _id: id });

  if (!group) {
    return res.status(400).json({ error: 'No such group' });
  }

  group.groupMembers.push([user.googleId, user.name, email]);
  group.groupMembers = [...new Set(group.groupMembers)];

  updateGroupEventsHelper(group.groupMembers);

  group.save();

  res.status(200).json(group);
};

const updateGroupDeleteMember = async (req, res) => {
  const { id } = req.params;
  const email = req.body.email;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such group' });
  }

  let user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  //delete groupId from specific user
  let index = user.groupIds.indexOf(id);
  user.groupIds.splice(index, 1);
  user.save();

  let group = await Group.findOne({ _id: id });

  if (!group) {
    return res.status(400).json({ error: 'No such group' });
  }

  //delete email of that person from groupMembers
  for (let i = 0; i < group.groupMembers.length; i++) {
    if (group.groupMembers[i][2] === email) {
      group.groupMembers.splice(i, 1);
    }
  }

  updateGroupEventsHelper(group.groupMembers);

  group.save();

  res.status(200).json(group);
};

const getGroupEvents = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such group' });
  }

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: 'No such group' });
  }

  const groupEvents = group.calendarEvents;

  res.status(200).json(groupEvents);
};

const updateGroupEvents = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such group' });
  }

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: 'No such group' });
  }
  const updatedEvents = await updateGroupEventsHelper(group.groupMembers);

  const userEventsResponse = await Group.findOneAndUpdate(
    { groupId: id },
    {
      calendarEvents: updatedEvents,
    }
  );

  res.status(200).json({
    message: 'Group Events successfully updated',
    calendarEvents: updatedEvents,
  });
};

async function updateGroupEventsHelper(groupMembers) {
  let allUserEvents = [];
  console.log(groupMembers);
  for (const member of groupMembers) {
    console.log(member);
    let user = await User.findOne({ googleId: member[0] });

    const credentials = {
      type: 'authorized_user',
      client_id: config.googleClientID,
      client_secret: config.googleClientSecret,
      refresh_token: user.refreshToken,
    };

    auth = google.auth.fromJSON(credentials);

    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = response.data.items;
    if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return;
    }
    console.log('Upcoming 10 events:');
    let userEvents = [];
    events.map((event, i) => {
      var options = { hour12: false };

      const start = event.start.dateTime || event.start.date;
      const end = event.end.dateTime;

      if (!event.start.dateTime.includes('T')) {
        return;
      }

      if (end)
        userEvents.push([
          event.summary,
          start.substring(0, start.lastIndexOf('-')),
          end.substring(0, end.lastIndexOf('-')),
          member[1],
        ]);
    });

    console.log(userEvents);
    const userEventsResponse = await User.findOneAndUpdate(
      { googleId: member[0] },
      {
        events: userEvents,
      }
    );

    allUserEvents = [...allUserEvents, ...userEvents];
  }

  return allUserEvents;
}

module.exports = {
  getGroup,
  createGroup,
  deleteGroup,
  updateGroup,
  updateGroupDeleteMember,
  getGroupEvents,
  updateGroupEvents,
};
