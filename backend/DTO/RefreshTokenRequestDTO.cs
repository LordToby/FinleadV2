using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ElephantSQL_example.DTO
{
    public class RefreshTokenRequestDTO
    {
        public string RefreshToken { get; set; }
        
    }
}
