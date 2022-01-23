# Nodepop-react-redux

## Este proyecto crea la gestión de un estado global en redux para una tienda on line implementada en react

---

El proeyecto está implementado a partir del fron-end react:

```sh
https://github.com/davidjj76/nodepop-react
```

---

## Requisitos

Se asume la instalación previa de:

- Node

- nodepop-api (simulador de backend): https://github.com/davidjj76/nodepop-api

---

## Estado global por defecto

```sh
{
  auth: false,
  adverts: { loaded: false, data: [] },
  ui: { isLoading: false, error: null },
  tags: [],
};
```


## Tests Unitarios

### Acciones:

- AuthLoginRequest (acción simple)
- LoadAdvertSuccess (acción simple con payload)
- AuthLogin (acción de tipo función)

### Selector:

- loadAdvertSelector

### Reducer:

- reducer de **state.adverts**

### React-Testing-Library:

- Componente LoginPage

### Snapshot tests

Componente LoginPage:

- {isLoading: false, error: null }
- {isLoading: true, error: null }
- {isLoading: false, error: { object} }
