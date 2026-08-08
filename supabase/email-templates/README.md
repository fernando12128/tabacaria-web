# E-mails de autenticação da Prime Tobacco

No Supabase, abra **Authentication > Email Templates** e configure:

## Confirm signup

- Subject: `Confirme seu cadastro na Prime Tobacco`
- Body: copie o conteúdo de `confirm-signup.html`

## Reset password

- Subject: `Crie uma nova senha para sua conta Prime Tobacco`
- Body: copie o conteúdo de `reset-password.html`

Os arquivos usam `{{ .ConfirmationURL }}`, variável oficial do Supabase que inclui o token e o redirecionamento autorizado. Não substitua essa variável por uma URL fixa.

Também confirme em **Authentication > URL Configuration**:

- **Site URL**: domínio público principal da loja;
- **Redirect URLs**: inclua `https://seu-dominio/nova-senha` e `https://seu-dominio/minha-conta`;
- para testar uma preview da Vercel, adicione também as duas rotas usando o domínio exato da preview.
