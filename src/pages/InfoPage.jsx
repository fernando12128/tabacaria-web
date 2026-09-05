import { Link } from "react-router-dom";
import "./InfoPage.css";

const pages = {
  privacidade: {
    title: "Privacidade e seus dados",
    intro: "Saiba quais informações são usadas durante a navegação e o cadastro.",
    sections: [
      ["Cadastro e conta", "Usamos nome, e-mail, telefone, endereço e confirmação de maioridade para manter sua conta e seus dados de entrega. A autenticação é realizada pelo Supabase. Nunca envie sua senha pelo atendimento."],
      ["Carrinho e sessão", "O navegador armazena seu carrinho e a sessão de acesso para que você possa continuar a navegação. Em um dispositivo compartilhado, saia da conta ao terminar. O carrinho permanece neste navegador até que seus itens sejam removidos ou os dados do site sejam apagados."],
      ["Serviços utilizados", "O catálogo consulta o sistema da loja. Ao consultar um CEP, esse número é enviado ao ViaCEP para preencher o endereço. O site também carrega fontes do Google Fonts. Ao abrir Google Maps, Waze ou WhatsApp, você passa a utilizar serviços com suas próprias políticas de privacidade."],
      ["Atendimento pelo WhatsApp", "Ao escolher continuar no WhatsApp, o link prepara as mensagens que você escreveu no assistente e o resumo do carrinho. Confira o conteúdo antes de enviar. Não inclua senhas ou dados de cartão."],
      ["Solicitações sobre seus dados", "Você pode consultar e corrigir os dados do cadastro em Minha conta. Para solicitar informações sobre o tratamento, acesso ou exclusão de dados, use o atendimento indicado abaixo. Solicitações serão analisadas considerando a identificação do titular e as obrigações de conservação aplicáveis."],
    ],
  },
  termos: {
    title: "Termos de uso",
    intro: "Informações sobre a utilização do catálogo, da conta e do carrinho.",
    sections: [
      ["Acesso e cadastro", "O site é destinado a maiores de 18 anos. Mantenha seus dados corretos e proteja suas credenciais. A confirmação de maioridade faz parte do cadastro."],
      ["Catálogo e carrinho", "Os produtos e a disponibilidade são consultados no sistema da loja. Adicionar um item ao carrinho não reserva estoque nem confirma uma compra. Preços e disponibilidade precisam ser confirmados na conclusão do pedido."],
      ["Compras online", "A finalização de compras online ainda não está disponível. Você pode consultar o catálogo, organizar o carrinho e revisar o endereço, mas não há cobrança nem pedido confirmado por essas ações."],
      ["Prime Club", "Os planos estão disponíveis para consulta. A contratação online de assinaturas ainda não está disponível; consultar um plano não inicia uma assinatura nem gera cobrança. As condições de contratação deverão estar disponíveis antes da adesão."],
      ["Atendimento", "Consulte a página de entregas e trocas para orientações de atendimento. Estas informações não afastam os direitos previstos na legislação aplicável."],
    ],
  },
  "entregas-e-trocas": {
    title: "Entregas e trocas",
    intro: "Orientações para consultar entregas e receber ajuda com uma compra.",
    sections: [
      ["Frete e prazo", "O cálculo de frete e a contratação de entrega pelo site ainda não estão disponíveis. Não há valor de frete incluído no subtotal do carrinho. A cobertura e o prazo dependem dos produtos, do destino e da modalidade de transporte."],
      ["Confira seu endereço", "Em Minha conta, confira CEP, rua, número, complemento, bairro, cidade e estado. A consulta automática por CEP não confirma a cobertura de entrega."],
      ["Como solicitar atendimento", "Informe o número do pedido ou comprovante da compra, o produto e o motivo do contato. Em caso de avaria ou defeito, fotos ajudam a explicar o ocorrido. Procure o atendimento antes de enviar um produto de volta, para receber as orientações de devolução."],
      ["Arrependimento em compras à distância", "Nas compras à distância em que se aplica o direito de arrependimento, o consumidor pode desistir em até 7 dias contados da assinatura ou do recebimento do produto ou serviço, conforme o artigo 49 do Código de Defesa do Consumidor. Esse prazo não limita outros direitos, como os relacionados a defeitos."],
      ["Compras na loja física", "Para consultar as condições de troca de uma compra presencial, fale com a equipe e apresente o comprovante. Os direitos relativos a defeitos seguem a legislação aplicável."],
    ],
  },
};

export default function InfoPage({ page }) {
  const content = pages[page];

  return (
    <main className="info-page">
      <div className="info-shell">
        <span className="info-kicker">PRIME TOBACCO · ATENDIMENTO</span>
        <h1>{content.title}</h1>
        <p className="info-intro">{content.intro}</p>
        <nav className="info-nav" aria-label="Informações de atendimento">
          {Object.entries(pages).map(([slug, item]) => (
            <Link key={slug} to={`/${slug}`} aria-current={page === slug ? "page" : undefined}>
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="info-sections">
          {content.sections.map(([title, text]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
          {page === "entregas-e-trocas" && (
            <a className="info-source" href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm" target="_blank" rel="noreferrer">
              Consultar o Código de Defesa do Consumidor ↗
            </a>
          )}
          <section>
            <h2>Fale com a Prime</h2>
            <p><a href="mailto:contato@primetobacco.com.br">contato@primetobacco.com.br</a></p>
            <p>Segunda a sábado, das 9h às 22h. Domingos e feriados, das 9h às 18h.</p>
            <Link className="info-source" to="/#visite-nos">Ver endereço da loja →</Link>
          </section>
        </div>
      </div>
    </main>
  );
}
