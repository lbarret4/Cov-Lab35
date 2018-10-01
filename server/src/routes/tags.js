import { Router } from 'express';
import Table from '../table';
let router = Router();

let tags = new Table('tags');

router.get('/', async (req, res) => {
    try {
        let results = await tags.getAll();
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let results = await tags.getOne(id);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    let tagsObj = req.body;
    try {

        let results = await tags.insert(tagsObj);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let tagsObj = req.body;
    try {

        let results = await tags.update(id, tagsObj);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let results = await tags.delete(id);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});








export default router;