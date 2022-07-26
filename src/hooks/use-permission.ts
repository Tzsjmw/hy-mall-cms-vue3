import { useStore } from '@/store'
// 验证是否具有权限的hook函数
export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  // 服务器传回来的具备权限的格式
  const verifyPermission = `system:${pageName}:${hanldeName}`

  // name = "coderwhy"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item) => item === verifyPermission)
}
