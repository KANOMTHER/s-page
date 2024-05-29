import axfetch from '@/utils/axfetch';

export const getTeacher = async (id: number) => {
  const res = await axfetch.get(`/api/professor/${id}`);
  return res.data.message;
};

export const getClassByYear = async (semester?: number, year?: number) => {
  const res = await axfetch.get('/api/class/semester-year', {
    params: {
      semester: semester,
      year: year,
    },
  });
  return res.data.message;
}

export const getStudentByClass = async (classId: string) => {
  const res = await axfetch.get('/api/grade/'+classId);
  return res.data.message;
}