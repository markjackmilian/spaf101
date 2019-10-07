using Bridge.Spaf;
using static Retyped.knockout;


namespace awesomeapp.spaf.Components
{
    public class IncrementViewModel : PartialModel
    {
        public override string ElementId() => SpafApp.IncrementId;
        protected override string HtmlUrl { get; } = "components/increment.html";

        public KnockoutObservable<int> Number { get; set; }
        public KnockoutObservableArray<int> ManyNumber { get; set; }

        public IncrementViewModel()
        {
            this.Number = ko.observable.Self(0);
            this.ManyNumber = ko.observableArray.Self<int>();
        }

        public void Add()
        {
            var actualNumber = this.Number.Self();
            this.Number.Self(++actualNumber);
        }
    }
}