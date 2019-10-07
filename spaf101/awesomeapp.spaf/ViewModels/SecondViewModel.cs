using System;
using System.Collections.Generic;
using Bridge.Navigation;
using Bridge.Spaf;
using Retyped;

namespace awesomeapp.spaf.ViewModels
{
    public class SecondViewModel : LoadableViewModel
    {
        public override string ElementId() => SpafApp.SecondId;

        public override void OnLoad(Dictionary<string, object> parameters)
        {
            var passedParam = parameters.GetParameter<string>("prova");
            Console.WriteLine($"Alla pagina è stato passato {passedParam}");
            base.OnLoad(parameters);
        }

        public override void OnLeave()
        {
            Console.WriteLine("Adios seconda pagina");
            base.OnLeave();
        }
    }
}