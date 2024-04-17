import { RouteComposite } from '../utils/routes_composite';
import { BookPlus, Calendar, Table, User } from 'lucide-react';
import Profile from './profile';
import Root from './root';
import StudentNav from './student_header';
import StudentProfile from './student/profile';

const user = {
  isTa: () => 'ta',
};

const root = new RouteComposite('', undefined, 'public', <Root />);
const students = new RouteComposite('students', undefined, 'public', <StudentNav />);
const teachers = new RouteComposite('teachers', undefined, 'public', <Profile />);

// student routes
root.add(students);
students.add(new RouteComposite('profile', User, 'public', <StudentProfile />));
students.add(new RouteComposite('register', BookPlus, 'public', <Profile />));
students.add(new RouteComposite('timetable', Calendar, 'public', <Profile />));
students.add(new RouteComposite('grades', Table, 'public', <Profile />));
user.isTa() == 'ta'
  ? students.add(new RouteComposite('assistance_class', Calendar, 'public', <Profile />))
  : null;

root.add(teachers);

export { root as rootnode, students as studentnode, teachers as teachernode };
