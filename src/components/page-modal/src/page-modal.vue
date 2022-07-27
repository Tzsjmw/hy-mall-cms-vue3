<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <!-- 新建按钮中间内容 -->
      <hy-form v-bind="modalConfig" v-model="formData"> </hy-form>
      <!-- 插槽 -->
      <slot></slot>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import HyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    HyForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // dialog显示与隐藏,通过usePageModal hook设置的
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    // 2.监听数据的改变,数据发生改变,把新输入的值赋给formData对应的字段
    /* defaultInfo与table显示数据关联,table数据改变defaultInfo改变,
       formData数据和form先关联,把新的defaultInfo赋值给formData是因为了做回显*/
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确认按钮的逻辑
    // 3.发送网络请求,根据defaultInfo是否有内容,在page-modal中,新建和编辑defaultInfo赋值不同
    // 注意点* 赋值参数要用浅拷贝的方式,因为数据大量双向绑定,直接赋值会出问题
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        // console.log('编辑用户')
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        // console.log('新建用户')
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
