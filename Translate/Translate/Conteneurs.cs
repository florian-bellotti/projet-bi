using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Translate
{
    class Produit
    {
        public int id;
        public string designation;
        public string reference;
        public float prix;
        public int categorie;
        public bool type;
    }

    class Lot
    {
        public int id_lot;
        public int id_produit;
        public int quantite;
    }
}
