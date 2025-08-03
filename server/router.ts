import {Request, Response, Router} from "express"
import { Book,IBook } from "./models/Book";

const router: Router = Router()

router.post("/api/book", (req: Request, res: Response) => {
    try{
        const book: IBook = new Book ({
        name: req.body.name,
        author: req.body.author,
        pages: req.body.pages
        });

        book.save()
            .then(() => res.status(201).json({ message: "Book created successfully!" }))
    } catch (err){
        console.log(err)
        res.status(400).json({message: err})
    }
})

router.get("/api/book/:name", async (req: Request, res: Response) => {
    try {
        const book = await Book.findOne({ name: req.params.name });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

export default router