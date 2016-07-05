using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
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
        private string path;
        private int firstSpace;

        public Translator(string _path, int _categorie, int _StartID)
        {
            produits = new List<Produit>();
            path = _path;
            categorie = _categorie;
            number = _StartID;
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
                    produit_lot.id = number++;
                    produit_lot.reference = line.Split('\t')[0];
                    line = line.Split('\t')[1];
                    if(char.IsDigit(line[0]))
                    {
                        firstSpace = line.IndexOf(' ');
                        produit_lot.quantite = int.Parse(line.Substring(0, firstSpace));
                        produit_lot.designation = line.Substring(firstSpace + 1);
                    }
                    else
                    {
                        produit_lot.designation = line;
                        produit_lot.quantite = 1;
                    }
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
                        WriteLots(produit_lot.id, prod.id, produit_lot.quantite);
                    }

                    produits = new List<Produit>();
                }
                else
                {
                    produit = new Produit();
                    produit.id = number++;
                    firstSpace = line.IndexOf(' ');
                    produit.reference = line.Substring(0, firstSpace);
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
                             produit.prix.ToString(CultureInfo.InvariantCulture) + ", " + 
                             produit.categorie + ", " + 
                             produit.type + ");"
            );
        }

        private void WriteLots(int id_lot, int id_produit, int quantite)
        {
            writer.WriteLine("insert into lot (id_lot, id_produit, quantite) values (" +
                              id_lot + ", " +
                              id_produit + ", " +
                              quantite + ");"
            );
        }
    }
}
