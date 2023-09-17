using Microsoft.EntityFrameworkCore;
using Npgsql;
using ElephantSQL_example;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ElephantSQL_example.utilities;

//Klasse der afspejler databasen og dens tabeller 
public class MyDbContext : IdentityDbContext<IdentityUser>
{
    //En af tabellerne.
    public DbSet<Person> Person { get; set; }

    public DbSet<User> User { get; set; }

    public DbSet<RefreshToken> RefreshTokens { get; set; }

    //Tom constructor er påkrævet
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {
       
    }

    //Indstillinger for model der skabes ved opstart.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>().
             Property(f => f.Id)
            .ValueGeneratedOnAdd(); //Sikrer autoinkrementering af Id'er
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Person>().
             Property(f => f.Id)
            .ValueGeneratedOnAdd(); //Sikrer autoinkrementering af Id'er
        base.OnModelCreating(modelBuilder);
    }

   
}