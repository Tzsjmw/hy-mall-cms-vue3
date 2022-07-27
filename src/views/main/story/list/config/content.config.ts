export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'title', label: '故事标题', minWidth: '120' },
    { prop: 'content', label: '我的故事', minWidth: '500' },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'create' }
  ],
  // 是否显示序号
  showIndexColumn: true,
  // 是否有选中按钮
  showSelectColumn: true
}
