<script setup lang="ts">
import imgTopNav from '@/assets/images/img-top-nav.png'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

const { mobile } = useDisplay()

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar theme="dark" :image="imgTopNav" class="px-3">
        <v-app-bar-nav-icon icon="mdi-menu" :theme="theme"> </v-app-bar-nav-icon>

        <v-app-bar-title>
          <span class="font-weight-black">SIAM Analytics</span>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <slot name="content"></slot>
      </v-main>

      <v-footer class="d-flex justify-center" border app>
        <span class="font-weight-bold" :class="mobile ? 'text-caption' : ''">
          Copyright © 2024 - SIAM - CSU | All Rights Reserved
        </span>
      </v-footer>
    </v-app>
  </v-responsive>
</template>
