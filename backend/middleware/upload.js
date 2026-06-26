const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Target directory paths in the public static folder
const uploadBaseDir = process.env.VERCEL
    ? path.join('/tmp', 'uploads')
    : path.join(__dirname, '..', '..', 'public', 'uploads');
const productsDir = path.join(uploadBaseDir, 'products');
const portraitsDir = path.join(uploadBaseDir, 'portraits');

// Create upload folders if they don't exist
[uploadBaseDir, productsDir, portraitsDir].forEach(dir => {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    } catch (e) {
        console.warn(`Could not create directory ${dir}: ${e.message}`);
    }
});

// File type filter helper
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images (JPEG, JPG, PNG, WEBP) are allowed'));
    }
};

// Storage for Product Images
const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, productsDir);
    },
    filename: (req, file, cb) => {
        const userId = req.user ? req.user.id : 'anon';
        const uniqueSuffix = Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `product-${userId}-${Date.now()}-${uniqueSuffix}${ext}`);
    }
});

const uploadProductImages = multer({
    storage: productStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per image
    fileFilter: fileFilter
}).array('images', 5); // Allow up to 5 images

// Storage for profile portraits
const portraitStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, portraitsDir);
    },
    filename: (req, file, cb) => {
        const userId = req.user ? req.user.id : 'anon';
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `portrait-${userId}-${Date.now()}${ext}`);
    }
});

const uploadPortrait = multer({
    storage: portraitStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
}).single('portrait');

// Helper: Process file into Supabase Storage CDN URL or Base64 DataURI
const processUploadedFile = async (file, bucketName = 'products') => {
    if (!file || !file.path || !fs.existsSync(file.path)) return null;

    // 1. Try Supabase Storage (Best Practice)
    try {
        const { supabase } = require('../config/db');
        if (supabase) {
            const fileBuffer = fs.readFileSync(file.path);
            const cleanName = file.originalname ? file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_') : 'img.webp';
            const fileName = `${Date.now()}-${Math.round(Math.random()*1e6)}-${cleanName}`;

            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(fileName, fileBuffer, {
                    contentType: file.mimetype || 'image/webp',
                    upsert: true
                });

            if (!error && data) {
                const { data: publicData } = supabase.storage
                    .from(bucketName)
                    .getPublicUrl(fileName);
                if (publicData && publicData.publicUrl) {
                    try { fs.unlinkSync(file.path); } catch(e) {}
                    return publicData.publicUrl;
                }
            }
        }
    } catch (e) {
        // Supabase storage bucket not configured yet or RLS error, gracefully fall back
    }

    // 2. Fallback for Vercel Serverless (Permanent Base64 Data URI)
    if (process.env.VERCEL) {
        try {
            const fileBuffer = fs.readFileSync(file.path);
            const base64 = fileBuffer.toString('base64');
            const dataUri = `data:${file.mimetype || 'image/webp'};base64,${base64}`;
            try { fs.unlinkSync(file.path); } catch(e) {}
            return dataUri;
        } catch (e) {
            console.error('DataURI conversion error:', e.message);
        }
    }

    // 3. Fallback for Localhost Static Files
    return `/uploads/${bucketName}/${file.filename}`;
};

module.exports = {
    uploadProductImages,
    uploadPortrait,
    processUploadedFile
};
