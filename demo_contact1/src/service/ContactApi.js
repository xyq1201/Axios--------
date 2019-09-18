// 该js内部包含对象（请求方法+请求路径）

// 声明对象
const CONTACT_API = {
    // 获取联系人列表
    getContactList:{
        method:'get',
        url:'/contactList'
    },
    // 新建联系人（form-data）
    newContactForm:{
        method:'post',
        url:'/contact/new/form'
    },
    // 新建联系人（application/json）
    newContactJson:{
        method:'post',
        url:'/contact/new/json'
    },
    // 编辑联系人
    editContact:{
        method:'put',
        url:'/contact/edit'
    },
    // 删除联系人
    deleteContact:{
        method:'delete',
        url:'/contact'
    }

}
// 将其导出
export default  CONTACT_API