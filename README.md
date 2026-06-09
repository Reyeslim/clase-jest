# Sprint 11 · Live 2 — Testing con Jest (Tests Unitarios)

> **Objetivo de la Clase**
> Aprender a escribir tests unitarios con Jest para validar la lógica del backend de forma aislada, rápida y sin depender de bases de datos ni conexiones externas.

---

## 📂 Estructura del Proyecto

```text
11-live-2/
├── package.json
└── src/
    ├── services/
    │   ├── reviewService.js       # 4 funciones puras (sin MongoDB)
    │   └── wishlistService.js     # 3 funciones puras (sin MongoDB)
    └── tests/
        ├── reviewService.test.js  # Tests unitarios de reviews
        └── wishlistService.test.js # Tests unitarios de wishlist

```

> 📌 **Punto clave:** No hay base de datos en este proyecto. Solo se testea la **lógica pura** de las funciones. Los tests funcionan al instante, sin conexión a Internet y sin necesidad de configurar ningún archivo `.env`.

---

## Bloque 1 · Teoría: Tests Unitarios y TDD (15 min)

### ¿Qué es un test unitario?

Un test unitario verifica que una **función pequeña e aislada** devuelve el resultado correcto para una entrada dada. No necesita Internet, ni base de datos, ni variables de entorno.

```text
Función recibe datos ──> Test comprueba el resultado esperado (Instantáneo)

```

```js
// Ejemplo de función pura (reviewService.js)
export const calculateAverage = (ratings) => {
  if (!ratings || ratings.length === 0) return 0
  return ratings.reduce((acc, r) => acc + r, 0) / ratings.length
}

// Su test unitario asociado
test("calcula la media correctamente", () => {
  expect(calculateAverage([8, 9, 10])).toBe(9)
})
```

### ¿Por qué merece la pena hacer testing?

- **Sin tests:** Los errores aparecen en producción (frente al usuario), cambiar el código da miedo y una modificación puede romper partes del sistema que parecían no relacionadas.
- **Con tests:** Los errores se detectan antes de subir el código, puedes refactorizar con total confianza y los tests actúan como documentación viva (explican qué hace cada función).

### Qué se testea y qué no

- **Se testea:** Lógica de negocio (cálculos, filtros, validaciones, ordenaciones) a través de funciones puras que reciben datos y devuelven datos.
- **No se testea:** El framework (Express), la base de datos (MongoDB/Prisma) o librerías externas.

> ⚠️ **Mensaje clave:** Si tienes que conectarte a algo externo para que el test funcione, la función no es pura y el test ya no es unitario.

---

### Flujo TDD (Test Driven Development)

El **Test-Driven Development** (Desarrollo Guiado por Pruebas) es una metodología que invierte el proceso tradicional: **las pruebas unitarias se escriben antes de implementar la funcionalidad**.

```text
1. Escribir el test (Falla porque la función no existe) ──> [ ROJO ]
   ↓
2. Implementar el código mínimo para que pase        ──> [ VERDE ]
   ↓
3. Limpiar y optimizar el código escrito              ──> [ REFACTOR ]

```

---

## Bloque 2 · Instalar y Configurar Jest (10 min)

Instala las dependencias necesarias ejecutando en la terminal:

```bash
npm install

```

### Configuración de ES Modules

Para que Jest entienda la sintaxis moderna de `import/export`, el archivo `package.json` ya incluye esta estructura:

```json
{
  "type": "module",
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  },
  "jest": {
    "testEnvironment": "node",
    "transform": {}
  }
}
```

> 💡 **Explicación:** El flag `--experimental-vm-modules` le dice a Node que gestione los archivos con módulos de ECMAScript de forma nativa para Jest.

Para lanzar las pruebas simplemente ejecuta:

```bash
npm test

```

---

## Bloque 3 · Tests de Reviews: 4 Funciones Puras (25 min)

Abrir `src/services/reviewService.js`. Trabajaremos sobre estas **4 funciones puras**:

| #   | Función                           | Qué hace                                 |
| --- | --------------------------------- | ---------------------------------------- |
| 1   | `calculateAverage(ratings)`       | Media aritmética de un array             |
| 2   | `filterByMinRating(reviews, min)` | Filtra elementos por rating mínimo       |
| 3   | `createReviewObject(...)`         | Crea y valida un objeto de review        |
| 4   | `sortReviews(reviews, order)`     | Ordena colecciones por rating (asc/desc) |

### Anatomía de un test

```js
test("descripción clara del comportamiento esperado", () => {
  // 1. Llamada a la función con datos de prueba
  const result = miFuncion(datosDePrueba)

  // 2. Comprobación del resultado
  expect(result).toBe(valorEsperado)
})
```

### `describe` — Agrupar tests relacionados

Utiliza `describe` para organizar múltiples escenarios sobre una misma función. En la consola los verás agrupados elegantemente:

```js
describe('calculateAverage', () => {
    test('calcula la media correctamente', () => { ... });
    test('devuelve 0 si el array está vacío', () => { ... });
});

```

---

## Bloque 4 · Tests de Wishlist y Matchers Clave (20 min)

Abrir `src/tests/wishlistService.test.js`. Analizaremos tres funciones de gestión de listas:

- `addMovieToList(list, movieId)` — No añade duplicados y **no muta** el array original.
- `removeMovieFromList(list, movieId)` — Elimina elementos sin mutar el origen.
- `isMovieInList(list, movieId)` — Devuelve un valor booleano.

> ❓ ¿Por qué comprobamos que no se muta el array original?
> Para evitar efectos secundarios inesperados (bugs) en nuestra aplicación cuando esa misma lista se esté utilizando en otros componentes del código.

### Matchers esenciales en Jest

| Matcher         | Uso                                              | Ejemplo                          |
| --------------- | ------------------------------------------------ | -------------------------------- |
| `toBe`          | Igualdad simple (tipos primitivos)               | `expect(9).toBe(9)`              |
| `toEqual`       | Igualdad profunda (objetos y arrays)             | `expect(obj).toEqual({ id: 1 })` |
| `toContain`     | El array contiene un elemento específico         | `expect(['a']).toContain('a')`   |
| `not.toContain` | El array NO contiene el elemento                 | `expect(arr).not.toContain('x')` |
| `toHaveLength`  | Evalúa la longitud de un array o string          | `expect([1,2]).toHaveLength(2)`  |
| `toBeDefined`   | Asegura que el valor no sea `undefined`          | `expect(res.name).toBeDefined()` |
| `toBeNull`      | Valida que el resultado sea estrictamente `null` | `expect(res).toBeNull()`         |

---

## Bloque 5 · Casos de Error e Inteligencia Artificial (20 min)

### Testear el lanzamiento de Errores

Para verificar que una función lanza una excepción controlada (por ejemplo, una validación fallida), **debes envolver la ejecución en una arrow function**:

```js
test("lanza error si el rating es mayor que 10", () => {
  expect(() => createReviewObject("movie1", "user1", 11)).toThrow(
    "El rating debe estar entre 1 y 10",
  )
})
```

> ⚠️ **Punto clave:** Si no usas la función flecha `() =>`, el error se lanzará antes de que Jest pueda analizarlo y el test fallará estrepitosamente.

---

### Prompt de IA para auditar tests unitarios

Puedes usar este molde de prompt para apoyarte en la IA durante tus desarrollos y revisar la calidad de tus pruebas:

```text
Te paso un test unitario escrito en Jest.

Quiero que analices y me digas (únicamente mediante explicaciones, sin reescribir todo el código):
- Si el test realmente comprueba el comportamiento correcto de forma robusta.
- Si falta algún caso extremo (edge case) o valor límite por probar.
- Qué mejoras de legibilidad o estructura aplicarías.

describe('addMovieToList', () => {
    test('añade una película a la lista', () => {
        const result = addMovieToList(['movie1'], 'movie2');
        expect(result).toHaveLength(2);
    });
});

```

---

## ✅ Resumen Final

- [ ] Entiendo qué es un test unitario y su aislamiento de componentes externos.
- [ ] Sé configurar Jest con ES Modules en el `package.json`.
- [ ] Domino el uso de las funciones globales `test`, `describe` y `expect`.
- [ ] Conozco los matchers clave: `toBe`, `toEqual`, `toContain`, `toHaveLength` y `toThrow`.
- [ ] Sé cómo testear funciones puras evaluando tanto caminos felices como excepciones de error.
- [ ] Entiendo el ciclo del flujo TDD (Rojo → Verde → Refactor).

---
