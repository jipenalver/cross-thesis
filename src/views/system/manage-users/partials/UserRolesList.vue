<script setup lang="ts">
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import UserRolesFormDialog from './UserRolesFormDialog.vue'
import { formActionDefault } from '@/utils/helpers/form'
import AppAlert from '@/components/common/AppAlert.vue'
import { useUserRolesStore } from '@/stores/userRoles'
import type { UserRole } from '@/stores/userRoles'
import { onMounted, ref } from 'vue'

const userRolesStore = useUserRolesStore()

const formAction = ref({ ...formActionDefault })
const isDialogVisible = ref(false)
const isConfirmDeleteDialog = ref(false)
const itemData = ref<UserRole | null>(null)
const deleteId = ref<number | undefined>(0)

const onUpdate = (item: UserRole) => {
  itemData.value = item
  isDialogVisible.value = true
}

const onAdd = () => {
  itemData.value = null
  isDialogVisible.value = true
}

const onDelete = (id: number | undefined) => {
  deleteId.value = id
  isConfirmDeleteDialog.value = true
}

const onConfirmDelete = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  deleteId.value = deleteId.value ? deleteId.value : 0
  const { error } = await userRolesStore.deleteUserRole(deleteId.value)

  formAction.value.formProcess = false

  if (error) {
    formAction.value.formMessage = error.message
    formAction.value.formStatus = 400
    formAction.value.formAlert = true
    return
  }

  formAction.value.formMessage = 'Successfully Deleted User Role.'
  formAction.value.formAlert = true
  await userRolesStore.getUserRoles()
}

onMounted(async () => {
  if (userRolesStore.userRoles?.length == 0) await userRolesStore.getUserRoles()
})
</script>

<template>
  <AppAlert
    v-model:is-alert-visible="formAction.formAlert"
    :form-message="formAction.formMessage"
    :form-status="formAction.formStatus"
  ></AppAlert>

  <v-row>
    <v-col cols="12" sm="4" v-for="item in userRolesStore.userRoles" :key="item.id">
      <v-card>
        <v-card-title class="mt-3 font-weight-bold"> {{ item.user_role }} </v-card-title>
        <v-card-text class="d-flex align-center justify-space-between">
          <v-spacer></v-spacer>

          <div class="d-flex flex-wrap ga-2">
            <v-btn variant="text" density="comfortable" @click="onUpdate(item)" icon>
              <v-icon icon="mdi-tag-edit"></v-icon>
              <v-tooltip activator="parent" location="top">Edit Role</v-tooltip>
            </v-btn>
            <v-btn
              variant="text"
              density="comfortable"
              @click="onDelete(item.id)"
              :disabled="item.pages.length != 1"
              icon
            >
              <v-icon icon="mdi-tag-remove" color="red-darken-4"> </v-icon>
              <v-tooltip activator="parent" location="top">Delete Role</v-tooltip>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="4">
      <v-card>
        <v-card-title class="mt-3 d-flex justify-end">
          <v-btn prepend-icon="mdi-tag-plus" color="red-darken-4" @click="onAdd"> Add Role </v-btn>
        </v-card-title>
        <v-card-text class="mt-2 mb-1 text-end"> Add Role if it doesn't exist. </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <UserRolesFormDialog
    v-model:is-dialog-visible="isDialogVisible"
    :item-data="itemData"
  ></UserRolesFormDialog>

  <ConfirmDialog
    v-model:is-dialog-visible="isConfirmDeleteDialog"
    title="Confirm Delete"
    text="Are you sure you want to delete user role?"
    @confirm="onConfirmDelete"
  ></ConfirmDialog>
</template>
