<script setup lang="ts">
import logoLogin from '@/assets/images/logo-login.png'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
  <v-img class="mx-auto my-6" max-width="228" :src="logoLogin"></v-img>

  <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
    <v-card-text>
      <h1 class="text-center text-success">CSU Student Portal Registration</h1>

      <v-divider class="my-5" thickness="2"></v-divider>

      <div class="text-subtitle-1 text-medium-emphasis text-center">
        To Proceed, Please Sign Up with your Facebook Account
      </div>
    </v-card-text>

    <v-form>
      <v-text-field
        class="mt-3"
        density="compact"
        label="Student ID Number"
        placeholder="###-#####"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        autofocus
      ></v-text-field>

      <v-btn
        class="font-weight-bold"
        prepend-icon="mdi-facebook"
        color="success"
        variant="elevated"
        size="large"
        block
      >
        Sign Up with
        <br v-if="mobile" />
        Facebook
      </v-btn>
    </v-form>

    <v-card-text class="mt-8 text-center">
      <span>Already have account?</span>

      <br v-if="mobile" />

      <RouterLink class="text-success text-decoration-none font-weight-bold" to="/">
        Click Here to Login <v-icon icon="mdi-chevron-right"></v-icon>
      </RouterLink>
    </v-card-text>
  </v-card>
</template>
