using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElephantSQL_example.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly PersonController _personController;
        private readonly MyDbContext _dbContext;
        private readonly ILogger<PersonController> _logger;
        public LoginController(MyDbContext dbContext, ILogger<PersonController> logger, PersonController personController)
        {
            _dbContext = dbContext;
            _logger = logger;
            _personController = personController;   
        }

        [HttpGet("getPersons", Name = "GetPersons")]
        public async Task<List<Person>> GetPersons()
        {
            return await _personController.GetPersons();
        }

        [HttpPost("loginUser", Name = "LoginUser")]
        public async Task<IActionResult> LoginUser(string email, string password)
        {
            var user = await _dbContext.User.Where(x => x.Email == email).FirstOrDefaultAsync();
                if (user != null)
                {
                   bool verified = BCrypt.Net.BCrypt.Verify(password, user.Password);
                   if (verified)
                    {
                    Console.WriteLine("Der er adgang");
                    return Ok(user);
                    }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
                }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            
            
        }
    }
}
