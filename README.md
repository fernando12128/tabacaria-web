# Prime Tobacco

E-commerce mobile-first da Prime Tobacco, desenvolvido com React e Vite.

## Desenvolvimento

```bash
npm install
cp .env.example .env.local
npm run dev
```

As instruções de autenticação, banco, consulta por CEP e futura integração com os Correios estão em [docs/AUTH_AND_SHIPPING_SETUP.md](docs/AUTH_AND_SHIPPING_SETUP.md).

O estado atual da compra online e os próximos passos para pedidos, pagamento, frete, assinaturas e cashback pelo PDV estão em [docs/COMMERCE_NEXT_STEPS.md](docs/COMMERCE_NEXT_STEPS.md).

## Comandos

```bash
npm run lint
npm run build
node --test tests/checkout.test.mjs
```

---

## Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
