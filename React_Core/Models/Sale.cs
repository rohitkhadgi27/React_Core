using System;
using System.Collections.Generic;

#nullable disable

namespace React_Core.Models
{
    public partial class Sale
    {
        public int Id { get; set; }
        public int? ProductId { get; set; }
        public int? CustomerId { get; set; }
        public int? StoreId { get; set; }
        public DateTime? DateSold { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
