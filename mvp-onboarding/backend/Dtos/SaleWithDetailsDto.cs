namespace backend.Dtos
{
    public class SaleWithDetailsDto
    {
        public long Id { get; set; }
        public DateTime DateSold { get; set; }
        public string ProductName { get; set; }
        public int ProductId { get; set; }
        public string CustomerName { get; set; }
        public int CustomerId { get; set; }
        public string StoreName { get; set; }
        public int StoreId { get; set; }
    }
}
