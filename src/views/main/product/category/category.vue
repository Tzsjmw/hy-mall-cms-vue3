<template>
  <div class="category">
    <page-search
      pageName="category"
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>

    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      btnName="新建分类"
      pageName="category"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>

    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      pageName="category"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'category',
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
      modalConfig
    }
  }
})
</script>

<style scoped></style>
