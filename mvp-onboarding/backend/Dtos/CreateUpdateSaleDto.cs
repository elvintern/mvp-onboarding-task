namespace backend.Dtos
{
    public class CreateUpdateSaleDto
    {
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }
    }
}
