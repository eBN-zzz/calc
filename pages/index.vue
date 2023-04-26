<template>
  <view class="wrapper">
    <view class="status-bar" :style="{ height: statusBarHeight }"></view>
    <view class="input">
      <view class="input__inner">{{ state.value }}</view>
    </view>
    <view class="keyboard">
      <view class="keyboard-item" :class="[{ 'span-2': item.value === '0' }]" v-for="(item, index) in keys" :key="index">
        <view
          class="keyboard-item__inner"
          :class="[{ 'grey-1': ['ac', 'not', 'percent'].includes(item.type) }, { 'grey-2': ['number', 'dot'].includes(item.type) }]"
          :key="item.value"
          @tap="onTap(item)"
        >
          {{ item.label }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import Big from 'big.js'
import { data, parseExp } from '@/config'

const statusBarHeight = computed(() => uni.getSystemInfoSync().statusBarHeight + 'px')

const keys = ref(data)

const state = reactive({ value: '0', reg: '', rewrite: false, init: false })

/**
 * @param {*} item
 * 数字->number 加减乘除->operator 清除->clear 点->dot 取反->not 百分比->percent 等于->equal
 */
const onTap = item => {
  const { type, value } = item
  if (state.init) {
    state.value = '0'
    state.reg = ''
    state.rewrite = false
    state.init = false
  }
  if (['number', 'dot'].includes(type)) {
    if (state.rewrite) {
      state.value = value
      state.rewrite = false
    } else {
      if (state.value === '0' && type !== 'dot') state.value = value
      else state.value += value
    }
  } else if (type === 'operator') {
    const last = state.reg.charAt(state.reg.length - 1)
    if (state.rewrite && ['+', '-', '*', '/'].includes(last)) {
      state.reg = state.reg.slice(0, state.reg.length - 1) + value
    } else {
      state.rewrite = true
      state.reg += state.value + value
    }
  } else if (type === 'clear') {
    state.value = '0'
    state.reg = ''
    state.rewrite = false
    state.init = false
  } else if (type === 'not') {
    state.value = -1 * state.value + ''
  } else if (type === 'percent') {
    state.value = new Big(state.value).times(0.01).toString()
  } else if (type === 'equal') {
    state.reg += state.value
    state.value = parseExp(state.reg) + ''
    state.reg += value
    state.init = true
  }
}
</script>

<style lang="scss">
@import '@/pages/style.scss';
</style>
