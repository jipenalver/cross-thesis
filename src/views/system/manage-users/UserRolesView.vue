<script setup lang="ts">
import SideNavigation from '@/components/navigation/SideNavigation.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import UserRolesList from './partials/UserRolesList.vue'
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
              <v-breadcrumbs :items="['User Management', 'User Roles']">
                <template #prepend>
                  <v-icon icon="mdi-tag-multiple" size="small" class="me-1"></v-icon>
                </template>
              </v-breadcrumbs>
            </span>
          </template>

          <template #subtitle>
            <p class="ms-4 text-wrap">
              A role grants access to specific pages and features, ensuring that admin users can
              access what they need based on their assigned role.
            </p>
          </template>
        </v-card>

        <UserRolesList></UserRolesList>
      </v-container>
    </template>
  </AppLayout>
</template>
