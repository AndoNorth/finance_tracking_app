using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        [Required]
        public string Summary { get; set; }
        public string? Description { get; set; }
        [Required]
        public double Amount { get; set; }
        [Required]
        public TransactionTypes TransactionType { get; set; }
        public enum TransactionTypes
        {
            Ingoing, Outgoing
        }
        public DateTime TransactionTime { get; set; }
    }
}
