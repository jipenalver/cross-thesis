import LoginView from '@/views/auth/login/LoginView.vue'
import RegisterView from '@/views/auth/register/RegisterView.vue'
import AdminLoginView from '@/views/auth/admin/AdminLoginView.vue'
import AdminDashboardView from '@/views/system/admin/dashboard/AdminDashboardView.vue'

export const routes = [
  // Auth
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLoginView,
  },

  // Dashboard
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: AdminDashboardView,
  },
]
