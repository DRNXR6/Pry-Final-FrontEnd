import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Crear la aplicación de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

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
      filename = `${originalName}(${counter})${ext}`;
      counter++;
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

// Nueva ruta para borrar una imagen
app.delete('/delete-image', (req, res) => {
  const { imageName } = req.body; // Nombre de la imagen que deseas borrar
  const imagePath = path.join('./uploads', imageName); // Ruta de la carpeta uploads

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error('Error al borrar la imagen:', err);
      return res.status(500).send('Error al borrar la imagen.');
    }
    res.send('Imagen eliminada exitosamente.');
  });
});

// Iniciar el servidor en el puerto 3001
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
