<script setup lang="ts">
import SideNavigation from '@/components/navigation/SideNavigation.vue'
import StudentGraph from './partials/StudentGraphWidget.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import WelcomeWidget from './partials/WelcomeWidget.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

const { mobile } = useDisplay()

const authStore = useAuthUserStore()

const isDrawerVisible = ref(mobile.value ? false : true)
</script>

<template>
  <AppLayout :is-with-app-bar-icon="true" @is-drawer-visible="isDrawerVisible = !isDrawerVisible">
    <template #navigation>
      <SideNavigation v-model:is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <template #content>
      <v-container fluid>
        <v-row>
          <v-col v-if="authStore.userRole === 'Student'" cols="12">
            <WelcomeWidget></WelcomeWidget>
          </v-col>

          <v-col v-else cols="12">
            <StudentGraph></StudentGraph>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
