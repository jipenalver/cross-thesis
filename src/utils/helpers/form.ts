interface FormAction {
  formProcess: boolean
  formAlert: boolean
  formStatus: number | undefined
  formMessage: string
}

// 👉 Form Action utils
export const formActionDefault: FormAction = {
  formProcess: false,
  formAlert: false,
  formStatus: 200,
  formMessage: '',
}
