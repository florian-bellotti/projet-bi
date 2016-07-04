using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Translate
{
    class Translator
    {
        private StreamReader reader;
        private StreamWriter writer;
        private Produit produit_lot;
        private Produit produit;
        private List<Produit> produits;

        private int categorie;
        private int number;
        private int id_lot;
        private string path;
        private int firstSpace;

        public Translator(string _path, int _categorie)
        {
            produits = new List<Produit>();
            path = _path;
            categorie = _categorie;
            number = 1;
            id_lot = 0;
        }

        public void Translate()
        {
            reader = new StreamReader(@"E:\Projets\BI\Datas\Before\" + path + ".txt");
            writer = new StreamWriter(@"E:\Projets\BI\Datas\After\" + path + ".txt", false);

            string line;
            while ((line = reader.ReadLine()) != null)
            {
                if (line.StartsWith("\t"))
                {
                    line = line.Trim();
                    produit_lot = new Produit();
                    produit_lot.reference = line.Split('\t')[0];
                    produit_lot.designation = line.Split('\t')[1];
                    produit_lot.categorie = categorie;
                    produit_lot.type = true;
                }
                else if(line.StartsWith("Prix catalogue"))
                {
                    line = line.Split('(')[1];
                    line = line.Substring(0, line.Length - 3);
                    produit_lot.prix = float.Parse(line);

                    WriteProduct(produit_lot);
                    foreach(Produit prod in produits)
                    {
                        WriteProduct(prod);
                    }

                    produits = new List<Produit>();
                }
                else
                {
                    produit = new Produit();
                    firstSpace = line.IndexOf(' ');
                    produit.reference = line.Substring(0, firstSpace - 1);
                    line = line.Substring(firstSpace + 1);
                    produit.designation = line.Split('-')[0].Trim();
                    produit.prix = float.Parse(line.Split('-')[1].Trim());
                    produit.categorie = categorie;
                    produit.type = false;
                    produits.Add(produit);
                }
            }

            reader.Close();
            writer.Close();
        }

        private void WriteProduct(Produit produit)
        {
            writer.WriteLine("insert into produit(designation, reference, prix, categorie, type) VALUES('" + 
                             produit.designation + "', '" +
                             produit.reference + "', " + 
                             produit.prix + ", " + 
                             produit.categorie + ", " + 
                             produit.type + ");"
            );
        }
    }
}
