using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ActivoFijoAPI.Models
{
    [Table("tipos_activos")]
    public class TipoActivo
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string Descripcion { get; set; }

        [Column("cuenta_contable_compra")]
        public string CuentaContableCompra { get; set; }

        [Column("cuenta_contable_depreciacion")]
        public string CuentaContableDepreciacion { get; set; }

        public bool Activo { get; set; }
    }
}
