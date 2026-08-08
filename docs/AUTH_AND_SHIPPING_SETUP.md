# Autenticação, CEP e Correios

## Supabase

1. Crie um projeto no Supabase.
2. Abra o SQL Editor e execute `supabase/migrations/202608030001_create_profiles.sql`.
3. Em Authentication > URL Configuration, configure a URL publicada como Site URL.
4. Adicione `https://seu-dominio/minha-conta`, `https://seu-dominio/nova-senha` e as URLs equivalentes de preview da Vercel nas Redirect URLs.
5. Copie a Project URL e a chave pública/publishable para as variáveis abaixo:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_sua_chave_publica
VITE_SITE_URL=https://seu-dominio-publicado.com.br
```

Configure as mesmas variáveis em Development, Preview e Production na Vercel. `VITE_SITE_URL` garante que os links enviados pelo Supabase abram o site publicado mesmo quando a recuperação é solicitada no localhost. Nunca use a chave `service_role` no frontend.

### E-mails de autenticação

Os modelos prontos da Prime Tobacco estão em `supabase/email-templates/README.md`. No painel do Supabase, abra **Authentication > Email Templates**, altere o assunto e cole o HTML correspondente em **Confirm signup** e **Reset password**.

## Consulta de CEP

O cadastro consulta `https://viacep.com.br/ws/{cep}/json/` após receber oito dígitos. O serviço não exige token. Rua, bairro, cidade e UF são preenchidos automaticamente; número e complemento continuam sob responsabilidade do cliente.

## Integração futura com os Correios

Preço e prazo devem ser consultados por uma função/backend, nunca diretamente pelo navegador. A API oficial exige token e, para preço, contrato ativo com o serviço correspondente habilitado. Quando o contrato estiver disponível, criar uma função protegida que:

1. gere ou reutilize o token dos Correios;
2. receba CEP de origem, CEP de destino, peso e dimensões;
3. consulte preço e prazo;
4. devolva apenas as modalidades disponíveis ao checkout.
