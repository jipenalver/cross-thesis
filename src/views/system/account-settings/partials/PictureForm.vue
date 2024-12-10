<script setup lang="ts">
import { imageValidator, requiredValidator } from '@/utils/validators'
import type { DataResponse, ErrorResponse } from '@/stores/authUser'
import imgProfile from '@/assets/images/img-profile.png'
import { formActionDefault } from '@/utils/helpers/form'
import AppAlert from '@/components/common/AppAlert.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { fileExtract } from '@/utils/helpers/others'
import { ref } from 'vue'

const authStore = useAuthUserStore()

const formDataDefault = {
  image: null as File | null,
}
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const refVForm = ref()
const imgPreview = ref(authStore.userData?.image_url || imgProfile)

const onPreview = async (event: Event) => {
  const { fileObject, fileUrl } = await fileExtract(event)
  formData.value.image = fileObject
  imgPreview.value = fileUrl
}

const onPreviewReset = () => {
  imgPreview.value = authStore.userData?.image_url || imgProfile
}

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { data, error } = (await authStore.updateUserImage(formData.value.image)) as
    | DataResponse
    | ErrorResponse

  if (error) {
    formAction.value.formMessage = error.message
    formAction.value.formStatus = error.status
    formAction.value.formAlert = true
  } else if (data) {
    formAction.value.formMessage = 'Successfully Updated Profile Image.'
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
    <v-row>
      <v-col cols="12" sm="6" md="5">
        <v-img
          width="55%"
          class="mx-auto rounded-circle"
          color="green-darken-4"
          aspect-ratio="1"
          :src="imgPreview"
          alt="Profile Picture Preview"
          cover
        >
        </v-img>
      </v-col>

      <v-col cols="12" sm="6" md="7">
        <v-file-input
          class="mt-5"
          :rules="[requiredValidator, imageValidator]"
          accept="image/png, image/jpeg, image/bmp"
          label="Browse Profile Picture"
          placeholder="Browse Profile Picture"
          prepend-icon="mdi-camera"
          show-size
          chips
          @change="onPreview"
          @click:clear="onPreviewReset"
        ></v-file-input>

        <v-btn
          class="mt-2"
          type="submit"
          color="green-darken-4"
          prepend-icon="mdi-image-edit"
          :disabled="formAction.formProcess"
          :loading="formAction.formProcess"
        >
          Update Picture
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
