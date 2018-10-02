import { Router } from 'express';
import { rows,empty } from '../config/db';
import Table from '../table';
let router = Router();

let blogTags = new Table('blogTags');
router.get('/:id', async (req, res) => {
    let id= req.params.id;
    try {

        let results = await rows('spBlogTags',[id]);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/', async (req, res) => {
    try {
        let results = await blogTags.getAll();
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    let blogTagsObj = req.body;
    try {

        let results = await blogTags.insert(blogTagsObj);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    let id= req.params.id;
    try {

        await empty('spDeleteBlogTags',[id]);
        res.sendStatus(200)

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default router;