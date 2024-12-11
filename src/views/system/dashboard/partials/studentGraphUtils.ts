export const otherOptions = {
  chart: {
    height: 350,
    type: 'line',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
  plotOptions: {
    line: {
      isSlopeChart: false,
    },
  },
  stroke: {
    curve: 'straight',
  },
  dataLabels: {
    enabled: true,
  },
  legend: {
    show: true,
    labels: {
      colors: '#C62828',
    },
  },
}

// const getLastNMonths = (length = 6) => {
//   const today = new Date()
//   return Array.from({ length }, (_, i) => {
//     const monthStart = new Date(today.getFullYear(), today.getMonth() - i, 1)
//     return monthStart.toISOString().split('T')[0]
//   }).reverse()
// }

// const getLastNWeeks = (length = 8) => {
//   const today = new Date()
//   const weekStart = new Date(today.getTime() - today.getDay() * 24 * 60 * 60 * 1000)

//   return Array.from({ length }, (_, i) => {
//     const date = new Date(weekStart.getTime() - i * 7 * 24 * 60 * 60 * 1000)
//     return date.toISOString().split('T')[0]
//   }).reverse()
// }
