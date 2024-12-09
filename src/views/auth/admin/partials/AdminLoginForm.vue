<script setup lang="ts">
import logoLogin from '@/assets/images/logo-login.png'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

const { mobile } = useDisplay()

const isPasswordVisible = ref(false)
</script>

<template>
  <v-img class="mx-auto my-6" max-width="228" :src="logoLogin"></v-img>

  <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
    <v-card-text>
      <h1 class="text-center text-success">Guidance Office Admin</h1>

      <v-divider class="my-5" thickness="2"></v-divider>
    </v-card-text>

    <v-form>
      <v-text-field
        class="mt-3"
        density="compact"
        placeholder="jdoe@carsu.edu.ph"
        label="Email Address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        class="mt-3"
        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVisible ? 'text' : 'password'"
        density="compact"
        placeholder="Password"
        label="Password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="isPasswordVisible = !isPasswordVisible"
      ></v-text-field>

      <v-btn
        class="font-weight-bold"
        prepend-icon="mdi-login"
        color="success"
        variant="elevated"
        size="large"
        block
      >
        Login
      </v-btn>
    </v-form>

    <v-card-text class="mt-8 text-center">
      <span>Are you a student?</span>

      <br v-if="mobile" />

      <RouterLink class="text-success text-decoration-none font-weight-bold" to="/">
        Click Here to Login <v-icon icon="mdi-chevron-right"></v-icon>
      </RouterLink>
    </v-card-text>
  </v-card>
</template>
