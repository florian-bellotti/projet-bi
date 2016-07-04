using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Translate
{
    class Program
    {
        static void Main(string[] args)
        {
            /*Produit produit = new Produit();
            produit.designation = "test";
            produit.reference = "afsegf";
            produit.prix = 5.69f;
            produit.categorie = "frigo";
            produit.type = true;

            Bdd bdd = new Bdd();
            bdd.Add(produit);*/

            Translator trans = new Translator("congelateur", 1);
            trans.Translate();

            Console.ReadLine();
        }
    }
}
