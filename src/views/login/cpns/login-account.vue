<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <!-- required="true" -->
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
// 配置输入框规则
import { rules } from '../config/account-config'
// 配置记住密码规则
import LocalCache from '@/utils/cache'
// vuex
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const account = reactive({
      name: LocalCache.getCache('name') ?? '',
      password: LocalCache.getCache('password') ?? ''
    })

    const Store = useStore()

    const formRef = ref<InstanceType<typeof ElForm>>()

    const LoadingAction = (iskeepPassword: boolean) => {
      // console.log('子组件的点击事件')
      formRef.value?.validate((valid) => {
        // console.log(valid)
        if (valid) {
          // console.log('真正登录成功的执行逻辑')
          // 1.判断是否记住密码
          if (iskeepPassword) {
            // 本地缓存
            LocalCache.setCath('name', account.name)
            LocalCache.setCath('password', account.password)
          }
          // 2.开始登录验证
          Store.dispatch('login/accountLoginAction', { ...account })
        } else {
          LocalCache.deleteCatch('name')
          LocalCache.deleteCatch('password')
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
