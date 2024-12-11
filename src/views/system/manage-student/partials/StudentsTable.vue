<script setup lang="ts">
import { formActionDefault } from '@/utils/helpers/form'
import AppAlert from '@/components/common/AppAlert.vue'
import { tableHeaders } from './studentsTableUtils'
import { useUsersStore } from '@/stores/users'
import { useDisplay } from 'vuetify'
import { useDate } from 'vuetify'
import { ref } from 'vue'

const date = useDate()
const { mobile } = useDisplay()

const usersStore = useUsersStore()

const tableOptions = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  isLoading: false,
})
const formAction = ref({ ...formActionDefault })

const onLoadItems = async ({ page, itemsPerPage }: { page: number; itemsPerPage: number }) => {
  tableOptions.value.isLoading = true

  await usersStore.getStudentsTable({ page, itemsPerPage })

  tableOptions.value.isLoading = false
}
</script>

<template>
  <AppAlert
    v-model:is-alert-visible="formAction.formAlert"
    :form-message="formAction.formMessage"
    :form-status="formAction.formStatus"
  ></AppAlert>

  <v-row>
    <v-col cols="12">
      <!-- eslint-disable vue/valid-v-slot -->
      <v-data-table-server
        v-model:items-per-page="tableOptions.itemsPerPage"
        v-model:page="tableOptions.page"
        v-model:sort-by="tableOptions.sortBy"
        :loading="tableOptions.isLoading"
        :headers="tableHeaders"
        :items="usersStore.studentsTable"
        :items-length="usersStore.studentsTotal"
        @update:options="onLoadItems"
        :hide-default-header="mobile"
        :mobile="mobile"
      >
        <template #top>
          <v-divider class="my-5"></v-divider>
        </template>

        <template #item.lastname="{ item }">
          <span class="font-weight-bold">
            {{ item.user_metadata?.lastname }}, {{ item.user_metadata?.firstname }}
          </span>
        </template>

        <template #item.phone="{ item }">
          {{ item.user_metadata?.phone ?? '-' }}
        </template>

        <template #item.student_id_no="{ item }">
          <span class="font-weight-bold">
            {{ item.user_metadata?.student_id_no }}
          </span>
        </template>

        <template #item.fb_user_id="{ item }">
          {{ item.user_metadata?.fb_user_id }}
        </template>

        <template #item.created_at="{ item }">
          <span class="font-weight-bold">
            {{ date.format(item.created_at, 'fullDateTime') }}
          </span>
        </template>
      </v-data-table-server>
    </v-col>
  </v-row>
</template>
