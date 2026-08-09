export interface CreatorPlatforms {
  youtube?: string
  twitch?: string
  tiktok?: string
  instagram?: string
}

export type CreatorCategory = 'video' | 'stream' | 'dev' | 'design' | 'community'

export interface Creator {
  id: number
  name: string
  role: string
  bio: string
  avatarColor: string
  category: CreatorCategory
  platforms: CreatorPlatforms
}

/**
 * Sample creator profiles. Replace with real Патиланци members —
 * swap avatarColor for a real avatar image path once available.
 */
export const creators: Creator[] = [
  {
    id: 1,
    name: 'Дичо',
    role: 'Създател',
    bio: 'Снима видеа за survival игри и все обещава да построи "само още една" ферма.',
    avatarColor: '#E53935',
    category: 'video',
    platforms: {
      youtube: 'https://youtube.com/@example',
      instagram: 'https://instagram.com/example',
    },
  },
  {
    id: 2,
    name: 'Нея',
    role: 'Стриймър',
    bio: 'Стриймва horror игри и пищи достатъчно силно, за да събуди съседите.',
    avatarColor: '#F2B632',
    category: 'stream',
    platforms: {
      twitch: 'https://twitch.tv/example',
      tiktok: 'https://tiktok.com/@example',
    },
  },
  {
    id: 3,
    name: 'Пламен',
    role: 'Стриймър',
    bio: 'Стриймва late-night гейминг сесии и задава въпроси, на които никой не е готов да отговори в 23:00 часа.',
    avatarColor: '#F4E7CF',
    category: 'stream',
    platforms: {
      youtube: 'https://youtube.com/@example',
    },
  },
  {
    id: 4,
    name: 'Кики',
    role: 'Видео редактор',
    bio: 'Превръща три часа хаос в тримунутен клип с добър тайминг.',
    avatarColor: '#E53935',
    category: 'video',
    platforms: {
      instagram: 'https://instagram.com/example',
      tiktok: 'https://tiktok.com/@example',
    },
  },
  {
    id: 5,
    name: 'Тошко',
    role: 'Разработчик',
    bio: 'Пише ботове за Discord сървъра и понякога чупи нещо по невнимание.',
    avatarColor: '#F2B632',
    category: 'dev',
    platforms: {
      youtube: 'https://youtube.com/@example',
    },
  },
  {
    id: 6,
    name: 'Радост',
    role: 'Домакин на общността',
    bio: 'Организира вечерите и помни рождените дни на всички в сървъра.',
    avatarColor: '#F4E7CF',
    category: 'community',
    platforms: {
      instagram: 'https://instagram.com/example',
    },
  },
  {
    id: 7,
    name: 'Мира',
    role: 'Дизайнер',
    bio: 'Прави стикерите, ролите и емоджитата, с които сървърът се хвали.',
    avatarColor: '#E53935',
    category: 'design',
    platforms: {
      instagram: 'https://instagram.com/example',
      tiktok: 'https://tiktok.com/@example',
    },
  },
]
