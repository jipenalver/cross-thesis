<script setup lang="ts">
import { useStudentsStore } from '@/stores/students'
import { onMounted, ref } from 'vue'

const studentsStore = useStudentsStore()

const graphFilter = ref({
  category: '14 Days',
})
const resetKey = ref(0)

function countDateOccurrences(dates: string[]): number[] {
  const dateCounts: number[] = []

  const lastElevenDays = getLastNDays()
  lastElevenDays.forEach((date) => {
    const count = dates.filter((d) => d.startsWith(date)).length
    dateCounts.push(count)
  })

  return dateCounts.reverse()
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

const getLastNDays = (length = 14) => {
  const today = new Date()
  today.setDate(today.getDate() + 1)
  return Array.from(
    { length },
    (_, i) => new Date(today.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  )
}

// Options
const options = {
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

const series = ref<{ name: string; data: number[] }[]>([])

const updateGraph = async () => {
  if (!studentsStore.students) return

  for (let i = 0; i < studentsStore.students.length; i++) {
    await studentsStore.getStudentsPosts(studentsStore.students[i].email)
    await studentsStore.getGroqPosts(studentsStore.students[i].email)
    await studentsStore.filterGraph(studentsStore.students[i].email)

    series.value.push({
      name: studentsStore.students[i].email,
      data: countDateOccurrences(studentsStore.studentPosts ?? []),
    })
  }

  resetKey.value++
}

onMounted(async () => {
  if (studentsStore.students?.length == 0) await studentsStore.getStudents()
  await updateGraph()
})
</script>

<template>
  <v-card
    title="Student Suicide Ideation Graph"
    :subtitle="graphFilter.category ? `Occurence in the Last ${graphFilter.category}` : undefined"
  >
    <template #append>
      <v-select
        v-model="graphFilter.category"
        min-width="250px"
        prepend-icon="mdi-calendar"
        prefix="Last"
        :items="['14 Days', '8 Weeks', '6 Months']"
        density="compact"
        label="Filter Range"
        variant="outlined"
        clearable
        @update:model-value="updateGraph"
      ></v-select>
    </template>

    <v-card-text>
      <apexchart
        :key="resetKey"
        type="line"
        width="100%"
        :options="options"
        :series="series"
      ></apexchart>
    </v-card-text>
  </v-card>
</template>
