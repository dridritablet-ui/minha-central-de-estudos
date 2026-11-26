# Minha Central de Estudos

PWA para centralizar estudos escolares e SUD.

## Estrutura
- `index.html`: páginas e estrutura da interface.
- `styles.css`: identidade visual rosa-claro.
- `app.js`: navegação e funcionalidades.
- `manifest.webmanifest`: configuração PWA.
- `service-worker.js`: cache para funcionamento offline básico.
- `assets/icon-192.png` e `assets/icon-512.png`: ícones do aplicativo.

## Publicar no GitHub Pages
1. Envie todos os arquivos e pastas deste ZIP para a raiz do novo repositório.
2. No GitHub, abra **Settings > Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/ (root)`, depois salve.
5. Aguarde o endereço do GitHub Pages aparecer.

## Observações importantes
- Registros de estudo, flashcards, caderno, metas, cronograma e revisões são armazenados no `localStorage` do navegador.
- Os três campos da área SUD são intencionalmente temporários e não são salvos.
- O desempenho é calculado a partir dos registros manuais.
- A plataforma de Português abre o endereço externo já indicado no projeto.
- A PWA deve ser servida por HTTPS (como no GitHub Pages) para instalar e usar o service worker.
- O cache offline cobre os arquivos locais; recursos externos, como fontes, podem não estar disponíveis offline.
