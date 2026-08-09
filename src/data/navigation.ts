export interface NavLink {
  label: string
  path: string
  badge?: string
}

export const navLinks: NavLink[] = [
  { label: 'Начало', path: '/' },
  { label: 'За нас', path: '/about' },
  { label: 'Създатели', path: '/creators' },
  { label: 'Събития', path: '/events' },
  { label: 'Подкаст', path: '/podcast', badge: 'Скоро' },
  { label: 'Контакти', path: '/contact' },
]
