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
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmailcom"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>

      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Shared with me"
        value="shared"
      ></v-list-item>

      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
