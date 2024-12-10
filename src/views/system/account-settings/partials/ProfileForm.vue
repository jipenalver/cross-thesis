<script setup lang="ts">
import { integerValidator, requiredValidator } from '@/utils/validators'
import type { DataResponse, ErrorResponse } from '@/stores/authUser'
import AppAlert from '@/components/common/AppAlert.vue'
import { formActionDefault } from '@/utils/helpers/form'
import { useAuthUserStore } from '@/stores/authUser'
import { ref } from 'vue'

const authStore = useAuthUserStore()

const formDataDefault = {
  firstname: authStore.userData?.firstname,
  middlename: authStore.userData?.middlename,
  lastname: authStore.userData?.lastname,
  email: authStore.userData?.email,
  phone: authStore.userData?.phone,
}
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const refVForm = ref()

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { data, error } = (await authStore.updateUserInformation(formData.value)) as
    | DataResponse
    | ErrorResponse

  if (error) {
    formAction.value.formMessage = error.message
    formAction.value.formStatus = error.status
    formAction.value.formAlert = true
  } else if (data) {
    formAction.value.formMessage = 'Successfully Updated Account.'
    formAction.value.formAlert = true
  }

  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }: { valid: boolean }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <AppAlert
    v-model:is-alert-visible="formAction.formAlert"
    :form-message="formAction.formMessage"
    :form-status="formAction.formStatus"
  ></AppAlert>

  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
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

      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          disabled
          v-model="formData.email"
          label="Email"
          prepend-inner-icon="mdi-email-outline"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="formData.phone"
          label="Phone Number"
          prepend-inner-icon="mdi-phone"
          prefix="+63"
          :rules="[requiredValidator, integerValidator]"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-btn
      class="mt-2"
      type="submit"
      color="green-darken-4"
      prepend-icon="mdi-account-box-edit-outline"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
    >
      Update Information
    </v-btn>
  </v-form>
</template>
