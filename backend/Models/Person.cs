using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElephantSQL_example
{
    //Klasse der afspejler en tabel i databasen.
    public class Person
    {
        [Key]
        public int Id { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public DateTime birthDay { get; set; }  

        public string country { get; set; }


    }
}
