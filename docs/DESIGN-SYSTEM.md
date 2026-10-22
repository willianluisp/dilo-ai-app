# Design system Dilo v0.1

Direção: acolhedora, legível, calma e profissional. A marca e o jacaré são a assinatura visual. Um único botão principal por tela. Superfícies claras, sombra discreta e verde reservado às ações.

| Papel | Valor |
| --- | --- |
| Ação | #20846F |
| Destaque | #3EB489 |
| Menta | #BFE8D0 |
| Superfície suave | #EAF7EF |
| Texto | #173D35 |
| Fundo | #FFFFFF |
| Títulos | Manrope 700 |
| Texto e controles | Inter 400/500/600 |
| Corpo | 16 px; conteúdo auxiliar 14 px |
| Espaçamento | 4 / 8 / 12 / 16 / 24 / 32 / 48 px |
| Controles | Altura 54 px, raio 12 px |
| Painéis | Raio 24 px |
| Área de toque | Pelo menos 44 px de altura |
| Formulário | Máximo 388 px |
| Mudança para coluna única | 760 px |

Estados dos controles: normal, hover, foco visível, pressionado, desabilitado e erro. Rótulos persistentes, mensagens ligadas ao campo por aria-describedby e feedback com role=status. Os botões usam semântica HTML nativa. Campos têm 16 px para evitar zoom involuntário no celular.

Movimento: resposta de controles em 180 ms; entrada do mascote em 350 ms; inclinação de até 2 graus conforme o foco. Sem loops. prefers-reduced-motion desativa deslocamento e rotação.

O lettering é provisório. O PNG do mascote permanece intacto e nunca deve ser substituído por emoji ou outra ilustração sem aprovação. A próxima etapa visual requer assets faciais separados; ver README.

## Refinamento do login
Desktop: duas colunas iguais, sem margem externa ou card lateral; marca no topo, mascote e frase centralizados. Formulário até 388 px, centralizado verticalmente. Celular até 760 px: marca compacta, mascote de 100 px e formulário em uma coluna. Conteúdo decorativo e rodapés removidos. O contrato atualizado de animação está em MASCOTE-ANIMACAO.md; a imagem estática tem apenas entrada e inclinação discreta de erro.
