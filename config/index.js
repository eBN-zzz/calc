export const data = [
  {
    label: 'AC',
    value: 'ac',
    type: 'clear'
  },
  {
    label: '-/+',
    value: 'not',
    type: 'not'
  },
  {
    label: '%',
    value: 'percent',
    type: 'percent'
  },
  {
    label: '÷',
    value: '/',
    type: 'operator'
  },
  {
    label: '7',
    value: '7',
    type: 'number'
  },
  {
    label: '8',
    value: '8',
    type: 'number'
  },
  {
    label: '9',
    value: '9',
    type: 'number'
  },
  {
    label: '×',
    value: '*',
    type: 'operator'
  },
  {
    label: '4',
    value: '4',
    type: 'number'
  },
  {
    label: '5',
    value: '5',
    type: 'number'
  },
  {
    label: '6',
    value: '6',
    type: 'number'
  },
  {
    label: '-',
    value: '-',
    type: 'operator'
  },
  {
    label: '1',
    value: '1',
    type: 'number'
  },
  {
    label: '2',
    value: '2',
    type: 'number'
  },
  {
    label: '3',
    value: '3',
    type: 'number'
  },
  {
    label: '+',
    value: '+',
    type: 'operator'
  },
  {
    label: '0',
    value: '0',
    type: 'number'
  },
  {
    label: '·',
    value: '.',
    type: 'dot'
  },
  {
    label: '=',
    value: '=',
    type: 'equal'
  }
]

// 获取小数位的长度
function digitLen(num) {
  let decimal = num.toString().split('.')[1]
  if (decimal) return decimal.length
  return 0
}
function calc(a, operation, b) {
  // 算出最小的，能将两个数转换为整数的10的次方
  let common = 10 ** Math.max(digitLen(a), digitLen(b))
  let res
  switch (operation) {
    case '+': // 加
      res = (a * common + b * common) / common
      break
    case '-': // 减
      res = (a * common - b * common) / common
      break
    case '*': // 乘
      res = (a * common * (b * common)) / common ** 2
      break
    case '/': // 除
      res = (a * common) / (b * common)
      break
  }
  // 利用toFixed四舍五入，解决类似：(0.11*100*1.1*100)/10000 计算不准确的问题（某些浮点数乘10精度错误）
  return parseFloat(res.toFixed(12))
}

export function parseExp(s) {
  s = s.replace(/\s/g, '') + 'e'
  const reg = /^[0-9.]+$/
  const stack = []
  let preSign = '+'
  let curNum = 0
  for (let i = 0; i < s.length; i++) {
    if (reg.test(s[i])) {
      curNum = curNum + s[i]
    } else {
      if (preSign === '+') {
        stack.push(curNum)
      } else if (preSign === '-') {
        let last = stack[stack.length - 1]
        if (last === 0 && 1 / last < 0) {
          stack.push(curNum)
        } else {
          stack.push(-1 * curNum)
        }
      } else if (['+', '-'].includes(s[i]) && !curNum) {
        if (['+', '-'].includes(curNum)) return 0
        curNum = s[i]
        continue
      } else if (preSign === '*') {
        stack.push(calc(stack.pop(), preSign, curNum))
      } else if (preSign === '/') {
        stack.push(calc(stack.pop(), preSign, curNum))
      } else {
        return 0
      }
      curNum = 0
      preSign = s[i]
    }
  }
  let sum = stack.reduce((pre, num) => calc(pre, '+', num), 0)
  if (isNaN(sum) || !isFinite(sum)) sum = 0
  return sum
}
