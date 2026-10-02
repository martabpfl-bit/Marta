/**
 * Versão em português (PT-PT) de copy.en.ts. A forma tem de ser IGUAL à do inglês.
 * Mesmas regras de integridade: sem métricas, clientes, citações ou autoria técnica inventados;
 * Marta trabalhou com developers; "renovou posteriormente" (sem relação causal); a fonte de dados não é nomeada.
 */
import type { en } from "./copy.en";

// A forma vem do inglês; aqui só trocamos o texto.
type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? readonly Widen<U>[] : T extends object ? { [K in keyof T]: Widen<T[K]> } : T;
type Copy = Widen<typeof en>;

export const pt: Copy = {
  meta: {
    title: "O Sinal — Marta Lopes",
    description: "Recebi um sinal. Isto foi o que fiz a seguir.",
  },

  preloader: {
    steps: ["A INICIAR A SAÚDE DO CLIENTE...", "A VERIFICAR SINAIS...", "1 SINAL DETETADO"],
  },

  ui: {
    plainWords: "Em palavras simples",
    live: "ATIVO · SAUDÁVEL",
    howIWork: "Como trabalho",
    scroll: "Scroll",
    account: "CONTA",
    soundOn: "Som ligado",
    soundOff: "Som desligado",
    uth: { problem: "O problema", did: "O que fiz", happened: "O que aconteceu", numbers: "Números", different: "O que faria de forma diferente" },
  },

  evidence: {
    keys: ["projects", "decisions", "results", "team"] as const,
    short: { projects: "PROJETOS", decisions: "DECISÕES", results: "RESULTADOS", team: "EQUIPA" },
    labels: {
      projects: "PROJETOS",
      decisions: "DECISÕES",
      results: "RESULTADOS",
      team: "CONTRIBUTO PARA A EQUIPA",
    },
  },

  act1: {
    date: "02 OUT 2026",
    title: "Olá, Catarina.",
    hook: ["Disseste-me o que faltou.", "Por isso fiz o que faço com qualquer conta que envia um sinal."],
    thanks: "Primeiro: obrigada. Um feedback tão específico é uma oferta.",
    signalTitle: "SINAL RECEBIDO",
    email: {
      from: "De: Catarina",
      org: "Visor.ai",
      themes: ["projetos concretos", "decisões", "resultados", "como contribuis para uma equipa"],
    },
    relationship: {
      heading: "VISOR × MARTA",
      rows: [
        { label: "OPORTUNIDADE ATUAL", value: "FECHADA", tone: "neutral" as const },
        { label: "RELAÇÃO", value: "ABERTA", tone: "good" as const },
      ],
      signal: { label: "SINAL", value: "FEEDBACK ACIONÁVEL" },
    },
  },

  act3: {
    signals: ["PROJETOS", "DECISÕES", "RESULTADOS", "CONTRIBUTO PARA A EQUIPA"],
    intro: "As quatro coisas que pediste para ver.",
    introSub: "Vou assinalá-las no topo do ecrã à medida que avançamos.",
    sub: "PEDISTE PARA VER ISTO",
    status: "DEIXA-ME MOSTRAR",
    lines: ["Podia ter respondido com uma explicação melhor.", "Achei que mostrar-te seria mais útil."],
    started: "A COMEÇAR AGORA",
  },

  case1: {
    kicker: "CASO 01",
    question: "Consegue ela ser responsável por uma implementação?",
    client: "CLIENTE IMOBILIÁRIO",
    context: [
      { k: "O CLIENTE", t: "Uma empresa imobiliária. Muitos pedidos por WhatsApp e por telefone. Responder a cada um à mão era lento, e o interesse arrefecia." },
      { k: "O OBJETIVO", t: "Um agente de IA que responde logo, percebe se a pessoa está mesmo interessada e marca uma visita." },
      { k: "QUEM FEZ O QUÊ", t: "Eu trouxe o cliente e tratei de discovery, requisitos, testes e formação. A parte técnica fiz com um developer." },
      { k: "AGORA VÊ-O A SER CONSTRUÍDO", t: "Um lead escreve. O agente responde, verifica os imóveis disponíveis e marca uma visita com a equipa comercial." },
    ],
    plain: [
      "Um lead escreve. O agente responde, verifica os imóveis e marca uma visita.",
      "Cada pedido segue este caminho, em segundos.",
      "O agente precisa da lista de imóveis disponíveis. O portal de anúncios não nos dá acesso aos seus dados (sem API). Sem isso, o agente não consegue responder.",
      "Analisei as opções e propus uma rota alternativa aos developers.",
      "Funcionou. O agente volta a responder com dados reais.",
    ],
    need: "Responder a pedidos sobre imóveis e transformar o interesse qualificado em ação.",
    nodes: [
      { id: "lead", label: "LEAD" },
      { id: "channel", label: "VOZ / WHATSAPP" },
      { id: "agent", label: "AGENTE DE IA" },
      { id: "property", label: "INFORMAÇÃO DO IMÓVEL" },
      { id: "qualification", label: "QUALIFICAÇÃO" },
      { id: "calendar", label: "CALENDÁRIO" },
      { id: "sales", label: "EQUIPA COMERCIAL" },
    ],
    agentLogic: ["Que empreendimento?", "Que imóvel?", "Faltam informações?", "Pronto para visitar?"],
    ready: ["VERIFICAR DISPONIBILIDADE", "MARCAR"],
    ownership: ["Cliente trazido pela Marta", "Vendas / discovery", "Requisitos", "Comunicação com o cliente", "Testes", "Formação"],
    technicalDelivery: { label: "Entrega técnica", value: "Marta + Developer" },
    blocker: {
      source: "FONTE DE DADOS",
      api: "ACESSO À API",
      loading: "a carregar…",
      denied: "NEGADO",
      statement: "O caminho de implementação original deixou de estar disponível.",
      what: "E agora?",
      action: "Investigar rota alternativa →",
      altLabel: "ROTA DE DADOS ALTERNATIVA",
    },
    ctx2: [{ k: "O SEGUNDO PROBLEMA", t: "Depois do lançamento, um cliente perguntou por um imóvel. A resposta do agente veio sem informação que devia ter." }],
    plain2: [
      "Depois do lançamento, um cliente perguntou por um imóvel. A resposta do agente veio sem informação que devia ter.",
      "Por isso tratei-o como um problema a resolver, passo a passo.",
    ],
    plain3: [
      "Depois enviei à engenharia tudo o que precisava numa só mensagem, para o poderem corrigir mais depressa.",
      "A engenharia fez a correção. Testei a mesma pergunta outra vez.",
    ],
    second: {
      searching: "A pesquisar...",
      query: "Há algo disponível neste empreendimento?",
      missing: "INFORMAÇÃO ESPERADA EM FALTA",
      line: "Entrar em produção não é o fim da implementação.",
    },
    troubleshooting: [
      { n: "01", label: "REPRODUZIR", x: "Repeti a mesma pergunta, para ver o problema acontecer." },
      { n: "02", label: "INSPECIONAR", x: "Li o registo da conversa." },
      { n: "03", label: "ISOLAR", x: "Reduzi as possibilidades de onde podia estar a falhar." },
      { n: "04", label: "FORMAR UMA HIPÓTESE", x: "Formei uma teoria sobre a causa." },
      { n: "05", label: "ESCALAR COM CONTEXTO", x: "Enviei à engenharia com tudo o que precisavam." },
    ],
    isolate: ["RECOLHA DE DADOS?", "INTEGRAÇÃO?", "PROMPT?", "REGRAS?"],
    handoff: {
      title: "HANDOFF PARA ENGENHARIA",
      fields: [
        "Conta",
        "ID da conversa",
        "Gravação",
        "Comportamento reportado",
        "Comportamento esperado",
        "Comportamento reproduzido",
        "Conclusões",
        "Causa possível",
        "Notas adicionais",
      ],
      quote: ["Não queria encaminhar problemas.", "Queria torná-los mais fáceis de resolver."],
    },
    fix: {
      deployed: "ALTERAÇÃO PUBLICADA",
      retesting: "A REPETIR O TESTE",
      returned: "DADOS ESPERADOS DEVOLVIDOS",
      pass: "APROVADO ✓",
    },
    production: {
      title: "PRODUÇÃO",
      outcomes: ["Utilizadores reais ✓", "O cliente continuou ✓", "Continuação assinada antes de eu sair ✓"],
      caveat: "Ficaram algumas limitações do produto, incluindo a qualidade da síntese de voz.",
    },
    found: "EVIDÊNCIA ENCONTRADA",
  },

  case2: {
    kicker: "CASO 02",
    opener: "Nem todos os problemas de implementação são técnicos.",
    client: "CLIENTE PORTUGUÊS DE CONSTRUÇÃO / SERVIÇOS PARA EDIFÍCIOS",
    statements: [
      "“O processo funciona assim.”",
      "“Não, não é assim que fazemos.”",
      "“Também precisamos de…”",
      "“Isso tem de acontecer primeiro.”",
      "“Podemos acrescentar…”",
    ],
    ctxA: [{ k: "O PROBLEMA", t: "Toda a gente queria algo diferente. O âmbito não parava de crescer." }],
    ctxB: [{ k: "O LADO COMERCIAL", t: "O cliente tinha dois meses de pagamentos em atraso. Os nossos developers continuavam a trabalhar para ele." }],
    plain: [
      "Toda a gente queria algo diferente e o projeto não parava de crescer: a Fase 1 passou a Fase 1 + X + Y + Z…",
      "Quando isso acontece, sigo sempre os mesmos passos.",
      "De volta ao que foi acordado: Fase 1. O resto pode esperar.",
      "O cliente estava com dois meses de atraso nos pagamentos, enquanto os nossos recursos de desenvolvimento continuavam a trabalhar para ele.",
    ],
    scope: { base: "FASE 1", extras: ["X", "Y", "Z", "..."] },
    process: ["OUVIR", "IDENTIFICAR A DECISÃO", "AS PESSOAS CERTAS", "PROPOR UM CAMINHO VIÁVEL", "CONFIRMAR", "DOCUMENTAR", "REVER SE NECESSÁRIO"],
    principle: ["Uma boa implementação não é tudo o que o cliente consegue imaginar.", "É saber o que tem de acontecer agora — e o que pode esperar."],
    returnAction: "VOLTAR AO ÂMBITO ACORDADO",
    commercial: {
      account: "CONTA",
      overdue: "PAGAMENTO EM ATRASO",
      duration: "2 MESES",
      resources: "RECURSOS DE DESENVOLVIMENTO",
      active: "ATIVOS",
      ask: "O que recomendarias?",
      answer: "Depois de várias tentativas de regularizar a conta, recomendei pausar o desenvolvimento adicional até o pagamento estar resolvido.",
    },
  },

  health: {
    open: ["E se o cliente não te diz que está insatisfeito?", "E se pudesses perceber primeiro?"],
    signals: [
      "Utilização",
      "Resultados desejados",
      "Marcações",
      "Desempenho da automação",
      "Transcrições",
      "Sentimento",
      "Comunicação com o cliente",
      "Fase do ciclo de vida",
      "Proximidade da renovação",
    ],
    ctxA: [{ k: "A IDEIA", t: "Nove sinais sobre cada cliente, combinados num único estado de saúde: verde, amarelo ou vermelho." }],
    ctxB: [{ k: "UM EXEMPLO", t: "Numa conta que ficou amarela, não esperei que o cliente se queixasse." }],
    plain: [
      "Construí uma vista que combina nove sinais sobre cada cliente num único estado de saúde: verde, amarelo ou vermelho.",
      "Numa conta que ficou amarela:",
    ],
    engine: "SAÚDE DO CLIENTE",
    risk: "RISCO DETETADO",
    reactive: { title: "REATIVO", steps: ["O cliente queixa-se", "Investigar", "Responder"] },
    proactive: { title: "PROATIVO", steps: ["O sinal muda", "Investigar", "Preparar a solução", "Contactar"] },
    quote: "Não queria que o “Como está a correr tudo?” fosse a forma de descobrir que algo estava errado.",
    intervention: ["CONTA", "INVESTIGAR", "ATENÇÃO ADICIONAL", "CONTACTO PROATIVO", "SOLUÇÕES PROPOSTAS", "CLIENTE RENOVOU POSTERIORMENTE"],
    adoption: {
      line: "Ninguém me pediu para construir isto.",
      steps: ["Primeira versão construída por iniciativa própria", "Apresentada à liderança", "Aprovada para implementação/uso"],
    },
  },

  meta7: {
    relationship: "VISOR × MARTA",
    input: "ENTRADA",
    inputValue: "FEEDBACK DA ENTREVISTA",
    recognise: "Reconheces esta?",
    exactly: "Exatamente.",
    why: ["O teu feedback foi um sinal.", "Tratei-o da forma como trato o sinal de um cliente. Esta página inteira é esse processo."],
  },

  team: {
    label: "CONTRIBUTO PARA A EQUIPA",
    lines: ["Havia uma coisa que não consegui pôr num dashboard.", "Como trabalho numa equipa."],
    recap: [
      "Construí a solução técnica em conjunto com um developer.",
      "Enviei os problemas à engenharia com todo o contexto.",
      "Levei as decisões às pessoas certas.",
    ],
    closing: "O resto ouve-se melhor deles. Terei gosto em partilhar referências.",
    excerpts: [] as { text: string; attribution?: string }[],
  },

  resolution: {
    heading: "O QUE PEDISTE → O QUE MOSTREI",
    relHeading: "VISOR × MARTA",
    facts: {
      projects: "Agente de IA para um cliente imobiliário. Construído com um developer, em produção, e o cliente continuou.",
      decisions: "Projeto de construção: âmbito de volta à Fase 1, e desenvolvimento adicional pausado numa conta em atraso.",
      results: "Uma vista de saúde do cliente que construí por iniciativa própria e apresentei à liderança. Um cliente sinalizado renovou posteriormente.",
      team: "Problemas enviados à engenharia com todo o contexto. Soluções construídas em conjunto com um developer.",
    },
    rows: ["PROJETOS", "DECISÕES", "RESULTADOS", "CONTRIBUTO PARA A EQUIPA"],
    complete: "INTERVENÇÃO CONCLUÍDA",
    status: [
      { label: "OPORTUNIDADE ATUAL", value: "FECHADA" },
      { label: "RELAÇÃO", value: "ABERTA" },
    ],
    future: "FUTURO",
    typed: "Disponível para a próxima oportunidade.",
  },

  ending: {
    reduction: ["SINAL", "OUVIR", "INVESTIGAR", "COMPREENDER", "AGIR", "PRESERVAR A RELAÇÃO"],
    lines: ["Deste-me feedback.", "Fiz algo com ele."],
    hero: "Costumo começar antes de alguém me pedir.",
    thanks: "Obrigada pelo sinal, Catarina.",
    name: "Marta Lopes",
    role: "Customer Success · Implementação · Growth",
    underTheHood: { label: "Por dentro →", href: "/under-the-hood" },
    links: [
      { label: "LinkedIn", href: "#linkedin-placeholder" },
      { label: "Portfólio", href: "https://marta-lopes.vercel.app" },
    ],
  },
};

export const underTheHoodPt = {
  title: "Por dentro",
  intro: "Os mesmos casos, sem animação. Qual era o problema, o que fiz, o que aconteceu.",
  cases: [
    {
      kicker: "CASO 01 · PROJETOS",
      title: "Agente de IA para um cliente imobiliário",
      problem: "Responder a pedidos sobre imóveis (voz / WhatsApp) e transformar o interesse qualificado em ação.",
      did: [
        "Trouxe o cliente; tratei de vendas / discovery, requisitos, comunicação com o cliente, testes e formação.",
        "Entrega técnica em conjunto com um developer.",
        "Quando perdemos o acesso à fonte de dados original, investiguei alternativas e passámos para uma rota de dados diferente.",
        "Depois do lançamento, um pedido devolveu informação incompleta. Reproduzi-o, inspecionei a transcrição, isolei as possibilidades e escalei para a engenharia com todo o contexto (conta, conversa, gravação, comportamento reportado / esperado / reproduzido, conclusões).",
      ],
      outcome: ["Utilizadores reais em produção.", "O cliente continuou; a continuação foi assinada antes de eu sair.", "Ficaram algumas limitações do produto, incluindo a qualidade da síntese de voz."],
      numbers: [] as string[],
      different: "",
    },
    {
      kicker: "CASO 02 · DECISÕES",
      title: "Âmbito e juízo comercial, cliente de construção",
      problem: "Os stakeholders puxavam o projeto em direções diferentes e o âmbito não parava de crescer.",
      did: [
        "Ouvi, identifiquei a decisão real, trouxe as pessoas certas, propus um caminho viável, confirmei-o e documentei-o.",
        "Voltei a pôr o projeto na Fase 1 acordada e deixei o resto para depois.",
        "Com a conta dois meses em atraso, e depois de várias tentativas de a regularizar, recomendei pausar o desenvolvimento adicional até o pagamento estar resolvido.",
      ],
      outcome: [] as string[],
      numbers: [] as string[],
      different: "",
    },
    {
      kicker: "CASO 03 · RESULTADOS",
      title: "Uma vista de saúde do cliente, construída antes de alguém pedir",
      problem: "Não queria que o “Como está a correr tudo?” fosse a forma de descobrir que algo estava errado.",
      did: [
        "Combinei sinais (utilização, resultados desejados, marcações, desempenho da automação, transcrições, sentimento, comunicação, fase do ciclo de vida, proximidade da renovação) num único estado de saúde.",
        "Numa conta sinalizada a amarelo: investiguei, dei-lhe atenção adicional, contactei o cliente de forma proativa e propus soluções.",
        "Construí a primeira versão por iniciativa própria, apresentei-a à liderança e foi aprovada.",
      ],
      outcome: ["O cliente renovou posteriormente."],
      numbers: [] as string[],
      different: "",
    },
  ],
  back: "← Voltar à história",
};
