// Generated from study.json by fetch_questions.py. Do not edit by hand.
window.TOSCA_STUDY = {
  "units": [
    {
      "id": 1,
      "title": "Getting started",
      "text": "What Tosca is, where you work, and how a test comes to life."
    },
    {
      "id": 2,
      "title": "Modules and scanning",
      "text": "Teaching Tosca what the application looks like."
    },
    {
      "id": 3,
      "title": "Building TestCases",
      "text": "Steps, ActionModes, checks, reuse and logic."
    },
    {
      "id": 4,
      "title": "Values, parameters and test data",
      "text": "Buffers, generated values, settings and data design."
    },
    {
      "id": 5,
      "title": "Tables and tricky controls",
      "text": "Finding the right element when things change at runtime."
    },
    {
      "id": 6,
      "title": "Running tests",
      "text": "Trial runs, official runs, failures, many machines and pipelines."
    },
    {
      "id": 7,
      "title": "Beyond the browser",
      "text": "APIs, SAP, desktop and mobile applications."
    },
    {
      "id": 8,
      "title": "Working as a team",
      "text": "Requirements, shared workspaces and reporting."
    }
  ],
  "lessons": [
    {
      "id": "what-is-tosca",
      "unit": 1,
      "title": "What is Tosca?",
      "simple": "Tricentis Tosca is a tool that tests software automatically. You do not write code. You build tests from ready-made building blocks, a bit like putting Lego bricks together.",
      "body": [
        "Testing by hand means a person clicks through the application again after every change. Tosca does those clicks, entries and checks for you. You describe once what should happen, and Tosca repeats it whenever you want.",
        "Tosca is model-based. It first learns what a screen looks like and stores that as a Module. A test is then built by combining Modules and filling in values. When the screen changes, you update the Module once and every test that uses it is repaired. That is the main reason Tosca tests are cheaper to maintain than scripts.",
        "Tosca is not only for web pages. With different engines it can test desktop programs, SAP, mobile apps and APIs. It also covers test data, risk-based planning and reporting."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "From application to result",
          "steps": [
            {
              "label": "Scan",
              "text": "XScan reads a screen of the application."
            },
            {
              "label": "Module",
              "text": "The screen is stored as a reusable description."
            },
            {
              "label": "TestCase",
              "text": "Modules plus values become a test."
            },
            {
              "label": "ExecutionList",
              "text": "The test is run officially."
            },
            {
              "label": "Result",
              "text": "Passed or failed, with a log of every step."
            }
          ]
        },
        {
          "type": "compare",
          "title": "Script-based and model-based testing",
          "columns": [
            {
              "title": "Script-based",
              "points": [
                "A test is program code.",
                "A changed screen means editing many scripts.",
                "Needs programming skills."
              ]
            },
            {
              "title": "Model-based (Tosca)",
              "points": [
                "A test is Modules plus values.",
                "A changed screen means fixing one Module.",
                "Readable by people who do not program."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "A login test without code",
        "intro": "Four lines describe the whole test. Each line names a control, a value and what to do with it.",
        "grid": {
          "columns": [
            "TestStepValue",
            "Value",
            "ActionMode"
          ],
          "rows": [
            [
              "Username",
              "john",
              "Input"
            ],
            [
              "Password",
              "secret",
              "Input"
            ],
            [
              "Login",
              "{CLICK}",
              "Input"
            ],
            [
              "Welcome message",
              "Welcome, John",
              "Verify"
            ]
          ]
        },
        "outcome": "Tosca types the user name and password, clicks Login and checks the welcome text."
      },
      "points": [
        "Tosca automates clicks, entries and checks.",
        "Screens are stored as Modules and reused in many tests.",
        "One change in a Module updates every TestCase that uses it.",
        "It tests web, desktop, SAP, mobile and APIs."
      ],
      "mistake": "Thinking of Tosca as a record-and-replay tool. Recording exists, but the strength is the reusable model you build.",
      "docs": [
        {
          "title": "Steer with Engines 3.0",
          "url": "https://documentation.tricentis.com/tosca/2320/en/content/tbox/tbox_intro.htm"
        }
      ],
      "questions": null
    },
    {
      "id": "commander-and-workspace",
      "unit": 1,
      "title": "Tosca Commander and the workspace",
      "simple": "Tosca Commander is the program you work in. A workspace is your project inside it, organised into sections for the different jobs: Modules, TestCases, Execution and more.",
      "body": [
        "When you start Tosca Commander you open a workspace. Its objects are grouped in tabs. The three you use every day are Modules (the scanned screens), TestCases (the tests) and Execution (the runs and their results). Further sections cover Requirements, TestCaseDesign, Reporting, Issues and Configurations.",
        "Each section shows a tree of folders on the left and the details of the selected object on the right. Most building is done by dragging: a Module onto a TestCase, a TestCase onto an ExecutionList.",
        "A workspace is either single-user, for learning or working alone, or multi-user, where a team shares one repository and uses checkout and checkin."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "What a workspace contains",
          "root": {
            "label": "Project",
            "text": "The root of everything in the workspace",
            "children": [
              {
                "label": "Requirements",
                "text": "What has to be tested, and how important it is."
              },
              {
                "label": "TestCaseDesign",
                "text": "Test data and its combinations."
              },
              {
                "label": "Modules",
                "text": "The scanned screens of the application."
              },
              {
                "label": "TestCases",
                "text": "The tests, built from Modules."
              },
              {
                "label": "Execution",
                "text": "ExecutionLists, runs and results."
              },
              {
                "label": "Reporting",
                "text": "Report definitions for results."
              }
            ]
          }
        }
      ],
      "example": {
        "title": "Where do I go for what?",
        "intro": "A quick map for the first days.",
        "grid": {
          "columns": [
            "You want to",
            "Go to the section"
          ],
          "rows": [
            [
              "Scan a screen",
              "Modules"
            ],
            [
              "Build a test",
              "TestCases"
            ],
            [
              "Run a test officially",
              "Execution"
            ],
            [
              "Plan data combinations",
              "TestCaseDesign"
            ],
            [
              "See what is covered",
              "Requirements"
            ]
          ]
        }
      },
      "points": [
        "A workspace is your project in Tosca Commander.",
        "Modules, TestCases and Execution are the daily sections.",
        "Objects live in folder trees; most work is drag and drop.",
        "Workspaces are single-user or multi-user."
      ],
      "mistake": "Putting everything into one folder. Agree on a folder structure and naming early, because tidying up later is hard.",
      "docs": [
        {
          "title": "Get to know your workspace",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/first_steps/get_to_know_tosca_workspace.htm"
        },
        {
          "title": "Create and manage workspaces",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/create_and_manage_workspaces.htm"
        }
      ],
      "questions": "Multi-user workspaces"
    },
    {
      "id": "first-test",
      "unit": 1,
      "title": "Your first automated test",
      "simple": "Every automated test in Tosca is made in the same four moves: scan the screen, build the TestCase, try it out, then run it officially.",
      "body": [
        "Scan: open the application, start XScan from the Modules section and select the controls you need. When you save, you have a Module.",
        "Build: create a TestCase and drag the Module into it. Each control becomes a line where you enter a value and choose what to do with it.",
        "Try: run the TestCase in the ScratchBook. It shows step by step what passed and what failed, but it does not keep the result.",
        "Run: drag the TestCase into an ExecutionList in the Execution section and run it there. This is the run whose result is stored."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "The four moves",
          "steps": [
            {
              "label": "1. Scan",
              "text": "XScan turns a screen into a Module."
            },
            {
              "label": "2. Build",
              "text": "Drag the Module into a TestCase and fill in values."
            },
            {
              "label": "3. Try",
              "text": "Run it in the ScratchBook and fix what fails."
            },
            {
              "label": "4. Run",
              "text": "Run it from an ExecutionList to get a stored result."
            }
          ]
        }
      ],
      "example": {
        "title": "A search test for a web shop",
        "intro": "Two Modules are used: a ready-made one that opens the browser, and the scanned search page.",
        "grid": {
          "columns": [
            "TestStepValue",
            "Value",
            "ActionMode"
          ],
          "rows": [
            [
              "Open Url: Url",
              "https://shop.example.com",
              "Input"
            ],
            [
              "Search field",
              "laptop",
              "Input"
            ],
            [
              "Search button",
              "{CLICK}",
              "Input"
            ],
            [
              "Result heading",
              "Results for laptop",
              "Verify"
            ]
          ]
        },
        "outcome": "After a clean ScratchBook run, the TestCase is dragged into an ExecutionList and run again for the record."
      },
      "points": [
        "Scan, build, try, run: the same four moves every time.",
        "The ScratchBook is for trying; it keeps no results.",
        "The ExecutionList run is the one that counts.",
        "When the screen changes later, rescan the Module."
      ],
      "mistake": "Treating a green ScratchBook run as the final result. Only runs from an ExecutionList are stored.",
      "docs": [
        {
          "title": "Run the demo TestCase",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tutorial/executionlist.htm"
        },
        {
          "title": "Work with execution results",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/execution_results.htm"
        }
      ],
      "questions": "Execution lists and DEX"
    },
    {
      "id": "modules-and-xscan",
      "unit": 2,
      "title": "Modules and XScan",
      "simple": "A Module is Tosca's saved description of one screen. XScan is the scanner that creates it by reading the controls on that screen.",
      "body": [
        "Before Tosca can click a button it has to know that the button exists and how to find it. Scanning gives it that knowledge. XScan lists the controls of the open screen, you tick the ones you need, and Tosca saves them as a Module.",
        "Each control in a Module is a ModuleAttribute. It stores the properties used to find the control again later, such as its Id or its text. The Module itself stores how to find the window, usually by its title.",
        "A TestCase never contains this technical information. It only points to the Module. So if a button's Id changes, you correct it in one place."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "What is inside a Module",
          "root": {
            "label": "Module: Login page",
            "text": "Finds the window by its title",
            "children": [
              {
                "label": "Username",
                "text": "ModuleAttribute, a text box found by its Id."
              },
              {
                "label": "Password",
                "text": "ModuleAttribute, a text box found by its Id."
              },
              {
                "label": "Login",
                "text": "ModuleAttribute, a button found by its text."
              }
            ]
          }
        },
        {
          "type": "flow",
          "title": "How scanning works",
          "steps": [
            {
              "label": "Open",
              "text": "Bring the screen you want into view."
            },
            {
              "label": "XScan",
              "text": "Start the scan from the Modules section."
            },
            {
              "label": "Select",
              "text": "Tick the controls and check each is unique."
            },
            {
              "label": "Save",
              "text": "The Module appears in your folder."
            }
          ]
        }
      ],
      "example": {
        "title": "Scanning a login page",
        "intro": "Three controls are selected in XScan. For each one XScan shows whether it can be found uniquely.",
        "grid": {
          "columns": [
            "ModuleAttribute",
            "Control type",
            "Found by"
          ],
          "rows": [
            [
              "Username",
              "TextBox",
              "Id = user-name"
            ],
            [
              "Password",
              "TextBox",
              "Id = password"
            ],
            [
              "Login",
              "Button",
              "InnerText = Login"
            ]
          ]
        },
        "outcome": "The saved Module can now be dragged into any TestCase that needs to log in."
      },
      "points": [
        "One Module describes one screen or one part of it.",
        "A ModuleAttribute is one control with its identifying properties.",
        "TestCases point to Modules and never store technical details.",
        "XScan tells you whether a control is uniquely identifiable."
      ],
      "mistake": "Scanning every control on a page 'just in case'. Scan what the tests need; smaller Modules are easier to maintain.",
      "docs": [
        {
          "title": "Properties for XModules (parameters)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
        }
      ],
      "questions": "Module scanning (XScan)"
    },
    {
      "id": "identifying-controls",
      "unit": 2,
      "title": "Identifying controls",
      "simple": "Identifying a control means telling Tosca how to recognise it. There are four ways, and you should prefer them in a fixed order: properties, anchor, image, index.",
      "body": [
        "By properties: Tosca uses the control's own features, such as Id, Name or text. This is the most stable way. Remove properties that change on every load, and use a wildcard (*) when only part of a value changes.",
        "By anchor: if the control has nothing unique, describe it by a stable neighbour, for example 'the text box next to the label Email'.",
        "By image and by index are last resorts. An image depends on resolution and takes longer. An index is the position among similar controls ('the second one'), which shifts as soon as the page layout changes."
      ],
      "graphics": [
        {
          "type": "stack",
          "title": "Order of preference",
          "layers": [
            {
              "label": "1. Properties",
              "text": "Id, Name, text. Stable and fast."
            },
            {
              "label": "2. Anchor",
              "text": "Relative to a stable neighbouring control."
            },
            {
              "label": "3. Image",
              "text": "A picture of the control. Slower, depends on the display."
            },
            {
              "label": "4. Index",
              "text": "Position among similar controls. Breaks when the layout changes."
            }
          ]
        }
      ],
      "example": {
        "title": "A button whose Id changes on every load",
        "intro": "The Id looks like btn_submit_8841 today and btn_submit_1207 tomorrow. Two ways to make it stable:",
        "code": [
          {
            "label": "Keep the Id but replace the changing part with a wildcard",
            "code": "btn_submit_*"
          },
          {
            "label": "Or accept one of several fixed texts with a regular expression",
            "code": "{REGEX[\"Submit|Send\"]}"
          }
        ],
        "outcome": "XScan must still report the control as unique after the change."
      },
      "points": [
        "Properties first, then anchor, then image, then index.",
        "Remove properties that change at runtime.",
        "A wildcard (*) stands for any characters.",
        "Always check that the control is still unique."
      ],
      "mistake": "Choosing index first because it is quick. It works until the page changes, then silently steers the wrong control.",
      "docs": [
        {
          "title": "Specify values (wildcards, escaping)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/specifying_values.htm"
        },
        {
          "title": "Regular expressions",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/regular_expressions.htm"
        }
      ],
      "questions": "Module scanning (XScan)"
    },
    {
      "id": "module-settings",
      "unit": 2,
      "title": "Maintaining and tuning Modules",
      "simple": "Screens change, so Modules need care. Rescan updates a Module after a change, and a few settings make Modules more flexible.",
      "body": [
        "Rescan: when the application changes, right-click the Module and rescan it. The links to all TestSteps are kept. Never scan a brand-new Module for a screen that already has one, because every TestCase would have to be rebuilt.",
        "ValueRange lists the values offered in the TestStep's dropdown, separated by semicolons. Cardinality says how often a control may be used in one TestStep: 0-1 by default, 0-N to use it several times.",
        "Parameters change how Tosca treats a control. Steering parameters such as ScrollingBehavior or WaitBefore affect how it is operated. Configuration parameters such as ExplicitName affect how it is addressed. A ControlGroup combines several links, buttons or radio buttons into one attribute with a dropdown."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "After a screen change",
          "columns": [
            {
              "title": "Rescan the Module",
              "points": [
                "TestSteps stay linked.",
                "One fix repairs all TestCases.",
                "Takes minutes."
              ]
            },
            {
              "title": "Scan a new Module",
              "points": [
                "Old TestSteps point to the old Module.",
                "Every TestCase must be rebuilt.",
                "Takes days on a large project."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "Settings on a ModuleAttribute",
        "intro": "A status field that should offer fixed values, and a button that is used twice in one TestStep.",
        "code": [
          {
            "label": "ValueRange of the status field",
            "code": "Approved;Rejected;Pending"
          },
          {
            "label": "Cardinality of the button, to verify it and then click it",
            "code": "0-N"
          },
          {
            "label": "Configuration parameter so the TestStep can pick which matching control to use",
            "code": "ExplicitName = True"
          }
        ]
      },
      "points": [
        "Rescan keeps the links to TestSteps; a new Module breaks them.",
        "ValueRange: the dropdown values, separated by semicolons.",
        "Cardinality 0-N lets one control be used several times in a step.",
        "Steering and configuration parameters fine-tune a control."
      ],
      "mistake": "Editing the Modules of the Standard subset. Copy a standard Module into your own folder first and change the copy.",
      "docs": [
        {
          "title": "Properties for XModules (parameters)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
        },
        {
          "title": "Default properties for Modules",
          "url": "https://documentation.tricentis.com/tosca/2320/en/content/tosca_commander/modules_properties.htm"
        }
      ],
      "questions": "Module scanning (XScan)"
    },
    {
      "id": "testcases-and-steps",
      "unit": 3,
      "title": "TestCases, TestSteps and values",
      "simple": "A TestCase is a list of steps. Each step comes from a Module, and each line of a step says: this control, this value, do this with it.",
      "body": [
        "Dragging a Module into a TestCase creates a TestStep. The TestStep shows one line for every control of the Module. Each line is a TestStepValue.",
        "A TestStepValue has three parts you fill in. The Value is what to enter or expect. The ActionMode is what to do: enter, check, remember, wait. The DataType says whether the value is text, a number, a date and so on.",
        "Lines you leave empty are ignored, so one Module can serve many TestCases that each use different controls. Folders inside a TestCase group steps, typically into precondition, process and postcondition."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "How a TestCase is built",
          "root": {
            "label": "TestCase: Order a laptop",
            "text": "The whole test",
            "children": [
              {
                "label": "TestStep: Login page",
                "text": "Comes from the Module Login page."
              },
              {
                "label": "TestStep: Search page",
                "text": "Comes from the Module Search page."
              },
              {
                "label": "TestStep: Cart",
                "text": "Comes from the Module Cart."
              }
            ]
          }
        }
      ],
      "example": {
        "title": "One TestStep in detail",
        "intro": "The TestStep 'Login page' with its three TestStepValues.",
        "grid": {
          "columns": [
            "TestStepValue",
            "Value",
            "ActionMode",
            "DataType"
          ],
          "rows": [
            [
              "Username",
              "john",
              "Input",
              "String"
            ],
            [
              "Password",
              "secret",
              "Input",
              "Password"
            ],
            [
              "Login",
              "{CLICK}",
              "Input",
              "String"
            ]
          ]
        },
        "outcome": "Tosca works through the lines from top to bottom."
      },
      "points": [
        "Module dragged into a TestCase = TestStep.",
        "One line of a TestStep = TestStepValue.",
        "Every line has a Value, an ActionMode and a DataType.",
        "Empty lines are skipped."
      ],
      "mistake": "Building one huge TestCase that tests everything. Short TestCases with one purpose are easier to read, run and repair.",
      "docs": [
        {
          "title": "ActionModes",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
        }
      ],
      "questions": "TestCase design"
    },
    {
      "id": "actionmodes",
      "unit": 3,
      "title": "ActionModes",
      "simple": "The ActionMode tells Tosca what to do with a value: type it in, check it, remember it, or wait for it.",
      "body": [
        "Input is the default. It enters the value, or performs the action written as the value, such as {CLICK}.",
        "Verify compares what the application shows with your value and reports passed or failed. Buffer stores what the application shows under a name so later steps can use it. WaitOn pauses the test until the control reaches the state you describe.",
        "Constraint and Select are used inside lists, tables and trees. Constraint narrows a search, for example to the table row where Name is John. Select picks a node without doing anything to it. Insert creates entries in non-visual data such as XML."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "The four everyday ActionModes",
          "columns": [
            {
              "title": "Input",
              "points": [
                "Enter a value or click.",
                "Example: john, {CLICK}"
              ]
            },
            {
              "title": "Verify",
              "points": [
                "Check a value or property.",
                "Example: Welcome, John"
              ]
            },
            {
              "title": "Buffer",
              "points": [
                "Remember a value.",
                "Example: OrderNo"
              ]
            },
            {
              "title": "WaitOn",
              "points": [
                "Wait for a state.",
                "Example: .Visible==True"
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "One confirmation page, three ActionModes",
        "intro": "After placing an order the test waits for the page, checks the message and keeps the order number.",
        "grid": {
          "columns": [
            "TestStepValue",
            "Value",
            "ActionMode"
          ],
          "rows": [
            [
              "Confirmation panel",
              ".Visible==True",
              "WaitOn"
            ],
            [
              "Message",
              "Thank you for your order",
              "Verify"
            ],
            [
              "Order number",
              "OrderNo",
              "Buffer"
            ]
          ]
        },
        "outcome": "The number is now available to later steps as {B[OrderNo]}."
      },
      "points": [
        "Input enters or clicks; Verify checks; Buffer remembers; WaitOn waits.",
        "Constraint narrows a search, mainly in tables.",
        "With Buffer, the Value is the name of the Buffer.",
        "Verify compares the whole text and is case-sensitive."
      ],
      "mistake": "Using Input where Verify was meant. The step then overwrites the field instead of checking it, and still passes.",
      "docs": [
        {
          "title": "ActionModes",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
        }
      ],
      "questions": "TestCase design"
    },
    {
      "id": "verify-and-wait",
      "unit": 3,
      "title": "Checking and waiting",
      "simple": "Checking means asking 'is this right?'. Waiting means 'do not continue until this is ready'. Tosca does both on a control's value or on its properties.",
      "body": [
        "The simplest check compares a control's value: put the expected text in the Value and set ActionMode Verify. To check a property instead, type it with a leading dot, an operator and the expected value, for example .Enabled==True. The operators are ==, !=, >, <, <= and >=.",
        "Every control has the properties Exists, Enabled and Visible. Others depend on the technology, such as InnerText on web pages. For Exists, set the DataType to Boolean.",
        "Applications are not always fast. Use ActionMode WaitOn to wait until a control reaches a state. Tosca continues as soon as it does, and gives up after the Synchronization Timeout during WaitOn (20000 milliseconds by default). The module TBox Wait pauses for a fixed time whether needed or not."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Two ways to wait",
          "columns": [
            {
              "title": "WaitOn (preferred)",
              "points": [
                "Waits for a state, for example a visible table.",
                "Continues the moment it is reached.",
                "Fails only after the timeout."
              ]
            },
            {
              "title": "TBox Wait",
              "points": [
                "Waits a fixed number of milliseconds.",
                "Wastes time when the page is fast.",
                "Still fails when the page is slower than expected."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "Property checks",
        "intro": "Typed into the Value of a TestStepValue.",
        "code": [
          {
            "label": "ActionMode WaitOn: wait until the results table is visible",
            "code": ".Visible==True"
          },
          {
            "label": "ActionMode WaitOn: wait until a spinner is gone (DataType Boolean)",
            "code": ".Exists==False"
          },
          {
            "label": "ActionMode Verify: the Save button is disabled",
            "code": ".Enabled==False"
          },
          {
            "label": "ActionMode Verify: the heading shows this text",
            "code": ".InnerText==Order confirmed"
          }
        ]
      },
      "points": [
        "Verify a value directly, or a property as .Property==value.",
        "Exists, Enabled and Visible exist on every control.",
        "WaitOn waits for a state and continues as soon as possible.",
        "The default WaitOn timeout is 20 seconds."
      ],
      "mistake": "Adding fixed waits everywhere. The suite becomes slow and still fails on the day the page takes one second longer.",
      "docs": [
        {
          "title": "Using properties of controls",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
        },
        {
          "title": "ActionModes",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
        },
        {
          "title": "Settings - Synchronization",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/settings_tbox_synchronization.htm"
        }
      ],
      "questions": "TBox"
    },
    {
      "id": "reusable-blocks",
      "unit": 3,
      "title": "Reusable TestStepBlocks",
      "simple": "A Reusable TestStepBlock is a group of steps stored once and used in many TestCases. Change the block and every TestCase changes with it.",
      "body": [
        "Some steps appear in almost every test: logging in, opening a menu, logging out. Copying them into two hundred TestCases means two hundred edits when the login page changes.",
        "Put such steps into a Reusable TestStepBlock inside a TestStepLibrary. Dragging the block into a TestCase creates a reference, not a copy.",
        "The values that differ per test, such as the user name, become Business Parameters. Inside the block they are referenced as {PL[Name]}, and each TestCase supplies its own value."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "One block, many TestCases",
          "root": {
            "label": "Library: Login block",
            "text": "Stored once, with the parameters Username and Password",
            "children": [
              {
                "label": "TestCase A",
                "text": "References the block, Username = john."
              },
              {
                "label": "TestCase B",
                "text": "References the block, Username = admin."
              },
              {
                "label": "TestCase C",
                "text": "References the block, Username = guest."
              }
            ]
          }
        }
      ],
      "example": {
        "title": "A login block with Business Parameters",
        "intro": "Inside the block, the values point to the parameters.",
        "grid": {
          "columns": [
            "TestStepValue",
            "Value",
            "ActionMode"
          ],
          "rows": [
            [
              "Username",
              "{PL[Username]}",
              "Input"
            ],
            [
              "Password",
              "{PL[Password]}",
              "Input"
            ],
            [
              "Login",
              "{CLICK}",
              "Input"
            ]
          ]
        },
        "outcome": "In each TestCase you only set Username and Password on the reference."
      },
      "points": [
        "Store repeated steps once in a TestStepLibrary.",
        "TestCases hold a reference, not a copy.",
        "Business Parameters carry the values that differ per TestCase.",
        "Inside the block a parameter is read as {PL[Name]}."
      ],
      "mistake": "Putting too much into one block. A block that does login, navigation and a search fits almost no TestCase.",
      "docs": [
        {
          "title": "Reusable TestStepBlocks",
          "url": "https://documentation.tricentis.com/tosca/2410/en/content/tosca_commander/reusable_teststepblocks.htm"
        }
      ],
      "questions": "TestCase design"
    },
    {
      "id": "conditions-and-loops",
      "unit": 3,
      "title": "Conditions and loops",
      "simple": "A condition runs steps only when something is true. A loop repeats steps. Tosca has If for conditions, and While, Do and Repetition for loops.",
      "body": [
        "An If statement has a Condition, a Then part and an optional Else part. The condition is normally a verification step or a TBox Evaluation Tool step. If it passes, Then runs; if it fails, Else runs. A failed condition does not fail the TestCase.",
        "A While loop repeats its steps as long as its condition holds. To prevent endless loops it stops after MaximumRepetitions, which is 30 by default. A Do loop checks the condition after each pass.",
        "When you know the number of passes, set the Repetition property on a folder. The expression {REPETITION} gives the number of the current pass. Tosca has no For loop and no Switch statement."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "How an If statement runs",
          "steps": [
            {
              "label": "Condition",
              "text": "A check, for example: is the cookie banner visible?"
            },
            {
              "label": "Then",
              "text": "Runs when the check passes: click Accept."
            },
            {
              "label": "Else",
              "text": "Runs when the check fails. Often left empty."
            },
            {
              "label": "Continue",
              "text": "The TestCase carries on either way."
            }
          ]
        }
      ],
      "example": {
        "title": "Conditions written for TBox Evaluation Tool",
        "intro": "The Expression attribute is used with ActionMode Verify. Text values go in single quotes.",
        "code": [
          {
            "label": "A number comparison with Buffers",
            "code": "{B[Count]} <= {B[Rows]}"
          },
          {
            "label": "An even number",
            "code": "{MATH[{B[Number]}%2]} == 0"
          },
          {
            "label": "A text comparison",
            "code": "'{B[Status]}' == 'Shipped'"
          },
          {
            "label": "The current pass of a repeated folder",
            "code": "{REPETITION}"
          }
        ]
      },
      "points": [
        "If: Condition, Then, Else. A failed condition is not a failed test.",
        "While and Do repeat while a condition holds.",
        "MaximumRepetitions (default 30) stops runaway loops.",
        "Repetition repeats a folder a fixed number of times."
      ],
      "mistake": "Building loops to handle many data rows. Data variations belong in TestCaseDesign, where each row gets its own result.",
      "docs": [
        {
          "title": "Conditional statements and loops",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/conditional_statements.htm"
        },
        {
          "title": "Repetitions",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/repetition.htm"
        },
        {
          "title": "Expression Evaluation",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/automation_tools/expression_evaluation.htm"
        }
      ],
      "questions": "TBox"
    },
    {
      "id": "buffers",
      "unit": 4,
      "title": "Buffers",
      "simple": "A Buffer is a named box that remembers a value while your tests run. You put something in under a name and take it out later by that name.",
      "body": [
        "Tests often need a value that only exists at runtime, such as an order number the application has just created. A Buffer keeps it. Store with ActionMode Buffer, where the Value is the Buffer's name, or with the module TBox Set Buffer. Read it anywhere with {B[Name]}.",
        "To keep only part of a text, use an XBuffer. Write the expected text with {XB[Name]} where the changing part is, and set ActionMode Verify. Tosca checks the fixed text and stores the changing part.",
        "A property can be buffered too, in the form Name=.Property. Buffers are stored on the local machine, so they are not shared with other machines."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "The life of a Buffer",
          "steps": [
            {
              "label": "Store",
              "text": "Order number field, ActionMode Buffer, Value: OrderNo."
            },
            {
              "label": "Keep",
              "text": "Tosca remembers OrderNo = 48213."
            },
            {
              "label": "Use",
              "text": "Search field, ActionMode Input, Value: {B[OrderNo]}."
            },
            {
              "label": "Result",
              "text": "Tosca types 48213 into the search field."
            }
          ]
        }
      ],
      "example": {
        "title": "Storing and reading",
        "intro": "The message reads 'Order 48213 created successfully'.",
        "code": [
          {
            "label": "ActionMode Verify: check the message and keep only the number",
            "code": "Order {XB[OrderNo]} created successfully"
          },
          {
            "label": "ActionMode Input in a later step: use the number",
            "code": "{B[OrderNo]}"
          },
          {
            "label": "ActionMode Buffer on a table: store its number of rows",
            "code": "Rows=.RowCount"
          }
        ]
      },
      "points": [
        "Store: ActionMode Buffer or TBox Set Buffer. Read: {B[Name]}.",
        "{XB[Name]} with Verify captures part of a text.",
        "Name=.Property stores a property.",
        "Buffers are local to the machine that ran the test."
      ],
      "mistake": "Relying on a Buffer between tests that run on different machines. Use Test Data Service for that.",
      "docs": [
        {
          "title": "Text expressions (Buffer, XBuffer, CP)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
        },
        {
          "title": "ActionModes",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
        },
        {
          "title": "Buffer Operations",
          "url": "https://docs.tricentis.com/tosca-2023.1/en-us/content/standard_subset/automation_tools/buffer_operations.htm"
        }
      ],
      "questions": "Buffers and parameterisation"
    },
    {
      "id": "dynamic-expressions",
      "unit": 4,
      "title": "Generated values: random, dates, calculations, text",
      "simple": "Tosca can create values while the test runs: a random number, tomorrow's date, the result of a sum, or a changed piece of text. You write an expression in curly brackets and Tosca replaces it.",
      "body": [
        "Random values keep tests repeatable when data must be unique. {RND[5]} gives a five-digit number, {RANDOMTEXT[6]} six letters and digits, and {RANDOMREGEX[\"...\"]} a text that follows a pattern.",
        "Dates are written as {DATE[base][offset][format]}. Leave the base empty for today. Offsets use d for days, M for months and y for years, so [+1d] is tomorrow.",
        "{MATH[...]} calculates with + - * / % and functions such as Round. {CALC[...]} hands the formula to Microsoft Excel, which must be installed. String operations such as {STRINGREPLACE[text][pattern][new]} change text."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Four families of expressions",
          "columns": [
            {
              "title": "Random",
              "points": [
                "{RND[5]}",
                "{RANDOMTEXT[6]}",
                "{RANDOMREGEX[\"^[A-Z]{4}$\"]}"
              ]
            },
            {
              "title": "Dates",
              "points": [
                "{DATE}",
                "{DATE[][+1d][dd/MM/yyyy]}",
                "{DATETIME}"
              ]
            },
            {
              "title": "Calculations",
              "points": [
                "{MATH[2*2+5]}",
                "{MATH[Round(3.222,2)]}",
                "{CALC[...]} (needs Excel)"
              ]
            },
            {
              "title": "Text",
              "points": [
                "{STRINGLENGTH[abc]}",
                "{STRINGTOUPPER[abc]}",
                "{TRIM[ abc ]}"
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "A registration that works on every run",
        "intro": "Each value is new whenever the test runs.",
        "grid": {
          "columns": [
            "TestStepValue",
            "Value",
            "ActionMode"
          ],
          "rows": [
            [
              "Email",
              "test_{RND[6]}@mail.com",
              "Input"
            ],
            [
              "Password",
              "{RANDOMREGEX[\"^[A-Z]{4}[a-z]{3}[0-9]{4}$\"]}",
              "Input"
            ],
            [
              "Start date",
              "{DATE[][+1d][dd/MM/yyyy]}",
              "Input"
            ],
            [
              "Quantity",
              "{RND[1][9]}",
              "Input"
            ]
          ]
        },
        "outcome": "Use 'Translate value' on a value to preview what Tosca will produce."
      },
      "points": [
        "Expressions are written in curly brackets and replaced at runtime.",
        "Random: RND, RNDDECIMAL, RANDOMTEXT, RANDOMREGEX.",
        "Dates: {DATE[base][offset][format]} with d, M and y.",
        "MATH is built in; CALC needs Excel."
      ],
      "mistake": "Typing the same random expression in two fields and expecting the same value. Each use produces a new one, so store it in a Buffer first.",
      "docs": [
        {
          "title": "Random values",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/random_values.htm"
        },
        {
          "title": "Dynamic date and time expressions",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/date_and_time_expressions.htm"
        },
        {
          "title": "Perform calculations",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/calculations.htm"
        },
        {
          "title": "String operations",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/string_operations.htm"
        }
      ],
      "questions": "Buffers and parameterisation"
    },
    {
      "id": "test-configuration-parameters",
      "unit": 4,
      "title": "Test Configuration Parameters",
      "simple": "A Test Configuration Parameter (TCP) is a setting you attach to a folder, a TestCase or an ExecutionList, such as which browser to use. Everything below it inherits the setting.",
      "body": [
        "Some values are not test data but configuration: the browser, the address of the test environment, a timeout. Typing them into steps would mean changing hundreds of steps to switch environment.",
        "Create a TCP instead and reference it with {CP[Name]}. A TCP set on a folder applies to everything inside it. A value set further down replaces the inherited one, and a value on the execution side wins over the same parameter on the TestCase.",
        "Some names have a fixed meaning. Browser selects the browser, with values such as Chrome, Edge or Firefox. Many settings can also be overridden as a TCP by writing the setting's name without spaces."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "Inheritance",
          "root": {
            "label": "Folder: Regression (Browser = Chrome, URL = qa.shop.example)",
            "text": "All TestCases inside inherit both values",
            "children": [
              {
                "label": "TestCase: Search",
                "text": "Uses Chrome and the QA address."
              },
              {
                "label": "TestCase: Checkout (Browser = Edge)",
                "text": "Overrides the browser, keeps the address."
              },
              {
                "label": "ExecutionList: UAT run (URL = uat.shop.example)",
                "text": "The execution side wins for this run."
              }
            ]
          }
        }
      ],
      "example": {
        "title": "One test, two environments",
        "intro": "The step uses the parameter, and each ExecutionList sets its own value.",
        "code": [
          {
            "label": "Value of the Url in the Open Url step",
            "code": "{CP[URL]}"
          },
          {
            "label": "On the ExecutionList for QA",
            "code": "URL = https://qa.shop.example.com"
          },
          {
            "label": "On the ExecutionList for UAT",
            "code": "URL = https://uat.shop.example.com"
          },
          {
            "label": "The browser for a run",
            "code": "Browser = Edge"
          }
        ]
      },
      "points": [
        "TCPs hold configuration, not test data.",
        "They are inherited down the tree and read with {CP[Name]}.",
        "A value set lower down, or on the execution side, wins.",
        "Browser is the TCP that selects the browser."
      ],
      "mistake": "Hard-coding the URL in steps, or using Buffers for environment values. Buffers are for runtime data; TCPs are for configuration.",
      "docs": [
        {
          "title": "Text expressions (Buffer, XBuffer, CP)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
        },
        {
          "title": "XBrowser Engine 3.0",
          "url": "https://documentation.tricentis.com/tosca/2410/en/content/engines_3.0/xbrowser/xbrowser.htm"
        }
      ],
      "questions": "Buffers and parameterisation"
    },
    {
      "id": "testcase-design",
      "unit": 4,
      "title": "TestCaseDesign: data and combinations",
      "simple": "TestCaseDesign is where you plan test data. You list what can vary and which values each thing can take, and Tosca creates the test cases for the combinations.",
      "body": [
        "A TestSheet holds Attributes (the things that vary, such as payment type) and Instances (their values, such as card or invoice). Tosca can generate combinations with several methods: All combinations, Pairwise, Orthogonal and Linear expansion.",
        "Linear expansion is the usual choice. You mark one normal value per Attribute as StraightThrough. The first test uses all of them, and every further test changes exactly one value. That gives few tests, and a failure points to one value.",
        "A TestCase Template is a TestCase with placeholders written as {XL[Attribute.SubAttribute]}. Link it to the TestSheet and instantiate it: Tosca creates one TestCase per combination."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "From data to TestCases",
          "steps": [
            {
              "label": "TestSheet",
              "text": "Attributes and their Instances."
            },
            {
              "label": "Combine",
              "text": "Generate Instances, for example by Linear expansion."
            },
            {
              "label": "Template",
              "text": "A TestCase with {XL[...]} placeholders."
            },
            {
              "label": "Instantiate",
              "text": "One TestCase per combination."
            }
          ]
        },
        {
          "type": "compare",
          "title": "How many tests? 3 Attributes with 3 Instances each",
          "columns": [
            {
              "title": "All combinations",
              "points": [
                "3 x 3 x 3 = 27 tests",
                "Complete but mostly repetitive."
              ]
            },
            {
              "title": "Linear expansion",
              "points": [
                "1 + 2 + 2 + 2 = 7 tests",
                "Each test changes one value."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "A TestSheet for a checkout",
        "intro": "Three Attributes. The first Instance of each is the StraightThrough value.",
        "grid": {
          "columns": [
            "Attribute",
            "Instances"
          ],
          "rows": [
            [
              "Payment",
              "Card (StraightThrough), Invoice, Voucher"
            ],
            [
              "Customer",
              "Existing (StraightThrough), New, Guest"
            ],
            [
              "Country",
              "Germany (StraightThrough), Austria, France"
            ]
          ]
        },
        "outcome": "In the Template the payment field has the value {XL[Payment]}."
      },
      "points": [
        "Attributes are what varies; Instances are the values.",
        "Linear expansion: one StraightThrough test, then one change per test.",
        "Templates use {XL[...]} placeholders.",
        "Instantiating creates one TestCase per combination."
      ],
      "mistake": "Copying a TestCase fifty times for fifty data rows. A change to the flow then has to be made fifty times.",
      "docs": [
        {
          "title": "Generate and combine Instances",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/testcase_design/instance_combinatorics.htm"
        },
        {
          "title": "TestCase templates",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/testcase_templates.htm"
        }
      ],
      "questions": "TestCase design"
    },
    {
      "id": "test-data-service",
      "unit": 4,
      "title": "Test Data Service",
      "simple": "Test Data Service (TDS) is a shared store of test data. A test fetches an entry, uses it and marks it as used, so two tests never take the same one.",
      "body": [
        "Hard-coded values and shared spreadsheets break when tests run in parallel, or when data can be used only once. TDS keeps the data centrally on the Tosca Server, so every machine and every test works with the same pool.",
        "Standard modules find, create, update and delete items. When a test fetches an item it is locked, and no other test can retrieve it. Values are read with {TDS[Alias.Property]}.",
        "TestCaseDesign and TDS solve different problems. TestCaseDesign creates TestCases from planned data. TDS feeds live data to tests while they run."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "One item, one test",
          "steps": [
            {
              "label": "Find",
              "text": "Fetch an item of type Customer with state New."
            },
            {
              "label": "Lock",
              "text": "The item is reserved for this test."
            },
            {
              "label": "Use",
              "text": "Read values with {TDS[Customer.Email]}."
            },
            {
              "label": "Update",
              "text": "Mark the item as used so it is not taken again."
            }
          ]
        }
      ],
      "example": {
        "title": "Reading from a fetched item",
        "intro": "The item was fetched with the alias Customer.",
        "grid": {
          "columns": [
            "TestStepValue",
            "Value",
            "ActionMode"
          ],
          "rows": [
            [
              "Email",
              "{TDS[Customer.Email]}",
              "Input"
            ],
            [
              "First name",
              "{TDS[Customer.FirstName]}",
              "Input"
            ],
            [
              "Customer number",
              "{TDS[Customer.Number]}",
              "Verify"
            ]
          ]
        }
      },
      "points": [
        "TDS is a central store shared by all machines.",
        "A fetched item is locked for other tests.",
        "Values are read with {TDS[Alias.Property]}.",
        "Use it for shared or one-time data, and for passing data between tests."
      ],
      "mistake": "Sharing a spreadsheet between parallel tests. Two tests read the same row at the same moment and one fails for no visible reason.",
      "docs": [
        {
          "title": "Test Data Service expressions",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/test_data_management/tds_expressions.htm"
        }
      ],
      "questions": "Test data (TDM/TDS)"
    },
    {
      "id": "tables",
      "unit": 5,
      "title": "Working with tables",
      "simple": "Tosca treats a table as rows, columns and cells. You can reach a cell by its position, or better, by its content: 'the row where Name is John'.",
      "body": [
        "Scan a table as one Table control, not cell by cell. In the TestStep you then add rows and cells as needed.",
        "Positions are written with $ or #. $ counts from the header, so $1 is the first data row. # is the absolute position, so #1 is usually the header row. Keywords help at the ends: $last, $header, $lastContentRow and $firstEmptyRow.",
        "Real tables change, so positions are fragile. Use ActionMode Constraint on a cell you know. Tosca finds the row that matches, and in that same row you verify or click another cell. The properties RowCount and ColumnCount give the size, and ResultCount counts matches."
      ],
      "graphics": [
        {
          "type": "grid",
          "title": "A table and how its rows are addressed",
          "columns": [
            "Address",
            "Name",
            "City",
            "Status"
          ],
          "rows": [
            [
              "$header or #1",
              "Name",
              "City",
              "Status"
            ],
            [
              "$1 or #2",
              "Anna",
              "Berlin",
              "Active"
            ],
            [
              "$2 or #3",
              "John",
              "Vienna",
              "Blocked"
            ],
            [
              "$last",
              "Maria",
              "Paris",
              "Active"
            ]
          ]
        }
      ],
      "example": {
        "title": "Check John's status wherever his row is",
        "intro": "No row number is used. The Constraint finds the row.",
        "grid": {
          "columns": [
            "Row",
            "Cell",
            "Value",
            "ActionMode"
          ],
          "rows": [
            [
              "(any row)",
              "Name",
              "John",
              "Constraint"
            ],
            [
              "(same row)",
              "Status",
              "Blocked",
              "Verify"
            ]
          ]
        },
        "outcome": "The step still works when rows are added, removed or sorted differently."
      },
      "points": [
        "Scan the whole table as one control.",
        "$ counts from the header; # is the absolute position.",
        "Constraint finds a row by content.",
        "RowCount, ColumnCount and ResultCount return numbers."
      ],
      "mistake": "Hard-coding a row number. It passes today and fails as soon as one more row appears.",
      "docs": [
        {
          "title": "Table",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/type_table.htm"
        },
        {
          "title": "Using properties of controls",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
        }
      ],
      "questions": "Steering dynamic controls"
    },
    {
      "id": "dynamic-controls",
      "unit": 5,
      "title": "Controls that change at runtime",
      "simple": "Sometimes Tosca cannot know in advance which element it will meet: a list of search results, several identical buttons, a window title that changes. A few techniques let the test decide at runtime.",
      "body": [
        "Several similar controls: scan one of them and keep only the properties they all share. Add the configuration parameter ExplicitName = True. The TestStep can now choose by position, for example #2 for the second match.",
        "Counting: the property ResultCount tells you how many controls match. Stored in a Buffer, it can drive a loop or set the upper limit of a random choice.",
        "Changing window titles: a Module finds its window by title. Make the title tolerant with a wildcard (Report*) or a regular expression that lists the valid titles. When several windows are identical, ConstraintIndex picks one by position."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "One scanned control, many matches",
          "steps": [
            {
              "label": "Scan one",
              "text": "A single Remove button, without its product-specific Id."
            },
            {
              "label": "Generalise",
              "text": "Keep only what all Remove buttons share."
            },
            {
              "label": "ExplicitName",
              "text": "Allow the TestStep to name the one it wants."
            },
            {
              "label": "Choose",
              "text": "#2 clicks the second Remove button."
            }
          ]
        }
      ],
      "example": {
        "title": "Useful settings and values",
        "intro": "For lists and windows that are only known at runtime.",
        "code": [
          {
            "label": "Configuration parameter on the ModuleAttribute",
            "code": "ExplicitName = True"
          },
          {
            "label": "Name of the TestStepValue: the second matching control",
            "code": "#2"
          },
          {
            "label": "ActionMode Buffer: count the matching controls",
            "code": "Count=.ResultCount"
          },
          {
            "label": "Window title with a wildcard",
            "code": "Report*"
          },
          {
            "label": "Window title that may be one of two",
            "code": "{REGEX[\"Orders.*|Invoices.*\"]}"
          }
        ]
      },
      "points": [
        "ExplicitName lets the TestStep choose among similar controls.",
        "ResultCount counts matching controls.",
        "Wildcards and regular expressions handle changing titles.",
        "ConstraintIndex picks one of several identical matches."
      ],
      "mistake": "Scanning a control together with today's data in its properties. It can never be found again once the data changes.",
      "docs": [
        {
          "title": "Properties for XModules (parameters)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
        },
        {
          "title": "Using properties of controls",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
        },
        {
          "title": "Regular expressions",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/regular_expressions.htm"
        },
        {
          "title": "Specify values (wildcards, escaping)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/specifying_values.htm"
        }
      ],
      "questions": "Steering dynamic controls"
    },
    {
      "id": "standard-modules",
      "unit": 5,
      "title": "The TBox toolbox: standard modules",
      "simple": "Tosca ships with ready-made Modules for common jobs: opening a browser, waiting, working with files, Excel and databases, pressing keys. Together they are the Standard subset.",
      "body": [
        "You use a standard module like any other Module: search for it, drag it into the TestCase and fill in the values. Nothing has to be scanned.",
        "Everyday helpers include TBox Set Buffer, TBox Wait, TBox Evaluation Tool, TBox Start Program and TBox Send Keys. For files there are TBox File Existence and TBox Read/Create File. Excel is handled by opening a workbook, defining a range, working on the range and closing the workbook. Databases follow the same idea: open a connection, run SQL, close.",
        "TBox Send Keys presses keys in a window using the Windows notation: ^ is Ctrl, % is Alt, + is Shift. It depends on which window has focus, so use it only when a control cannot be operated directly."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Standard modules by job",
          "columns": [
            {
              "title": "Browser and programs",
              "points": [
                "Open Url, Close Browser",
                "TBox Start Program",
                "TBox Window Operation"
              ]
            },
            {
              "title": "Logic and values",
              "points": [
                "TBox Set Buffer",
                "TBox Evaluation Tool",
                "TBox Wait"
              ]
            },
            {
              "title": "Files and data",
              "points": [
                "TBox File Existence",
                "TBox Read/Create File",
                "Excel and database modules"
              ]
            },
            {
              "title": "Keyboard and dialogs",
              "points": [
                "TBox Send Keys",
                "TBox Dialog",
                "TBox Take Screenshot"
              ]
            }
          ]
        },
        {
          "type": "flow",
          "title": "The Excel pattern",
          "steps": [
            {
              "label": "Open",
              "text": "TBox Open Excel Workbook"
            },
            {
              "label": "Range",
              "text": "TBox Define Excel Range"
            },
            {
              "label": "Work",
              "text": "TBox Excel Range Manipulation"
            },
            {
              "label": "Close",
              "text": "TBox Close Excel Workbook"
            }
          ]
        }
      ],
      "example": {
        "title": "Checking a record in the database",
        "intro": "After creating a customer in the UI, the test confirms it was saved.",
        "grid": {
          "columns": [
            "Module",
            "Attribute",
            "Value"
          ],
          "rows": [
            [
              "TBox DB Open Connection",
              "DSN",
              "QA_Customers"
            ],
            [
              "TBox DB Run SQL Statement",
              "SQL Statement",
              "SELECT name FROM customers WHERE email = '{B[Email]}'"
            ],
            [
              "TBox DB Run SQL Statement",
              "Result cell: name",
              "John Miller (Verify)"
            ],
            [
              "TBox DB Close Connection",
              "Connection name",
              "QA_Customers"
            ]
          ]
        }
      },
      "points": [
        "Standard modules need no scanning.",
        "Excel and databases follow open, work, close.",
        "Send Keys: ^ Ctrl, % Alt, + Shift, for example ^(a).",
        "Never change the originals; copy a module first."
      ],
      "mistake": "Operating Excel or Notepad through their windows. The standard modules read and write the files directly and are far more reliable.",
      "docs": [
        {
          "title": "Expression Evaluation",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/automation_tools/expression_evaluation.htm"
        },
        {
          "title": "File Operations",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/automation_tools/file_operations.htm"
        },
        {
          "title": "Excel Modules",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/engines_3.0/excel.htm"
        },
        {
          "title": "Database Modules",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/engines_3.0/database.htm"
        },
        {
          "title": "Basic Windows Operations",
          "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/standard_subset/automation_tools/windows_operations.htm"
        },
        {
          "title": "Process Operations (TBox Start Program)",
          "url": "https://docs.tricentis.com/tosca-2023.1/en-us/content/standard_subset/automation_tools/process_operations.htm"
        }
      ],
      "questions": "TBox"
    },
    {
      "id": "scratchbook-and-executionlists",
      "unit": 6,
      "title": "ScratchBook and ExecutionLists",
      "simple": "The ScratchBook is a notepad for trying a test while you build it. An ExecutionList is the official run, where Tosca keeps the results.",
      "body": [
        "While building, you run a TestCase, or just a few steps, in the ScratchBook. You see at once what passed and failed. Tosca does not save the ScratchBook's structure or its results.",
        "For a run that counts, create an ExecutionList in the Execution section and drag TestCases into it. Each TestCase becomes an ExecutionEntry. After a run the ActualLog shows the latest overall result, and every entry keeps a log for each run, so you have a history.",
        "The two can behave differently. Recovery scenarios work only in ExecutionLists, and a Test Configuration Parameter on the ExecutionList overrides the same parameter on the TestCase."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Trial run and official run",
          "columns": [
            {
              "title": "ScratchBook",
              "points": [
                "For building and debugging.",
                "Results are not saved.",
                "Can run single steps."
              ]
            },
            {
              "title": "ExecutionList",
              "points": [
                "For runs that count.",
                "Results and history are stored.",
                "Recovery and reporting work here."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "Reading a result",
        "intro": "An ExecutionList with three entries after a run.",
        "grid": {
          "columns": [
            "ExecutionEntry",
            "Result",
            "What to do"
          ],
          "rows": [
            [
              "Login",
              "Passed",
              "Nothing."
            ],
            [
              "Search",
              "Failed",
              "Open the log and find the first failed step."
            ],
            [
              "Checkout",
              "No result",
              "Did not run. Check what stopped the run."
            ]
          ]
        }
      },
      "points": [
        "ScratchBook: quick trial, nothing saved.",
        "ExecutionList: stored results and history.",
        "A TestCase in an ExecutionList is an ExecutionEntry.",
        "Execution-side parameters override those on the TestCase."
      ],
      "mistake": "Reporting a ScratchBook result as proof that a test passed.",
      "docs": [
        {
          "title": "Work with execution results",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/execution_results.htm"
        },
        {
          "title": "Run the demo TestCase",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tutorial/executionlist.htm"
        }
      ],
      "questions": "Execution lists and DEX"
    },
    {
      "id": "recovery-and-cleanup",
      "unit": 6,
      "title": "Failures, recovery and cleanup",
      "simple": "Tests fail for two reasons: Tosca could not operate something, or a check came out wrong. You decide what happens next: stop, continue, or try to recover.",
      "body": [
        "A dialog failure means Tosca could not operate a control, for example because an unexpected pop-up is in the way. A verification failure means the control was found but the value was wrong, which is often a real defect.",
        "The reaction is set per failure type with OnDialogFailure, OnVerificationFailure and OnExceptionFailure, in the settings or as Test Configuration Parameters. The values are Continue, Execute next TestCase, Halt execution and Recover.",
        "With Recover, Tosca runs a Recovery Scenario: steps you define to repair the situation, such as closing the pop-up. Its RetryLevel says where to resume: TestStepValue, TestStep or TestCase. A CleanUp scenario resets the application, for example by closing the browser, so the next test starts clean."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "What happens after a failed step",
          "steps": [
            {
              "label": "Failure",
              "text": "A step fails during an ExecutionList run."
            },
            {
              "label": "Recovery",
              "text": "The Recovery Scenario closes the pop-up."
            },
            {
              "label": "Retry",
              "text": "The failed step is tried again (RetryLevel)."
            },
            {
              "label": "CleanUp",
              "text": "If that does not help, the application is reset for the next test."
            }
          ]
        }
      ],
      "example": {
        "title": "Typical settings",
        "intro": "As Test Configuration Parameters on a folder of TestCases.",
        "code": [
          {
            "label": "Try to recover when a control cannot be operated",
            "code": "OnDialogFailure = Recover"
          },
          {
            "label": "Log a wrong value but carry on with the remaining steps",
            "code": "OnVerificationFailure = Continue"
          },
          {
            "label": "RetryLevel of the Recovery Scenario",
            "code": "TestStep"
          }
        ]
      },
      "points": [
        "Dialog failure: could not operate. Verification failure: wrong value.",
        "OnDialogFailure and OnVerificationFailure decide the reaction.",
        "A Recovery Scenario repairs and retries.",
        "A CleanUp scenario protects the next test."
      ],
      "mistake": "Setting Continue for everything. After a missing control the following steps usually fail too and only add noise.",
      "docs": [
        {
          "title": "Configure error handling",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/exceptions.htm"
        },
        {
          "title": "Create a Recovery Scenario",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tbox/recovery_create_scenario.htm"
        }
      ],
      "questions": "Recovery and cleanup scenarios"
    },
    {
      "id": "distributed-execution",
      "unit": 6,
      "title": "Distributed Execution (DEX)",
      "simple": "Distributed Execution runs your tests on several machines at once. A suite that takes ten hours on one machine can finish in one hour on ten.",
      "body": [
        "Three parts work together. On your machine you prepare the run in Tosca Commander. The Distribution Server hands out the work. Agents are the machines that execute the tests and send the results back.",
        "You group ExecutionLists into a TestEvent and start it. A configuration decides which agents may take it, for example only agents with a certain browser.",
        "UI tests need a real, unlocked desktop. An agent on a machine where nobody is logged in is set up for unattended execution: it opens its own remote desktop session before running. Tests that run in parallel must not depend on each other or share the same data."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "The parts of DEX",
          "root": {
            "label": "Distribution Server",
            "text": "Receives TestEvents and hands out the work",
            "children": [
              {
                "label": "Agent 1",
                "text": "Runs ExecutionList A and returns the results."
              },
              {
                "label": "Agent 2",
                "text": "Runs ExecutionList B and returns the results."
              },
              {
                "label": "Agent 3",
                "text": "Runs ExecutionList C and returns the results."
              }
            ]
          }
        }
      ],
      "example": {
        "title": "How many agents do I need?",
        "intro": "Total run time divided by the time window.",
        "grid": {
          "columns": [
            "Suite",
            "Window",
            "Calculation",
            "Agents"
          ],
          "rows": [
            [
              "500 tests x 1.2 min = 600 min",
              "5 hours (300 min)",
              "600 / 300",
              "2"
            ],
            [
              "1000 tests x 3 min = 3000 min",
              "2 hours (120 min)",
              "3000 / 120",
              "25, plus a spare"
            ]
          ]
        }
      },
      "points": [
        "Server distributes, agents execute.",
        "A TestEvent bundles ExecutionLists for a distributed run.",
        "UI tests need an unlocked desktop session.",
        "Parallel tests must be independent."
      ],
      "mistake": "Adding agents while tests still depend on a fixed order or shared data. They then fail faster instead of finishing faster.",
      "docs": [
        {
          "title": "Tosca Distributed Execution",
          "url": "https://docs.tricentis.com/tosca-2024.2/en-us/content/distributed_execution/distributed_execution_overview.htm"
        },
        {
          "title": "Distributed Execution configurations",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/distributed_execution/dex_configurations_hub.htm"
        }
      ],
      "questions": "Execution lists and DEX"
    },
    {
      "id": "ci-cd",
      "unit": 6,
      "title": "CI/CD integration",
      "simple": "CI/CD means software is built, tested and delivered automatically. Integrating Tosca means the pipeline starts the Tosca tests by itself after each build and reads the results.",
      "body": [
        "The pipeline, for example in Jenkins or Azure DevOps, does not open Tosca Commander. A command-line client triggers a TestEvent, which runs through Distributed Execution. The client waits and returns the results.",
        "Results come back in JUnit format, a standard that pipeline tools can display. An exit code tells the pipeline whether to mark the stage as failed.",
        "The classic client is ToscaCIClient.exe. Tricentis now lists it as a legacy feature and offers the Tosca Execution Client for the same job."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "Tosca in a pipeline",
          "steps": [
            {
              "label": "Build",
              "text": "The new version is built."
            },
            {
              "label": "Deploy",
              "text": "It is installed on the test environment."
            },
            {
              "label": "Trigger",
              "text": "The client starts a Tosca TestEvent."
            },
            {
              "label": "Execute",
              "text": "Agents run the tests."
            },
            {
              "label": "Report",
              "text": "JUnit results decide pass or fail."
            }
          ]
        }
      ],
      "example": {
        "title": "Calling the Tosca CI Client",
        "intro": "One line in a pipeline step.",
        "code": [
          {
            "label": "Run the ExecutionLists named in the configuration file and write JUnit results",
            "code": "ToscaCIClient.exe -m distributed -c \"c:/temp/CITestExecutionConfiguration.xml\" -r \"c:/temp/result.xml\" -t junit -x True"
          }
        ],
        "outcome": "-m distributed runs through DEX, -c names the configuration, -r the result file, -t the format, and -x True returns an exit code."
      },
      "points": [
        "The pipeline triggers Tosca through a command-line client.",
        "Tests run as a TestEvent on DEX agents.",
        "JUnit results are shown in the pipeline.",
        "The stage must run after deployment has finished."
      ],
      "mistake": "Starting the tests before the deployment is complete, so they run against the old version.",
      "docs": [
        {
          "title": "Tosca CI Client call parameters",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/continuous_integration/execution_remote.htm"
        },
        {
          "title": "Tosca Distributed Execution",
          "url": "https://docs.tricentis.com/tosca-2024.2/en-us/content/distributed_execution/distributed_execution_overview.htm"
        }
      ],
      "questions": "CI/CD integration"
    },
    {
      "id": "api-testing",
      "unit": 7,
      "title": "API testing",
      "simple": "An API is a way for programs to talk to each other without a screen. API testing sends a request directly to the application and checks the answer.",
      "body": [
        "API tests are fast and stable because no screen is involved. They are also the only way to test a system that has no user interface.",
        "The tool is API Scan. You import an interface description or create a request, send it, check the response and export it to Tosca Commander. Tosca creates the Modules and the TestCase for you.",
        "In the TestCase you verify the status code and values in the response. A value from one response, such as a login token, is stored in a Buffer and sent with the next request. This is called chaining. If a system you depend on is not available, service virtualization (OSV) can answer in its place."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "Chaining two calls",
          "steps": [
            {
              "label": "Request 1",
              "text": "POST /login with user and password."
            },
            {
              "label": "Response 1",
              "text": "Status 200 and a token, stored in a Buffer."
            },
            {
              "label": "Request 2",
              "text": "GET /orders with the token in the header."
            },
            {
              "label": "Response 2",
              "text": "Status 200 and the list of orders."
            }
          ]
        }
      ],
      "example": {
        "title": "Using the token from a login call",
        "intro": "The response step buffers the token, and the next request sends it.",
        "grid": {
          "columns": [
            "Step",
            "Element",
            "Value",
            "ActionMode"
          ],
          "rows": [
            [
              "Login response",
              "StatusCode",
              "200",
              "Verify"
            ],
            [
              "Login response",
              "token",
              "Token",
              "Buffer"
            ],
            [
              "Orders request",
              "Header: Authorization",
              "Bearer {B[Token]}",
              "Input"
            ],
            [
              "Orders response",
              "StatusCode",
              "200",
              "Verify"
            ]
          ]
        }
      },
      "points": [
        "API tests check the application without its screens.",
        "API Scan builds requests and exports them as Modules and TestCases.",
        "Verify the status code and the response values.",
        "Chaining: buffer a value and use it in the next request."
      ],
      "mistake": "Pasting a token copied from another tool. It expires, and the whole suite fails the next day.",
      "docs": [
        {
          "title": "Tricentis Tosca API Scan",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tbox/api_scan.htm"
        },
        {
          "title": "Orchestrated Service Virtualization",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/orchestrate/orchestrate.htm"
        },
        {
          "title": "Text expressions (Buffer, XBuffer, CP)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
        }
      ],
      "questions": "API testing"
    },
    {
      "id": "sap-testing",
      "unit": 7,
      "title": "SAP testing",
      "simple": "Tosca automates SAP like any other application. For the classic SAP GUI there is one requirement first: SAP scripting has to be switched on.",
      "body": [
        "Tosca operates SAP GUI through SAP's own scripting interface. Scripting must be enabled on the server, with the parameter sapgui/user_scripting set in transaction RZ11, and in the SAP GUI options on your PC. If XScan shows no controls on an SAP screen, check this first.",
        "The Standard subset has SAP modules for logging on and for entering a transaction code, so you do not scan those screens. You scan the transaction screens themselves.",
        "Lists of items are steered as tables. The document number that SAP shows in the status bar after saving is captured with an XBuffer. Web-based SAP applications such as Fiori run in a browser and are tested through the browser engine."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "A typical SAP test",
          "steps": [
            {
              "label": "Logon",
              "text": "Standard SAP logon module."
            },
            {
              "label": "T-code",
              "text": "Enter the transaction, for example VA01."
            },
            {
              "label": "Fill",
              "text": "Enter header and item data on the scanned screens."
            },
            {
              "label": "Save",
              "text": "Save the document."
            },
            {
              "label": "Capture",
              "text": "Read the document number from the status bar."
            }
          ]
        }
      ],
      "example": {
        "title": "Keeping the document number",
        "intro": "The status bar reads 'Standard Order 12345 has been saved'.",
        "code": [
          {
            "label": "SAP server parameter, set in transaction RZ11",
            "code": "sapgui/user_scripting = TRUE"
          },
          {
            "label": "Status bar, ActionMode Verify",
            "code": "Standard Order {XB[OrderNumber]} has been saved"
          },
          {
            "label": "Use the number in the next transaction",
            "code": "{B[OrderNumber]}"
          }
        ]
      },
      "points": [
        "SAP GUI scripting must be enabled on server and client.",
        "Standard modules handle logon and transaction codes.",
        "Item lists are steered as tables.",
        "The status bar message gives you the document number."
      ],
      "mistake": "Spending hours on identification when the real cause is that scripting is switched off.",
      "docs": [
        {
          "title": "ActionModes",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
        }
      ],
      "questions": "SAP testing"
    },
    {
      "id": "other-technologies",
      "unit": 7,
      "title": "Desktop, mobile and image-based testing",
      "simple": "An engine is the part of Tosca that knows how to talk to one kind of application. Web pages, Windows programs and mobile apps each have their own engine, and XScan picks the right one.",
      "body": [
        "For web pages the engine works with the page's HTML. Windows programs, and parts of the browser that are not the page itself such as dialogs or the address bar, are reached through the UIA engine, which uses Microsoft's UI Automation.",
        "The mobile engine tests apps on Android and iOS: native apps, web apps and hybrids. The device or emulator is connected first, and then you scan and build tests as usual.",
        "When no engine can see the controls, for example in a remote desktop session or a drawn canvas, image-based steering and Vision AI recognise controls by how they look. This is slower and more sensitive to display settings, so it comes last."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Which engine for which application?",
          "columns": [
            {
              "title": "Web",
              "points": [
                "Pages in Chrome, Edge, Firefox",
                "Works with the page's HTML"
              ]
            },
            {
              "title": "Desktop (UIA)",
              "points": [
                "Windows programs",
                "Browser dialogs and address bar"
              ]
            },
            {
              "title": "Mobile",
              "points": [
                "Android and iOS",
                "Native, web and hybrid apps"
              ]
            },
            {
              "title": "Image-based",
              "points": [
                "Remote sessions, canvas",
                "Recognises controls by appearance"
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "A browser dialog XScan cannot see",
        "intro": "A site asks 'Allow this site to know your location?'. The dialog belongs to the browser, not the page.",
        "grid": {
          "columns": [
            "What you do",
            "Why"
          ],
          "rows": [
            [
              "Start the scan and right-click the browser window",
              "To choose the engine yourself."
            ],
            [
              "Select the UIA engine instead of HTML",
              "The dialog is not part of the HTML page."
            ],
            [
              "Scan the Allow and Block buttons as their own Module",
              "They can now be clicked in a TestStep."
            ]
          ]
        }
      },
      "points": [
        "An engine connects Tosca to one technology.",
        "HTML for pages, UIA for Windows controls and browser dialogs.",
        "The mobile engine covers Android and iOS.",
        "Image-based steering is the last resort."
      ],
      "mistake": "Trying different identification properties when the control is simply invisible to the chosen engine. Switch the engine instead.",
      "docs": [
        {
          "title": "UIA Engine 3.0",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/engines_3.0/uia/tbox_uia_engine.htm"
        },
        {
          "title": "Mobile Engine 3.0",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/engines_3.0/mobile/tbox_mobileweb.htm"
        },
        {
          "title": "Steer with Engines 3.0",
          "url": "https://documentation.tricentis.com/tosca/2320/en/content/tbox/tbox_intro.htm"
        }
      ],
      "questions": "Module scanning (XScan)"
    },
    {
      "id": "requirements-and-risk",
      "unit": 8,
      "title": "Requirements and risk-based testing",
      "simple": "Requirements say what the software must do. Risk-based testing means testing the most important and most used parts first, and being able to show how much of each requirement is covered.",
      "body": [
        "In the Requirements section you list the requirements and give each a weight. The weight can be calculated from two estimates: how often the function is used (frequency class) and how bad a failure would be (damage class). The formula is Weight = 2^Frequency class x 2^Damage class.",
        "You then link TestCases to requirements. Tosca shows how much of each requirement is covered by tests. Linking ExecutionLists as well adds the execution state, so you see whether the tests have run and passed.",
        "When time is short, the weights tell you what to test first and how much risk remains uncovered."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "From requirement to coverage",
          "steps": [
            {
              "label": "Requirement",
              "text": "For example: a customer can pay by card."
            },
            {
              "label": "Weight",
              "text": "From frequency and damage."
            },
            {
              "label": "Link",
              "text": "Connect TestCases and ExecutionLists."
            },
            {
              "label": "Coverage",
              "text": "See what is tested and what passed."
            }
          ]
        }
      ],
      "example": {
        "title": "Calculating weights",
        "intro": "Higher classes mean used more often, or more damage if it fails.",
        "grid": {
          "columns": [
            "Requirement",
            "Frequency class",
            "Damage class",
            "Weight"
          ],
          "rows": [
            [
              "Pay by card",
              "4",
              "3",
              "2^4 x 2^3 = 128"
            ],
            [
              "Change profile picture",
              "1",
              "1",
              "2^1 x 2^1 = 4"
            ]
          ]
        },
        "outcome": "Paying by card is 32 times as important, so its tests come first."
      },
      "points": [
        "Requirements describe what must work.",
        "Weight = 2^Frequency class x 2^Damage class.",
        "Linking TestCases shows coverage.",
        "Linking ExecutionLists shows the execution state."
      ],
      "mistake": "Linking only TestCases. Coverage looks complete while nothing shows whether the tests were run or passed.",
      "docs": [
        {
          "title": "Work with Requirements",
          "url": "https://documentation.tricentis.com/tosca/2320/en/content/requirements/requirements.htm"
        }
      ],
      "questions": "Reporting"
    },
    {
      "id": "multi-user-workspaces",
      "unit": 8,
      "title": "Working in a multi-user workspace",
      "simple": "When a team works on the same tests, everyone connects to one shared repository. To change something you check it out, which locks it for the others, and you check it in when you are done.",
      "body": [
        "A multi-user workspace is connected to a common repository in a database. Each tester still has a local workspace, which is synchronised with that repository.",
        "Objects you have not checked out are read-only. Checkout marks an object as yours, and others see it as locked. Checkin all publishes your changes and releases your locks. Update all brings in everyone else's changes.",
        "If someone is away with objects still checked out, an administrator can revoke the checkout. Their unpublished changes are lost, so it is a last resort."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "A working day",
          "steps": [
            {
              "label": "Update all",
              "text": "Start with everyone's latest changes."
            },
            {
              "label": "Checkout",
              "text": "Lock only what you are going to change."
            },
            {
              "label": "Work",
              "text": "Edit your objects."
            },
            {
              "label": "Checkin all",
              "text": "Publish and release your locks before you leave."
            }
          ]
        }
      ],
      "example": {
        "title": "What the team sees",
        "intro": "The same TestCase from three points of view.",
        "grid": {
          "columns": [
            "Situation",
            "You",
            "Your colleagues"
          ],
          "rows": [
            [
              "Nobody has it checked out",
              "Read-only",
              "Read-only"
            ],
            [
              "You checked it out",
              "Editable",
              "Locked, they cannot edit it"
            ],
            [
              "You checked it in",
              "Read-only again",
              "They see your changes after Update all"
            ]
          ]
        }
      },
      "points": [
        "A common repository holds the team's project.",
        "Checkout locks, Checkin all publishes and unlocks.",
        "Update all fetches other people's changes.",
        "Check out only what you need."
      ],
      "mistake": "Checking out a whole folder tree 'to be safe' and blocking the rest of the team.",
      "docs": [
        {
          "title": "Checkin and checkout objects",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/checkin_and_checkout.htm"
        },
        {
          "title": "Create and manage workspaces",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/create_and_manage_workspaces.htm"
        }
      ],
      "questions": "Multi-user workspaces"
    },
    {
      "id": "reporting",
      "unit": 8,
      "title": "Results and reporting",
      "simple": "Reporting shows what was tested and what happened: which tests passed or failed, with evidence, so others can trust the result.",
      "body": [
        "The source is always the ExecutionList. Each run is stored with a log of every step. For a failed test, open the log, find the first failed step and read its message.",
        "Evidence makes a result convincing. Tosca can take a screenshot when a step fails, and DokuSnapper can document a whole run with screenshots, which is useful for audits.",
        "For managers, a summary is more useful than a log: a printed report of the ExecutionList, or the Requirements section with coverage and execution state. In pipelines, the JUnit result file plays this role."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Who needs what?",
          "columns": [
            {
              "title": "Tester",
              "points": [
                "The execution log",
                "The first failed step and its message",
                "The screenshot"
              ]
            },
            {
              "title": "Manager",
              "points": [
                "Passed and failed counts",
                "Coverage of requirements",
                "Trend over time"
              ]
            },
            {
              "title": "Auditor",
              "points": [
                "Proof for every step",
                "DokuSnapper documents",
                "Who ran what, and when"
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "Analysing a failed test",
        "intro": "The same routine every time.",
        "grid": {
          "columns": [
            "Step",
            "Question"
          ],
          "rows": [
            [
              "1. Open the log",
              "Which step failed first?"
            ],
            [
              "2. Run it once more",
              "Was it a one-off?"
            ],
            [
              "3. Check the application by hand",
              "Did the screen change, or is it a defect?"
            ],
            [
              "4. Act",
              "Update the Module, or raise a defect with log and screenshot."
            ]
          ]
        }
      },
      "points": [
        "Results come from ExecutionLists.",
        "Start analysis at the first failed step.",
        "Screenshots and DokuSnapper provide evidence.",
        "Requirements coverage gives the management view."
      ],
      "mistake": "Changing a failed test until it turns green without understanding the cause. A real defect can be hidden that way.",
      "docs": [
        {
          "title": "Work with execution results",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/execution_results.htm"
        },
        {
          "title": "Capture the execution of your tests",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/doku_snapper.htm"
        },
        {
          "title": "Work with Requirements",
          "url": "https://documentation.tricentis.com/tosca/2320/en/content/requirements/requirements.htm"
        }
      ],
      "questions": "Reporting"
    }
  ],
  "cheatsheet": [
    {
      "title": "Buffers",
      "docs": [
        {
          "title": "Text expressions (Buffer, XBuffer, CP)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
        },
        {
          "title": "ActionModes",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
        }
      ],
      "items": [
        [
          "{B[Name]}",
          "Read a Buffer."
        ],
        [
          "Name",
          "With ActionMode Buffer: store the control's value under this name."
        ],
        [
          "Name=.Property",
          "With ActionMode Buffer: store a property, for example Rows=.RowCount."
        ],
        [
          "Order {XB[Name]} created",
          "With ActionMode Verify: check the fixed text and store the changing part."
        ]
      ]
    },
    {
      "title": "Parameters and data",
      "docs": [
        {
          "title": "Text expressions (Buffer, XBuffer, CP)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
        },
        {
          "title": "Reusable TestStepBlocks",
          "url": "https://documentation.tricentis.com/tosca/2410/en/content/tosca_commander/reusable_teststepblocks.htm"
        },
        {
          "title": "TestCase templates",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/testcase_templates.htm"
        },
        {
          "title": "Test Data Service expressions",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/test_data_management/tds_expressions.htm"
        }
      ],
      "items": [
        [
          "{CP[Name]}",
          "Read a Test Configuration Parameter."
        ],
        [
          "{PL[Name]}",
          "Read a Business Parameter inside a reusable block."
        ],
        [
          "{XL[Attribute.SubAttribute]}",
          "Read a TestSheet value in a Template."
        ],
        [
          "{TDS[Alias.Property]}",
          "Read a value from a Test Data Service item."
        ],
        [
          "Browser = Chrome",
          "Test Configuration Parameter that selects the browser (Chrome, Edge, Firefox, ...)."
        ]
      ]
    },
    {
      "title": "Random values",
      "docs": [
        {
          "title": "Random values",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/random_values.htm"
        }
      ],
      "items": [
        [
          "{RND[5]}",
          "A random number with five digits."
        ],
        [
          "{RND[1][16]}",
          "A random whole number between 1 and 16."
        ],
        [
          "{RNDDECIMAL[2][100][999]}",
          "A random number between 100 and 999 with two decimal places."
        ],
        [
          "{RANDOMTEXT[6]}",
          "Six random letters and digits."
        ],
        [
          "{RANDOMREGEX[\"^[A-Z][a-z]+[0-9]{4}$\"]}",
          "A random text that follows the pattern."
        ]
      ]
    },
    {
      "title": "Dates",
      "docs": [
        {
          "title": "Dynamic date and time expressions",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/date_and_time_expressions.htm"
        }
      ],
      "items": [
        [
          "{DATE}",
          "Today's date."
        ],
        [
          "{DATE[][+1d][dd/MM/yyyy]}",
          "Tomorrow, in the given format."
        ],
        [
          "{DATE[][-3y-2M-5d][]}",
          "3 years, 2 months and 5 days ago. d = days, M = months, y = years."
        ],
        [
          "{DATETIME}",
          "A time stamp with date and time."
        ],
        [
          "{MONTHFIRST} and {MONTHLAST}",
          "First and last day of the current month."
        ]
      ]
    },
    {
      "title": "Calculations",
      "docs": [
        {
          "title": "Perform calculations",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/calculations.htm"
        }
      ],
      "items": [
        [
          "{MATH[2*2+5]}",
          "Calculate. Operators: + - * / %."
        ],
        [
          "{MATH[{B[Count]}+1]}",
          "Add one to a Buffer."
        ],
        [
          "{MATH[Round(3.222,2)]}",
          "Round to two decimals. Other functions: Abs, Ceiling, Floor, Max, Min, Pow, Sqrt, Truncate."
        ],
        [
          "{CALC[TRUNC(55.76543,2)]}",
          "Calculate with an Excel function. Microsoft Excel must be installed."
        ]
      ]
    },
    {
      "title": "Text",
      "docs": [
        {
          "title": "String operations",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/string_operations.htm"
        }
      ],
      "items": [
        [
          "{STRINGREPLACE[text][pattern][new]}",
          "Replace every match of the pattern. The pattern is a regular expression."
        ],
        [
          "{STRINGLENGTH[text]}",
          "The number of characters."
        ],
        [
          "{STRINGTOUPPER[text]} and {STRINGTOLOWER[text]}",
          "Change the letter case."
        ],
        [
          "{TRIM[text]}",
          "Remove spaces at the ends."
        ],
        [
          "{NUMBEROFOCCURRENCES[text][pattern]}",
          "Count how often the pattern appears."
        ]
      ]
    },
    {
      "title": "Checking properties",
      "docs": [
        {
          "title": "Using properties of controls",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
        }
      ],
      "items": [
        [
          ".Visible==True",
          "The control is visible."
        ],
        [
          ".Exists==False",
          "The control does not exist (DataType Boolean)."
        ],
        [
          ".Enabled==True",
          "The control can be used."
        ],
        [
          ".InnerText==Hello",
          "A web element shows this text."
        ],
        [
          ".ResultCount==3",
          "Three controls match."
        ],
        [
          "== != > < <= >=",
          "The available operators."
        ]
      ]
    },
    {
      "title": "Tables",
      "docs": [
        {
          "title": "Table",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/type_table.htm"
        }
      ],
      "items": [
        [
          "$1",
          "First row or column after the header."
        ],
        [
          "#1",
          "First physical row or column, normally the header."
        ],
        [
          "$last",
          "Last row or column."
        ],
        [
          "$header",
          "The header row."
        ],
        [
          "$lastContentRow and $firstEmptyRow",
          "Last row with a value, and first row without one."
        ],
        [
          ".RowCount and .ColumnCount",
          "Size of the table."
        ]
      ]
    },
    {
      "title": "Mouse",
      "docs": [
        {
          "title": "Click operations",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/click_operations.htm"
        }
      ],
      "items": [
        [
          "{CLICK}",
          "Left click. X also clicks, without moving the mouse."
        ],
        [
          "{DOUBLECLICK}",
          "Double click."
        ],
        [
          "{RIGHTCLICK}",
          "Right click."
        ],
        [
          "{MOUSEOVER}",
          "Move the pointer over the control."
        ],
        [
          "{DRAG} and {DROP}",
          "Drag one control and drop it on another."
        ]
      ]
    },
    {
      "title": "Keyboard (TBox Send Keys)",
      "docs": [
        {
          "title": "Basic Windows Operations",
          "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/standard_subset/automation_tools/windows_operations.htm"
        }
      ],
      "items": [
        [
          "^(a)",
          "Ctrl+A. ^ is Ctrl."
        ],
        [
          "%\"{F4}\"",
          "Alt+F4. % is Alt."
        ],
        [
          "+",
          "Shift."
        ],
        [
          "\"{DEL}\"",
          "The Delete key."
        ]
      ]
    },
    {
      "title": "Wildcards and regular expressions",
      "docs": [
        {
          "title": "Specify values (wildcards, escaping)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/specifying_values.htm"
        },
        {
          "title": "Regular expressions",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/regular_expressions.htm"
        }
      ],
      "items": [
        [
          "Report*",
          "Any text that starts with Report."
        ],
        [
          "{REGEX[\"^Order\"]}",
          "A text that matches the regular expression."
        ],
        [
          "{REGEX[\"Orders.*|Invoices.*\"]}",
          "One of two alternatives."
        ],
        [
          "{REGEX[\"Order (?<No>[0-9]+)\"]}",
          "With ActionMode Verify: store the matched group in the Buffer No."
        ]
      ]
    },
    {
      "title": "Loops and failures",
      "docs": [
        {
          "title": "Repetitions",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/repetition.htm"
        },
        {
          "title": "Conditional statements and loops",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/conditional_statements.htm"
        },
        {
          "title": "Configure error handling",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/exceptions.htm"
        },
        {
          "title": "Settings - Synchronization",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/settings_tbox_synchronization.htm"
        }
      ],
      "items": [
        [
          "{REPETITION}",
          "The number of the current pass of a repeated folder."
        ],
        [
          "MaximumRepetitions",
          "Property of a While or Do loop. The default is 30."
        ],
        [
          "OnDialogFailure = Recover",
          "What to do when a control cannot be operated."
        ],
        [
          "OnVerificationFailure = Continue",
          "What to do when a check fails. Values: Continue, Execute next TestCase, Halt execution, Recover."
        ],
        [
          "SynchronizationTimeoutDuringWaitOn = 60000",
          "How long WaitOn waits, in milliseconds."
        ]
      ]
    },
    {
      "title": "Module settings",
      "docs": [
        {
          "title": "Properties for XModules (parameters)",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
        },
        {
          "title": "Default properties for Modules",
          "url": "https://documentation.tricentis.com/tosca/2320/en/content/tosca_commander/modules_properties.htm"
        }
      ],
      "items": [
        [
          "ExplicitName = True",
          "Configuration parameter: the TestStep may name which matching control to use, for example #2."
        ],
        [
          "ConstraintIndex = 3",
          "Configuration parameter: use the third match."
        ],
        [
          "HeaderRow = 3",
          "Steering parameter: the header of a table is in row 3."
        ],
        [
          "Cardinality 0-N",
          "The control may be used several times in one TestStep."
        ],
        [
          "Approved;Rejected;Pending",
          "ValueRange: the values offered in the TestStep."
        ]
      ]
    }
  ],
  "glossary": [
    {
      "term": "$ and #",
      "simple": "Two ways to count rows and columns.",
      "detail": "$ is relative to the header ($1 is the first data row). # is absolute (#1 is the first physical row). Related keywords: $last, $header, $lastContentRow, $firstEmptyRow.",
      "topic": "Steering dynamic controls"
    },
    {
      "term": "ActionMode",
      "simple": "What Tosca does with a value: enter it, check it, store it or wait for it.",
      "detail": "Input enters or clicks, Verify checks, Buffer stores, WaitOn waits for a state, Constraint narrows a search such as a table row, and Select picks a node.",
      "topic": "TestCase design"
    },
    {
      "term": "Agent",
      "simple": "A machine that runs tests for DEX.",
      "detail": "UI tests need an interactive, unlocked desktop on it. Agents can carry characteristics such as browser or operating system so the right tests land on them.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "API Scan",
      "simple": "The tool where requests are built, sent and turned into Modules.",
      "detail": "It can also import interface descriptions, so requests do not have to be typed by hand.",
      "topic": "API testing"
    },
    {
      "term": "Buffer",
      "simple": "A named value that Tosca remembers during a run.",
      "detail": "Write it with ActionMode Buffer (the value is the Buffer name) or TBox Set Buffer. Read it with {B[Name]}. Check stored values in the Buffer viewer.",
      "topic": "Buffers and parameterisation"
    },
    {
      "term": "Business Parameter",
      "simple": "A value that a TestCase passes into a reusable block.",
      "detail": "Inside the block it is referenced as {PL[Name]}. Each TestCase that uses the block sets its own value.",
      "topic": "TestCase design"
    },
    {
      "term": "Business Parameter and TCP",
      "simple": "A Business Parameter passes data into a reusable block. A TCP holds configuration.",
      "detail": "They can be combined: the value of a Business Parameter may be a TCP, such as {CP[User]}.",
      "topic": "Buffers and parameterisation"
    },
    {
      "term": "Cardinality",
      "simple": "How many times one control may be used in a single TestStep.",
      "detail": "0-1 by default. Setting it to 0-N allows repeated use, for example to verify a button's text and then click it.",
      "topic": "TestCase design"
    },
    {
      "term": "Chaining",
      "simple": "Using a value from one response in the next request.",
      "detail": "Buffer the value, for example a login token, and reference it later, such as Bearer {B[Token]} in the Authorization header.",
      "topic": "API testing"
    },
    {
      "term": "Checkin All",
      "simple": "Publishing your changes and releasing your locks.",
      "detail": "Do it several times a day and before you leave.",
      "topic": "Multi-user workspaces"
    },
    {
      "term": "Checkout",
      "simple": "Locking an object so that only you can edit it.",
      "detail": "Check out only what you need. Checking out a whole tree blocks your colleagues.",
      "topic": "Multi-user workspaces"
    },
    {
      "term": "CleanUp scenario",
      "simple": "Steps that put the application back into a clean state after a failed test.",
      "detail": "Typically closes the browser or kills leftover processes so one failure cannot cause the next.",
      "topic": "Recovery and cleanup scenarios"
    },
    {
      "term": "Common repository",
      "simple": "The shared database that holds the team's project.",
      "detail": "You connect to it with a connection string when you create the workspace.",
      "topic": "Multi-user workspaces"
    },
    {
      "term": "Constraint",
      "simple": "A way to say 'the row where this cell has this value'.",
      "detail": "It is an ActionMode. Used on a table cell, it limits the search to the matching row; you then verify or click another cell in that same row.",
      "topic": "Steering dynamic controls"
    },
    {
      "term": "ConstraintIndex",
      "simple": "A setting that picks one element by its position when several match.",
      "detail": "A configuration parameter with a whole number as its value. Useful when nothing else tells the matches apart.",
      "topic": "Steering dynamic controls"
    },
    {
      "term": "Consumable data",
      "simple": "Data that can be used only once, such as an email address for registration.",
      "detail": "Handle it by updating or moving the item after use, by generating a new value at runtime, or by resetting the data before the run.",
      "topic": "Test data (TDM/TDS)"
    },
    {
      "term": "ControlGroup",
      "simple": "Several similar controls combined into one attribute.",
      "detail": "It works for links, buttons and radio buttons of the same type. The TestStep then offers the members in a dropdown.",
      "topic": "Module scanning (XScan)"
    },
    {
      "term": "Date expressions",
      "simple": "Expressions that produce dates relative to today.",
      "detail": "{DATE[base][offset][format]}, for example {DATE[][+1d][dd/MM/yyyy]} for tomorrow. Units are d (days), M (months) and y (years). {DATETIME} gives a time stamp.",
      "topic": "Buffers and parameterisation"
    },
    {
      "term": "Dialog failure",
      "simple": "Tosca could not operate a control, for example because it was not found.",
      "detail": "This is the typical trigger for recovery, since something unexpected is usually in the way.",
      "topic": "Recovery and cleanup scenarios"
    },
    {
      "term": "Distributed Execution (DEX)",
      "simple": "Running tests on several machines at once.",
      "detail": "A distribution server sends the work to agents and collects the results, which shortens long regression runs.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "DokuSnapper",
      "simple": "A feature that documents a whole run with screenshots.",
      "detail": "Useful as audit evidence. It slows execution, so enable it only where evidence is needed.",
      "topic": "Reporting"
    },
    {
      "term": "Embedded control",
      "simple": "A control inside a table cell, such as a button or a checkbox.",
      "detail": "It is reached through its row and column. Plain cells accept only a click as input; anything else needs the embedded control.",
      "topic": "Steering dynamic controls"
    },
    {
      "term": "Engine",
      "simple": "The technology layer Tosca uses to talk to an application.",
      "detail": "HTML for web pages, UIA for Windows controls and browser dialogs, SAP for SAP GUI, and so on. XScan picks one automatically and lets you switch.",
      "topic": "Module scanning (XScan)"
    },
    {
      "term": "Excel, file and database modules",
      "simple": "Ready-made steps for spreadsheets, files and databases.",
      "detail": "For example TBox Open Excel Workbook, TBox File Existence, TBox Read/Create File, TBox DB Open Connection and TBox DB Run SQL Statement.",
      "topic": "TBox"
    },
    {
      "term": "Execution log",
      "simple": "The stored record of a run, step by step.",
      "detail": "It shows the first failed step, the message and any screenshot, which is where failure analysis starts.",
      "topic": "Reporting"
    },
    {
      "term": "ExecutionList",
      "simple": "The list of TestCases for an official run.",
      "detail": "Every run is stored with its log. Parameters such as Browser can be set here and win over the values on the TestCase.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "Exit code",
      "simple": "The number a program returns to say whether it succeeded.",
      "detail": "With the CI Client, -x True makes failures visible to the pipeline so the stage can fail.",
      "topic": "CI/CD integration"
    },
    {
      "term": "ExplicitName",
      "simple": "A setting that lets the TestStep decide which of several similar controls to use.",
      "detail": "A configuration parameter on the ModuleAttribute, set to True. The TestStepValue can then be renamed, for example to #2 for the second matching control.",
      "topic": "Steering dynamic controls"
    },
    {
      "term": "Find & provide",
      "simple": "The step that fetches a matching item for the test.",
      "detail": "You give search criteria and an alias. The fetched item is locked, so no other TestStep can retrieve it at the same time.",
      "topic": "Test data (TDM/TDS)"
    },
    {
      "term": "Identification methods",
      "simple": "The ways Tosca can recognise a control.",
      "detail": "By properties (preferred), by anchor, by image, or by index. A wildcard (*) or a regular expression makes a property tolerant of values that change.",
      "topic": "Module scanning (XScan)"
    },
    {
      "term": "If, While and Repetition",
      "simple": "The ways to make steps conditional or repeat them.",
      "detail": "If runs steps only when a condition holds. While repeats while it holds, up to MaximumRepetitions (30 by default). Repetition on a folder repeats a fixed number of times, and {REPETITION} gives the current pass.",
      "topic": "TBox"
    },
    {
      "term": "Item",
      "simple": "One entry in the store, such as one customer.",
      "detail": "Called a record in older versions. An item has properties (for example name and email) and belongs to a type.",
      "topic": "Test data (TDM/TDS)"
    },
    {
      "term": "JUnit report",
      "simple": "The result file used by CI tools.",
      "detail": "Published by the pipeline, so results are visible without opening Tosca.",
      "topic": "Reporting"
    },
    {
      "term": "JUnit results",
      "simple": "A standard result file that pipeline tools understand.",
      "detail": "Publishing it shows passed and failed tests directly in Jenkins or Azure DevOps.",
      "topic": "CI/CD integration"
    },
    {
      "term": "MATH and CALC",
      "simple": "Expressions that calculate.",
      "detail": "MATH is built in and offers operators such as + - * / % and functions such as Round and Truncate. CALC hands the formula to Microsoft Excel, which must be installed.",
      "topic": "Buffers and parameterisation"
    },
    {
      "term": "Module",
      "simple": "The saved description of one screen.",
      "detail": "It holds the screen's controls as ModuleAttributes, plus the data that identifies the window itself, such as its title. You create TestSteps by dragging a Module into a TestCase.",
      "topic": "Module scanning (XScan)"
    },
    {
      "term": "ModuleAttribute",
      "simple": "One control inside a Module, such as a button or a text field.",
      "detail": "It carries the properties used to find the control, and settings such as Cardinality (how often it may be used in one TestStep) and ValueRange (the values offered in the TestStep's dropdown, separated by semicolons).",
      "topic": "Module scanning (XScan)"
    },
    {
      "term": "OnDialogFailure and OnVerificationFailure",
      "simple": "Settings that say what happens after each kind of failure.",
      "detail": "As Test Configuration Parameters they can differ per folder or TestCase. Values: Continue, Execute next TestCase, Halt execution, Recover.",
      "topic": "Recovery and cleanup scenarios"
    },
    {
      "term": "Pipeline",
      "simple": "The automatic sequence of build, deploy and test steps.",
      "detail": "The Tosca stage must come after deployment has finished, otherwise the tests run against the old version.",
      "topic": "CI/CD integration"
    },
    {
      "term": "Random values",
      "simple": "Expressions that produce a new value on every run.",
      "detail": "{RND[5]} gives a five-digit number, {RND[1][16]} a number between limits, {RNDDECIMAL[2][100][999]} a decimal, {RANDOMTEXT[6]} letters and digits, and {RANDOMREGEX[\"...\"]} a text that follows a pattern.",
      "topic": "Buffers and parameterisation"
    },
    {
      "term": "Recovery Scenario",
      "simple": "Steps that repair an unexpected situation and let the test try again.",
      "detail": "Created with 'Create Recovery Scenario Collection' on a TestCase or folder. A scenario counts as successful when all its steps pass.",
      "topic": "Recovery and cleanup scenarios"
    },
    {
      "term": "Request and response",
      "simple": "The request is what Tosca sends. The response is what the application sends back.",
      "detail": "A request has a method (GET, POST and so on), an address, headers and often a body. A response has a status code, headers and a body.",
      "topic": "API testing"
    },
    {
      "term": "Requirements coverage",
      "simple": "A view of which requirements are tested and with what result.",
      "detail": "It needs links from requirements to TestCases and to ExecutionLists. Without the execution link you see only that tests exist.",
      "topic": "Reporting"
    },
    {
      "term": "Rescan",
      "simple": "Updating an existing Module after the screen has changed.",
      "detail": "A rescan keeps the links to all TestSteps, so it is the right fix after a release. Scanning a new Module instead would break those links.",
      "topic": "Module scanning (XScan)"
    },
    {
      "term": "RetryLevel",
      "simple": "Where the test continues after a successful recovery.",
      "detail": "TestStepValue, TestStep or TestCase. TestStep is the usual choice: the failed step is tried again.",
      "topic": "Recovery and cleanup scenarios"
    },
    {
      "term": "Reusable TestStepBlock",
      "simple": "A set of steps stored once and referenced from many TestCases.",
      "detail": "It lives in a TestStepLibrary. A TestCase holds a reference to it, not a copy, so editing the block updates every TestCase.",
      "topic": "TestCase design"
    },
    {
      "term": "Revoke checkout",
      "simple": "An administrator removing someone's lock.",
      "detail": "A last resort, because the owner's unpublished changes are discarded.",
      "topic": "Multi-user workspaces"
    },
    {
      "term": "Risk-based weighting",
      "simple": "Giving requirements a weight so the riskiest are tested first.",
      "detail": "The weight comes from a frequency class and a damage class. A higher weight means higher priority.",
      "topic": "Reporting"
    },
    {
      "term": "RowCount and ResultCount",
      "simple": "Properties that return how many rows a table has, or how many elements match.",
      "detail": "Typed in the value with a dot, for example .RowCount==7 to verify or Rows=.RowCount to store the number in a Buffer.",
      "topic": "Steering dynamic controls"
    },
    {
      "term": "SAP engine",
      "simple": "The Tosca engine that talks to SAP GUI.",
      "detail": "XScan uses it automatically for SAP GUI windows.",
      "topic": "SAP testing"
    },
    {
      "term": "SAP Fiori",
      "simple": "SAP's web-based user interface.",
      "detail": "It runs in a browser, so it is tested with the browser engine and SAP-specific support for its controls.",
      "topic": "SAP testing"
    },
    {
      "term": "SAP GUI scripting",
      "simple": "The SAP feature that lets tools operate the SAP screen.",
      "detail": "It must be enabled on the server and on the client. Without it Tosca cannot see the controls.",
      "topic": "SAP testing"
    },
    {
      "term": "ScratchBook",
      "simple": "A place to try out a TestCase while building it.",
      "detail": "Results are not kept and recovery scenarios are not triggered, so a ScratchBook run is not proof that a test passed.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "Screenshot on failure",
      "simple": "A picture Tosca takes automatically when a step fails.",
      "detail": "Switched on in the settings. It captures the application at the moment of the failure.",
      "topic": "Reporting"
    },
    {
      "term": "Service virtualization",
      "simple": "A stand-in that answers like a real service that is not available.",
      "detail": "Tosca's Orchestrated Service Virtualization (OSV) simulates the missing service so tests can still run.",
      "topic": "API testing"
    },
    {
      "term": "Slim workspace",
      "simple": "A workspace that does not download high-volume data.",
      "detail": "An option when creating a multi-user workspace. It speeds up creation for large repositories.",
      "topic": "Multi-user workspaces"
    },
    {
      "term": "Standard subset",
      "simple": "The package of ready-made modules that ships with Tosca.",
      "detail": "Never edit the originals. If a module needs a different setting, change a copy in your own folder.",
      "topic": "TBox"
    },
    {
      "term": "Status bar",
      "simple": "The line at the bottom of an SAP screen that shows messages.",
      "detail": "Messages such as 'Standard Order 12345 has been saved' are the usual place to capture a document number with {XB[...]}.",
      "topic": "SAP testing"
    },
    {
      "term": "Status code",
      "simple": "The number that says whether a call worked, for example 200.",
      "detail": "Codes in the 200 range mean success, 400 range a problem with the request, and 500 range a problem on the server.",
      "topic": "API testing"
    },
    {
      "term": "Steering",
      "simple": "Tosca operating a control: clicking, typing, reading.",
      "detail": "A control is 'steerable' when Tosca can find it and act on it.",
      "topic": "Steering dynamic controls"
    },
    {
      "term": "String operations",
      "simple": "Expressions that change or inspect text.",
      "detail": "For example {STRINGREPLACE[text][pattern][new]}, {STRINGLENGTH[text]}, {STRINGTOUPPER[text]} and {TRIM[text]}. The pattern of STRINGREPLACE is a regular expression.",
      "topic": "Buffers and parameterisation"
    },
    {
      "term": "TBox Evaluation Tool",
      "simple": "A step that checks whether an expression is true.",
      "detail": "Its Expression attribute is used with ActionMode Verify, for example {B[Count]} <= {B[Rows]}. Text values go in single quotes.",
      "topic": "TBox"
    },
    {
      "term": "TBox Send Keys",
      "simple": "A step that presses keys in a window.",
      "detail": "Uses the Windows SendKeys notation: ^ is Ctrl, % is Alt, + is Shift, for example ^(a) for Ctrl+A. It depends on window focus, so use it only when a control cannot be steered directly.",
      "topic": "TBox"
    },
    {
      "term": "TBox Set Buffer",
      "simple": "A step that stores a value under a name.",
      "detail": "With ActionMode Input it saves the value; with Verify it checks the stored value. Read it later with {B[Name]}.",
      "topic": "TBox"
    },
    {
      "term": "TBox Start Program",
      "simple": "A step that starts a program or a command.",
      "detail": "It takes a Path and Arguments, and can wait for the program to exit. Used, for example, to start a browser in private mode or to run taskkill.",
      "topic": "TBox"
    },
    {
      "term": "TDS and TestCaseDesign",
      "simple": "TestCaseDesign creates TestCases from data. TDS feeds data to tests while they run.",
      "detail": "Use TestCaseDesign for planned combinations of values and TDS for shared or consumable data across machines.",
      "topic": "Test data (TDM/TDS)"
    },
    {
      "term": "TDS expression",
      "simple": "The syntax that reads a value from the fetched item.",
      "detail": "{TDS[Alias.Property]}, for example {TDS[Customer.Email]}.",
      "topic": "Test data (TDM/TDS)"
    },
    {
      "term": "Template and instantiation",
      "simple": "One TestCase written with placeholders, turned into many TestCases.",
      "detail": "Placeholders use {XL[Attribute.SubAttribute]}. Instantiating creates one TestCase for each instance in the linked TestSheet.",
      "topic": "TestCase design"
    },
    {
      "term": "Test Configuration Parameter (TCP)",
      "simple": "A setting attached to a folder, TestCase or ExecutionList.",
      "detail": "Inherited by everything below it and read with {CP[Name]}. Typical uses are Browser, environment URL and timeouts.",
      "topic": "Buffers and parameterisation"
    },
    {
      "term": "Test Data Service (TDS)",
      "simple": "A central store of test data that all tests share.",
      "detail": "It runs as part of Tosca Server and is managed in a web interface. Data can be read and changed while tests are running.",
      "topic": "Test data (TDM/TDS)"
    },
    {
      "term": "TestEvent",
      "simple": "A package of ExecutionLists that DEX runs together.",
      "detail": "It is created in Tosca Commander and is also what a CI pipeline triggers.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "TestMandate",
      "simple": "A share of an ExecutionList that one tester runs on their own.",
      "detail": "Results flow back to the original ExecutionList, so a lead sees the whole picture in one place.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "TestSheet",
      "simple": "A table of test data: what varies and which values it can take.",
      "detail": "Attributes are the fields and Instances the values. Combination methods include All Combinations, Pairwise, Orthogonal and Linear Expansion, which changes one field at a time.",
      "topic": "TestCase design"
    },
    {
      "term": "TestStep and TestStepValue",
      "simple": "A TestStep is one action on a Module. A TestStepValue is one line in it, for one control.",
      "detail": "Each TestStepValue has a value, an ActionMode and a DataType.",
      "topic": "TestCase design"
    },
    {
      "term": "Tosca CI Client",
      "simple": "The older command-line program that starts Tosca tests from a pipeline.",
      "detail": "Called as ToscaCIClient.exe with options such as -m distributed, -c for the configuration file, -r for the result file and -t junit.",
      "topic": "CI/CD integration"
    },
    {
      "term": "Tosca Execution Client",
      "simple": "The newer way to start Tosca tests from a pipeline.",
      "detail": "A script that talks to Tosca Server and triggers TestEvents. It replaces the legacy CI Client.",
      "topic": "CI/CD integration"
    },
    {
      "term": "Transaction code (T-code)",
      "simple": "The short code that opens a function in SAP, such as VA01.",
      "detail": "A standard module enters it, so the navigation does not have to be scanned.",
      "topic": "SAP testing"
    },
    {
      "term": "Unattended execution",
      "simple": "Running UI tests on a machine where nobody is logged in.",
      "detail": "The agent opens its own remote desktop session with stored credentials before it starts the tests.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "Update All",
      "simple": "Fetching everyone else's changes.",
      "detail": "Do it at the start of the day and before you check objects out.",
      "topic": "Multi-user workspaces"
    },
    {
      "term": "Verification failure",
      "simple": "Tosca found the control, but the value was not the expected one.",
      "detail": "Often a real defect, so think before you let recovery or Continue hide it.",
      "topic": "Recovery and cleanup scenarios"
    },
    {
      "term": "WaitOn and TBox Wait",
      "simple": "WaitOn waits until something is ready. TBox Wait just waits a fixed time.",
      "detail": "WaitOn continues as soon as the state is reached, limited by the Synchronization Timeout during WaitOn (20000 ms by default). Prefer it to fixed waits.",
      "topic": "TBox"
    },
    {
      "term": "Wildcard and regular expression",
      "simple": "Ways to match text that is only partly known.",
      "detail": "* stands for any characters, as in Report*. {REGEX[\"A|B\"]} accepts one of several texts, for example two possible window titles.",
      "topic": "Steering dynamic controls"
    },
    {
      "term": "Workspace",
      "simple": "Your local working copy of the Tosca project.",
      "detail": "Single-user workspaces stand alone. Multi-user workspaces are connected to a common repository.",
      "topic": "Multi-user workspaces"
    },
    {
      "term": "XBuffer",
      "simple": "A Buffer that captures only part of a text.",
      "detail": "Written inside the expected text with ActionMode Verify, for example Order {XB[OrderNo]} created. The fixed text is checked and the changing part is stored.",
      "topic": "Buffers and parameterisation"
    },
    {
      "term": "XScan",
      "simple": "The scanner that creates Modules.",
      "detail": "It shows the controls of the open application, tells you whether each selected control can be identified uniquely, and lets you choose how it is identified.",
      "topic": "Module scanning (XScan)"
    }
  ]
};
