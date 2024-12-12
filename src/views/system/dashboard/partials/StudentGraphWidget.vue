<script setup lang="ts">
import {
  countDateOccurrences,
  countMonthlyOccurrences,
  countWeeklyOccurrences,
  daysOptions,
  monthsOptions,
  weeksOptions,
} from './studentGraphUtils'
import { useStudentsStore } from '@/stores/students'
import { onMounted, ref } from 'vue'

const studentsStore = useStudentsStore()

const graphFilter = ref({
  category: '14 Days',
})
const resetKey = ref(0)

const series = ref<{ name: string; data: number[] }[]>([])

const updateGraph = async () => {
  if (!studentsStore.students) return

  const updatedSeries = await Promise.all(
    studentsStore.students.map(async (student) => {
      await studentsStore.getStudentsPosts(student.email)
      await studentsStore.getGroqPosts(student.email)
      await studentsStore.filterGraph(student.email, graphFilter.value.category)

      const studentData =
        graphFilter.value.category === '14 Days'
          ? countDateOccurrences(studentsStore.studentPosts ?? [])
          : graphFilter.value.category === '8 Weeks'
            ? countWeeklyOccurrences(studentsStore.studentPosts ?? [])
            : countMonthlyOccurrences(studentsStore.studentPosts ?? [])

      return {
        name: student.student_id_no,
        data: studentData,
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
        v-if="graphFilter.category === '14 Days'"
        :key="resetKey"
        type="line"
        width="100%"
        :options="daysOptions"
        :series="series"
      ></apexchart>

      <apexchart
        v-if="graphFilter.category === '8 Weeks'"
        :key="resetKey"
        type="line"
        width="100%"
        :options="weeksOptions"
        :series="series"
      ></apexchart>

      <apexchart
        v-if="graphFilter.category === '6 Months'"
        :key="resetKey"
        type="line"
        width="100%"
        :options="monthsOptions"
        :series="series"
      ></apexchart>
    </v-card-text>
  </v-card>
</template>
