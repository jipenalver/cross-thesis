import { supabaseAdmin } from '@/utils/supabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: string
  email?: string
  firstname?: string
  lastname?: string
  middlename?: string
  user_role?: string
  is_admin?: boolean
  image_url?: string
  phone?: string
}

export const useUsersStore = defineStore('users', () => {
  // States
  const usersTable = ref<User[]>([])
  const usersTotal = ref(0)

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

    console.log(data)

    // Set the retrieved data to state
    // usersTable.value = users
    // usersTotal.value = total
  }

  // Add User
  async function addUser(formData) {
    const { password, branch, ...userMetadata } = formData

    return await supabaseAdmin.auth.admin.createUser({
      email: formData.email,
      email_confirm: true,
      password: formData.password,
      user_metadata: { ...userMetadata, branch: branch.toString() },
    })
  }

  // Update User
  async function updateUser(formData) {
    const { email, password, branch, ...userMetadata } = formData

    return await supabaseAdmin.auth.admin.updateUserById(formData.id, {
      user_metadata: { ...userMetadata, branch: branch.toString() },
    })
  }

  // Delete User
  async function deleteUser(id) {
    return await supabaseAdmin.auth.admin.deleteUser(id)
  }

  return { usersTable, usersTotal, $reset, getUsersTable, addUser, updateUser, deleteUser }
})
