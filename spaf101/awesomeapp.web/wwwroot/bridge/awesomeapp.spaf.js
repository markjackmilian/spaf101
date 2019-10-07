/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.2.0
 */
Bridge.assembly("awesomeapp.spaf", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Spaf.IViewModelLifeCycle", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.IAmLoadable", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Spaf.ViewModelBase", {
        fields: {
            _pageNode: null
        },
        props: {
            PageNode: {
                get: function () {
                    return this._pageNode || ((this._pageNode = document.getElementById(this.ElementId())));
                }
            }
        },
        methods: {
            ApplyBindings: function () {
                ko.applyBindings(this, this.PageNode);
            },
            RemoveBindings: function () {
                ko.removeNode(this.PageNode);
            }
        }
    });

    Bridge.define("Bridge.Ioc.IIoc", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Ioc.IResolver", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Messenger.IMessenger", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.INavigator", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.INavigatorConfigurator", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.IBrowserHistoryManager", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.IPageDescriptor", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.Model.UrlDescriptor", {
        fields: {
            PageId: null,
            Parameters: null
        }
    });

    Bridge.define("Bridge.Navigation.NavigationUtility", {
        statics: {
            fields: {
                /**
                 * Define virtual directory for something like:
                 protocol://awesomesite.io/somedirectory
                 *
                 * @static
                 * @public
                 * @memberof Bridge.Navigation.NavigationUtility
                 * @type string
                 */
                VirtualDirectory: null
            },
            methods: {
                /**
                 * Get parameter key from parameters dictionary
                 *
                 * @static
                 * @public
                 * @this Bridge.Navigation.NavigationUtility
                 * @memberof Bridge.Navigation.NavigationUtility
                 * @param   {Function}                                   T             
                 * @param   {System.Collections.Generic.Dictionary$2}    parameters    
                 * @param   {string}                                     paramKey
                 * @return  {T}
                 */
                GetParameter: function (T, parameters, paramKey) {
                    if (parameters == null) {
                        throw new System.Exception("Parameters is null!");
                    }

                    if (!parameters.containsKey(paramKey)) {
                        throw new System.Exception(System.String.format("No parameter with key {0} found!", [paramKey]));
                    }

                    var value = parameters.get(paramKey);

                    var parseMethod = Bridge.Reflection.getMembers(T, 8, 284, "Parse", System.Array.init([System.String], Function));

                    if (parseMethod != null) {
                        return Bridge.cast(Bridge.unbox(Bridge.Reflection.midel(parseMethod, null).apply(null, Bridge.unbox(System.Array.init([value], System.Object))), T), T);
                    }

                    return Bridge.cast(Bridge.unbox(value, T), T);
                },
                /**
                 * Build base url using page id and virtual directory
                 *
                 * @static
                 * @public
                 * @this Bridge.Navigation.NavigationUtility
                 * @memberof Bridge.Navigation.NavigationUtility
                 * @param   {string}    pageId
                 * @return  {string}
                 */
                BuildBaseUrl: function (pageId) {
                    var baseUrl = System.String.format("{0}//{1}", window.location.protocol, window.location.host);
                    baseUrl = System.String.isNullOrEmpty(Bridge.Navigation.NavigationUtility.VirtualDirectory) ? System.String.format("{0}#{1}", baseUrl, pageId) : System.String.format("{0}/{1}#{2}", baseUrl, Bridge.Navigation.NavigationUtility.VirtualDirectory, pageId);
                    return baseUrl;
                }
            }
        }
    });

    Bridge.define("Bridge.Navigation.Utility", {
        statics: {
            methods: {
                /**
                 * Load script sequentially
                 *
                 * @static
                 * @public
                 * @this Bridge.Navigation.Utility
                 * @memberof Bridge.Navigation.Utility
                 * @param   {System.Collections.Generic.List$1}    scripts
                 * @return  {void}
                 */
                SequentialScriptLoad: function (scripts) {
                    if (!System.Linq.Enumerable.from(scripts).any()) {
                        return;
                    }
                    var toLoad = System.Linq.Enumerable.from(scripts).first();
                    $.getScript(toLoad, function (o, s, arg3) {
                        scripts.remove(toLoad);
                        Bridge.Navigation.Utility.SequentialScriptLoad(scripts);
                    });
                }
            }
        }
    });

    Bridge.define("Bridge.Spaf.Attributes.SingleInstanceAttribute", {
        inherits: [System.Attribute]
    });

    Bridge.define("Bridge.Spaf.SpafApp", {
        main: function Main () {

            Bridge.Spaf.SpafApp.Container = new Bridge.Ioc.BridgeIoc();
            Bridge.Spaf.SpafApp.ContainerConfig();
            Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(Bridge.Navigation.INavigator).Bridge$Navigation$INavigator$InitNavigation();

            Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(Bridge.Messenger.IMessenger).Bridge$Messenger$IMessenger$Subscribe$1(awesomeapp.spaf.ViewModels.HomeViewModel, System.String, { }, Bridge.Spaf.SpafApp.Messages.Alert, function (model, s) {
                Bridge.global.alert(s);
            }, void 0);

        },
        statics: {
            fields: {
                Container: null
            },
            props: {
                HomeId: {
                    get: function () {
                        return "home";
                    }
                },
                SecondId: {
                    get: function () {
                        return "second";
                    }
                },
                IncrementId: {
                    get: function () {
                        return "increment";
                    }
                }
            },
            methods: {
                ContainerConfig: function () {
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(Bridge.Navigation.INavigator, Bridge.Navigation.BridgeNavigatorWithRouting);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(Bridge.Navigation.IBrowserHistoryManager, Bridge.Navigation.ComplexObjectNavigationHistory);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(Bridge.Navigation.INavigatorConfigurator, Bridge.Spaf.CustomRoutesConfig);

                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(Bridge.Messenger.IMessenger, Bridge.Messenger.Messenger);

                    Bridge.Spaf.SpafApp.RegisterAllViewModels();


                },
                /**
                 * Register all types that end with "viewmodel".
                 You can register a viewmode as Singlr Instance adding "SingleInstanceAttribute" to the class
                 *
                 * @static
                 * @private
                 * @this Bridge.Spaf.SpafApp
                 * @memberof Bridge.Spaf.SpafApp
                 * @return  {void}
                 */
                RegisterAllViewModels: function () {
                    var types = System.Linq.Enumerable.from(System.AppDomain.getAssemblies()).selectMany(function (s) {
                            return Bridge.Reflection.getAssemblyTypes(s);
                        }).where(function (w) {
                        return System.String.endsWith(Bridge.Reflection.getTypeName(w).toLowerCase(), "viewmodel");
                    }).toList(Function);

                    types.ForEach(function (f) {
                        var attributes = Bridge.Reflection.getAttributes(f, Bridge.Spaf.Attributes.SingleInstanceAttribute, true);

                        if (System.Linq.Enumerable.from(attributes).any()) {
                            Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance(f);
                        } else {
                            Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register(f);
                        }
                    });

                }
            }
        }
    });

    Bridge.define("Bridge.Spaf.SpafApp.Messages", {
        $kind: "nested class",
        statics: {
            fields: {
                Sender: null
            },
            props: {
                Alert: {
                    get: function () {
                        return "Alert";
                    }
                }
            },
            ctors: {
                init: function () {
                    this.Sender = new Bridge.Spaf.SpafApp.Messages.GlobalSender();
                }
            }
        }
    });

    Bridge.define("Bridge.Spaf.SpafApp.Messages.GlobalSender", {
        $kind: "nested class"
    });

    Bridge.define("Bridge.Spaf.PartialModel", {
        inherits: [Bridge.Spaf.IViewModelLifeCycle],
        fields: {
            _partialElement: null
        },
        alias: [
            "Init", "Bridge$Spaf$IViewModelLifeCycle$Init",
            "DeInit", "Bridge$Spaf$IViewModelLifeCycle$DeInit"
        ],
        methods: {
            /**
             * Init partial
             *
             * @instance
             * @public
             * @this Bridge.Spaf.PartialModel
             * @memberof Bridge.Spaf.PartialModel
             * @param   {System.Collections.Generic.Dictionary$2}    parameters    data for init the partials
             * @return  {void}
             */
            Init: function (parameters) {

                $.get(this.HtmlUrl, null, Bridge.fn.bind(this, function (o, s, arg3) {
                    var $t;
                    this._partialElement = ($t = document.createElement("div"), $t.innerHTML = Bridge.toString(o), $t);
                    var node = document.getElementById(this.ElementId());
                    node.appendChild(this._partialElement);
                    ko.applyBindings(this, this._partialElement);
                }));
            },
            DeInit: function () {
                if (this._partialElement == null) {
                    return;
                }
                var data = ko.dataFor(this._partialElement);
                if (data == null) {
                    return;
                }

                ko.removeNode(this._partialElement);
            }
        }
    });

    Bridge.define("Bridge.Spaf.LoadableViewModel", {
        inherits: [Bridge.Spaf.ViewModelBase,Bridge.Navigation.IAmLoadable],
        fields: {
            Partials: null
        },
        alias: [
            "OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad",
            "OnLeave", "Bridge$Navigation$IAmLoadable$OnLeave"
        ],
        ctors: {
            init: function () {
                this.Partials = new (System.Collections.Generic.List$1(Bridge.Spaf.IViewModelLifeCycle)).ctor();
            }
        },
        methods: {
            OnLoad: function (parameters) {
                var $t;
                this.ApplyBindings();
                ($t = this.Partials) != null ? $t.ForEach(function (f) {
                        f.Bridge$Spaf$IViewModelLifeCycle$Init(parameters);
                    }) : null;
            },
            OnLeave: function () {
                var $t;
                ($t = this.Partials) != null ? $t.ForEach(function (f) {
                        f.Bridge$Spaf$IViewModelLifeCycle$DeInit();
                    }) : null;
                this.RemoveBindings();
            }
        }
    });

    /** @namespace Bridge.Ioc */

    /**
     * Implementation of IIoc
     *
     * @public
     * @class Bridge.Ioc.BridgeIoc
     * @implements  Bridge.Ioc.IIoc
     */
    Bridge.define("Bridge.Ioc.BridgeIoc", {
        inherits: [Bridge.Ioc.IIoc],
        fields: {
            _resolvers: null
        },
        alias: [
            "Register$1", "Bridge$Ioc$IIoc$Register$1",
            "Register$2", "Bridge$Ioc$IIoc$Register$2",
            "Register$4", "Bridge$Ioc$IIoc$Register$4",
            "Register", "Bridge$Ioc$IIoc$Register",
            "Register$3", "Bridge$Ioc$IIoc$Register$3",
            "RegisterSingleInstance$1", "Bridge$Ioc$IIoc$RegisterSingleInstance$1",
            "RegisterSingleInstance$3", "Bridge$Ioc$IIoc$RegisterSingleInstance$3",
            "RegisterSingleInstance", "Bridge$Ioc$IIoc$RegisterSingleInstance",
            "RegisterSingleInstance$2", "Bridge$Ioc$IIoc$RegisterSingleInstance$2",
            "RegisterFunc", "Bridge$Ioc$IIoc$RegisterFunc",
            "RegisterInstance$1", "Bridge$Ioc$IIoc$RegisterInstance$1",
            "RegisterInstance", "Bridge$Ioc$IIoc$RegisterInstance",
            "RegisterInstance$2", "Bridge$Ioc$IIoc$RegisterInstance$2",
            "Resolve", "Bridge$Ioc$IIoc$Resolve",
            "Resolve$1", "Bridge$Ioc$IIoc$Resolve$1"
        ],
        ctors: {
            init: function () {
                this._resolvers = new (System.Collections.Generic.Dictionary$2(Function,Bridge.Ioc.IResolver))();
            }
        },
        methods: {
            Register$1: function (type, resolver) {
                this.CheckAlreadyAdded(type);
                this._resolvers.add(type, resolver);
            },
            Register$2: function (type, impl) {
                this.CheckAlreadyAdded(type);

                var resolver = new Bridge.Ioc.TransientResolver(this, impl);
                this._resolvers.add(type, resolver);
            },
            Register$4: function (TType, TImplementation) {
                this.Register$2(TType, TImplementation);
            },
            Register: function (type) {
                this.Register$2(type, type);
            },
            Register$3: function (TType) {
                this.Register(TType);
            },
            RegisterSingleInstance$1: function (type, impl) {
                this.CheckAlreadyAdded(type);

                var resolver = new Bridge.Ioc.SingleInstanceResolver(this, impl);
                this._resolvers.add(type, resolver);
            },
            RegisterSingleInstance$3: function (TType, TImplementation) {
                this.RegisterSingleInstance$1(TType, TImplementation);
            },
            RegisterSingleInstance: function (type) {
                this.RegisterSingleInstance$1(type, type);
            },
            RegisterSingleInstance$2: function (TType) {
                this.RegisterSingleInstance(TType);
            },
            RegisterFunc: function (TType, func) {
                this.CheckAlreadyAdded$1(TType);

                var resolver = new (Bridge.Ioc.FuncResolver$1(TType))(func);
                this._resolvers.add(TType, resolver);
            },
            RegisterInstance$1: function (type, instance) {
                this.CheckAlreadyAdded(type);

                var resolver = new Bridge.Ioc.InstanceResolver(instance);
                this._resolvers.add(type, resolver);
            },
            RegisterInstance: function (instance) {
                this.RegisterInstance$1(Bridge.getType(instance), instance);
            },
            RegisterInstance$2: function (TType, instance) {
                this.RegisterInstance$1(TType, instance);
            },
            Resolve: function (TType) {
                this.CheckNotRegistered$1(TType);

                var resolver = this._resolvers.get(TType);
                return Bridge.cast(resolver.Bridge$Ioc$IResolver$Resolve(), TType);
            },
            Resolve$1: function (type) {
                this.CheckNotRegistered(type);

                var resolver = this._resolvers.get(type);
                return resolver.Bridge$Ioc$IResolver$Resolve();
            },
            CheckAlreadyAdded: function (type) {
                if (this._resolvers.containsKey(type)) {
                    throw new System.Exception(System.String.format("{0} is already registered!", [Bridge.Reflection.getTypeFullName(type)]));
                }
            },
            CheckAlreadyAdded$1: function (TType) {
                this.CheckAlreadyAdded(TType);
            },
            CheckNotRegistered: function (type) {
                if (!this._resolvers.containsKey(type)) {
                    throw new System.Exception(System.String.format("Cannot resolve {0}, it's not registered!", [Bridge.Reflection.getTypeFullName(type)]));
                }
            },
            CheckNotRegistered$1: function (TType) {
                this.CheckNotRegistered(TType);
            }
        }
    });

    Bridge.define("Bridge.Ioc.FuncResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (resolveFunc) {
                this.$initialize();
                this.Resolve = function () {
                    return resolveFunc();
                };
            }
        }
    }; });

    Bridge.define("Bridge.Ioc.InstanceResolver", {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (resolvedObj) {
                this.$initialize();
                this.Resolve = function () {
                    return resolvedObj;
                };
            }
        }
    });

    Bridge.define("Bridge.Ioc.SingleInstanceResolver", {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            _singleInstance: null,
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (ioc, type) {
                this.$initialize();
                this.Resolve = Bridge.fn.bind(this, function () {
                    if (this._singleInstance == null) {
                        var transientResolver = new Bridge.Ioc.TransientResolver(ioc, type);
                        this._singleInstance = transientResolver.Resolve();
                    }

                    return this._singleInstance;
                });
            }
        }
    });

    Bridge.define("Bridge.Ioc.TransientResolver", {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (ioc, toresolveType) {
                this.$initialize();
                this.Resolve = function () {
                    var $t;
                    var $ctor = System.Linq.Enumerable.from(Bridge.Reflection.getMembers(toresolveType, 1, 28)).firstOrDefault(null, null);
                    if ($ctor == null) {
                        throw new System.Exception(System.String.format("No ctor found for type {0}!", [Bridge.Reflection.getTypeFullName(toresolveType)]));
                    }

                    var ctorParams = ($ctor.pi || []);
                    if (!System.Linq.Enumerable.from(ctorParams).any()) {
                        return Bridge.createInstance(toresolveType);
                    } else {
                        var parameters = new (System.Collections.Generic.List$1(System.Object)).$ctor2(ctorParams.length);

                        $t = Bridge.getEnumerator(ctorParams);
                        try {
                            while ($t.moveNext()) {
                                var parameterInfo = $t.Current;
                                parameters.add(ioc.Bridge$Ioc$IIoc$Resolve$1(parameterInfo.pt));
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }
                        return Bridge.Reflection.invokeCI($ctor, Bridge.unbox(parameters.ToArray()));
                    }
                };
            }
        }
    });

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Action
     * @param   {TSender}    arg1    
     * @param   {TArgs}      arg2
     * @return  {void}
     */

    Bridge.define("Bridge.Messenger.Messenger", {
        inherits: [Bridge.Messenger.IMessenger],
        fields: {
            _calls: null
        },
        alias: [
            "Send$1", "Bridge$Messenger$IMessenger$Send$1",
            "Send", "Bridge$Messenger$IMessenger$Send",
            "Subscribe$1", "Bridge$Messenger$IMessenger$Subscribe$1",
            "Subscribe", "Bridge$Messenger$IMessenger$Subscribe",
            "Unsubscribe$1", "Bridge$Messenger$IMessenger$Unsubscribe$1",
            "Unsubscribe", "Bridge$Messenger$IMessenger$Unsubscribe",
            "ResetMessenger", "Bridge$Messenger$IMessenger$ResetMessenger"
        ],
        ctors: {
            init: function () {
                this._calls = new (System.Collections.Generic.Dictionary$2(System.Tuple$3(System.String,Function,Function),System.Collections.Generic.List$1(System.Tuple$2(System.Object,Function))))();
            }
        },
        methods: {
            /**
             * Send Message with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}    TSender    TSender
             * @param   {Function}    TArgs      TMessageArgs
             * @param   {TSender}     sender     Sender
             * @param   {string}      message    Message
             * @param   {TArgs}       args       Args
             * @return  {void}
             */
            Send$1: function (TSender, TArgs, sender, message, args) {
                if (sender == null) {
                    throw new System.ArgumentNullException.$ctor1("sender");
                }
                this.InnerSend(message, TSender, TArgs, sender, args);
            },
            /**
             * Send Message without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}    TSender    TSender
             * @param   {TSender}     sender     Sender
             * @param   {string}      message    Message
             * @return  {void}
             */
            Send: function (TSender, sender, message) {
                if (sender == null) {
                    throw new System.ArgumentNullException.$ctor1("sender");
                }
                this.InnerSend(message, TSender, null, sender, null);
            },
            /**
             * Subscribe Message with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {Function}         TArgs         TArgs
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @param   {System.Action}    callback      Action
             * @param   {TSender}          source        source
             * @return  {void}
             */
            Subscribe$1: function (TSender, TArgs, subscriber, message, callback, source) {
                if (source === void 0) { source = Bridge.getDefaultValue(TSender); }
                if (subscriber == null) {
                    throw new System.ArgumentNullException.$ctor1("subscriber");
                }
                if (Bridge.staticEquals(callback, null)) {
                    throw new System.ArgumentNullException.$ctor1("callback");
                }

                var wrap = function (sender, args) {
                    var send = Bridge.cast(sender, TSender);
                    if (source == null || Bridge.referenceEquals(send, source)) {
                        callback(Bridge.cast(sender, TSender), Bridge.cast(Bridge.unbox(args, TArgs), TArgs));
                    }
                };

                this.InnerSubscribe(subscriber, message, TSender, TArgs, wrap);
            },
            /**
             * Subscribe Message without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @param   {System.Action}    callback      Action
             * @param   {TSender}          source        source
             * @return  {void}
             */
            Subscribe: function (TSender, subscriber, message, callback, source) {
                if (source === void 0) { source = Bridge.getDefaultValue(TSender); }
                if (subscriber == null) {
                    throw new System.ArgumentNullException.$ctor1("subscriber");
                }
                if (Bridge.staticEquals(callback, null)) {
                    throw new System.ArgumentNullException.$ctor1("callback");
                }

                var wrap = function (sender, args) {
                    var send = Bridge.cast(sender, TSender);
                    if (source == null || Bridge.referenceEquals(send, source)) {
                        callback(Bridge.cast(sender, TSender));
                    }
                };

                this.InnerSubscribe(subscriber, message, TSender, null, wrap);
            },
            /**
             * Unsubscribe action with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {Function}         TArgs         TArgs
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @return  {void}
             */
            Unsubscribe$1: function (TSender, TArgs, subscriber, message) {
                this.InnerUnsubscribe(message, TSender, TArgs, subscriber);
            },
            /**
             * Unsubscribe action without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @return  {void}
             */
            Unsubscribe: function (TSender, subscriber, message) {
                this.InnerUnsubscribe(message, TSender, null, subscriber);
            },
            /**
             * Remove all callbacks
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @return  {void}
             */
            ResetMessenger: function () {
                this._calls.clear();
            },
            InnerSend: function (message, senderType, argType, sender, args) {
                var $t;
                if (message == null) {
                    throw new System.ArgumentNullException.$ctor1("message");
                }
                var key = { Item1: message, Item2: senderType, Item3: argType };
                if (!this._calls.containsKey(key)) {
                    return;
                }
                var actions = this._calls.get(key);
                if (actions == null || !System.Linq.Enumerable.from(actions).any()) {
                    return;
                }

                var actionsCopy = System.Linq.Enumerable.from(actions).toList(Bridge.global.System.Tuple$2(System.Object,Function));
                $t = Bridge.getEnumerator(actionsCopy);
                try {
                    while ($t.moveNext()) {
                        var action = $t.Current;
                        if (actions.contains(action)) {
                            action.Item2(sender, args);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            InnerSubscribe: function (subscriber, message, senderType, argType, callback) {
                if (message == null) {
                    throw new System.ArgumentNullException.$ctor1("message");
                }
                var key = { Item1: message, Item2: senderType, Item3: argType };
                var value = { Item1: subscriber, Item2: callback };
                if (this._calls.containsKey(key)) {
                    this._calls.get(key).add(value);
                } else {
                    var list = function (_o1) {
                            _o1.add(value);
                            return _o1;
                        }(new (System.Collections.Generic.List$1(System.Tuple$2(System.Object,Function))).ctor());
                    this._calls.set(key, list);
                }
            },
            InnerUnsubscribe: function (message, senderType, argType, subscriber) {
                var $t;
                if (subscriber == null) {
                    throw new System.ArgumentNullException.$ctor1("subscriber");
                }
                if (message == null) {
                    throw new System.ArgumentNullException.$ctor1("message");
                }

                var key = { Item1: message, Item2: senderType, Item3: argType };
                if (!this._calls.containsKey(key)) {
                    return;
                }

                var toremove = System.Linq.Enumerable.from(this._calls.get(key)).where(function (tuple) {
                        return Bridge.referenceEquals(tuple.Item1, subscriber);
                    }).toList(System.Tuple$2(System.Object,Function));

                $t = Bridge.getEnumerator(toremove);
                try {
                    while ($t.moveNext()) {
                        var tuple = $t.Current;
                        this._calls.get(key).remove(tuple);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                if (!System.Linq.Enumerable.from(this._calls.get(key)).any()) {
                    this._calls.remove(key);
                }
            }
        }
    });

    /** @namespace Bridge.Navigation */

    /**
     * INavigator implementation
     *
     * @public
     * @class Bridge.Navigation.BridgeNavigator
     * @implements  Bridge.Navigation.INavigator
     */
    Bridge.define("Bridge.Navigation.BridgeNavigator", {
        inherits: [Bridge.Navigation.INavigator],
        statics: {
            fields: {
                _actualController: null
            }
        },
        fields: {
            Configuration: null
        },
        events: {
            OnNavigated: null
        },
        props: {
            LastNavigateController: {
                get: function () {
                    return Bridge.Navigation.BridgeNavigator._actualController;
                }
            }
        },
        alias: [
            "EnableSpafAnchors", "Bridge$Navigation$INavigator$EnableSpafAnchors",
            "Navigate", "Bridge$Navigation$INavigator$Navigate",
            "addOnNavigated", "Bridge$Navigation$INavigator$addOnNavigated",
            "removeOnNavigated", "Bridge$Navigation$INavigator$removeOnNavigated",
            "LastNavigateController", "Bridge$Navigation$INavigator$LastNavigateController",
            "InitNavigation", "Bridge$Navigation$INavigator$InitNavigation"
        ],
        ctors: {
            ctor: function (configuration) {
                this.$initialize();
                this.Configuration = configuration;
            }
        },
        methods: {
            EnableSpafAnchors: function () {
                var allAnchors = $("a");
                allAnchors.off(System.Enum.toString(System.String, "click"));
                allAnchors.click(Bridge.fn.bind(this, function (ev) {
                    var clickedElement = ev.target;

                    if (!Bridge.referenceEquals(Bridge.getType(clickedElement), HTMLAnchorElement)) {
                        clickedElement = $(ev.target).parents("a").get(0);
                    }

                    var href = clickedElement.getAttribute("href");

                    if (System.String.isNullOrEmpty(href)) {
                        return;
                    }

                    var isMyHref = System.String.startsWith(href, "spaf:");

                    if (isMyHref) {
                        ev.preventDefault();
                        var pageId = System.String.replaceAll(href, "spaf:", "");
                        this.Navigate(pageId);
                    }

                }));
            },
            /**
             * Navigate to a page ID.
             The ID must be registered.
             *
             * @instance
             * @public
             * @this Bridge.Navigation.BridgeNavigator
             * @memberof Bridge.Navigation.BridgeNavigator
             * @param   {string}                                     pageId        
             * @param   {System.Collections.Generic.Dictionary$2}    parameters
             * @return  {void}
             */
            Navigate: function (pageId, parameters) {
                var $t;
                if (parameters === void 0) { parameters = null; }
                var page = this.Configuration.Bridge$Navigation$INavigatorConfigurator$GetPageDescriptorByKey(pageId);
                if (page == null) {
                    throw new System.Exception(System.String.format("Page not found with ID {0}", [pageId]));
                }

                var redirectKey = !Bridge.staticEquals(($t = page.Bridge$Navigation$IPageDescriptor$RedirectRules), null) ? $t() : null;
                if (!System.String.isNullOrEmpty(redirectKey)) {
                    this.Navigate(redirectKey, parameters);
                    return;
                }

                var body = this.Configuration.Bridge$Navigation$INavigatorConfigurator$Body;
                if (body == null) {
                    throw new System.Exception("Cannot find navigation body element.");
                }

                if (this.LastNavigateController != null) {
                    this.LastNavigateController.Bridge$Navigation$IAmLoadable$OnLeave();
                }

                this.Configuration.Bridge$Navigation$INavigatorConfigurator$Body.load(page.Bridge$Navigation$IPageDescriptor$HtmlLocation(), null, Bridge.fn.bind(this, function (o, s, a) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        o, 
                        s, 
                        a, 
                        $jumpFromFinally, 
                        scripts, 
                        scriptsTask, 
                        $t1, 
                        enableAnchors, 
                        $t2, 
                        controller, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3], $step);
                                switch ($step) {
                                    case 0: {
                                        if (!Bridge.staticEquals(page.Bridge$Navigation$IPageDescriptor$DependenciesScripts, null)) {
                                            $step = 1;
                                            continue;
                                        } 
                                        $step = 3;
                                        continue;
                                    }
                                    case 1: {
                                        scripts = System.Linq.Enumerable.from((page.Bridge$Navigation$IPageDescriptor$DependenciesScripts())).toList(System.String);
                                        if (page.Bridge$Navigation$IPageDescriptor$SequentialDependenciesScriptLoad) {
                                            Bridge.Navigation.Utility.SequentialScriptLoad(scripts);
                                        }
                                        scriptsTask = System.Linq.Enumerable.from(scripts).select(function (url) {
                                            return System.Threading.Tasks.Task.fromPromise($.getScript(url));
                                        });
                                        $task1 = System.Threading.Tasks.Task.whenAll(scriptsTask);
                                        $step = 2;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        $step = 3;
                                        continue;
                                    }
                                    case 3: {
                                        !Bridge.staticEquals(($t1 = page.Bridge$Navigation$IPageDescriptor$PreparePage), null) ? $t1() : null;

                                        if (!this.Configuration.Bridge$Navigation$INavigatorConfigurator$DisableAutoSpafAnchorsOnNavigate) {
                                            enableAnchors = !Bridge.staticEquals(($t2 = page.Bridge$Navigation$IPageDescriptor$AutoEnableSpafAnchors), null) ? $t2() : null;
                                            if (System.Nullable.hasValue(enableAnchors) && System.Nullable.getValue(enableAnchors)) {
                                                this.EnableSpafAnchors();
                                            }
                                        }

                                        if (!Bridge.staticEquals(page.Bridge$Navigation$IPageDescriptor$PageController, null)) {
                                            controller = page.Bridge$Navigation$IPageDescriptor$PageController();
                                            controller.Bridge$Navigation$IAmLoadable$OnLoad(parameters);

                                            Bridge.Navigation.BridgeNavigator._actualController = controller;

                                            !Bridge.staticEquals(this.OnNavigated, null) ? this.OnNavigated(this, controller) : null;
                                        }
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                }));
            },
            /**
             * Subscribe to anchors click
             *
             * @instance
             * @public
             * @this Bridge.Navigation.BridgeNavigator
             * @memberof Bridge.Navigation.BridgeNavigator
             * @return  {void}
             */
            InitNavigation: function () {
                this.EnableSpafAnchors();

                this.Navigate(this.Configuration.Bridge$Navigation$INavigatorConfigurator$HomeId);
            }
        }
    });

    /**
     * INavigatorConfigurator Implementation. Must be extended.
     *
     * @abstract
     * @public
     * @class Bridge.Navigation.BridgeNavigatorConfigBase
     * @implements  Bridge.Navigation.INavigatorConfigurator
     */
    Bridge.define("Bridge.Navigation.BridgeNavigatorConfigBase", {
        inherits: [Bridge.Navigation.INavigatorConfigurator],
        fields: {
            _routes: null
        },
        alias: ["GetPageDescriptorByKey", "Bridge$Navigation$INavigatorConfigurator$GetPageDescriptorByKey"],
        ctors: {
            ctor: function () {
                this.$initialize();
                this._routes = this.CreateRoutes();
            }
        },
        methods: {
            GetPageDescriptorByKey: function (key) {
                return System.Linq.Enumerable.from(this._routes).singleOrDefault(function (s) {
                        return System.String.equals(s.Bridge$Navigation$IPageDescriptor$Key, key, 1);
                    }, null);
            }
        }
    });

    Bridge.define("Bridge.Navigation.ComplexObjectNavigationHistory", {
        inherits: [Bridge.Navigation.IBrowserHistoryManager],
        alias: [
            "PushState", "Bridge$Navigation$IBrowserHistoryManager$PushState",
            "ParseUrl", "Bridge$Navigation$IBrowserHistoryManager$ParseUrl"
        ],
        methods: {
            PushState: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                var baseUrl = Bridge.Navigation.NavigationUtility.BuildBaseUrl(pageId);

                window.history.pushState(null, "", parameters != null ? System.String.format("{0}={1}", baseUrl, Bridge.global.btoa(JSON.stringify(parameters))) : baseUrl);
            },
            ParseUrl: function () {
                var res = new Bridge.Navigation.Model.UrlDescriptor();

                var hash = window.location.hash;
                hash = System.String.replaceAll(hash, "#", "");

                if (System.String.isNullOrEmpty(hash)) {
                    return res;
                }

                var equalIndex = System.String.indexOf(hash, String.fromCharCode(61));
                if (equalIndex === -1) {
                    res.PageId = hash;
                    return res;
                }

                res.PageId = hash.substr(0, equalIndex);

                var doublePointsIndx = (equalIndex + 1) | 0;
                var parameters = hash.substr(doublePointsIndx, ((hash.length - doublePointsIndx) | 0));

                if (System.String.isNullOrEmpty(parameters)) {
                    return res;
                }

                var decoded = Bridge.global.atob(parameters);
                var deserialized = Bridge.merge(Bridge.createInstance(System.Collections.Generic.Dictionary$2(System.String,System.Object)), JSON.parse(decoded));

                res.Parameters = deserialized;

                return res;
            }
        }
    });

    Bridge.define("Bridge.Navigation.PageDescriptor", {
        inherits: [Bridge.Navigation.IPageDescriptor],
        fields: {
            Key: null,
            HtmlLocation: null,
            PageController: null,
            CanBeDirectLoad: null,
            PreparePage: null,
            SequentialDependenciesScriptLoad: false,
            RedirectRules: null,
            AutoEnableSpafAnchors: null,
            DependenciesScripts: null
        },
        alias: [
            "Key", "Bridge$Navigation$IPageDescriptor$Key",
            "HtmlLocation", "Bridge$Navigation$IPageDescriptor$HtmlLocation",
            "PageController", "Bridge$Navigation$IPageDescriptor$PageController",
            "CanBeDirectLoad", "Bridge$Navigation$IPageDescriptor$CanBeDirectLoad",
            "PreparePage", "Bridge$Navigation$IPageDescriptor$PreparePage",
            "SequentialDependenciesScriptLoad", "Bridge$Navigation$IPageDescriptor$SequentialDependenciesScriptLoad",
            "RedirectRules", "Bridge$Navigation$IPageDescriptor$RedirectRules",
            "AutoEnableSpafAnchors", "Bridge$Navigation$IPageDescriptor$AutoEnableSpafAnchors",
            "DependenciesScripts", "Bridge$Navigation$IPageDescriptor$DependenciesScripts"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();
                this.AutoEnableSpafAnchors = function () {
                    return true;
                };
            }
        }
    });

    Bridge.define("Bridge.Navigation.QueryParameterNavigationHistory", {
        inherits: [Bridge.Navigation.IBrowserHistoryManager],
        alias: [
            "PushState", "Bridge$Navigation$IBrowserHistoryManager$PushState",
            "ParseUrl", "Bridge$Navigation$IBrowserHistoryManager$ParseUrl"
        ],
        methods: {
            PushState: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                var baseUrl = Bridge.Navigation.NavigationUtility.BuildBaseUrl(pageId);

                window.history.pushState(null, "", parameters != null ? System.String.format("{0}{1}", baseUrl, this.BuildQueryParameter(parameters)) : baseUrl);
            },
            ParseUrl: function () {
                var res = new Bridge.Navigation.Model.UrlDescriptor();
                res.Parameters = new (System.Collections.Generic.Dictionary$2(System.String,System.Object))();

                var hash = window.location.hash;
                hash = System.String.replaceAll(hash, "#", "");

                if (System.String.isNullOrEmpty(hash)) {
                    return res;
                }

                var equalIndex = System.String.indexOf(hash, String.fromCharCode(63));
                if (equalIndex === -1) {
                    res.PageId = hash;
                    return res;
                }

                res.PageId = hash.substr(0, equalIndex);

                var doublePointsIndx = (equalIndex + 1) | 0;
                var parameters = hash.substr(doublePointsIndx, ((hash.length - doublePointsIndx) | 0));

                if (System.String.isNullOrEmpty(parameters)) {
                    return res;
                }


                var splittedByDoubleAnd = System.Linq.Enumerable.from(parameters.split("&")).toList(System.String);
                splittedByDoubleAnd.ForEach(function (f) {
                    var splitted = f.split("=");
                    res.Parameters.add(splitted[System.Array.index(0, splitted)], decodeURIComponent(splitted[System.Array.index(1, splitted)]));
                });

                return res;
            },
            BuildQueryParameter: function (parameters) {
                var $t;
                if (parameters == null || !System.Linq.Enumerable.from(parameters).any()) {
                    return "";
                }

                var strBuilder = new System.Text.StringBuilder("?");
                $t = Bridge.getEnumerator(parameters);
                try {
                    while ($t.moveNext()) {
                        var keyValuePair = $t.Current;
                        strBuilder.append(encodeURIComponent(keyValuePair.key));
                        strBuilder.append("=");
                        strBuilder.append(encodeURIComponent(Bridge.toString(keyValuePair.value)));
                        strBuilder.append("&");
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                var res = System.String.trimEnd(strBuilder.toString(), [38]);

                return res;

            }
        }
    });

    Bridge.define("awesomeapp.spaf.Components.IncrementViewModel", {
        inherits: [Bridge.Spaf.PartialModel],
        fields: {
            HtmlUrl: null,
            Number: null,
            ManyNumber: null
        },
        ctors: {
            init: function () {
                this.HtmlUrl = "components/increment.html";
            },
            ctor: function () {
                this.$initialize();
                Bridge.Spaf.PartialModel.ctor.call(this);
                this.Number = ko.observable(0);
                this.ManyNumber = ko.observableArray();
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.IncrementId;
            },
            Add: function () {
                var actualNumber = this.Number();
                this.Number(((actualNumber = (actualNumber + 1) | 0)));
            }
        }
    });

    Bridge.define("awesomeapp.spaf.ViewModels.HomeViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _navigator: null,
            _messenger: null
        },
        ctors: {
            ctor: function (navigator, messenger, incrementComponent) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._navigator = navigator;
                this._messenger = messenger;
                this.Partials.add(incrementComponent);
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.HomeId;
            },
            GoToSecond: function () {
                this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.SecondId, function (_o1) {
                        _o1.add("prova", "Ciao!");
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object))()));
            },
            ShowAlertFromAnotherClass: function () {
                this._messenger.Bridge$Messenger$IMessenger$Send$1(Bridge.global.awesomeapp.spaf.ViewModels.HomeViewModel, System.String, this, Bridge.Spaf.SpafApp.Messages.Alert, "Spaf Messenger!");
            }
        }
    });

    Bridge.define("awesomeapp.spaf.ViewModels.SecondViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        alias: [
            "OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad",
            "OnLeave", "Bridge$Navigation$IAmLoadable$OnLeave"
        ],
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.SecondId;
            },
            OnLoad: function (parameters) {
                var passedParam = Bridge.Navigation.NavigationUtility.GetParameter(System.String, parameters, "prova");
                System.Console.WriteLine(System.String.format("Alla pagina è stato passato {0}", [passedParam]));
                Bridge.Spaf.LoadableViewModel.prototype.OnLoad.call(this, parameters);
            },
            OnLeave: function () {
                System.Console.WriteLine("Adios seconda pagina");
                Bridge.Spaf.LoadableViewModel.prototype.OnLeave.call(this);
            }
        }
    });

    Bridge.define("Bridge.Ioc.InstanceResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.InstanceResolver],
        ctors: {
            ctor: function (resolvedObj) {
                this.$initialize();
                Bridge.Ioc.InstanceResolver.ctor.call(this, resolvedObj);

            }
        }
    }; });

    Bridge.define("Bridge.Ioc.SingleInstanceResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.SingleInstanceResolver],
        ctors: {
            ctor: function (ioc) {
                this.$initialize();
                Bridge.Ioc.SingleInstanceResolver.ctor.call(this, ioc, T);
            }
        }
    }; });

    Bridge.define("Bridge.Ioc.TransientResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.TransientResolver],
        ctors: {
            ctor: function (ioc) {
                this.$initialize();
                Bridge.Ioc.TransientResolver.ctor.call(this, ioc, T);

            }
        }
    }; });

    Bridge.define("Bridge.Navigation.BridgeNavigatorWithRouting", {
        inherits: [Bridge.Navigation.BridgeNavigator],
        fields: {
            _browserHistoryManager: null
        },
        alias: [
            "Navigate", "Bridge$Navigation$INavigator$Navigate",
            "InitNavigation", "Bridge$Navigation$INavigator$InitNavigation"
        ],
        ctors: {
            ctor: function (configuration, browserHistoryManager) {
                this.$initialize();
                Bridge.Navigation.BridgeNavigator.ctor.call(this, configuration);
                this._browserHistoryManager = browserHistoryManager;
                window.onpopstate = Bridge.fn.combine(window.onpopstate, Bridge.fn.bind(this, function (e) {
                    var urlInfo = this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$ParseUrl();
                    this.NavigateWithoutPushState(System.String.isNullOrEmpty(urlInfo.PageId) ? configuration.Bridge$Navigation$INavigatorConfigurator$HomeId : urlInfo.PageId, urlInfo.Parameters);
                }));
            }
        },
        methods: {
            NavigateWithoutPushState: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                Bridge.Navigation.BridgeNavigator.prototype.Navigate.call(this, pageId, parameters);
            },
            Navigate: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$PushState(pageId, parameters);
                Bridge.Navigation.BridgeNavigator.prototype.Navigate.call(this, pageId, parameters);
            },
            InitNavigation: function () {
                var parsed = this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$ParseUrl();

                if (System.String.isNullOrEmpty(parsed.PageId)) {
                    Bridge.Navigation.BridgeNavigator.prototype.InitNavigation.call(this);
                } else {
                    this.EnableSpafAnchors();

                    var page = this.Configuration.Bridge$Navigation$INavigatorConfigurator$GetPageDescriptorByKey(parsed.PageId);
                    if (page == null) {
                        throw new System.Exception(System.String.format("Page not found with ID {0}", [parsed.PageId]));
                    }

                    if (!Bridge.staticEquals(page.Bridge$Navigation$IPageDescriptor$CanBeDirectLoad, null) && !page.Bridge$Navigation$IPageDescriptor$CanBeDirectLoad()) {
                        this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$PushState(this.Configuration.Bridge$Navigation$INavigatorConfigurator$HomeId, void 0);
                        this.NavigateWithoutPushState(this.Configuration.Bridge$Navigation$INavigatorConfigurator$HomeId);
                    } else {
                        this.Navigate(parsed.PageId, parsed.Parameters);
                    }
                }
            }
        }
    });

    Bridge.define("Bridge.Spaf.CustomRoutesConfig", {
        inherits: [Bridge.Navigation.BridgeNavigatorConfigBase],
        fields: {
            Body: null,
            HomeId: null,
            DisableAutoSpafAnchorsOnNavigate: false
        },
        alias: [
            "CreateRoutes", "Bridge$Navigation$INavigatorConfigurator$CreateRoutes",
            "Body", "Bridge$Navigation$INavigatorConfigurator$Body",
            "HomeId", "Bridge$Navigation$INavigatorConfigurator$HomeId",
            "DisableAutoSpafAnchorsOnNavigate", "Bridge$Navigation$INavigatorConfigurator$DisableAutoSpafAnchorsOnNavigate"
        ],
        ctors: {
            init: function () {
                this.Body = $("#pageBody");
                this.HomeId = Bridge.Spaf.SpafApp.HomeId;
                this.DisableAutoSpafAnchorsOnNavigate = false;
            }
        },
        methods: {
            CreateRoutes: function () {
                return function (_o1) {
                        var $t;
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = function () {
                            return "pages/home.html";
                        }, $t.Key = Bridge.Spaf.SpafApp.HomeId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(awesomeapp.spaf.ViewModels.HomeViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = function () {
                            return "pages/second.html";
                        }, $t.Key = Bridge.Spaf.SpafApp.SecondId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(awesomeapp.spaf.ViewModels.SecondViewModel);
                        }, $t));
                        return _o1;
                    }(new (System.Collections.Generic.List$1(Bridge.Navigation.IPageDescriptor)).ctor());
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJhd2Vzb21lYXBwLnNwYWYuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIlNwYWYvVmlld01vZGVsQmFzZS5jcyIsIlNwYWYvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uVXRpbGl0eS5jcyIsIlNwYWYvTmF2aWdhdGlvbi9VdGlsaXR5LmNzIiwiU3BhZkFwcC5jcyIsIlNwYWYvUGFydGlhbE1vZGVsLmNzIiwiU3BhZi9Mb2FkYWJsZVZpZXdNb2RlbC5jcyIsIlNwYWYvSW9jL0JyaWRnZUlvYy5jcyIsIlNwYWYvSW9jL1Jlc29sdmVycy9GdW5jUmVzb2x2ZXIuY3MiLCJTcGFmL0lvYy9SZXNvbHZlcnMvSW5zdGFuY2VSZXNvbHZlci5jcyIsIlNwYWYvSW9jL1Jlc29sdmVycy9TaW5nbGVJbnN0YW5jZVJlc29sdmVyLmNzIiwiU3BhZi9Jb2MvUmVzb2x2ZXJzL1RyYW5zaWVudFJlc29sdmVyLmNzIiwiU3BhZi9NZXNzZW5nZXIvTWVzc2VuZ2VyLmNzIiwiU3BhZi9OYXZpZ2F0aW9uL0ltcGwvQnJpZGdlTmF2aWdhdG9yLmNzIiwiU3BhZi9OYXZpZ2F0aW9uL0ltcGwvQnJpZGdlTmF2aWdhdG9yQ29uZmlnQmFzZS5jcyIsIlNwYWYvTmF2aWdhdGlvbi9JbXBsL0NvbXBsZXhPYmplY3ROYXZpZ2F0aW9uSGlzdG9yeS5jcyIsIlNwYWYvTmF2aWdhdGlvbi9JbXBsL1BhZ2VEZXNjcmlwdG9yLmNzIiwiU3BhZi9OYXZpZ2F0aW9uL0ltcGwvUXVlcnlQYXJhbWV0ZXJOYXZpZ2F0aW9uSGlzdG9yeS5jcyIsIkNvbXBvbmVudHMvSW5jcmVtZW50Vmlld01vZGVsLmNzIiwiVmlld01vZGVscy9Ib21lVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9TZWNvbmRWaWV3TW9kZWwuY3MiLCJTcGFmL05hdmlnYXRpb24vSW1wbC9CcmlkZ2VOYXZpZ2F0b3JXaXRoUm91dGluZy5jcyIsIkN1c3RvbVJvdXRlc0NvbmZpZy5jcyJdLAogICJuYW1lcyI6IFsi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a0JBLHlEQUFnREE7Z0JBQ2xFQSwwREFBWUE7OztnQkFLWkE7Z0JBQ0FBOzs7Ozs7Ozs0QlhQb0JBOzs0REFBc0JBOzs7Ozs7Ozs7NEJDWWhCQTs7a0VBQWlCQSxLQUFLQSxBQUFPQTs7Ozs7Ozs7NEJDV2xDQTs7NkRBQWlCQSxLQUFLQSxBQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs0QlU3QnBCQSxlQUFzQ0E7O2tFQUFxREE7Z0JBRXpIQSw4QkFBeUJBO2dCQUN6QkEseURBQXFCQTtvQkFFakJBLGNBQWNBO29CQUNkQSw4QkFBOEJBLDRCQUFxQkEsa0JBQWtCQSxnRUFBdUJBLGdCQUFnQkE7Ozs7O2dEQUk5RUEsUUFBZUE7O2dCQUVqREEsZ0VBQWNBLFFBQVFBOztnQ0FFSUEsUUFBZUE7O2dCQUV6Q0EsK0VBQWlDQSxRQUFPQTtnQkFDeENBLGdFQUFjQSxRQUFRQTs7O2dCQUt0QkEsYUFBYUE7O2dCQUViQSxJQUFJQSw0QkFBcUJBO29CQUNyQkE7O29CQUdBQTs7b0JBRUFBLFdBQVdBLG1GQUEwQ0E7b0JBQ3JEQSxJQUFJQSxRQUFRQTt3QkFBTUEsTUFBTUEsSUFBSUEsaUJBQVVBLG9EQUEyQ0E7OztvQkFHakZBLElBQUlBLDZFQUF3QkEsU0FBUUEsQ0FBQ0E7d0JBRWpDQSwrRUFBaUNBO3dCQUNqQ0EsOEJBQThCQTs7d0JBRzlCQSxjQUFjQSxlQUFjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNwQkhBOzhCQUEwRUE7Ozs7OztnQkFwQjNHQSxPQUFPQSxBQUEwREEsVUFBQ0E7O3dCQUFPQSxRQUFRQSxVQUFJQSx5REFFM0RBOzs2Q0FDSEE7O29DQUNUQSxnREFDV0E7bUNBQU1BOzt3QkFDeEJBLFFBQVFBLFVBQUlBLHlEQUVPQTs7NkNBQ0hBOztvQ0FDVEEsa0RBQ1dBO21DQUFNQTs7d0JBQ3hCQSxPQUFPQTtzQkFadUJBLEtBQUlBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLlNwYWZcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFZpZXdNb2RlbEJhc2VcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGRvbS5IVE1MRWxlbWVudCBfcGFnZU5vZGU7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRWxlbWVudCBpZCBvZiB0aGUgcGFnZSBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IHN0cmluZyBFbGVtZW50SWQoKTtcclxucHVibGljIGRvbS5IVE1MRWxlbWVudCBQYWdlTm9kZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3BhZ2VOb2RlID8/ICh0aGlzLl9wYWdlTm9kZSA9IGRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChFbGVtZW50SWQoKSkpO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgcHVibGljIHZvaWQgQXBwbHlCaW5kaW5ncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrbm9ja291dC5rby5hcHBseUJpbmRpbmdzKHRoaXMsIHRoaXMuUGFnZU5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlQmluZGluZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga25vY2tvdXQua28ucmVtb3ZlTm9kZSh0aGlzLlBhZ2VOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgTmF2aWdhdGlvblV0aWxpdHlcclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIERlZmluZSB2aXJ0dWFsIGRpcmVjdG9yeSBmb3Igc29tZXRoaW5nIGxpa2U6XHJcbiAgICAgICAgLy8vIHByb3RvY29sOi8vYXdlc29tZXNpdGUuaW8vc29tZWRpcmVjdG9yeVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgVmlydHVhbERpcmVjdG9yeSA9IG51bGw7XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHZXQgcGFyYW1ldGVyIGtleSBmcm9tIHBhcmFtZXRlcnMgZGljdGlvbmFyeVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYXJhbWV0ZXJzXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYXJhbUtleVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgR2V0UGFyYW1ldGVyPFQ+KHRoaXMgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycywgc3RyaW5nIHBhcmFtS2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJQYXJhbWV0ZXJzIGlzIG51bGwhXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFwYXJhbWV0ZXJzLkNvbnRhaW5zS2V5KHBhcmFtS2V5KSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIk5vIHBhcmFtZXRlciB3aXRoIGtleSB7MH0gZm91bmQhXCIscGFyYW1LZXkpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcmFtZXRlcnNbcGFyYW1LZXldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHBhcnNlTWV0aG9kID0gdHlwZW9mKFQpLkdldE1ldGhvZChcIlBhcnNlXCIsIG5ldyBUeXBlW10geyB0eXBlb2Yoc3RyaW5nKSB9ICk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGFyc2VNZXRob2QgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChUKXBhcnNlTWV0aG9kLkludm9rZShudWxsLCBuZXcgb2JqZWN0W10geyB2YWx1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChUKSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBCdWlsZCBiYXNlIHVybCB1c2luZyBwYWdlIGlkIGFuZCB2aXJ0dWFsIGRpcmVjdG9yeVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFnZUlkXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEJ1aWxkQmFzZVVybChzdHJpbmcgcGFnZUlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJhc2VVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9Ly97MX1cIixXaW5kb3cuTG9jYXRpb24uUHJvdG9jb2wsV2luZG93LkxvY2F0aW9uLkhvc3QpO1xyXG4gICAgICAgICAgICBiYXNlVXJsID0gc3RyaW5nLklzTnVsbE9yRW1wdHkoVmlydHVhbERpcmVjdG9yeSlcclxuICAgICAgICAgICAgICAgID8gc3RyaW5nLkZvcm1hdChcInswfSN7MX1cIixiYXNlVXJsLHBhZ2VJZCkgICAgICAgICAgICAgICAgOiBzdHJpbmcuRm9ybWF0KFwiezB9L3sxfSN7Mn1cIixiYXNlVXJsLFZpcnR1YWxEaXJlY3RvcnkscGFnZUlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2VVcmw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBVdGlsaXR5XHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkIHNjcmlwdCBzZXF1ZW50aWFsbHlcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNjcmlwdHNcIj48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTZXF1ZW50aWFsU2NyaXB0TG9hZChMaXN0PHN0cmluZz4gc2NyaXB0cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8c3RyaW5nPihzY3JpcHRzKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgdG9Mb2FkID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxzdHJpbmc+KHNjcmlwdHMpO1xyXG4gICAgICAgICAgICBqUXVlcnkuR2V0U2NyaXB0KHRvTG9hZCwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIHN0cmluZywgZ2xvYmFsOjpCcmlkZ2UualF1ZXJ5Mi5qcVhIUj4pKChvLCBzLCBhcmczKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHRzLlJlbW92ZSh0b0xvYWQpO1xyXG4gICAgICAgICAgICAgICAgU2VxdWVudGlhbFNjcmlwdExvYWQoc2NyaXB0cyk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxudXNpbmcgYXdlc29tZWFwcC5zcGFmLlZpZXdNb2RlbHM7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UuSW9jO1xyXG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxudXNpbmcgQnJpZGdlLlNwYWYuQXR0cmlidXRlcztcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuU3BhZlxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU3BhZkFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSUlvYyBDb250YWluZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICNpZiBUZXN0XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgI2VuZGlmXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBDb250YWluZXIgPSBuZXcgQnJpZGdlSW9jKCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lckNvbmZpZygpOyAvLyBjb25maWcgY29udGFpbmVyXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZXNvbHZlPElOYXZpZ2F0b3I+KCkuSW5pdE5hdmlnYXRpb24oKTsgLy8gaW5pdCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVzb2x2ZTxJTWVzc2VuZ2VyPigpLlN1YnNjcmliZTxIb21lVmlld01vZGVsLHN0cmluZz4obmV3IG9iamVjdCgpLCBTcGFmQXBwLk1lc3NhZ2VzLkFsZXJ0LFxyXG4oZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6YXdlc29tZWFwcC5zcGFmLlZpZXdNb2RlbHMuSG9tZVZpZXdNb2RlbCwgc3RyaW5nPikoICAgICAgICAgICAgICAgIChtb2RlbCwgcykgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuQWxlcnQocyk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBDb250YWluZXJDb25maWcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gbmF2aWdhdG9yXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElOYXZpZ2F0b3IsIEJyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nPigpO1xyXG4vLyAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElCcm93c2VySGlzdG9yeU1hbmFnZXIsIFF1ZXJ5UGFyYW1ldGVyTmF2aWdhdGlvbkhpc3Rvcnk+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElCcm93c2VySGlzdG9yeU1hbmFnZXIsIENvbXBsZXhPYmplY3ROYXZpZ2F0aW9uSGlzdG9yeT4oKTsgLy8gaWYgeW91IGRvbid0IG5lZWQgcXVlcnkgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SU5hdmlnYXRvckNvbmZpZ3VyYXRvciwgQ3VzdG9tUm91dGVzQ29uZmlnPigpOyBcclxuXHJcbiAgICAgICAgICAgIC8vIG1lc3NlbmdlclxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJTWVzc2VuZ2VyLCBNZXNzZW5nZXIuTWVzc2VuZ2VyPigpO1xyXG5cclxuICAgICAgICAgICAgLy8gdmlld21vZGVsc1xyXG4gICAgICAgICAgICBSZWdpc3RlckFsbFZpZXdNb2RlbHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGN1c3RvbSByZXNvdXJjZSwgc2VydmljZXMuLlxyXG5cclxuICAgICAgICB9XHJcbiNyZWdpb24gUEFHRVMgSURTXHJcbi8vIHN0YXRpYyBwYWdlcyBpZFxyXG5wdWJsaWMgc3RhdGljIHN0cmluZyBIb21lSWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiaG9tZVwiO1xyXG4gICAgfVxyXG59cHVibGljIHN0YXRpYyBzdHJpbmcgU2Vjb25kSWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwic2Vjb25kXCI7XHJcbiAgICB9XHJcbn0jZW5kcmVnaW9uXHJcbiNyZWdpb24gQ09NUE9ORU5UUyBJRFxyXG5wdWJsaWMgc3RhdGljIHN0cmluZyBJbmNyZW1lbnRJZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJpbmNyZW1lbnRcIjtcclxuICAgIH1cclxufSAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIE1FU1NBR0VTXHJcbiAgICAgICAgLy8gbWVzc2VuZ2VyIGhlbHBlciBmb3IgZ2xvYmFsIG1lc3NhZ2VzIGFuZCBtZXNzYWdlcyBpZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjbGFzcyBNZXNzYWdlc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIEdsb2JhbFNlbmRlciB7IH07XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEdsb2JhbFNlbmRlciBTZW5kZXIgPSBuZXcgR2xvYmFsU2VuZGVyKCk7XHJcbnB1YmxpYyBzdGF0aWMgc3RyaW5nIEFsZXJ0XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkFsZXJ0XCI7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVnaXN0ZXIgYWxsIHR5cGVzIHRoYXQgZW5kIHdpdGggXCJ2aWV3bW9kZWxcIi5cclxuICAgICAgICAvLy8gWW91IGNhbiByZWdpc3RlciBhIHZpZXdtb2RlIGFzIFNpbmdsciBJbnN0YW5jZSBhZGRpbmcgXCJTaW5nbGVJbnN0YW5jZUF0dHJpYnV0ZVwiIHRvIHRoZSBjbGFzc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZWdpc3RlckFsbFZpZXdNb2RlbHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHR5cGVzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3RNYW55PGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uQXNzZW1ibHksZ2xvYmFsOjpTeXN0ZW0uVHlwZT4oQXBwRG9tYWluLkN1cnJlbnREb21haW4uR2V0QXNzZW1ibGllcygpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uQXNzZW1ibHksIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuSUVudW1lcmFibGU8Z2xvYmFsOjpTeXN0ZW0uVHlwZT4+KShzID0+IHMuR2V0VHlwZXMoKSkpXHJcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHcgPT4gdy5OYW1lLlRvTG93ZXIoKS5FbmRzV2l0aChcInZpZXdtb2RlbFwiKSkpLlRvTGlzdCgpO1xyXG5cclxuICAgICAgICAgICAgdHlwZXMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlR5cGU+KShmID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gZi5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihTaW5nbGVJbnN0YW5jZUF0dHJpYnV0ZSksIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxvYmplY3Q+KGF0dHJpYnV0ZXMpKVxyXG4gICAgICAgICAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlKGYpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcihmKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLlNwYWZcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFBhcnRpYWxNb2RlbCA6ICBJVmlld01vZGVsTGlmZUN5Y2xlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBkb20uSFRNTERpdkVsZW1lbnQgX3BhcnRpYWxFbGVtZW50O1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEVsZW1lbnQgaWQgb2YgdGhlIHBhZ2UgXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBzdHJpbmcgRWxlbWVudElkKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBIdG1sTG9jYXRpb25cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBzdHJpbmcgSHRtbFVybCB7IGdldDsgfVxyXG5cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBJbml0IHBhcnRpYWxcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhcmFtZXRlcnNcIj5kYXRhIGZvciBpbml0IHRoZSBwYXJ0aWFsczwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBJbml0KERpY3Rpb25hcnk8c3RyaW5nLG9iamVjdD4gcGFyYW1ldGVycylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBqUXVlcnkuR2V0KHRoaXMuSHRtbFVybCwgbnVsbCwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIHN0cmluZywgZ2xvYmFsOjpCcmlkZ2UualF1ZXJ5Mi5qcVhIUj4pKChvLCBzLCBhcmczKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWFsRWxlbWVudCA9IG5ldyBkb20uSFRNTERpdkVsZW1lbnRcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUwgPSBvLlRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChFbGVtZW50SWQoKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHRoaXMuX3BhcnRpYWxFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGtub2Nrb3V0LmtvLmFwcGx5QmluZGluZ3ModGhpcywgdGhpcy5fcGFydGlhbEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIERlSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBrbyBjb250YWlucyB0aGlzIG5vZGVcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BhcnRpYWxFbGVtZW50ID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBrbm9ja291dC5rby5kYXRhRm9yKHRoaXMuX3BhcnRpYWxFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAga25vY2tvdXQua28ucmVtb3ZlTm9kZSh0aGlzLl9wYXJ0aWFsRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSVZpZXdNb2RlbExpZmVDeWNsZVxyXG4gICAge1xyXG4gICAgICAgIHZvaWQgSW5pdChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKTtcclxuICAgICAgICB2b2lkIERlSW5pdCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuU3BhZlxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgTG9hZGFibGVWaWV3TW9kZWwgOiBWaWV3TW9kZWxCYXNlLCBJQW1Mb2FkYWJsZVxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBMaXN0PElWaWV3TW9kZWxMaWZlQ3ljbGU+IFBhcnRpYWxzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuQXBwbHlCaW5kaW5ncygpO1xyXG4gICAgICAgICAgICBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLHRoaXMuUGFydGlhbHMpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8TGlzdDxJVmlld01vZGVsTGlmZUN5Y2xlPj4oXCJrZXkxXCIpLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5TcGFmLklWaWV3TW9kZWxMaWZlQ3ljbGU+KShmPT4gZi5Jbml0KHBhcmFtZXRlcnMpKSkpOm51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE9uTGVhdmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTJcIix0aGlzLlBhcnRpYWxzKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPExpc3Q8SVZpZXdNb2RlbExpZmVDeWNsZT4+KFwia2V5MlwiKS5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuU3BhZi5JVmlld01vZGVsTGlmZUN5Y2xlPikoZj0+Zi5EZUluaXQoKSkpKTpudWxsO1xyXG4gICAgICAgICAgICBiYXNlLlJlbW92ZUJpbmRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgTGlzdDxJVmlld01vZGVsTGlmZUN5Y2xlPiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fUGFydGlhbHM9bmV3IExpc3Q8SVZpZXdNb2RlbExpZmVDeWNsZT4oKTt9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5Jb2Ncclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIEltcGxlbWVudGF0aW9uIG9mIElJb2NcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgQnJpZGdlSW9jIDogSUlvY1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRGljdGlvbmFyeTxUeXBlLCBJUmVzb2x2ZXI+IF9yZXNvbHZlcnMgPSBuZXcgRGljdGlvbmFyeTxUeXBlLCBJUmVzb2x2ZXI+KCk7XHJcblxyXG4gICAgICAgICNyZWdpb24gUkVHSVNUUkFUSU9OXHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyKFR5cGUgdHlwZSwgSVJlc29sdmVyIHJlc29sdmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tBbHJlYWR5QWRkZWQodHlwZSk7XHJcbiAgICAgICAgICAgIF9yZXNvbHZlcnMuQWRkKHR5cGUsIHJlc29sdmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyKFR5cGUgdHlwZSwgVHlwZSBpbXBsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tBbHJlYWR5QWRkZWQodHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBuZXcgVHJhbnNpZW50UmVzb2x2ZXIodGhpcywgaW1wbCk7XHJcbiAgICAgICAgICAgIF9yZXNvbHZlcnMuQWRkKHR5cGUsIHJlc29sdmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyPFRUeXBlLCBUSW1wbGVtZW50YXRpb24+KCkgd2hlcmUgVEltcGxlbWVudGF0aW9uIDogY2xhc3MsIFRUeXBlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZWdpc3Rlcih0eXBlb2YoVFR5cGUpLCB0eXBlb2YoVEltcGxlbWVudGF0aW9uKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3RlcihUeXBlIHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZWdpc3Rlcih0eXBlLCB0eXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyPFRUeXBlPigpIHdoZXJlIFRUeXBlIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyKHR5cGVvZihUVHlwZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZShUeXBlIHR5cGUsIFR5cGUgaW1wbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENoZWNrQWxyZWFkeUFkZGVkKHR5cGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc29sdmVyID0gbmV3IFNpbmdsZUluc3RhbmNlUmVzb2x2ZXIodGhpcywgaW1wbCk7XHJcbiAgICAgICAgICAgIF9yZXNvbHZlcnMuQWRkKHR5cGUsIHJlc29sdmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8VFR5cGUsIFRJbXBsZW1lbnRhdGlvbj4oKSB3aGVyZSBUSW1wbGVtZW50YXRpb24gOiBjbGFzcywgVFR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UodHlwZW9mKFRUeXBlKSwgdHlwZW9mKFRJbXBsZW1lbnRhdGlvbikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZShUeXBlIHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZWdpc3RlclNpbmdsZUluc3RhbmNlKHR5cGUsIHR5cGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxUVHlwZT4oKSB3aGVyZSBUVHlwZSA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZWdpc3RlclNpbmdsZUluc3RhbmNlKHR5cGVvZihUVHlwZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJGdW5jPFRUeXBlPihGdW5jPFRUeXBlPiBmdW5jKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tBbHJlYWR5QWRkZWQ8VFR5cGU+KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBuZXcgRnVuY1Jlc29sdmVyPFRUeXBlPihmdW5jKTtcclxuICAgICAgICAgICAgX3Jlc29sdmVycy5BZGQodHlwZW9mKFRUeXBlKSwgcmVzb2x2ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJJbnN0YW5jZShUeXBlIHR5cGUsIG9iamVjdCBpbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENoZWNrQWxyZWFkeUFkZGVkKHR5cGUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc29sdmVyID0gbmV3IEluc3RhbmNlUmVzb2x2ZXIoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBfcmVzb2x2ZXJzLkFkZCh0eXBlLCByZXNvbHZlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckluc3RhbmNlKG9iamVjdCBpbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UuR2V0VHlwZSgpLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckluc3RhbmNlPFRUeXBlPihUVHlwZSBpbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVySW5zdGFuY2UodHlwZW9mKFRUeXBlKSwgaW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFJFU09MVkVcclxuICAgICAgICBwdWJsaWMgVFR5cGUgUmVzb2x2ZTxUVHlwZT4oKSB3aGVyZSBUVHlwZSA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGVja05vdFJlZ2lzdGVyZWQ8VFR5cGU+KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBfcmVzb2x2ZXJzW3R5cGVvZihUVHlwZSldO1xyXG4gICAgICAgICAgICByZXR1cm4gKFRUeXBlKXJlc29sdmVyLlJlc29sdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvYmplY3QgUmVzb2x2ZShUeXBlIHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGVja05vdFJlZ2lzdGVyZWQodHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBfcmVzb2x2ZXJzW3R5cGVdO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZXIuUmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG5cclxuICAgICAgICAjcmVnaW9uIFBSSVZBVEVcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoZWNrQWxyZWFkeUFkZGVkKFR5cGUgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfcmVzb2x2ZXJzLkNvbnRhaW5zS2V5KHR5cGUpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiezB9IGlzIGFscmVhZHkgcmVnaXN0ZXJlZCFcIix0eXBlLkZ1bGxOYW1lKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ2hlY2tBbHJlYWR5QWRkZWQ8VFR5cGU+KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENoZWNrQWxyZWFkeUFkZGVkKHR5cGVvZihUVHlwZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoZWNrTm90UmVnaXN0ZXJlZChUeXBlIHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIV9yZXNvbHZlcnMuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJDYW5ub3QgcmVzb2x2ZSB7MH0sIGl0J3Mgbm90IHJlZ2lzdGVyZWQhXCIsdHlwZS5GdWxsTmFtZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoZWNrTm90UmVnaXN0ZXJlZDxUVHlwZT4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tOb3RSZWdpc3RlcmVkKHR5cGVvZihUVHlwZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5Jb2Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIEZ1bmNSZXNvbHZlcjxUPiA6IElSZXNvbHZlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBGdW5jPG9iamVjdD4gUmVzb2x2ZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBGdW5jUmVzb2x2ZXIoRnVuYzxUPiByZXNvbHZlRnVuYylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmVzb2x2ZSA9ICgpID0+IHJlc29sdmVGdW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5Jb2Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIEluc3RhbmNlUmVzb2x2ZXIgOiBJUmVzb2x2ZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRnVuYzxvYmplY3Q+IFJlc29sdmUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSW5zdGFuY2VSZXNvbHZlcihvYmplY3QgcmVzb2x2ZWRPYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZXNvbHZlID0gKCkgPT4gcmVzb2x2ZWRPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBJbnN0YW5jZVJlc29sdmVyPFQ+IDogSW5zdGFuY2VSZXNvbHZlclxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgSW5zdGFuY2VSZXNvbHZlcihUIHJlc29sdmVkT2JqKSA6IGJhc2UocmVzb2x2ZWRPYmopXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLklvY1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2luZ2xlSW5zdGFuY2VSZXNvbHZlciA6IElSZXNvbHZlclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgb2JqZWN0IF9zaW5nbGVJbnN0YW5jZTtcclxuXHJcbiAgICAgICAgcHVibGljIEZ1bmM8b2JqZWN0PiBSZXNvbHZlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFNpbmdsZUluc3RhbmNlUmVzb2x2ZXIoSUlvYyBpb2MsIFR5cGUgdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlc29sdmUgPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBmaXJzdCByZXNvbHZlLiBVc2luZyB0cmFuc2llbnQgcmVzb2x2ZXJcclxuICAgICAgICAgICAgICAgIGlmIChfc2luZ2xlSW5zdGFuY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpZW50UmVzb2x2ZXIgPSBuZXcgVHJhbnNpZW50UmVzb2x2ZXIoaW9jLCB0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBfc2luZ2xlSW5zdGFuY2UgPSB0cmFuc2llbnRSZXNvbHZlci5SZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zaW5nbGVJbnN0YW5jZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFNpbmdsZUluc3RhbmNlUmVzb2x2ZXI8VD4gOiBTaW5nbGVJbnN0YW5jZVJlc29sdmVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTaW5nbGVJbnN0YW5jZVJlc29sdmVyKElJb2MgaW9jKSA6IGJhc2UoaW9jLCB0eXBlb2YoVCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuSW9jXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUcmFuc2llbnRSZXNvbHZlciA6IElSZXNvbHZlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBGdW5jPG9iamVjdD4gUmVzb2x2ZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUcmFuc2llbnRSZXNvbHZlcihJSW9jIGlvYywgVHlwZSB0b3Jlc29sdmVUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5SZXNvbHZlID0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGN0b3JcclxuICAgICAgICAgICAgICAgIHZhciBjdG9yID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLkNvbnN0cnVjdG9ySW5mbz4odG9yZXNvbHZlVHlwZS5HZXRDb25zdHJ1Y3RvcnMoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3RvciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIk5vIGN0b3IgZm91bmQgZm9yIHR5cGUgezB9IVwiLHRvcmVzb2x2ZVR5cGUuRnVsbE5hbWUpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgY3RvciBwYXJhbXNcclxuICAgICAgICAgICAgICAgIHZhciBjdG9yUGFyYW1zID0gY3Rvci5HZXRQYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uUGFyYW1ldGVySW5mbz4oY3RvclBhcmFtcykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZSh0b3Jlc29sdmVUeXBlKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZWN1cnNpdmUgcmVzb2x2ZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gbmV3IExpc3Q8b2JqZWN0PihjdG9yUGFyYW1zLkxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBwYXJhbWV0ZXJJbmZvIGluIGN0b3JQYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMuQWRkKGlvYy5SZXNvbHZlKHBhcmFtZXRlckluZm8uUGFyYW1ldGVyVHlwZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3Rvci5JbnZva2UocGFyYW1ldGVycy5Ub0FycmF5KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVHJhbnNpZW50UmVzb2x2ZXI8VD4gOiBUcmFuc2llbnRSZXNvbHZlclxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgVHJhbnNpZW50UmVzb2x2ZXIoSUlvYyBpb2MpIDogYmFzZShpb2MsIHR5cGVvZihUKSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLk1lc3NlbmdlclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTWVzc2VuZ2VyIDogSU1lc3NlbmdlclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHlcclxuICAgICAgICAgICAgRGljdGlvbmFyeTxUdXBsZTxzdHJpbmcsIFR5cGUsIFR5cGU+LCBMaXN0PFR1cGxlPG9iamVjdCwgQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4+PiBfY2FsbHMgPVxyXG4gICAgICAgICAgICAgICAgbmV3IERpY3Rpb25hcnk8VHVwbGU8c3RyaW5nLCBUeXBlLCBUeXBlPiwgTGlzdDxUdXBsZTxvYmplY3QsIEFjdGlvbjxvYmplY3QsIG9iamVjdD4+Pj4oKTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBTZW5kIE1lc3NhZ2Ugd2l0aCBhcmdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVEFyZ3NcIj5UTWVzc2FnZUFyZ3M8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZW5kZXJcIj5TZW5kZXI8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcmdzXCI+QXJnczwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgU2VuZDxUU2VuZGVyLCBUQXJncz4oVFNlbmRlciBzZW5kZXIsIHN0cmluZyBtZXNzYWdlLCBUQXJncyBhcmdzKSB3aGVyZSBUU2VuZGVyIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChzZW5kZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzZW5kZXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMuSW5uZXJTZW5kKG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgdHlwZW9mKFRBcmdzKSwgc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU2VuZCBNZXNzYWdlIHdpdGhvdXQgYXJnc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRTZW5kZXJcIj5UU2VuZGVyPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2VuZGVyXCI+U2VuZGVyPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtZXNzYWdlXCI+TWVzc2FnZTwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgU2VuZDxUU2VuZGVyPihUU2VuZGVyIHNlbmRlciwgc3RyaW5nIG1lc3NhZ2UpIHdoZXJlIFRTZW5kZXIgOiBjbGFzc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHNlbmRlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlbmRlclwiKTtcclxuICAgICAgICAgICAgdGhpcy5Jbm5lclNlbmQobWVzc2FnZSwgdHlwZW9mKFRTZW5kZXIpLCBudWxsLCBzZW5kZXIsIG51bGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBTdWJzY3JpYmUgTWVzc2FnZSB3aXRoIGFyZ3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUU2VuZGVyXCI+VFNlbmRlcjwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUQXJnc1wiPlRBcmdzPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3Vic2NyaWJlclwiPlN1YnNjcmliZXI8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiPkFjdGlvbjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic291cmNlXCI+c291cmNlPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTdWJzY3JpYmU8VFNlbmRlciwgVEFyZ3M+KG9iamVjdCBzdWJzY3JpYmVyLCBzdHJpbmcgbWVzc2FnZSwgQWN0aW9uPFRTZW5kZXIsIFRBcmdzPiBjYWxsYmFjayxcclxuICAgICAgICAgICAgVFNlbmRlciBzb3VyY2UgPSBudWxsKSB3aGVyZSBUU2VuZGVyIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic3Vic2NyaWJlclwiKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiY2FsbGJhY2tcIik7XHJcblxyXG4gICAgICAgICAgICBBY3Rpb248b2JqZWN0LCBvYmplY3Q+IHdyYXAgPSAoc2VuZGVyLCBhcmdzKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VuZCA9IChUU2VuZGVyKXNlbmRlcjtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UgPT0gbnVsbCB8fCBzZW5kID09IHNvdXJjZSlcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygoVFNlbmRlcilzZW5kZXIsIChUQXJncylhcmdzKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuSW5uZXJTdWJzY3JpYmUoc3Vic2NyaWJlciwgbWVzc2FnZSwgdHlwZW9mKFRTZW5kZXIpLCB0eXBlb2YoVEFyZ3MpLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0Pil3cmFwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU3Vic2NyaWJlIE1lc3NhZ2Ugd2l0aG91dCBhcmdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzdWJzY3JpYmVyXCI+U3Vic2NyaWJlcjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZVwiPk1lc3NhZ2U8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCI+QWN0aW9uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzb3VyY2VcIj5zb3VyY2U8L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFN1YnNjcmliZTxUU2VuZGVyPihvYmplY3Qgc3Vic2NyaWJlciwgc3RyaW5nIG1lc3NhZ2UsIEFjdGlvbjxUU2VuZGVyPiBjYWxsYmFjayxcclxuICAgICAgICAgICAgVFNlbmRlciBzb3VyY2UgPSBudWxsKSB3aGVyZSBUU2VuZGVyIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic3Vic2NyaWJlclwiKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiY2FsbGJhY2tcIik7XHJcblxyXG4gICAgICAgICAgICBBY3Rpb248b2JqZWN0LCBvYmplY3Q+IHdyYXAgPSAoc2VuZGVyLCBhcmdzKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VuZCA9IChUU2VuZGVyKXNlbmRlcjtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UgPT0gbnVsbCB8fCBzZW5kID09IHNvdXJjZSlcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygoVFNlbmRlcilzZW5kZXIpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Jbm5lclN1YnNjcmliZShzdWJzY3JpYmVyLCBtZXNzYWdlLCB0eXBlb2YoVFNlbmRlciksIG51bGwsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248b2JqZWN0LCBvYmplY3Q+KXdyYXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBVbnN1YnNjcmliZSBhY3Rpb24gd2l0aCBhcmdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVEFyZ3NcIj5UQXJnczwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInN1YnNjcmliZXJcIj5TdWJzY3JpYmVyPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtZXNzYWdlXCI+TWVzc2FnZTwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgVW5zdWJzY3JpYmU8VFNlbmRlciwgVEFyZ3M+KG9iamVjdCBzdWJzY3JpYmVyLCBzdHJpbmcgbWVzc2FnZSkgd2hlcmUgVFNlbmRlciA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLklubmVyVW5zdWJzY3JpYmUobWVzc2FnZSwgdHlwZW9mKFRTZW5kZXIpLCB0eXBlb2YoVEFyZ3MpLCBzdWJzY3JpYmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVW5zdWJzY3JpYmUgYWN0aW9uIHdpdGhvdXQgYXJnc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRTZW5kZXJcIj5UU2VuZGVyPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3Vic2NyaWJlclwiPlN1YnNjcmliZXI8L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVbnN1YnNjcmliZTxUU2VuZGVyPihvYmplY3Qgc3Vic2NyaWJlciwgc3RyaW5nIG1lc3NhZ2UpIHdoZXJlIFRTZW5kZXIgOiBjbGFzc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Jbm5lclVuc3Vic2NyaWJlKG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgbnVsbCwgc3Vic2NyaWJlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlbW92ZSBhbGwgY2FsbGJhY2tzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldE1lc3NlbmdlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxscy5DbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIElubmVyU2VuZChzdHJpbmcgbWVzc2FnZSwgVHlwZSBzZW5kZXJUeXBlLCBUeXBlIGFyZ1R5cGUsIG9iamVjdCBzZW5kZXIsIG9iamVjdCBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJtZXNzYWdlXCIpO1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gbmV3IFR1cGxlPHN0cmluZywgVHlwZSwgVHlwZT4obWVzc2FnZSwgc2VuZGVyVHlwZSwgYXJnVHlwZSk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbHMuQ29udGFpbnNLZXkoa2V5KSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLl9jYWxsc1trZXldO1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9ucyA9PSBudWxsIHx8ICFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxnbG9iYWw6OlN5c3RlbS5UdXBsZTxvYmplY3QsIGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4+PihhY3Rpb25zKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3Rpb25zQ29weSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9MaXN0PGdsb2JhbDo6U3lzdGVtLlR1cGxlPG9iamVjdCwgZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4+KGFjdGlvbnMpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgYWN0aW9uIGluIGFjdGlvbnNDb3B5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9ucy5Db250YWlucyhhY3Rpb24pKVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5JdGVtMihzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgSW5uZXJTdWJzY3JpYmUob2JqZWN0IHN1YnNjcmliZXIsIHN0cmluZyBtZXNzYWdlLCBUeXBlIHNlbmRlclR5cGUsIFR5cGUgYXJnVHlwZSxcclxuICAgICAgICAgICAgQWN0aW9uPG9iamVjdCwgb2JqZWN0PiBjYWxsYmFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwibWVzc2FnZVwiKTtcclxuICAgICAgICAgICAgdmFyIGtleSA9IG5ldyBUdXBsZTxzdHJpbmcsIFR5cGUsIFR5cGU+KG1lc3NhZ2UsIHNlbmRlclR5cGUsIGFyZ1R5cGUpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBuZXcgVHVwbGU8b2JqZWN0LCBBY3Rpb248b2JqZWN0LCBvYmplY3Q+PihzdWJzY3JpYmVyLCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYWxscy5Db250YWluc0tleShrZXkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsc1trZXldLkFkZCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdCA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PFR1cGxlPG9iamVjdCwgQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4+KCksKF9vMSk9PntfbzEuQWRkKHZhbHVlKTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbHNba2V5XSA9IGxpc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBJbm5lclVuc3Vic2NyaWJlKHN0cmluZyBtZXNzYWdlLCBUeXBlIHNlbmRlclR5cGUsIFR5cGUgYXJnVHlwZSwgb2JqZWN0IHN1YnNjcmliZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInN1YnNjcmliZXJcIik7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwibWVzc2FnZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBuZXcgVHVwbGU8c3RyaW5nLCBUeXBlLCBUeXBlPihtZXNzYWdlLCBzZW5kZXJUeXBlLCBhcmdUeXBlKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYWxscy5Db250YWluc0tleShrZXkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvcmVtb3ZlID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxnbG9iYWw6OlN5c3RlbS5UdXBsZTxvYmplY3QsIGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxvYmplY3QsIG9iamVjdD4+Pih0aGlzLl9jYWxsc1trZXldLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR1cGxlPG9iamVjdCwgZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4sIGJvb2w+KSh0dXBsZSA9PiB0dXBsZS5JdGVtMSA9PSBzdWJzY3JpYmVyKSkuVG9MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgdHVwbGUgaW4gdG9yZW1vdmUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsc1trZXldLlJlbW92ZSh0dXBsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PGdsb2JhbDo6U3lzdGVtLlR1cGxlPG9iamVjdCwgZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4+KHRoaXMuX2NhbGxzW2tleV0pKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbHMuUmVtb3ZlKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBJTmF2aWdhdG9yIGltcGxlbWVudGF0aW9uXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEJyaWRnZU5hdmlnYXRvciA6IElOYXZpZ2F0b3JcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBJQW1Mb2FkYWJsZSBfYWN0dWFsQ29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IElOYXZpZ2F0b3JDb25maWd1cmF0b3IgQ29uZmlndXJhdGlvbjtcclxuICAgICAgICBwdWJsaWMgQnJpZGdlTmF2aWdhdG9yKElOYXZpZ2F0b3JDb25maWd1cmF0b3IgY29uZmlndXJhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRW5hYmxlU3BhZkFuY2hvcnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGFsbEFuY2hvcnMgPSBqUXVlcnkuU2VsZWN0KFwiYVwiKTtcclxuICAgICAgICAgICAgYWxsQW5jaG9ycy5PZmYoRXZlbnRUeXBlLkNsaWNrLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBhbGxBbmNob3JzLkNsaWNrKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UualF1ZXJ5Mi5qUXVlcnlNb3VzZUV2ZW50PikoZXYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsaWNrZWRFbGVtZW50ID0gZXYuVGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjbGlja2VkRWxlbWVudC5HZXRUeXBlKCkgIT0gdHlwZW9mKEhUTUxBbmNob3JFbGVtZW50KSlcclxuICAgICAgICAgICAgICAgICAgICBjbGlja2VkRWxlbWVudCA9IGpRdWVyeS5FbGVtZW50KGV2LlRhcmdldCkuUGFyZW50cyhcImFcIikuR2V0KDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBocmVmID0gY2xpY2tlZEVsZW1lbnQuR2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkoaHJlZikpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNNeUhyZWYgPSBocmVmLlN0YXJ0c1dpdGgoXCJzcGFmOlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBpcyBteSBocmVmXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNNeUhyZWYpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXYuUHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFnZUlkID0gaHJlZi5SZXBsYWNlKFwic3BhZjpcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZShwYWdlSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFuY2hvciBkZWZhdWx0IGJlaGF2aW91clxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIGEgcGFnZSBJRC5cclxuICAgICAgICAvLy8gVGhlIElEIG11c3QgYmUgcmVnaXN0ZXJlZC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhZ2VJZFwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBOYXZpZ2F0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZyxvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLkNvbmZpZ3VyYXRpb24uR2V0UGFnZURlc2NyaXB0b3JCeUtleShwYWdlSWQpO1xyXG4gICAgICAgICAgICBpZiAocGFnZSA9PSBudWxsKSB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJQYWdlIG5vdCBmb3VuZCB3aXRoIElEIHswfVwiLHBhZ2VJZCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY2hlY2sgcmVkaXJlY3QgcnVsZVxyXG4gICAgICAgICAgICB2YXIgcmVkaXJlY3RLZXkgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLHBhZ2UuUmVkaXJlY3RSdWxlcykhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEZ1bmM8c3RyaW5nPj4oXCJrZXkxXCIpLkludm9rZSgpOihzdHJpbmcpbnVsbDtcclxuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eShyZWRpcmVjdEtleSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTmF2aWdhdGUocmVkaXJlY3RLZXkscGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBib2R5ID0gdGhpcy5Db25maWd1cmF0aW9uLkJvZHk7XHJcbiAgICAgICAgICAgIGlmKGJvZHkgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJDYW5ub3QgZmluZCBuYXZpZ2F0aW9uIGJvZHkgZWxlbWVudC5cIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBsZWF2ZSBhY3R1YWwgY29udHJvbGVsclxyXG4gICAgICAgICAgICBpZiAodGhpcy5MYXN0TmF2aWdhdGVDb250cm9sbGVyICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkxhc3ROYXZpZ2F0ZUNvbnRyb2xsZXIuT25MZWF2ZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Db25maWd1cmF0aW9uLkJvZHkuTG9hZChwYWdlLkh0bWxMb2NhdGlvbi5JbnZva2UoKSxudWxsLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPHN0cmluZywgc3RyaW5nLCBnbG9iYWw6OkJyaWRnZS5qUXVlcnkyLmpxWEhSPikoYXN5bmMgKG8scyxhKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBsb2FkIGRlcGVuZGVuY2llc1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UuRGVwZW5kZW5jaWVzU2NyaXB0cyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JpcHRzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0xpc3Q8c3RyaW5nPigocGFnZS5EZXBlbmRlbmNpZXNTY3JpcHRzLkludm9rZSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGFnZS5TZXF1ZW50aWFsRGVwZW5kZW5jaWVzU2NyaXB0TG9hZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbGl0eS5TZXF1ZW50aWFsU2NyaXB0TG9hZChzY3JpcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcmFsbGVsIGxvYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjcmlwdHNUYXNrID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3Q8c3RyaW5nLGdsb2JhbDo6U3lzdGVtLlRocmVhZGluZy5UYXNrcy5UYXNrPG9iamVjdFtdPj4oc2NyaXB0cywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxzdHJpbmcsIGdsb2JhbDo6U3lzdGVtLlRocmVhZGluZy5UYXNrcy5UYXNrPG9iamVjdFtdPj4pKHVybCA9PiBUYXNrLkZyb21Qcm9taXNlKGpRdWVyeS5HZXRTY3JpcHQodXJsKSkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgVGFzay5XaGVuQWxsPG9iamVjdFtdPihzY3JpcHRzVGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBwcmVwYXJlIHBhZ2VcclxuICAgICAgICAgICAgICAgIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkyXCIscGFnZS5QcmVwYXJlUGFnZSkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9Pmdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxBY3Rpb24+KFwia2V5MlwiKS5JbnZva2UoKSk6bnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvIGVuYWJsZSBzcGFmIGFuY2hvcnNcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5Db25maWd1cmF0aW9uLkRpc2FibGVBdXRvU3BhZkFuY2hvcnNPbk5hdmlnYXRlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmFibGVBbmNob3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTNcIixwYWdlLkF1dG9FbmFibGVTcGFmQW5jaG9ycykhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEZ1bmM8Ym9vbD4+KFwia2V5M1wiKS5JbnZva2UoKTooYm9vbD8pbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZihlbmFibGVBbmNob3JzLkhhc1ZhbHVlICYmIGVuYWJsZUFuY2hvcnMuVmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRW5hYmxlU3BhZkFuY2hvcnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFnZS5QYWdlQ29udHJvbGxlciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvYWQgbmV3IGNvbnRyb2xsZXJcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlciA9IHBhZ2UuUGFnZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLk9uTG9hZChwYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX2FjdHVhbENvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuT25OYXZpZ2F0ZWQhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9PnRoaXMuT25OYXZpZ2F0ZWQuSW52b2tlKHRoaXMsY29udHJvbGxlcikpOm51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSkpOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBldmVudCBFdmVudEhhbmRsZXI8SUFtTG9hZGFibGU+IE9uTmF2aWdhdGVkO1xyXG5wdWJsaWMgSUFtTG9hZGFibGUgTGFzdE5hdmlnYXRlQ29udHJvbGxlclxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX2FjdHVhbENvbnRyb2xsZXI7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFN1YnNjcmliZSB0byBhbmNob3JzIGNsaWNrXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEluaXROYXZpZ2F0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRW5hYmxlU3BhZkFuY2hvcnMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdvIGhvbWVcclxuICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZSh0aGlzLkNvbmZpZ3VyYXRpb24uSG9tZUlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIElOYXZpZ2F0b3JDb25maWd1cmF0b3IgSW1wbGVtZW50YXRpb24uIE11c3QgYmUgZXh0ZW5kZWQuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIEJyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2UgOiBJTmF2aWdhdG9yQ29uZmlndXJhdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTGlzdDxJUGFnZURlc2NyaXB0b3I+IF9yb3V0ZXM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBJTGlzdDxJUGFnZURlc2NyaXB0b3I+IENyZWF0ZVJvdXRlcygpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBqUXVlcnkgQm9keSB7IGdldDsgfVxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBzdHJpbmcgSG9tZUlkIHsgZ2V0OyB9XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IGJvb2wgRGlzYWJsZUF1dG9TcGFmQW5jaG9yc09uTmF2aWdhdGUgeyBnZXQ7IH1cclxuXHJcblxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgQnJpZGdlTmF2aWdhdG9yQ29uZmlnQmFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMgPSB0aGlzLkNyZWF0ZVJvdXRlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElQYWdlRGVzY3JpcHRvciBHZXRQYWdlRGVzY3JpcHRvckJ5S2V5KHN0cmluZyBrZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TaW5nbGVPckRlZmF1bHQ8Z2xvYmFsOjpCcmlkZ2UuTmF2aWdhdGlvbi5JUGFnZURlc2NyaXB0b3I+KHRoaXMuX3JvdXRlcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OkJyaWRnZS5OYXZpZ2F0aW9uLklQYWdlRGVzY3JpcHRvciwgYm9vbD4pKHM9PiBzdHJpbmcuRXF1YWxzKHMuS2V5LCBrZXksIFN0cmluZ0NvbXBhcmlzb24uQ3VycmVudEN1bHR1cmVJZ25vcmVDYXNlKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbi5Nb2RlbDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29tcGxleE9iamVjdE5hdmlnYXRpb25IaXN0b3J5IDogSUJyb3dzZXJIaXN0b3J5TWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIFB1c2hTdGF0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBiYXNlVXJsID0gTmF2aWdhdGlvblV0aWxpdHkuQnVpbGRCYXNlVXJsKHBhZ2VJZCk7XHJcblxyXG4gICAgICAgICAgICBXaW5kb3cuSGlzdG9yeS5QdXNoU3RhdGUobnVsbCwgc3RyaW5nLkVtcHR5LFxyXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycyAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgPyBzdHJpbmcuRm9ybWF0KFwiezB9PXsxfVwiLGJhc2VVcmwsR2xvYmFsLkJ0b2EoSlNPTi5TdHJpbmdpZnkocGFyYW1ldGVycykpKTogYmFzZVVybCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXJsRGVzY3JpcHRvciBQYXJzZVVybCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gbmV3IFVybERlc2NyaXB0b3IoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBoYXNoID0gV2luZG93LkxvY2F0aW9uLkhhc2g7XHJcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLlJlcGxhY2UoXCIjXCIsIFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KGhhc2gpKSByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVxdWFsSW5kZXggPSBoYXNoLkluZGV4T2YoJz0nKTtcclxuICAgICAgICAgICAgaWYgKGVxdWFsSW5kZXggPT0gLTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJlcy5QYWdlSWQgPSBoYXNoO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzLlBhZ2VJZCA9IGhhc2guU3Vic3RyaW5nKDAsIGVxdWFsSW5kZXgpOyAgXHJcblxyXG4gICAgICAgICAgICB2YXIgZG91YmxlUG9pbnRzSW5keCA9IGVxdWFsSW5kZXggKyAxO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IGhhc2guU3Vic3RyaW5nKGRvdWJsZVBvaW50c0luZHgsIGhhc2guTGVuZ3RoIC0gZG91YmxlUG9pbnRzSW5keCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkocGFyYW1ldGVycykpIHJldHVybiByZXM7IC8vIG5vIHBhcmFtZXRlcnNcclxuXHJcbiAgICAgICAgICAgIHZhciBkZWNvZGVkID0gR2xvYmFsLkF0b2IocGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIHZhciBkZXNlcmlhbGl6ZWQgPSBKU09OLlBhcnNlPERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+PihkZWNvZGVkKTtcclxuXHJcbiAgICAgICAgICAgIHJlcy5QYXJhbWV0ZXJzID0gZGVzZXJpYWxpemVkO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLmpRdWVyeTI7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBhZ2VEZXNjcmlwdG9yIDogSVBhZ2VEZXNjcmlwdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFBhZ2VEZXNjcmlwdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQXV0b0VuYWJsZVNwYWZBbmNob3JzID0gKCkgPT4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgS2V5IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgRnVuYzxzdHJpbmc+IEh0bWxMb2NhdGlvbiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIEZ1bmM8SUFtTG9hZGFibGU+IFBhZ2VDb250cm9sbGVyIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgRnVuYzxib29sPiBDYW5CZURpcmVjdExvYWQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBBY3Rpb24gUHJlcGFyZVBhZ2UgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBib29sIFNlcXVlbnRpYWxEZXBlbmRlbmNpZXNTY3JpcHRMb2FkIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgRnVuYzxzdHJpbmc+IFJlZGlyZWN0UnVsZXMgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBGdW5jPGJvb2w+IEF1dG9FbmFibGVTcGFmQW5jaG9ycyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIEZ1bmM8SUVudW1lcmFibGU8c3RyaW5nPj4gRGVwZW5kZW5jaWVzU2NyaXB0cyB7IGdldDsgc2V0OyB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uLk1vZGVsO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBRdWVyeVBhcmFtZXRlck5hdmlnYXRpb25IaXN0b3J5IDogSUJyb3dzZXJIaXN0b3J5TWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIFB1c2hTdGF0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBiYXNlVXJsID0gTmF2aWdhdGlvblV0aWxpdHkuQnVpbGRCYXNlVXJsKHBhZ2VJZCk7XHJcblxyXG4gICAgICAgICAgICBXaW5kb3cuSGlzdG9yeS5QdXNoU3RhdGUobnVsbCwgc3RyaW5nLkVtcHR5LFxyXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycyAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgPyBzdHJpbmcuRm9ybWF0KFwiezB9ezF9XCIsYmFzZVVybCxCdWlsZFF1ZXJ5UGFyYW1ldGVyKHBhcmFtZXRlcnMpKTogYmFzZVVybCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXJsRGVzY3JpcHRvciBQYXJzZVVybCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gbmV3IFVybERlc2NyaXB0b3IoKTtcclxuICAgICAgICAgICAgcmVzLlBhcmFtZXRlcnMgPSBuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBoYXNoID0gV2luZG93LkxvY2F0aW9uLkhhc2g7XHJcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLlJlcGxhY2UoXCIjXCIsIFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KGhhc2gpKSByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVxdWFsSW5kZXggPSBoYXNoLkluZGV4T2YoJz8nKTtcclxuICAgICAgICAgICAgaWYgKGVxdWFsSW5kZXggPT0gLTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJlcy5QYWdlSWQgPSBoYXNoO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzLlBhZ2VJZCA9IGhhc2guU3Vic3RyaW5nKDAsIGVxdWFsSW5kZXgpOyAgXHJcblxyXG4gICAgICAgICAgICB2YXIgZG91YmxlUG9pbnRzSW5keCA9IGVxdWFsSW5kZXggKyAxO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IGhhc2guU3Vic3RyaW5nKGRvdWJsZVBvaW50c0luZHgsIGhhc2guTGVuZ3RoIC0gZG91YmxlUG9pbnRzSW5keCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkocGFyYW1ldGVycykpIHJldHVybiByZXM7IC8vIG5vIHBhcmFtZXRlcnNcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3BsaXR0ZWRCeURvdWJsZUFuZCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9MaXN0PHN0cmluZz4ocGFyYW1ldGVycy5TcGxpdChcIiZcIikpO1xyXG4gICAgICAgICAgICBzcGxpdHRlZEJ5RG91YmxlQW5kLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxzdHJpbmc+KShmID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcGxpdHRlZCA9IGYuU3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzLlBhcmFtZXRlcnMuQWRkKHNwbGl0dGVkWzBdLEdsb2JhbC5EZWNvZGVVUklDb21wb25lbnQoc3BsaXR0ZWRbMV0pKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIEJ1aWxkUXVlcnlQYXJhbWV0ZXIoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzID09IG51bGwgfHwgIVN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuS2V5VmFsdWVQYWlyPHN0cmluZywgb2JqZWN0Pj4ocGFyYW1ldGVycykpIHJldHVybiBzdHJpbmcuRW1wdHk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RyQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKFwiP1wiKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGtleVZhbHVlUGFpciBpbiBwYXJhbWV0ZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdHJCdWlsZGVyLkFwcGVuZChHbG9iYWwuRW5jb2RlVVJJQ29tcG9uZW50KGtleVZhbHVlUGFpci5LZXkpKTtcclxuICAgICAgICAgICAgICAgIHN0ckJ1aWxkZXIuQXBwZW5kKFwiPVwiKTtcclxuICAgICAgICAgICAgICAgIHN0ckJ1aWxkZXIuQXBwZW5kKEdsb2JhbC5FbmNvZGVVUklDb21wb25lbnQoa2V5VmFsdWVQYWlyLlZhbHVlLlRvU3RyaW5nKCkpKTtcclxuICAgICAgICAgICAgICAgIHN0ckJ1aWxkZXIuQXBwZW5kKFwiJlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHJlcyA9IHN0ckJ1aWxkZXIuVG9TdHJpbmcoKS5UcmltRW5kKCcmJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwidXNpbmcgQnJpZGdlLlNwYWY7XHJcblxyXG5cclxubmFtZXNwYWNlIGF3ZXNvbWVhcHAuc3BhZi5Db21wb25lbnRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBJbmNyZW1lbnRWaWV3TW9kZWwgOiBQYXJ0aWFsTW9kZWxcclxuICAgIHtcclxucHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKVxyXG57XHJcbiAgICByZXR1cm4gU3BhZkFwcC5JbmNyZW1lbnRJZDtcclxufSAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBIdG1sVXJsIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+TnVtYmVyIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8aW50Pk1hbnlOdW1iZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSW5jcmVtZW50Vmlld01vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtYmVyID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigwKTtcclxuICAgICAgICAgICAgdGhpcy5NYW55TnVtYmVyID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxpbnQ+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGFjdHVhbE51bWJlciA9IHRoaXMuTnVtYmVyLlNlbGYoKTtcclxuICAgICAgICAgICAgdGhpcy5OdW1iZXIuU2VsZigrK2FjdHVhbE51bWJlcik7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19IdG1sVXJsPVwiY29tcG9uZW50cy9pbmNyZW1lbnQuaHRtbFwiO31cclxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBhd2Vzb21lYXBwLnNwYWYuQ29tcG9uZW50cztcclxudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XHJcbnVzaW5nIEJyaWRnZS5TcGFmO1xyXG5cclxubmFtZXNwYWNlIGF3ZXNvbWVhcHAuc3BhZi5WaWV3TW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIb21lVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcclxucHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKVxyXG57XHJcbiAgICByZXR1cm4gU3BhZkFwcC5Ib21lSWQ7XHJcbn1cclxuICAgICAgICBwdWJsaWMgSG9tZVZpZXdNb2RlbChJTmF2aWdhdG9yIG5hdmlnYXRvciwgSU1lc3NlbmdlciBtZXNzZW5nZXIsIEluY3JlbWVudFZpZXdNb2RlbCBpbmNyZW1lbnRDb21wb25lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcclxuICAgICAgICAgICAgdGhpcy5QYXJ0aWFscy5BZGQoaW5jcmVtZW50Q29tcG9uZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEdvVG9TZWNvbmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuU2Vjb25kSWQsIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInByb3ZhXCIsXCJDaWFvIVwiKTtyZXR1cm4gX28xO30pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dBbGVydEZyb21Bbm90aGVyQ2xhc3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlNlbmQ8Z2xvYmFsOjphd2Vzb21lYXBwLnNwYWYuVmlld01vZGVscy5Ib21lVmlld01vZGVsLHN0cmluZz4odGhpcyxTcGFmQXBwLk1lc3NhZ2VzLkFsZXJ0LFwiU3BhZiBNZXNzZW5nZXIhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxudXNpbmcgQnJpZGdlLlNwYWY7XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgYXdlc29tZWFwcC5zcGFmLlZpZXdNb2RlbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNlY29uZFZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXHJcbiAgICB7XHJcbnB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKClcclxue1xyXG4gICAgcmV0dXJuIFNwYWZBcHAuU2Vjb25kSWQ7XHJcbn1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwYXNzZWRQYXJhbSA9IHBhcmFtZXRlcnMuR2V0UGFyYW1ldGVyPHN0cmluZz4oXCJwcm92YVwiKTtcclxuICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoc3RyaW5nLkZvcm1hdChcIkFsbGEgcGFnaW5hIMOoIHN0YXRvIHBhc3NhdG8gezB9XCIscGFzc2VkUGFyYW0pKTtcclxuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBPbkxlYXZlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwiQWRpb3Mgc2Vjb25kYSBwYWdpbmFcIik7XHJcbiAgICAgICAgICAgIGJhc2UuT25MZWF2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb24uTW9kZWw7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nIDogQnJpZGdlTmF2aWdhdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQnJvd3Nlckhpc3RvcnlNYW5hZ2VyIF9icm93c2VySGlzdG9yeU1hbmFnZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCcmlkZ2VOYXZpZ2F0b3JXaXRoUm91dGluZyhJTmF2aWdhdG9yQ29uZmlndXJhdG9yIGNvbmZpZ3VyYXRpb24sIElCcm93c2VySGlzdG9yeU1hbmFnZXIgYnJvd3Nlckhpc3RvcnlNYW5hZ2VyKSA6IGJhc2UoY29uZmlndXJhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9icm93c2VySGlzdG9yeU1hbmFnZXIgPSBicm93c2VySGlzdG9yeU1hbmFnZXI7XHJcbiAgICAgICAgICAgIFdpbmRvdy5PblBvcFN0YXRlICs9IGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHVybEluZm8gPSBfYnJvd3Nlckhpc3RvcnlNYW5hZ2VyLlBhcnNlVXJsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlV2l0aG91dFB1c2hTdGF0ZShzdHJpbmcuSXNOdWxsT3JFbXB0eSh1cmxJbmZvLlBhZ2VJZCkgPyBjb25maWd1cmF0aW9uLkhvbWVJZCA6IHVybEluZm8uUGFnZUlkLCB1cmxJbmZvLlBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE5hdmlnYXRlV2l0aG91dFB1c2hTdGF0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTmF2aWdhdGUocGFnZUlkLCBwYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTmF2aWdhdGUoc3RyaW5nIHBhZ2VJZCwgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycyA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYnJvd3Nlckhpc3RvcnlNYW5hZ2VyLlB1c2hTdGF0ZShwYWdlSWQscGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIGJhc2UuTmF2aWdhdGUocGFnZUlkLCBwYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEluaXROYXZpZ2F0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBwYXJzZWQgPSBfYnJvd3Nlckhpc3RvcnlNYW5hZ2VyLlBhcnNlVXJsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkocGFyc2VkLlBhZ2VJZCkpXHJcbiAgICAgICAgICAgICAgICBiYXNlLkluaXROYXZpZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmFzZS5FbmFibGVTcGFmQW5jaG9ycygpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwYWdlID0gdGhpcy5Db25maWd1cmF0aW9uLkdldFBhZ2VEZXNjcmlwdG9yQnlLZXkocGFyc2VkLlBhZ2VJZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFnZSA9PSBudWxsKSB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJQYWdlIG5vdCBmb3VuZCB3aXRoIElEIHswfVwiLHBhcnNlZC5QYWdlSWQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBub3QgbnVsbCBhbmQgZXZhbHVhdGlvbiBpcyBmYWxzZSBmYWxsYmFjayB0byBob21lXHJcbiAgICAgICAgICAgICAgICBpZiAocGFnZS5DYW5CZURpcmVjdExvYWQgIT0gbnVsbCAmJiAhcGFnZS5DYW5CZURpcmVjdExvYWQuSW52b2tlKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2Jyb3dzZXJIaXN0b3J5TWFuYWdlci5QdXNoU3RhdGUodGhpcy5Db25maWd1cmF0aW9uLkhvbWVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZVdpdGhvdXRQdXNoU3RhdGUodGhpcy5Db25maWd1cmF0aW9uLkhvbWVJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZShwYXJzZWQuUGFnZUlkLHBhcnNlZC5QYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgYXdlc29tZWFwcC5zcGFmLlZpZXdNb2RlbHM7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuU3BhZlxyXG57XHJcbiAgICBjbGFzcyBDdXN0b21Sb3V0ZXNDb25maWcgOiBCcmlkZ2VOYXZpZ2F0b3JDb25maWdCYXNlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIElMaXN0PElQYWdlRGVzY3JpcHRvcj4gQ3JlYXRlUm91dGVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgTGlzdDxJUGFnZURlc2NyaXB0b3I+KCksKF9vMSk9PntfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvciBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+XCJwYWdlcy9ob21lLmh0bWxcIiwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5Ib21lSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPEhvbWVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PlwicGFnZXMvc2Vjb25kLmh0bWxcIiwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5TZWNvbmRJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8U2Vjb25kVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGpRdWVyeSBCb2R5IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEhvbWVJZCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRGlzYWJsZUF1dG9TcGFmQW5jaG9yc09uTmF2aWdhdGUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICBcbnByaXZhdGUgalF1ZXJ5IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Cb2R5PWpRdWVyeS5TZWxlY3QoXCIjcGFnZUJvZHlcIik7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0hvbWVJZD1TcGFmQXBwLkhvbWVJZDtwcml2YXRlIGJvb2wgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0Rpc2FibGVBdXRvU3BhZkFuY2hvcnNPbk5hdmlnYXRlPWZhbHNlO31cclxufVxyXG4iXQp9Cg==
