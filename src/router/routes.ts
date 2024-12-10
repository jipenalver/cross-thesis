import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import StudentLoginView from '@/views/auth/student/login/StudentLoginView.vue'
import StudentRegisterView from '@/views/auth/student/register/StudentRegisterView.vue'
import AdminLoginView from '@/views/auth/admin/login/AdminLoginView.vue'
import DashboardView from '@/views/system/dashboard/DashboardView.vue'
import AccountSettingsView from '@/views/system/account-settings/AccountSettingsView.vue'
import UserRolesView from '@/views/system/manage-users/UserRolesView.vue'
import UsersView from '@/views/system/manage-users/UsersView.vue'

export const routes: Array<RouteRecordRaw> = [
  // Auth
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: StudentLoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/student/register',
    name: 'register',
    component: StudentRegisterView,
    meta: { requiresAuth: false },
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLoginView,
    meta: { requiresAuth: false },
  },

  // Dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true, isDefault: true },
  },
  {
    path: '/account/settings',
    name: 'account-settings',
    component: AccountSettingsView,
    meta: { requiresAuth: true, isDefault: true },
  },
  // Admin Pages
  {
    path: '/manage/user/roles',
    name: 'manage-user-roles',
    component: UserRolesView,
    meta: { requiresAuth: true },
  },
  {
    path: '/manage/users',
    name: 'manage-users',
    component: UsersView,
    meta: { requiresAuth: true },
  },

  // Errors Pages
  {
    path: '/forbidden',
    name: 'forbidden',
    component: ForbiddenView,
    meta: { isDefault: true },
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView,
    meta: { isDefault: true },
  },
]
