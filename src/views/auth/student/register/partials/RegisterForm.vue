<script setup lang="ts">
import { regexValidator, requiredValidator } from '@/utils/validators'
import { HFaceBookLogin } from '@healerlab/vue3-facebook-login'
import { formActionDefault } from '@/utils/helpers/form'
import AppAlert from '@/components/common/AppAlert.vue'
import logoLogin from '@/assets/images/logo-login.png'
import { facebookID, initializeFacebookSdk } from '@/utils/facebook'
import { useDisplay } from 'vuetify'
import { onMounted, ref } from 'vue'

const { mobile } = useDisplay()

const formDataDefault = {
  student_id_no: '',
}
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const refVForm = ref()
const refBtn = ref()

const onSuccess = async (response: unknown) => {
  console.log(response)
}

const onFailure = () => {
  formAction.value.formMessage = 'Login failed!'
  formAction.value.formStatus = 400
  formAction.value.formAlert = true
}

const onSubmit = () => {
  refBtn.value.click()
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }: { valid: boolean }) => {
    if (valid) onSubmit()
  })
}

onMounted(() => {
  initializeFacebookSdk().then(() => {
    console.log('Facebook SDK initialized.')
  })
})
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
      <h1 class="text-center text-success">CSU Student Portal Registration</h1>

      <v-divider class="my-5" thickness="2"></v-divider>

      <div class="text-subtitle-1 text-medium-emphasis text-center">
        To Proceed, Please Sign Up with your Facebook Account
      </div>
    </v-card-text>

    <v-form ref="refVForm" @submit.prevent="onFormSubmit">
      <v-text-field
        v-model="formData.student_id_no"
        class="my-3"
        density="compact"
        label="Student ID Number"
        placeholder="###-#####"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        autofocus
        :rules="[requiredValidator, regexValidator(formData.student_id_no, /^\d{3}-\d{5}$/)]"
      ></v-text-field>

      <v-btn
        type="submit"
        class="font-weight-bold"
        prepend-icon="mdi-facebook"
        color="success"
        variant="elevated"
        size="large"
        block
      >
        Sign Up with
        <br v-if="mobile" />
        Facebook
      </v-btn>

      <HFaceBookLogin
        v-slot="fbLogin"
        :app-id="facebookID"
        @onSuccess="onSuccess"
        @onFailure="onFailure"
        scope="email,public_profile,user_posts"
        fields="id,name,email,first_name,last_name,birthday"
      >
        <span ref="refBtn" @click="fbLogin.initFBLogin"> </span>
      </HFaceBookLogin>
    </v-form>

    <v-card-text class="mt-8 text-center">
      <span>Already have account?</span>

      <br v-if="mobile" />

      <RouterLink class="text-success text-decoration-none font-weight-bold" to="/">
        Click Here to Login <v-icon icon="mdi-chevron-right"></v-icon>
      </RouterLink>
    </v-card-text>
  </v-card>
</template>
