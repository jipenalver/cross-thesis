import type { TableHeader } from '@/utils/helpers/table'

// Table Headers
export const tableHeaders: TableHeader[] = [
  {
    title: 'Email',
    key: 'email',
    sortable: false,
    align: 'start',
  },
  {
    title: 'Fullname',
    key: 'lastname',
    sortable: false,
    align: 'start',
  },
  {
    title: 'Phone',
    key: 'phone',
    sortable: false,
    align: 'start',
  },

  {
    title: 'Student ID No.',
    key: 'student_id_no',
    sortable: false,
    align: 'start',
  },
  {
    title: 'FB ID',
    key: 'fb_user_id',
    sortable: false,
    align: 'start',
  },

  {
    title: 'Registered Date',
    key: 'created_at',
    sortable: false,
    align: 'center',
  },
]
