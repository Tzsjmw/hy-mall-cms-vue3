<template>
  <div class="department">
    <page-search
      pageName="department"
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>

    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      btnName="新建部门"
      pageName="department"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <!-- 表格显示 -->
      <template #parentId="scope">
        <template v-if="scope.row.parentId === 1">总裁办</template>
        <template v-else-if="scope.row.parentId === 2">研发部</template>
        <template v-else-if="scope.row.parentId === 3">运营部</template>
        <template v-else-if="scope.row.parentId === 4">客服部</template>
        <template v-else-if="scope.row.parentId === 5">人事部</template>
      </template>
    </page-content>

    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      pageName="department"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import pageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'department',
  components: {
    pageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 1.search对应hook
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch() as any

    // 2.modal对应hook
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal() as any

    // 3.动态添加select的options,利用computed变成响应式
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'parentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      // const departmentItem = modalConfig.formItems.find(
      //   (item: any) => item.filed === 'parentId'
      // )
      // departmentItem!.options = store.state.entireDepartment.map((item) => {
      //   return { label: item.name, value: item.id }
      // })
      return modalConfig
    })

    return {
      searchFormConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      contentTableConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      modalConfig,
      modalConfigRef
    }
  }
})
</script>

<style scoped></style>
