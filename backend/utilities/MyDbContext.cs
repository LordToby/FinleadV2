using Microsoft.EntityFrameworkCore;
using Npgsql;
using ElephantSQL_example;

//Klasse der afspejler databasen og dens tabeller 
public class MyDbContext : DbContext
{
    //En af tabellerne.
    public DbSet<Person> Person { get; set; }

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
    }

    //Dette er connection string til databasen. Informationerne fås fra editoren i Elephant SQL.
    //Skal det være rigtigt skal jeg hive connectionString ind fra appsettings.json istedet.
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Server=mouse.db.elephantsql.com;Port=5432;Database=vhaadoru;User Id=vhaadoru;Password=CDnHt_wQpm0bhxGqhWY25YgLoddRweby;"); // Erstat "connection_string" med din forbindelsesstreng til ElephantSQL-databasen
    }
}