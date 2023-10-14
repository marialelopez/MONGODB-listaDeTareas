const { json } = require("express");
const { MongoClient } = require("mongodb");
const env = require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

// Función para conectar a la base de datos
async function conectarBaseDatos() {
  try {
    await client.connect();
    const database = client.db("listaDeTareas");
    const tareasCollection = database.collection("tareas");
    const usuarioCollection = database.collection("usuario");
    return {
      tareas: tareasCollection,
      usuario: usuarioCollection,
    };
  } catch (error) {
    console.log(error);
  }
}

// Función para leer documentos de la colección "tareas"
async function leerDocumentosTareas() {
  const collections = await conectarBaseDatos();
  const tareasCollection = collections.tareas;

  try {
    const tareas = await tareasCollection.find({}).toArray();

    return {
      tareas: tareas,
    };
  } catch (error) {
    console.error("Error al obtener los documentos:", error);
    return null;
  }
}

leerDocumentosTareas().then((result) => {
  if (result) {
    console.log("Tareas:", result.tareas);
  }
});

leerDocumentosTareas();

// Función para leer documentos de la colección "usuarios"
async function leerDocumentosUsuario() {
  const collections = await conectarBaseDatos();
  const usuarioCollection = collections.usuario;

  try {
    const usuarios = await usuarioCollection.find({}).toArray(); // Obtenemos los usuarios

    return {
      usuarios: usuarios,
    };
  } catch (error) {
    console.error("Error al obtener los documentos:", error);
    return null;
  }
}

leerDocumentosUsuario().then((result) => {
  if (result) {
    console.log("Usuarios:", result.usuarios);
  }
});

leerDocumentosUsuario();

// Función para crear un documento en la colección "tareas"
async function crearTarea(descripcion, completada, fechaVencimiento) {
  const collections = await conectarBaseDatos();
  const tareasCollection = collections.tareas;

  try {
    const nuevaTarea = { descripcion, completada, fechaVencimiento };
    const resultado = await tareasCollection.insertOne(nuevaTarea);
    return resultado.insertedId;
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    return null;
  }
}

// Función para crear un documento en la colección "usuarios"
async function crearUsuario(email, password, rol) {
  const collections = await conectarBaseDatos();
  const usuarioCollection = collections.usuario;

  try {
    const nuevoUsuario = { email, password, rol };
    const resultado = await usuarioCollection.insertOne(nuevoUsuario);
    return resultado.insertedId;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return null;
  }
}

// Función para eliminar un documento en la colección "tareas" por descripción
async function eliminarTareaPorDescripcion(descripcion) {
  const collections = await conectarBaseDatos();
  const tareasCollection = collections.tareas;

  try {
    const resultado = await tareasCollection.deleteOne({
      descripcion: descripcion,
    });
    if (resultado.deletedCount === 1) {
      return true; // Éxito al eliminar
    }
    return false; // No se encontró el documento con la descripción especificada
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    return false; // Error al eliminar
  }
}

// Función para eliminar un documento en la colección "usuarios" por email
async function eliminarUsuarioPorEmail(email) {
  const collections = await conectarBaseDatos();
  const usuarioCollection = collections.usuario;

  try {
    const resultado = await usuarioCollection.deleteOne({ email: email });
    if (resultado.deletedCount === 1) {
      return true; // Éxito al eliminar
    }
    return false; // No se encontró el documento con el email especificado
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return false; // Error al eliminar
  }
}

// Función para editar una tarea por descripción
async function editarTareaPorDescripcion(descripcion, nuevaDescripcion, nuevaCompletada, nuevaFechaVencimiento) {
    const collections = await conectarBaseDatos();
    const tareasCollection = collections.tareas;
  
    try {
      const resultado = await tareasCollection.updateOne(
        { descripcion: descripcion },
        { $set: { descripcion: nuevaDescripcion, completada: nuevaCompletada, fechaVencimiento: nuevaFechaVencimiento } }
      );
  
      if (resultado.modifiedCount === 1) {
        return true; // Éxito al editar
      }
      return false; // No se encontró el documento con la descripción especificada
    } catch (error) {
      console.error("Error al editar la tarea:", error);
      return false; // Error al editar
    }
  }
  
//   // Función para editar un usuario por email
//   async function editarUsuarioPorEmail(email, nuevoEmail, nuevoPassword, nuevoRol) {
//     const collections = await conectarBaseDatos();
//     const usuarioCollection = collections.usuario;
  
//     try {
//       const resultado = await usuarioCollection.updateOne(
//         { email: email },
//         { $set: { email: nuevoEmail, password: nuevoPassword, rol: nuevoRol } }
//       );
  
//       if (resultado.modifiedCount === 1) {
//         return true; // Éxito al editar
//       }
//       return false; // No se encontró el documento con el email especificado
//     } catch (error) {
//       console.error("Error al editar el usuario:", error);
//       return false; // Error al editar
//     }
//   }
  

module.exports = {
  conectarBaseDatos,
  leerDocumentosTareas,
  leerDocumentosUsuario,
  crearTarea,
  crearUsuario,
  eliminarTareaPorDescripcion,
  eliminarUsuarioPorEmail,
  editarTareaPorDescripcion,
//   editarUsuarioPorEmail
};

// {
//     "descripcion": "pagar bancolombia",
//     "completada": false,
//     "fechaVencimiento": "2023-10-23"
//   }
  
// {
// "rol": "administrador",
// "email": "admin-andres@gmail.com",
// "password": "456"
// }