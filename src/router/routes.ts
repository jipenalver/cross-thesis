import StudentLoginView from '@/views/auth/student/login/StudentLoginView.vue'
import StudentRegisterView from '@/views/auth/student/register/StudentRegisterView.vue'
import AdminLoginView from '@/views/auth/admin/login/AdminLoginView.vue'
import AdminDashboardView from '@/views/system/admin/dashboard/AdminDashboardView.vue'

export const routes = [
  // Auth
  {
    path: '/',
    name: 'login',
    component: StudentLoginView,
  },
  {
    path: '/student/register',
    name: 'register',
    component: StudentRegisterView,
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
