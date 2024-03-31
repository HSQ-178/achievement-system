import axios from "../axiosApi";

const baseURL = "/student";

export default {
  /**
   * 通过teacherCard模糊查询所有学生
   * @param {*} studentsData
   * @returns
   */
  getStudents: (studentsData) => {
    return axios({
      method: "POST",
      url: `${baseURL}/getAllStudents`,
      data: studentsData
    });
  },
};
