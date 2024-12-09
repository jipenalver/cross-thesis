import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

interface User {
  id: string
  email?: string
  firstname?: string
  lastname?: string
  middlename?: string
  user_role?: string
  is_admin?: boolean
  image_url?: string
}

interface AuthPage {
  page: string
}

export const useAuthUserStore = defineStore('authUser', () => {
  // States
  const userData = ref<User | null>(null)
  const authPages = ref<string[]>([])

  // Getters
  const userRole = computed(() => {
    return userData.value?.is_admin ? 'Super Administrator' : userData.value?.user_role
  })

  // Reset State Action
  function $reset() {
    userData.value = null
    authPages.value = []
  }

  // Actions
  // Retrieve User Session if Logged
  async function isAuthenticated() {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Error getting session:', error.message)
      return false
    }

    if (data.session) {
      const { id, email, user_metadata } = data.session.user
      userData.value = { id, email, ...user_metadata }
    }

    return !!data.session
  }

  // Retrieve User Information
  async function getUserInformation() {
    const { data } = await supabase.auth.getUser()

    if (data.user) {
      const { id, email, user_metadata } = data.user
      userData.value = { id, email, ...user_metadata }
    }
  }

  // Retrieve User Roles Pages
  async function getAuthPages(name: string) {
    const { data } = await supabase
      .from('user_roles')
      .select('*, pages: user_role_pages (page)')
      .eq('user_role', name)

    if (data && data[0]) authPages.value = data[0].pages.map((p: AuthPage) => p.page)
  }

  // Update User Information
  async function updateUserInformation(updatedData: Partial<User>) {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        ...updatedData,
      },
    })

    if (error) {
      return { error }
    }

    if (data.user) {
      const { id, email, user_metadata } = data.user
      userData.value = { id, email, ...user_metadata }
      return { data: userData.value }
    }
  }

  // Update User Profile Image
  async function updateUserImage(file: File) {
    // Upload the file with the user ID and file extension
    const { data, error } = await supabase.storage
      .from('shirlix')
      .upload('avatars/' + userData.value?.id + '-avatar.png', file, {
        cacheControl: '3600',
        upsert: true,
      })

    // Check if it has error
    if (error) {
      return { error }
    }
    // If no error set data to userData state with the image_url
    else if (data) {
      // Retrieve Image Public Url
      const { data: imageData } = supabase.storage.from('shirlix').getPublicUrl(data.path)

      // Update the user information with the new image_url
      return await updateUserInformation({ ...userData.value, image_url: imageData.publicUrl })
    }
  }

  return {
    userData,
    userRole,
    authPages,
    $reset,
    isAuthenticated,
    getUserInformation,
    getAuthPages,
    updateUserInformation,
    updateUserImage,
  }
})
