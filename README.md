# Registro de participantes para un taller

Aplicación web para crear, consultar, actualizar y eliminar inscripciones. Los datos se guardan en SQLite y la página muestra reportes calculados desde esa base.

## Requisitos

- Node.js 22.13 o posterior (usa el módulo integrado `node:sqlite`).
- npm, incluido con Node.js.

Comprueba las versiones con `node -v` y `npm -v`.

## Instalar y ejecutar

1. Abre esta carpeta en VS Code.
2. En la terminal, instala Express:

```powershell
npm install
```

3. Inicia el servidor:

```powershell
npm start
```

4. Abre [http://localhost:3000](http://localhost:3000).

Al arrancar, `database.js` crea `registro_taller.db` junto a `server.js` si el archivo todavía no existe. Ese archivo no se sube a GitHub.

### Si PowerShell bloquea npm.ps1

```powershell
npm.cmd install
npm.cmd start
```

## Base de datos

La tabla `inscripciones` guarda:

| Columna | Uso |
| --- | --- |
| id | Clave primaria |
| nombre, correo, telefono | Datos del participante |
| taller, horario | Selecciones del formulario |
| modalidad, nivel_experiencia | Campos añadidos |
| fecha_registro | Fecha y hora del registro |

La conexión está en `database.js` y usa sentencias preparadas.

## Rutas de la API

- `GET /api/inscripciones` — lista todas las inscripciones.
- `POST /api/inscripciones` — valida y guarda una inscripción. Responde `201` o `400`.
- `PUT /api/inscripciones/:id` — valida y actualiza la fila. Responde `404` si el id no existe.
- `DELETE /api/inscripciones/:id` — elimina la fila. Responde `404` si el id no existe.
- `GET /api/reportes/resumen` — total y conteos por taller, horario y modalidad.

Ejemplo para crear un registro:

```powershell
curl -X POST http://localhost:3000/api/inscripciones -H "Content-Type: application/json" -d "{\"nombre\":\"Ana López\",\"correo\":\"ana@ejemplo.com\",\"telefono\":\"8888-1234\",\"taller\":\"JavaScript\",\"horario\":\"Mañana (6:00-12:00)\",\"modalidad\":\"Virtual\",\"nivel_experiencia\":\"Inicial\"}"
```

## Cómo probar cada operación

1. Completa el formulario y pulsa **Registrar inscripción**. La persona debe aparecer en la lista y en Reportes.
2. Recarga la página: el registro sigue ahí porque está en SQLite.
3. Pulsa **Editar**, cambia un dato y guarda. La lista y las barras deben cambiar.
4. Pulsa **Eliminar**. La fila desaparece y los conteos se actualizan.
5. Deja el correo vacío o escribe uno sin `@`. El navegador lo rechaza; si la petición llega incompleta, Express responde `400` y no guarda la fila.
6. Detén el servidor con Ctrl+C, vuelve a ejecutar `npm start` y comprueba que los datos continúan.
7. Reduce el ancho de la ventana: el formulario y los reportes pasan a una columna.

El apartado **Reportes** muestra el total y barras por taller, horario y modalidad. Con la tabla vacía aparece el aviso “Todavía no hay inscripciones para reportar”.

En `evidencias/` hay capturas del formulario, la lista con Editar y Eliminar, los reportes y la vista en pantalla estrecha. Los nombres de las capturas son inventados.

## Qué no se sube

`.gitignore` excluye `node_modules/`, `.env` y los archivos `registro_taller.db`.
