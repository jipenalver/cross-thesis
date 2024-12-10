<script setup lang="ts">
import SideNavigation from '@/components/navigation/SideNavigation.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const authStore = useAuthUserStore()

const isLoggedIn = ref(false)
const isDrawerVisible = ref(mobile.value ? false : true)

const getLoggedStatus = async () => {
  isLoggedIn.value = await authStore.isAuthenticated()
}

onMounted(() => {
  getLoggedStatus()
})
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="isLoggedIn"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation v-if="isLoggedIn">
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <template #content>
      <v-container>
        <v-row>
          <v-col class="mx-auto mt-16 text-center" cols="12" lg="4">
            <h1 class="text-h1 font-weight-black text-green-darken-4">404</h1>
            <h2 class="text-h2 font-weight-black mb-2">Page Not Found</h2>

            <p class="text-subtitle-1 font-weight-bold mb-4">Page does not exist.</p>

            <v-btn class="mt-2" color="green-darken-4" prepend-icon="mdi-home" to="/">
              Back to {{ isLoggedIn ? 'Dashboard' : 'Homepage' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
