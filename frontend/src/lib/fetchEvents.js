/* istanbul ignore file */
import { config } from '../Constants';

export async function fetchUserEvents(user) {
  const response = await fetch(config.url + '/api/user', {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 200) {
    const responseJson = await response.json();
    const events = responseJson?.events.map((event, idx) => {
      return {
        id: idx,
        text: event[0],
        start: event[1],
        end: event[2],
      };
    });
    return events;
  } else {
    return [];
  }
}

export async function checkGroup(url, user) {
  const groupResponse = await fetch(url, {
    method: 'GET',
  });
  const groupResponseJson = await groupResponse.json();
  for (const member of groupResponseJson.groupMembers) {
    if (member[0] === user.user.id) {
      return { exists: true, group: groupResponseJson };
    }
  }
  return { exists: false, group: null };
}

export async function fetchGroupEvents(url, hideId) {
  const receivedEvents = await fetch(url, {
    method: 'GET',
  });
  let groupEvents = await receivedEvents.json();

  groupEvents = groupEvents.map((event, idx) => {
    return {
      id: idx,
      text: event[3] + "'s Event",
      start: event[1],
      end: event[2],
      userId: event[4],
    };
  });

  for (let i = 0; i < hideId.length; i++) {
    groupEvents = groupEvents.filter((event) => {
      return event.userId !== hideId[i];
    });
  }

  return groupEvents;
}

export async function updateGroupMemberEvents(groupId, userId) {
  const response = await fetch(
    config.url + '/api/group/events/member' + groupId,
    {
      method: 'PATCH',
      body: JSON.stringify({ id: userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const { events } = await response.json();
  return events;
}

export async function hideGroupMemberEvents(groupId, userId) {
  const response = await fetch(
    config.url + '/api/group/events/member/hide' + groupId,
    {
      method: 'PATCH',
      body: JSON.stringify({ id: userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const { events } = await response.json();
  return events;
}

export async function getFreeTime(groupId, range) {
  const response = await fetch(config.url + '/api/group/free' + groupId, {
    method: 'PATCH',
    body: JSON.stringify(range),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const events = await response.json();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const freeTimes = events.map((event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);

    return {
      ...event,
      start: start.toLocaleString('en-US', { timeZone: timezone }),
      end: end.toLocaleString('en-US', { timeZone: timezone }),
    };
  });

  console.log(freeTimes);
  // return freeTimes;
}

export async function hideGroupMemberEvents(groupId, userId) {
  const response = await fetch(
    config.url + '/api/group/events/member/hide' + groupId,
    {
      method: 'PATCH',
      body: JSON.stringify({ id: userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const { events } = await response.json();
  return events;
}
