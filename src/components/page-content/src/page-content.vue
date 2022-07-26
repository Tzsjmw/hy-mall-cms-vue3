<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isShowNewBtn && isCreate"
          type="primary"
          size="large"
          @click="handleNewClick"
          >{{ btnName }}</el-button
        >
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          :type="scope.row.enable === 1 ? 'success' : 'danger'"
          size="small"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>

      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>

      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>

      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            size="small"
            link
            type="primary"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
          >
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>

          <el-button
            size="small"
            link
            type="primary"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon><Delete /></el-icon>
            删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'

import HyTable from '@/base-ui/table'

import { usePermission } from '@/hooks/use-permission'
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  components: {
    HyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    },
    btnName: {
      type: String,
      default: '新建'
    },
    isShowNewBtn: {
      type: Boolean,
      default: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    watch(pageInfo, () => getPageData())

    // 2.发送网络请求
    let otherQueryInfo = {}
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 3.从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 5.删除
    // const handleDeleteClick = (item: any) => {
    //   // 拿到当前行数据
    //   // console.log(item)
    //   // 删除
    //   store.dispatch('system/deletePageDataAction', {
    //     pageName: props.pageName,
    //     id: item.id
    //   })
    // }
    // 删除提示？（ElMessageBox）
    const handleDeleteClick = (item: any) => {
      ElMessageBox.confirm('是否确认删除该条数据', '删除操作', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '删除数据成功',
            center: true
          })
          store.dispatch('system/deletePageDataAction', {
            pageName: props.pageName,
            id: item.id,
            ...otherQueryInfo
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除操作',
            center: true
          })
        })
    }
    // 新建
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    // 编辑
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
