const express = require("express");
const path = require("path");
const db = require("./database");

const app = express();
const PORT = 3000;

const TALLERES = ["HTML y CSS", "JavaScript", "Node.js y Express"];
const HORARIOS = [
  "Mañana (6:00-12:00)",
  "Tarde (12:00-16:00)",
  "Noche (16:00-20:00)"
];
const MODALIDADES = ["Presencial", "Virtual"];
const NIVELES = ["Inicial", "Intermedio", "Avanzado"];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function texto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}

function leerDatos(cuerpo) {
  const origen = cuerpo ?? {};
  return {
    nombre: texto(origen.nombre),
    correo: texto(origen.correo),
    telefono: texto(origen.telefono),
    taller: texto(origen.taller),
    horario: texto(origen.horario),
    modalidad: texto(origen.modalidad),
    nivel_experiencia: texto(origen.nivel_experiencia)
  };
}

function validar(datos) {
  if (Object.values(datos).some((valor) => !valor)) {
    return "Completa todos los campos.";
  }
  if (datos.nombre.length < 2 || datos.nombre.length > 80) {
    return "El nombre debe tener entre 2 y 80 caracteres.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) {
    return "Escribe un correo válido.";
  }
  if (!/^[0-9+\s()-]{8,20}$/.test(datos.telefono)) {
    return "Escribe un teléfono de 8 a 20 caracteres.";
  }
  if (!TALLERES.includes(datos.taller)) {
    return "Selecciona un taller válido.";
  }
  if (!HORARIOS.includes(datos.horario)) {
    return "Selecciona un horario válido.";
  }
  if (!MODALIDADES.includes(datos.modalidad)) {
    return "Selecciona una modalidad válida.";
  }
  if (!NIVELES.includes(datos.nivel_experiencia)) {
    return "Selecciona un nivel de experiencia válido.";
  }
  return null;
}

app.get("/api/inscripciones", (req, res) => {
  const filas = db.prepare(
    "SELECT id, nombre, correo, telefono, taller, " +
      "horario, modalidad, nivel_experiencia, fecha_registro " +
      "FROM inscripciones ORDER BY id DESC"
  ).all();
  res.json(filas);
});

app.post("/api/inscripciones", (req, res) => {
  const datos = leerDatos(req.body);
  const error = validar(datos);
  if (error) {
    return res.status(400).json({ error });
  }

  const resultado = db.prepare(
    "INSERT INTO inscripciones " +
      "(nombre, correo, telefono, taller, horario, modalidad, nivel_experiencia) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run(
    datos.nombre,
    datos.correo,
    datos.telefono,
    datos.taller,
    datos.horario,
    datos.modalidad,
    datos.nivel_experiencia
  );

  res.status(201).json({
    mensaje: "Inscripción guardada.",
    id: Number(resultado.lastInsertRowid)
  });
});

app.put("/api/inscripciones/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Id inválido." });
  }

  const datos = leerDatos(req.body);
  const error = validar(datos);
  if (error) {
    return res.status(400).json({ error });
  }

  const resultado = db.prepare(
    "UPDATE inscripciones SET nombre=?, correo=?, telefono=?, " +
      "taller=?, horario=?, modalidad=?, nivel_experiencia=? WHERE id=?"
  ).run(
    datos.nombre,
    datos.correo,
    datos.telefono,
    datos.taller,
    datos.horario,
    datos.modalidad,
    datos.nivel_experiencia,
    id
  );

  if (resultado.changes === 0) {
    return res.status(404).json({ error: "No se encontró la inscripción." });
  }

  res.json({ mensaje: "Inscripción actualizada." });
});

app.delete("/api/inscripciones/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Id inválido." });
  }

  const resultado = db.prepare(
    "DELETE FROM inscripciones WHERE id = ?"
  ).run(id);

  if (resultado.changes === 0) {
    return res.status(404).json({ error: "No se encontró la inscripción." });
  }

  res.json({ mensaje: "Inscripción eliminada." });
});

app.get("/api/reportes/resumen", (req, res) => {
  const total = db.prepare(
    "SELECT COUNT(*) AS total FROM inscripciones"
  ).get().total;

  const porTaller = db.prepare(
    "SELECT taller, COUNT(*) AS cantidad FROM inscripciones " +
      "GROUP BY taller ORDER BY cantidad DESC"
  ).all();

  const porHorario = db.prepare(
    "SELECT horario, COUNT(*) AS cantidad FROM inscripciones " +
      "GROUP BY horario ORDER BY horario"
  ).all();

  const porModalidad = db.prepare(
    "SELECT modalidad, COUNT(*) AS cantidad FROM inscripciones " +
      "GROUP BY modalidad ORDER BY cantidad DESC"
  ).all();

  res.json({ total, porTaller, porHorario, porModalidad });
});

app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
