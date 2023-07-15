using System.ComponentModel.DataAnnotations;

namespace ElephantSQL_example{

    public class User{

        [Key]
        public int Id {get; set;}

        [Required]
        public string Email{get; set;}

        [Required]
        public string Password {get; set;}

        [Required]
        public string UserName {get; set;}

        public DateTime CreatedAt {get; set;}
    }
}