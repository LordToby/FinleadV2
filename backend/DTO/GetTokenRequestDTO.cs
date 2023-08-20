using ElephantSQL_example.utilities;

namespace ElephantSQL_example.DTO
{
    public class GetTokenRequestDTO
    {
        public string UserName { get; set; } = Consts.UserName;
        public string Password { get; set; } = Consts.Password;
    }
}
