<template>
  <div class="loadin-panel">
    <h1 class="header_format">后台管理系统</h1>

    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account-vue ref="accoutRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone-vue ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox class="account-remember-me" v-model="iskeepPassword"
        >记住密码</el-checkbox
      >
      <el-link type="primary" class="account-forget">忘记密码</el-link>
    </div>
    <el-button type="primary" class="loading-btn" @click="UsersLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccountVue from './login-account.vue'
import loginPhoneVue from './login-phone.vue'

export default defineComponent({
  components: {
    loginAccountVue,
    loginPhoneVue
  },
  setup() {
    // 1.定义属性
    const iskeepPassword = ref(false)
    // 拿到组件对象
    const accoutRef = ref<InstanceType<typeof loginAccountVue>>()
    const phoneRef = ref<InstanceType<typeof loginPhoneVue>>()

    // 两个登陆方式的切换逻辑判断
    const currentTab = ref<string>('account')
    // 2.定义方法
    const UsersLoginClick = () => {
      // console.log('立即登录', accoutRef.value)
      if (currentTab.value == 'account') {
        accoutRef.value?.LoadingAction(iskeepPassword.value)
      } else {
        console.log('phoneRef调用loginAction')
      }
    }
    return {
      iskeepPassword,
      UsersLoginClick,
      accoutRef,
      currentTab,
      phoneRef
    }
  }
})
</script>

<style scoped>
.demo-tabs {
  width: 300px;
  height: 170px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
.loadin-panel {
  margin-bottom: 150px;
}
.header_format {
  text-align: center;
}
.account-remember-me {
  margin-top: 10px;
}
.account-forget {
  margin-left: 170px;
}
.loading-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
