// ===== CONFIGURAÇÃO DO SITE "CHEGA DE DELIVERY" =====
// 1) Cole abaixo o link do checkout da Kirvano (com o order bump "4 Semanas Prontas" já ligado no produto).
// 2) Defina a data REAL do fim do preço de lançamento (promo.ate). Depois dela o site passa sozinho
//    para o preço normal. Se não houver link de preço normal, o botão vira "Oferta encerrada".
// 3) Pixel da Meta: cole o ID quando existir (vazio = nenhum rastreio e nenhum aviso de cookies).
window.SITE = {
  checkout: "",              // link Kirvano do preço de lançamento (R$ 9,90)
  metaPixelId: "",           // ex.: "1234567890"
  tiktokPixelId: "",
  produto: "Chega de Delivery",
  promo: {
    ativa: true,
    ate: "2026-10-31T23:59:59-03:00",   // CONFIRMAR: data real do fim do lançamento
    precoPromo: "9,90",
    precoNormal: "19,90",               // só use se for cobrado de verdade depois do prazo
    checkoutNormal: ""                  // link Kirvano do preço normal (R$ 19,90)
  }
};
