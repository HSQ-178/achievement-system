import formateTime from "../../../utils/formateTime";
import courseApi from "../../../api/mothod/course"
import { useUserStore } from "../../../store/userStore";
import { useCourseStore } from "../../../store/courseStore";

export const findAllCourse = async () => {
  const courseStore = useCourseStore();
  const userStore = useUserStore();

  const { data } = await courseApi.getAllCourse({
    teacherCard: userStore.users.teacher.teacherCard
  });
  console.log(data.data.courseResp);

  if (data.code === 200) {
    data.data.courseResp.forEach((item, index) => {
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
            courseStore.courses.id = item.id
            courseStore.courses.grade = item.grade;
            courseStore.courses.college = item.college;
            courseStore.courses.major = item.major;
            courseStore.courses.course = item.course;
            courseStore.courses.class = item.class;
            courseStore.courses.startTime = item.startTime;
            console.log(`现在${item.course}课`);
          }
        }
      }
    });
  }
}