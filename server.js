const express = require("express");
const app = express();
const port = 3000;
const funcionesCRUD = require("./dbControler");


app.use(express.json());

//ruta para leer documentos de la coleccion "tareas"
app.get("/tareas", async (req, res) => {
  try {
    const tareas = await funcionesCRUD.leerDocumentosTareas();
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

//ruta para leer documentos de la coleccion "usuario"
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await funcionesCRUD.leerDocumentosUsuario();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

// Ruta para crear una nueva tarea
app.post("/crearTarea", async (req, res) => {
  const { descripcion, completada, fechaVencimiento } = req.body;
  const tareaId = await funcionesCRUD.crearTarea(
    descripcion,
    completada,
    fechaVencimiento
  );
  if (tareaId) {
    res.status(201).json({ message: "Tarea creada", taskId: tareaId });
  } else {
    res.status(500).json({ message: "Error al crear la tarea" });
  }
});

// Ruta para crear un nuevo usuario
app.post("/crearUsuarios", async (req, res) => {
  const { email, password, rol } = req.body;
  const usuarioId = await funcionesCRUD.crearUsuario(email, password, rol);
  if (usuarioId) {
    res.status(201).json({ message: "Usuario creado", userId: usuarioId });
  } else {
    res.status(500).json({ message: "Error al crear el usuario" });
  }
});

//   // Ruta para eliminar una tarea por descripcion

app.delete("/tareas/:descripcion", async (req, res) => {
  const { descripcion } = req.params;
  const eliminado = await funcionesCRUD.eliminarTareaPorDescripcion(
    descripcion
  );

  if (eliminado) {
    res.status(200).json({ message: "Tarea eliminada con éxito" });
  } else {
    res
      .status(404)
      .json({
        message: "No se encontró la tarea o hubo un error al eliminarla",
      });
  }
});

//   // Ruta para eliminar un usuario por email

app.delete("/usuarios/:email", async (req, res) => {
  const { email } = req.params;
  const eliminado = await funcionesCRUD.eliminarUsuarioPorEmail(email);

  if (eliminado) {
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } else {
    res
      .status(404)
      .json({
        message: "No se encontró el usuario o hubo un error al eliminarlo",
      });
  }
});

// Ruta para editar una tarea por descripción
app.put('/tareas/:descripcion', async (req, res) => {
    const { descripcion } = req.params;
    const { nuevaDescripcion, nuevaCompletada, nuevaFechaVencimiento } = req.body;
    const editado = await funcionesCRUD.editarTareaPorDescripcion(
      descripcion, nuevaDescripcion, nuevaCompletada, nuevaFechaVencimiento
    );
  
    if (editado) {
      res.status(200).json({ message: 'Tarea editada con éxito' });
    } else {
      res.status(404).json({ message: 'No se encontró la tarea o hubo un error al editarla' });
    }
  });
  
//   // Ruta para editar un usuario por email
//   app.put('/usuarios/:email', async (req, res) => {
//     const { email } = req.params;
//     const { nuevoEmail, nuevoPassword, nuevoRol } = req.body;
//     const editado = await funcionesCRUD.editarUsuarioPorEmail(
//       email, nuevoEmail, nuevoPassword, nuevoRol
//     );
  
//     if (editado) {
//       res.status(200).json({ message: 'Usuario editado con éxito' });
//     } else {
//       res.status(404).json({ message: 'No se encontró el usuario o hubo un error al editarlo' });
//     }
//   });
  
app.listen(port, () => {
  console.log("servidor corriendo");
});
