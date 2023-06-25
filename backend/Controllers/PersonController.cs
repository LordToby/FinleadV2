using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace ElephantSQL_example.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        //Det er standard at gøre disse variabler til readonly og med _ foran.
        private readonly MyDbContext _dbContext;
        private readonly ILogger<PersonController> _logger;

        //Loggeren viser udførte queries i konsollen. 
        //PersonController constructoren kaldes fra en af metoderne i Program.cs
        public PersonController(MyDbContext dbContext, ILogger<PersonController> logger)
        {
            _dbContext = dbContext; 
            _logger = logger;
        }

        //Navnet oversættes i GET requestet til http://localhost:7050/Person/person som giver os personer som json objeker tilbage. 
        [HttpGet("person")]
        public async Task<List<Person>> GetPersons()
        {
            return await _dbContext.Person.ToListAsync();
        }

        //Payload betyder at der i Swagger automatisk er en request body med attributter til lave ny person og gemme ham.
        [HttpPost("addPerson", Name = "AddPerson")]
        public async Task<IActionResult> AddPerson(Person payload)
        {
            var person = new Person
            {
                birthDay = payload.birthDay,
                country = payload.country,
                firstName = payload.firstName,
                lastName = payload.lastName,
            };

            try
            {
                await _dbContext.Person.AddAsync(person);
                await _dbContext.SaveChangesAsync(); //Denne skal man bruge når man har lavet ændringer til en tabel.
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding a person");
                return StatusCode(500);
            }
        }
        [HttpDelete("deletePerson", Name = "DeletePerson")]
        public async Task<IActionResult> DeletePerson(int id){
            var person = await _dbContext.Person.Where(x=> x.Id == id).FirstOrDefaultAsync();
             _dbContext.Person.Remove(person);
             await _dbContext.SaveChangesAsync();
             return Ok(); 

        }
    }
}
