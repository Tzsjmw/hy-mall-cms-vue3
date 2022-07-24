<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="30" :src="circleUrl" />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><turn-off /></el-icon>退出登录
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><user /></el-icon>个人中心
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><bell /></el-icon>系统消息
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    // 头像
    const state = reactive({
      // circleUrl: 'https://s2.loli.net/2022/07/19/E6lwiMITv3mjYzA.jpg'
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    })
    const { circleUrl } = toRefs(state)
    //
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    return {
      circleUrl,
      name
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  /* 鼠标变点击样式  cursor*/
  cursor: pointer;
  display: flex;
  align-items: center;
}
.el-dropdown-link span {
  margin-left: 5px;
}
</style>
