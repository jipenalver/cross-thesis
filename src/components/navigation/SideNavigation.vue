<script setup lang="ts">
import { mainNav, menuItemsNav1, menuItemsNav2 } from './sideNavigation'
import { useAuthUserStore } from '@/stores/authUser'
import { onMounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps<{
  isDrawerVisible: boolean
}>()

const emit = defineEmits(['update:isAlertVisible'])

const { mobile } = useDisplay()

const authStore = useAuthUserStore()

const noAccessPages = ref<string[]>([])
const editableMenuItemsNav1 = ref([...menuItemsNav1])
const editableMenuItemsNav2 = ref([...menuItemsNav2])

watch(
  () => props.isDrawerVisible,
  () => {
    setTimeout(() => {
      emit('update:isAlertVisible', false)
    }, 10000)
  },
)

const onFilterPages = async () => {
  if (authStore.userRole === 'Super Administrator') return

  const menuItems = [
    { items: editableMenuItemsNav1, title: mainNav[0][0] },
    { items: editableMenuItemsNav2, title: mainNav[1][0] },
  ]

  menuItems.forEach(({ items, title }) => {
    items.value = items.value.filter((item) => authStore.authPages.includes(item[3]))
    if (items.value.length === 0) noAccessPages.value.push(title)
  })
}

onMounted(() => {
  onFilterPages()
})
</script>

<template>
  <v-navigation-drawer
    :model-value="props.isDrawerVisible"
    :persistent="mobile"
    :temporary="mobile"
    :permanent="!mobile"
    :width="275"
    expand-on-hover
    rail
  >
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        to="/dashboard"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list-group :key="i" v-for="([title, icon], i) in mainNav" fluid>
        <template #activator="{ props }" v-if="!noAccessPages.includes(title)">
          <v-list-item v-bind="props" :prepend-icon="icon" :title="title"></v-list-item>
        </template>

        <template v-if="title === mainNav[0][0]">
          <v-list-item
            v-for="([title, icon, subtitle, to], i) in editableMenuItemsNav1"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefined"
          ></v-list-item>
        </template>

        <template v-if="title === mainNav[1][0]">
          <v-list-item
            v-for="([title, icon, subtitle, to], i) in editableMenuItemsNav2"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefined"
          ></v-list-item>
        </template>
      </v-list-group>

      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-wrench"
        title="Account Settings"
        to="/account/settings"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
