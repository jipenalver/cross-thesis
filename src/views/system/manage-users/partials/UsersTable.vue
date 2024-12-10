<script setup lang="ts">
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { formActionDefault } from '@/utils/helpers/form'
import AppAlert from '@/components/common/AppAlert.vue'
import UsersFormDialog from './UsersFormDialog.vue'
import type { User } from '@supabase/supabase-js'
import { tableHeaders } from './usersTableUtils'
import { useUsersStore } from '@/stores/users'
import type { FormUser } from '@/stores/users'
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
const isDialogVisible = ref(false)
const isConfirmDeleteDialog = ref(false)
const itemData = ref<FormUser | null>(null)
const deleteId = ref<string | undefined>('')

const onUpdate = (item: Partial<User>) => {
  const { id, email, phone, user_metadata } = item
  itemData.value = { id, email, phone, ...user_metadata }
  isDialogVisible.value = true
}

const onAdd = () => {
  itemData.value = null
  isDialogVisible.value = true
}

const onDelete = (id: string | undefined) => {
  deleteId.value = id
  isConfirmDeleteDialog.value = true
}

const onConfirmDelete = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { error } = await usersStore.deleteUser(deleteId.value ?? '')

  formAction.value.formProcess = false

  if (error) {
    formAction.value.formMessage = error.message
    formAction.value.formStatus = 400
    formAction.value.formAlert = true
    return
  }

  formAction.value.formMessage = 'Successfully Deleted User Role.'
  formAction.value.formAlert = true
  onLoadItems(tableOptions.value)
}

// Load Tables Data
const onLoadItems = async ({ page, itemsPerPage }: { page: number; itemsPerPage: number }) => {
  tableOptions.value.isLoading = true

  await usersStore.getUsersTable({ page, itemsPerPage })

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
        :items="usersStore.usersTable"
        :items-length="usersStore.usersTotal"
        @update:options="onLoadItems"
        :hide-default-header="mobile"
        :mobile="mobile"
      >
        <template #top>
          <v-row dense>
            <v-spacer></v-spacer>

            <v-col cols="12" sm="3">
              <v-btn
                class="my-1"
                prepend-icon="mdi-account-plus"
                color="red-darken-4"
                block
                @click="onAdd"
              >
                Add User
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="my-5"></v-divider>
        </template>

        <template #item.lastname="{ item }">
          <span class="font-weight-bold">
            {{ item.user_metadata?.lastname }}, {{ item.user_metadata?.firstname }}
          </span>
        </template>

        <template #item.phone="{ item }">
          {{ item.user_metadata?.phone }}
        </template>

        <template #item.user_role="{ item }">
          {{ item.user_metadata?.user_role }}
        </template>

        <template #item.created_at="{ item }">
          <span class="font-weight-bold">
            {{ date.format(item.created_at, 'fullDateTime') }}
          </span>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex align-center" :class="mobile ? 'justify-end' : 'justify-center'">
            <v-btn variant="text" density="comfortable" @click="onUpdate(item)" icon>
              <v-icon icon="mdi-pencil"></v-icon>
              <v-tooltip activator="parent" location="top">Edit User</v-tooltip>
            </v-btn>

            <v-btn
              variant="text"
              density="comfortable"
              :disabled="item.user_metadata?.is_admin"
              @click="onDelete(item.id)"
              icon
            >
              <v-icon icon="mdi-trash-can" color="red-darken-4"></v-icon>
              <v-tooltip activator="parent" location="top">Delete User</v-tooltip>
            </v-btn>
          </div>
        </template>
      </v-data-table-server>
    </v-col>
  </v-row>

  <UsersFormDialog
    v-model:is-dialog-visible="isDialogVisible"
    :item-data="itemData"
    :table-options="tableOptions"
  ></UsersFormDialog>

  <ConfirmDialog
    v-model:is-dialog-visible="isConfirmDeleteDialog"
    title="Confirm Delete"
    text="Are you sure you want to delete user?"
    @confirm="onConfirmDelete"
  ></ConfirmDialog>
</template>
