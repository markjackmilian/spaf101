/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.2.0
 */
Bridge.assembly("awesomeapp.test", function ($asm, globals) {
    "use strict";

    Bridge.define("awesomeapp.test.FakeNavigator", {
        inherits: [Bridge.Navigation.INavigator],
        fields: {
            LastNavigateController: null,
            Called: 0
        },
        events: {
            OnNavigated: null
        },
        alias: [
            "addOnNavigated", "Bridge$Navigation$INavigator$addOnNavigated",
            "removeOnNavigated", "Bridge$Navigation$INavigator$removeOnNavigated",
            "LastNavigateController", "Bridge$Navigation$INavigator$LastNavigateController",
            "InitNavigation", "Bridge$Navigation$INavigator$InitNavigation",
            "EnableSpafAnchors", "Bridge$Navigation$INavigator$EnableSpafAnchors",
            "Navigate", "Bridge$Navigation$INavigator$Navigate"
        ],
        methods: {
            InitNavigation: function () {
                throw new System.NotImplementedException.ctor();
            },
            EnableSpafAnchors: function () {
                throw new System.NotImplementedException.ctor();
            },
            Navigate: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                this.Called = (this.Called + 1) | 0;
            }
        }
    });

    Bridge.define("awesomeapp.test.HomeViewModelTest", {
        methods: {
            WhenGoToSecondIsFiredNavigationInCalled: function () {
                var nav = new awesomeapp.test.FakeNavigator();
                var homeModel = new awesomeapp.spaf.ViewModels.HomeViewModel(nav, null, null);
                homeModel.GoToSecond();
                Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Int32, nav.Called, 1);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.App", {
        main: function Main () {
            var $step = 0,
                $task1, 
                $jumpFromFinally, 
                runner, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    for (;;) {
                        $step = System.Array.min([0,1], $step);
                        switch ($step) {
                            case 0: {
                                runner = new Bridge.EasyTests.Runner();
                                $task1 = runner.Run();
                                $step = 1;
                                $task1.continueWith($asyncBody, true);
                                return;
                            }
                            case 1: {
                                $task1.getAwaitedResult();
                                return;
                            }
                            default: {
                                return;
                            }
                        }
                    }
                }, arguments);

            $asyncBody();
        }
    });

    /**
     * @memberof System
     * @callback System.Func
     * @return  {boolean}
     */

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Action
     * @return  {void}
     */

    Bridge.define("Bridge.EasyTests.Asserts.EasyAsserts", {
        statics: {
            methods: {
                /**
                 * Assert that action must throw a specific exception
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @throws 
                 * @param   {Function}         T         
                 * @param   {System.Action}    action
                 * @return  {void}
                 */
                Throws: function (T, action) {
                    try {
                        action();
                        throw new Bridge.EasyTests.Exceptions.ThrowsException(System.String.format("Expected Exception: {0}. No Excpetion Throwed!", [Bridge.Reflection.getTypeName(T)]));
                    }
                    catch ($e1) {
                        $e1 = System.Exception.create($e1);
                        var expected, e;
                        if (Bridge.is($e1, T)) {
                            expected = $e1;
                        } else {
                            e = $e1;
                            throw new Bridge.EasyTests.Exceptions.ThrowsException(System.String.format("Exception of type: {0} instead of Expected Exception: {1}", Bridge.Reflection.getTypeName(Bridge.getType(e)), Bridge.Reflection.getTypeName(T)));
                        }
                    }
                },
                /**
                 * Assert that two object are equal
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    obj       
                 * @param   {System.Object}    second
                 * @return  {void}
                 */
                AreEqual: function (obj, second) {
                    Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Object, obj, second);
                },
                /**
                 * Assert that two object are not equal
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    obj       
                 * @param   {System.Object}    second
                 * @return  {void}
                 */
                AreNotEqual: function (obj, second) {
                    Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(System.Object, obj, second);
                },
                /**
                 * Test a expected to be true condition
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @throws 
                 * @param   {System.Func}    expectesTrueCondition
                 * @return  {void}
                 */
                ShouldBeTrue: function (expectesTrueCondition) {
                    var res = expectesTrueCondition();
                    if (!res) {
                        throw new Bridge.EasyTests.Exceptions.BeTrueException(System.String.format(System.String.format("Condition expected to be true but result is FALSE.", null), null));
                    }
                },
                /**
                 * Test a expected to be false condition
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @throws 
                 * @param   {System.Func}    expectesFalseCondition
                 * @return  {void}
                 */
                ShouldBeFalse: function (expectesFalseCondition) {
                    var res = expectesFalseCondition();
                    if (res) {
                        throw new Bridge.EasyTests.Exceptions.BeFalseException(System.String.format(System.String.format("Condition expected to be false but result is TRUE.", null), null));
                    }
                },
                /**
                 * COmpare obj
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    o1    
                 * @param   {System.Object}    o2
                 * @return  {boolean}
                 */
                ObjectEqual: function (o1, o2) {
                    if (o1 == null && o2 != null) {
                        return false;
                    }
                    if (o1 != null && o2 == null) {
                        return false;
                    }

                    return o1 == null || Bridge.equals(o1, o2);
                },
                /**
                 * If obj is null return 'null' else tostring
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.EasyAsserts
                 * @memberof Bridge.EasyTests.Asserts.EasyAsserts
                 * @param   {System.Object}    obj
                 * @return  {string}
                 */
                ToCompareString: function (obj) {
                    return obj == null ? "null" : Bridge.toString(obj);
                }
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Asserts.ShouldExtensions", {
        statics: {
            methods: {
                /**
                 * Test equals
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.ShouldExtensions
                 * @memberof Bridge.EasyTests.Asserts.ShouldExtensions
                 * @param   {Function}    T            
                 * @param   {T}           obj          
                 * @param   {T}           secondObj
                 * @return  {void}
                 */
                ShouldBeEquals: function (T, obj, secondObj) {
                    var equal = Bridge.EasyTests.Asserts.EasyAsserts.ObjectEqual(obj, secondObj);

                    if (!equal) {
                        throw new Bridge.EasyTests.Exceptions.EqualException(System.String.format(System.String.format("Expected {0}. Value: {1}", Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(secondObj), Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(obj)), null));
                    }

                },
                /**
                 * Test not equals
                 *
                 * @static
                 * @public
                 * @this Bridge.EasyTests.Asserts.ShouldExtensions
                 * @memberof Bridge.EasyTests.Asserts.ShouldExtensions
                 * @param   {Function}    T            
                 * @param   {T}           obj          
                 * @param   {T}           secondObj
                 * @return  {void}
                 */
                ShouldBeNotEquals: function (T, obj, secondObj) {
                    var equal = Bridge.EasyTests.Asserts.EasyAsserts.ObjectEqual(obj, secondObj);

                    if (equal) {
                        throw new Bridge.EasyTests.Exceptions.NotEqualException(System.String.format(System.String.format("Expected {0} different from {1}. Are Equal!", Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(secondObj), Bridge.EasyTests.Asserts.EasyAsserts.ToCompareString(obj)), null));
                    }

                }
            }
        }
    });

    /** @namespace Bridge.EasyTests.Attributes */

    /**
     * Attribute for test class
     *
     * @public
     * @class Bridge.EasyTests.Attributes.TestAttribute
     * @augments System.Attribute
     */
    Bridge.define("Bridge.EasyTests.Attributes.TestAttribute", {
        inherits: [System.Attribute],
        fields: {
            Description: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Attribute.ctor.call(this);

            },
            $ctor1: function (description) {
                this.$initialize();
                System.Attribute.ctor.call(this);
                this.Description = description;
            }
        }
    });

    /**
     * Attribute for test Method
     *
     * @public
     * @class Bridge.EasyTests.Attributes.TestMethodAttribute
     * @augments System.Attribute
     */
    Bridge.define("Bridge.EasyTests.Attributes.TestMethodAttribute", {
        inherits: [System.Attribute],
        fields: {
            Description: null
        },
        ctors: {
            ctor: function (description) {
                if (description === void 0) { description = null; }

                this.$initialize();
                System.Attribute.ctor.call(this);
                this.Description = description;
            }
        }
    });

    /** @namespace Bridge.EasyTests */

    /**
     * Manage a collection of item
     Automatically sync collection with dom
     *
     * @abstract
     * @class Bridge.EasyTests.CollectionManager$1
     * @param   {Function}    [name]
     */
    Bridge.define("Bridge.EasyTests.CollectionManager$1", function (T) { return {
        fields: {
            /**
             * Items collection
             *
             * @instance
             * @public
             * @readonly
             * @memberof Bridge.EasyTests.CollectionManager$1
             * @type System.Collections.Generic.List$1
             */
            Items: null
        },
        props: {
            Count: {
                get: function () {
                    return this.Items.Count;
                }
            }
        },
        ctors: {
            init: function () {
                this.Items = new (System.Collections.Generic.List$1(System.Tuple$2(T,System.Collections.Generic.List$1(HTMLElement)))).ctor();
            }
        },
        methods: {
            getItem: function (index) {
                return this.Items.getItem(index);
            },
            setItem: function (index, value) {
                this.Items.setItem(index, value);
            },
            /**
             * Called when the new HTMLElement is generated.
             Default is AppendChild to Container.
             *
             * @instance
             * @protected
             * @this Bridge.EasyTests.CollectionManager$1
             * @memberof Bridge.EasyTests.CollectionManager$1
             * @param   {System.Tuple$2}    addedElement
             * @return  {void}
             */
            DomActionOnAdd: function (addedElement) {
                addedElement.Item2.ForEach(Bridge.fn.bind(this, function (f) {
                    this.Container.appendChild(f);
                }));
            },
            AddRange: function (items) {
                var $t;
                $t = Bridge.getEnumerator(items, T);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        this.Add(item);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            Add: function (item) {
                var internalItem = { Item1: item, Item2: this.GenerateElement(item) };
                this.Items.add(internalItem);

                this.DomActionOnAdd(internalItem);
            },
            Clear: function () {
                var $t;
                $t = Bridge.getEnumerator(this.Items);
                try {
                    while ($t.moveNext()) {
                        var tuple = $t.Current;
                        tuple.Item2.ForEach(Bridge.fn.bind(this, function (f) {
                            this.Container.removeChild(f);
                        }));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.Items.clear();
            },
            Contains: function (item) {
                return System.Linq.Enumerable.from(this.Items, Bridge.global.System.Tuple$2(T,System.Collections.Generic.List$1(HTMLElement))).select(function (s) {
                        return s.Item1;
                    }).contains(item);
            },
            Remove: function (item) {
                if (!this.Contains(item)) {
                    return false;
                }

                var internalItem = System.Linq.Enumerable.from(this.Items, Bridge.global.System.Tuple$2(T,System.Collections.Generic.List$1(HTMLElement))).first(function (f) {
                        return Bridge.equals(f.Item1, item);
                    });

                internalItem.Item2.ForEach(Bridge.fn.bind(this, function (f) {
                    this.Container.removeChild(f);
                }));

                var res = this.Items.remove(internalItem);

                return res;
            },
            IndexOf: function (item) {
                try {
                    return this.Items.indexOf(System.Linq.Enumerable.from(this.Items, Bridge.global.System.Tuple$2(T,System.Collections.Generic.List$1(HTMLElement))).first(function (f) {
                            return Bridge.equals(f.Item1, item);
                        }));
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    return -1;
                }
            }
        }
    }; });

    Bridge.define("Bridge.EasyTests.Exceptions.EasyTestBaseException", {
        inherits: [System.Exception],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                System.Exception.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Runner", {
        fields: {
            _internalTests: null,
            _runnerViewModel: null
        },
        ctors: {
            init: function () {
                this._internalTests = new (System.Collections.Generic.List$1(Bridge.EasyTests.TestDescriptor)).ctor();
            },
            ctor: function () {
                this.$initialize();
                this._runnerViewModel = new Bridge.EasyTests.RunnerViewModel();
                this._runnerViewModel.BrowserInfo = Bridge.global.navigator.appVersion;
            }
        },
        methods: {
            /**
             * Run tests
             *
             * @instance
             * @public
             * @this Bridge.EasyTests.Runner
             * @memberof Bridge.EasyTests.Runner
             * @return  {System.Threading.Tasks.Task}
             */
            Run: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this._runnerViewModel.Running = true;

                                        this.DiscoverTest();

                                        this._runnerViewModel.TotalTests = this._internalTests.Count;
                                        $task1 = this.RunTests();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        this._runnerViewModel.Running = false;
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            /**
             * Run
             *
             * @instance
             * @private
             * @this Bridge.EasyTests.Runner
             * @memberof Bridge.EasyTests.Runner
             * @return  {System.Threading.Tasks.Task}
             */
            RunTests: function () {
                this._internalTests.ForEach(Bridge.fn.bind(this, function (f) {
                    var $step = 0,
                        $task1, 
                        f, 
                        $jumpFromFinally, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = f.RunTest();
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        this._runnerViewModel.Tests.Add(f);
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
                return System.Threading.Tasks.Task.fromResult(0, System.Int32);
            },
            /**
             * Discovery all tests
             *
             * @instance
             * @private
             * @this Bridge.EasyTests.Runner
             * @memberof Bridge.EasyTests.Runner
             * @return  {void}
             */
            DiscoverTest: function () {
                var types = System.Linq.Enumerable.from(System.AppDomain.getAssemblies(), Bridge.global.System.Reflection.Assembly).selectMany(function (s) {
                        return Bridge.Reflection.getAssemblyTypes(s);
                    }).where(function (w) {
                    return !System.String.startsWith(Bridge.Reflection.getTypeFullName(w).toLowerCase(), "system");
                }).where(function (w) {
                    return !Bridge.Reflection.isInterface(w) && !Bridge.Reflection.isAbstract(w);
                }).where(function (w) {
                    return System.Linq.Enumerable.from(Bridge.Reflection.getAttributes(w, Bridge.EasyTests.Attributes.TestAttribute, true), System.Object).any();
                }).toList(System.Type);

                types.ForEach(Bridge.fn.bind(this, function (f) {
                    var testAtt = Bridge.cast(System.Linq.Enumerable.from(Bridge.Reflection.getAttributes(f, Bridge.EasyTests.Attributes.TestAttribute, true), System.Object).first(), Bridge.EasyTests.Attributes.TestAttribute);


                    var testMethods = System.Linq.Enumerable.from(Bridge.Reflection.getMembers(f, 8, 28), Bridge.global.System.Reflection.MethodInfo).where(function (w) {
                            return (w.a === 2);
                        }).where(function (w) {
                        return System.Linq.Enumerable.from(System.Attribute.getCustomAttributes(w, Bridge.EasyTests.Attributes.TestMethodAttribute, true), System.Object).any();
                    }).toList(System.Reflection.MethodInfo);

                    testMethods.ForEach(Bridge.fn.bind(this, function (method) {
                        var $t;
                        var attr = Bridge.cast(System.Linq.Enumerable.from(System.Attribute.getCustomAttributes(method, Bridge.EasyTests.Attributes.TestMethodAttribute, true), System.Object).first(), Bridge.EasyTests.Attributes.TestMethodAttribute);

                        var testDescr = ($t = new Bridge.EasyTests.TestDescriptor(), $t.Type = f, $t.Method = method, $t.Group = Bridge.Reflection.getTypeName(f), $t.GroupDescription = System.String.isNullOrEmpty(testAtt.Description) ? "" : testAtt.Description, $t.Name = method.n, $t.NameDescription = System.String.isNullOrEmpty(attr.Description) ? "" : attr.Description, $t);

                        this._internalTests.add(testDescr);

                        testDescr.addOnTestComplete(Bridge.fn.cacheBind(this, this.TestDescrOnOnTestComplete));
                    }));

                }));
            },
            TestDescrOnOnTestComplete: function (sender, eventArgs) {
                var completedTest = System.Linq.Enumerable.from(this._internalTests, Bridge.EasyTests.TestDescriptor).where(function (w) {
                        return w.Completed;
                    });
                this._runnerViewModel.FailedTests = completedTest.count(function (c) {
                    return !c.Success;
                });
                this._runnerViewModel.PassedTests = completedTest.count(function (c) {
                    return c.Success;
                });
                this._runnerViewModel.TotalTime = System.Linq.Enumerable.from(this._runnerViewModel.Tests.Items, Bridge.global.System.Tuple$2(Bridge.EasyTests.TestDescriptor,System.Collections.Generic.List$1(HTMLElement))).sum(function (s) {
                        return s.Item1.Time;
                    });
                if (System.Linq.Enumerable.from(this._internalTests, Bridge.EasyTests.TestDescriptor).count() === completedTest.count()) {
                    this._runnerViewModel.SetAllTestRunned();
                }
            }
        }
    });

    Bridge.define("Bridge.EasyTests.RunnerViewModel", {
        fields: {
            _totalTests: null,
            _passedTests: null,
            _failedTests: null,
            _totalTime: null,
            _browserInfo: null,
            _loader: null,
            Tests: null,
            HidePassed: null
        },
        props: {
            /**
             * Test are running
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function Running
             * @type boolean
             */
            Running: {
                set: function (value) {
                    this._loader.hidden = !value;
                }
            },
            /**
             * Total tests
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function TotalTests
             * @type number
             */
            TotalTests: {
                set: function (value) {
                    this._totalTests.innerHTML = System.String.format("{0} tests", [Bridge.box(value, System.Int32)]);
                }
            },
            /**
             * Passed tests count
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function PassedTests
             * @type number
             */
            PassedTests: {
                set: function (value) {
                    this._passedTests.innerHTML = System.String.format("{0} passed", [Bridge.box(value, System.Int32)]);
                }
            },
            /**
             * Failed tests count
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function FailedTests
             * @type number
             */
            FailedTests: {
                set: function (value) {
                    this._failedTests.innerHTML = System.String.format("{0} failed", [Bridge.box(value, System.Int32)]);
                }
            },
            /**
             * Total time
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function TotalTime
             * @type number
             */
            TotalTime: {
                set: function (value) {
                    this._totalTime.innerHTML = System.String.format("Tests completed in {0} ms", [Bridge.box(value, System.Int32)]);
                }
            },
            /**
             * Browser info
             *
             * @instance
             * @public
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @function BrowserInfo
             * @type string
             */
            BrowserInfo: {
                set: function (value) {
                    this._browserInfo.innerHTML = value;
                }
            }
        },
        ctors: {
            init: function () {
                this._totalTests = document.getElementById("totalTests");
                this._passedTests = document.getElementById("passedTests");
                this._failedTests = document.getElementById("failedTests");
                this._totalTime = document.getElementById("totalTime");
                this._browserInfo = document.getElementById("browserInfo");
                this._loader = document.getElementById("loader");
                this.Tests = new Bridge.EasyTests.TestsCollectionManager();
            },
            ctor: function () {
                this.$initialize();
                var hidePassed = document.getElementById("hidePassedTests");
                hidePassed.onchange = Bridge.fn.combine(hidePassed.onchange, function (e) {
                    var $t;
                    var isChecked = hidePassed.checked;
                    var toHide = document.getElementsByClassName("passedTest");
                    $t = Bridge.getEnumerator(toHide, "getEnumerator");
                    try {
                        while ($t.moveNext()) {
                            var htmlElement = $t.Current;
                            htmlElement.hidden = isChecked;
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }});
            }
        },
        methods: {
            /**
             * Set all test completed
             *
             * @instance
             * @public
             * @this Bridge.EasyTests.RunnerViewModel
             * @memberof Bridge.EasyTests.RunnerViewModel
             * @return  {void}
             */
            SetAllTestRunned: function () {
                this.Running = false;
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Test", {
        fields: {
            MethodInfo: null,
            Time: null,
            Name: null
        }
    });

    Bridge.define("Bridge.EasyTests.TestDescriptor", {
        fields: {
            Completed: false,
            Name: null,
            NameDescription: null,
            Group: null,
            GroupDescription: null,
            Type: null,
            Method: null,
            FailAssert: null,
            Time: 0
        },
        events: {
            OnTestComplete: null
        },
        props: {
            Success: {
                get: function () {
                    return this.FailAssert == null;
                }
            },
            Error: {
                get: function () {
                    return this.FailAssert == null ? "" : System.String.format("{0}: {1}", Bridge.Reflection.getTypeName(Bridge.getType(this.FailAssert)), this.FailAssert.Message);
                }
            },
            Stack: {
                get: function () {
                    var $t;
                    return ($t = this.FailAssert) != null ? $t.StackTrace : null;
                }
            }
        },
        methods: {
            /**
             * Run test.
             *
             * @instance
             * @public
             * @this Bridge.EasyTests.TestDescriptor
             * @memberof Bridge.EasyTests.TestDescriptor
             * @return  {System.Threading.Tasks.Task}
             */
            RunTest: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    isTask, 
                    instance, 
                    watch, 
                    e, 
                    $async_e, 
                    disposable, 
                    $async_e1, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5,6,7,8], $step);
                                switch ($step) {
                                    case 0: {
                                        isTask = Bridge.referenceEquals(this.Method.rt, System.Threading.Tasks.Task);

                                        instance = Bridge.createInstance(this.Type);

                                        watch = new System.Diagnostics.Stopwatch();
                                        watch.start();

                                        
                                        $step = 1;
                                        continue;
                                    }
                                    case 1: {
                                        if (isTask) {
                                            $step = 2;
                                            continue;
                                        } else  {
                                            $step = 4;
                                            continue;
                                        }
                                    }
                                    case 2: {
                                        $task1 = Bridge.cast(Bridge.Reflection.midel(this.Method, Bridge.unbox(instance))(null), System.Threading.Tasks.Task);
                                        $step = 3;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $task1.getAwaitedResult();
                                        $step = 5;
                                        continue;
                                    }
                                    case 4: {
                                        Bridge.Reflection.midel(this.Method, Bridge.unbox(instance))(null);
                                        $step = 5;
                                        continue;
                                    }
                                    case 5: {
                                        $step = 7;
                                        continue;
                                    }
                                    case 6: {
                                        this.FailAssert = e;
                                        $async_e = null;
                                        $step = 7;
                                        continue;
                                    }
                                    case 7: {
                                        watch.stop();
                                        this.Time = System.Int64.clip32(watch.milliseconds());
                                        this.Completed = true;
                                        !Bridge.staticEquals(this.OnTestComplete, null) ? this.OnTestComplete(this, null) : null;

                                        disposable = Bridge.as(instance, System.IDisposable);
                                        disposable != null ? disposable.System$IDisposable$Dispose() : null;

                                        if ($jumpFromFinally > -1) {
                                            $step = $jumpFromFinally;
                                            $jumpFromFinally = null;
                                        } else if ($async_e) {
                                            $tcs.setException($async_e);
                                            return;
                                        } else if (Bridge.isDefined($returnValue)) {
                                            $tcs.setResult($returnValue);
                                            return;
                                        }
                                        $step = 8;
                                        continue;
                                    }
                                    case 8: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            if ( $step >= 1 && $step <= 5 ) {
                                e = $async_e;
                                $step = 6;
                                $asyncBody();
                                return;
                            }
                            if ($step >= 1 && $step <= 6) {
                                $step = 7;
                                $asyncBody();
                                return;
                            }
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.BeFalseException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.BeTrueException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.EqualException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.NotEqualException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.Exceptions.ThrowsException", {
        inherits: [Bridge.EasyTests.Exceptions.EasyTestBaseException],
        ctors: {
            ctor: function (message) {
                this.$initialize();
                Bridge.EasyTests.Exceptions.EasyTestBaseException.ctor.call(this, message);
            }
        }
    });

    Bridge.define("Bridge.EasyTests.TestsCollectionManager", {
        inherits: [Bridge.EasyTests.CollectionManager$1(Bridge.EasyTests.TestDescriptor)],
        fields: {
            _count: 0,
            Container: null
        },
        ctors: {
            init: function () {
                this._count = 0;
                this.Container = document.getElementById("tableTestsList");
            }
        },
        methods: {
            GenerateElement: function (item) {
                var $t;
                var res = new (System.Collections.Generic.List$1(HTMLElement)).ctor();

                var row1 = document.createElement("tr");


                row1.classList.add(this._count % 2 === 0 ? "whiteRow" : "greyRow");
                if (item.Success) {
                    row1.classList.add("passedTest");
                }

                var cell1 = row1.insertCell();
                var cell2 = row1.insertCell();
                var cell3 = row1.insertCell();

                cell1.className = item.Success ? "test-ok" : "test-ko";
                cell1.appendChild(($t = document.createElement("strong"), $t.innerHTML = System.String.format("{0} {1}", Bridge.box(((this._count + 1) | 0), System.Int32), item.Name), $t));


                cell1.appendChild(document.createElement("br"));

                cell1.appendChild(($t = document.createElement("i"), $t.innerHTML = System.String.format(" {0}", [item.NameDescription]), $t.className = "w3-text-grey", $t));

                cell2.appendChild(($t = document.createElement("i"), $t.className = "fa fa-object-group", $t));

                cell2.appendChild(($t = document.createElement("span"), $t.innerHTML = System.String.format("{0}", [item.Group]), $t));

                cell2.appendChild(document.createElement("br"));


                cell2.appendChild(($t = document.createElement("i"), $t.innerHTML = System.String.format(" {0}", [item.GroupDescription]), $t.className = "w3-text-grey", $t));

                cell3.className = "w3-right";
                cell3.appendChild(($t = document.createElement("i"), $t.className = "fa fa-clock-o", $t));

                cell3.appendChild(($t = document.createElement("span"), $t.innerHTML = System.String.format("{0} ms", [Bridge.box(item.Time, System.Int32)]), $t));

                this._count = (this._count + 1) | 0;
                res.add(row1);

                if (item.Success) {
                    return res;
                }

                var row2 = document.createElement("tr");

                row2.className = this._count % 2 === 0 ? "whiteRow" : "greyRow";
                var cell = row2.insertCell();

                cell.colSpan = 3;
                cell.className = "test-ko inner-row";

                cell.appendChild(($t = document.createElement("p"), $t.className = "error-message", $t)).appendChild(($t = document.createElement("i"), $t.className = "w3-text-grey", $t.innerHTML = item.Error, $t));

                cell.appendChild(($t = document.createElement("pre"), $t.innerHTML = item.Stack, $t));

                res.add(row2);

                return res;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJhd2Vzb21lYXBwLnRlc3QuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkhvbWVWaWV3TW9kZWxUZXN0LmNzIiwiRWFzeVRlc3RzL0FwcC5jcyIsIkVhc3lUZXN0cy9Bc3NlcnRzL0Vhc3lBc3NlcnRzLmNzIiwiRWFzeVRlc3RzL0Fzc2VydHMvU2hvdWxkRXh0ZW5zaW9ucy5jcyIsIkVhc3lUZXN0cy9BdHRyaWJ1dGVzL1Rlc3RBdHRyaWJ1dGUuY3MiLCJFYXN5VGVzdHMvQXR0cmlidXRlcy9UZXN0TWV0aG9kQXR0cmlidXRlLmNzIiwiRWFzeVRlc3RzL0NvbGxlY3Rpb25NYW5hZ2VyLmNzIiwiRWFzeVRlc3RzL0V4Y2VwdGlvbnMvRWFzeVRlc3RCYXNlRXhjZXB0aW9uLmNzIiwiRWFzeVRlc3RzL1J1bm5lci5jcyIsIkVhc3lUZXN0cy9SdW5uZXJWaWV3TW9kZWwuY3MiLCJFYXN5VGVzdHMvVGVzdERlc2NyaXB0b3IuY3MiLCJFYXN5VGVzdHMvRXhjZXB0aW9ucy9CZUZhbHNlRXhjZXB0aW9uLmNzIiwiRWFzeVRlc3RzL0V4Y2VwdGlvbnMvQmVUcnVlRXhjZXB0aW9uLmNzIiwiRWFzeVRlc3RzL0V4Y2VwdGlvbnMvRXF1YWxFeGNlcHRpb24uY3MiLCJFYXN5VGVzdHMvRXhjZXB0aW9ucy9Ob3RFcXVhbEV4Y2VwdGlvbi5jcyIsIkVhc3lUZXN0cy9FeGNlcHRpb25zL1Rocm93c0V4Y2VwdGlvbi5jcyIsIkVhc3lUZXN0cy9UZXN0c0NvbGxlY3Rpb25NYW5hZ2VyLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBNkJZQSxNQUFNQSxJQUFJQTs7O2dCQUtWQSxNQUFNQSxJQUFJQTs7Z0NBR09BLFFBQWVBOztnQkFFaENBOzs7Ozs7OztnQkF4QkFBLFVBQVVBLElBQUlBO2dCQUNkQSxnQkFBZ0JBLElBQUlBLHlDQUFjQSxLQUFJQSxNQUFNQTtnQkFDNUNB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OztnQkFFekJBLFdBQVdBOztnQkFFWEEsaUJBQWlCQTtnQkFDakJBLFdBQVdBOztnQkFFWEE7Z0JBQ0FBOztnQkFFQUEsaUJBQWlCQSxvRkFHRkEsaUZBR0NBOztnQkFHaEJBLGlCQUFpQkEsb0RBRURBOztnQkFHaEJBLFFBQVFBOztnQkFFUkEsT0FBT0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBhd2Vzb21lYXBwLnNwYWYuVmlld01vZGVscztcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cztcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xuXG5uYW1lc3BhY2UgYXdlc29tZWFwcC50ZXN0XG57XG4gICAgW1Rlc3QoXCJUZXN0IGhvbWV2aWV3bW9kZWxcIildXG4gICAgcHVibGljIGNsYXNzIEhvbWVWaWV3TW9kZWxUZXN0XG4gICAge1xuICAgICAgICBbVGVzdE1ldGhvZChcIldoZW4gR29Ub1NlY29uZCBmaXJlZCBuYXZpZ2F0b3IgaXMgY2FsbGVkXCIpXVxuICAgICAgICBwdWJsaWMgdm9pZCBXaGVuR29Ub1NlY29uZElzRmlyZWROYXZpZ2F0aW9uSW5DYWxsZWQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbmF2ID0gbmV3IEZha2VOYXZpZ2F0b3IoKTtcbiAgICAgICAgICAgIHZhciBob21lTW9kZWwgPSBuZXcgSG9tZVZpZXdNb2RlbChuYXYsbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBob21lTW9kZWwuR29Ub1NlY29uZCgpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8aW50PiggICAgICAgICAgICBcbiAgICAgICAgICAgIG5hdi5DYWxsZWQsMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBGYWtlTmF2aWdhdG9yIDogSU5hdmlnYXRvclxuICAgIHtcbiAgICAgICAgcHVibGljIGV2ZW50IEV2ZW50SGFuZGxlcjxJQW1Mb2FkYWJsZT4gT25OYXZpZ2F0ZWQ7XG4gICAgICAgIHB1YmxpYyBJQW1Mb2FkYWJsZSBMYXN0TmF2aWdhdGVDb250cm9sbGVyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0TmF2aWdhdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgRW5hYmxlU3BhZkFuY2hvcnMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIE5hdmlnYXRlKHN0cmluZyBwYWdlSWQsIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkNhbGxlZCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGludCBDYWxsZWQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG4gICAgfVxufSIsIlxyXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhc3luYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHJ1bm5lciA9IG5ldyBSdW5uZXIoKTtcclxuICAgICAgICAgICAgYXdhaXQgcnVubmVyLlJ1bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0c1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEVhc3lBc3NlcnRzXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBc3NlcnQgdGhhdCBhY3Rpb24gbXVzdCB0aHJvdyBhIHNwZWNpZmljIGV4Y2VwdGlvblxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWN0aW9uXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8ZXhjZXB0aW9uIGNyZWY9XCJFYXN5VGVzdEJhc2VFeGNlcHRpb25cIj48L2V4Y2VwdGlvbj5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgVGhyb3dzPFQ+KEFjdGlvbiBhY3Rpb24pIHdoZXJlIFQgOiBFeGNlcHRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUaHJvd3NFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIkV4cGVjdGVkIEV4Y2VwdGlvbjogezB9LiBObyBFeGNwZXRpb24gVGhyb3dlZCFcIix0eXBlb2YoVCkuTmFtZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChUIGV4cGVjdGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBva1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChFeGNlcHRpb24gZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRocm93c0V4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiRXhjZXB0aW9uIG9mIHR5cGU6IHswfSBpbnN0ZWFkIG9mIEV4cGVjdGVkIEV4Y2VwdGlvbjogezF9XCIsZS5HZXRUeXBlKCkuTmFtZSx0eXBlb2YoVCkuTmFtZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBc3NlcnQgdGhhdCB0d28gb2JqZWN0IGFyZSBlcXVhbFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRcIj48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBBcmVFcXVhbChvYmplY3Qgb2JqLCBvYmplY3Qgc2Vjb25kKVxyXG4gICAgICAgIHtcclxuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8b2JqZWN0PiggICAgICAgICAgICBvYmosc2Vjb25kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBc3NlcnQgdGhhdCB0d28gb2JqZWN0IGFyZSBub3QgZXF1YWxcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9ialwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2Vjb25kXCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQXJlTm90RXF1YWwob2JqZWN0IG9iaiwgb2JqZWN0IHNlY29uZClcclxuICAgICAgICB7XHJcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlTm90RXF1YWxzPG9iamVjdD4oICAgICAgICAgICAgb2JqLHNlY29uZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRlc3QgYSBleHBlY3RlZCB0byBiZSB0cnVlIGNvbmRpdGlvblxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXhwZWN0ZXNUcnVlQ29uZGl0aW9uXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiQmVUcnVlRXhjZXB0aW9uXCI+PC9leGNlcHRpb24+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNob3VsZEJlVHJ1ZShGdW5jPGJvb2w+IGV4cGVjdGVzVHJ1ZUNvbmRpdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByZXMgPSBleHBlY3Rlc1RydWVDb25kaXRpb24oKTtcclxuICAgICAgICAgICAgaWYoIXJlcylcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBCZVRydWVFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChzdHJpbmcuRm9ybWF0KFwiQ29uZGl0aW9uIGV4cGVjdGVkIHRvIGJlIHRydWUgYnV0IHJlc3VsdCBpcyBGQUxTRS5cIikpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUZXN0IGEgZXhwZWN0ZWQgdG8gYmUgZmFsc2UgY29uZGl0aW9uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJleHBlY3Rlc0ZhbHNlQ29uZGl0aW9uXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPGV4Y2VwdGlvbiBjcmVmPVwiQmVGYWxzZUV4Y2VwdGlvblwiPjwvZXhjZXB0aW9uPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZUZhbHNlKEZ1bmM8Ym9vbD4gZXhwZWN0ZXNGYWxzZUNvbmRpdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByZXMgPSBleHBlY3Rlc0ZhbHNlQ29uZGl0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmKHJlcylcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBCZUZhbHNlRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChcIkNvbmRpdGlvbiBleHBlY3RlZCB0byBiZSBmYWxzZSBidXQgcmVzdWx0IGlzIFRSVUUuXCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ09tcGFyZSBvYmpcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm8xXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvMlwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgT2JqZWN0RXF1YWwob2JqZWN0IG8xLCBvYmplY3QgbzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobzEgPT0gbnVsbCAmJiBvMiAhPSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChvMSAhPSBudWxsICYmIG8yID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvMSA9PSBudWxsIHx8IG8xLkVxdWFscyhvMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIElmIG9iaiBpcyBudWxsIHJldHVybiAnbnVsbCcgZWxzZSB0b3N0cmluZ1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIFRvQ29tcGFyZVN0cmluZyh0aGlzIG9iamVjdCBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqID09IG51bGwgPyBcIm51bGxcIiA6IG9iai5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9ucztcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHNcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBTaG91bGRFeHRlbnNpb25zXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUZXN0IGVxdWFsc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2JqXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWNvbmRPYmpcIj48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTaG91bGRCZUVxdWFsczxUPih0aGlzIFQgb2JqLCBUIHNlY29uZE9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBlcXVhbCA9IEVhc3lBc3NlcnRzLk9iamVjdEVxdWFsKG9iaiwgc2Vjb25kT2JqKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZXF1YWwpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXF1YWxFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChzdHJpbmcuRm9ybWF0KFwiRXhwZWN0ZWQgezB9LiBWYWx1ZTogezF9XCIsc2Vjb25kT2JqLlRvQ29tcGFyZVN0cmluZygpLG9iai5Ub0NvbXBhcmVTdHJpbmcoKSkpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGVzdCBub3QgZXF1YWxzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlY29uZE9ialwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFNob3VsZEJlTm90RXF1YWxzPFQ+KHRoaXMgVCBvYmosIFQgc2Vjb25kT2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGVxdWFsID0gRWFzeUFzc2VydHMuT2JqZWN0RXF1YWwob2JqLCBzZWNvbmRPYmopO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVxdWFsKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEVxdWFsRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChcIkV4cGVjdGVkIHswfSBkaWZmZXJlbnQgZnJvbSB7MX0uIEFyZSBFcXVhbCFcIixzZWNvbmRPYmouVG9Db21wYXJlU3RyaW5nKCksb2JqLlRvQ29tcGFyZVN0cmluZygpKSkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzXHJcbntcclxuICAgIFxyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIEF0dHJpYnV0ZSBmb3IgdGVzdCBjbGFzc1xyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIFtBdHRyaWJ1dGVVc2FnZShBdHRyaWJ1dGVUYXJnZXRzLkNsYXNzKV0gXHJcbiAgICBwdWJsaWMgY2xhc3MgVGVzdEF0dHJpYnV0ZSA6IEF0dHJpYnV0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXN0QXR0cmlidXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRlc3RBdHRyaWJ1dGUoc3RyaW5nIGRlc2NyaXB0aW9uIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBBdHRyaWJ1dGUgZm9yIHRlc3QgTWV0aG9kXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgW0F0dHJpYnV0ZVVzYWdlKEF0dHJpYnV0ZVRhcmdldHMuTWV0aG9kKV0gXHJcbiAgICBwdWJsaWMgY2xhc3MgVGVzdE1ldGhvZEF0dHJpYnV0ZSA6IEF0dHJpYnV0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVzY3JpcHRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXN0TWV0aG9kQXR0cmlidXRlKHN0cmluZyBkZXNjcmlwdGlvbiA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBNYW5hZ2UgYSBjb2xsZWN0aW9uIG9mIGl0ZW1cclxuICAgIC8vLyBBdXRvbWF0aWNhbGx5IHN5bmMgY29sbGVjdGlvbiB3aXRoIGRvbVxyXG4gICAgLy8vIFxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+PC90eXBlcGFyYW0+XHJcbiAgICBpbnRlcm5hbCBhYnN0cmFjdCBjbGFzcyBDb2xsZWN0aW9uTWFuYWdlcjxUPiBcclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEl0ZW1zIGNvbGxlY3Rpb25cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBMaXN0PFR1cGxlPFQsIExpc3Q8SFRNTEVsZW1lbnQ+Pj4gSXRlbXMgPSBuZXcgTGlzdDxUdXBsZTxULCBMaXN0PEhUTUxFbGVtZW50Pj4+KCk7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR2VuZXJhdGUgYSBIdG1sRWxlbWVudCBmcm9tIFQgaXRlbVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiaXRlbVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgTGlzdDxIVE1MRWxlbWVudD4gR2VuZXJhdGVFbGVtZW50KFQgaXRlbSk7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ2FsbGVkIHdoZW4gdGhlIG5ldyBIVE1MRWxlbWVudCBpcyBnZW5lcmF0ZWQuXHJcbiAgICAgICAgLy8vIERlZmF1bHQgaXMgQXBwZW5kQ2hpbGQgdG8gQ29udGFpbmVyLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWRkZWRFbGVtZW50XCI+PC9wYXJhbT5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIERvbUFjdGlvbk9uQWRkKFR1cGxlPFQsIExpc3Q8SFRNTEVsZW1lbnQ+PiBhZGRlZEVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhZGRlZEVsZW1lbnQuSXRlbTIuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50PikoZiA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbnRhaW5lci5BcHBlbmRDaGlsZChmKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDb250YWluZXIgZWxlbWVudCBmb3IgY29sbGVjdGlvblxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IEhUTUxFbGVtZW50IENvbnRhaW5lciB7IGdldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEFkZFJhbmdlKElFbnVtZXJhYmxlPFQ+IGl0ZW1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGl0ZW0gaW4gaXRlbXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWRkKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEFkZChUIGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW50ZXJuYWxJdGVtID0gbmV3IFR1cGxlPFQsIExpc3Q8SFRNTEVsZW1lbnQ+PihpdGVtLCB0aGlzLkdlbmVyYXRlRWxlbWVudChpdGVtKSk7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbXMuQWRkKGludGVybmFsSXRlbSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkRvbUFjdGlvbk9uQWRkKGludGVybmFsSXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIENsZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgZWxlbWVudHMgZnJvbSBkb21cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHR1cGxlIGluIHRoaXMuSXRlbXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGNhbm5vdCB1c2UgdHVwbGUuSXRlbTIuUmVtb3ZlKCk7ICoqIG5vdCBzdXBwb3J0ZWQgb24gRURHRS9JRSAqKlxyXG4gICAgICAgICAgICAgICAgdHVwbGUuSXRlbTIuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50PikoZiA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29udGFpbmVyLlJlbW92ZUNoaWxkKGYpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLkl0ZW1zLkNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhUIGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3Q8Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8VCwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4sVD4odGhpcy5JdGVtcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UdXBsZTxULCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+PiwgVD4pKHMgPT4gcy5JdGVtMSkpLkNvbnRhaW5zKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgYm9vbCBSZW1vdmUoVCBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLkNvbnRhaW5zKGl0ZW0pKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW50ZXJuYWxJdGVtID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxnbG9iYWw6OlN5c3RlbS5UdXBsZTxULCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+Pj4odGhpcy5JdGVtcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5UdXBsZTxULCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+PiwgYm9vbD4pKGYgPT4gZi5JdGVtMS5FcXVhbHMoaXRlbSkpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNhbm5vdCB1c2UgdHVwbGUuSXRlbTIuUmVtb3ZlKCk7ICoqIG5vdCBzdXBwb3J0ZWQgb24gRURHRS9JRSAqKlxyXG4gICAgICAgICAgICBpbnRlcm5hbEl0ZW0uSXRlbTIuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50PikoZiA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbnRhaW5lci5SZW1vdmVDaGlsZChmKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlcyA9IHRoaXMuSXRlbXMuUmVtb3ZlKGludGVybmFsSXRlbSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH1cclxucHVibGljIGludCBDb3VudFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5JdGVtcy5Db3VudDtcclxuICAgIH1cclxufSAgICAgICAgcHVibGljIGludCBJbmRleE9mKFQgaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtcy5JbmRleE9mKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8VCwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4+KHRoaXMuSXRlbXMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8VCwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4sIGJvb2w+KShmID0+IGYuSXRlbTEuRXF1YWxzKGl0ZW0pKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBUdXBsZTxULCBMaXN0PEhUTUxFbGVtZW50Pj4gdGhpc1tpbnQgaW5kZXhdXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gdGhpcy5JdGVtc1tpbmRleF07IH1cclxuICAgICAgICAgICAgc2V0IHsgdGhpcy5JdGVtc1tpbmRleF0gPSB2YWx1ZTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFYXN5VGVzdEJhc2VFeGNlcHRpb24gOiBFeGNlcHRpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRWFzeVRlc3RCYXNlRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXM7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXHJcbntcclxuICAgIGludGVybmFsIGNsYXNzIFJ1bm5lclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTGlzdDxUZXN0RGVzY3JpcHRvcj4gX2ludGVybmFsVGVzdHMgPSBuZXcgTGlzdDxUZXN0RGVzY3JpcHRvcj4oKTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJ1bm5lclZpZXdNb2RlbCBfcnVubmVyVmlld01vZGVsO1xyXG5cclxuICAgICAgICBwdWJsaWMgUnVubmVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbCA9IG5ldyBSdW5uZXJWaWV3TW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5fcnVubmVyVmlld01vZGVsLkJyb3dzZXJJbmZvID0gR2xvYmFsLk5hdmlnYXRvci5BcHBWZXJzaW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSdW4gdGVzdHNcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJ1bigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuUnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkRpc2NvdmVyVGVzdCgpOyAvLyBkaXNjb3ZlcnkgYWxsIHRlc3RzXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuVG90YWxUZXN0cyA9IHRoaXMuX2ludGVybmFsVGVzdHMuQ291bnQ7IC8vIHRvdGFsIHRlc3RzIGZvdW5kXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuUnVuVGVzdHMoKTsgLy8gcnVuIGFsbCB0ZXN0IFxyXG5cclxuLy8gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuRmFpbGVkVGVzdHMgPSB0aGlzLl9pbnRlcm5hbFRlc3RzLkNvdW50KGM9PiFjLlN1Y2Nlc3MpOyAvLyBmYWlsZWQgdGVzdHNcclxuLy8gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuUGFzc2VkVGVzdHMgPSB0aGlzLl9pbnRlcm5hbFRlc3RzLkNvdW50KGM9PmMuU3VjY2Vzcyk7IC8vIHBhc3NlZCBUZXN0c1xyXG4vLyAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5Ub3RhbFRpbWUgPSB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuVGVzdHMuSXRlbXMuU3VtKHM9PnMuSXRlbTEuVGltZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuUnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSdW4gXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIFRhc2sgUnVuVGVzdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxUZXN0cy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yPikoYXN5bmMgZiA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBmLlJ1blRlc3QoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5UZXN0cy5BZGQoZik7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFRhc2suRnJvbVJlc3VsdDxpbnQ+KDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBEaXNjb3ZlcnkgYWxsIHRlc3RzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIHZvaWQgRGlzY292ZXJUZXN0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0TWFueTxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLkFzc2VtYmx5LGdsb2JhbDo6U3lzdGVtLlR5cGU+KEFwcERvbWFpbi5DdXJyZW50RG9tYWluLkdldEFzc2VtYmxpZXMoKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5SZWZsZWN0aW9uLkFzc2VtYmx5LCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLklFbnVtZXJhYmxlPGdsb2JhbDo6U3lzdGVtLlR5cGU+PikocyA9PiBzLkdldFR5cGVzKCkpKVxyXG4gICAgICAgICAgICAgICAgLldoZXJlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR5cGUsIGJvb2w+KSh3PT4hdy5GdWxsTmFtZS5Ub0xvd2VyKCkuU3RhcnRzV2l0aChcInN5c3RlbVwiKSkpXHJcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHc9PiF3LklzSW50ZXJmYWNlICYmICF3LklzQWJzdHJhY3QpKVxyXG4gICAgICAgICAgICAgICAgLldoZXJlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR5cGUsIGJvb2w+KSh3PT5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxvYmplY3Q+KHcuR2V0Q3VzdG9tQXR0cmlidXRlcyh0eXBlb2YoVGVzdEF0dHJpYnV0ZSksdHJ1ZSkpKSlcclxuICAgICAgICAgICAgICAgIC5Ub0xpc3QoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHJ1biBhbGwgdGVzdHMgbWV0aG9kXHJcbiAgICAgICAgICAgIHR5cGVzLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlN5c3RlbS5UeXBlPikoZiA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVzdEF0dCA9IChUZXN0QXR0cmlidXRlKVN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8b2JqZWN0PihmLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFRlc3RBdHRyaWJ1dGUpLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGVzdE1ldGhvZHMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uTWV0aG9kSW5mbz4oZi5HZXRNZXRob2RzKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5NZXRob2RJbmZvLCBib29sPikodyA9PiB3LklzUHVibGljKSlcclxuICAgICAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5NZXRob2RJbmZvLCBib29sPikodyA9PiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxvYmplY3Q+KHcuR2V0Q3VzdG9tQXR0cmlidXRlcyh0eXBlb2YoVGVzdE1ldGhvZEF0dHJpYnV0ZSksIHRydWUpKSkpLlRvTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0ZXN0TWV0aG9kcy5Gb3JFYWNoKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpTeXN0ZW0uUmVmbGVjdGlvbi5NZXRob2RJbmZvPikobWV0aG9kID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSAoVGVzdE1ldGhvZEF0dHJpYnV0ZSkgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxvYmplY3Q+KG1ldGhvZC5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihUZXN0TWV0aG9kQXR0cmlidXRlKSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0RGVzY3IgPSBuZXcgVGVzdERlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR5cGUgPSBmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNZXRob2QgPSBtZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdyb3VwID0gZi5OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHcm91cERlc2NyaXB0aW9uID0gc3RyaW5nLklzTnVsbE9yRW1wdHkodGVzdEF0dC5EZXNjcmlwdGlvbikgPyBzdHJpbmcuRW1wdHkgOiB0ZXN0QXR0LkRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lID0gbWV0aG9kLk5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5hbWVEZXNjcmlwdGlvbiA9IHN0cmluZy5Jc051bGxPckVtcHR5KGF0dHIuRGVzY3JpcHRpb24pID8gc3RyaW5nLkVtcHR5IDogYXR0ci5EZXNjcmlwdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxUZXN0cy5BZGQodGVzdERlc2NyKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0ZXN0RGVzY3IuT25UZXN0Q29tcGxldGUgKz0gdGhpcy5UZXN0RGVzY3JPbk9uVGVzdENvbXBsZXRlO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFRlc3REZXNjck9uT25UZXN0Q29tcGxldGUob2JqZWN0IHNlbmRlciwgRXZlbnRBcmdzIGV2ZW50QXJncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjb21wbGV0ZWRUZXN0ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxnbG9iYWw6OkJyaWRnZS5FYXN5VGVzdHMuVGVzdERlc2NyaXB0b3I+KHRoaXMuX2ludGVybmFsVGVzdHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBib29sPikodyA9PiB3LkNvbXBsZXRlZCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuRmFpbGVkVGVzdHMgPSBjb21wbGV0ZWRUZXN0LkNvdW50KChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgYm9vbD4pKGM9PiFjLlN1Y2Nlc3MpKTsgLy8gZmFpbGVkIHRlc3RzXHJcbiAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5QYXNzZWRUZXN0cyA9IGNvbXBsZXRlZFRlc3QuQ291bnQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBib29sPikoYz0+Yy5TdWNjZXNzKSk7IC8vIHBhc3NlZCBUZXN0c1xyXG4gICAgICAgICAgICB0aGlzLl9ydW5uZXJWaWV3TW9kZWwuVG90YWxUaW1lID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TdW08Z2xvYmFsOjpTeXN0ZW0uVHVwbGU8Z2xvYmFsOjpCcmlkZ2UuRWFzeVRlc3RzLlRlc3REZXNjcmlwdG9yLCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuSFRNTEVsZW1lbnQ+Pj4odGhpcy5fcnVubmVyVmlld01vZGVsLlRlc3RzLkl0ZW1zLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlR1cGxlPGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvciwgZ2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PGdsb2JhbDo6QnJpZGdlLkh0bWw1LkhUTUxFbGVtZW50Pj4sIGludD4pKHM9PnMuSXRlbTEuVGltZSkpO1xyXG4gICAgICAgICAgICBpZihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkNvdW50PGdsb2JhbDo6QnJpZGdlLkVhc3lUZXN0cy5UZXN0RGVzY3JpcHRvcj4odGhpcy5faW50ZXJuYWxUZXN0cyk9PWNvbXBsZXRlZFRlc3QuQ291bnQoKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX3J1bm5lclZpZXdNb2RlbC5TZXRBbGxUZXN0UnVubmVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgQnJpZGdlLkh0bWw1O1xuXG5uYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0c1xue1xuICAgIGludGVybmFsIGNsYXNzIFJ1bm5lclZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSFRNTEVsZW1lbnQgX3RvdGFsVGVzdHMgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInRvdGFsVGVzdHNcIik7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSFRNTEVsZW1lbnQgX3Bhc3NlZFRlc3RzID0gRG9jdW1lbnQuR2V0RWxlbWVudEJ5SWQoXCJwYXNzZWRUZXN0c1wiKTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfZmFpbGVkVGVzdHMgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcImZhaWxlZFRlc3RzXCIpO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEhUTUxFbGVtZW50IF90b3RhbFRpbWUgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInRvdGFsVGltZVwiKTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfYnJvd3NlckluZm8gPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcImJyb3dzZXJJbmZvXCIpO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEhUTUxFbGVtZW50IF9sb2FkZXIgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZChcImxvYWRlclwiKTtcblxuXG4gICAgICAgIHB1YmxpYyBUZXN0c0NvbGxlY3Rpb25NYW5hZ2VyIFRlc3RzID0gbmV3IFRlc3RzQ29sbGVjdGlvbk1hbmFnZXIoKTtcblxuICAgICAgICBwdWJsaWMgUnVubmVyVmlld01vZGVsKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGhpZGVQYXNzZWQgPSBEb2N1bWVudC5HZXRFbGVtZW50QnlJZDxIVE1MSW5wdXRFbGVtZW50PihcImhpZGVQYXNzZWRUZXN0c1wiKTtcbiAgICAgICAgICAgIGhpZGVQYXNzZWQuT25DaGFuZ2UgKz0gZSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBpc0NoZWNrZWQgPSBoaWRlUGFzc2VkLkNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgdmFyIHRvSGlkZSA9IERvY3VtZW50LkdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwYXNzZWRUZXN0XCIpO1xuICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBodG1sRWxlbWVudCBpbiB0b0hpZGUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBodG1sRWxlbWVudC5IaWRkZW4gPSBpc0NoZWNrZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBIVE1MSW5wdXRFbGVtZW50IEhpZGVQYXNzZWQgeyBnZXQ7IHNldDsgfVxuXG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gVGVzdCBhcmUgcnVubmluZ1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgYm9vbCBSdW5uaW5nXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNldCB7IF9sb2FkZXIuSGlkZGVuID0gIXZhbHVlOyB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBUb3RhbCB0ZXN0c1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgaW50IFRvdGFsVGVzdHNcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0IHsgX3RvdGFsVGVzdHMuSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcInswfSB0ZXN0c1wiLHZhbHVlKTsgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBQYXNzZWQgdGVzdHMgY291bnRcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIGludCBQYXNzZWRUZXN0c1xuICAgICAgICB7XG4gICAgICAgICAgICBzZXQgeyBfcGFzc2VkVGVzdHMuSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcInswfSBwYXNzZWRcIix2YWx1ZSk7IH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRmFpbGVkIHRlc3RzIGNvdW50XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyBpbnQgRmFpbGVkVGVzdHNcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0IHsgX2ZhaWxlZFRlc3RzLklubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0gZmFpbGVkXCIsdmFsdWUpOyB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFRvdGFsIHRpbWVcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIGludCBUb3RhbFRpbWVcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0IHsgX3RvdGFsVGltZS5Jbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiVGVzdHMgY29tcGxldGVkIGluIHswfSBtc1wiLHZhbHVlKTsgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBCcm93c2VyIGluZm9cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHN0cmluZyBCcm93c2VySW5mb1xuICAgICAgICB7XG4gICAgICAgICAgICBzZXQgeyBfYnJvd3NlckluZm8uSW5uZXJIVE1MID0gdmFsdWU7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFNldCBhbGwgdGVzdCBjb21wbGV0ZWRcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZvaWQgU2V0QWxsVGVzdFJ1bm5lZCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuUnVubmluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkRpYWdub3N0aWNzO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXHJcbntcclxuICAgIGludGVybmFsIGNsYXNzIFRlc3REZXNjcmlwdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGV2ZW50IEV2ZW50SGFuZGxlciBPblRlc3RDb21wbGV0ZTtcclxuICAgICAgICBwdWJsaWMgYm9vbCBDb21wbGV0ZWQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lRGVzY3JpcHRpb24geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR3JvdXAgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR3JvdXBEZXNjcmlwdGlvbiB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUeXBlIFR5cGUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBNZXRob2RJbmZvIE1ldGhvZCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIEV4Y2VwdGlvbiBGYWlsQXNzZXJ0IHsgZ2V0OyBzZXQ7IH1cclxucHVibGljIGJvb2wgU3VjY2Vzc1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5GYWlsQXNzZXJ0ID09IG51bGw7XHJcbiAgICB9XHJcbn1wdWJsaWMgc3RyaW5nIEVycm9yXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkZhaWxBc3NlcnQgPT0gbnVsbCA/IHN0cmluZy5FbXB0eSA6IHN0cmluZy5Gb3JtYXQoXCJ7MH06IHsxfVwiLHRoaXMuRmFpbEFzc2VydC5HZXRUeXBlKCkuTmFtZSx0aGlzLkZhaWxBc3NlcnQuTWVzc2FnZSk7XHJcbiAgICB9XHJcbn1wdWJsaWMgc3RyaW5nIFN0YWNrXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLHRoaXMuRmFpbEFzc2VydCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEV4Y2VwdGlvbj4oXCJrZXkxXCIpLlN0YWNrVHJhY2U6KHN0cmluZyludWxsO1xyXG4gICAgfVxyXG59ICAgICAgICBcclxuICAgICAgICBwdWJsaWMgaW50IFRpbWUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSdW4gdGVzdC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJ1blRlc3QoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgbWV0aG9kIHJldHVybiByYXNrIGF3YWl0XHJcbiAgICAgICAgICAgIHZhciBpc1Rhc2sgPSB0aGlzLk1ldGhvZC5SZXR1cm5UeXBlID09IHR5cGVvZihUYXNrKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IEFjdGl2YXRvci5DcmVhdGVJbnN0YW5jZSh0aGlzLlR5cGUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHdhdGNoID0gbmV3IFN0b3B3YXRjaCgpO1xyXG4gICAgICAgICAgICB3YXRjaC5TdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgdHJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1Rhc2spXHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgKFRhc2spIHRoaXMuTWV0aG9kLkludm9rZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NZXRob2QuSW52b2tlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChFeGNlcHRpb24gZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5GYWlsQXNzZXJ0ID0gZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5hbGx5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdhdGNoLlN0b3AoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGltZSA9IChpbnQpd2F0Y2guRWxhcHNlZE1pbGxpc2Vjb25kcztcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuT25UZXN0Q29tcGxldGUhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9PnRoaXMuT25UZXN0Q29tcGxldGUuSW52b2tlKHRoaXMsbnVsbCkpOm51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgb2YgdHlwZSBpcyBkaXNwb3NhYmxlXHJcbiAgICAgICAgICAgICAgICB2YXIgZGlzcG9zYWJsZSA9IGluc3RhbmNlIGFzIElEaXNwb3NhYmxlO1xyXG4gICAgICAgICAgICAgICAgZGlzcG9zYWJsZSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+ZGlzcG9zYWJsZS5EaXNwb3NlKCkpOm51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmVGYWxzZUV4Y2VwdGlvbiA6IEVhc3lUZXN0QmFzZUV4Y2VwdGlvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBCZUZhbHNlRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQmVUcnVlRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEJlVHJ1ZUV4Y2VwdGlvbihzdHJpbmcgbWVzc2FnZSkgOiBiYXNlKG1lc3NhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzLkV4Y2VwdGlvbnNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEVxdWFsRXhjZXB0aW9uIDogRWFzeVRlc3RCYXNlRXhjZXB0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEVxdWFsRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIEJyaWRnZS5FYXN5VGVzdHMuRXhjZXB0aW9uc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTm90RXF1YWxFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTm90RXF1YWxFeGNlcHRpb24oc3RyaW5nIG1lc3NhZ2UpIDogYmFzZShtZXNzYWdlKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgQnJpZGdlLkVhc3lUZXN0cy5FeGNlcHRpb25zXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUaHJvd3NFeGNlcHRpb24gOiBFYXN5VGVzdEJhc2VFeGNlcHRpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVGhyb3dzRXhjZXB0aW9uKHN0cmluZyBtZXNzYWdlKSA6IGJhc2UobWVzc2FnZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2UuRWFzeVRlc3RzXHJcbntcclxuICAgIGludGVybmFsIGNsYXNzIFRlc3RzQ29sbGVjdGlvbk1hbmFnZXIgOiBDb2xsZWN0aW9uTWFuYWdlcjxUZXN0RGVzY3JpcHRvcj5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGludCBfY291bnQgPSAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBMaXN0PEhUTUxFbGVtZW50PiBHZW5lcmF0ZUVsZW1lbnQoVGVzdERlc2NyaXB0b3IgaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByZXMgPSBuZXcgTGlzdDxIVE1MRWxlbWVudD4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByb3cxID0gbmV3IEhUTUxUYWJsZVJvd0VsZW1lbnQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByb3cxLkNsYXNzTGlzdC5BZGQodGhpcy5fY291bnQlMj09MD9cIndoaXRlUm93XCI6XCJncmV5Um93XCIpOyAvLyBhbHRlcm5hdGVcclxuICAgICAgICAgICAgaWYoaXRlbS5TdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgcm93MS5DbGFzc0xpc3QuQWRkKFwicGFzc2VkVGVzdFwiKTsgLy8gZmFpbGVkIHRlc3Qgcm93XHJcblxyXG4gICAgICAgICAgICB2YXIgY2VsbDEgPSByb3cxLkluc2VydENlbGwoKTtcclxuICAgICAgICAgICAgdmFyIGNlbGwyID0gcm93MS5JbnNlcnRDZWxsKCk7XHJcbiAgICAgICAgICAgIHZhciBjZWxsMyA9IHJvdzEuSW5zZXJ0Q2VsbCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ0VMTDFcclxuICAgICAgICAgICAgY2VsbDEuQ2xhc3NOYW1lID0gaXRlbS5TdWNjZXNzID8gXCJ0ZXN0LW9rXCIgOiBcInRlc3Qta29cIjtcclxuICAgICAgICAgICAgLy8gcm93IGluZGV4XHJcbiAgICAgICAgICAgIGNlbGwxLkFwcGVuZENoaWxkKG5ldyBIVE1MVW5rbm93bkVsZW1lbnQoXCJzdHJvbmdcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcInswfSB7MX1cIix0aGlzLl9jb3VudCArMSxpdGVtLk5hbWUpICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAgIGNlbGwxLkFwcGVuZENoaWxkKG5ldyBIVE1MU3BhbkVsZW1lbnQoKVxyXG4vLyAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgSW5uZXJIVE1MID0gJFwie2l0ZW0uTmFtZX1cIlxyXG4vLyAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY2VsbDEuQXBwZW5kQ2hpbGQobmV3IEhUTUxCUkVsZW1lbnQoKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjZWxsMS5BcHBlbmRDaGlsZChuZXcgSFRNTFVua25vd25FbGVtZW50KFwiaVwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiIHswfVwiLGl0ZW0uTmFtZURlc2NyaXB0aW9uKSxcclxuICAgICAgICAgICAgICAgIENsYXNzTmFtZSA9IFwidzMtdGV4dC1ncmV5XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgICAgIC8vIENFTEwyXHJcbiAgICAgICAgICAgIGNlbGwyLkFwcGVuZENoaWxkKG5ldyBIVE1MVW5rbm93bkVsZW1lbnQoXCJpXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENsYXNzTmFtZSA9IFwiZmEgZmEtb2JqZWN0LWdyb3VwXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjZWxsMi5BcHBlbmRDaGlsZChuZXcgSFRNTFNwYW5FbGVtZW50KClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSW5uZXJIVE1MID0gc3RyaW5nLkZvcm1hdChcInswfVwiLGl0ZW0uR3JvdXApICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjZWxsMi5BcHBlbmRDaGlsZChuZXcgSFRNTEJSRWxlbWVudCgpKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjZWxsMi5BcHBlbmRDaGlsZChuZXcgSFRNTFVua25vd25FbGVtZW50KFwiaVwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBzdHJpbmcuRm9ybWF0KFwiIHswfVwiLGl0ZW0uR3JvdXBEZXNjcmlwdGlvbiksXHJcbiAgICAgICAgICAgICAgICBDbGFzc05hbWUgPSBcInczLXRleHQtZ3JleVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAtLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBDRUxMM1xyXG4gICAgICAgICAgICBjZWxsMy5DbGFzc05hbWUgPSBcInczLXJpZ2h0XCI7XHJcbiAgICAgICAgICAgIGNlbGwzLkFwcGVuZENoaWxkKG5ldyBIVE1MVW5rbm93bkVsZW1lbnQoXCJpXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENsYXNzTmFtZSA9IFwiZmEgZmEtY2xvY2stb1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2VsbDMuQXBwZW5kQ2hpbGQobmV3IEhUTUxTcGFuRWxlbWVudCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElubmVySFRNTCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0gbXNcIixpdGVtLlRpbWUpICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tLS1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX2NvdW50Kys7XHJcbiAgICAgICAgICAgIHJlcy5BZGQocm93MSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlbS5TdWNjZXNzKSByZXR1cm4gcmVzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJvdzIgPSBuZXcgSFRNTFRhYmxlUm93RWxlbWVudCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcm93Mi5DbGFzc05hbWUgPSB0aGlzLl9jb3VudCUyPT0wID8gXCJ3aGl0ZVJvd1wiOlwiZ3JleVJvd1wiO1xyXG4gICAgICAgICAgICB2YXIgY2VsbCA9IHJvdzIuSW5zZXJ0Q2VsbCgpO1xyXG5cclxuICAgICAgICAgICAgY2VsbC5Db2xTcGFuID0gMztcclxuICAgICAgICAgICAgY2VsbC5DbGFzc05hbWUgPSBcInRlc3Qta28gaW5uZXItcm93XCI7XHJcblxyXG4gICAgICAgICAgICBjZWxsLkFwcGVuZENoaWxkKG5ldyBIVE1MUGFyYWdyYXBoRWxlbWVudCgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENsYXNzTmFtZSA9IFwiZXJyb3ItbWVzc2FnZVwiXHJcbiAgICAgICAgICAgIH0pLkFwcGVuZENoaWxkKG5ldyBIVE1MVW5rbm93bkVsZW1lbnQoXCJpXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENsYXNzTmFtZSA9IFwidzMtdGV4dC1ncmV5XCIsXHJcbiAgICAgICAgICAgICAgICBJbm5lckhUTUwgPSBpdGVtLkVycm9yXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY2VsbC5BcHBlbmRDaGlsZChuZXcgSFRNTFVua25vd25FbGVtZW50KFwicHJlXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElubmVySFRNTCA9IGl0ZW0uU3RhY2tcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXMuQWRkKHJvdzIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBIVE1MRWxlbWVudCBDb250YWluZXIgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICBcbnByaXZhdGUgSFRNTEVsZW1lbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0NvbnRhaW5lcj1Eb2N1bWVudC5HZXRFbGVtZW50QnlJZChcInRhYmxlVGVzdHNMaXN0XCIpO31cclxufSJdCn0K
