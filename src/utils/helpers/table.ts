// 👉 TableHeader Interface
export interface TableHeader {
  title: string | undefined
  key: string
  sortable: boolean | undefined
  align: 'start' | 'end' | 'center' | undefined
}

// 👉 SortBy Interface
export interface SortBy {
  key: string
  order?: boolean | 'asc' | 'desc'
}

// 👉 Table Pagination
export const tablePagination = (
  { page, itemsPerPage, sortBy }: { page: number; itemsPerPage: number; sortBy: SortBy[] },
  defaultColumn = 'id',
  isAscending = true,
) => {
  const [column, order] =
    sortBy && sortBy[0] ? [sortBy[0].key, sortBy[0].order === 'asc'] : [defaultColumn, isAscending]

  if (itemsPerPage === -1) {
    const rangeStart = 0
    const rangeEnd = 999999999999999

    return { rangeStart, rangeEnd, column, order }
  }

  const rangeStart = (page - 1) * itemsPerPage
  const rangeEnd = rangeStart + itemsPerPage - 1

  return { rangeStart, rangeEnd, column, order }
}

// 👉 Handle Search if null turn to empty string
export const tableSearch = (search: string | null | undefined) => {
  return search || ''
}
