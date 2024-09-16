# B3Sinacor

## Servidor de Desenvolvimento

Execute `ng serve` para iniciar um servidor de desenvolvimento. Navegue até `http://localhost:4200/`. A aplicação será recarregada automaticamente se você modificar qualquer um dos arquivos fonte.

## Gerar Código

Execute `ng generate component nome-do-componente` para gerar um novo componente. Você também pode usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construir

Execute `ng build` para construir o projeto. Os artefatos da construção serão armazenados no diretório `dist/`.

## Executar Testes Unitários

Execute `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

## Configuração do Ambiente

Para configurar o ambiente do Firebase e a URL de acesso da demo, você precisa criar um arquivo chamado `environment.development.ts` na pasta `src/environments/` com o seguinte conteúdo:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: '<YOUR_API_KEY>',
    authDomain: '<YOUR_AUTH_DOMAIN>',
    projectId: '<YOUR_PROJECT_ID>',
    storageBucket: '<YOUR_STORAGE_BUCKET>',
    messagingSenderId: '<YOUR_MESSAGING_SENDER_ID>',
    appId: '<YOUR_APP_ID>',
  },
};
```

Substitua os placeholders (`<YOUR_API_KEY>`, `<YOUR_AUTH_DOMAIN>`, etc.) pelos valores fornecidos pela sua configuração do Firebase.

## Acesso à Demo

Você pode acessar a versão de demonstração do projeto através do seguinte link:

[https://teste-b3-sinacor.web.app/](https://teste-b3-sinacor.web.app/)
