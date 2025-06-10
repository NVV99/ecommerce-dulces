const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');
const Category = require('../models/category');

/*
    GET /api/categories
    Devuelve todas las categorías (público)
*/
router.get('/', async (req, res, next) => {
    try {
        const cats = await Category.getAllCategories();
        res.json(cats);
    } catch (err) {
        next(err);
    }
});

/*
    GET /api/categories/:id
    Devuelve una categoría por ID (público)
*/
router.get('/:id', async (req, res, next) => {
    try {
        const cat = await Category.getCategoryById(req.params.id);
        if (!cat) return res.status(404).json({ message: 'Category not found.' });
        res.json(cat);
    } catch (err) {
        next(err);
    }
});

/*
    POST /api/categories
    Crea categoría (solo admin)
*/
router.post('/', auth, admin, async (req, res, next) => {
    try {
        const { nombre, descripcion } = req.body;
        if (!nombre) return res.status(400).json({ message: 'Nombre is required.' });
        await Category.createCategory({ nombre, descripcion });
        res.status(201).json({ message: 'Category created.' });
    } catch (err) {
        next(err);
    }
});

/*
    PUT /api/categories/:id
    Actualiza categoría (solo admin)
*/
router.put('/:id', auth, admin, async (req, res, next) => {
    try {
        const { nombre, descripcion } = req.body;
        await Category.updateCategory(req.params.id, { nombre, descripcion });
        res.json({ message: 'Category updated.' });
    } catch (err) {
        next(err);
    }
});

/*
    DELETE /api/categories/:id
    Elimina categoría (solo admin)
*/
router.delete('/:id', auth, admin, async (req, res, next) => {
    try {
        await Category.deleteCategory(req.params.id);
        res.json({ message: 'Category deleted.' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
