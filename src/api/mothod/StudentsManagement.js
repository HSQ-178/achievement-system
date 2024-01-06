import axios from "../axiosApi";

const baseURL = "/studentsAchievement";

export default {
  /**
   * 通过教师编号和教师姓名查询所有学生
   * @param {*} studentsData
   * @returns
   */
  findStudentsByTeacherIdAndTeacherName: (studentsData) => {
    return axios({
      method: "GET",
      url: `${baseURL}/findStudentsByTeacherIdAndTeacherName`,
      params: {
        teacherId: studentsData.teacherId,
        teacherName: studentsData.teacherName,
        currentPage: studentsData.currentPage,
        pageSize: studentsData.pageSize
    }
    });
  },

  /**
   * 搜索栏：模糊查询学生信息
   * @param {*} studentsData
   * @returns
   */
  findStudentByConditions: (studentsData) => {
    return axios({
      method: "GET",
      url: `${baseURL}/findStudentByConditions?teacherId=${studentsData.teacherId}&grade=${studentsData.grade}&college=${studentsData.college}&major=${studentsData.major}&classes=${studentsData.classes}&studentId=${studentsData.studentId}&studentName=${studentsData.studentName}`,
    });
  },
};
