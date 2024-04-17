import Sidebar from './sidebar';
import { studentnode } from './routes';

const StudentNav = () => {
  return (
    <div>
      <Sidebar routeNode={studentnode} />
    </div>
  );
};

export default StudentNav;
