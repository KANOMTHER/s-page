import Sidebar from '../../components/shared/sidebar';
import ProtectedRoute from '../protect_route';
import { teachernode } from '../routes';

const TeacherNav = () => {
	return (
    <ProtectedRoute role='teacher'>
			<Sidebar routeNode={teachernode} />
		</ProtectedRoute>
	);
};

export default TeacherNav;
