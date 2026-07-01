# 💛 Nosso Primeiro Ano

Site de página única para celebrar 1 ano de casamento. Tema **noturno estrelado**.
React + Vite + Tailwind v4 + Framer Motion + Three.js (@react-three/fiber).

## Rodar

```bash
bun install
bun run dev      # http://localhost:5173
bun run build    # gera /dist
```

## ✏️ O que trocar — só um arquivo: `src/config.js`

| Campo | O que é |
|-------|---------|
| `couple.name1 / name2` | Nomes do casal (Hero) |
| `couple.weddingDate` | Data/hora ISO do casamento → alimenta o contador |
| `couple.weddingDateLabel` | Data escrita por extenso |
| `timeline[]` | Marcos da história (ícone, data, título, texto) |
| `gallery[]` | Fotos (troque as URLs) + legendas + `span` do mosaico |
| `letter` | Carta: saudação, parágrafos, assinatura |
| `music` | Arquivo, título e artista da música |
| `closing` | Mensagem final, créditos e a mensagem secreta |

### Fotos
Coloque os arquivos em `public/photos/` e aponte em `gallery` com `'/photos/nome.jpg'`.
(As fotos atuais são placeholders do Unsplash.)

### Música
Coloque o `.mp3` em `public/music/` e ajuste `music.src`. Sem arquivo, o player
apenas não toca — nada quebra.

## Ícones da timeline
`spark | heart | ring | rings | moon` (SVGs custom em `src/components/Icons.jsx`).

## Recursos
- **Hero 3D**: campo de partículas com parallax de mouse; título letra por letra.
- **Timeline**: marcos com animação scroll-triggered (fade + slide + rotação 3D).
- **Galeria**: mosaico assimétrico, tilt 3D no hover, lightbox com `layoutId` + swipe/setas.
- **Carta**: envelope 3D que abre.
- **Contador**: dias/horas/min/seg ao vivo, dígitos com efeito odometer.
- **Player**: vinil giratório discreto (canto inferior esquerdo).
- **Toggle dia/noite** (canto superior direito): muda paleta + cor das partículas.
- **Easter egg**: segure o coração no encerramento ~0.7s → mensagem escondida.

## Próxima etapa (não incluída no núcleo)
- Seção 6: constelação do casal (cena 3D com memórias ao passar o mouse).
- Onda sonora animada acompanhando a música.
