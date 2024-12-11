<script setup lang="ts">
import { useStudentsStore } from '@/stores/students'
import { onMounted } from 'vue'

const studentsStore = useStudentsStore()

// Categories
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lastSixMonths = ['July', 'August', 'September', 'October', 'November', 'December']
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lastTwelveMonths = [
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
const last7Days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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
    categories: last7Days,
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

const series = [
  {
    name: 'Student 1',
    data: [21, 22, 10, 28, 16, 21, 13],
  },
  {
    name: 'Student 2',
    data: [1, 22, 10, 2, 16, 21, 13],
  },
  {
    name: 'Student 3',
    data: [1, 0, 0, 0, 0, 21, 13],
  },
]

onMounted(async () => {
  await studentsStore.getStudentsPosts('jianchris2k14@gmail.com')
  await studentsStore.pushToGroq('jianchris2k14@gmail.com')
})
</script>

<template>
  <v-card title="Student Ideation Graph" subtitle="Occurence in the Last 7 days">
    <template #append>
      <v-select
        min-width="250px"
        prepend-inner-icon="mdi-calendar"
        :items="['Last 7 Days', 'Last 14 Days', 'Last 4 Weeks', 'Last 8 Weeks', 'Last 6 Months']"
        density="compact"
        label="Filter"
        item-title="name"
        item-value="id"
        variant="outlined"
        clearable
      ></v-select>
    </template>

    <v-card-text>
      <apexchart type="line" width="100%" :options="options" :series="series"></apexchart>
    </v-card-text>
  </v-card>
</template>
