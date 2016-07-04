using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Translate
{
    class Bdd
    {

        private MySqlConnection connection;

        // Constructeur
        public Bdd()
        {
            this.InitConnexion();
            connection.Open();
        }

        // Méthode pour initialiser la connexion
        private void InitConnexion()
        {
            // Création de la chaîne de connexion
            string connectionString = "SERVER=127.0.0.1; DATABASE=projet bi; UID=root; PASSWORD=";
            this.connection = new MySqlConnection(connectionString);
        }

        public void Add(Produit produit)
        {
            // Création d'une commande SQL en fonction de l'objet connection
            MySqlCommand cmd = this.connection.CreateCommand();

            // Requête SQL
            cmd.CommandText = "INSERT INTO produits (designation, reference, prix, categorie, type) VALUES (@des, @ref, @prix, @cate, @type)";

            // utilisation de l'objet contact passé en paramètre
            cmd.Parameters.AddWithValue("@id", produit.id);
            cmd.Parameters.AddWithValue("@des", produit.designation);
            cmd.Parameters.AddWithValue("@ref", produit.reference);
            cmd.Parameters.AddWithValue("@prix", produit.prix);
            cmd.Parameters.AddWithValue("@cate", produit.categorie);
            cmd.Parameters.AddWithValue("@type", produit.type);

            // Exécution de la commande SQL
            cmd.ExecuteNonQuery();
        }
    }

    class Produit
    {
        public int id;
        public string designation;
        public string reference;
        public float prix;
        public string categorie;
        public bool type;
    }
}
