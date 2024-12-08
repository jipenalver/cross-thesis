<script setup lang="ts">
import logoLogin from '@/assets/images/logo-login.png'
import { ref } from 'vue'

const isPasswordVisible = ref(false)
</script>

<template>
  <v-img class="mx-auto my-6" max-width="228" :src="logoLogin"></v-img>

  <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
    <div class="text-subtitle-1 text-medium-emphasis">Account</div>

    <v-text-field
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    ></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      Password

      <a
        class="text-caption text-decoration-none text-success"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        Forgot login password?</a
      >
    </div>

    <v-text-field
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="isPasswordVisible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    ></v-text-field>

    <v-card class="mb-12" color="surface-variant" variant="tonal">
      <v-card-text class="text-medium-emphasis text-caption">
        Warning: After 3 consecutive failed login attempts, you account will be temporarily locked
        for three hours. If you must login now, you can also click "Forgot login password?" below to
        reset the login password.
      </v-card-text>
    </v-card>

    <v-btn
      class="mb-8"
      prepend-icon="mdi-facebook"
      color="success"
      size="large"
      variant="tonal"
      block
    >
      Log In with Facebook
    </v-btn>

    <v-card-text class="text-center">
      <a
        class="text-success text-decoration-none"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
      </a>
    </v-card-text>
  </v-card>
</template>
