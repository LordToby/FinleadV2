using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ElephantSQL_example.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly PersonController _personController;
        private readonly MyDbContext _dbContext;
        private readonly ILogger<PersonController> _logger;
        private readonly IConfiguration _configuration;
        public LoginController(IConfiguration configuration, MyDbContext dbContext, ILogger<PersonController> logger, PersonController personController)
        {
            _configuration = configuration;
            _dbContext = dbContext;
            _logger = logger;
            _personController = personController;   
        }

        [HttpGet("resources", Name = "getResources")]
        [Authorize]
        public IActionResult GetResources()
        {
            return Ok($"protected resources, username: {User.Identity!.Name}");
        }


        [HttpGet("getPersons", Name = "GetPersons")]
        public async Task<List<Person>> GetPersons()
        {
            return await _personController.GetPersons();
        }

        [HttpPost("loginUser", Name = "LoginUser")]
        public async Task<IActionResult> LoginUser(string email, string password)
        {


            var user = await _dbContext.User.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                // Returner en 401 Unauthorized-statuskode for mislykket autentificering.
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
        new Claim(ClaimTypes.Role, "User"),
    };

            var token = new JwtSecurityToken("https://localhost:5050/", "http://localhost:3000/", claims, expires: DateTime.Now.AddMinutes(5), signingCredentials: creds);
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            // Returner JWT-token som JSON-resultat.
            return new JsonResult(new { tokenString });


        }

        //Logout håndteres udelukkende i frontenden
    }
}
