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
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
};

router.get('/', auth, async (req, res) => {
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

        console.log('req body : ', cardData);
        console.log('req files : ', req.files);
        // Проверяем, существует ли req.files и является ли это массивом
        const selectedImages = [];

        // Перебираем каждый загруженный файл и добавляем информацию о нем в массив
        for (const file of uploadedFiles) {
            selectedImages.push({
                type: file.fieldname, // Здесь можете указать тип файла, если он имеется
                url: `${config.uploadPath}/${file.filename}`, // Путь к загруженному файлу в каталоге uploads
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
            urls: cardData.urls,
            createdAt: cardData.createdAt,
            updatedAt: cardData.updatedAt || null
        });

        await card.save();
        const newToken = createToken(cardData.user);
        const user = { _id: cardData.user }
        console.log('new card : ', card)
        const cards = await Card.find();

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
