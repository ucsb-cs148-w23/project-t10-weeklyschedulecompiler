const { google } = require('googleapis');

const User = require('../models/userModel');
const Group = require('../models/groupModel');
const config = require('../config');

async function getUserEvents(req, res) {
  const googleId = req.params.id;

  const user = await User.findOne({ googleId: googleId });

  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }

  res.status(200).json(user.events);
}

async function updateUserEvents(req, res) {
  let user = await User.findOne({ googleId: req.body.id });

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
      ]);
  });

  console.log(userEvents);
  const userEventsResponse = await User.findOneAndUpdate(
    { googleId: req.body.id },
    {
      events: userEvents,
    }
  );

  res.status(200).json({
    message: 'User events updated successfully',
    events: userEvents,
  });
}

async function getUserGroups(req, res) {
  const googleId = req.params.id;

  const user = await User.findOne({ googleId: googleId });

  console.log(user);

  if (!user) {
    res.status(404).json({ error: 'No such user' });
  }

  res.status(200).json(user.groupIds);
}

async function getUserGroupsInfo(req, res) {
  const googleId = req.params.id;

  const user = await User.findOne({ googleId: googleId });

  const groupInfo = [];

  if (!user) {
    res.status(404).json({ error: 'No such user' });
  }

  for (let i = 0; i < user.groupIds.length; i++) {
    const group = await Group.findOne({ _id: user.groupIds[i] });
    groupInfo.push(group);
  }

  res.status(200).json(groupInfo);
}

async function addUserEvent(req,res) {
  // get user
  const googleId = req.params.id;
  const user = await User.findOne({ googleId: googleId });
  const eventName = req.body.eventName;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  // push new event to their events array
  user.events.push([eventName, startTime, endTime]);
  user.events = [...new Set(user.events)];
  user.save();

  res.status(200).json(events);

}

module.exports = {
  getUserEvents,
  updateUserEvents,
  getUserGroups,
  getUserGroupsInfo,
  addUserEvent,
};
