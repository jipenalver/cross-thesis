import type { User } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/utils/supabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface FormUser {
  id?: string | undefined
  email?: string
  password?: string
  firstname?: string
  lastname?: string
  middlename?: string
  phone?: string
  user_role?: string | null
}

export const useUsersStore = defineStore('users', () => {
  // States
  const usersTable = ref<Partial<User>[]>([])
  const usersTotal = ref(0)
  const studentsTable = ref<Partial<User>[]>([])
  const studentsTotal = ref(0)

  // Reset State Action
  function $reset() {
    usersTable.value = []
    usersTotal.value = 0
  }

  // Retrieve Users
  async function getUsersTable({ page, itemsPerPage }: { page: number; itemsPerPage: number }) {
    const { data } = await supabaseAdmin.auth.admin.listUsers({
      page: page,
      perPage: itemsPerPage,
    })

    usersTable.value = data.users.filter((user) => user.user_metadata?.user_role !== 'Student')
    usersTotal.value = usersTable.value.length
  }

  // Retrieve Students
  async function getStudentsTable({ page, itemsPerPage }: { page: number; itemsPerPage: number }) {
    const { data } = await supabaseAdmin.auth.admin.listUsers({
      page: page,
      perPage: itemsPerPage,
    })

    studentsTable.value = data.users.filter((user) => user.user_metadata?.user_role === 'Student')
    studentsTotal.value = studentsTable.value.length
  }

  // Add User
  async function addUser(formData: FormUser) {
    const { email, password, ...userMetadata } = formData

    return await supabaseAdmin.auth.admin.createUser({
      email: email,
      email_confirm: true,
      password: password,
      user_metadata: { ...userMetadata },
    })
  }

  // Update User
  async function updateUser(formData: FormUser) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, email, password, ...userMetadata } = formData

    return await supabaseAdmin.auth.admin.updateUserById(id ?? '', {
      user_metadata: { ...userMetadata },
    })
  }

  // Delete User
  async function deleteUser(id: string) {
    return await supabaseAdmin.auth.admin.deleteUser(id)
  }

  return {
    usersTable,
    usersTotal,
    studentsTable,
    studentsTotal,
    $reset,
    getUsersTable,
    getStudentsTable,
    addUser,
    updateUser,
    deleteUser,
  }
})
