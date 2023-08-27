using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using System.Text;
using System.Text.Json;
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
        private readonly IDistributedCache _cache;
        //Loggeren viser udførte queries i konsollen. 
        //PersonController constructoren kaldes fra en af metoderne i Program.cs
        public PersonController(MyDbContext dbContext, ILogger<PersonController> logger, IDistributedCache cache)
        {
            _dbContext = dbContext; 
            _logger = logger;
            _cache = cache;
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

        [HttpPost("addUser", Name = "AddUser")]
        public async Task<IActionResult> AddUser(string email, string userName, string password) {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
            var user = new User {
                Email = email,
                Password = hashedPassword,
                UserName = userName,
                CreatedAt = DateTime.UtcNow,
            };
            var existingUser = await _dbContext.User.Where(x => x.Email == user.Email || x.UserName == user.UserName).FirstOrDefaultAsync();
                try
                {
                if (existingUser == null)
                {
                    await _dbContext.User.AddAsync(user);
                    await _dbContext.SaveChangesAsync(); 
                    return Ok();
                }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while adding a person");
                    return StatusCode(500);
                }
            return StatusCode(400);   

        }

        [HttpGet("users", Name ="GetUsers")]
        public async Task<List<User>> GetUsers(bool enableCache)
        {
            List<User> users = new List<User>();
            if (!enableCache)
            {
                return await _dbContext.User.ToListAsync();
            }
            string cacheKey = "cacheExample2";
            // Trying to get data from the Redis cache with the given key
            byte[] cachedData = await _cache.GetAsync(cacheKey);
            if(cachedData != null)
            {
                // If the data is found in the cache, encode and deserialize cached data.
                var cachedDataString = Encoding.UTF8.GetString(cachedData);
                users = JsonSerializer.Deserialize<List<User>>(cachedDataString);
            }
            else
            {
                // If the data is not found in the cache, then fetch data from database
                users = await _dbContext.User.ToListAsync();
                // Serializing the data
                string cachedDataString = JsonSerializer.Serialize(users);
                var dataToCache = Encoding.UTF8.GetBytes(cachedDataString);
                // Setting up the cache options
                DistributedCacheEntryOptions options = new DistributedCacheEntryOptions()
                    .SetAbsoluteExpiration(DateTime.Now.AddMinutes(5))
                    .SetSlidingExpiration(TimeSpan.FromMinutes(3));

                await _cache.SetAsync(cacheKey, dataToCache, options);
            }

            return users;
            
        }


    }
}
