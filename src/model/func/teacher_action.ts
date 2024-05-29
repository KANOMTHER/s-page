import axfetch from '@/utils/axfetch';
import type { Teacher } from '@/model/types/teacher_schema';

export const updateTeacher = async (id: number, body: Teacher) => {
	const res = await axfetch
		.put(`/api/professor/update/${id}`, {
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

