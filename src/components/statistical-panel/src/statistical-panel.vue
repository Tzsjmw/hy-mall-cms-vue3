<template>
  <div class="statistical">
    <div class="header">
      <span>{{ panelData.title }}</span>
      <el-tooltip :content="panelData.tips" placement="top" effect="light">
        <el-icon><info-filled /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <wf-counter-up
        :number="panelData.number1"
        :option="
          panelData.amount === 'saleroom' ? counterOption2 : counterOption1
        "
      />
    </div>
    <div class="footer">
      <span>
        {{ panelData.subtitle }}
        <wf-counter-up
          :number="panelData.number2"
          :option="
            panelData.amount === 'saleroom' ? counterOption2 : counterOption1
          "
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IPanelDatas } from '../types/types'
import WfCounterUp from '@/base-ui/count-up'

export default defineComponent({
  components: { WfCounterUp },
  props: {
    panelData: {
      type: Object as PropType<IPanelDatas>,
      default: () => ({})
    }
  },

  setup() {
    const counterOption1 = {
      decimalPlaces: 0, // 保留两位
      prefix: '' // 单位
    }
    const counterOption2 = {
      decimalPlaces: 0, // 保留两位
      prefix: '￥' // 单位
    }
    return {
      counterOption1,
      counterOption2
    }
  }
})
</script>

<style scoped lang="less">
@h: 38px;

.statistical {
  display: flex;
  padding: 0 20px;
  background: white;
  flex-direction: column;
  justify-content: flex-start;

  height: 130px;
  margin-bottom: 20px;
  overflow: hidden;
  text-align: left;

  .header {
    display: flex;
    height: @h;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    // border: 1px solid red;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .footer {
    display: flex;
    height: @h;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
