import axfetch from '@/utils/axfetch';
import type { Student } from '@/model/types/student_schema';

export const updateStudent = async (id: number, body: Student) => {
	const res = await axfetch
		.put(`/api/student/update/${id}`, {
			FName: body.FName,
			LName: body.LName,
			Email: body.Email,
			Phone: body.Phone,
		})
		.then((res) => {
			return res.data.message;
		});

	return res.json();
};
