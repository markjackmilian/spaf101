using System.Collections.Generic;
using awesomeapp.spaf.Components;
using Bridge.Messenger;
using Bridge.Navigation;
using Bridge.Spaf;

namespace awesomeapp.spaf.ViewModels
{
    public class HomeViewModel : LoadableViewModel
    {
        private readonly INavigator _navigator;
        private readonly IMessenger _messenger;
        public override string ElementId() => SpafApp.HomeId;

        public HomeViewModel(INavigator navigator, IMessenger messenger, IncrementViewModel incrementComponent)
        {
            this._navigator = navigator;
            this._messenger = messenger;
            this.Partials.Add(incrementComponent);
        }

        public void GoToSecond()
        {
            this._navigator.Navigate(SpafApp.SecondId, new Dictionary<string, object>
            {
                {"prova", "Ciao!"}
            });
        }

        public void ShowAlertFromAnotherClass()
        {
            this._messenger.Send(this,SpafApp.Messages.Alert,"Spaf Messenger!");
        }

    }
}