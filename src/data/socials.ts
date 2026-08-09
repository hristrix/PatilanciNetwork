export interface SocialLink {
  id: string
  label: string
  url: string
  icon: 'discord' | 'youtube' | 'twitch' | 'tiktok' | 'instagram'
}

/**
 * Replace these URLs with the real Патиланци profiles before launch.
 * The Discord link should be the actual (invite-only) invite URL.
 */
export const socialLinks: SocialLink[] = [
  { id: 'discord', label: 'Discord', url: 'https://discord.gg/your-invite', icon: 'discord' },
  { id: 'youtube', label: 'YouTube', url: 'https://youtube.com/@patilanci', icon: 'youtube' },
  { id: 'twitch', label: 'Twitch', url: 'https://twitch.tv/patilanci', icon: 'twitch' },
  { id: 'tiktok', label: 'TikTok', url: 'https://tiktok.com/@patilanci', icon: 'tiktok' },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com/patilanci',
    icon: 'instagram',
  },
]
