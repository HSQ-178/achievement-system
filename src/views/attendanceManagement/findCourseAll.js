import formateTime from "../../utils/formateTime";
import attendanceManagementApi from "../../api/mothod/AttendanceManagement";
import { useUserStore } from "../../store/userStore";
import { useCourseStore } from "../../store/courseStore";
import { ref } from 'vue'

export const tableData = ref({
    grade: "",
    college: "",
    major: "",
    course: "",
    startTime: ""
  })

//获取所有课程，用当前时间，星期数与所有课程的时间，星期数作比较
export const findAllInCollSignIn = async () => {
    const userStore = useUserStore();
    const { data } = await attendanceManagementApi.findAll(userStore.users.teacherId);
  
    if (data.code === 200) {
      data.data.forEach((item, index) => {
        //将时间格式化为"hh:mm:ss"
        const startTime = formateTime(new Date(item.startTime));
        const endTime = formateTime(new Date(item.endTime));
        const courseWeek = new Date(item.startTime).getDay(); //获取星期数
        const courseYear = new Date(item.startTime).getFullYear()
  
        //获取当前时间, 将当前时间格式化为"hh:mm:ss"
        const dateTime = formateTime(new Date());
        const dateWeek = new Date().getDay(); //获取当前星期数
        const dateYear = new Date().getFullYear()
        // console.log(courseWeek);
  
        //判断
        if(courseYear === dateYear) {
          if (courseWeek === dateWeek) {
            // console.log(courseWeek === dateWeek);
            if (startTime <= dateTime && dateTime <= endTime) {
              tableData.value.grade = item.grade
              tableData.value.college = item.college
              tableData.value.major = item.major
              tableData.value.course = item.course
              tableData.value.startTime = item.startTime
              console.log(`现在${item.course}课`);
            }
            return;
          }
          return;
        }
      });
    }
  };

export const findAllInAddress = async () => {
  const courseStore = useCourseStore();
  const userStore = useUserStore();

  const { data } = await attendanceManagementApi.findAll(userStore.users.teacherId);

  if (data.code === 200) {
    data.data.forEach((item, index) => {
      //将时间格式化为"hh:mm:ss"
      const startTime = formateTime(new Date(item.startTime));
      const endTime = formateTime(new Date(item.endTime));
      const courseWeek = new Date(item.startTime).getDay(); //获取星期数
      const courseYear = new Date(item.startTime).getFullYear(); //获取年份

      //获取当前时间, 将当前时间格式化为"hh:mm:ss"
      const dateTime = formateTime(new Date());
      const dateWeek = new Date().getDay(); //获取当前星期数
      const dateYear = new Date().getFullYear(); //获取当前年份

      //判断
      if (courseYear === dateYear) {
        if (courseWeek === dateWeek) {
          if (startTime <= dateTime && dateTime <= endTime) {
            courseStore.courses.grade = item.grade;
            courseStore.courses.college = item.college;
            courseStore.courses.major = item.major;
            courseStore.courses.course = item.course;
            courseStore.courses.startTime = item.startTime;
            console.log(`现在${item.course}课`);
          }
        }
      }
    });
  }
}