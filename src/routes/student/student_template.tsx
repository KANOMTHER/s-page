import Sidebar from '../../components/shared/sidebar';
import ProtectedRoute from '../protect_route';
import { studentnode } from '../routes';

const StudentNav = () => {
	return (
		<ProtectedRoute role='student'>
			<Sidebar routeNode={studentnode} />
		</ProtectedRoute>
	);
};

export default StudentNav;
