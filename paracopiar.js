const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Usar el puerto definido en las variables de entorno o 3000 por defecto
const funcionesCRUD = require('./dbControler');

app.use(express.json());

// Ruta para obtener todas las tareas
app.get('/tareas', async (req, res) => {
  const tareas = await funcionesCRUD.leerDocumentos();
  res.status(200).json(tareas);
});

// Ruta para crear una nueva tarea
app.post('/tareas', async (req, res) => {
  const { descripcion, completada } = req.body;
  const tareaId = await funcionesCRUD.crearTarea(descripcion, completada);
  if (tareaId) {
    res.status(201).json({ message: 'Tarea creada', taskId: tareaId });
  } else {
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
});

// Ruta para editar una tarea por ID
app.put('/tareas/:id', async (req, res) => {
  const { id } = req.params;
  const { descripcion, completada } = req.body;
  const tareaEditada = await funcionesCRUD.editarTarea(id, descripcion, completada);
  if (tareaEditada) {
    res.status(200).json({ message: 'Tarea editada' });
  } else {
    res.status(500).json({ message: 'Error al editar la tarea' });
  }
});

// Ruta para eliminar una tarea por ID
app.delete('/tareas/:id', async (req, res) => {
  const { id } = req.params;
  const tareaEliminada = await funcionesCRUD.eliminarTarea(id);
  if (tareaEliminada) {
    res.status(200).json({ message: 'Tarea eliminada' });
  } else {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
