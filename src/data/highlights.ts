export type HighlightCategory =
  'Забавни моменти' | 'Клипове' | 'Мемета' | 'Победи' | 'Провали' | 'Стрийм откъси'

export interface Highlight {
  id: number
  category: HighlightCategory
  caption: string
  gradient: string
}

/** Placeholder highlight cards — swap gradient thumbnails for real clip links/thumbnails. */
export const highlights: Highlight[] = [
  {
    id: 1,
    category: 'Забавни моменти',
    caption: 'Оня път, когато вратата не се оказа врата.',
    gradient: 'from-[#E53935] to-[#151519]',
  },
  {
    id: 2,
    category: 'Клипове',
    caption: 'Последен шанс, последен куршум, чиста късметия.',
    gradient: 'from-[#F2B632] to-[#151519]',
  },
  {
    id: 3,
    category: 'Мемета',
    caption: 'Официалният мем на месеца от нашия чат.',
    gradient: 'from-[#151519] to-[#F2B632]',
  },
  {
    id: 4,
    category: 'Победи',
    caption: 'Първо място на турнира, което никой не очакваше.',
    gradient: 'from-[#E53935] to-[#F2B632]',
  },
  {
    id: 5,
    category: 'Провали',
    caption: 'Строихме къща три часа. Крийпър я взриви за три секунди.',
    gradient: 'from-[#151519] to-[#E53935]',
  },
  {
    id: 6,
    category: 'Стрийм откъси',
    caption: 'Пет минути смях, който не влезе в основния стрийм.',
    gradient: 'from-[#F2B632] to-[#F4E7CF]',
  },
]
