<template>
  <div class="home">
    <!-- 联系人列表 -->
    <van-contact-list :list="lists" @add="onAdd" @edit="onEdit" />
    <!-- 编辑联系人 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
// 引入button
// import { Button } from 'vant';
import { ContactList,Toast,Popup,ContactEdit } from "vant";
// 引入axios
import axios from "axios";
export default {
  name: "contactList",
  components: {
    //配置Button（注意！！！！！！）
    // [Button.name]:Button
    [ContactList.name]: ContactList,
    // [Toast.name]: Toast不在template中使用不需要注册
    [Popup.name]: Popup,
    [ContactEdit.name]: ContactEdit
  },
  data() {
    return {
      // 联系人列表
      lists: [],
      // axios实例
      instance: null,
      //编辑弹窗的显隐
      showEdit: false,
      //新建或编辑
      isEdit: false,
      //正在编辑的联系人数据
      editingContact: {}
    };
  },
  //在created生命周期
  created() {
    //创建实例
    this.instance = axios.create({
      baseURL: "http://localhost:9000/api",
      //设置超时事件
      timeout: 1000
    });

    this.getList();
    // // 获取联系人（在创建实例时获取）
    // this.instance
    //   .get("/contactList")
    //   .then(res => {
    //     //  console.log(res)
    //     this.lists = res.data.data;
    //   })
    //   .catch(() => {
    //     // console.log(err);
    //     // 此处一般为后端报错
    //     Toast("信息加载失败，请重试");
    //   });

    // // 执行请求
    // axios.get("/data.json").then(res => {
    //   console.log(res);
    // });
  },
  methods: {
    //   获取联系人列表（将axios请求封装为一个方法）
    getList(){
      // 获取联系人（在创建实例时获取）
      this.instance
        .get("/contactList")
        .then(res => {
          //  console.log(res)
          this.lists = res.data.data;
        })
        .catch(() => {
          // console.log(err);
          // 此处一般为后端报错
          Toast("消息加载失败，请重试");
        });
    },
    //新建联系人
    onAdd(){
        this.showEdit = true;
        // 是否编辑
         this.isEdit = false;
    },
    // 编辑联系人（info-被编辑的对象）
    onEdit(info){
        this.showEdit = true;
        // 是否编辑
        this.isEdit = true;
        // 当前编辑对象的内容
        this.editingContact = info;
    },
    // 保存联系人
    onSave(info){
      // 判断为重新编辑还是新建编辑
      if (this.isEdit) {
        // 编辑保存(需要配置config-传入info)
        this.instance.put('/contact/edit',info).then(res=>{
             if (res.data.code == 200) {
              Toast("编辑成功");
              // 新建成功，将弹窗关闭  
              this.showEdit = false;
              // 刷新列表
              this.getList();
            }
        }).catch(()=>{
            Toast("失败");
        })
      } else {
        // 新建保存
        this.instance
          .post("/contact/new/json",info)
          .then(res => {
            if (res.data.code == 200) {
              Toast("新建成功");
              // 新建成功，将弹窗关闭  
              this.showEdit = false;
              // 刷新列表
              this.getList();
            }
          })
          .catch(() => {
            Toast("新建失败");
          });
      }
    },
    // 删除联系人(也有info)
    onDelete(info){
        // delete有两个参数：url路径，config配置
        this.instance.delete('/contact',{
            params:{
                id:info.id
                }
        }).then(res=>{
            if(res.data.code === 200){
                Toast('删除成功')
                this.showEdit = false
                // 刷新列表
                this.getList();
            }
        }).catch(()=>{
            Toast("失败");
        })
    }
  }
};
</script>
<style scoped>
/* 新建联系人按钮显示层降低 */
/* 注意此处add前有两个下划线 */
.van-contact-list__add{
  z-index:0;
}
/* 弹窗高度设为100% */
.van-popup{
  height: 100%;
}
</style>
