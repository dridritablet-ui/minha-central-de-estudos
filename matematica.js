
(() => {
  const STORAGE = "mce_matematica_v1";

  const curso = [
    ["Fundamentos da matemática", "Operações básicas, ordem das operações e expressões numéricas."],
    ["Números naturais e inteiros", "Conjuntos numéricos, comparação, reta numérica e operações."],
    ["Frações", "Representação, simplificação, comparação e operações."],
    ["Números decimais", "Leitura, comparação, operações e conversão de frações."],
    ["Múltiplos e divisores", "Divisibilidade, números primos, MDC e MMC."],
    ["Potenciação", "Potências, propriedades e expressões com potências."],
    ["Radiciação", "Raízes, propriedades e relação entre potência e raiz."],
    ["Razão e proporção", "Grandezas proporcionais, escalas e divisão proporcional."],
    ["Regra de três", "Regra de três simples e problemas de proporcionalidade."],
    ["Porcentagem", "Aumentos, descontos, taxas e problemas do cotidiano."],
    ["Matemática financeira", "Juros simples, juros compostos e aplicações."],
    ["Introdução à álgebra", "Linguagem algébrica, termos, expressões e simplificação."],
    ["Equações do 1º grau", "Resolução de equações e problemas."],
    ["Sistemas e inequações", "Sistemas de equações e inequações do 1º grau."],
    ["Plano cartesiano e funções", "Pares ordenados, função afim e gráficos."],
    ["Geometria plana", "Ângulos, polígonos, perímetro e área."],
    ["Geometria espacial", "Sólidos geométricos, áreas e volumes."],
    ["Estatística", "Tabelas, gráficos, média, moda e mediana."],
    ["Análise combinatória e probabilidade", "Princípio fundamental da contagem e probabilidade."],
    ["Revisão geral", "Revisão dos conteúdos, resolução de questões e simulado."]
  ];

  const tarefas = [
    ["Estudar a teoria", "Assistir à aula", "Resolver exercícios"]
  ];

  const ler = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE)) || {};
    } catch {
      return {};
    }
  };

  let dados = ler();

  const salvar = () => {
    localStorage.setItem(STORAGE, JSON.stringify(dados));
  };

  const escapar = texto =>
    String(texto).replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[c]);

  function progresso() {
    let concluidas = 0;
    curso.forEach((_, i) => {
      concluidas += (dados.semanas?.[i] || []).filter(Boolean).length;
    });
    return {
      concluidas,
      total: curso.length * 3,
      porcentagem: Math.round(concluidas / (curso.length * 3) * 100)
    };
  }

  function renderizar() {
    const area = document.getElementById("matematica-conteudo");
    if (!area) return;

    const p = progresso();

    area.innerHTML = `
      <section class="math-resumo">
        <div>
          <span class="math-etiqueta">SEU PLANO DE APRENDIZADO</span>
          <h2>Matemática do zero</h2>
          <p>20 semanas para construir sua base matemática, passo a passo.</p>
        </div>
        <div class="math-numero">${p.porcentagem}%</div>
        <div class="math-barra"><span style="width:${p.porcentagem}%"></span></div>
        <small>${p.concluidas} de ${p.total} etapas concluídas</small>
      </section>

      <section class="math-semanas">
        ${curso.map((semana, i) => {
          const marcadas = dados.semanas?.[i] || [];
          const feitas = marcadas.filter(Boolean).length;
          return `
            <article class="math-semana">
              <div class="math-semana-topo">
                <span class="math-etiqueta">SEMANA ${String(i + 1).padStart(2, "0")}</span>
                <span class="math-status">${feitas === 3 ? "Concluída" : feitas + "/3 etapas"}</span>
              </div>
              <h3>${escapar(semana[0])}</h3>
              <p>${escapar(semana[1])}</p>
              <div class="math-tarefas">
                ${tarefas[0].map((t, j) => `
                  <label>
                    <input type="checkbox"
                      data-semana="${i}"
                      data-tarefa="${j}"
                      ${marcadas[j] ? "checked" : ""}>
                    <span>${t}</span>
                  </label>
                `).join("")}
              </div>
            </article>
          `;
        }).join("")}
      </section>

      <section class="math-anotacoes">
        <h3>Meu caderno de Matemática</h3>
        <p>Anote fórmulas, explicações e dúvidas importantes.</p>
        <textarea id="math-notas" placeholder="Minhas anotações...">${escapar(dados.notas || "")}</textarea>
        <p class="math-salvo" id="math-status-notas">Suas anotações são salvas neste navegador.</p>
      </section>

      <section class="math-anotacoes">
        <h3>Caderno de erros</h3>
        <p>Registre questões que errou e o que aprendeu com elas.</p>
        <textarea id="math-erros" placeholder="Questão, motivo do erro e como resolver corretamente...">${escapar(dados.erros || "")}</textarea>
        <p class="math-salvo" id="math-status-erros">Seus registros são salvos neste navegador.</p>
      </section>

      <section class="math-anotacoes">
        <h3>Meu progresso</h3>
        <p>Você pode guardar uma cópia dos seus estudos.</p>
        <div class="math-botoes">
          <button type="button" id="math-exportar">Exportar progresso</button>
          <button type="button" id="math-importar">Importar progresso</button>
          <input type="file" id="math-arquivo" accept="application/json" hidden>
        </div>
      </section>
    `;

    area.querySelectorAll("[data-semana]").forEach(input => {
      input.addEventListener("change", () => {
        const semana = Number(input.dataset.semana);
        const tarefa = Number(input.dataset.tarefa);
        dados.semanas ||= {};
        dados.semanas[semana] ||= [false, false, false];
        dados.semanas[semana][tarefa] = input.checked;
        salvar();
        renderizar();
      });
    });

    [["math-notas", "notas", "math-status-notas"],
     ["math-erros", "erros", "math-status-erros"]].forEach(([id, chave, status]) => {
      area.querySelector("#" + id).addEventListener("input", e => {
        dados[chave] = e.target.value;
        salvar();
        area.querySelector("#" + status).textContent = "Salvo neste navegador.";
      });
    });

    area.querySelector("#math-exportar").addEventListener("click", () => {
      const arquivo = new Blob(
        [JSON.stringify(dados, null, 2)],
        { type: "application/json" }
      );
      const url = URL.createObjectURL(arquivo);
      const link = document.createElement("a");
      link.href = url;
      link.download = "meu-progresso-matematica.json";
      link.click();
      URL.revokeObjectURL(url);
    });

    const seletor = area.querySelector("#math-arquivo");

    area.querySelector("#math-importar").addEventListener("click", () => {
      seletor.click();
    });

    seletor.addEventListener("change", async () => {
      const arquivo = seletor.files[0];
      if (!arquivo) return;

      try {
        const importado = JSON.parse(await arquivo.text());
        if (!importado || typeof importado !== "object") {
          throw new Error("Arquivo inválido");
        }
        dados = importado;
        salvar();
        renderizar();
        alert("Progresso importado!");
      } catch {
        alert("Não foi possível importar esse arquivo.");
      }
    });
  }

  window.iniciarMatematica = renderizar;
})();
