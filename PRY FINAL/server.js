// server.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Crear la aplicación de Express
const app = express();

// Configurar almacenamiento con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Especificar la carpeta donde se guardarán los archivos subidos
    const uploadPath = './uploads'; 
    
    // Crear la carpeta si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Obtener el nombre original del archivo y la extensión
    const originalName = path.parse(file.originalname).name;
    const ext = path.extname(file.originalname);
    
    // Generar el nombre del archivo de forma controlada
    let filename = originalName + ext;
    let counter = 1;

    // Verificar si el archivo ya existe y agregar un número al nombre si es necesario
    while (fs.existsSync(path.join('./uploads', filename))) {
      // Si el archivo ya existe, agregamos (n) al nombre
      filename = `${originalName}${ext}(${counter})`;
      counter++; // Incrementamos el contador para la siguiente iteración
    }

    // Pasamos el nombre del archivo modificado para evitar sobrescribir
    cb(null, filename);
  }
});

// Configuración de Multer con el almacenamiento configurado
const upload = multer({ storage: storage });

// Ruta para manejar la subida de archivos
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({
    message: 'File uploaded successfully!',
    filename: req.file.filename,
  });
});

// Iniciar el servidor en el puerto 3001
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
