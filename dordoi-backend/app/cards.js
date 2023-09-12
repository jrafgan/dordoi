const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid }= require('nanoid');
const config = require('../config');
const Card = require('../models/Card');
const router = express.Router();
const permit = require('../middleware/permit');
const auth = require('../middleware/auth')
const jwt = require("jsonwebtoken");
const SKU = require("../models/SKU");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const createToken = (userId) => {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '3h' });
};

async function uniqueSku(length) {
    let sku = '';
    let isUnique = false;

    // Генерируем артикул до тех пор, пока не найдем уникальный
    while (!isUnique) {
        // sku = nanoid(12); // Генерируем случайный артикул из 12 символов

        const characters = '0123456789';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            sku += characters[randomIndex];
        }

        // Проверяем, есть ли артикул в базе данных
        const existingSKU = await SKU.findOne({ sku });

        if (!existingSKU) {
            isUnique = true; // Артикул уникален
        }
        const yu = await SKU.find()
        console.log('existing SKU : ', yu);
    }
    return sku;
}

router.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        res.send(cards);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (card) {
            res.send(card);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', auth, upload.array('images'), async (req, res) => {
    try {
        const cardData = req.body;
        const uploadedFiles = req.files;
        let sku = await uniqueSku(12);

        console.log('req body : ', cardData);
        console.log('req files : ', req.files);
        // Проверяем, существует ли req.files и является ли это массивом
        const selectedImages = [];

        // Перебираем каждый загруженный файл и добавляем информацию о нем в массив
        for (const file of uploadedFiles) {
            selectedImages.push({
                type: file.fieldname, // Здесь можете указать тип файла, если он имеется
                url: `http://localhost:8003/uploads/${file.filename}`, // Путь к загруженному файлу в каталоге uploads
                fileName: file.originalname, // Имя файла
            });
        }

        const card = new Card({
            productTitle: cardData.productTitle,
            productDescription: cardData.productDescription,
            selectedBazaar: cardData.selectedBazaar,
            selectedCategory: cardData.selectedCategory,
            selectedSubcategory: cardData.selectedSubcategory,
            sellerPhone: cardData.sellerPhone,
            containerRow: cardData.containerRow,
            containerNumber: cardData.containerNumber,
            user: cardData.user,
            selectedImages: selectedImages,
            types: cardData.types,
            sku,
            createdAt: cardData.createdAt,
            updatedAt: cardData.updatedAt || null
        });

        await card.save();
        const newToken = createToken(cardData.user);
        const user = { _id: cardData.user }
        console.log('new card : ', card)
        const cards = await Card.find();
        sku = new SKU({ sku });

        // Сохраняем продукт в базе данных
        await sku.save();
        // Отправляем новый токен на клиент
        res.send({ token: newToken,  message: 'Card created!',  user, cards });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).send(error);
    }
});


router.delete('/', [auth, permit('admin')], async (req, res) => {
    try {
        const id = req.query.id;

        if (!id) {
            return res.status(400).send('Missing id parameter');
        }

        const card = await Card.findById(id);

        if (!card) {
            return res.status(404).send('Card not found');
        }

        await card.remove();

        // После удаления карточки, выберите все карточки и отправьте их клиенту
        const cards = await Card.find();
        res.status(204).send(cards);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});




module.exports = router;
