// ============================================================
//  💛  TROQUE TUDO AQUI  —  arquivo único de conteúdo
//  Nomes, data, fotos, textos, música e memórias.
//  Não precisa mexer em mais nada além deste arquivo.
// ============================================================

export const couple = {
  // Nomes do casal (aparecem no Hero, letra por letra)
  name1: 'Taynara',
  name2: 'Mateus',

  // Data e hora EXATAS do casamento (ISO). Usado no contador em tempo real.
  // Formato: 'AAAA-MM-DDTHH:MM:SS'  (24h, horário local)
  weddingDate: '2025-07-04T18:00:00',

  // Frase curta sob os nomes no Hero
  tagline: 'Bodas de papel',

  // Como a data aparece escrita (livre)
  weddingDateLabel: '04 de julho de 2025',
}

// ------------------------------------------------------------
//  LINHA DO TEMPO  —  marcos da história
//  icon: um dos SVGs custom -> 'spark' | 'heart' | 'ring' | 'rings' | 'moon'
// ------------------------------------------------------------
export const timeline = [
  {
    icon: 'spark',
    date: 'O começo',
    title: 'Quando nos conhecemos',
    text: 'Descreva aqui o dia em que tudo começou. O lugar, o olhar, a primeira conversa.',
  },
  {
    icon: 'heart',
    date: 'O pedido',
    title: 'Pedido de namoro',
    text: 'O momento em que vocês decidiram andar juntos. Conte como foi.',
  },
  {
    icon: 'ring',
    date: 'O noivado',
    title: 'O sim para sempre',
    text: 'O anel, a surpresa, as lágrimas. Escreva a memória do noivado.',
  },
  {
    icon: 'rings',
    date: couple.weddingDateLabel,
    title: 'O casamento',
    text: 'O dia mais bonito. Descreva a cerimônia, a festa, o primeiro beijo de casados.',
  },
  {
    icon: 'moon',
    date: 'Primeiro ano',
    title: 'A vida a dois',
    text: 'Os aprendizados, as viagens, as brigas bobas e as reconciliações. O lar que construíram.',
  },
]

// ------------------------------------------------------------
//  GALERIA  —  troque as URLs pelas fotos de vocês
//  Coloque as imagens em /public/photos/ e use '/photos/nome.jpg'
//  span: tamanho no mosaico -> 'tall' | 'wide' | 'big' | undefined (normal)
// ------------------------------------------------------------
export const gallery = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', caption: 'Nosso primeiro brinde', span: 'big' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', caption: 'A cerimônia' },
  { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', caption: 'As alianças', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80', caption: 'A dança', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80', caption: 'Só nós dois' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', caption: 'Para sempre', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80', caption: 'Rindo à toa' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80', caption: 'O lar', span: 'wide' },
]

// ------------------------------------------------------------
//  CARTA  —  escreva a carta para ela/ele
//  Cada string é um parágrafo.
// ------------------------------------------------------------
export const letter = {
  greeting: 'Meu amor,',
  paragraphs: [
    'Escreva aqui sua carta. Este é o espaço mais importante do site — fale do que sente, do que aprendeu neste ano, do que ainda sonha.',
    'Use quantos parágrafos quiser. Cada linha aqui vira um parágrafo na carta aberta.',
    'Termine com algo que só vocês dois entendem.',
  ],
  signature: 'Com todo o meu amor,',
  signName: '[SEU NOME]',
}

// ------------------------------------------------------------
//  MÚSICA  —  a música do casal
//  Coloque o arquivo em /public/music/ e aponte aqui.
// ------------------------------------------------------------
export const music = {
  src: '/music/edsheeran.mp3', // arquivo em public/music/
  title: 'Nossa música',
  artist: 'Ed Sheeran',
}

// ------------------------------------------------------------
//  ENCERRAMENTO
// ------------------------------------------------------------
export const closing = {
  message: 'E que venham muitos outros anos.',
  credit: 'feito com amor por [seu nome]',
  // Easter egg: mensagem escondida ao SEGURAR pressionado o coração final
  secret: 'Eu escolheria você de novo. Todas as vezes.',
}
