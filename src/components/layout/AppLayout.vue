<script setup lang="ts">
import TopProfileNavigation from '@/components/navigation/TopProfileNavigation.vue'
import imgTopNav from '@/assets/images/img-top-nav.png'
import { useAuthUserStore } from '@/stores/authUser'
import { useDisplay } from 'vuetify'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  isWithAppBarIcon?: boolean
}>()

const emit = defineEmits(['isDrawerVisible'])

const { mobile } = useDisplay()

const authStore = useAuthUserStore()

const isLoggedIn = ref(false)
const isMobileLogged = ref(false)
const theme = ref(localStorage.getItem('theme') ?? 'light')

function onToggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

// Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await authStore.isAuthenticated()

  isMobileLogged.value = mobile.value && isLoggedIn.value
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
})
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar theme="dark" :image="imgTopNav" class="px-3">
        <v-app-bar-nav-icon
          v-if="props.isWithAppBarIcon"
          icon="mdi-menu"
          :theme="theme"
          @click="emit('isDrawerVisible')"
        >
        </v-app-bar-nav-icon>

        <v-app-bar-title>
          <RouterLink to="/" class="text-decoration-none text-white">
            <span class="font-weight-black">SIAM Analytics</span>
          </RouterLink>
        </v-app-bar-title>

        <v-btn
          class="me-2"
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          slim
          @click="onToggleTheme"
        ></v-btn>

        <TopProfileNavigation v-if="isLoggedIn"></TopProfileNavigation>
      </v-app-bar>

      <slot name="navigation"></slot>

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
