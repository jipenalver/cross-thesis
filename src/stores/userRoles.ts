import { supabase } from '@/utils/supabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface UserRole {
  id?: number
  user_role: string
  pages: string[]
}

export const useUserRolesStore = defineStore('userRoles', () => {
  // States
  const userRoles = ref<UserRole[] | null>([])

  // Reset State Action
  function $reset() {
    userRoles.value = []
  }

  // Retrieve User Roles
  async function getUserRoles() {
    const { data } = await supabase
      .from('user_roles')
      .select('*, pages: user_role_pages (page)')
      .order('user_role', { ascending: true })

    userRoles.value = data
  }

  // Add User Roles
  async function addUserRole(formData: UserRole) {
    const { pages, ...roleData } = formData

    const { data, error } = await supabase.from('user_roles').insert([roleData]).select()

    if (data) await updateUserRolePages(data[0].id, pages)

    return { data, error }
  }

  // Update User Roles
  async function updateUserRole(formData: UserRole) {
    const { pages, ...roleData } = formData

    const { data, error } = await supabase
      .from('user_roles')
      .update(roleData)
      .eq('id', roleData.id)
      .select()

    if (formData.id) await updateUserRolePages(formData.id, pages)

    return { data, error }
  }

  // Delete User Roles
  async function deleteUserRole(id: number) {
    return await supabase.from('user_roles').delete().eq('id', id)
  }

  // Update User Roles Pages
  async function updateUserRolePages(id: number, pages: string[]) {
    const { error: deleteError } = await supabase
      .from('user_role_pages')
      .delete()
      .eq('user_role_id', id)

    if (deleteError) return { error: deleteError }

    const pageData = pages.map((page) => ({ page, user_role_id: id }))

    const { data, error: insertError } = await supabase
      .from('user_role_pages')
      .insert(pageData)
      .select()

    return { data, error: insertError }
  }

  return { userRoles, $reset, getUserRoles, addUserRole, updateUserRole, deleteUserRole }
})
