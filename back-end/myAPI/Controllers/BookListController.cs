using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace myAPI.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class BookListController : ControllerBase
    {

        [HttpGet(Name = "getBooks")]
        public object Get()
        {

            List<Books> booklist = new List<Books>();

           
            using (var reader = new StreamReader("books.txt"))
            {
             
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(',');

                    Books book = new Books();

                    book.id = values[0];
                    book.title = values[1];
                    book.author = values[2];
                    book.coverImage = values[3];
                    book.summary = values[4];
                    book.dialog = false;

                    booklist.Add(book);

                }
            }

            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(booklist);


            return JSONString;
        }
    }
}