using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace React_Core.Models
{
    public partial class talentdbContext : DbContext
    {
        public talentdbContext()
        {
        }

        public talentdbContext(DbContextOptions<talentdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Sale> Sales { get; set; }
        public virtual DbSet<Store> Stores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");

                entity.Property(e => e.Address)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Sale>(entity =>
            {
                entity.Property(e => e.DateSold).HasColumnType("date");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_Sales_Customer");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Sales_Product");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK_Sales_Store");
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.ToTable("Store");

                entity.Property(e => e.Address)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
