// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/images'); // Adjust the path as needed
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;




const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the directory exists, if not, create it
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationPath = '';
    if (file.mimetype.startsWith('image/')) {
      destinationPath = 'uploads/images'; // Store image files
    } else if (file.mimetype.startsWith('audio/')) {
      destinationPath = 'uploads/audio'; // Store audio files
    } else {
      cb(new Error('File type not supported')); // Handle unsupported file types
      return;
    }

    // Ensure the destination directory exists
    ensureDirectoryExists(destinationPath);

    cb(null, destinationPath); // Set the destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file naming
  }
});

// Configure multer upload
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'audio/mpeg', 'audio/wav'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept file
    } else {
      cb(new Error('Unsupported file type')); // Reject file
    }
  }
});

module.exports = upload;
