<script setup lang="ts">
import { useStudentsStore } from '@/stores/students'
import { onMounted, ref } from 'vue'
import { otherOptions } from './studentGraphUtils'

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

const getLastNDays = (length = 14) => {
  const today = new Date()
  today.setDate(today.getDate() + 1)
  return Array.from(
    { length },
    (_, i) => new Date(today.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  )
}

const options = {
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

  const updatedSeries = await Promise.all(
    studentsStore.students.map(async (student) => {
      await studentsStore.getStudentsPosts(student.email)
      await studentsStore.getGroqPosts(student.email)
      await studentsStore.filterGraph(student.email)

      return {
        name: student.student_id_no,
        data: countDateOccurrences(studentsStore.studentPosts ?? []),
      }
    }),
  )

  series.value = updatedSeries
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
