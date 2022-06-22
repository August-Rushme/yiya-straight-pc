import { ref } from "vue"
import PageContent from "@/components/page-content"

export function usePageSearch() {
  const pageInfo = { pageNum: 1, pageSize: 6 }
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = (pageName: string) => {
    pageContentRef.value?.getPageData(pageInfo, pageName)
  }

  /**
   *
   * @param queryInfo 搜索条件
   * @param pageName 页面名称
   * @param searchOtherInfo 搜索的其它参数
   */
  const handleQueryClick = (queryInfo: any, pageName: string, searchOtherInfo?: any) => {
    pageContentRef.value?.getPageData({ ...queryInfo, ...searchOtherInfo }, pageName)
  }
  return { pageContentRef, handleResetClick, handleQueryClick }
}
