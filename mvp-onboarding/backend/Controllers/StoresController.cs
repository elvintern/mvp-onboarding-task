using backend.Context;
using backend.Dtos;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public StoresController (ApplicationDbContext context)
        {
            _context = context;
        }

        // Create
        [HttpPost]
        public async Task<IActionResult> CreateStore([FromBody] CreateUpdateStoreDto dto)
        {
            var newStore = new StoreEntity()
            {
                Name = dto.Name,
                Address = dto.Address,
            };

            await _context.Stores.AddAsync(newStore);
            await _context.SaveChangesAsync();

            return Ok("Store Saved Successfully");
        }

        // Read
        [HttpGet]
        public async Task<ActionResult<List<StoreEntity>>> GetStores()
        {
            var Stores = await _context.Stores.OrderByDescending(s => s.Id).ToListAsync();

            return Ok(Stores);
        }
         
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<StoreEntity>> GetStoreById([FromRoute] long id)
        {
            var store = await _context.Stores.FirstOrDefaultAsync(s => s.Id == id);

            if (store is null)
            {
                return NotFound("Product is not found");
            }

            return Ok(store);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateStore([FromRoute] long id, [FromBody] CreateUpdateStoreDto dto)
        {
            var store = await _context.Stores.FirstOrDefaultAsync(p => p.Id == id);

            if (store is null)
            {
                return NotFound("Store is not found");
            }

            store.Name = dto.Name;
            store.Address = dto.Address;

            await _context.SaveChangesAsync();

            return Ok("Store Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteStore([FromRoute] long id)
        {
            var store = await _context.Stores.FirstOrDefaultAsync(s => s.Id == id);

            if (store is null)
            {
                return NotFound("Product is not found");
            }

            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();

            return Ok("Product Updated Successfully");
        }
    }
}
