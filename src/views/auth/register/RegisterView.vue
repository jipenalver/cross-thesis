<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from './partials/RegisterForm.vue'
import bgCsu from '@/assets/images/bg-csu.png'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-img :src="bgCsu" class="h-screen" cover>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <RegisterForm></RegisterForm>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </template>
  </AppLayout>
</template>
