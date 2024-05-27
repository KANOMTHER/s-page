import axfetch from '@/utils/axfetch';

export const getStudent = async (id: number) => {
  const res = await axfetch.get(`/api/student/${id}`);
  return res.data.message;
};

// todo: change this to get registered classes
export const getRegisteredClass = async (id: number, semester?: number, year?: number) => {
  const res = await axfetch.post('/api/student/schedule', {
    studentId: id,
    semester: semester,
    year: year,
  });
  return res.data.message;
};