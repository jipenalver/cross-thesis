<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { watch } from 'vue'

const props = defineProps<{
  isDrawerVisible: boolean
}>()

const emit = defineEmits(['update:isAlertVisible'])

const { mobile } = useDisplay()

watch(
  () => props.isDrawerVisible,
  () => {
    setTimeout(() => {
      emit('update:isAlertVisible', false)
    }, 10000)
  },
)
</script>

<template>
  <v-navigation-drawer
    :model-value="props.isDrawerVisible"
    :persistent="mobile"
    :temporary="mobile"
    :permanent="!mobile"
    expand-on-hover
    rail
  >
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        to="/dashboard"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-wrench"
        title="Account Settings"
        to="/account/settings"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
