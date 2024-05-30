import Sidebar from '../../components/shared/sidebar';
import ProtectedRoute from '../protect_route';
import { studentnode } from '../routes';
import { IsRole } from '@/routes/protect_route'

const StudentNav = () => {
	return (
		<ProtectedRoute rule={<IsRole role="student" />}>
			<Sidebar routeNode={studentnode} />
		</ProtectedRoute>
	);
};

export default StudentNav;
