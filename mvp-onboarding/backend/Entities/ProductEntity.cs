﻿using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class ProductEntity
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
