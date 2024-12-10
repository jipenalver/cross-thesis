import type { RouteRecordRaw } from 'vue-router'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import StudentLoginView from '@/views/auth/student/login/StudentLoginView.vue'
import StudentRegisterView from '@/views/auth/student/register/StudentRegisterView.vue'
import AdminLoginView from '@/views/auth/admin/login/AdminLoginView.vue'
import DashboardView from '@/views/system/dashboard/DashboardView.vue'

export const routes: Array<RouteRecordRaw> = [
  // Auth
  {
    path: '/',
    name: 'home',
    component: StudentLoginView,
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
