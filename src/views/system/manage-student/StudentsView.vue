<script setup lang="ts">
import SideNavigation from '@/components/navigation/SideNavigation.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import StudentsTable from './partials/StudentsTable.vue'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

const { mobile } = useDisplay()

const isDrawerVisible = ref(mobile.value ? false : true)
</script>

<template>
  <AppLayout :is-with-app-bar-icon="true" @is-drawer-visible="isDrawerVisible = !isDrawerVisible">
    <template #navigation>
      <SideNavigation v-model:is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <template #content>
      <v-container fluid>
        <v-card class="mb-5">
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['Students Management', 'List of Students']">
                <template #prepend>
                  <v-icon icon="mdi-book-account" size="small" class="me-1"></v-icon>
                </template>
              </v-breadcrumbs>
            </span>
          </template>

          <template #subtitle>
            <p class="ms-4 text-wrap">View students information.</p>
          </template>
        </v-card>

        <v-card>
          <v-card-text>
            <StudentsTable></StudentsTable>
          </v-card-text>
        </v-card>
      </v-container>
    </template>
  </AppLayout>
</template>
