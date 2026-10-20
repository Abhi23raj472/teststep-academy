// Generated from study.json by fetch_questions.py. Do not edit by hand.
window.TOSCA_STUDY = {
  "units": [
    {
      "id": 1,
      "title": "Introduction to Tosca",
      "text": "Testing basics, what Tosca is, how to install it, and which certifications to aim for."
    },
    {
      "id": 2,
      "title": "Tosca Commander and Workspace",
      "text": "The program you work in, and single-user and multi-user workspaces."
    },
    {
      "id": 3,
      "title": "Tosca Sections (Project Structure)",
      "text": "The sections of a workspace, how they connect, and your first test."
    },
    {
      "id": 4,
      "title": "Modules and Tosca XScan",
      "text": "Teaching Tosca what the application looks like, and finding the right control."
    },
    {
      "id": 5,
      "title": "Standard Modules",
      "text": "The ready-made TBox modules for programs, windows, files, buffers and data."
    },
    {
      "id": 6,
      "title": "TestCases",
      "text": "TestSteps and values, ActionModes, DataTypes and WorkStates."
    },
    {
      "id": 7,
      "title": "Dynamic Expressions and Keyboard Commands",
      "text": "Buffers, generated values, and mouse and keyboard commands."
    },
    {
      "id": 8,
      "title": "Control Flow and Reusability",
      "text": "Conditions, loops and reusable TestStepBlocks."
    },
    {
      "id": 9,
      "title": "Synchronization and Error Handling",
      "text": "Checking, waiting, and getting back on track when something goes wrong."
    },
    {
      "id": 10,
      "title": "Test Configuration Parameters (TCP)",
      "text": "One set of tests for every environment, browser and user."
    },
    {
      "id": 11,
      "title": "Execution",
      "text": "Trial runs, official runs, results and manual runs."
    },
    {
      "id": 12,
      "title": "Requirements, Risk and Reporting",
      "text": "Risk-based testing, coverage, reports and defects."
    },
    {
      "id": 13,
      "title": "TestCaseDesign (TCD)",
      "text": "Planning test data and combinations, and generating TestCases from Templates."
    },
    {
      "id": 14,
      "title": "Test Data Management",
      "text": "Shared data with Test Data Service, data from Excel and generated values."
    },
    {
      "id": 15,
      "title": "Technology Engines",
      "text": "Browsers and web pages in depth, desktop, mobile, SAP, Salesforce, mainframe, databases and PDF."
    },
    {
      "id": 16,
      "title": "API Testing",
      "text": "Testing services without a user interface, and simulating the ones you cannot reach."
    },
    {
      "id": 17,
      "title": "Distributed Execution (DEX) and Tosca Server",
      "text": "Running tests on many machines, and the server services behind it."
    },
    {
      "id": 18,
      "title": "CI/CD and Command Line",
      "text": "Running Tosca from pipelines and from the command line."
    },
    {
      "id": 19,
      "title": "Advanced Workspace Administration",
      "text": "Users and rights, versions, TQL searches, custom properties and upkeep."
    },
    {
      "id": 20,
      "title": "Integrations and Extensions",
      "text": "Connecting Tosca to other tools, and extending it with code."
    },
    {
      "id": 21,
      "title": "AI and Modern Tosca",
      "text": "AI assistants, Vision AI, execution in the cloud and SAP impact analysis."
    },
    {
      "id": 22,
      "title": "Framework Design and Best Practices",
      "text": "Naming, structure, and stable, fast and reviewable tests."
    },
    {
      "id": 23,
      "title": "Debugging and Troubleshooting",
      "text": "Finding the real cause of a failure."
    },
    {
      "id": 24,
      "title": "Exploratory Testing",
      "text": "Session-based exploration, recorded so that findings become tests."
    },
    {
      "id": 25,
      "title": "Performance and Data Testing",
      "text": "Load tests with NeoLoad and data checks with Data Integrity."
    },
    {
      "id": 26,
      "title": "Version Upgrades and Migration",
      "text": "Moving to a new Tosca version safely."
    }
  ],
  "lessons": [
    {
      "id": "testing-basics",
      "unit": 1,
      "title": "Testing basics you need first",
      "definitions": [
        {
          "term": "Software testing",
          "text": "The process of evaluating a software product to confirm that it meets its requirements and to find defects before it is released."
        },
        {
          "term": "Test automation",
          "text": "The use of a tool to execute tests, compare the actual results with the expected results and report the outcome, without a person performing the steps."
        },
        {
          "term": "Regression testing",
          "text": "Re-running existing tests after a change to confirm that functions which worked before still work."
        },
        {
          "term": "Test pyramid",
          "text": "A model for distributing automated tests: a broad base of unit tests, fewer API and integration tests, and the fewest tests through the user interface."
        }
      ],
      "simple": "Software testing means checking that a program does what it should, before real users find out that it does not. You can check by hand, or let a tool repeat the checks for you.",
      "body": [
        "A manual test is a person following steps and looking at the result. An automated test is the same steps and checks carried out by a tool. Manual testing suits new features and exploring. Automation pays off for checks that have to be repeated many times.",
        "Tests are grouped by level. Unit tests check one small piece of code. Integration tests check that pieces work together, often through an API. System tests check the whole application, and acceptance tests check that it does what the business needs. Tosca is mostly used from the API level upwards.",
        "The most repeated job is regression testing: running the existing tests again after every change, to make sure nothing that worked before is now broken. A smoke test is a short first check that the application starts and its main paths work. The test pyramid is a rule of thumb: have many fast tests at the bottom and only as many slow screen tests as you really need."
      ],
      "graphics": [
        {
          "type": "stack",
          "title": "The test pyramid, from top to base",
          "layers": [
            {
              "label": "UI tests (top)",
              "text": "Few. Slow, but closest to what a user does."
            },
            {
              "label": "API and integration tests",
              "text": "More. Fast and stable, because no screen is involved."
            },
            {
              "label": "Unit tests (base)",
              "text": "Most. Written by developers and run in seconds."
            }
          ]
        },
        {
          "type": "compare",
          "title": "Manual and automated testing",
          "columns": [
            {
              "title": "Manual",
              "points": [
                "A person performs the steps.",
                "Good for new, changing or one-time checks.",
                "Costs the same every time it is repeated."
              ]
            },
            {
              "title": "Automated",
              "points": [
                "A tool performs the steps.",
                "Good for stable checks that are repeated often.",
                "Costs effort once, then runs for almost nothing."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "What to automate first",
        "intro": "A team has four checks and time to automate two of them.",
        "grid": {
          "columns": [
            "Check",
            "How often",
            "Decision"
          ],
          "rows": [
            [
              "Log in and place an order",
              "Every release, in every environment",
              "Automate first"
            ],
            [
              "Month-end invoice run",
              "Every month, with many data combinations",
              "Automate"
            ],
            [
              "A new screen that still changes daily",
              "A few times",
              "Test by hand until it is stable"
            ],
            [
              "A one-time data migration check",
              "Once",
              "Test by hand"
            ]
          ]
        },
        "outcome": "Automation goes to the stable checks that are repeated. The rest stays manual for now."
      },
      "points": [
        "Manual testing explores; automation repeats.",
        "Levels: unit, integration, system, acceptance.",
        "Regression testing reruns old tests after every change.",
        "Pyramid: many fast tests, few slow UI tests."
      ],
      "mistake": "Trying to automate everything. A test that runs once, or a screen that changes every day, costs more to automate than it saves.",
      "docs": [],
      "questions": null
    },
    {
      "id": "what-is-tosca",
      "unit": 1,
      "title": "What is Tosca?",
      "definitions": [
        {
          "term": "Tricentis Tosca",
          "text": "A commercial test automation tool from Tricentis for functional and regression testing of applications through their user interface and their APIs. Tests are assembled from reusable building blocks, without writing program code."
        },
        {
          "term": "Model-based test automation",
          "text": "An approach in which the technical description of the application (the model, in Tosca the Modules) is stored separately from the tests and the test data, so that a change in the application is corrected once, in the model."
        }
      ],
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
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/tbox_intro.htm"
        }
      ],
      "questions": null
    },
    {
      "id": "editions-and-installation",
      "unit": 1,
      "title": "Editions, installation and licences",
      "definitions": [
        {
          "term": "On-premises installation",
          "text": "A Tosca setup that a company installs and operates on its own machines: Tosca Commander on the testers' PCs, plus Tosca Server and a repository database for team use."
        },
        {
          "term": "Tosca Cloud",
          "text": "The software-as-a-service edition of Tosca. It is hosted by Tricentis and used through a web browser, and agents carry out the test runs."
        },
        {
          "term": "Floating licence",
          "text": "A licence that a machine takes from a shared pool when it starts a Tosca component and returns to the pool afterwards. The pool is hosted by Tricentis (cloud licensing) or by your own License Server (on-premises licensing)."
        },
        {
          "term": "Node-locked licence",
          "text": "A licence that is permanently bound to one specific machine and cannot be used by any other."
        }
      ],
      "simple": "Tosca comes in two forms: a Windows program that you install (on-premises), and Tosca Cloud, which you open in a browser. Either way, you need a licence before you can work.",
      "body": [
        "The on-premises product has several parts. Tosca Commander is the client on your Windows machine, where you build and run tests. Tosca Server is installed once for the team and hosts shared services such as Distributed Execution and the Test Data Service. A team that shares a project also needs a database for the common repository, for example Microsoft SQL Server or Oracle.",
        "Check the system requirements for your version before you install. For Tosca 2026.1 the manual lists 64-bit Windows 10 or 11, a dual-core 2.4 GHz processor, 8 GB of memory (16 GB recommended) and 10 GB of disk space. For web testing, the Tosca browser extension must also be added to Chrome, Edge or Firefox.",
        "There are three kinds of licence. With cloud licensing the licences float: a machine takes one from a pool hosted by Tricentis and gives it back when it is done. On-premises licensing floats in the same way, but the pool is on a Tricentis License Server inside your own network. A node-locked licence is bound to one machine, and nobody else can use it."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "The parts of an on-premises setup",
          "root": {
            "label": "Tosca on-premises",
            "text": "Installed and run by your company",
            "children": [
              {
                "label": "Tosca Commander",
                "text": "The client on each tester's Windows machine."
              },
              {
                "label": "Tosca Server",
                "text": "Shared services: Distributed Execution, Test Data Service and more."
              },
              {
                "label": "Common repository",
                "text": "A database that holds the team's project."
              },
              {
                "label": "License Server",
                "text": "Only needed for on-premises floating licences."
              },
              {
                "label": "Agents",
                "text": "Machines that run tests for Distributed Execution."
              }
            ]
          }
        },
        {
          "type": "compare",
          "title": "On-premises and Tosca Cloud",
          "columns": [
            {
              "title": "On-premises",
              "points": [
                "Tosca Commander is installed on Windows.",
                "Your company runs the server and the database.",
                "Runs are spread over machines with Distributed Execution."
              ]
            },
            {
              "title": "Tosca Cloud",
              "points": [
                "Opened in a browser and hosted by Tricentis.",
                "You install only agents, on the machines that run tests.",
                "Runs are spread with the Elastic Execution Grid."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "Choosing a licence",
        "intro": "Three situations and the licence type that fits each.",
        "grid": {
          "columns": [
            "Situation",
            "Licence",
            "Why"
          ],
          "rows": [
            [
              "Ten testers, never more than six at work at once",
              "Floating",
              "Six licences are enough, because they are shared."
            ],
            [
              "Everything must stay inside the company network",
              "On-premises floating",
              "The License Server runs in your own network."
            ],
            [
              "One machine that must always be able to run",
              "Node-locked",
              "Its licence cannot be taken by anyone else."
            ]
          ]
        }
      },
      "points": [
        "On-premises: Commander, Server, repository database.",
        "Tosca Cloud runs in the browser, with agents for execution.",
        "Licences: cloud floating, on-premises floating, node-locked.",
        "Check the system requirements for your exact version."
      ],
      "mistake": "Installing first and reading the requirements later. An unsupported browser version or a missing browser extension is a common reason why a fresh installation cannot scan a web page.",
      "docs": [
        {
          "title": "Set up Tricentis Tosca",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/installation_tosca/tricentis_tosca_setup_overview.htm"
        },
        {
          "title": "System requirements for Tosca 2026.1",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/systemrequirements/systemrequirements.htm"
        },
        {
          "title": "License management",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/licensing/lic_administering_licenses.htm"
        }
      ],
      "questions": null
    },
    {
      "id": "certifications",
      "unit": 1,
      "title": "Certifications and your learning path",
      "definitions": [
        {
          "term": "Certification",
          "text": "A credential from Tricentis, earned by passing an exam, which confirms a certain level of knowledge of Tosca."
        },
        {
          "term": "Tricentis Academy",
          "text": "The online learning platform of Tricentis, with the courses and exams for the Tosca certifications."
        }
      ],
      "simple": "The Tricentis Academy offers online courses and certification exams for Tosca. A certificate shows an employer that you know the tool, and the courses make a good plan to study by.",
      "body": [
        "The usual start is the two Fundamentals courses, still widely known by their old codes. AS1, formerly Automation Specialist Level 1, is about automating the tests of a web application. AS2 continues with test automation that uses centralised test data.",
        "The Deep Dive courses go further. AE1 covers automating beyond web applications. The API course covers API TestCases. TDS1 and TDS2 are about test design: structuring test cases and test data, and managing data that changes its state.",
        "Course names, exams and prices change, so check the Tricentis Academy for the current list. For interviews, a certificate helps you to be invited. What gets you the job is explaining how you solved real problems, and the Interview preparation page of this site is there for that."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "A sensible order",
          "steps": [
            {
              "label": "AS1",
              "text": "Web automation: Modules, TestCases, execution."
            },
            {
              "label": "AS2",
              "text": "Central test data."
            },
            {
              "label": "TDS1 and TDS2",
              "text": "Test design and stateful data."
            },
            {
              "label": "API",
              "text": "API TestCases."
            },
            {
              "label": "AE1",
              "text": "Beyond web applications."
            }
          ]
        }
      ],
      "example": {
        "title": "Which modules of this site prepare you",
        "intro": "A rough map from the courses to the syllabus.",
        "grid": {
          "columns": [
            "Course",
            "Topic",
            "Modules here"
          ],
          "rows": [
            [
              "AS1",
              "Automating web application testing",
              "Modules 2 to 11"
            ],
            [
              "AS2",
              "Centralised test data",
              "Modules 10 and 14"
            ],
            [
              "TDS1, TDS2",
              "Test design and stateful data",
              "Modules 13 and 14"
            ],
            [
              "API",
              "Automating API test cases",
              "Module 16"
            ],
            [
              "AE1",
              "Automating beyond web applications",
              "Modules 15 and 20"
            ]
          ]
        }
      },
      "points": [
        "Start with AS1, then AS2.",
        "Deep Dives: AE1, API, TDS1, TDS2.",
        "Check the Academy for current names and exams.",
        "Practice counts more than the certificate."
      ],
      "mistake": "Collecting certificates without practising. Build a small project of your own, for example ten TestCases for a demo web shop, and you will remember far more.",
      "docs": [
        {
          "title": "Tricentis Academy",
          "url": "https://academy.tricentis.com/"
        }
      ],
      "questions": null
    },
    {
      "id": "commander-and-workspace",
      "unit": 2,
      "title": "Tosca Commander and the workspace",
      "definitions": [
        {
          "term": "Tosca Commander",
          "text": "The main application of Tosca, in which tests are created, managed, executed and analysed."
        },
        {
          "term": "Workspace",
          "text": "The local working environment of one Tosca project in Tosca Commander. It holds the project's objects and is either single-user, or multi-user and connected to a common repository."
        },
        {
          "term": "Section",
          "text": "An area of a workspace for one kind of object, such as Modules, TestCases, Execution, Requirements or TestCaseDesign."
        }
      ],
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
      "id": "multi-user-workspaces",
      "unit": 2,
      "title": "Working in a multi-user workspace",
      "definitions": [
        {
          "term": "Multi-user workspace",
          "text": "A workspace that is connected to a common repository, so that several users can work on the same project."
        },
        {
          "term": "Common repository",
          "text": "The central database that stores the project of a team."
        },
        {
          "term": "Checkout and Checkin",
          "text": "Checkout locks an object so that only you can edit it. Checkin all publishes your changes to the common repository and releases your locks."
        },
        {
          "term": "Update all",
          "text": "The action that brings the changes other users have checked in into your workspace."
        }
      ],
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
      "id": "tosca-sections",
      "unit": 3,
      "title": "The Tosca sections and how they connect",
      "definitions": [
        {
          "term": "Section",
          "text": "A top-level area of a Tosca workspace that holds one kind of object, such as Requirements, Modules, TestCases or ExecutionLists."
        },
        {
          "term": "Traceability",
          "text": "The ability to follow the links from a requirement to the TestCases that cover it and on to their latest execution results."
        }
      ],
      "simple": "A Tosca workspace is split into sections, one for each job. Requirements say what matters, TestCaseDesign plans the data, Modules describe the screens, TestCases hold the tests and Execution runs them. Each section feeds the next.",
      "body": [
        "The sections follow the life of a test. Requirements list what the business needs and how risky each part is. TestCaseDesign plans which variations and which data to test. Modules hold the technical model of the application. TestCases combine Modules and values into tests. Execution runs them in ExecutionLists and keeps the results.",
        "Three more sections support this flow. Reporting turns results into reports for other people. Issues records the defects found during testing and links them to the failed runs. Configurations hold reusable sets of Test Configuration Parameters, such as the environment or the browser to use.",
        "The sections are linked, not separate. A TestCase is linked to the Requirements it covers and refers to the Modules it uses. An ExecutionEntry refers to its TestCase. Because of these links, Tosca can show for every requirement how much is tested and how the latest run went."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "From a business need to a result",
          "steps": [
            {
              "label": "Requirements",
              "text": "What must work, and how risky is it?"
            },
            {
              "label": "TestCaseDesign",
              "text": "Which variations and data?"
            },
            {
              "label": "Modules",
              "text": "How does Tosca reach the screens?"
            },
            {
              "label": "TestCases",
              "text": "Steps, values and checks."
            },
            {
              "label": "Execution",
              "text": "Run and keep the results."
            },
            {
              "label": "Reporting",
              "text": "Show the outcome against the requirements."
            }
          ]
        }
      ],
      "example": {
        "title": "Following one requirement",
        "intro": "A web shop must accept card payments. This is how that need travels through the sections.",
        "grid": {
          "columns": [
            "Section",
            "Object",
            "Linked to"
          ],
          "rows": [
            [
              "Requirements",
              "Customer can pay by card (high risk)",
              "Three TestCases"
            ],
            [
              "TestCaseDesign",
              "TestSheet 'Payment' with Visa, Mastercard and an expired card",
              "The TestCase Template"
            ],
            [
              "Modules",
              "Checkout page, Payment page",
              "Used by the TestCases"
            ],
            [
              "TestCases",
              "Pay by Visa, Pay by Mastercard, Expired card is rejected",
              "The requirement and the Modules"
            ],
            [
              "Execution",
              "ExecutionList 'Regression'",
              "One ExecutionEntry per TestCase"
            ]
          ]
        },
        "outcome": "Opening the requirement shows its three TestCases and how each one did in the last regression run."
      },
      "points": [
        "Each section holds one kind of object.",
        "Requirements, TestCaseDesign, Modules, TestCases and Execution follow the life of a test.",
        "Reporting, Issues and Configurations support that flow.",
        "Links between the sections give coverage and traceability."
      ],
      "mistake": "Working only in Modules, TestCases and Execution. Without linked Requirements, Tosca cannot show which business risks are tested and which are not.",
      "docs": [
        {
          "title": "Get to know your workspace",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/first_steps/get_to_know_tosca_workspace.htm"
        },
        {
          "title": "Work with Requirements",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/requirements/requirements.htm"
        }
      ],
      "questions": null
    },
    {
      "id": "first-test",
      "unit": 3,
      "title": "Your first automated test",
      "definitions": [
        {
          "term": "Scan",
          "text": "Reading the controls of an application screen with XScan and saving the selected controls as a Module."
        },
        {
          "term": "Trial run",
          "text": "An execution in the ScratchBook, used while a TestCase is being built. Its results are not stored."
        },
        {
          "term": "Official run",
          "text": "An execution from an ExecutionList. Tosca stores its result and log, so it can be reported and compared with earlier runs."
        }
      ],
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
      "unit": 4,
      "title": "Modules and XScan",
      "definitions": [
        {
          "term": "Module",
          "text": "An object in Tosca Commander that holds the technical information Tosca needs to find and steer one screen, or one interface, of the application under test. TestCases refer to the Module and never store this information themselves."
        },
        {
          "term": "ModuleAttribute",
          "text": "One control of that screen inside a Module, such as a text box or a button, together with the properties used to identify it."
        },
        {
          "term": "XScan",
          "text": "The scanner of Tosca. It reads the controls of an open application and creates a Module from the controls you select."
        }
      ],
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
      "unit": 4,
      "title": "Identifying controls",
      "definitions": [
        {
          "term": "Control identification",
          "text": "The method by which a Module tells Tosca how to find a control in the application at runtime."
        },
        {
          "term": "Identify by properties",
          "text": "The control is found by its own technical properties, such as Id, Name or text."
        },
        {
          "term": "Identify by anchor",
          "text": "The control is found by its position relative to another control that can be identified uniquely."
        },
        {
          "term": "Identify by image",
          "text": "The control is found by comparing the screen with a stored picture of the control."
        },
        {
          "term": "Identify by index",
          "text": "The control is found by its position among the controls that match the same properties."
        }
      ],
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
      "id": "advanced-identification",
      "unit": 4,
      "title": "Frames, Shadow DOM and XPath",
      "definitions": [
        {
          "term": "Technical property",
          "text": "An attribute that the application exposes for a control, such as Id, Tag, ClassName or InnerText, which Tosca can use to identify the control."
        },
        {
          "term": "HtmlFrame",
          "text": "The control Tosca uses for a FRAME, IFRAME or OBJECT element. It changes the context, so the controls inside it are searched for within that frame."
        },
        {
          "term": "Shadow DOM",
          "text": "A separate, encapsulated tree of elements attached to a web component. Tosca steers it like a frame, in open and closed mode, in Chrome, Edge and Firefox."
        },
        {
          "term": "XPath identification",
          "text": "Locating an HTML element with an XPath expression that describes its path in the page. It is enabled by default in the XBrowser settings of XScan."
        }
      ],
      "simple": "Some controls sit inside a page within the page, or inside a sealed-off part of a web component. Tosca first steps into that inner part, and then finds the control as usual.",
      "body": [
        "Identification works on technical properties: Id, Tag, ClassName, InnerText and many more. Choose properties that stay the same between builds and sessions. An Id that is generated anew on every page load is no help, while a stable name or label is.",
        "A frame is a page inside a page, written as FRAME or IFRAME in the HTML. Tosca represents it as an HtmlFrame control, and the controls inside it are found within that frame. If XScan shows an empty frame that comes from another domain, increase the Frame id retrieval timeout in the XScan settings, which is 100 milliseconds by default.",
        "Modern web components often keep their elements in a Shadow DOM. Tosca steers Shadow DOMs like frames, in open and closed mode, in Chrome, Edge and Firefox. Closed mode relies on the ShadowDomUnlocker injection; where that is switched off for a page, only open mode works. When no combination of properties is unique, XPath identification can locate the element by its path."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "Where does the control live?",
          "root": {
            "label": "Browser page",
            "text": "Tosca starts from the page's Module.",
            "children": [
              {
                "label": "On the page",
                "text": "Found by its technical properties."
              },
              {
                "label": "In an IFRAME",
                "text": "Step into the HtmlFrame, then search inside it."
              },
              {
                "label": "In a Shadow DOM",
                "text": "Steered like a frame, open or closed mode."
              },
              {
                "label": "Nothing is unique",
                "text": "Use an XPath expression as the last resort."
              }
            ]
          }
        }
      ],
      "example": {
        "title": "A card field in an iframe",
        "intro": "On a checkout page, the card number field is served by a payment provider inside an IFRAME.",
        "grid": {
          "columns": [
            "Level",
            "What Tosca uses",
            "Effect"
          ],
          "rows": [
            [
              "Page",
              "The Module of the checkout page",
              "Identifies the browser page"
            ],
            [
              "HtmlFrame",
              "The IFRAME element of the payment provider",
              "The search context changes to the frame"
            ],
            [
              "Control",
              "The card number field, identified by its Name",
              "Searched for only inside the frame"
            ]
          ]
        },
        "outcome": "A field with the same Name elsewhere on the checkout page cannot be confused with the card number field."
      },
      "points": [
        "Prefer stable properties: names, labels and stable Ids.",
        "FRAME and IFRAME become HtmlFrame controls that change the context.",
        "Shadow DOMs are steered like frames, in open and closed mode.",
        "XPath identification is the fallback when properties are not enough."
      ],
      "mistake": "Identifying a control by a generated Id such as ctl00_x83472. It changes with the next build or page load, and the test fails although the application is fine.",
      "docs": [
        {
          "title": "Steer XBrowser controls",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/engines_3.0/xbrowser/xbrowser_controls.htm"
        },
        {
          "title": "Configure Tosca XScan",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/xscan_window_settings.htm"
        }
      ],
      "questions": "Module scanning (XScan)"
    },
    {
      "id": "dynamic-controls",
      "unit": 4,
      "title": "Controls that change at runtime",
      "definitions": [
        {
          "term": "Dynamic control",
          "text": "A control whose identifying properties, number or position are known only at runtime."
        },
        {
          "term": "ExplicitName",
          "text": "A configuration parameter of a ModuleAttribute. When it is True, the TestStep names the control to steer at runtime, for example #2 for the second match."
        },
        {
          "term": "ResultCount",
          "text": "A property that returns how many controls match the identification of a ModuleAttribute."
        },
        {
          "term": "Wildcard",
          "text": "The character * in an identification value. It stands for any text, so Report* matches every title that starts with Report."
        }
      ],
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
      "id": "tables",
      "unit": 4,
      "title": "Working with tables",
      "definitions": [
        {
          "term": "Table control",
          "text": "A single ModuleAttribute that represents a whole table. Its rows, columns and cells are addressed in the TestStep and not scanned one by one."
        },
        {
          "term": "Row and column address",
          "text": "The position of a row or column: $n counts from the header, so $1 is the first data row, and #n is the absolute position."
        },
        {
          "term": "Constraint",
          "text": "The ActionMode that selects a table row by its content: Tosca uses the row in which the given cell has the given value."
        }
      ],
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
      "id": "module-settings",
      "unit": 4,
      "title": "Maintaining and tuning Modules",
      "definitions": [
        {
          "term": "Rescan",
          "text": "Scanning a screen again into an existing Module, to update the Module after the application has changed while keeping its links to TestSteps."
        },
        {
          "term": "ValueRange",
          "text": "A property of a ModuleAttribute that lists the values offered for selection in the TestStep, separated by semicolons."
        },
        {
          "term": "Cardinality",
          "text": "A property of a ModuleAttribute that defines how often the attribute may be used in one TestStep: 0-1 by default, 0-N for repeated use."
        },
        {
          "term": "Steering parameter",
          "text": "A parameter on a Module or ModuleAttribute that changes how Tosca operates the control at runtime, for example ScrollingBehavior or WaitBefore."
        }
      ],
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
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/modules_properties.htm"
        }
      ],
      "questions": "Module scanning (XScan)"
    },
    {
      "id": "standard-modules",
      "unit": 5,
      "title": "The TBox toolbox: standard modules",
      "definitions": [
        {
          "term": "Standard subset",
          "text": "The collection of ready-made Modules delivered with Tosca. They are imported into a project and used without scanning."
        },
        {
          "term": "TBox Automation Tools",
          "text": "The part of the Standard subset with general-purpose Modules that do not belong to a screen, for example for Buffers, waiting, files, starting programs and sending keys."
        }
      ],
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
      "id": "testcases-and-steps",
      "unit": 6,
      "title": "TestCases, TestSteps and values",
      "definitions": [
        {
          "term": "TestCase",
          "text": "An object in Tosca Commander that describes one test as an ordered sequence of TestSteps."
        },
        {
          "term": "TestStep",
          "text": "One step of a TestCase, created by adding a Module to the TestCase. It performs actions on the controls of that Module."
        },
        {
          "term": "TestStepValue",
          "text": "One line of a TestStep, belonging to one ModuleAttribute. It carries the Value, the ActionMode and the DataType for that control."
        }
      ],
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
      "unit": 6,
      "title": "ActionModes",
      "definitions": [
        {
          "term": "ActionMode",
          "text": "A setting of a TestStepValue that defines what Tosca does with the value on the control at runtime."
        },
        {
          "term": "Input",
          "text": "Enters the value into the control, or performs the action given as the value, such as {CLICK}. It is the default ActionMode."
        },
        {
          "term": "Verify",
          "text": "Compares the actual value or property of the control with the expected value and reports passed or failed."
        },
        {
          "term": "Buffer",
          "text": "Reads the current value of the control and stores it in a Buffer with the given name."
        },
        {
          "term": "WaitOn",
          "text": "Pauses the execution until the control has the stated value or property, or until the timeout is reached."
        },
        {
          "term": "Constraint",
          "text": "Limits a search to the items that match the value, for example the rows of a table in which a cell has a certain content."
        }
      ],
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
      "id": "datatypes-and-workstates",
      "unit": 6,
      "title": "DataTypes and WorkStates",
      "definitions": [
        {
          "term": "DataType",
          "text": "A setting of a TestStepValue that defines how Tosca interprets the value: as String, Numeric, Date, Boolean or Password."
        },
        {
          "term": "WorkState",
          "text": "A property of a TestCase, named TestCaseWorkState, that records how far the TestCase has been developed: PLANNED, IN_WORK or COMPLETED."
        }
      ],
      "simple": "The DataType tells Tosca how to read a value: as text, a number, a date, true or false, or a password. The WorkState tells people how far a TestCase is: planned, in work or completed.",
      "body": [
        "Every TestStepValue has a DataType. String is the default and treats the value as plain text. Numeric reads it as a number. Date reads it as a date, so a different date format does not break the check. Boolean is for True and False. Password shows asterisks instead of the value and stores it encrypted.",
        "Choose the DataType that matches what you compare. Comparing amounts or counts only makes sense as Numeric, and a date should be compared as a Date, not as text that happens to look like one.",
        "The WorkState is a property of the TestCase, called TestCaseWorkState, with three values. A new TestCase starts as PLANNED. Set it to IN_WORK when you start building and to COMPLETED when the TestCase is ready for an ExecutionList. The Requirements section uses the state when it calculates coverage: a PLANNED TestCase counts 20%, IN_WORK 50% and COMPLETED 100%."
      ],
      "graphics": [
        {
          "type": "grid",
          "title": "The five DataTypes",
          "columns": [
            "DataType",
            "The value is read as",
            "Typical use"
          ],
          "rows": [
            [
              "String",
              "Plain text (default)",
              "Names, messages, most inputs"
            ],
            [
              "Numeric",
              "A number",
              "Amounts, counts"
            ],
            [
              "Date",
              "A date",
              "Delivery dates, deadlines"
            ],
            [
              "Boolean",
              "True or False",
              "Checkboxes, whether a control exists"
            ],
            [
              "Password",
              "Hidden text, stored encrypted",
              "Passwords"
            ]
          ]
        },
        {
          "type": "flow",
          "title": "The WorkState of a TestCase",
          "steps": [
            {
              "label": "PLANNED",
              "text": "Created, not built yet. Counts 20% in coverage."
            },
            {
              "label": "IN_WORK",
              "text": "Being built. Counts 50%."
            },
            {
              "label": "COMPLETED",
              "text": "Ready for an ExecutionList. Counts 100%."
            }
          ]
        }
      ],
      "example": {
        "title": "DataTypes in one TestStep",
        "intro": "A checkout form with four different kinds of value.",
        "grid": {
          "columns": [
            "TestStepValue",
            "Value",
            "ActionMode",
            "DataType"
          ],
          "rows": [
            [
              "Password",
              "secret",
              "Input",
              "Password"
            ],
            [
              "Newsletter checkbox",
              "True",
              "Input",
              "Boolean"
            ],
            [
              "Order total",
              "250",
              "Verify",
              "Numeric"
            ],
            [
              "Delivery date",
              "{DATE[][+3d][dd.MM.yyyy]}",
              "Verify",
              "Date"
            ]
          ]
        },
        "code": [
          {
            "label": "TQL search: find the TestCases that are still PLANNED",
            "code": "=>SUBPARTS:TestCase[TestCaseWorkState==\"PLANNED\"]"
          }
        ]
      },
      "points": [
        "String is the default DataType.",
        "Numeric, Date and Boolean make comparisons reliable.",
        "Password hides and encrypts the value.",
        "WorkState: PLANNED, IN_WORK, COMPLETED."
      ],
      "mistake": "Leaving every TestCase on PLANNED. Coverage in the Requirements section then looks much worse than it is, and nobody can tell which tests are ready to run.",
      "docs": [
        {
          "title": "Determine the project state",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/requirements/project_state.htm"
        },
        {
          "title": "Best practices: TestCase progress",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/best_practices/testcases_progress.htm"
        }
      ],
      "questions": "TestCase design"
    },
    {
      "id": "buffers",
      "unit": 7,
      "title": "Buffers",
      "definitions": [
        {
          "term": "Buffer",
          "text": "A named variable that stores a value during execution, so that later TestSteps and TestCases on the same machine can read it with {B[Name]}."
        },
        {
          "term": "XBuffer",
          "text": "The expression {XB[Name]}. Used with ActionMode Verify, it checks the fixed part of a text and stores the changing part in a Buffer."
        }
      ],
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
      "unit": 7,
      "title": "Generated values: random, dates, calculations, text",
      "definitions": [
        {
          "term": "Dynamic expression",
          "text": "An expression in curly brackets, written in a Value, that Tosca evaluates at runtime and replaces with the result."
        },
        {
          "term": "Random expression",
          "text": "An expression that produces a new value on every run, such as {RND[5]} for a five-digit number or {RANDOMTEXT[6]} for six characters."
        },
        {
          "term": "Date expression",
          "text": "An expression of the form {DATE[base][offset][format]} that produces a date relative to a base date, for example tomorrow."
        },
        {
          "term": "Calculation expression",
          "text": "An expression that computes a result: {MATH[...]} inside Tosca, or {CALC[...]} with the help of Microsoft Excel."
        }
      ],
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
      "id": "mouse-and-keyboard",
      "unit": 7,
      "title": "Mouse and keyboard commands",
      "definitions": [
        {
          "term": "Click operation",
          "text": "A value in curly braces, such as {CLICK}, {DOUBLECLICK} or {RIGHTCLICK}, that tells Tosca which mouse action to perform on a control."
        },
        {
          "term": "Keyboard command",
          "text": "A value in curly braces, such as {ENTER}, {TAB} or {F6}, that sends one key to a control."
        },
        {
          "term": "SendKeys expression",
          "text": "The expression {SENDKEYS[\"...\"]}, which passes a Microsoft SendKeys command to a control for key combinations and complex input."
        },
        {
          "term": "Virtual-key code",
          "text": "A key named by its Windows code without the VK_ prefix, used in {KEYPRESS[...]}, {KEYDOWN[...]} and {KEYUP[...]} to press, hold and release single keys."
        }
      ],
      "simple": "Most of the time you just type a value. When you need a special click or a key press, you write the action in curly braces, and Tosca performs it on the control.",
      "body": [
        "Plain text is typed as it is, and a capital letter is sent as Shift plus the letter. For special mouse actions, enter a click operation with ActionMode Input: {CLICK}, {DOUBLECLICK}, {RIGHTCLICK}, {MOUSEOVER} to hover, or {DRAG} on one control and {DROP} on the target. There are also click commands that hold a modifier key, such as CTRLCLICK or SHIFTCLICK.",
        "Single keys are written as commands: {ENTER}, {TAB}, {ESC}, {DEL}, {BACKSPACE}, the arrow keys such as {UP}, and {F1} to {F24}. For combinations such as Ctrl+A, use {SENDKEYS[\"^a\"]}; it takes Microsoft SendKeys syntax, where ^ stands for Ctrl, % for Alt and + for Shift. When an application needs separate key events, {KEYDOWN[CONTROL]}, {KEYPRESS[A]} and {KEYUP[CONTROL]} press and release keys by their virtual-key codes.",
        "These commands go to one control. To send keys to a whole window, for example Alt+F4 to close it, use the module TBox Send Keys from the Standard subset. If an application cannot keep up with a key sequence, the SendKeysDelay steering parameter or test configuration parameter sets a pause in milliseconds. Mobile Engine 3.0 supports only {BACKSPACE}, {ENTER} and {TAB}, and no click operations."
      ],
      "graphics": [
        {
          "type": "grid",
          "title": "Which command for which job",
          "columns": [
            "Job",
            "Value",
            "Where"
          ],
          "rows": [
            [
              "Click a button",
              "{CLICK}",
              "The button, ActionMode Input"
            ],
            [
              "Open a context menu",
              "{RIGHTCLICK}",
              "The control, ActionMode Input"
            ],
            [
              "Open a hover menu",
              "{MOUSEOVER}",
              "The menu entry, ActionMode Input"
            ],
            [
              "Submit a search",
              "{ENTER}",
              "The search field, ActionMode Input"
            ],
            [
              "Select all text",
              "{SENDKEYS[\"^a\"]}",
              "The text field, ActionMode Input"
            ],
            [
              "Close a whole window",
              "TBox Send Keys",
              "Standard module"
            ]
          ]
        }
      ],
      "example": {
        "title": "Copying an order number",
        "intro": "An order table has a context menu with Copy, and the number must be pasted into a Notes field.",
        "grid": {
          "columns": [
            "TestStepValue",
            "Value",
            "ActionMode"
          ],
          "rows": [
            [
              "Order row 48213",
              "{RIGHTCLICK}",
              "Input"
            ],
            [
              "Context menu: Copy",
              "{CLICK}",
              "Input"
            ],
            [
              "Notes field",
              "{SENDKEYS[\"^v\"]}",
              "Input"
            ]
          ]
        },
        "outcome": "Tosca right-clicks the row, chooses Copy and pastes the number into the Notes field with Ctrl+V."
      },
      "points": [
        "Click operations: {CLICK}, {DOUBLECLICK}, {RIGHTCLICK}, {MOUSEOVER}, {DRAG} and {DROP}.",
        "Single keys: {ENTER}, {TAB}, {ESC}, {F1} to {F24} and more.",
        "Combinations: {SENDKEYS[\"...\"]} with ^ for Ctrl, % for Alt and + for Shift.",
        "TBox Send Keys sends keys to a whole window."
      ],
      "mistake": "Typing Ctrl+A as text. Tosca then enters the characters themselves; key combinations need {SENDKEYS[\"...\"]}.",
      "docs": [
        {
          "title": "Keyboard commands",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tbox/special_characters.htm"
        },
        {
          "title": "Click operations",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/click_operations.htm"
        },
        {
          "title": "Basic Windows Operations",
          "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/standard_subset/automation_tools/windows_operations.htm"
        }
      ],
      "questions": "TBox"
    },
    {
      "id": "conditions-and-loops",
      "unit": 8,
      "title": "Conditions and loops",
      "definitions": [
        {
          "term": "If statement",
          "text": "A structure with a Condition, a Then part and an optional Else part. The Then steps run when the condition passes, the Else steps when it fails."
        },
        {
          "term": "Loop",
          "text": "A structure that executes its steps repeatedly. A While loop checks its condition before each pass, a Do loop after each pass."
        },
        {
          "term": "Repetition",
          "text": "A property of a TestStep folder that makes the steps in the folder run a fixed number of times."
        }
      ],
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
      "id": "reusable-blocks",
      "unit": 8,
      "title": "Reusable TestStepBlocks",
      "definitions": [
        {
          "term": "Reusable TestStepBlock",
          "text": "A group of TestSteps that is stored once in a TestStepLibrary and inserted into TestCases as a reference, so that a change to the block applies to every TestCase that uses it."
        },
        {
          "term": "TestStepLibrary",
          "text": "The folder in the TestCases section that contains Reusable TestStepBlocks."
        },
        {
          "term": "Business Parameter",
          "text": "A parameter of a Reusable TestStepBlock through which each TestCase passes its own value into the block. Inside the block it is read with {PL[Name]}."
        }
      ],
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
          "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/tosca_commander/reusable_teststepblocks.htm"
        }
      ],
      "questions": "TestCase design"
    },
    {
      "id": "verify-and-wait",
      "unit": 9,
      "title": "Checking and waiting",
      "definitions": [
        {
          "term": "Verification",
          "text": "A check that compares an actual value or property of a control with an expected one, using ActionMode Verify. Its result is passed or failed."
        },
        {
          "term": "Control property",
          "text": "A characteristic of a control that can be read at runtime, such as Exists, Enabled or Visible. In a Value it is written with a leading dot, for example .Visible==True."
        },
        {
          "term": "Synchronization",
          "text": "Making the test wait until the application is ready for the next action. ActionMode WaitOn waits for a state and continues as soon as it is reached; the module TBox Wait waits for a fixed time."
        }
      ],
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
      "id": "recovery-and-cleanup",
      "unit": 9,
      "title": "Failures, recovery and cleanup",
      "definitions": [
        {
          "term": "Dialog failure",
          "text": "A failure in which Tosca could not find or operate a control, for example because an unexpected pop-up covers it."
        },
        {
          "term": "Verification failure",
          "text": "A failure in which the control was found but its actual value differs from the expected value."
        },
        {
          "term": "Recovery Scenario",
          "text": "A set of TestSteps that Tosca runs automatically after a failure to return the application to a state from which the test can continue. It works only in ExecutionLists."
        },
        {
          "term": "CleanUp Scenario",
          "text": "A set of TestSteps that resets the application, for example by closing the browser, so that the next TestCase starts from a clean state."
        }
      ],
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
      "id": "test-configuration-parameters",
      "unit": 10,
      "title": "Test Configuration Parameters",
      "definitions": [
        {
          "term": "Test Configuration Parameter (TCP)",
          "text": "A named parameter attached to an object such as a folder, a TestCase or an ExecutionList. It holds a configuration value for the execution and is read in a Value with {CP[Name]}."
        },
        {
          "term": "Inheritance",
          "text": "The rule that a Test Configuration Parameter applies to every object below the one it is set on, unless a lower object sets its own value. A value on the execution side overrides the same parameter on the TestCase."
        }
      ],
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
          "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/engines_3.0/xbrowser/xbrowser.htm"
        }
      ],
      "questions": "Buffers and parameterisation"
    },
    {
      "id": "scratchbook-and-executionlists",
      "unit": 11,
      "title": "ScratchBook and ExecutionLists",
      "definitions": [
        {
          "term": "ScratchBook",
          "text": "A temporary execution area for trial runs of TestCases or single TestSteps. Tosca stores neither its structure nor its results."
        },
        {
          "term": "ExecutionList",
          "text": "An object in the Execution section that contains the TestCases to be run and stores the result of every run."
        },
        {
          "term": "ExecutionEntry",
          "text": "The representation of one TestCase inside an ExecutionList, together with the logs of its runs."
        }
      ],
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
      "id": "results-and-manual-runs",
      "unit": 11,
      "title": "Results, logs and manual runs",
      "definitions": [
        {
          "term": "ActualLog",
          "text": "The log of an ExecutionList that holds the overall results of its last run. Each new run overwrites it."
        },
        {
          "term": "TestCaseLog",
          "text": "The log an ExecutionEntry keeps for each run, identified by its ExecutionSessionID, so earlier runs stay visible."
        },
        {
          "term": "Execution result",
          "text": "The state of a run: Passed; Failed, when the application did not behave as expected; Error, when Tosca could not complete the test; or No result, when the entry has not been executed."
        },
        {
          "term": "Manual run",
          "text": "Executing an ExecutionEntry by hand with Run as Manual TestCase. A checklist shows one step at a time and the tester sets each to Passed or Failed."
        }
      ],
      "simple": "After a run, every test gets a result. Passed is good, Failed usually means the application is wrong, and Error usually means the test or the environment is wrong. Tests that are not automated yet can still be run by hand inside Tosca.",
      "body": [
        "Every ExecutionList has an ActualLog with the results of its last run, and a new run overwrites it. Each ExecutionEntry also gets a new TestCaseLog for every run, so you can see when a test started to fail. To keep a snapshot of the current results, create an ArchivedLog.",
        "Read the state before you start investigating. Failed means the system under test did not behave as expected, which typically points to a defect. Error means Tosca could not complete the test, for example because of an exception, a misspelled command or an environment problem, so look at the test and the environment first. No result means the entry has not run yet.",
        "Not every test is automated on day one. Right-click an ExecutionList or an ExecutionEntry and select Run as Manual TestCase. A checklist shows one step at a time. After performing it in the application, press Enter to set it to Passed or Ctrl+Enter for Failed, and Finish TestCase Execution sends the results to Tosca. Along the way you can add a comment, attach a file or make a screenshot."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Failed or Error?",
          "columns": [
            {
              "title": "Failed",
              "points": [
                "The application did not behave as expected.",
                "Typical cause: a defect in the system under test.",
                "Next: confirm it, then report a defect."
              ]
            },
            {
              "title": "Error",
              "points": [
                "Tosca could not complete the test.",
                "Typical cause: the TestCase or the environment.",
                "Next: fix the test or the environment and run again."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "A test run by hand",
        "intro": "A new screen has no Modules yet, so its test is run manually from the ExecutionList.",
        "grid": {
          "columns": [
            "Step",
            "What the tester does",
            "Result"
          ],
          "rows": [
            [
              "1",
              "Right-clicks the ExecutionEntry and selects Run as Manual TestCase.",
              "The checklist opens."
            ],
            [
              "2",
              "Fills in the order form as the first step says.",
              "Enter: Passed"
            ],
            [
              "3",
              "Sees a wrong total on the summary page.",
              "Ctrl+Enter: Failed, plus a screenshot"
            ],
            [
              "4",
              "Clicks Finish TestCase Execution.",
              "The ExecutionEntry is set to Failed in Tosca."
            ]
          ]
        }
      },
      "points": [
        "ActualLog: the last run. TestCaseLogs: every run.",
        "Failed points to the application, Error to the test or the environment.",
        "No result means the entry has not been executed.",
        "Run as Manual TestCase executes an entry by hand with a checklist."
      ],
      "mistake": "Treating every red result as an application defect. An Error usually means the test or the environment needs attention, not the application.",
      "docs": [
        {
          "title": "Work with execution results",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/execution_results.htm"
        },
        {
          "title": "Execute manual tests",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/executing_manual_tests.htm"
        }
      ],
      "questions": "Execution lists and DEX"
    },
    {
      "id": "requirements-and-risk",
      "unit": 12,
      "title": "Requirements and risk-based testing",
      "definitions": [
        {
          "term": "Requirement",
          "text": "A statement of what the software must do. In Tosca it is an object in the Requirements section to which TestCases and ExecutionLists are linked."
        },
        {
          "term": "Risk-based testing",
          "text": "An approach that orders testing by risk, so that the most used and most critical functions are tested first."
        },
        {
          "term": "Weight",
          "text": "A number that expresses the importance of a requirement. Tosca calculates it from the frequency class and the damage class."
        },
        {
          "term": "Coverage and execution state",
          "text": "Coverage is the share of a requirement that linked TestCases cover. Execution state is the share that has been executed, and with what result."
        }
      ],
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
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/requirements/requirements.htm"
        }
      ],
      "questions": "Reporting"
    },
    {
      "id": "reporting",
      "unit": 12,
      "title": "Results and reporting",
      "definitions": [
        {
          "term": "Execution log",
          "text": "The stored record of one run of an ExecutionEntry, with the result of every TestStep."
        },
        {
          "term": "Report",
          "text": "A document generated from execution results, and optionally requirements, that summarises what was tested and with what outcome."
        },
        {
          "term": "DokuSnapper",
          "text": "A Tosca function that documents a test run by recording the executed steps with screenshots."
        }
      ],
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
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/requirements/requirements.htm"
        }
      ],
      "questions": "Reporting"
    },
    {
      "id": "issues-and-test-management",
      "unit": 12,
      "title": "Issues, defects and test management tools",
      "definitions": [
        {
          "term": "Issue",
          "text": "A record in the Issues section of a problem or a wish found during testing. It can be linked to the execution log in which it was found."
        },
        {
          "term": "Defect",
          "text": "An issue that describes behaviour of the application which differs from the expected behaviour."
        },
        {
          "term": "FeatureRequest",
          "text": "An issue that describes desired functionality which is not implemented yet."
        },
        {
          "term": "Test management tool",
          "text": "Software for planning tests and tracking their execution and results across a project, for example Tricentis qTest."
        }
      ],
      "simple": "When a test fails because the application is wrong, someone has to fix the application. An issue records the problem and links it to the failed run, so the fix can be followed and tested again.",
      "body": [
        "Tosca Commander has an Issues section with two types of issue. A Defect describes behaviour that is wrong. A FeatureRequest describes something that is missing and wanted. You create either one by right-clicking the Issues folder.",
        "The valuable part is the link to the run. Right-click a failed ExecutionEntry or its TestCase log and select Create Defect: the issue is created and linked in one step. An issue that already exists can be dragged onto the log. Later, anyone can see which failures are already known and which are new.",
        "Many companies manage tests and defects in separate tools. Tricentis qTest is a test management tool that Tosca integrates with: Tosca tests are linked to qTest releases, and the results are visible in both tools. The two do not synchronise by themselves, so after changing tests in Tosca you update the link and check in. Defects are often kept in Jira, which qTest connects to."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "From failure to fix",
          "steps": [
            {
              "label": "Fail",
              "text": "A run in an ExecutionList fails."
            },
            {
              "label": "Analyse",
              "text": "Is the application wrong, or the test?"
            },
            {
              "label": "Report",
              "text": "Create a Defect from the log."
            },
            {
              "label": "Fix",
              "text": "A developer corrects the application."
            },
            {
              "label": "Retest",
              "text": "Run again. When it passes, close the defect."
            }
          ]
        }
      ],
      "example": {
        "title": "A failed run and its defect",
        "intro": "The checkout test fails because a discount code is ignored.",
        "grid": {
          "columns": [
            "Step",
            "Where",
            "What you do"
          ],
          "rows": [
            [
              "1",
              "ExecutionList",
              "Open the log of the failed entry and find the first failed step."
            ],
            [
              "2",
              "TestCase log",
              "Right-click and select Create Defect."
            ],
            [
              "3",
              "Issues section",
              "Name it 'Checkout: total ignores the discount code' and describe how to reproduce it."
            ],
            [
              "4",
              "After the fix",
              "Run the entry again. When it passes, close the defect."
            ]
          ]
        }
      },
      "points": [
        "Issue types: Defect and FeatureRequest.",
        "Create a Defect from the log to link it to the run.",
        "qTest shows Tosca results next to manual tests.",
        "Tosca and qTest are updated on request, not automatically."
      ],
      "mistake": "Reporting a defect before checking the test. When the failure comes from the test, for example a changed control or bad test data, developers lose time and stop trusting the suite.",
      "docs": [
        {
          "title": "Using issues in ExecutionLists",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/issue_executionlogs.htm"
        },
        {
          "title": "Create and link issues",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/issue_handling.htm"
        },
        {
          "title": "Tosca and qTest integration",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/qtest_integration/qtest_integration_intro.htm"
        }
      ],
      "questions": "Reporting"
    },
    {
      "id": "testcase-design",
      "unit": 13,
      "title": "TestCaseDesign: data and combinations",
      "definitions": [
        {
          "term": "TestCaseDesign",
          "text": "The section of Tosca Commander in which test data is designed separately from the TestCases and combined into test cases in a systematic way."
        },
        {
          "term": "TestSheet",
          "text": "The object in TestCaseDesign that holds the Attributes of one test design, their Instances and the combinations built from them."
        },
        {
          "term": "Attribute and Instance",
          "text": "An Attribute is something that varies in a test, such as the payment type. An Instance is one value it can take, such as card or invoice."
        },
        {
          "term": "TestCase Template",
          "text": "A TestCase with placeholders of the form {XL[Attribute]} that is linked to a TestSheet. Instantiating it creates one TestCase for each combination."
        }
      ],
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
      "unit": 14,
      "title": "Test Data Service",
      "definitions": [
        {
          "term": "Test Data Service (TDS)",
          "text": "A service of Tosca Server that stores test data centrally and provides it to tests at runtime, on whichever machine they run."
        },
        {
          "term": "Locking",
          "text": "The mechanism by which a data record that one test has fetched cannot be retrieved by another test, so no two tests use the same record."
        }
      ],
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
      "id": "excel-and-generated-data",
      "unit": 14,
      "title": "Test data from Excel and generated values",
      "definitions": [
        {
          "term": "Excel data source",
          "text": "A Microsoft Excel spreadsheet assigned to a TestCase Template as the source of its test data, in which each column from F onward is one business object."
        },
        {
          "term": "Instantiation selector",
          "text": "A second sheet named exec_ followed by the data sheet's name, in which an x marks which business objects become TestCases."
        },
        {
          "term": "Generated test data",
          "text": "Values created while the test runs, such as random numbers, random text or relative dates, instead of being stored in advance."
        }
      ],
      "simple": "Test data can come from a spreadsheet the business already keeps, or be made up on the spot while the test runs. Either way, the data stays out of the TestCase itself.",
      "body": [
        "A TestCase Template can take its data from an Excel spreadsheet instead of a TestSheet. Columns A to D describe the objects and attributes. From column F onward, each column header is one business object, which becomes the name of a TestCase, and each row holds one value. Comments on a business object are copied to the Description of its TestCase.",
        "To choose which columns become TestCases, add a second sheet named exec_ plus the name of the data sheet. Its first column lists instantiation names, such as all, and an x under a business object marks it for that instantiation. When you instantiate the Template, select the Instantiation Selector option in the Excel DataSource Wizard.",
        "Some data should not be planned at all. A unique e-mail address, a random amount or tomorrow's date can be generated during the run with dynamic expressions such as {RND[5]}, {RANDOMTEXT[6]} or {DATE[][+1d][dd/MM/yyyy]}. Generated data never runs out, does not collide with yesterday's run and contains no real customer's details. To read or write single cells during a run, use the Excel modules of the Standard subset."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Three ways to feed a test",
          "columns": [
            {
              "title": "TestSheet",
              "points": [
                "Planned in TestCaseDesign.",
                "Combinations generated by Tosca.",
                "Becomes TestCases through a Template."
              ]
            },
            {
              "title": "Excel data source",
              "points": [
                "Data the business already keeps.",
                "One column per business object.",
                "An exec_ sheet picks what to create."
              ]
            },
            {
              "title": "Generated at runtime",
              "points": [
                "New values on every run.",
                "Dynamic expressions such as {RND[5]}.",
                "Ideal for unique or one-time data."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "Customers from a spreadsheet",
        "intro": "The business keeps three test customers in an Excel sheet named TC_Customer.",
        "grid": {
          "columns": [
            "Sheet",
            "Content"
          ],
          "rows": [
            [
              "TC_Customer",
              "Columns F, G and H: Anna, Ben and Chen, each with a name, a country and an e-mail address."
            ],
            [
              "exec_TC_Customer",
              "Row 'all' with an x under Anna, Ben and Chen. Row 'smoke' with an x under Anna only."
            ],
            [
              "Template",
              "The customer data comes from the sheet; the order quantity is generated with {RND[2]}."
            ]
          ]
        },
        "outcome": "Instantiating 'all' creates three TestCases, one per customer, while 'smoke' creates only Anna's."
      },
      "points": [
        "An Excel spreadsheet can be the data source of a TestCase Template.",
        "From column F, each column is one business object and one TestCase.",
        "An exec_ sheet selects which business objects to instantiate.",
        "Generate unique values at runtime with dynamic expressions."
      ],
      "mistake": "Hard-coding the e-mail address in a registration test. The second run fails because the address is already registered; generate it instead.",
      "docs": [
        {
          "title": "Using test data from Excel",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/test_data_from_excel.htm"
        },
        {
          "title": "Random values",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/random_values.htm"
        },
        {
          "title": "Excel Modules",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/engines_3.0/excel.htm"
        }
      ],
      "questions": "Test data (TDM/TDS)"
    },
    {
      "id": "browsers-and-cross-browser",
      "unit": 15,
      "title": "Browsers and cross-browser runs",
      "definitions": [
        {
          "term": "XBrowser engine",
          "text": "The engine of Tosca that automates web applications in browsers. It communicates with the browser through the Tosca browser extension."
        },
        {
          "term": "Cross-browser testing",
          "text": "Executing the same tests in several browsers to confirm that the application behaves the same way in each of them."
        },
        {
          "term": "Configuration",
          "text": "A bundle of Test Configuration Parameters that is maintained in one place and assigned to objects such as ExecutionLists."
        }
      ],
      "simple": "Users open your web application in different browsers. A cross-browser run executes the same TestCase in each of them, and in Tosca the only thing you change is one parameter.",
      "body": [
        "Web pages are automated by the XBrowser engine. It works with the browser through the Tosca browser extension, so the extension has to be installed and enabled in every browser you test with.",
        "The browser is chosen by the Test Configuration Parameter named Browser. The usual values are Chrome, Edge and Firefox. A Module describes the page, not the browser, so you do not scan the page again for each browser.",
        "For a cross-browser run, create one ExecutionList per browser, put the same TestCases into each and set Browser on the ExecutionList. Configurations save typing here: a configuration is a bundle of Test Configuration Parameters kept in one place, which you assign to an object. Also keep the Windows display scaling at a standard value such as 100% or 125%, because the engine needs that to scan and steer pages properly."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "One TestCase, three runs",
          "root": {
            "label": "TestCase: Place an order",
            "text": "Built once, with no browser named in its steps",
            "children": [
              {
                "label": "ExecutionList Chrome",
                "text": "Browser = Chrome"
              },
              {
                "label": "ExecutionList Edge",
                "text": "Browser = Edge"
              },
              {
                "label": "ExecutionList Firefox",
                "text": "Browser = Firefox"
              }
            ]
          }
        }
      ],
      "example": {
        "title": "Setting the browser for each run",
        "intro": "The same TestCases are dragged into three ExecutionLists. Each list carries its own value.",
        "code": [
          {
            "label": "Test Configuration Parameter on the ExecutionList 'Regression Chrome'",
            "code": "Browser = Chrome"
          },
          {
            "label": "On the ExecutionList 'Regression Edge'",
            "code": "Browser = Edge"
          },
          {
            "label": "On the ExecutionList 'Regression Firefox'",
            "code": "Browser = Firefox"
          }
        ],
        "outcome": "Three results for every TestCase, one per browser, without a single copied step."
      },
      "points": [
        "The XBrowser engine needs the browser extension.",
        "The parameter Browser selects the browser.",
        "One ExecutionList per browser, same TestCases.",
        "A configuration bundles parameters in one place."
      ],
      "mistake": "Copying the TestCases once per browser. Three copies mean three places to repair. Keep one TestCase and change only the parameter.",
      "docs": [
        {
          "title": "XBrowser Engine 3.0",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/engines_3.0/xbrowser/xbrowser.htm"
        },
        {
          "title": "Test configuration parameters",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/tcp_list.htm"
        }
      ],
      "questions": "Execution lists and DEX"
    },
    {
      "id": "web-automation",
      "unit": 15,
      "title": "Web pages in depth: tabs, dialogs and headless runs",
      "definitions": [
        {
          "term": "JavaScript dialog box",
          "text": "A browser dialog opened by a page's script: an alert, a confirm or a prompt. It belongs to the browser, not to the page."
        },
        {
          "term": "Steer Dialog Box",
          "text": "A standard module in Standard modules, TBox XEngines, Html that confirms or cancels a JavaScript dialog box and can enter text into a prompt."
        },
        {
          "term": "Remote browser",
          "text": "A browser, on the same or another machine, that Tosca steers through WebDriver instead of the browser extension, selected with the HubAddress test configuration parameter."
        },
        {
          "term": "Headless browser",
          "text": "A browser that runs without a visible window. Through WebDriver, Tosca starts one with an argument such as --headless."
        }
      ],
      "simple": "Real websites do more than show one page. They open new tabs, pop up dialogs and download files. Tosca has a tool for each of these, and it can even run the browser without showing it.",
      "body": [
        "Every page has its own Module, so a page that opens in a new tab is steered with the Module of that page. The HTML standard modules handle the browser itself: OpenUrl opens a site and can reuse the active tab, and CloseBrowser closes tabs by their title, wildcards allowed.",
        "Alerts, confirms and prompts are not part of the page. Steer the page first, then use the standard module Steer Dialog Box to confirm or cancel, or to type into a prompt. Other HTML standard modules run JavaScript on a page and verify its result, check a page for broken links or accessibility problems, and record console or network logs in Chrome and Edge. After a download, check the file with the File Operations modules.",
        "Tests can also run through WebDriver instead of the browser extension. Set the test configuration parameter HubAddress to localhost or to the address of a Selenium Grid hub, and Browser to the browser you want. To run Chrome, Chromium or Firefox headless, for example on a build server, add --headless and a window size as Arguments under BrowserArguments in OpenUrl."
      ],
      "graphics": [
        {
          "type": "grid",
          "title": "Which tool for which situation",
          "columns": [
            "Situation",
            "Use"
          ],
          "rows": [
            [
              "Open a website",
              "OpenUrl"
            ],
            [
              "Close a tab",
              "CloseBrowser with the tab's title"
            ],
            [
              "Alert, confirm or prompt",
              "Steer Dialog Box, after steering the page"
            ],
            [
              "Run or check a script",
              "Execute JavaScript, Verify JavaScript Result"
            ],
            [
              "Broken links, accessibility",
              "Check Webpage for Broken Links, Check Webpage Accessibility"
            ],
            [
              "Check a downloaded file",
              "File Operations modules"
            ],
            [
              "Run without a window",
              "WebDriver: HubAddress, Browser and --headless"
            ]
          ]
        }
      ],
      "example": {
        "title": "Confirming a delete",
        "intro": "Clicking Delete on an order opens a confirm dialog: 'Delete order 48213?'",
        "grid": {
          "columns": [
            "TestStep and value",
            "Value",
            "ActionMode"
          ],
          "rows": [
            [
              "Orders page: Delete button",
              "{CLICK}",
              "Input"
            ],
            [
              "Steer Dialog Box: Title",
              "Orders*",
              "Input"
            ],
            [
              "Steer Dialog Box: Confirmation",
              "OK",
              "Input"
            ],
            [
              "Orders page: Message",
              "Order 48213 deleted",
              "Verify"
            ]
          ]
        },
        "outcome": "Tosca clicks Delete, confirms the dialog in the browser window whose title starts with Orders, and checks the message on the page."
      },
      "points": [
        "Each page has its own Module; OpenUrl opens sites and CloseBrowser closes tabs.",
        "JavaScript dialogs need Steer Dialog Box, after the page is steered.",
        "HubAddress and Browser run tests through WebDriver, locally or on a grid.",
        "--headless in BrowserArguments runs the browser without a window."
      ],
      "mistake": "Trying to scan an alert like a page. It is a browser dialog, so it is steered with Steer Dialog Box.",
      "docs": [
        {
          "title": "HTML Modules",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/standard_subset/engines_3.0/html.htm"
        },
        {
          "title": "Steer JavaScript dialog boxes",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/engines_3.0/xbrowser/xbrowser_steer_dialog_box.htm"
        },
        {
          "title": "Test remote browsers (Tosca Cloud)",
          "url": "https://docs.tricentis.com/tosca-cloud/en-us/content/create_tests/test_remote_browser.htm"
        }
      ],
      "questions": "Steering dynamic controls"
    },
    {
      "id": "other-technologies",
      "unit": 15,
      "title": "Desktop, mobile and image-based testing",
      "definitions": [
        {
          "term": "Engine",
          "text": "The component of Tosca that communicates with one technology, such as web pages, Windows programs or mobile apps."
        },
        {
          "term": "UIA engine",
          "text": "The engine for Windows desktop controls. It is based on Microsoft UI Automation."
        },
        {
          "term": "Mobile engine",
          "text": "The engine for native, web and hybrid apps on Android and iOS devices and emulators."
        },
        {
          "term": "Image-based steering",
          "text": "Finding and operating controls by how they look on the screen, not by their technical properties. Vision AI is the Tricentis technology for this."
        }
      ],
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
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/tbox_intro.htm"
        }
      ],
      "questions": "Module scanning (XScan)"
    },
    {
      "id": "sap-testing",
      "unit": 15,
      "title": "SAP testing",
      "definitions": [
        {
          "term": "SAP GUI",
          "text": "The desktop client of SAP. Tosca steers it through the SAP GUI Scripting interface."
        },
        {
          "term": "SAP GUI Scripting",
          "text": "The automation interface of SAP GUI. It must be enabled on the SAP server and in the SAP GUI options before Tosca can scan or steer SAP screens."
        },
        {
          "term": "Transaction code",
          "text": "A short code, also called T-code, that opens an SAP function directly, for example VA01 to create a sales order."
        },
        {
          "term": "SAP Fiori",
          "text": "The web-based user interface of SAP. It runs in a browser and is tested with the browser engine."
        }
      ],
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
      "id": "salesforce-and-mainframe",
      "unit": 15,
      "title": "Salesforce and mainframe applications",
      "definitions": [
        {
          "term": "Salesforce Scan",
          "text": "A scan that connects to a Salesforce system through its API and creates Modules for the controls it can reach."
        },
        {
          "term": "HOST engine",
          "text": "The engine of Tosca for mainframe applications. It steers text screens over TN3270 and TN5250 connections."
        },
        {
          "term": "Terminal emulator",
          "text": "A program that displays the text screens of a mainframe application on a PC."
        }
      ],
      "simple": "Two more kinds of application have their own engine: Salesforce, a widely used cloud system for sales and service, and mainframe applications, the text screens of older business systems.",
      "body": [
        "Salesforce has a great many objects and screens, and scanning them one by one would take long. The Salesforce Scan, in the Modules menu, takes another route. It connects to your Salesforce system through the Salesforce API and creates Modules for all the controls it can reach. You enter a user name, a password and the environment, plus a security token if your machine is outside the trusted IP range.",
        "A mainframe application shows text screens in a terminal emulator. The HOST engine steers these screens over TN3270 and TN5250 connections. You open a session in a supported emulator and scan it with Scan > Remote Terminal. The engine cannot detect the number of rows and columns of the screen by itself, so you enter them in the settings.",
        "After scanning, both work like every other technology: Modules, TestSteps, values and ActionModes. Since Tosca 2023.2 the HOST engine also has a headless mode, which connects without an emulator window."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Two engines, two ways to get Modules",
          "columns": [
            {
              "title": "Salesforce",
              "points": [
                "A cloud application in the browser.",
                "Modules are created by the Salesforce Scan.",
                "Needs a login, and a security token outside the trusted IP range."
              ]
            },
            {
              "title": "Mainframe (HOST)",
              "points": [
                "Text screens in a terminal emulator.",
                "Modules are created with Scan > Remote Terminal.",
                "Rows and columns of the screen are set by hand."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "What the Salesforce Scan asks for",
        "intro": "The four entries before the scan starts.",
        "grid": {
          "columns": [
            "Entry",
            "Example",
            "Note"
          ],
          "rows": [
            [
              "User name",
              "qa.tester@example.com",
              "A user created for testing"
            ],
            [
              "Password",
              "(hidden)",
              "The password of that user"
            ],
            [
              "Environment",
              "The test system",
              "Scan the test system, not production"
            ],
            [
              "Security token",
              "From the user's Salesforce settings",
              "Only needed outside the trusted IP range"
            ]
          ]
        },
        "outcome": "The scan creates Modules in the Modules folder, ready to be dragged into TestCases."
      },
      "points": [
        "The Salesforce Scan builds Modules through the Salesforce API.",
        "The HOST engine steers TN3270 and TN5250 screens.",
        "Mainframe screens are scanned with Scan > Remote Terminal.",
        "TestCases are built the same way as for any technology."
      ],
      "mistake": "Forgetting the security token. Outside the trusted IP range Salesforce refuses the login, and it looks as if the password were wrong.",
      "docs": [
        {
          "title": "Use the Salesforce Scan",
          "url": "https://docs.tricentis.com/tosca-2024.2/en-us/content/engines_3.0/salesforce/sfdc_sitescanner.htm"
        },
        {
          "title": "HOST engine: supported emulators",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/engines_3.0/host/supported_emulators.htm"
        },
        {
          "title": "Create HOST Modules",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/engines_3.0/host/create_host_modules.htm"
        }
      ],
      "questions": "Module scanning (XScan)"
    },
    {
      "id": "databases-pdf-and-mail",
      "unit": 15,
      "title": "Databases, PDF files and e-mail",
      "definitions": [
        {
          "term": "Database testing",
          "text": "Verifying data directly in a database by running SQL statements through the database Modules and checking the result."
        },
        {
          "term": "DB Expert Module",
          "text": "A database Module that opens the connection, runs one statement and closes the connection in a single TestStep."
        },
        {
          "term": "PDF comparison",
          "text": "Comparing a PDF file with a reference file using the Module PDF 1:1 Compare. The test passes when their similarity reaches the required Accuracy."
        },
        {
          "term": "Mail Modules",
          "text": "The Modules that connect to a mail server and send, find and verify e-mails without opening a mail program."
        }
      ],
      "simple": "Many tests end outside the screen: a row is written to a database, a PDF invoice is created, a confirmation e-mail is sent. Tosca has engines that check each of these directly.",
      "body": [
        "Database: the database modules connect through a DSN or a connection string, run an SQL statement, and let you verify or buffer the result. The DB Expert Module does all three steps, open, run and close, in a single module.",
        "PDF: the PDF engine works in two ways. You can scan a PDF like a screen and create text, image and table areas to verify. Or you compare a new file with a reference file using the module PDF 1:1 Compare. Its Accuracy value is the lowest similarity in percent that still passes, and you can exclude areas, texts or whole pages that are allowed to differ, such as a date.",
        "E-mail: the mail modules connect to a mail server over SMTP, POP3 or IMAP. Receive Mail Simple looks for one e-mail. Values with ActionMode Input are the search criteria, Verify checks the content, and Buffer stores a part of it, such as a confirmation code. Send Mail sends a message."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "An order, checked from end to end",
          "steps": [
            {
              "label": "Screen",
              "text": "The order is placed in the application."
            },
            {
              "label": "Database",
              "text": "The order row exists with the right status."
            },
            {
              "label": "PDF",
              "text": "The invoice matches the reference file."
            },
            {
              "label": "E-mail",
              "text": "The confirmation has arrived."
            }
          ]
        }
      ],
      "example": {
        "title": "After placing an order",
        "intro": "The order number was stored in the Buffer OrderNo by an earlier step.",
        "grid": {
          "columns": [
            "Check",
            "Module",
            "What is verified"
          ],
          "rows": [
            [
              "Order saved",
              "DB Expert Module",
              "SELECT status FROM orders WHERE id = {B[OrderNo]} returns NEW"
            ],
            [
              "Invoice correct",
              "PDF 1:1 Compare",
              "The new invoice matches the reference file. The area with the date is excluded."
            ],
            [
              "Customer informed",
              "Receive Mail Simple",
              "An e-mail whose subject contains {B[OrderNo]} has arrived"
            ]
          ]
        },
        "outcome": "The test proves the whole chain, not only what the screen shows."
      },
      "points": [
        "Database modules run SQL and verify the result.",
        "The DB Expert Module opens, runs and closes in one step.",
        "PDF: scan areas, or compare two files with PDF 1:1 Compare.",
        "Mail: Input searches, Verify checks, Buffer stores."
      ],
      "mistake": "Opening the PDF viewer or the mail program and checking through its window. The engines read the file and the mailbox directly, which is faster and does not depend on what is on the screen.",
      "docs": [
        {
          "title": "Database Modules",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/standard_subset/engines_3.0/database.htm"
        },
        {
          "title": "PDF Engine 3.0",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/engines_3.0/pdf/pdf_engine.htm"
        },
        {
          "title": "Mail Modules",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/standard_subset/engines_3.0/mail.htm"
        }
      ],
      "questions": "TBox"
    },
    {
      "id": "api-testing",
      "unit": 16,
      "title": "API testing",
      "definitions": [
        {
          "term": "API",
          "text": "Application programming interface: a defined interface through which programs exchange requests and responses without a user interface."
        },
        {
          "term": "API testing",
          "text": "Testing an application by sending requests directly to its API and verifying the responses."
        },
        {
          "term": "API Scan",
          "text": "The Tosca tool for creating and sending API requests, checking the responses and exporting them to Tosca Commander as Modules and TestCases."
        },
        {
          "term": "Chaining",
          "text": "Passing a value from the response of one request, such as a token, into a later request."
        }
      ],
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
      "id": "service-virtualization",
      "unit": 16,
      "title": "Service virtualization (OSV)",
      "definitions": [
        {
          "term": "Service virtualization",
          "text": "Simulating the behaviour of a service that the system under test depends on, so that testing does not need the real service."
        },
        {
          "term": "Orchestrated Service Virtualization (OSV)",
          "text": "The Tosca component for service virtualization. It answers the requests of the system under test with prepared responses."
        },
        {
          "term": "OSV Scenario",
          "text": "The definition of one simulated business case: the order and the content of the request and response messages."
        },
        {
          "term": "Service port",
          "text": "A virtual service endpoint in an OSV Environment. One is created for each real service that is replaced."
        }
      ],
      "simple": "Service virtualization replaces a system that your application depends on with a stand-in that gives prepared answers. Your tests can then run even when the real system is down, unfinished or charges money for every call.",
      "body": [
        "Most applications call other systems: a payment provider, a credit check, a partner's service. When one of them is not available, your test fails although your own application is fine. Tosca's Orchestrated Service Virtualization, OSV for short, plays the part of that system.",
        "A virtual service is described as a Scenario: which request comes in, and which response goes out. In Tosca Commander a Scenario is built like a TestCase. You can create one from messages in API Scan, convert an existing API TestCase, or record the real traffic between your application and the real service with the recorder in the OSV Monitor.",
        "Scenarios run in an OSV Environment. For each real service you create a service port there. It is the virtual address that your application calls instead of the real one. The OSV Monitor is the place where you start, stop and watch environments and Scenarios."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "How a virtual service answers",
          "steps": [
            {
              "label": "Application",
              "text": "Your application sends a request, as always."
            },
            {
              "label": "Service port",
              "text": "The request arrives at OSV, not at the real service."
            },
            {
              "label": "Scenario",
              "text": "OSV finds the Scenario that matches the request."
            },
            {
              "label": "Response",
              "text": "The prepared answer goes back to your application."
            }
          ]
        }
      ],
      "example": {
        "title": "A payment provider that is not available",
        "intro": "Two Scenarios stand in for the provider, so the checkout test can cover both outcomes.",
        "grid": {
          "columns": [
            "Direction",
            "Message",
            "Content"
          ],
          "rows": [
            [
              "Inbound, from your application",
              "POST /payments",
              "amount = 50.00, currency = EUR"
            ],
            [
              "Outbound, from OSV",
              "Response 200",
              "status = approved, paymentId = P-1001"
            ],
            [
              "Inbound, from your application",
              "POST /payments",
              "amount = 99999.00, currency = EUR"
            ],
            [
              "Outbound, from OSV",
              "Response 402",
              "status = declined"
            ]
          ]
        },
        "outcome": "The approved and the declined path can both be tested, on any day and without paying per call."
      },
      "points": [
        "OSV stands in for systems you depend on.",
        "A Scenario defines requests and their responses.",
        "Scenarios run in an OSV Environment, behind service ports.",
        "Create Scenarios by hand, from API tests or by recording."
      ],
      "mistake": "Virtualizing the system you are supposed to test. Only the systems around it are replaced. Your own application stays real.",
      "docs": [
        {
          "title": "Tosca Orchestrated Service Virtualization (OSV)",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/orchestrate/orchestrate.htm"
        },
        {
          "title": "Tosca OSV Monitor overview",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/orchestrate/starting_orchestrate_monitor.htm"
        }
      ],
      "questions": "API testing"
    },
    {
      "id": "distributed-execution",
      "unit": 17,
      "title": "Distributed Execution (DEX)",
      "definitions": [
        {
          "term": "Distributed Execution (DEX)",
          "text": "The component of Tosca that distributes test runs to several machines, so that they execute in parallel and without a person present."
        },
        {
          "term": "Agent",
          "text": "A machine that receives tests from the Distribution Server, executes them and sends the results back."
        },
        {
          "term": "TestEvent",
          "text": "A group of ExecutionLists that is started and distributed as one run."
        }
      ],
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
      "id": "tosca-server",
      "unit": 17,
      "title": "Tosca Server and its services",
      "definitions": [
        {
          "term": "Tosca Server",
          "text": "A group of Windows services, installed on a server, that provide the shared features of Tosca, such as user administration, licence monitoring, Distributed Execution, Test Data Service and the REST API."
        },
        {
          "term": "Tosca Gateway",
          "text": "The service that acts as firewall and communication proxy for Tosca Server's services and clients, and serves the Tosca Server landing page."
        },
        {
          "term": "Automation Object Service (AOS)",
          "text": "The service that gives other services and agents access to the objects of a Tosca repository. Distributed Execution uses it."
        },
        {
          "term": "Tosca Administration Console",
          "text": "A web console for managing users across repositories and for automating project migration during upgrades."
        }
      ],
      "simple": "Tosca Commander runs on your own computer. Tosca Server is the shared part on a server: it signs people in, watches the licences, runs tests on other machines and keeps shared test data.",
      "body": [
        "Tosca Server is not one program but a group of Windows services, and you install and enable only the features you need. The Tosca Gateway sits in front of them as the single entry point and firewall, and it serves the Tosca Server landing page.",
        "The main features are: the Administration Console, for users and project migration, with the Authentication Service; License Administration, which shows who uses which licence; Distributed Execution with the Automation Object Service; Test Data Service; the File Service, which keeps files out of the workspace; the Tosca REST API for other programs; Exploratory Testing and Interactive Testing for manual work; and the Notification Service for integrations such as qTest and SAP Solution Manager.",
        "Check what is switched on before you plan. From Tosca 2026.1, a new Tosca Server installation no longer enables Distributed Execution by default, Tricentis recommends the Elastic Execution Grid with AOS instead, and DEX without AOS is being deprecated. Each service uses its own ports, so firewalls between clients, agents and the server must let them through."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "What Tosca Server contains",
          "root": {
            "label": "Tosca Gateway",
            "text": "Single entry point and firewall",
            "children": [
              {
                "label": "Administration Console",
                "text": "Users across repositories, project migration."
              },
              {
                "label": "License Administration",
                "text": "Who uses which licence."
              },
              {
                "label": "Distributed Execution and AOS",
                "text": "Runs tests on agents."
              },
              {
                "label": "Test Data Service",
                "text": "Shared test data."
              },
              {
                "label": "File Service",
                "text": "Keeps files out of the workspace."
              },
              {
                "label": "REST API and Notification Service",
                "text": "Other programs and integrations."
              }
            ]
          }
        }
      ],
      "example": {
        "title": "Which service does what?",
        "intro": "A team lead plans the server for a new project.",
        "grid": {
          "columns": [
            "The team wants to",
            "Service"
          ],
          "rows": [
            [
              "Manage users for several repositories in one place",
              "Administration Console and Authentication Service"
            ],
            [
              "See who holds which licence",
              "License Administration"
            ],
            [
              "Run ExecutionLists on agent machines",
              "Distributed Execution with AOS"
            ],
            [
              "Share data between tests that run in parallel",
              "Test Data Service"
            ],
            [
              "Start tasks or fetch results from another program",
              "Tosca REST API"
            ],
            [
              "Show Tosca results in qTest",
              "Notification Service"
            ]
          ]
        }
      },
      "points": [
        "Tosca Server is a group of Windows services; enable only what you need.",
        "The Gateway is the entry point and the firewall.",
        "DEX works with the Automation Object Service; DEX without AOS is being deprecated.",
        "New 2026.1 installations do not enable DEX by default."
      ],
      "mistake": "Assuming a feature works because Tosca Server is installed. Each feature is a separate service that must be installed, enabled and reachable through the firewall.",
      "docs": [
        {
          "title": "Tosca Server features",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_server/tosca_server_features.htm"
        },
        {
          "title": "Ports required by the Tosca Server features",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_server/server_ports.htm"
        }
      ],
      "questions": "Execution lists and DEX"
    },
    {
      "id": "ci-cd",
      "unit": 18,
      "title": "CI/CD integration",
      "definitions": [
        {
          "term": "CI/CD",
          "text": "Continuous integration and continuous delivery: a practice in which every change to the software is built, tested and delivered automatically by a pipeline."
        },
        {
          "term": "CI/CD integration",
          "text": "Starting Tosca tests from a pipeline through a command-line client, which triggers the run and returns the results to the pipeline."
        },
        {
          "term": "JUnit result",
          "text": "An XML result format that pipeline tools such as Jenkins and Azure DevOps can read and display."
        }
      ],
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
      "id": "tc-shell",
      "unit": 18,
      "title": "TC-Shell: Tosca from the command line",
      "definitions": [
        {
          "term": "TC-Shell",
          "text": "The command-line interface of Tosca Commander, through which a workspace is operated with typed commands."
        },
        {
          "term": "Interactive mode",
          "text": "The mode in which you enter one command at a time and see its result."
        },
        {
          "term": "Script mode",
          "text": "The mode in which TC-Shell executes the commands of a script file, usually with the extension .tcs, without user input."
        }
      ],
      "simple": "TC-Shell lets you control Tosca Commander with typed commands instead of clicks. Put the commands in a file, and Tosca can do routine work, such as a nightly update and run, with nobody at the keyboard.",
      "body": [
        "TC-Shell has two modes. In interactive mode you type one command at a time and see the answer. In script mode it reads the commands from a text file, usually ending in .tcs, works through them from top to bottom, then closes the workspace and exits. Lines that start with // are comments.",
        "The commands mirror what you do in the window. updateall and checkinall do the same as Update all and Checkin all. JumpToNode moves to an object by its path. task lists the actions available on the current object, or runs one of them. For can repeat a task for every object that a TQL query finds.",
        "Typical uses are a run started by the Windows Task Scheduler, housekeeping such as deleting old execution logs, and backups of the repository. Tricentis recommends that only administrators use TC-Shell, because a script can change a lot very quickly. Pipelines normally use the clients from the CI/CD lesson instead."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Two modes",
          "columns": [
            {
              "title": "Interactive mode",
              "points": [
                "You type each command.",
                "You see the result at once.",
                "Good for trying commands out."
              ]
            },
            {
              "title": "Script mode",
              "points": [
                "Commands come from a .tcs file.",
                "Nobody can step in while it runs.",
                "Good for scheduled, unattended work."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "A nightly script",
        "intro": "The command line starts TC-Shell with a workspace, a login and a script file. The path and task names in the script are examples: type task in interactive mode to see the exact names for your objects.",
        "code": [
          {
            "label": "Start in script mode (the empty quotes mean: no password)",
            "code": "TCShell -workspace \"d:\\\\Workspace\\\\WS1\\\\WS1.tws\" -login \"Admin\" \"\" \"d:\\\\Workspace\\\\WS1\\\\script.tcs\""
          },
          {
            "label": "script.tcs: update, run an ExecutionList, publish the results",
            "code": "// nightly regression\nupdateall\nJumpToNode \"/Execution/ExecutionLists/Nightly regression\"\ntask \"Run\"\ncheckinall"
          }
        ],
        "outcome": "When the last command has finished, the workspace closes and TC-Shell exits by itself."
      },
      "points": [
        "Interactive mode for trying, script mode for automation.",
        "Scripts are text files, usually .tcs.",
        "updateall, checkinall, JumpToNode and task are the core commands.",
        "Meant for administrators."
      ],
      "mistake": "Trying a new script on the team's main workspace. Test it on a copy first, because a wrong path followed by checkinall publishes the damage to everyone.",
      "docs": [
        {
          "title": "Steer Tosca Commander via Command Line (TCShell.exe)",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/tcshell.htm"
        },
        {
          "title": "Working in script mode",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/script_mode.htm"
        },
        {
          "title": "Use TC-Shell commands",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/tcshell_commands.htm"
        }
      ],
      "questions": "CI/CD integration"
    },
    {
      "id": "users-and-groups",
      "unit": 19,
      "title": "Users, groups and access rights",
      "definitions": [
        {
          "term": "User and user group",
          "text": "A user is an account that logs in to a multi-user workspace. A user group collects users so that rights can be assigned to all of them at once."
        },
        {
          "term": "OwningGroupName",
          "text": "The property of an object that names the user group with write access to it."
        },
        {
          "term": "ViewingGroupName",
          "text": "The property of an object that names the user group allowed to see it."
        }
      ],
      "simple": "In a shared project, not everyone should be able to change everything. Users are collected in groups. A group can own a folder, which decides who may change it, or be its viewing group, which decides who may see it.",
      "body": [
        "User management is the job of an administrator. Check out the project root, open the Usermanagement tab and create users and user groups there. Two groups always exist and cannot be renamed or deleted: Admins and All Users.",
        "Rights are set on objects through two properties. OwningGroupName names the group that may change the object. ViewingGroupName names the group that may see it. An object can also inherit the setting from its folder. The owning group counts more: if it is All Users, everyone sees the object, whatever the viewing group says.",
        "Each user also has a level. Expert is the default and allows every operation. Basic is more limited. Companies that use Tosca Server can manage users centrally in Tricentis User Administration and synchronise them with Tosca Commander."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "Who may do what with one folder",
          "root": {
            "label": "Folder: Payments",
            "text": "Rights are read from two properties",
            "children": [
              {
                "label": "OwningGroupName: Payments team",
                "text": "May change the folder and what is in it."
              },
              {
                "label": "ViewingGroupName: Testers",
                "text": "May see it."
              },
              {
                "label": "Everyone else",
                "text": "Does not see the folder."
              }
            ]
          }
        }
      ],
      "example": {
        "title": "Three folders, three settings",
        "intro": "How the two properties work together.",
        "grid": {
          "columns": [
            "Folder",
            "OwningGroupName",
            "ViewingGroupName",
            "Effect"
          ],
          "rows": [
            [
              "Modules / Payments",
              "Payments team",
              "Testers",
              "The Payments team edits. Other testers see the Modules."
            ],
            [
              "TestCases / HR",
              "HR team",
              "HR team",
              "Only the HR team sees the folder."
            ],
            [
              "Shared library",
              "Admins",
              "Testers",
              "Testers see it. Only administrators change it."
            ]
          ]
        }
      },
      "points": [
        "Admins and All Users always exist.",
        "OwningGroupName: who may change.",
        "ViewingGroupName: who may see.",
        "User levels: Expert (default) and Basic."
      ],
      "mistake": "Leaving everything owned by All Users. One wrong drag and drop can then damage Modules that hundreds of TestCases depend on.",
      "docs": [
        {
          "title": "Tosca Commander user management",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/user_management.htm"
        },
        {
          "title": "Assign rights to users or user groups",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/user_group_rights.htm"
        }
      ],
      "questions": "Multi-user workspaces"
    },
    {
      "id": "versions-branches-subsets",
      "unit": 19,
      "title": "Versions, branches and subsets",
      "definitions": [
        {
          "term": "Revision",
          "text": "The record of one checkin: a numbered state of the project with the date, the user, an optional comment and the list of changed objects."
        },
        {
          "term": "Branch",
          "text": "A separate line of development of the same project, created from the common repository. Changes in a branch do not affect the master branch."
        },
        {
          "term": "Subset",
          "text": "A file with the extension .tsu that contains exported objects and the objects they depend on. It is used to move objects from one project to another."
        }
      ],
      "simple": "Tosca remembers every checkin as a revision, so you can see who changed what and go back. A branch is a separate line of the project for parallel work. A subset is a file for moving objects from one project to another.",
      "body": [
        "Versions: every checkin creates a revision with a number, the date, the user and an optional comment. The change history lists the revisions and the objects each one changed. You can revert to an earlier revision, and an administrator can recover an object that was deleted.",
        "Branches: an administrator right-clicks the project root and selects Create Branch. Work in the branch does not affect the main line, which is called the master branch. A branch is useful when you must keep the tests for an old release of the application while building tests for the next one. From Tosca 2025.1 merging a branch back is switched off by default, and Tricentis has announced plans to remove it, so treat a branch as a snapshot that lives on separately.",
        "Subsets: right-click an object and select Export Subset to save it as a .tsu file. What the object needs comes with it; a TestCase brings its Modules. When you import, you choose Merge, which keeps the identity of the objects so that existing ones are updated, or Import, which creates new copies. Parameters set on the project root and access rights are not exported."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Three tools for three jobs",
          "columns": [
            {
              "title": "Revision",
              "points": [
                "Created by every checkin.",
                "Answers: who changed what, and when?",
                "Lets you go back."
              ]
            },
            {
              "title": "Branch",
              "points": [
                "A separate line of the same project.",
                "For work on two versions in parallel.",
                "Created by an administrator."
              ]
            },
            {
              "title": "Subset (.tsu)",
              "points": [
                "A file with exported objects.",
                "Moves objects between projects.",
                "Brings referenced Modules along."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "Moving the login tests to another project",
        "intro": "From project A to project B with a subset.",
        "grid": {
          "columns": [
            "Step",
            "Action",
            "Result"
          ],
          "rows": [
            [
              "1",
              "In project A, right-click the folder Login and select Export Subset",
              "Login.tsu, including the Modules the TestCases use"
            ],
            [
              "2",
              "In project B, check out the folder that will receive it",
              "Needed in a multi-user workspace"
            ],
            [
              "3",
              "Right-click that folder, select Import Subset and pick the file",
              "Tosca asks: Merge or Import"
            ],
            [
              "4",
              "Choose Merge, then Checkin all",
              "The team sees the TestCases, and a later export updates them instead of duplicating them"
            ]
          ]
        }
      },
      "points": [
        "Every checkin is a revision you can return to.",
        "A branch is a separate line; merging back is being retired.",
        "A subset is a .tsu file with objects and what they need.",
        "Merge keeps identities; Import makes copies."
      ],
      "mistake": "Checking in without a comment. Six months later the history shows forty revisions and no hint which one changed the login Module.",
      "docs": [
        {
          "title": "Handle object versioning",
          "url": "https://docs.tricentis.com/tosca-2023.1/en-us/content/tosca_commander/object_versioning.htm"
        },
        {
          "title": "Create and manage branches",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/creating_branches.htm"
        },
        {
          "title": "Import and export subsets",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/import_export_subsets.htm"
        }
      ],
      "questions": "Multi-user workspaces"
    },
    {
      "id": "tql-and-virtual-folders",
      "unit": 19,
      "title": "Searching with TQL and virtual folders",
      "definitions": [
        {
          "term": "TQL",
          "text": "Tosca Query Language: a formal query language for finding objects in a project by their type, their properties and their relations to other objects."
        },
        {
          "term": "Virtual folder",
          "text": "A folder that does not contain objects itself. It displays the objects found by the TQL query stored in its Query property."
        }
      ],
      "simple": "TQL, the Tosca Query Language, is a way to ask the project exact questions, such as 'which TestCases are not finished?'. A virtual folder saves such a question and always shows the current answer.",
      "body": [
        "A query starts at the object you are on and follows an arrow. The arrow -> takes one step, and => repeats the step all the way down. SUBPARTS goes to the objects inside, SUPERPART to the object above. So =>SUBPARTS means: everything below here, at any depth.",
        "After a colon you name the type of object you want, and in square brackets a condition on a property. == means equals, != means does not equal, and =? means contains. The query =>SUBPARTS:TestCase[Name=?\"Login\"] finds every TestCase below the current folder whose name contains Login.",
        "The TQL search is part of the normal search: select TQL Search there. After a query has run, you can save it as a virtual folder. The folder keeps the query in its Query property and shows the matching objects, and nothing else. The query is evaluated from the place where the virtual folder sits, so its position matters."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "Reading a query piece by piece",
          "steps": [
            {
              "label": "=>",
              "text": "Search at every level below the current object."
            },
            {
              "label": "SUBPARTS",
              "text": "Follow the link to the contained objects."
            },
            {
              "label": ":TestCase",
              "text": "Keep only objects of the type TestCase."
            },
            {
              "label": "[Name==\"Test001\"]",
              "text": "Keep only those with this name."
            }
          ]
        }
      ],
      "example": {
        "title": "Four useful queries",
        "intro": "Typed into the TQL search, or stored in the Query property of a virtual folder.",
        "code": [
          {
            "label": "The TestCase named Test001, anywhere below this folder",
            "code": "=>SUBPARTS:TestCase[Name==\"Test001\"]"
          },
          {
            "label": "All TestCases whose name contains Automobile",
            "code": "=>SUBPARTS:TestCase[Name=?\"Automobile\"]"
          },
          {
            "label": "All TestCases that are still PLANNED",
            "code": "=>SUBPARTS:TestCase[TestCaseWorkState==\"PLANNED\"]"
          },
          {
            "label": "Virtual folder: unfinished TestCases in the folder it sits in",
            "code": "->SUPERPART=>SUBPARTS:TestCase[TestCaseWorkState!=\"COMPLETED\"]"
          }
        ],
        "outcome": "The last query first steps up to the parent folder, then searches everything below it."
      },
      "points": [
        "-> is one step, => is every level.",
        "SUBPARTS goes down, SUPERPART goes up.",
        ":Type and [Property==\"value\"] filter the result.",
        "A virtual folder is a saved query."
      ],
      "mistake": "Using -> when you mean =>. A single arrow looks only one level down, so nothing in the subfolders is found and the objects seem not to exist.",
      "docs": [
        {
          "title": "TQL - Step by step",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/tql_step_by_step.htm"
        },
        {
          "title": "TQL Search",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/tql_search.htm"
        },
        {
          "title": "Example TQL solutions",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/tql_examples.htm"
        }
      ],
      "questions": null
    },
    {
      "id": "workspace-maintenance",
      "unit": 19,
      "title": "Custom properties and workspace upkeep",
      "definitions": [
        {
          "term": "Property definition",
          "text": "A definition, created under the project root or a ComponentFolder, that adds a property of your own to an object type such as TestCase, Module or ExecutionList."
        },
        {
          "term": "Compacting",
          "text": "Deallocating unused storage in the local repository of a workspace, which reduces disk usage and can improve performance."
        },
        {
          "term": "Repository backup",
          "text": "A copy of the database behind a multi-user workspace. Restoring it into an existing repository overwrites the data there."
        }
      ],
      "simple": "Tosca lets you add your own fields to objects, for example a priority on every TestCase. And like any database, a workspace needs a little care: keep it small, compact it and back up the shared repository.",
      "body": [
        "To add a field, right-click the project root element and select Create property definition with the object type, for example TestCase. Under that definition, create a property with Create Property and rename it. A property can have a DefaultValue, a ValueRange of values separated by semicolons, and a ValueType such as string or date. The ValueType matters when you search with operators such as > or <.",
        "Each object shows its values in the Properties pane, and values that differ from the default are shown in bold. Properties marked invisible hold technical data. Because the values belong to the objects, TQL searches and virtual folders can use them, for example to collect every TestCase with a high priority.",
        "A local workspace works best at 3 to 5 GB. To see what takes the space, right-click the project root element and select Show distribution by object type. Compact the workspace to release unused storage, especially before working with large subsets. Back up the shared repository regularly. Restoring a backup into an existing repository overwrites its data and creates a new Common ID, so everyone has to create new workspaces afterwards."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "Adding a priority to every TestCase",
          "steps": [
            {
              "label": "Define",
              "text": "Project root: Create property definition for TestCase."
            },
            {
              "label": "Create",
              "text": "Create Property, rename it Priority."
            },
            {
              "label": "Restrict",
              "text": "ValueRange High;Medium;Low, DefaultValue Medium."
            },
            {
              "label": "Use",
              "text": "Set it per TestCase and search for it with TQL."
            }
          ]
        }
      ],
      "example": {
        "title": "Finding the high-priority TestCases",
        "intro": "Every TestCase now has a Priority property, and the regression suite should start with the important ones.",
        "code": [
          {
            "label": "ValueRange of the property",
            "code": "High;Medium;Low"
          },
          {
            "label": "TQL search from a TestCase folder",
            "code": "=>SUBPARTS:TestCase[Priority==\"High\"]"
          }
        ],
        "outcome": "The search lists every TestCase below the folder whose Priority is High, ready to be dragged into an ExecutionList."
      },
      "points": [
        "Create property definitions on the project root or a ComponentFolder.",
        "DefaultValue, ValueRange and ValueType shape a property.",
        "Keep a local workspace at 3 to 5 GB and compact it.",
        "Restoring a repository backup means creating new workspaces."
      ],
      "mistake": "Defining a date or a number property with the ValueType string. Searches with > or < then compare text instead of values and return the wrong objects.",
      "docs": [
        {
          "title": "Specify properties",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/specifiying_properties.htm"
        },
        {
          "title": "Tricentis Tosca FAQ",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/faq.htm"
        }
      ],
      "questions": "Multi-user workspaces"
    },
    {
      "id": "integrations",
      "unit": 20,
      "title": "Connecting Tosca to other tools",
      "definitions": [
        {
          "term": "Tosca Connect",
          "text": "An interface, based on Planview Hub (formerly Tasktop), that synchronises requirements and errors between Tosca and third-party tools such as Jira."
        },
        {
          "term": "Tosca REST API",
          "text": "A Tosca Server service through which other programs work with Tosca, for example to schedule tasks or download results."
        },
        {
          "term": "Notification Service",
          "text": "The Tosca Server service that provides the data interface for integrations such as qTest, SAP Solution Manager and Tosca dashboards."
        },
        {
          "term": "SAP Solution Manager integration",
          "text": "A connection, set up with a wizard in Tosca Commander, through which SAP Solution Manager and Tosca exchange data over an RFC interface."
        }
      ],
      "simple": "Tosca is rarely the only tool in a project. Stories live in Jira, test plans in qTest, pipelines in Azure DevOps or Jenkins, and SAP projects in Solution Manager. Integrations move information between them, so nobody types it twice.",
      "body": [
        "Tosca Connect links Tosca with requirement and agile tools such as Jira. User stories can arrive in Tosca as Requirements, and failed tests can travel back as defects for the developers. It runs on Planview Hub and needs the Tosca REST API Service on Tosca Server. Once a repository has been integrated, Tosca Connect needs a licence.",
        "Tricentis qTest is the test management tool built to work with Tosca: Tosca tests are linked to qTest releases, and their results appear in both tools. Pipelines in Jenkins, Azure DevOps and similar tools start Tosca runs through the Tosca CI client or the Execution API, as the lesson on CI/CD explains.",
        "For SAP projects, run the SAP Solution Manager wizard: check out the project root with Checkout Tree, then right-click it and select SAP Solution Manager, Configure SAP Solution Manager Integration. On Tosca Server, the Notification Service feeds integrations such as qTest, SAP Solution Manager and Tosca dashboards, and the REST API lets your own programs schedule tasks or download results."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "Tosca and its neighbours",
          "root": {
            "label": "Tosca",
            "text": "Requirements, TestCases and results",
            "children": [
              {
                "label": "Jira",
                "text": "Through Tosca Connect: stories in, defects out."
              },
              {
                "label": "qTest",
                "text": "Test plans with Tosca results."
              },
              {
                "label": "Jenkins, Azure DevOps",
                "text": "Start runs through the CI client."
              },
              {
                "label": "SAP Solution Manager",
                "text": "Connected with a wizard over RFC."
              },
              {
                "label": "Your own programs",
                "text": "Through the Tosca REST API."
              }
            ]
          }
        }
      ],
      "example": {
        "title": "From a Jira story to a defect",
        "intro": "A team plans in Jira and tests in Tosca, connected through Tosca Connect.",
        "grid": {
          "columns": [
            "Step",
            "Where",
            "What happens"
          ],
          "rows": [
            [
              "1",
              "Jira",
              "A user story 'Pay by card' is created."
            ],
            [
              "2",
              "Tosca Connect",
              "The story arrives in Tosca as a Requirement."
            ],
            [
              "3",
              "Tosca",
              "TestCases are linked to it and run in the regression suite."
            ],
            [
              "4",
              "Tosca Connect",
              "A failed test becomes a defect in Jira for the developers."
            ]
          ]
        }
      },
      "points": [
        "Tosca Connect synchronises requirements and defects with tools such as Jira.",
        "qTest shows Tosca results next to manual tests.",
        "CI tools start Tosca runs through the CI client or the Execution API.",
        "SAP Solution Manager is connected with a wizard from the project root."
      ],
      "mistake": "Connecting a repository to Tosca Connect just to try it out. Once a repository is integrated, Tosca Connect needs a licence, even if the integration is no longer used.",
      "docs": [
        {
          "title": "Tosca Connect",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_connect/connect.htm"
        },
        {
          "title": "Run the SAP Solution Manager Wizard",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/sap_solutionmanager/sap_solman_wizard.htm"
        },
        {
          "title": "Tosca and qTest integration",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/qtest_integration/qtest_integration_intro.htm"
        }
      ],
      "questions": "CI/CD integration"
    },
    {
      "id": "extending-tosca",
      "unit": 20,
      "title": "Extending Tosca with code",
      "definitions": [
        {
          "term": "TBox API",
          "text": "The programming interface of Tosca's automation engine. Developers use it to add functions to Tosca in C#."
        },
        {
          "term": "Special Execution Task (SET)",
          "text": "A C# class that implements one action and is linked to a Module, so that testers can use the action like any standard module."
        },
        {
          "term": "TC API",
          "text": "The programming interface of Tosca Commander. Programs use it to read and change the objects of a workspace."
        }
      ],
      "simple": "Tosca is used without programming, but it can be extended with it. When no standard module does what you need, a developer can write a small piece of C# that then appears in Tosca as a normal Module.",
      "body": [
        "The TBox API is the programming interface of Tosca's automation engine. The simplest extension is a Special Execution Task, SET for short: a C# class that carries out one action. Ready-made modules such as TBox Start Program are built this way.",
        "A SET is connected to a Module by two configuration parameters: Engine names your library, and SpecialExecutionTask names the task. Each ModuleAttribute that the code should receive is marked as a parameter. Testers then use the Module like any other, with values and ActionModes. After a new library has been copied to the machine, start a new instance of Tosca, because libraries are loaded only at start-up.",
        "The same API can change how Tosca steers a control, which helps with self-built controls that the standard engines do not operate well. For work on the project itself, and not on the application under test, there is the TC API: it lets a program read and change the objects of a workspace."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "From a need to a Module",
          "steps": [
            {
              "label": "Need",
              "text": "No standard module does the job."
            },
            {
              "label": "Code",
              "text": "A developer writes a C# class, the SET."
            },
            {
              "label": "Library",
              "text": "The built DLL is copied to the Tosca machines."
            },
            {
              "label": "Module",
              "text": "A Module points to it with Engine and SpecialExecutionTask."
            },
            {
              "label": "TestCase",
              "text": "Testers use it like any other Module."
            }
          ]
        }
      ],
      "example": {
        "title": "A module that reads a text file",
        "intro": "This follows the example in the TBox API manual: a task named MyFileReader with the parameters Path and Content.",
        "grid": {
          "columns": [
            "Where",
            "Name",
            "Value"
          ],
          "rows": [
            [
              "Module, configuration",
              "Engine",
              "MyNewEngine"
            ],
            [
              "Module, configuration",
              "SpecialExecutionTask",
              "MyFileReader"
            ],
            [
              "ModuleAttribute Path, configuration",
              "Parameter",
              "true"
            ],
            [
              "ModuleAttribute Content, configuration",
              "Parameter",
              "true"
            ]
          ]
        },
        "code": [
          {
            "label": "Outline of the C# class (the manual has the full code)",
            "code": "[SpecialExecutionTaskName(\"MyFileReader\")]\npublic class MyFileReader : SpecialExecutionTaskEnhanced\n{\n    // read the parameters Path and Content,\n    // write the file for ActionMode Input,\n    // or hand the file's text to Tosca for Verify and Buffer\n}"
          }
        ],
        "outcome": "In a TestCase, Path gets the file name with ActionMode Input, and Content can be entered, verified or buffered."
      },
      "points": [
        "The TBox API extends the automation engine with C#.",
        "A Special Execution Task is one action in code.",
        "Engine and SpecialExecutionTask connect a Module to it.",
        "The TC API works on the objects of a workspace."
      ],
      "mistake": "Writing code for something a standard module already does. Search the Standard subset first. Custom code has to be maintained, and installed on every machine that runs the tests.",
      "docs": [
        {
          "title": "TBox API documentation",
          "url": "https://documentation.tricentis.com/devcorner/2024.1/tboxapi/content/general/landing_page.htm"
        },
        {
          "title": "Implement a special execution task",
          "url": "https://documentation.tricentis.com/devcorner/2024.1/tboxapi/content/general/implement_set.htm"
        }
      ],
      "questions": null
    },
    {
      "id": "ai-in-tosca",
      "unit": 21,
      "title": "AI in Tosca: assistants and Vision AI",
      "definitions": [
        {
          "term": "Tosca Copilot",
          "text": "A generative-AI assistant in Tosca Commander, launched in June 2024, that explains TestCases, turns plain requests into TQL searches to find unused or duplicate assets, and interprets execution results."
        },
        {
          "term": "Tosca Agentic Test Automation",
          "text": "The AI assistant in newer Tosca versions, announced in July 2025, that also generates test cases from natural-language descriptions, besides searches, explanations, result insights and product help."
        },
        {
          "term": "Tosca MCP Server",
          "text": "An add-in that connects an AI assistant of your choice to Tosca through the Model Context Protocol, so it can create, organise, update and run test assets."
        },
        {
          "term": "Tricentis Vision AI",
          "text": "A technology that recognises controls on the screen with neural networks and heuristics, for user interfaces that expose no usable technical properties."
        }
      ],
      "simple": "AI helps in Tosca in two ways. Assistants answer questions and draft tests when you describe them in plain words. Vision AI looks at the screen the way a person does, so it can test applications Tosca otherwise cannot see into.",
      "body": [
        "The assistants work on your workspace. Ask in plain language, and they turn the request into a TQL search, explain what a long TestCase does, summarise the results of an ExecutionList or answer how-to questions. Agentic Test Automation can also generate a test case from a description; Tricentis first focused that on SAP Fiori. From Tosca 2026.1 it is part of the setup, and unattended installations add it with the ADDLOCAL argument.",
        "With Tosca 2026.1 patch 1 or later, the Tosca MCP Server lets an assistant you choose, such as Claude Code, Cursor or Visual Studio Code, work with your workspace through the Model Context Protocol. Whichever assistant you use, review what it produces. Generated steps and summaries can be wrong, and you remain responsible for the test.",
        "Vision AI solves a different problem. Some applications give Tosca no usable technical properties, for example when the screen arrives as a picture. Vision AI recognises text boxes, buttons and other controls from the image itself, works independently of the platform and can heal itself when the user interface changes. Table steering has limits, and the Run VisionScript module can fill gaps between TestSteps. Vision AI also supports mobile automation."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "An assistant or Vision AI?",
          "columns": [
            {
              "title": "AI assistants",
              "points": [
                "Work on your workspace: TestCases, logs, TQL.",
                "Explain, search, summarise and generate.",
                "Every result needs a human review."
              ]
            },
            {
              "title": "Vision AI",
              "points": [
                "Works on the screen image.",
                "Finds controls without technical properties.",
                "Self-healing; tables have limits."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "Questions for an assistant",
        "intro": "A tester joins a project with two thousand TestCases.",
        "grid": {
          "columns": [
            "The tester asks",
            "The assistant gives"
          ],
          "rows": [
            [
              "Which TestCases are in no ExecutionList?",
              "A TQL search string that lists them"
            ],
            [
              "What does TC_Checkout_PayByCard do?",
              "A plain-language summary of its steps"
            ],
            [
              "Why did last night's regression fail?",
              "A summary of the failed entries and their messages"
            ],
            [
              "Create a test that creates a sales order in Fiori",
              "A draft test case to review and complete"
            ]
          ]
        }
      },
      "points": [
        "Tosca Copilot (2024) explains tests, finds assets and interprets results.",
        "Agentic Test Automation adds test generation from plain language.",
        "The MCP Server connects your own AI assistant to Tosca.",
        "Vision AI finds controls in the screen image itself."
      ],
      "mistake": "Running a generated test case without reading it. AI output can miss checks or test the wrong thing, so review it as you would a colleague's work.",
      "docs": [
        {
          "title": "Tosca Agentic Test Automation",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/agentic_ai/landing_page.htm"
        },
        {
          "title": "Model Context Protocol integration",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/mcp/overview.htm"
        },
        {
          "title": "Tricentis Vision AI",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/vision_ai/vision_ai_introduction.htm"
        }
      ],
      "questions": null
    },
    {
      "id": "cloud-execution",
      "unit": 21,
      "title": "Running in the cloud: Elastic Execution Grid",
      "definitions": [
        {
          "term": "Elastic Execution Grid",
          "text": "The test execution service of Tosca Cloud. It distributes runs to agents, as Distributed Execution does on-premises, and is hosted by Tricentis."
        },
        {
          "term": "Agent",
          "text": "A machine that executes tests for the grid: a personal agent (your own PC), a team agent (a machine your team owns) or a cloud agent (hosted by Tricentis)."
        },
        {
          "term": "Playlist",
          "text": "In Tosca Cloud, a collection of tests that is run together."
        },
        {
          "term": "Characteristic",
          "text": "A label on a playlist and on agents. A playlist is sent only to agents whose characteristics match."
        }
      ],
      "simple": "The Elastic Execution Grid is the part of Tosca Cloud that runs tests. It does the same job as Distributed Execution, but Tricentis hosts the service, so your team has no execution server to look after.",
      "body": [
        "Tests run on agents, and there are three kinds. A personal agent is your own machine, for local runs while you build. A team agent is installed on a machine that your team owns and can run tests unattended. A cloud agent is hosted and maintained by Tricentis.",
        "Cloud agents have only standard Windows applications and web browsers installed, so they suit web tests. A test that needs SAP GUI, a desktop program or special files needs a team agent on which that software is installed.",
        "In Tosca Cloud, the tests to run are collected in a playlist. Labels called characteristics decide which agents may take a playlist. A team that works on-premises can keep its tests in Tosca Commander and send only the execution to the cloud. A pipeline can start a playlist run through the Tosca Cloud API and collect the results in JUnit format."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Three kinds of agent",
          "columns": [
            {
              "title": "Personal agent",
              "points": [
                "Your own machine.",
                "For local runs while building.",
                "You see the test run."
              ]
            },
            {
              "title": "Team agent",
              "points": [
                "A machine your team owns.",
                "Runs unattended.",
                "Has whatever software you install on it."
              ]
            },
            {
              "title": "Cloud agent",
              "points": [
                "Hosted and maintained by Tricentis.",
                "Standard Windows applications and browsers only.",
                "Best for web tests."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "Which agent runs it?",
        "intro": "Three playlists with different needs.",
        "grid": {
          "columns": [
            "Playlist",
            "Needs",
            "Runs on"
          ],
          "rows": [
            [
              "Web shop regression",
              "Chrome or Edge only",
              "Cloud agent"
            ],
            [
              "SAP order to cash",
              "SAP GUI installed",
              "Team agent with SAP GUI"
            ],
            [
              "A test you are still building",
              "Your own screen",
              "Personal agent"
            ]
          ]
        },
        "code": [
          {
            "label": "Characteristic on a playlist that should run on cloud agents only",
            "code": "Agent-type=Cloud-agent"
          }
        ]
      },
      "points": [
        "The Elastic Execution Grid is execution in Tosca Cloud.",
        "Agents: personal, team and cloud.",
        "Cloud agents suit web tests.",
        "Characteristics route a playlist to the right agents."
      ],
      "mistake": "Sending a test to a cloud agent when it needs software the agent does not have. It fails at the first step that looks for the missing application.",
      "docs": [
        {
          "title": "Tosca Cloud integration",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/cloud_integration/cloud_integration_overview.htm"
        },
        {
          "title": "Use cloud agents",
          "url": "https://docs.tricentis.com/tosca-cloud/en-us/content/admin_guide/agents_cloud.htm"
        },
        {
          "title": "Transition from DEX to the Elastic Execution Grid",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/cloud_integration/migrate_dex_e2g.htm"
        }
      ],
      "questions": "Execution lists and DEX"
    },
    {
      "id": "livecompare-and-optimization",
      "unit": 21,
      "title": "LiveCompare and test portfolio optimisation",
      "definitions": [
        {
          "term": "Tricentis LiveCompare",
          "text": "An SAP analysis tool that assesses the impact of changes in an SAP environment and recommends a minimal set of most-at-risk objects for testing."
        },
        {
          "term": "Most-at-risk object",
          "text": "An SAP object affected by a change that LiveCompare recommends for testing."
        },
        {
          "term": "Test hit and test gap",
          "text": "A hit is a most-at-risk object with at least one matching test in the Test Repository. A gap is a most-at-risk object with no matching test."
        },
        {
          "term": "Test portfolio optimisation",
          "text": "Reviewing the whole set of tests to remove unused, duplicate or unlinked assets, so the suite stays small and focused on risk."
        }
      ],
      "simple": "When SAP changes, testing everything takes too long. LiveCompare works out what the change actually touches, and shows which of those parts already have Tosca tests and which have none.",
      "body": [
        "LiveCompare runs on a Windows server and connects to your SAP systems. When changes move on, for example from development to QA, its Smart Impact analysis finds the objects the change affects and narrows them down to a minimal set of most-at-risk objects.",
        "With Tosca connected as its Test Repository, LiveCompare matches those objects with your tests. Hits are objects with at least one matching test; gaps are objects without one, where a new test is needed. A LiveCompare pipeline can create and run test runs for the hits, so only the relevant tests run.",
        "The same thinking applies to the whole portfolio. Tests pile up over the years: some never run, some duplicate others, some cover no requirement. Find them with TQL searches or an AI assistant, remove or merge them, and keep the regression suite focused on the requirements with the highest risk."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "From an SAP change to targeted tests",
          "steps": [
            {
              "label": "Change",
              "text": "A transport moves from development to QA."
            },
            {
              "label": "Analyse",
              "text": "Smart Impact finds the affected objects."
            },
            {
              "label": "Narrow",
              "text": "A minimal set of most-at-risk objects."
            },
            {
              "label": "Match",
              "text": "Hits and gaps against the Tosca tests."
            },
            {
              "label": "Act",
              "text": "Run the tests for the hits; write tests for the gaps."
            }
          ]
        }
      ],
      "example": {
        "title": "After a support pack",
        "intro": "An SAP support pack moves to QA, and LiveCompare reports the following (the numbers are illustrative).",
        "grid": {
          "columns": [
            "Result",
            "Count",
            "What the team does"
          ],
          "rows": [
            [
              "Most-at-risk objects",
              "40",
              "These are what must be tested"
            ],
            [
              "Hits",
              "34",
              "Run the matching Tosca tests"
            ],
            [
              "Gaps",
              "6",
              "Write new tests for these objects"
            ]
          ]
        },
        "outcome": "Instead of the full regression suite, the team runs the tests for 34 objects and closes 6 gaps."
      },
      "points": [
        "LiveCompare analyses the impact of SAP changes.",
        "It recommends a minimal set of most-at-risk objects.",
        "Hits have matching tests; gaps need new ones.",
        "Prune unused and duplicate tests regularly."
      ],
      "mistake": "Reading the gaps as safe because nothing failed there. A gap means the changed object has no test at all, so nothing could have failed.",
      "docs": [
        {
          "title": "Welcome to LiveCompare",
          "url": "https://docs.tricentis.com/livecompare-2025.2/content/welcome_to_livecompare.htm"
        },
        {
          "title": "Smart Impact Analysis",
          "url": "https://docs.tricentis.com/livecompare-2025.2/content/templates/impact%20analysis/smart_impact_analysis.htm"
        },
        {
          "title": "LiveCompare: integrations with testing tools",
          "url": "https://docs.tricentis.com/livecompare-2026.1/content/operating_model/integrations_testing_tools.htm"
        }
      ],
      "questions": "SAP testing"
    },
    {
      "id": "naming-and-structure",
      "unit": 22,
      "title": "Naming conventions and project structure",
      "definitions": [
        {
          "term": "Naming convention",
          "text": "An agreed set of rules for naming objects, so that the purpose and the place of an object are clear from its name."
        },
        {
          "term": "Project structure",
          "text": "The agreed arrangement of folders in each section of the workspace, for example by application, area and business process."
        }
      ],
      "simple": "A project is easy to work in when everyone can guess from a name where a thing is and what it does. A few simple rules for names and folders give you that.",
      "body": [
        "Modules: Tosca names a Module after the title of the window. Rename it when several screens share a title, or when the title contains something specific such as an order number. Do this while you scan, not afterwards. ModuleAttributes are named after the label of the control; rename the ones that have no good label.",
        "TestCases need a unique name that states their purpose, with the application name in front if you test several applications. A TestStep should say what happens at this point: 'Log in as customer' tells more than the Module name 'Login page'. Inside a larger TestCase, group the steps into the folders Precondition, Process and Postcondition.",
        "Folders: build the Modules tree like the application: first the application, then the area, then the screen or process. Build the TestCases tree by business process, or copy the structure of the Requirements section if you use it. Keep folder names short, and avoid categories that overlap, so that nobody has to guess between two places."
      ],
      "graphics": [
        {
          "type": "tree",
          "title": "A Modules folder that mirrors the application",
          "root": {
            "label": "WebShop (WS)",
            "text": "Application name and short form",
            "children": [
              {
                "label": "Account",
                "text": "Login, registration, profile"
              },
              {
                "label": "Catalogue",
                "text": "Search, product page"
              },
              {
                "label": "Checkout",
                "text": "Cart, payment, confirmation"
              }
            ]
          }
        }
      ],
      "example": {
        "title": "Names before and after",
        "intro": "The same four objects, named carelessly and named well.",
        "grid": {
          "columns": [
            "Object",
            "Hard to work with",
            "Better"
          ],
          "rows": [
            [
              "Module",
              "Home (2)",
              "WS | Checkout | Payment form"
            ],
            [
              "ModuleAttribute",
              "textbox_17",
              "Card holder name"
            ],
            [
              "TestCase",
              "Test1_new_final",
              "WS Checkout: pay by card with a discount code"
            ],
            [
              "TestStep",
              "Login page",
              "Log in as registered customer"
            ]
          ]
        }
      },
      "points": [
        "Rename Modules while scanning.",
        "TestCase names state the purpose; TestStep names state the action.",
        "Folders mirror the application or the business process.",
        "Precondition, Process, Postcondition inside a TestCase."
      ],
      "mistake": "Agreeing on rules when the project already has a thousand objects. Renaming later is possible, but nobody finds the time. Decide in the first week.",
      "docs": [
        {
          "title": "Best practices: overview",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/best_practices/best_practices_overview.htm"
        },
        {
          "title": "Best practices: project folders",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/best_practices/project_folders.htm"
        },
        {
          "title": "Best practices: TestCase structure",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/best_practices/testcases_structure.htm"
        }
      ],
      "questions": "TestCase design"
    },
    {
      "id": "framework-best-practices",
      "unit": 22,
      "title": "Stable, fast and reviewable tests",
      "definitions": [
        {
          "term": "Flaky test",
          "text": "A test that sometimes passes and sometimes fails without any change to the application or to the test."
        },
        {
          "term": "Dynamic wait",
          "text": "A wait that ends as soon as the application reaches a state, such as WaitOn on a progress bar."
        },
        {
          "term": "Static wait",
          "text": "A pause of fixed length, such as TBox Wait or the WaitBefore and WaitAfter steering parameters, that lasts whether it is needed or not."
        },
        {
          "term": "Automation metric",
          "text": "A measure of the health of a test suite, such as the share of requirement risk that is automated, the pass rate or the time spent repairing tests."
        }
      ],
      "simple": "A good test gives the same answer every time, finishes quickly and is easy for someone else to read. Most problems come from waiting badly, sharing data and copying steps.",
      "body": [
        "Flaky tests usually have three causes: timing, shared data and weak identification. By default, Tosca waits up to 10 seconds for a screen or control (the Synchronization Timeout) and 20 seconds for WaitOn. Handle a slow application in this order: a longer default timeout for an environment that is slow everywhere, dynamic waits with WaitOn, and static waits only when nothing else works. If you need a static wait, WaitBefore or WaitAfter on the ModuleAttribute is easier to maintain than TBox Wait in every TestCase.",
        "Try each new TestCase in the ScratchBook before it goes into an ExecutionList, so the results record stays clean. Turn on screenshots for failed steps and start every analysis at the LogInfo of the first failed step. Avoid copy and paste: use repetitions within a TestCase and Reusable TestStepBlocks across TestCases, but only for steps you really reuse, and keep separate libraries per application so teams do not lock each other out.",
        "Speed and trust come from structure. Prepare data through APIs or Test Data Service instead of long UI flows, run suites in parallel, and review each new TestCase against a short checklist before checkin. Track a few metrics over time: the share of requirement risk that is automated, the pass rate, and the time spent repairing tests after each release."
      ],
      "graphics": [
        {
          "type": "stack",
          "title": "How to wait, best option first",
          "layers": [
            {
              "label": "Longer Synchronization Timeout",
              "text": "For an environment that is slow everywhere."
            },
            {
              "label": "WaitOn",
              "text": "Waits for a state and continues at once."
            },
            {
              "label": "WaitBefore or WaitAfter",
              "text": "A static wait kept in the Module."
            },
            {
              "label": "TBox Wait",
              "text": "A static wait in each TestCase: the last resort."
            }
          ]
        }
      ],
      "example": {
        "title": "A review checklist",
        "intro": "Before a new TestCase is checked in, a colleague goes through these points.",
        "grid": {
          "columns": [
            "Check",
            "Why"
          ],
          "rows": [
            [
              "Names follow the conventions",
              "Others can find and understand it"
            ],
            [
              "Shared steps come from the library",
              "One change repairs every test"
            ],
            [
              "No static wait without a reason",
              "Static waits slow down every run"
            ],
            [
              "Steps that act are followed by checks",
              "A test that only clicks proves little"
            ],
            [
              "URLs and users come from TCPs",
              "The test runs in every environment"
            ],
            [
              "It passed in the ScratchBook",
              "The ExecutionList record stays clean"
            ]
          ]
        }
      },
      "points": [
        "Flaky tests come from timing, shared data and weak identification.",
        "Default waits: 10 seconds for screens and controls, 20 seconds for WaitOn.",
        "Try in the ScratchBook first; analyse from the first failed step.",
        "Reuse only what you really reuse, and keep libraries separate."
      ],
      "mistake": "Raising a timeout to make a failure go away. If the application should be fast, a timeout is a real finding: leave the test as it is and report it.",
      "docs": [
        {
          "title": "Best practices: wait times",
          "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/best_practices/testcases_wait_times.htm"
        },
        {
          "title": "Best practices: trial runs",
          "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/best_practices/testcases_trial_runs.htm"
        },
        {
          "title": "Best practices: repetitions and reuse",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/best_practices/testcases_repetitions_and_reuse.htm"
        }
      ],
      "questions": "TestCase design"
    },
    {
      "id": "debugging-and-troubleshooting",
      "unit": 23,
      "title": "Debugging and troubleshooting",
      "definitions": [
        {
          "term": "Buffer Viewer",
          "text": "A side panel, opened from the Tools menu of Tosca Commander, that lists all Buffers with their values and lets you search, add, edit and delete them."
        },
        {
          "term": "Log Viewer",
          "text": "A separate program, LogViewer.exe, that shows Tosca's log events during execution, with a search, filters and the log levels error, warn, info and all."
        },
        {
          "term": "LogInfo",
          "text": "The column of an execution log that holds the message Tosca wrote for a step, such as the reason it failed."
        },
        {
          "term": "Root cause",
          "text": "The first thing that went wrong in a run, as opposed to the failures that follow from it."
        }
      ],
      "simple": "When a test fails, the first red line is your best clue. Read what Tosca says there, check the values it used, and decide whether the application, the test, the data or the environment is to blame.",
      "body": [
        "Start in the ScratchBook result or the TestCaseLog: expand the first failed TestStep and read its LogInfo. Most failures fall into a few groups. A control is not found, or more than one is found: check the Module's identification and look for an unexpected pop-up. A timeout: the application was slower than the wait. A verification failure: make sure the right control was checked, then decide whether the test or the application is wrong.",
        "Many failures come from a Buffer that is empty or still holds an old value. Open Tools, Buffer Viewer to see every Buffer with its value. You can also set a value there to try a single step, and delete stale Buffers left over from an earlier run.",
        "When the execution log is not enough, use the Log Viewer: start LogViewer.exe from %COMMANDER_HOME% and choose a log level, from error up to all. Log files are written to %LOCALAPPDATA%\\TRICENTIS\\TOSCA TestSuite\\logs and deleted automatically after three weeks."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "From red to fixed",
          "steps": [
            {
              "label": "Reproduce",
              "text": "Run the TestCase again in the ScratchBook."
            },
            {
              "label": "Locate",
              "text": "Find the first failed step and read its LogInfo."
            },
            {
              "label": "Inspect",
              "text": "Screenshot, Buffer Viewer, Log Viewer."
            },
            {
              "label": "Classify",
              "text": "Application, test, data or environment?"
            },
            {
              "label": "Fix and rerun",
              "text": "Then run the related tests too."
            }
          ]
        }
      ],
      "example": {
        "title": "The real cause comes first",
        "intro": "A run stops at 'Search order', but that is not the first red line.",
        "grid": {
          "columns": [
            "Where you look",
            "What you see",
            "Conclusion"
          ],
          "rows": [
            [
              "TestCaseLog",
              "Two failed steps: 'Confirmation message', then 'Search order'",
              "Start with the first one"
            ],
            [
              "LogInfo of 'Confirmation message'",
              "Expected 'Order {XB[OrderNo]} created', found 'Order no. 48213 created'",
              "The message text has changed"
            ],
            [
              "Buffer Viewer",
              "OrderNo is empty",
              "So the search had nothing to look for"
            ]
          ]
        },
        "outcome": "Change the expected text to 'Order no. {XB[OrderNo]} created', and the search step works again without any change of its own."
      },
      "points": [
        "Start at the first failed step and read its LogInfo.",
        "Tools, Buffer Viewer shows every Buffer and its value.",
        "LogViewer.exe shows detailed log events; log files are kept for three weeks.",
        "Classify the cause: application, test, data or environment."
      ],
      "mistake": "Fixing the last red step. Later failures usually follow from the first one, so fixing them wastes time and hides the real cause.",
      "docs": [
        {
          "title": "Use the Buffer Viewer",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/buffer_viewer.htm"
        },
        {
          "title": "Log Viewer",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tbox/execution_logging.htm"
        },
        {
          "title": "Best practices: trial runs",
          "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/best_practices/testcases_trial_runs.htm"
        }
      ],
      "questions": "TBox"
    },
    {
      "id": "exploratory-testing",
      "unit": 24,
      "title": "Exploratory testing in Tosca",
      "definitions": [
        {
          "term": "Exploratory testing",
          "text": "A plan-as-you-test approach in which the tester learns the product, designs and runs tests and interprets the results at the same time, with a focus on risks and unknowns."
        },
        {
          "term": "Session and charter",
          "text": "A session is a planned piece of exploration with a starting point; its charter describes the goals and agenda of the session."
        },
        {
          "term": "Scenario",
          "text": "The record of what a tester did, kept as TestSteps and TestStepValues with annotated screenshots, and optionally videos."
        },
        {
          "term": "Exploratory Testing Agent",
          "text": "A stand-alone program with which testers join a session through a link, without installing Tosca Commander."
        }
      ],
      "simple": "Scripted tests check what someone thought of in advance. Exploratory testing is a guided hunt for what nobody thought of. Tosca records the hunt, so that a bug, once found, can become a test.",
      "body": [
        "In session-based testing, a session owner sets up sessions in Tosca Commander, gives each a charter and assigns testers. Testers work in Tosca Commander, or through the link in their invitation e-mail in the stand-alone Exploratory Testing Agent. They can pause and resume, and when they finish they upload their results to the Exploratory Testing Server, from which the owner imports them into Tosca Commander.",
        "While a tester explores, Tosca records every mouse and keyboard interaction, whatever the technology. Each interaction becomes a TestStep and a TestStepValue with a design screenshot, annotated to show what happened. Recording starts from Exploratory Scenario on the Home menu, and to save memory it can keep only the most recent steps, for example the last 100.",
        "A finding is only useful if it is not lost. Manual TestCases can be generated from the recorded scenarios, so the path to a bug can be repeated, automated and added to the regression suite. The Exploratory Testing Server is a Tosca Server feature that must be installed and enabled, and invitations need e-mail to be configured."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "A session, from charter to test",
          "steps": [
            {
              "label": "Plan",
              "text": "The owner writes the charter and assigns testers."
            },
            {
              "label": "Explore",
              "text": "Testers follow the charter while Tosca records."
            },
            {
              "label": "Upload",
              "text": "Results go to the Exploratory Testing Server."
            },
            {
              "label": "Import",
              "text": "The owner imports them into Tosca Commander."
            },
            {
              "label": "Keep",
              "text": "Generate manual TestCases from the scenarios."
            }
          ]
        }
      ],
      "example": {
        "title": "A coupon session",
        "intro": "A web shop has just added discount coupons.",
        "grid": {
          "columns": [
            "Part",
            "Content"
          ],
          "rows": [
            [
              "Charter",
              "Explore the coupon field at checkout. Look for wrong totals."
            ],
            [
              "Scenario",
              "Two coupons applied one after the other give a negative total."
            ],
            [
              "Evidence",
              "Annotated screenshots of every step"
            ],
            [
              "Afterwards",
              "A manual TestCase generated from the scenario, later automated for regression"
            ]
          ]
        }
      },
      "points": [
        "Each session has a charter: its goals and agenda.",
        "Every interaction is recorded with an annotated screenshot.",
        "Testers can join through the stand-alone Exploratory Testing Agent.",
        "Recorded scenarios can become manual TestCases."
      ],
      "mistake": "Exploring without a charter. Without a goal, sessions wander, and nobody can tell afterwards what was covered.",
      "docs": [
        {
          "title": "Exploratory Testing",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/exploratory_testing.htm"
        },
        {
          "title": "Record interactions",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/capture_interactions.htm"
        },
        {
          "title": "Perform standalone testing",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/xta_stand_alone.htm"
        }
      ],
      "questions": null
    },
    {
      "id": "performance-with-neoload",
      "unit": 25,
      "title": "Performance testing with NeoLoad",
      "definitions": [
        {
          "term": "Performance testing",
          "text": "Testing how fast and how reliably an application responds under a defined load."
        },
        {
          "term": "Load",
          "text": "The number of users or requests that an application has to handle at the same time. A load test simulates it with virtual users."
        },
        {
          "term": "NeoLoad",
          "text": "The performance testing tool from Tricentis."
        },
        {
          "term": "User Path",
          "text": "In NeoLoad, the sequence of requests that one virtual user sends."
        }
      ],
      "simple": "A functional test asks 'does it work?'. A performance test asks 'does it still work, and fast enough, when a thousand people use it at once?'. Tosca answers the first question, and Tricentis NeoLoad answers the second.",
      "body": [
        "Tosca runs a test as one user. That proves the function is correct, but says nothing about speed under load. NeoLoad simulates many virtual users at the same time and measures response times and errors.",
        "A NeoLoad test is built from User Paths: the sequence of requests that one user sends. You do not have to record them again from nothing. The NeoLoad Add-on for Tosca converts a Tosca TestCase into a NeoLoad User Path. The NeoLoad manual describes this for Web, API and SAP GUI TestCases.",
        "In Tosca you right-click an execution of the TestCase and choose the transfer from the NeoLoad Add-on menu. NeoLoad records the traffic while the test runs from start to end. When the application changes, you repair the Tosca TestCase and update the User Path from it, so the functional test and the performance test stay in step."
      ],
      "graphics": [
        {
          "type": "compare",
          "title": "Two questions, two tools",
          "columns": [
            {
              "title": "Functional test (Tosca)",
              "points": [
                "One user.",
                "Checks that the result is correct.",
                "Ends with passed or failed."
              ]
            },
            {
              "title": "Performance test (NeoLoad)",
              "points": [
                "Many virtual users at once.",
                "Measures response times and errors under load.",
                "Ends with numbers to compare with a target."
              ]
            }
          ]
        }
      ],
      "example": {
        "title": "One scenario, tested twice",
        "intro": "The checkout of a web shop.",
        "grid": {
          "columns": [
            "",
            "In Tosca",
            "In NeoLoad"
          ],
          "rows": [
            [
              "Scenario",
              "Search a product and pay",
              "The same steps, as a User Path"
            ],
            [
              "Users",
              "1",
              "500 at the same time"
            ],
            [
              "What is checked",
              "The order confirmation is shown",
              "Response time and error rate"
            ],
            [
              "A typical finding",
              "The total is wrong",
              "Payment takes six seconds at 500 users"
            ]
          ]
        }
      },
      "points": [
        "Tosca checks correctness; NeoLoad checks behaviour under load.",
        "A User Path is one user's sequence of requests.",
        "The NeoLoad Add-on converts a Tosca TestCase into a User Path.",
        "Repair once in Tosca, then update the User Path."
      ],
      "mistake": "Running a load test against a shared test environment without telling anyone. Other teams' tests slow down or fail, and nobody knows why.",
      "docs": [
        {
          "title": "Convert a Tosca Web or API script to a NeoLoad User Path",
          "url": "https://documentation.tricentis.com/neoload/8.2/en/WebHelp/41108.htm"
        }
      ],
      "questions": null
    },
    {
      "id": "data-integrity",
      "unit": 25,
      "title": "Data integrity testing",
      "definitions": [
        {
          "term": "Data integrity testing",
          "text": "Testing that data is complete and correct after it has been stored, moved or transformed, by checking the data itself in files and databases."
        },
        {
          "term": "Pre-screening",
          "text": "A test that verifies a file before it is loaded into another system."
        },
        {
          "term": "Vital check",
          "text": "A test that verifies data which was copied or moved from one layer of a system to the next."
        },
        {
          "term": "Reconciliation",
          "text": "A complete row by row comparison of two datasets in two separate systems."
        },
        {
          "term": "Row Key",
          "text": "The column, or combination of columns, that identifies a row uniquely. Source and target rows are matched by it."
        }
      ],
      "simple": "Data integrity testing checks data, not screens. When data is copied from one system to another, for example into a data warehouse, it confirms that nothing was lost or changed on the way.",
      "body": [
        "Companies move large amounts of data between systems, often every night. A screen test cannot check millions of rows. Tricentis Data Integrity, which is part of Tosca, compares the data itself, directly in files and databases.",
        "There are three main kinds of test. Pre-screening verifies a file before it is loaded into another system. Vital checks verify data that was copied or moved from one layer to the next. Reconciliation is the most thorough: a complete row by row comparison of two datasets in two separate systems.",
        "For a row by row comparison you name a Row Key: the column or columns that identify a row, such as the customer number. Tosca takes each source row, looks for the target row with the same key and compares the remaining columns. It reports rows that are missing, and rows whose key matches but whose data differs. Sorting both sides in the same way makes the comparison faster and saves memory."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "Three kinds of test, from first look to full comparison",
          "steps": [
            {
              "label": "Pre-screening",
              "text": "Is the incoming file fit to be loaded?"
            },
            {
              "label": "Vital checks",
              "text": "Did the data arrive in the next layer?"
            },
            {
              "label": "Reconciliation",
              "text": "Is every row the same in source and target?"
            }
          ]
        }
      ],
      "example": {
        "title": "Reconciliation with the Row Key CustomerNo",
        "intro": "Three customers in the source system, compared with the data warehouse.",
        "grid": {
          "columns": [
            "CustomerNo",
            "Source: City",
            "Target: City",
            "Result"
          ],
          "rows": [
            [
              "1001",
              "Berlin",
              "Berlin",
              "Match"
            ],
            [
              "1002",
              "Vienna",
              "Wien",
              "Error: the key matches, the data differs"
            ],
            [
              "1003",
              "Paris",
              "(no row)",
              "Error: missing in the target"
            ]
          ]
        },
        "outcome": "Two of the three rows are reported. The setting Max Errors stops the comparison after a number of errors, 100 by default."
      },
      "points": [
        "Data integrity tests compare data directly.",
        "Pre-screening, vital checks, reconciliation.",
        "The Row Key pairs source rows with target rows.",
        "Sort both sides the same way for speed."
      ],
      "mistake": "Typing the Row Key column name slightly differently from the table. It must match exactly, including capital letters and spaces.",
      "docs": [
        {
          "title": "Data Integrity Reconciliation testing",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/data_integrity/di_reconciliation.htm"
        },
        {
          "title": "Use Data Integrity Modules",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/data_integrity/di_modules.htm"
        },
        {
          "title": "Create tests with Wizards",
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/data_integrity/di_wizards.htm"
        }
      ],
      "questions": null
    },
    {
      "id": "upgrades-and-migration",
      "unit": 26,
      "title": "Upgrading Tosca",
      "definitions": [
        {
          "term": "LTS release",
          "text": "A long-term support release of Tosca, such as 2026.1 LTS, with defined versions from which an upgrade is supported."
        },
        {
          "term": "Schema migration",
          "text": "Updating the structure of the repository database to a new Tosca version. It cannot be reverted except by restoring a backup."
        },
        {
          "term": "XEngine migration",
          "text": "Updating the Standard subset Modules, and the TestCases that use them, to a new Tosca version."
        }
      ],
      "simple": "Upgrading Tosca is like a team moving office: pick a quiet moment, have everyone put their work away, keep a backup, move, then check that everything still works.",
      "body": [
        "Tosca 2026.1 LTS supports upgrades from 2025.1, and with extended support from 2024.2, 2024.1 and 2023.2. Install and test the new version in a staging environment with its own test database first, because different Tosca versions should not commit to the same repository. Then plan downtime: testers finish their tasks, check in and close their workspaces, and scheduled runs are suspended.",
        "Upgrade Tosca Commander first, then Tosca Server and Tosca Extensions if you use them. Before you start, back up the configuration files in %COMMANDER_HOME%, your customizations and the repositories; settings from the Settings dialog are kept. Uninstall the old version, install the new one, recompile customizations, install the browser extensions if needed, and merge your old configuration from the ConfigBackup folder into the new files instead of overwriting them.",
        "The repository schema has not changed since Tosca 12.3, and from 2024.1 onwards no XEngine migration is needed either. Older projects may need one or both. A single-user workspace is migrated the first time it is opened; a multi-user repository is migrated by hand or with the Tosca Administration Console, after a database backup, because a migration cannot be undone. Finally, read Changes and deprecations: in 2026.1, for example, branches can no longer be created and DEX is not enabled by default in new installations."
      ],
      "graphics": [
        {
          "type": "flow",
          "title": "An upgrade, step by step",
          "steps": [
            {
              "label": "Stage",
              "text": "Test the new version with a test database."
            },
            {
              "label": "Freeze",
              "text": "Everyone checks in; runs are paused."
            },
            {
              "label": "Back up",
              "text": "Configurations, customizations, repositories."
            },
            {
              "label": "Upgrade",
              "text": "Commander, then Server and Extensions."
            },
            {
              "label": "Check",
              "text": "Read the changes and run a smoke suite."
            }
          ]
        }
      ],
      "example": {
        "title": "Before you start",
        "intro": "A short checklist for a move from 2025.1 to 2026.1 LTS.",
        "grid": {
          "columns": [
            "Check",
            "Why"
          ],
          "rows": [
            [
              "The upgrade path is supported",
              "Older versions need extra steps"
            ],
            [
              "The new version was tested in staging",
              "Two versions must not share one repository"
            ],
            [
              "Everyone has checked in and logged off",
              "Migrations work on the repository version and discard checked-out changes"
            ],
            [
              "Configurations, customizations and databases are backed up",
              "A migration cannot be reverted"
            ],
            [
              "Changes and deprecations have been read",
              "Features you use may have changed"
            ]
          ]
        }
      },
      "points": [
        "2026.1 LTS: upgrade from 2025.1, or with extended support from 2024.2, 2024.1 and 2023.2.",
        "Test in staging first, and never let two versions share a repository.",
        "Back up first: migrations cannot be undone.",
        "Read Changes and deprecations after every upgrade."
      ],
      "mistake": "Upgrading while colleagues still have objects checked out. A migration works on the repository version, so their local changes are lost.",
      "docs": [
        {
          "title": "Upgrade to 2026.1 LTS",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/upgrade/upgrade_overview.htm"
        },
        {
          "title": "Schema migrations",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/upgrade/upgrade_schema_migration.htm"
        },
        {
          "title": "Changes and deprecations",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/upgrade/upgrade_changes.htm"
        }
      ],
      "questions": "Multi-user workspaces"
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
          "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/tosca_commander/reusable_teststepblocks.htm"
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
          "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/modules_properties.htm"
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
    },
    {
      "title": "TQL searches",
      "docs": [
        {
          "title": "TQL - Step by step",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/tql_step_by_step.htm"
        },
        {
          "title": "Operators and Functions",
          "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/tql_operators.htm"
        }
      ],
      "items": [
        [
          "->SUBPARTS",
          "The objects directly inside the current object (one level)."
        ],
        [
          "=>SUBPARTS",
          "All objects below the current object, at every level."
        ],
        [
          "=>SUBPARTS:TestCase",
          "Only objects of the type TestCase."
        ],
        [
          "=>SUBPARTS:TestCase[Name==\"Test001\"]",
          "TestCases with exactly this name."
        ],
        [
          "=>SUBPARTS:TestCase[Name=?\"Login\"]",
          "TestCases whose name contains Login."
        ],
        [
          "=>SUBPARTS:TestCase[TestCaseWorkState!=\"COMPLETED\"]",
          "TestCases that are not finished."
        ],
        [
          "->SUPERPART",
          "One step up, to the object that contains the current one."
        ]
      ]
    },
    {
      "title": "TC-Shell",
      "docs": [
        {
          "title": "Use TC-Shell commands",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/tcshell_commands.htm"
        },
        {
          "title": "Working in script mode",
          "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/script_mode.htm"
        }
      ],
      "items": [
        [
          "updateall",
          "Bring the workspace up to date with the common repository."
        ],
        [
          "checkinall",
          "Check in everything you have checked out."
        ],
        [
          "JumpToNode \"/path/to/object\"",
          "Make the object at this path the current object."
        ],
        [
          "task",
          "List the tasks of the current object. With a name or number: run that task."
        ],
        [
          "save",
          "Save all changes."
        ],
        [
          "// comment",
          "A comment line in a script file."
        ],
        [
          "help",
          "List the possible commands."
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
      "term": "Branch",
      "simple": "A separate line of the same project for parallel work.",
      "detail": "Created by an administrator from the project root. The main line is the master branch. From Tosca 2025.1 merging branches is switched off by default.",
      "topic": "Multi-user workspaces"
    },
    {
      "term": "Buffer",
      "simple": "A named value that Tosca remembers during a run.",
      "detail": "Write it with ActionMode Buffer (the value is the Buffer name) or TBox Set Buffer. Read it with {B[Name]}. Check stored values in the Buffer viewer.",
      "topic": "Buffers and parameterisation"
    },
    {
      "term": "Buffer Viewer",
      "simple": "A panel that shows every Buffer and its value.",
      "detail": "Open it from the Tools menu of Tosca Commander. You can search, add, edit and delete Buffers there, which helps when a step fails because a Buffer is empty or holds an old value.",
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
      "term": "Characteristic",
      "simple": "A label that routes a playlist to matching agents.",
      "detail": "Example: Agent-type=Cloud-agent sends a playlist to cloud agents only.",
      "topic": "Execution lists and DEX"
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
      "term": "Cloud agent",
      "simple": "A machine hosted by Tricentis that runs your tests.",
      "detail": "It has only standard Windows applications and web browsers, so it suits web tests. Tests that need other software run on a team agent.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "Common repository",
      "simple": "The shared database that holds the team's project.",
      "detail": "You connect to it with a connection string when you create the workspace.",
      "topic": "Multi-user workspaces"
    },
    {
      "term": "Configuration",
      "simple": "A bundle of Test Configuration Parameters kept in one place.",
      "detail": "You assign the configuration to an object instead of typing the same parameters again, for example one configuration per browser or environment.",
      "topic": "Buffers and parameterisation"
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
      "term": "Cross-browser run",
      "simple": "The same TestCase executed in several browsers.",
      "detail": "Use one ExecutionList per browser and set the parameter Browser on each list. The TestCase itself is not copied.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "Custom property",
      "simple": "A field of your own on Tosca objects, such as a priority on TestCases.",
      "detail": "Created with Create property definition on the project root element. It has a DefaultValue, a ValueRange and a ValueType, and TQL searches can use it.",
      "topic": "Administration"
    },
    {
      "term": "DataType",
      "simple": "How Tosca reads a value: as text, number, date, true/false or password.",
      "detail": "The DataTypes are String (default), Numeric, Date, Boolean and Password. Password hides the value and stores it encrypted.",
      "topic": "TestCase design"
    },
    {
      "term": "Date expressions",
      "simple": "Expressions that produce dates relative to today.",
      "detail": "{DATE[base][offset][format]}, for example {DATE[][+1d][dd/MM/yyyy]} for tomorrow. Units are d (days), M (months) and y (years). {DATETIME} gives a time stamp.",
      "topic": "Buffers and parameterisation"
    },
    {
      "term": "DB Expert Module",
      "simple": "One module that opens a database connection, runs SQL and closes the connection.",
      "detail": "It replaces the three separate database modules when a single statement is enough.",
      "topic": "TBox"
    },
    {
      "term": "Defect and FeatureRequest",
      "simple": "The two types of issue in the Issues section.",
      "detail": "A Defect is behaviour that is wrong. A FeatureRequest is something missing and wanted. Creating one from a TestCase log links it to that run.",
      "topic": "Reporting"
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
      "term": "Elastic Execution Grid",
      "simple": "The test execution service of Tosca Cloud.",
      "detail": "It does the job of Distributed Execution, hosted by Tricentis. Runs go to personal, team or cloud agents.",
      "topic": "Execution lists and DEX"
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
      "term": "Exploratory testing",
      "simple": "Testing while learning the product, guided by a goal instead of a script.",
      "detail": "A session owner sets up sessions with a charter. Testers' interactions are recorded as TestSteps with annotated screenshots, and manual TestCases can be generated from the scenarios.",
      "topic": "Advanced topics"
    },
    {
      "term": "Find & provide",
      "simple": "The step that fetches a matching item for the test.",
      "detail": "You give search criteria and an alias. The fetched item is locked, so no other TestStep can retrieve it at the same time.",
      "topic": "Test data (TDM/TDS)"
    },
    {
      "term": "Flaky test",
      "simple": "A test that fails now and then without a real reason.",
      "detail": "Usually caused by timing, shared data or weak identification. Prefer WaitOn to static waits, give each test its own data and identify controls by stable properties.",
      "topic": "TestCase design"
    },
    {
      "term": "Floating licence",
      "simple": "A licence taken from a shared pool while Tosca is in use.",
      "detail": "The pool is hosted by Tricentis (cloud licensing) or on a Tricentis License Server in your own network (on-premises licensing). The licence goes back to the pool when the machine is done.",
      "topic": "Getting started"
    },
    {
      "term": "Headless browser",
      "simple": "A browser that runs without a visible window.",
      "detail": "Run the test through WebDriver (test configuration parameters HubAddress and Browser) and add --headless under BrowserArguments in OpenUrl. Useful on build servers.",
      "topic": "CI/CD integration"
    },
    {
      "term": "HOST engine",
      "simple": "The engine for mainframe text screens.",
      "detail": "It steers TN3270 and TN5250 sessions in a terminal emulator. Modules are created with Scan > Remote Terminal.",
      "topic": "Module scanning (XScan)"
    },
    {
      "term": "HtmlFrame and Shadow DOM",
      "simple": "A page inside a page, and a sealed-off part of a web component.",
      "detail": "FRAME and IFRAME elements become HtmlFrame controls that change the search context. Shadow DOMs are steered like frames, in open and closed mode, in Chrome, Edge and Firefox.",
      "topic": "Steering dynamic controls"
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
      "term": "Keyboard commands",
      "simple": "Keys written in curly braces, such as {ENTER} or {TAB}.",
      "detail": "Key combinations use {SENDKEYS[\"^a\"]}, with ^ for Ctrl, % for Alt and + for Shift. To send keys to a whole window, use TBox Send Keys.",
      "topic": "TBox"
    },
    {
      "term": "LiveCompare",
      "simple": "A Tricentis tool that shows what an SAP change affects.",
      "detail": "It recommends a minimal set of most-at-risk objects and, with Tosca as its Test Repository, reports hits (objects with a matching test) and gaps (objects without one).",
      "topic": "SAP testing"
    },
    {
      "term": "Log Viewer",
      "simple": "A program that shows Tosca's detailed log events.",
      "detail": "Start LogViewer.exe from %COMMANDER_HOME%. Log files are written to %LOCALAPPDATA%\\TRICENTIS\\TOSCA TestSuite\\logs and deleted after three weeks.",
      "topic": "Reporting"
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
      "term": "NeoLoad",
      "simple": "The performance testing tool from Tricentis.",
      "detail": "It simulates many virtual users and measures response times. The NeoLoad Add-on for Tosca converts a TestCase into a User Path.",
      "topic": "Advanced topics"
    },
    {
      "term": "Node-locked licence",
      "simple": "A licence bound to one machine.",
      "detail": "Nobody else can use it, and the machine never has to wait for a free licence.",
      "topic": "Getting started"
    },
    {
      "term": "OnDialogFailure and OnVerificationFailure",
      "simple": "Settings that say what happens after each kind of failure.",
      "detail": "As Test Configuration Parameters they can differ per folder or TestCase. Values: Continue, Execute next TestCase, Halt execution, Recover.",
      "topic": "Recovery and cleanup scenarios"
    },
    {
      "term": "OSV Monitor",
      "simple": "The place to start, stop and watch virtual services.",
      "detail": "It manages OSV Environments and Scenarios and contains the recorder for real traffic.",
      "topic": "API testing"
    },
    {
      "term": "OSV Scenario",
      "simple": "The description of a virtual service: which request gets which response.",
      "detail": "Built in Tosca Commander like a TestCase, from API Scan messages, from an API TestCase, or from recorded traffic. It runs in an OSV Environment.",
      "topic": "API testing"
    },
    {
      "term": "OwningGroupName and ViewingGroupName",
      "simple": "Two properties that set who may change an object and who may see it.",
      "detail": "The owning group has write access and counts more than the viewing group. An object can inherit both from its folder.",
      "topic": "Multi-user workspaces"
    },
    {
      "term": "Passed, Failed, Error and No result",
      "simple": "The usual results of a run.",
      "detail": "Failed means the application did not behave as expected. Error means Tosca could not complete the test, which usually points to the test or the environment. No result means the entry has not been executed.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "PDF 1:1 Compare",
      "simple": "A module that compares a PDF with a reference PDF.",
      "detail": "Accuracy is the lowest similarity in percent that still passes. Areas, texts and pages that may differ can be excluded.",
      "topic": "TBox"
    },
    {
      "term": "Pipeline",
      "simple": "The automatic sequence of build, deploy and test steps.",
      "detail": "The Tosca stage must come after deployment has finished, otherwise the tests run against the old version.",
      "topic": "CI/CD integration"
    },
    {
      "term": "Playlist",
      "simple": "A collection of tests to run in Tosca Cloud.",
      "detail": "Characteristics on the playlist decide which agents may run it.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "qTest",
      "simple": "The test management tool from Tricentis.",
      "detail": "Tosca tests can be linked to qTest releases, and results are visible in both tools. Changes are not synchronised automatically: update the link in Tosca and check in.",
      "topic": "Reporting"
    },
    {
      "term": "Random values",
      "simple": "Expressions that produce a new value on every run.",
      "detail": "{RND[5]} gives a five-digit number, {RND[1][16]} a number between limits, {RNDDECIMAL[2][100][999]} a decimal, {RANDOMTEXT[6]} letters and digits, and {RANDOMREGEX[\"...\"]} a text that follows a pattern.",
      "topic": "Buffers and parameterisation"
    },
    {
      "term": "Receive Mail Simple",
      "simple": "A module that looks for one e-mail and checks it.",
      "detail": "ActionMode Input sets the search criteria, Verify checks the content, Buffer stores parts of it. Receive Mail Expert handles several e-mails.",
      "topic": "TBox"
    },
    {
      "term": "Reconciliation",
      "simple": "A complete row by row comparison of two datasets.",
      "detail": "The most thorough Data Integrity test. It reports missing rows and rows whose data differs.",
      "topic": "Advanced topics"
    },
    {
      "term": "Recovery Scenario",
      "simple": "Steps that repair an unexpected situation and let the test try again.",
      "detail": "Created with 'Create Recovery Scenario Collection' on a TestCase or folder. A scenario counts as successful when all its steps pass.",
      "topic": "Recovery and cleanup scenarios"
    },
    {
      "term": "Regression test",
      "simple": "Running the existing tests again after a change.",
      "detail": "It shows whether something that worked before is now broken. Regression tests are repeated most often, so they are the first candidates for automation.",
      "topic": "Getting started"
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
      "term": "Revision",
      "simple": "The record of one checkin.",
      "detail": "It has a number, the date, the user and an optional comment, and lists the changed objects. You can revert to an earlier revision.",
      "topic": "Multi-user workspaces"
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
      "term": "Row Key",
      "simple": "The column or columns that identify a row in a data comparison.",
      "detail": "In a row by row comparison, Tosca pairs source and target rows by their Row Key and then compares the other columns.",
      "topic": "Advanced topics"
    },
    {
      "term": "RowCount and ResultCount",
      "simple": "Properties that return how many rows a table has, or how many elements match.",
      "detail": "Typed in the value with a dot, for example .RowCount==7 to verify or Rows=.RowCount to store the number in a Buffer.",
      "topic": "Steering dynamic controls"
    },
    {
      "term": "Run as Manual TestCase",
      "simple": "Running a test by hand from an ExecutionList.",
      "detail": "A checklist shows one step at a time. Enter sets a step to Passed, Ctrl+Enter to Failed, and Finish TestCase Execution sends the results to Tosca.",
      "topic": "Execution lists and DEX"
    },
    {
      "term": "Salesforce Scan",
      "simple": "A scan that creates Modules for Salesforce through its API.",
      "detail": "Started from the Modules menu. It needs a user name, a password, the environment, and a security token outside the trusted IP range.",
      "topic": "Module scanning (XScan)"
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
      "term": "Schema migration",
      "simple": "Updating the repository database for a new Tosca version.",
      "detail": "Not needed when upgrading from 12.3 or later. A single-user workspace migrates when first opened; a multi-user repository by hand or with the Tosca Administration Console. It cannot be undone, so back up first.",
      "topic": "Administration"
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
      "term": "Service port",
      "simple": "The virtual address your application calls instead of the real service.",
      "detail": "You create one in an OSV Environment for each real service that is being replaced.",
      "topic": "API testing"
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
      "term": "Smoke test",
      "simple": "A short first check that the application starts and its main paths work.",
      "detail": "Run it before the long regression suite. If the smoke test fails, the build is not worth testing further.",
      "topic": "Getting started"
    },
    {
      "term": "Special Execution Task (SET)",
      "simple": "A C# class that adds one new action to Tosca.",
      "detail": "It is connected to a Module with the configuration parameters Engine and SpecialExecutionTask, and then used like any standard module.",
      "topic": "Advanced topics"
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
      "term": "Steer Dialog Box",
      "simple": "The standard module for browser alerts, confirms and prompts.",
      "detail": "Steer the page first, then use Steer Dialog Box to confirm or cancel the dialog, or to type into a prompt.",
      "topic": "Steering dynamic controls"
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
      "term": "Subset (.tsu)",
      "simple": "A file with exported objects, for moving them to another project.",
      "detail": "Export Subset writes it, Import Subset reads it. Referenced Modules come along. Merge keeps the identity of objects; Import creates copies.",
      "topic": "Multi-user workspaces"
    },
    {
      "term": "TBox API",
      "simple": "The programming interface of Tosca's automation engine.",
      "detail": "Used to write Special Execution Tasks and to change how controls are steered.",
      "topic": "Advanced topics"
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
      "term": "TC-Shell",
      "simple": "The command line of Tosca Commander.",
      "detail": "Interactive mode takes typed commands. Script mode runs a .tcs file unattended, for example from the Windows Task Scheduler.",
      "topic": "Administration"
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
      "term": "Test pyramid",
      "simple": "A rule of thumb: many fast low-level tests, few slow screen tests.",
      "detail": "Unit tests form the base, API and integration tests the middle, and UI tests the small top.",
      "topic": "Getting started"
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
      "term": "Tosca Cloud",
      "simple": "The version of Tosca that runs in the browser and is hosted by Tricentis.",
      "detail": "Tests are run by agents: personal, team or cloud agents. Execution is handled by the Elastic Execution Grid.",
      "topic": "Getting started"
    },
    {
      "term": "Tosca Connect",
      "simple": "Tosca's bridge to tools such as Jira.",
      "detail": "Based on Planview Hub. It synchronises requirements and errors with third-party tools and needs the Tosca REST API Service on Tosca Server.",
      "topic": "Administration"
    },
    {
      "term": "Tosca Copilot",
      "simple": "Tosca's AI assistant.",
      "detail": "Launched in 2024 to explain TestCases, build TQL searches from plain requests and interpret results. Tosca Agentic Test Automation, announced in 2025, also generates test cases from natural language.",
      "topic": "Advanced topics"
    },
    {
      "term": "Tosca Execution Client",
      "simple": "The newer way to start Tosca tests from a pipeline.",
      "detail": "A script that talks to Tosca Server and triggers TestEvents. It replaces the legacy CI Client.",
      "topic": "CI/CD integration"
    },
    {
      "term": "Tosca Gateway",
      "simple": "The front door of Tosca Server.",
      "detail": "The firewall and communication proxy for all Tosca Server services and their clients. It also serves the Tosca Server landing page.",
      "topic": "Administration"
    },
    {
      "term": "Tosca MCP Server",
      "simple": "Connects your own AI assistant to Tosca.",
      "detail": "An add-in, from Tosca 2026.1 patch 1, that lets assistants supporting the Model Context Protocol create, organise, update and run test assets.",
      "topic": "Advanced topics"
    },
    {
      "term": "Tosca Server",
      "simple": "The shared server side of an on-premises installation.",
      "detail": "Installed once for the team. It hosts services such as Distributed Execution, the Test Data Service and Tricentis User Administration.",
      "topic": "Getting started"
    },
    {
      "term": "TQL",
      "simple": "The Tosca Query Language, for exact searches in a project.",
      "detail": "Example: =>SUBPARTS:TestCase[Name==\"Test001\"]. The arrow -> takes one step, => searches every level.",
      "topic": "Administration"
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
      "term": "User Path",
      "simple": "In NeoLoad, the sequence of requests one virtual user sends.",
      "detail": "It can be created from a Tosca TestCase with the NeoLoad Add-on.",
      "topic": "Advanced topics"
    },
    {
      "term": "Verification failure",
      "simple": "Tosca found the control, but the value was not the expected one.",
      "detail": "Often a real defect, so think before you let recovery or Continue hide it.",
      "topic": "Recovery and cleanup scenarios"
    },
    {
      "term": "Virtual folder",
      "simple": "A folder that shows the result of a saved TQL query.",
      "detail": "The query is stored in the folder's Query property and is evaluated from the folder's position in the tree.",
      "topic": "Administration"
    },
    {
      "term": "Vision AI",
      "simple": "Recognising controls by how they look on the screen.",
      "detail": "Used when no engine can read the controls, for example in a remote desktop session or a drawn canvas. It is slower and depends on the display, so it comes last.",
      "topic": "Module scanning (XScan)"
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
      "term": "WorkState",
      "simple": "How far a TestCase is: PLANNED, IN_WORK or COMPLETED.",
      "detail": "The property is called TestCaseWorkState. Coverage in the Requirements section counts PLANNED as 20%, IN_WORK as 50% and COMPLETED as 100%.",
      "topic": "TestCase design"
    },
    {
      "term": "XBrowser engine",
      "simple": "The engine that automates web pages in the browser.",
      "detail": "It needs the Tosca browser extension. The Test Configuration Parameter Browser selects Chrome, Edge, Firefox or another supported browser.",
      "topic": "Execution lists and DEX"
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
