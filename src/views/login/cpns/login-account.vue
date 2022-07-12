<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <!-- required="true" -->
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'

import { rules } from '../config/account-config'
export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const LoadingAction = () => {
      // console.log('子组件的点击事件')
      formRef.value?.validate((valid) => {
        // console.log(valid)
        if (valid == true) {
          console.log('真正登录成功的执行逻辑')
        } else {
          console.log('真正登录失败的执行逻辑')
        }
      })
    }
    return {
      account,
      rules,
      LoadingAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
