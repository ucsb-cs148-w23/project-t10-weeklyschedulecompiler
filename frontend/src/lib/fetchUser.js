export const fetchUserGroups = (user) => {
  fetch(`https://project-t10-schedulecompiler.herokuapp.com/api/user/groups/${user.user.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('failed to fetch events');
    })
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    });
};
