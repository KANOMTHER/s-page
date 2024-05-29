import axfetch from '@/utils/axfetch';

export const getStudent = async (id: number) => {
  const res = await axfetch.get(`/api/student/${id}`);
  return res.data.message;
};

export const getRegisteredClass = async (id: number, semester?: number, year?: number) => {
  const res = await axfetch.post('/api/timetable/student', {
    studentId: id,
    semester: semester,
    year: year,
  });
  return res.data.message;
};

export const getTAClass = async (id: number, semester?: number, year?: number) => {
  const res = await axfetch.post('/api/timetable/ta', {
    studentId: id,
    semester: semester,
    year: year,
  });
  return res.data.message;
}

// export const getGrade = async ()