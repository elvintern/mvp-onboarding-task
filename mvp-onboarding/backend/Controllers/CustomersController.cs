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
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CustomersController (ApplicationDbContext context)
        {
            _context = context;
        }

        // Create
        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CreateUpdateCustomerDto dto)
        {
            var newCustomer= new CustomerEntity()
            {
                Name = dto.Name,
                Address = dto.Address,
            };

            await _context.Customers.AddAsync(newCustomer);
            await _context.SaveChangesAsync();

            return Ok("Customer Saved Successfully");
        }

        // Read
        [HttpGet]
        [EnableCors("AllowLocalhost3000")]
        public async Task<ActionResult<List<CustomerEntity>>> GetCustomers()
        {
            var products = await _context.Customers.OrderByDescending(p => p.Id).ToListAsync();

            return Ok(products);
        }

        [HttpGet]
        [Route("{id}")]
        [EnableCors("AllowLocalhost3000")]
        public async Task<ActionResult<CustomerEntity>> GetCustomeryId([FromRoute] long id)
        {
            var product = await _context.Customers.FirstOrDefaultAsync(p => p.Id == id);

            if (product is null)
            {
                return NotFound("Customeris not found");
            }

            return Ok(product);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateCustomer([FromRoute] long id, [FromBody] CreateUpdateCustomerDto dto)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(p => p.Id == id);

            if (customer is null)
            {
                return NotFound("Customeris not found");
            }

            customer.Name = dto.Name;
            customer.Address = dto.Address;

            await _context.SaveChangesAsync();

            return Ok("CustomerUpdated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] long id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(p => p.Id == id);

            if (customer is null)
            {
                return NotFound("Customeris not found");
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return Ok("Customer Updated Successfully");
        }
    }
}
