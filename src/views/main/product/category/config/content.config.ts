export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '商品类别', minWidth: '150' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  // 是否显示序号
  showIndexColumn: true,
  // 是否有选中按钮
  showSelectColumn: true
}
