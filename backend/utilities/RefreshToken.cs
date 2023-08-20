using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ElephantSQL_example.utilities
{
    public class RefreshToken
    {
        public string Id { get; private set; }

        public RefreshToken(string value, TimeSpan duration, string userId)
        {
            Id = Guid.NewGuid().ToString();
            Value = value;
            Expiration = DateTime.UtcNow.Add(duration);
            ApplicationUserId = userId;
        }

        private RefreshToken()
        {

        }

        public string Value { get; private set; }
        public DateTime Expiration { get; private set; }
        public string ApplicationUserId { get; private set; }
        public IdentityUser User { get; set; }
    }
}

