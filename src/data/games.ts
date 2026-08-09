export interface Game {
  id: number
  name: string
  category: string
  line: string
  gradient: string
  active?: boolean
}

/** Placeholder game roster — abstract gradients only, no copyrighted artwork. */
export const games: Game[] = [
  {
    id: 1,
    name: 'Minecraft',
    category: 'Survival',
    line: 'Строим, оцеляваме и понякога взривяваме неща, които не трябва.',
    gradient: 'from-[#E53935] to-[#F2B632]',
    active: true,
  },
  {
    id: 2,
    name: 'GTA V',
    category: 'Open world',
    line: 'Хаотични мисии, разбити коли и поне един арест на сесия.',
    gradient: 'from-[#151519] to-[#E53935]',
  },
  {
    id: 3,
    name: 'Counter-Strike 2',
    category: 'Shooter',
    line: 'Сериозни рундове, несериозни коментари по войс чата.',
    gradient: 'from-[#F2B632] to-[#151519]',
  },
  {
    id: 4,
    name: 'Valorant',
    category: 'Shooter',
    line: 'Тактики, които звучат добре, докато не тръгне рундът.',
    gradient: 'from-[#E53935] to-[#151519]',
    active: true,
  },
  {
    id: 5,
    name: 'Rust',
    category: 'Survival',
    line: 'Приятелства се тестват, когато някой открадне базата.',
    gradient: 'from-[#151519] to-[#F2B632]',
  },
  {
    id: 6,
    name: 'Lethal Company',
    category: 'Co-op horror',
    line: 'Влизаме четирима, излизаме двама и половин чувал плячка.',
    gradient: 'from-[#F2B632] to-[#E53935]',
  },
  {
    id: 7,
    name: 'Party games',
    category: 'Купон',
    line: 'Каквото намерим за смях в петъчна вечер, отива в ротацията.',
    gradient: 'from-[#E53935] to-[#F4E7CF]',
  },
  {
    id: 8,
    name: 'Horror games',
    category: 'Хорър',
    line: 'Общи писъци и гарантирано развалено настроение за спане после.',
    gradient: 'from-[#151519] to-[#F4E7CF]',
  },
]
