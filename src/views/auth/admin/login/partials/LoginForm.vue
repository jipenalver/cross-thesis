<script setup lang="ts">
import { emailValidator, requiredValidator } from '@/utils/validators'
import { formActionDefault } from '@/utils/helpers/form'
import AppAlert from '@/components/common/AppAlert.vue'
import logoLogin from '@/assets/images/logo-login.png'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

const { mobile } = useDisplay()
const router = useRouter()

const formDataDefault = {
  email: '',
  password: '',
}
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const isPasswordVisible = ref(false)
const refVForm = ref()

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    formAction.value.formMessage = error.message
    formAction.value.formStatus = error.status
    formAction.value.formAlert = true
  } else if (data) {
    formAction.value.formMessage = 'Successfully Logged Account.'
    formAction.value.formAlert = true
    router.replace('/dashboard')
  }

  refVForm.value?.reset()
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

  <v-img class="mx-auto my-6" max-width="228" :src="logoLogin"></v-img>

  <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
    <v-card-text>
      <h1 class="text-center text-success">Guidance Office Admin</h1>

      <v-divider class="my-5" thickness="2"></v-divider>
    </v-card-text>

    <v-form ref="refVForm" @submit.prevent="onFormSubmit">
      <v-text-field
        v-model="formData.email"
        class="my-3"
        density="compact"
        placeholder="jdoe@carsu.edu.ph"
        label="Email Address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        :rules="[requiredValidator, emailValidator]"
      ></v-text-field>

      <v-text-field
        v-model="formData.password"
        class="my-3"
        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVisible ? 'text' : 'password'"
        density="compact"
        placeholder="Password"
        label="Password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="isPasswordVisible = !isPasswordVisible"
        :rules="[requiredValidator]"
      ></v-text-field>

      <v-btn
        type="submit"
        class="font-weight-bold"
        prepend-icon="mdi-login"
        color="success"
        variant="elevated"
        size="large"
        block
        :disabled="formAction.formProcess"
        :loading="formAction.formProcess"
      >
        Login
      </v-btn>
    </v-form>

    <v-card-text class="mt-8 text-center">
      <span>Are you a student?</span>

      <br v-if="mobile" />

      <RouterLink class="text-success text-decoration-none font-weight-bold" to="/">
        Click Here to Login <v-icon icon="mdi-chevron-right"></v-icon>
      </RouterLink>
    </v-card-text>
  </v-card>
</template>
