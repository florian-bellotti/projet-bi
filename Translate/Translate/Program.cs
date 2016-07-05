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
            Translator trans = new Translator(1);
            trans.Translate("congelateur", 1);
            trans.Translate("refrigerateur", 2);
            trans.Translate("preparation", 3);
            trans.Translate("ustensiles", 4);
            trans.Translate("servir", 5);
            trans.Translate("rangement modulaire", 6);
            trans.Translate("rechauffer au micro-ondes", 7);
            trans.Translate("cuisiner au micro-ondes", 8);

            Console.ReadLine();
        }
    }
}
