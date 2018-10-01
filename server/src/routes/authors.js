import { Router } from 'express';
import Table from '../table';
let router = Router();

let authors = new Table('authors');

router.get('/', async (req, res) => {
    try {
        let results = await authors.getAll();
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let results = await authors.getOne(id);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    let authorObj = req.body;
    try {

        let results = await authors.insert(authorObj);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let authorObj = req.body;
    try {

        let results = await authors.update(id, authorObj);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let results = await authors.delete(id);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});






export default router;