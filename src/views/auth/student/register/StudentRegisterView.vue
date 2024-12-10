<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from './partials/RegisterForm.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <RegisterForm></RegisterForm>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
