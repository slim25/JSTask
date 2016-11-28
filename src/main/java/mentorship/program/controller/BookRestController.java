package mentorship.program.controller;

import mentorship.program.model.Book;
import mentorship.program.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookRestController {

    private final BookRepository bookRepository;

    @Autowired
    BookRestController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }


    @RequestMapping(method = RequestMethod.GET, value = "/init")
    void init() {
        bookRepository.save(new Book("The Great Gatsby",2));
        bookRepository.save(new Book("The Grapes Of Wrath",22));
        bookRepository.save(new Book("Nineteen Eighty Four",33));
        bookRepository.save(new Book("Ulysses",4));
        bookRepository.save(new Book("Lolita",323));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/books")
    @CrossOrigin("*")
    Iterable<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/addBook",headers = {"content-type=application/json"})
    @CrossOrigin("*")
    void addBook(@RequestBody Book book) {
        bookRepository.save(book);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/deleteBook",headers = {"content-type=application/json"})
    @CrossOrigin("*")
    void deleteBook(@RequestParam(name = "id") Long id) {
        bookRepository.delete(id);
    }

}
