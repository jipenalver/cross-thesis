<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForm from './partials/LoginForm.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <LoginForm></LoginForm>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
