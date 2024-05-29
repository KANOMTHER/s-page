import { RouteComposite } from '../utils/routes_composite';
import { BookPlus, Calendar, LogIn, Table, User } from 'lucide-react';
import Root from './root';
import StudentNav from './student/student_template';
import StudentProfile from './student/profile';
import Register from './student/register';
import STimetable from './student/timetable';
import Login from './login';
import Grades from './student/grade';
import TATimetable from './student/ta_timetable';
import TeacherProfile from './teacher/profile';
import TeacherNav from './teacher/teacher_template';
import AddGrade from './teacher/addgrade';

const user = {
	isTa: () => 'ta',
};

const root = new RouteComposite('', undefined, 'public', <Root />);
const students = new RouteComposite('students', undefined, 'public', <StudentNav />);
const teachers = new RouteComposite('teachers', undefined, 'public', <TeacherNav />);
const login = new RouteComposite('', LogIn, 'public', <Login />);

root.add(login);

// student routes
root.add(students);
students.add(new RouteComposite('profile', User, 'public', <StudentProfile />));
students.add(new RouteComposite('register', BookPlus, 'public', <Register />));
students.add(new RouteComposite('timetable', Calendar, 'public', <STimetable />));
students.add(new RouteComposite('grades', Table, 'public', <Grades />));
user.isTa() == 'ta'
	? students.add(new RouteComposite('assistance_class', Calendar, 'public', <TATimetable />))
	: null;

// instructor routes
root.add(teachers);
teachers.add(new RouteComposite('profile', User, 'public', <TeacherProfile />));
teachers.add(new RouteComposite('grade', Table, 'public', <AddGrade />));

export { root as rootnode, students as studentnode, teachers as teachernode, login as loginnode };
