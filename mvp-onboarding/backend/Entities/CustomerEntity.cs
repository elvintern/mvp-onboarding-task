using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class CustomerEntity
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
}
