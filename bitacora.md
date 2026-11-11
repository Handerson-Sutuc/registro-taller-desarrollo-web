# Bitácora de repaso de Desarrollo Web

Completa una ficha por tema con tus palabras. No copies párrafos de los sitios consultados.

# Actividad 1
Imagina que Ana completa el formulario y presiona Registrar. Escribe en tu bitácora qué componente participa en cada paso:

¿Qué presenta los campos?
El componente de vista del cliente
¿Qué evita que el navegador recargue la página?
El manejador del evento en JavaScript. Cancela el envío nativo del navegador y le pasa el control al script
¿Qué componente recibe el JSON?
El endpoint o controlador del backend
¿Qué parte puede guardar el registro?
La capa de datos del backend

# Actividad 2
name — la clave con la que el dato viaja al servidor.
type — el tipo de control y su validación nativa.

required — obligatoriedad.
# Actividad 2
name — la clave con la que el dato viaja al servidor.
type — el tipo de control y su validación nativa.
required — obligatoriedad.

# Actividad 3
 ¿Qué información ya aparece en el HTML y qué falta para guardar el registro?
 El HTML ya tiene todo lo necesario para capturar los datos, pero no puede guardarlos, le falta el JavaScript que intercepta el envío.
 
 Busca el apartado de controles y responde en tu bitácora: ¿cuándo usarías type="email" y cuándo type="tel"?
 Se utiliza cada uno cuando tenemos en especifico ese tipo de datos para poder diferenciarlos.

 <html> — el elemento raíz. Todo lo demás va dentro de él, su atributo leclara el idioma de la página.

<head> — la "cabeza" del documento: guarda lo que no se ve pero configura la página

 # Actividad 4
 Cambio el espacio entre el formulario y el margen de la pagina y tambien cambio el espacio desde donde empieza el formulario en la parte de arriba

 # Actividad 5
 justify-content: center; — centra el contenido verticalmente dentro del contenedor.

align-items: flex-start; — alinea los elementos al inicio.

# Actividad 6
Cambia inscritos a 20. Antes de ejecutar, responde: ¿se ejecutará inscritos++? ¿Qué devuelve hayCupo()?
no se ejecuta inscritos++ ya que no puede haber mas cupos que 20
hayCupo() devuelve error al no poder ser ejecutado

Explica: escribe un caso donde usarías const y otro donde usarías let.
-Usa const cuando el valor se decide una sola vez y no debe reasignarse
-usa let cuando el valor cambia durante la ejecución

# Actividad 7

# Actividad 8
Los tres son cosas distintas que se complementan: Node.js es el motor que ejecuta JavaScript fuera del navegador, npm es el gestor de paquetes que trae Node instalado, y VS Code es el editor donde escribes el código. node_modules aparece porque npm descarga ahí las dependencias, y no se sube a GitHub porque es un derivado reconstruible y enorme a partir de package.json y package-lock.json.

# Actividad 9
Define qué es una ruta. Escribe un ejemplo de GET y otro de POST, e indica cuándo usarías los estados HTTP 200, 201 y 400.
Una ruta es la dirección a la que el navegador pide algo, junto con el método que dice qué quiere hacer: GET /api/inscripciones para pedir la lista y POST /api/inscripciones para enviar y crear una inscripción.

El servidor contesta con un número: 200 si todo salió bien y solo devolvió información, 201 si además creó un registro nuevo (el caso de Ana al registrarse) y 400 si los datos llegaron mal o incompletos.

# Actividad 10
Son operaciones inversas: JSON.stringify() convierte un objeto de JavaScript en una cadena de texto JSON para enviarlo, y response.json() lee la respuesta del servidor y convierte ese texto JSON de vuelta en un objeto. Además, el estado 201 significa "recurso creado con éxito".

# Actividad 11
DDL: definir el molde
sql
CREATE TABLE inscripciones (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre    TEXT NOT NULL,
  correo    TEXT NOT NULL UNIQUE,
  taller    TEXT NOT NULL,
  creado_en TEXT DEFAULT CURRENT_TIMESTAMP
);

DML: llenar el molde

sql
INSERT INTO inscripciones (nombre, correo, taller)
VALUES ('Ana', 'ana@ejemplo.com', 'JavaScript');

SELECT nombre, taller FROM inscripciones;

UPDATE inscripciones SET taller = 'Node.js y Express' WHERE correo = 'ana@ejemplo.com';

DELETE FROM inscripciones WHERE id = 1;
# Actividad 12
explica con tus palabras la diferencia entre add, commit y push. ¿Qué información comunica un buen mensaje de commit?
git add — actualiza el index
git commit — genera un objeto commit que apunta a un tree raíz, a su parent commit y a un mensaj
git push — transfiere los objetos alcanzables desde la rama local al repositorio remoto y actualiza la ref remota. 



## HTML
- Resumen propio (2–3 frases):
- Dos términos clave y su explicación:
- Ejemplo de código explicado:
- Pregunta que podría aparecer en el examen:

## CSS
- Resumen propio (2–3 frases):
- Dos términos clave y su explicación:
- Ejemplo de código explicado:
- Pregunta que podría aparecer en el examen:

## JavaScript y DOM
- Resumen propio (2–3 frases):
- Dos términos clave y su explicación:
- Ejemplo de código explicado:
- Pregunta que podría aparecer en el examen:

## Node.js, Express y API
- Resumen propio (2–3 frases):
- Dos términos clave y su explicación:
- Ejemplo de ruta o solicitud explicado:
- Pregunta que podría aparecer en el examen:

## SQL
- Resumen propio (2–3 frases):
- Explica SELECT, INSERT, UPDATE y DELETE:
- ¿Qué son una clave primaria y una clave foránea?
- Pregunta que podría aparecer en el examen:

## Git y GitHub
- Resumen propio (2–3 frases):
- Explica add, commit y push:
- Diferencia entre Git y GitHub:
- Pregunta que podría aparecer en el examen:

# Versión final del proyecto
El formulario sigue en el HTML y ahora también pide modalidad y experiencia previa. JavaScript evita la recarga, arma el JSON y llama a Express. Express valida otra vez y `database.js` guarda la fila en SQLite, así que el registro sigue ahí aunque se reinicie el servidor.

GET lee la lista, POST crea, PUT actualiza la fila del id y DELETE la borra. Si falta un campo o el correo no tiene formato válido, el servidor responde 400 y no escribe en la tabla.

Los reportes no se calculan en el navegador: `GET /api/reportes/resumen` cuenta en SQL el total y agrupa por taller, horario y modalidad. Después de crear, editar o eliminar, la página vuelve a pedir la lista y ese resumen.
