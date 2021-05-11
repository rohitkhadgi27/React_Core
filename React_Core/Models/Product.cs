using System;
using System.Collections.Generic;

#nullable disable

namespace React_Core.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sale>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? Price { get; set; }

        public virtual ICollection<Sale> Sales { get; set; }
    }
}
