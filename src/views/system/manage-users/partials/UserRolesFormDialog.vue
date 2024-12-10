<script setup lang="ts">
import { mainNav, menuItemsNav1, menuItemsNav2 } from '@/components/navigation/sideNavigation'
import { formActionDefault } from '@/utils/helpers/form'
import AppAlert from '@/components/common/AppAlert.vue'
import { useUserRolesStore } from '@/stores/userRoles'
import { requiredValidator } from '@/utils/validators'
import { useDisplay } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps(['isDialogVisible', 'itemData'])

const emit = defineEmits(['update:isDialogVisible'])

const { mdAndDown } = useDisplay()

const userRolesStore = useUserRolesStore()

const formDataDefault = {
  user_role: '',
  pages: [],
}
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const refVForm = ref()
const isUpdate = ref(false)
const openedPages = ref(mainNav.map((elem) => elem[0]))

watch(
  () => props.itemData,
  () => {
    isUpdate.value = props.itemData ? true : false
    formData.value = props.itemData
      ? { ...props.itemData, pages: props.itemData.pages.map((p: { page: string }) => p.page) }
      : { ...formDataDefault }
  },
)

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { data, error } = isUpdate.value
    ? await userRolesStore.updateUserRole(formData.value)
    : await userRolesStore.addUserRole(formData.value)

  if (error) {
    formAction.value.formMessage = error.message
    formAction.value.formStatus = 400
    formAction.value.formAlert = true
    formAction.value.formProcess = false
  } else if (data) {
    formAction.value.formMessage = isUpdate.value
      ? "Successfully Updated User Role's Pages"
      : 'Successfully Added User Role.'
    formAction.value.formAlert = true
    await userRolesStore.getUserRoles()

    setTimeout(() => {
      onFormReset()
    }, 2500)
  }
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }: { valid: boolean }) => {
    if (valid) onSubmit()
  })
}

const onFormReset = () => {
  formAction.value = { ...formActionDefault }
  formData.value = { ...formDataDefault }
  emit('update:isDialogVisible', false)
}
</script>

<template>
  <AppAlert
    v-model:is-alert-visible="formAction.formAlert"
    :form-message="formAction.formMessage"
    :form-status="formAction.formStatus"
  ></AppAlert>

  <v-dialog
    :max-width="mdAndDown ? undefined : '600'"
    :model-value="props.isDialogVisible"
    :fullscreen="mdAndDown"
    persistent
  >
    <v-card
      prepend-icon="mdi-tag"
      title="User Role"
      subtitle="Note: The Dashboard and Account Settings Page are accessible by default."
    >
      <v-form ref="refVForm" @submit.prevent="onFormSubmit">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="formData.user_role"
                label="Role Name"
                :rules="[requiredValidator]"
                :disabled="isUpdate"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-list v-model:opened="openedPages" density="compact" nav>
                <v-list-group v-for="([title, icon], i) in mainNav" :key="i" :value="title">
                  <template #activator="{ props }">
                    <v-list-item v-bind="props" :prepend-icon="icon" :title="title"></v-list-item>
                  </template>

                  <template v-if="title === mainNav[0][0]">
                    <v-list-item
                      v-for="([title, icon, subtitle, to], i) in menuItemsNav1"
                      :key="i"
                      :prepend-icon="icon"
                      :title="title"
                      :subtitle="subtitle ?? undefined"
                    >
                      <template #append>
                        <v-list-item-action end>
                          <v-checkbox-btn v-model="formData.pages" :value="to"></v-checkbox-btn>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>

                  <template v-if="title === mainNav[1][0]">
                    <v-list-item
                      v-for="([title, icon, subtitle, to], i) in menuItemsNav2"
                      :key="i"
                      :prepend-icon="icon"
                      :title="title"
                      :subtitle="subtitle ?? undefined"
                    >
                      <template #append>
                        <v-list-item-action end>
                          <v-checkbox-btn v-model="formData.pages" :value="to"></v-checkbox-btn>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-list-group>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" prepend-icon="mdi-close" @click="onFormReset"></v-btn>

          <v-btn
            prepend-icon="mdi-pencil"
            color="red-darken-4"
            type="submit"
            variant="elevated"
            :disabled="formAction.formProcess"
            :loading="formAction.formProcess"
          >
            {{ isUpdate ? 'Update Role' : 'Add Role' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
