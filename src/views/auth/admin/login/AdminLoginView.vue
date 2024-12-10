<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import AdminLoginForm from './partials/LoginForm.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <AdminLoginForm></AdminLoginForm>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
