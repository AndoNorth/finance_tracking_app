using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionDbContext _context;
        public TransactionController(TransactionDbContext context) => _context = context;
        [HttpGet]
        public async Task<IEnumerable<Transaction>> Get()
        {
            var MAX_TRANSACTIONS = 4096;
            // _context.AsQueryable().Where(u => <condition>).Take(10).ToList()
            return await _context.Transactions.Take(MAX_TRANSACTIONS).ToListAsync(); // .Take(N) to reduce the output
        }
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Transaction), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetById(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            return transaction == null ? NotFound() : Ok(transaction);
        }
        [HttpGet("{startDate}/{endDate}")]
        [ProducesResponseType(typeof(Transaction), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetById(string startDate, string endDate)
        {
            var transaction = await _context.Transactions.AsQueryable().Where(transactions =>
                transactions.TransactionTime.Date >= DateTime.Parse(startDate) &&
                transactions.TransactionTime.Date <= DateTime.Parse(endDate)).ToListAsync();
            return transaction == null ? NotFound() : Ok(transaction);
        }
        [HttpPost]
        [ProducesResponseType(typeof(Transaction), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create([FromBody] Transaction transaction)
        {
            var dateTime = transaction.TransactionTime;
            if (dateTime == default || dateTime == DateTime.MinValue) transaction.TransactionTime = DateTime.UtcNow; // dateTime.HasValue
            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = transaction.Id }, transaction);
        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, [FromBody] Transaction transaction)
        {
            if (transaction.Id != id) return BadRequest();

            _context.Entry(transaction).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteById(int id)
        {
            var transactionToDelete = await _context.Transactions.FindAsync(id);
            if (transactionToDelete == null) return NotFound();

            _context.Transactions.Remove(transactionToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteAll()
        {
            _context.Transactions.RemoveRange(_context.Transactions);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
