import { RouteComposite } from "src/utils/routes_composite";
import { BookPlus, Calendar, Table, User } from "lucide-react";
import Profile from "./profile";

const user = {
    isTa: () => 'ta'
}

const root = new RouteComposite('', undefined, 'public', <Profile />)
const students = new RouteComposite('students', undefined, 'public', <Profile />)
const teachers = new RouteComposite('teachers', undefined, 'public', <Profile />)

// student routes
root.add(students)
students.add(new RouteComposite('profile', User, 'public', <Profile />))
students.add(new RouteComposite('register', BookPlus, 'public', <Profile />))
students.add(new RouteComposite('timetable', Calendar, 'public', <Profile />))
students.add(new RouteComposite('grades', Table, 'public', <Profile />))
user.isTa() == 'ta' ? students.add(new RouteComposite('attendance', Calendar, 'public', <Profile />)) : null

root.add(teachers)
