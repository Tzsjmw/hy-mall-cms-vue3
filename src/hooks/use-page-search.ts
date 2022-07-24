import { ref } from 'vue'
import PageContent from '@/components/page-content'

// form搜索部分hook逻辑
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  // 点击重置, 请求数据
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  // 点击搜索,请求数据
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
