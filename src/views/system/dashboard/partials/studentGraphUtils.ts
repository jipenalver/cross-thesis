const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

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
  yaxis: {
    labels: {
      style: {
        colors: '#C62828',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    title: {
      text: 'Occurence',
      style: {
        color: '#C62828',
      },
    },
  },
}

export const getLastNDays = (length = 14) => {
  const today = new Date()
  return Array.from(
    { length },
    (_, i) => new Date(today.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  ).reverse()
}

export const getLastNWeeks = (length = 8) => {
  const today = new Date()
  const weekStart = new Date(today.getTime() - today.getDay() * 24 * 60 * 60 * 1000)

  return Array.from({ length }, (_, i) => {
    const date = new Date(weekStart.getTime() - i * 7 * 24 * 60 * 60 * 1000)
    const monthIndex = date.getMonth()
    const weekNumber = Math.ceil((date.getDate() + 1) / 7)
    return `${months[monthIndex]} - Week ${weekNumber}`
  }).reverse()
}

export const getLastNMonths = (length = 6) => {
  const today = new Date()
  return Array.from({ length }, (_, i) => {
    const monthIndex = (today.getMonth() - i + 12) % 12
    return months[monthIndex]
  }).reverse()
}

export const daysOptions = {
  ...otherOptions,
  xaxis: {
    type: 'category',
    categories: getLastNDays(),
    labels: {
      style: {
        colors: '#C62828',
        fontSize: '12px',
        fontWeight: 'bold',
      },
    },
    title: {
      text: 'Students',
      style: {
        color: '#C62828',
      },
    },
  },
}

export const weeksOptions = {
  ...otherOptions,
  xaxis: {
    type: 'category',
    categories: getLastNWeeks(),
    labels: {
      style: {
        colors: '#C62828',
        fontSize: '12px',
        fontWeight: 'bold',
      },
    },
    title: {
      text: 'Students',
      style: {
        color: '#C62828',
      },
    },
  },
}

export const monthsOptions = {
  ...otherOptions,
  xaxis: {
    type: 'category',
    categories: getLastNMonths(),
    labels: {
      style: {
        colors: '#C62828',
        fontSize: '12px',
        fontWeight: 'bold',
      },
    },
    title: {
      text: 'Students',
      style: {
        color: '#C62828',
      },
    },
  },
}

export const countDateOccurrences = (dates: string[]) => {
  const dateCounts: number[] = []

  const lastElevenDays = getLastNDays()
  lastElevenDays.forEach((date) => {
    const count = dates.filter((d) => d.startsWith(date)).length
    dateCounts.push(count)
  })

  return dateCounts
}

export const countWeeklyOccurrences = (dates: string[]) => {
  const weekCounts: number[] = []

  const lastNWeeks = getLastNWeeks()
  lastNWeeks.forEach((week) => {
    const count = dates.filter((date) => {
      const dateObj = new Date(date)
      const weekNumber = Math.ceil((dateObj.getDate() + 1) / 7)
      const monthIndex = dateObj.getMonth()
      const monthName = months[monthIndex]
      return `${monthName} - Week ${weekNumber}` === week
    }).length
    weekCounts.push(count)
  })

  return weekCounts
}

export const countMonthlyOccurrences = (dates: string[]) => {
  const monthCounts: number[] = []

  const lastNMonths = getLastNMonths()
  lastNMonths.forEach((month) => {
    const count = dates.filter((date) => {
      const dateObj = new Date(date)
      return `${months[dateObj.getMonth()]}` === month
    }).length
    monthCounts.push(count)
  })

  return monthCounts
}
