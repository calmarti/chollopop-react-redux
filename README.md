# chollopop-react-redux

## Este proyecto crea la gestión de un estado global en redux para una tienda on line implementada en react

---

El proyecto está desarrollado a partir del fron-end react:

```sh
https://github.com/davidjj76/nodepop-react
```

---

## Requisitos

Se asume la instalación previa de:

- Node

- nodepop-api (simulador de backend): https://github.com/davidjj76/nodepop-api

---

## Ejecución en entorno local 

`npm start`

## Ejecución del backend

- Clonar el repositorio `https://github.com/davidjj76/nodepop-react`
- `npm start`
- El backend se ejecuta por defecto en el puerto 3001.

## Estado global por defecto de la app

```sh
{
  auth: false,
  adverts: { loaded: false, data: [] },
  ui: { isLoading: false, error: null },
  tags: [],
}
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
