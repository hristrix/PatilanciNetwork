export type EventStatus = 'upcoming' | 'past'

export interface CommunityEvent {
  id: number
  title: string
  game: string
  date: string
  time: string
  description: string
  status: EventStatus
}

/** Sample event data — replace dates and details with real scheduled events. */
export const events: CommunityEvent[] = [
  {
    id: 1,
    title: 'Minecraft Community Night',
    game: 'Minecraft',
    date: 'Петък, 14 август',
    time: '20:00',
    description: 'Обща сесия в survival сървъра — строим, търгуваме и вероятно нещо гръмва.',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Horror Game Night',
    game: 'Lethal Company',
    date: 'Събота, 15 август',
    time: '21:30',
    description: 'Влизаме с камера включена, излизаме с нови нива на параноя.',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Стрийм маратон на живо',
    game: 'Multiplayer микс',
    date: 'Неделя, 16 август',
    time: '19:00',
    description: 'Цял ден стриймваме различни игри заедно — с предложения и гласувания от чата.',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'CS2 турнир между приятели',
    game: 'Counter-Strike 2',
    date: 'Петък, 7 август',
    time: '20:30',
    description: 'Малък вътрешен турнир — наградата е гордост и право на хвалба до края на месеца.',
    status: 'past',
  },
  {
    id: 5,
    title: 'Party games вечер',
    game: 'Party games',
    date: 'Събота, 1 август',
    time: '19:30',
    description: 'Забавни мини игри, изненадващо конкурентни разговори и много смях.',
    status: 'past',
  },
]
