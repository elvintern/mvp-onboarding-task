using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class ProductEntity
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
