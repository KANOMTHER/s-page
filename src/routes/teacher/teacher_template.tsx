import Sidebar from '../../components/shared/sidebar';
import ProtectedRoute from '../protect_route';
import { teachernode } from '../routes';
import { IsRole } from '@/routes/protect_route'


const TeacherNav = () => {
	return (
    <ProtectedRoute rule={<IsRole role='teacher' />}>
			<Sidebar routeNode={teachernode} />
		</ProtectedRoute>
	);
};

export default TeacherNav;
