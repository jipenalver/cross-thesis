<script setup lang="ts">
import { emailValidator, passwordValidator, requiredValidator } from '@/utils/validators'
import { formActionDefault } from '@/utils/helpers/form'
import AppAlert from '@/components/common/AppAlert.vue'
import { useUserRolesStore } from '@/stores/userRoles'
import { useUsersStore } from '@/stores/users'
import { onMounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps(['isDialogVisible', 'itemData', 'tableOptions'])

const emit = defineEmits(['update:isDialogVisible'])

const { mdAndDown } = useDisplay()

const userRolesStore = useUserRolesStore()
const usersStore = useUsersStore()

const formDataDefault = {
  email: '',
  password: '',
  firstname: '',
  middlename: '',
  lastname: '',
  phone: '',
  user_role: null,
}
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const refVForm = ref()
const isPasswordVisible = ref(false)
const isUpdate = ref(false)

watch(
  () => props.itemData,
  () => {
    isUpdate.value = props.itemData ? true : false
    formData.value = props.itemData ? { ...props.itemData } : { ...formDataDefault }
  },
)

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { data, error } = isUpdate.value
    ? await usersStore.updateUser(formData.value)
    : await usersStore.addUser(formData.value)

  if (error) {
    formAction.value.formMessage = error.message
    formAction.value.formStatus = 400
    formAction.value.formAlert = true
    formAction.value.formProcess = false
  } else if (data) {
    formAction.value.formMessage = isUpdate.value
      ? 'Successfully Updated User Information.'
      : 'Successfully Added User.'
    formAction.value.formAlert = true
    await usersStore.getUsersTable(props.tableOptions)

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

  <v-dialog
    :max-width="mdAndDown ? undefined : '800'"
    :model-value="props.isDialogVisible"
    :fullscreen="mdAndDown"
    persistent
  >
    <v-card prepend-icon="mdi-account" title="User Information">
      <v-form ref="refVForm" @submit.prevent="onFormSubmit">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="formData.firstname"
                label="Firstname"
                :rules="[requiredValidator]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field v-model="formData.middlename" label="Middlename"></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                v-model="formData.lastname"
                label="Lastname"
                :rules="[requiredValidator]"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                v-model="formData.user_role"
                label="User Role"
                :items="userRolesStore.userRoles ?? []"
                item-title="user_role"
                item-value="user_role"
                clearable
                :rules="[requiredValidator]"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.email"
                label="Email"
                prepend-inner-icon="mdi-email-outline"
                :readonly="isUpdate"
                :rules="[requiredValidator, emailValidator]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.phone"
                label="Phone"
                prepend-inner-icon="mdi-phone"
                prefix="+63"
                :rules="[requiredValidator]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" v-if="!isUpdate">
              <v-text-field
                v-model="formData.password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :rules="[requiredValidator, passwordValidator]"
              ></v-text-field>
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
            {{ isUpdate ? 'Update User' : 'Add User' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
