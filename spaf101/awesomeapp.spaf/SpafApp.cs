﻿using System;
using System.Linq;
using System.Reflection;
using awesomeapp.spaf.ViewModels;
using Bridge;
using Bridge.Html5;
using Bridge.Ioc;
using Bridge.Messenger;
using Bridge.Navigation;
using Bridge.Spaf.Attributes;

namespace Bridge.Spaf
{
    public class SpafApp
    {
        public static IIoc Container;

        public static void Main()
        {
            #if Test
            return;
            #endif
            
            Container = new BridgeIoc();
            ContainerConfig(); // config container
            Container.Resolve<INavigator>().InitNavigation(); // init navigation
            
            Container.Resolve<IMessenger>().Subscribe<HomeViewModel,string>(new object(), SpafApp.Messages.Alert,
                (model, s) =>
                {
                    Global.Alert(s);
                });

        }

        private static void ContainerConfig()
        {
            // navigator
            Container.RegisterSingleInstance<INavigator, BridgeNavigatorWithRouting>();
//            Container.RegisterSingleInstance<IBrowserHistoryManager, QueryParameterNavigationHistory>();
            Container.RegisterSingleInstance<IBrowserHistoryManager, ComplexObjectNavigationHistory>(); // if you don't need query parameters
            Container.Register<INavigatorConfigurator, CustomRoutesConfig>(); 

            // messenger
            Container.RegisterSingleInstance<IMessenger, Messenger.Messenger>();

            // viewmodels
            RegisterAllViewModels();

            // register custom resource, services..

        }

        #region PAGES IDS
        // static pages id


        public static string HomeId => "home";
        public static string SecondId => "second";
       
        #endregion

        #region COMPONENTS ID

        public static string IncrementId => "increment";
        #endregion

        #region MESSAGES
        // messenger helper for global messages and messages ids

        public static class Messages
        {
            public class GlobalSender { };

            public static GlobalSender Sender = new GlobalSender();

            public static string Alert => "Alert";

        }


        #endregion

        /// <summary>
        /// Register all types that end with "viewmodel".
        /// You can register a viewmode as Singlr Instance adding "SingleInstanceAttribute" to the class
        /// </summary>
        private static void RegisterAllViewModels()
        {
            var types = AppDomain.CurrentDomain.GetAssemblies().SelectMany(s => s.GetTypes())
                .Where(w => w.Name.ToLower().EndsWith("viewmodel")).ToList();

            types.ForEach(f =>
            {
                var attributes = f.GetCustomAttributes(typeof(SingleInstanceAttribute), true);

                if (attributes.Any())
                    Container.RegisterSingleInstance(f);
                else
                    Container.Register(f);
            });

        }
    }
}
