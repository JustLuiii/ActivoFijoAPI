using Microsoft.EntityFrameworkCore;
using ActivoFijoAPI.Models; 

namespace ActivoFijoAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Departamento> Departamentos { get; set; }
        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<TipoActivo> TiposActivos { get; set; }
        public DbSet<ActivoFijo> ActivosFijos { get; set; }
        public DbSet<Depreciacion> Depreciaciones { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}

