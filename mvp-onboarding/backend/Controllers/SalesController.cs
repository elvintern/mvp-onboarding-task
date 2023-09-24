using backend.Context;
using backend.Dtos;
using backend.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public SalesController (ApplicationDbContext context)
        {
            _context = context;
        }

        // Create
        [HttpPost]
        public async Task<IActionResult> CreateSale([FromBody] CreateUpdateSaleDto dto)
        {
            var newSale = new SaleEntity()
            {
               ProductId = dto.ProductId,
               CustomerId = dto.CustomerId,
               StoreId = dto.StoreId,
               DateSold = dto.DateSold
            };

            await _context.Sales.AddAsync(newSale);
            await _context.SaveChangesAsync();

            return Ok("Sale Saved Successfully");
        }

        // Read
        [HttpGet]
        [EnableCors("AllowLocalhost3000")]
        public async Task<ActionResult<List<SaleEntity>>> GetSales()
        {
            var Sales = await _context.Sales.OrderByDescending(s => s.Id).ToListAsync();

            return Ok(Sales);
        }
         
        [HttpGet]
        [Route("{id}")]
        [EnableCors("AllowLocalhost3000")]
        public async Task<ActionResult<SaleEntity>> GetSaleById([FromRoute] long id)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(s => s.Id == id);

            if (sale is null)
            {
                return NotFound("Sale is not found");
            }

            return Ok(sale);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateSale([FromRoute] long id, [FromBody] CreateUpdateSaleDto dto)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(s => s.Id == id);

            if (sale is null)
            {
                return NotFound("Sale is not found");
            }

            sale.ProductId = dto.ProductId;
            sale.CustomerId = dto.CustomerId;
            sale.StoreId = dto.StoreId; 
            sale.DateSold = dto.DateSold;

            await _context.SaveChangesAsync();

            return Ok("Sale Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteSale([FromRoute] long id)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(s => s.Id == id);

            if (sale is null)
            {
                return NotFound("Sale is not found");
            }

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();

            return Ok("Sale Updated Successfully");
        }
    }
}
