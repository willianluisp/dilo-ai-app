# Mascote Dilo — contrato de animação e assets pendentes

## Análise do material

O PNG fornecido tem 210 × 194 pixels e contém cabeça, olhos, pupilas, iluminação e fundo em uma única imagem. Não há mãos nem informação visual das regiões ocultas pelos olhos. A prancha de identidade é uma referência achatada, não um rig. Recortar os olhos existentes deixaria buracos e não permitiria piscar. Acrescentar mãos genéricas ou vetores sobre essa imagem comprometeria o volume e a identidade.

Nesta entrega o original continua intacto. Há entrada suave e inclinação discreta no erro. Não há pupilas móveis, piscadas, mãos, espiada ou novas expressões no renderer estático. O estado success descreve o resultado local do formulário, não um login real.

## Implementado na estrutura

- Estados idle, tracking, passwordHidden, passwordVisible, success e error.
- Observação do mouse na janela inteira, alvos normalizados entre -1 e 1 em relação ao centro do mascote.
- MotionValues com molas amortecidas: o alvo para quando o mouse para; a interpolação desacelera até repousar sem loop de React por frame.
- Tracking suspenso nos estados de senha/feedback; toque não gera tracking.
- Campo e botão mostrar/ocultar formam um único grupo de foco. A visibilidade alterna o estado sem sair do grupo. Sair do grupo retorna a idle.
- Limpeza de listeners e retorno ao centro ao sair da janela, perder foco ou ocultar a aba.
- prefers-reduced-motion: sem tracking, deslocamento ou rotação; renderer futuro recebe essa preferência para trocar poses sem movimento.
- Renderer opcional recebe estado, pointer.x/pointer.y (MotionValue) e reducedMotion. O fallback não usa os alvos para fingir animação facial.

## Pacote artístico necessário

Produzir os elementos no mesmo enquadramento e escala, preferencialmente em canvas transparente de 1024 × 1024, com origem, pivôs e áreas de recorte documentados:

1. Cabeça base fiel, sem fundo, com regiões atrás de olhos/pálpebras reconstruídas. Separar focinho se necessário à oclusão das mãos.
2. Globos oculares esquerdo/direito, pupilas com reflexos e máscaras individuais para limitar o olhar. Definir limites por olho para manter alinhamento e perspectiva.
3. Pálpebras superior/inferior ou poses aberto, meio fechado e fechado, com volume e sombras consistentes.
4. Duas mãos de jacaré e pequenos segmentos de braço, nunca mãos humanas, nas poses abaixada, cobrindo e espiando. Dedos independentes ou poses intermediárias para abrir a fresta.
5. Sombras de contato das mãos sobre o rosto e máscaras de oclusão (mãos à frente dos olhos e atrás/à frente do focinho conforme a pose).
6. Poses faciais normal, feliz e curiosa, sem deformar a cabeça.
7. Uma imagem neutra de maior resolução, para exibição em telas de alta densidade sem ampliar o PNG pequeno atual.

Todas as poses precisam de validação visual lado a lado com o original antes de serem integradas.

## Solução recomendada após os assets

Composição de camadas raster transparentes com Motion, ou Rive com essas mesmas texturas e máscaras. SVG pode servir como contêiner de recorte e transformação; redesenhar tudo como vetor plano não preservaria o 3D. Nenhuma biblioteca recupera as camadas ausentes do PNG.

Transições previstas: mãos sobem com aceleração amortecida; em passwordVisible permanecem perto do rosto e abrem uma pequena fresta, com apenas um olho exposto; ao sair do grupo descem. Pupilas movem poucos pixels dentro das máscaras. Piscadas ocasionais somente com assets, sem timers em abas ocultas e sem movimento quando solicitado pelo sistema. Limites finais devem ser definidos a partir da arte aprovada.
