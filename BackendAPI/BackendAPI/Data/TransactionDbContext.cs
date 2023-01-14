using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Backend.Models;

namespace Backend.Data
{
    public class TransactionDbContext : DbContext
    {
        public TransactionDbContext(DbContextOptions<TransactionDbContext> options)
            : base(options)
        {
            try
            {
                var databaseCreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;
                if(databaseCreator != null)
                {
                    if (!databaseCreator.CanConnect())
                    {
                        databaseCreator.Create();
                        Console.WriteLine("Created and Connected to Db");
                    }
                    else Console.WriteLine("Connected to Db");
                    if (!databaseCreator.HasTables())
                    {
                        databaseCreator.CreateTables();
                        Console.WriteLine("Created TransactionDbContext in Db");
                    }
                    else Console.WriteLine("Db has Tables");
                }
                else
                {
                    Console.WriteLine("DatabaseCreator is null");
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public DbSet<Transaction> Transactions { get; set; }
    }
}
