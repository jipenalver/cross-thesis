<script setup lang="ts">
import { ref } from 'vue'

const themeVal = ref('')

const barOptions = {
  chart: {
    height: 350,
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
    },
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
    categories: [
      ['John', 'Doe'],
      ['Joe', 'Smith'],
      ['Jake', 'Williams'],
      'Amber',
      ['Peter', 'Brown'],
      ['Mary', 'Evans'],
      ['David', 'Wilson'],
      ['Lily', 'Roberts'],
    ],
    labels: {
      style: {
        colors: '#C62828',
        fontSize: '12px',
        fontWeight: 'bold',
      },
    },
    title: {
      text: 'Products',
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
      text: 'Quantity',
      style: {
        color: '#C62828',
      },
    },
  },
  theme: {
    mode: themeVal.value,
  },
  tooltip: {
    theme: themeVal.value,
  },
}

const series = [
  {
    name: 'Quantity',
    data: [21, 22, 10, 28, 16, 21, 13, 30],
  },
]
</script>

<template>
  <v-card title="Student Ideation Graph" subtitle="Occurence in the Last 30 days">
    <v-card-text>
      <apexchart type="bar" width="100%" :options="barOptions" :series="series"></apexchart>
    </v-card-text>
  </v-card>
</template>
