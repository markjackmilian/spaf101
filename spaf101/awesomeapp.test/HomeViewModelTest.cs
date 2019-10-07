using System;
using System.Collections.Generic;
using awesomeapp.spaf.ViewModels;
using Bridge.EasyTests.Asserts;
using Bridge.EasyTests.Attributes;
using Bridge.Navigation;

namespace awesomeapp.test
{
    [Test("Test homeviewmodel")]
    public class HomeViewModelTest
    {
        [TestMethod("When GoToSecond fired navigator is called")]
        public void WhenGoToSecondIsFiredNavigationInCalled()
        {
            var nav = new FakeNavigator();
            var homeModel = new HomeViewModel(nav,null, null);
            homeModel.GoToSecond();
            
            nav.Called.ShouldBeEquals(1);
        }
    }

    class FakeNavigator : INavigator
    {
        public event EventHandler<IAmLoadable> OnNavigated;
        public IAmLoadable LastNavigateController { get; }
        public void InitNavigation()
        {
            throw new NotImplementedException();
        }

        public void EnableSpafAnchors()
        {
            throw new NotImplementedException();
        }

        public void Navigate(string pageId, Dictionary<string, object> parameters = null)
        {
            this.Called++;
        }

        public int Called { get; private set; }
    }
}