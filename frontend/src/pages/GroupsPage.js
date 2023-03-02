import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateGroupButton from '../components/Buttons/CreateGroupButton';
import Groups from '../components/Group/Groups';
import DefaultLayout from '../layouts/DefaultLayout';
import { checkUser } from '../lib/fetchUser';
import { fetchGroups } from '../lib/handleGroup';

export default function GroupsPage({ user }) {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    async function localCheckUser() {
      const user = await checkUser();
      if (user?.authenticated === false) navigate('/');
      setTimeout(async () => {
        const groups = await fetchGroups(user);
        setGroups(groups);
        setLoading(false);
      }, 100);
    }
    if (loading) {
      localCheckUser();
    }
  });

  return (
    <div className='background'>
    <GroupsPageLayout header={'Groups'} component={<CreateGroupButton />}>
      <Groups groups={groups} />
      {/* <UpdateUserEventsButton user={user} handler={updateEvents} /> */}
      {events.map((event, i) => {
        return (
          <div>
            <div>{i}</div>
            <div>{event[0]}</div>
            <div>{event[1]}</div>
            <div>{event[2]}</div>
          </div>
        );
      })}
    </GroupsPageLayout>
    </div>
  );
}
