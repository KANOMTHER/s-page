import { RouteComposite } from '../utils/routes_composite';
import { BookPlus, Calendar, LogIn, Table, User } from 'lucide-react';
import Profile from './profile';
import Root from './root';
import StudentNav from './student_header';
import StudentProfile from './student/profile';
import Register from './student/register';
import STimetable from './student/timetable';
import Login from './login';
import Grades from './student/grade';


const user = {
	isTa: () => 'ta',
};

const root = new RouteComposite('', undefined, 'public', <Root />);
const students = new RouteComposite('students', undefined, 'public', <StudentNav />);
const teachers = new RouteComposite('teachers', undefined, 'public', <Profile />);
const login = new RouteComposite('', LogIn, 'public', <Login />);

root.add(login);

// student routes
root.add(students);
students.add(new RouteComposite('profile', User, 'public', <StudentProfile />));
students.add(new RouteComposite('register', BookPlus, 'public', <Register />));
students.add(new RouteComposite('timetable', Calendar, 'public', <STimetable />));
students.add(new RouteComposite('grades', Table, 'public', <Grades />));
user.isTa() == 'ta'
	? students.add(new RouteComposite('assistance_class', Calendar, 'public', <Profile />))
	: null;

root.add(teachers);

export { root as rootnode, students as studentnode, teachers as teachernode, login as loginnode };
