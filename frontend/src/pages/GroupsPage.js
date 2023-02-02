import CreateGroupButton from '../components/Buttons/CreateGroupButton';
import Groups from '../components/Group/Groups';
import DefaultLayout from '../layouts/DefaultLayout';

export default function GroupsPage() {
  return (
    <DefaultLayout
      header={'Groups'}
      centered={false}
      component={<CreateGroupButton />}
    >
      <Groups />
    </DefaultLayout>
  );
}
