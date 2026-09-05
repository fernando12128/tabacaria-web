# Integrações pendentes da loja

## Estado desta PR

O catálogo continua usando `GET /public/products` do PDV sem mudanças no contrato ou nos detalhes dos produtos. O WhatsApp continua com o número provisório existente. Não há integração de pagamento, criação de pedidos ou contratação de assinaturas nesta entrega.

O checkout permite revisar quantidades, remover itens, consultar subtotais e conferir o endereço. Essas ações não reservam estoque. Os planos abrem páginas de consulta; não criam assinaturas. Cashback e histórico exibem indisponibilidade em vez de apresentar saldo zero ou ausência de pedidos como dados reais.

## Backend do PDV

Antes de implementar chamadas novas no site, definir e documentar no PDV:

- Identificação do cliente: validar a sessão Supabase no servidor e vincular o usuário ao cliente correto do PDV.
- Pedidos: receber IDs e quantidades, recalcular preços e disponibilidade no servidor, reservar estoque de forma consistente e evitar duplicidade por repetição da requisição.
- Entrega: consultar cobertura, preço e prazo com os dados de peso/dimensões dos produtos. A consulta de CEP do cadastro não calcula frete.
- Pagamentos: criar a cobrança no servidor, validar notificações do provedor e atualizar o pedido de forma idempotente. O retorno do navegador nunca é comprovação de pagamento.
- Cashback: consultar saldo e extrato do PDV; definir acúmulo, uso, validade e estorno. Nenhum saldo enviado pelo navegador pode autorizar um desconto.
- Histórico: listar apenas pedidos do cliente autenticado e distinguir lista vazia de erro ou integração indisponível.
- Assinaturas: definir planos no servidor, cobrança recorrente, entrega, pausa/cancelamento e efeitos sobre cashback e estornos.

Os nomes e formatos de endpoints deverão vir do contrato real do PDV. Não foram adicionados endpoints fictícios ou um segundo cadastro de produtos.

## Provedores para avaliar

Asaas é uma opção inicial para avaliar Pix/cartão e recorrência: https://docs.asaas.com/docs/faq-assinaturas. A contratação depende da aceitação do CNPJ e do catálogo pelo provedor. Não há credenciais, conta ou integração Asaas configurada nesta PR.

Para transporte, validar o catálogo com a transportadora antes da escolha. O Melhor Envio informa restrições para tabacaria, inflamáveis e vidro: https://melhorenvio.com.br/blog/frete-e-logistica/o-que-pode-enviar-pelo-melhor-envio/.

A RDC 840/2023 proíbe a comercialização de fumígenos derivados do tabaco pela internet; não presumir que um gateway ou transportadora autoriza todos os itens de uma tabacaria. Referência da Anvisa: https://www.gov.br/anvisa/pt-br/composicao/diretoria-colegiada/reunioes-da-diretoria/votos-dos-circuitos-deliberativos-1/2024/cd-1065-2024-voto.pdf.

## Conteúdo antes do lançamento

As páginas de privacidade, termos e entrega descrevem o funcionamento atual e reaproveitam o contato já existente no site. Confirmar razão social/CNPJ, canal de atendimento e de privacidade, prazos de retenção e condições comerciais antes do lançamento. Atualizar textos, FAQ e avisos quando as integrações estiverem operacionais. Não foi inventada informação cadastral da empresa nem uma política comercial de devolução.

## Validação local

```sh
npm run lint
npm run build
node --test tests/checkout.test.mjs
```

Para validação manual: consultar os três planos; abrir endereço inexistente; navegar entre as páginas de atendimento; abrir/fechar o FAQ por teclado; revisar itens e limite de estoque no checkout com uma conta de teste; voltar de Meus dados ao carrinho. Pagamento e sincronização real com o PDV exigem um ambiente de homologação dessas integrações.
