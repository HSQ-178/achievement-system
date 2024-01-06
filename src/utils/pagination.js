import { ref } from "vue";
//分页数据
export const pageList = ref({
    tableData: [], // 总的数据
    pageData: [], //每页总数据
    currentPage: 1, // 当前页 默认是第一页
    pageSize: 14, // 每页大小 默认每页14条数据
    pageTotal: 0, // 总数据量 默认为 0
    pageCount: 0  //总页数
});


 // 改变每页大小的方法
 export const handleSizeChange = (val) => {
    pageList.value.pageSize = val;
  };

// 改变当前页的方法
export const handleCurrentChange = (val) => {
    pageList.value.currentPage = val;
  };