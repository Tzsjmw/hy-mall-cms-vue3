<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="30" :src="circleUrl" />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleFoldClick">
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
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

export default defineComponent({
  setup() {
    // 头像
    const state = reactive({
      // circleUrl: 'https://s2.loli.net/2022/07/19/E6lwiMITv3mjYzA.jpg'
      circleUrl:
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    })
    const { circleUrl } = toRefs(state)
    //拿到姓名
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    // 退出登录
    const router = useRouter()
    const handleFoldClick = () => {
      localCache.deleteCatch('token')
      localCache.deleteCatch('userMenus')
      localCache.deleteCatch('userInfo')
      router.push('/main')
      ElMessage({
        showClose: true,
        message: '退出成功！',
        center: true,
        type: 'success'
      })
    }
    return {
      circleUrl,
      name,
      handleFoldClick
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
