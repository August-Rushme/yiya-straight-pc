import { ref } from "vue"
import PageContent from "@/components/page-content"

export function usePageSearch() {
  const pageInfo = { pageNum: 1, pageSize: 6 }
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = (pageName: string) => {
    pageContentRef.value?.getPageData(pageInfo, pageName)
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return { pageContentRef, handleResetClick, handleQueryClick }
}
