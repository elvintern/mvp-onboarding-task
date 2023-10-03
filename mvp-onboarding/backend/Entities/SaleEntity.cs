using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class SaleEntity
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }
        public ProductEntity Product { get; set; }
        public CustomerEntity Customer { get; set; }
        public StoreEntity Store { get; set; }
    }
}
