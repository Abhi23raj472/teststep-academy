// Generated from questions.json by fetch_questions.py. Do not edit by hand.
window.TOSCA_QUESTIONS = [
  {
    "id": 1,
    "question": "A dynamic table's row count changes on every run. How do you verify a specific value in it?",
    "approach": [
      "Scan the whole table as one Table control in XScan instead of scanning single cells, so rows and columns stay generic.",
      "In the TestStep, add a row but do not pin it to a fixed position such as #3. Describe it by its content instead.",
      "On that row, set the cell you already know (for example Order ID = 4711) with ActionMode Constraint. Tosca searches the table for the row that matches.",
      "In the same row, set the cell you want to check (for example Status) with ActionMode Verify and the expected value.",
      "If the size of the table matters too, verify the table's RowCount property rather than counting rows yourself.",
      "Common mistake: hard-coding the row number. It passes today and fails as soon as one more row appears."
    ],
    "syntax": [
      {
        "label": "Find the row: Order ID cell, ActionMode Constraint",
        "code": "4711"
      },
      {
        "label": "Check the value: Status cell in the same row, ActionMode Verify",
        "code": "Shipped"
      },
      {
        "label": "Number of rows: on the table, ActionMode Verify",
        "code": ".RowCount==12"
      },
      {
        "label": "Last row, whatever the size of the table",
        "code": "$last"
      }
    ],
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
    "answer": "I scan it as a single Table control and never rely on the row number. I use ActionMode Constraint on a column I know to find the right row, then ActionMode Verify on the cell I care about in that same row, so the step still works when rows are added or reordered.",
    "topic": "Steering dynamic controls",
    "difficulty": "Intermediate",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 2,
    "question": "A button's ID changes on every page load, so your Module stops finding it. How do you make the identification stable?",
    "approach": [
      "Open the Module in XScan and look at the identifying properties. Untick the property that changes (the dynamic Id).",
      "Identify by properties that stay the same, such as InnerText, Name, Title or ClassName, and check that XScan still reports the control as unique.",
      "If only part of the value changes, keep the property and replace the changing part with a wildcard, for example btn_submit_*.",
      "If no stable property exists, use Identify by Anchor and tie the control to a stable neighbour such as its label.",
      "Keep Identify by Index and Identify by Image as last resorts.",
      "Common mistake: jumping straight to Index. It works until the page layout changes, then silently steers the wrong control."
    ],
    "syntax": [
      {
        "label": "Identification property with a wildcard for the changing part",
        "code": "btn_submit_*"
      }
    ],
    "docs": [
      {
        "title": "Specify values (wildcards, escaping)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/specifying_values.htm"
      }
    ],
    "answer": "I rescan the control in XScan, drop the dynamic ID and identify it by stable properties, using a wildcard if only part of the value changes. If that is not unique I use anchor identification, and I only fall back to index or image when nothing else works.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Intermediate",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 3,
    "question": "After a new release, one screen changed and 40 TestCases that use its Module now fail. How do you fix them with the least effort?",
    "approach": [
      "Do not create a new Module. The 40 TestCases are linked to the existing ModuleAttributes, and a new Module would break that link.",
      "Right-click the existing Module and choose Rescan, with the new version of the screen open.",
      "In XScan, re-map each affected ModuleAttribute to the changed control and add any controls that are new.",
      "Save, then run one or two of the affected TestCases in the ScratchBook to confirm the steps resolve again.",
      "Common mistake: scanning a fresh Module and re-building the TestSteps by hand, which turns a five-minute fix into days of rework."
    ],
    "answer": "I rescan the existing Module rather than creating a new one. Because TestSteps reference ModuleAttributes, fixing the identification once in the Module repairs all 40 TestCases at the same time. Then I do a quick ScratchBook run to confirm.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Beginner",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 4,
    "question": "The same checkout flow must be tested with around 50 data combinations. How do you design this without creating 50 separate TestCases?",
    "approach": [
      "In the TestCaseDesign section, create a TestSheet with Attributes (payment type, customer type, country) and their Instances as equivalence classes.",
      "Let Tosca generate the combinations on the TestSheet, for example pairwise or linear expansion, instead of typing all 50 rows.",
      "Build the flow once as a normal TestCase, then convert it to a TestCase Template.",
      "Replace the fixed values in the Template with references to the TestSheet using {XL[Attribute.SubAttribute]}.",
      "Drag the TestSheet onto the Template and instantiate it. Tosca creates one TestCase instance per data row.",
      "Common mistake: copying and pasting the TestCase 50 times, so a single flow change has to be made 50 times."
    ],
    "syntax": [
      {
        "label": "Value in the Template that reads from the TestSheet",
        "code": "{XL[Customer.Country]}"
      }
    ],
    "docs": [
      {
        "title": "TestCase templates",
        "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/testcase_templates.htm"
      }
    ],
    "answer": "I separate the data from the flow. The combinations live in a TestSheet in TestCaseDesign, the flow is a single TestCase Template that reads values with the XL syntax, and instantiating the Template generates all the TestCases. A change to the flow is then made in one place.",
    "topic": "TestCase design",
    "difficulty": "Intermediate",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 5,
    "question": "Login steps are repeated in 200 TestCases. The login page now has an extra field. How should this have been built so the change is made only once?",
    "approach": [
      "Put the login steps in a Reusable TestStepBlock inside a TestStepLibrary.",
      "Drag the block into each TestCase. Tosca creates a reference to the block, not a copy.",
      "Use Business Parameters on the block for values that differ per TestCase, such as user name and password.",
      "When the page changes, update the block in the library once. Every referencing TestCase picks up the change.",
      "Common mistake: copy-pasting the steps, or putting too much into one reusable block so it no longer fits every TestCase."
    ],
    "syntax": [
      {
        "label": "Value inside the block that takes the Business Parameter",
        "code": "{PL[Username]}"
      }
    ],
    "docs": [
      {
        "title": "Reusable TestStepBlocks",
        "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/tosca_commander/reusable_teststepblocks.htm"
      }
    ],
    "answer": "Repeated steps belong in a Reusable TestStepBlock in a library, with Business Parameters for the values that vary. TestCases hold a reference to the block, so adding the new login field is one change in the library instead of 200.",
    "topic": "TestCase design",
    "difficulty": "Beginner",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 6,
    "question": "Tests run in parallel on several agents and each needs its own unused customer record. How do you stop two tests picking the same one?",
    "approach": [
      "Store the customer records centrally in Test Data Service (TDS) instead of in an Excel file or hard-coded values.",
      "Group the records by state, for example one data type for new customers and one for used customers.",
      "At the start of the TestCase, use the TestData - Find & provide item module (called Record in older versions) with search criteria. The item is locked for that TestCase while it runs.",
      "Read the values in later steps with a TDS expression such as {TDS[Customer.Email]} instead of typing them.",
      "At the end, update the record or move it to the used type so it is not picked again.",
      "Common mistake: sharing a spreadsheet between agents. Two tests read the same row at the same moment and one of them fails for no visible reason."
    ],
    "syntax": [
      {
        "label": "Value from the item provided by TestData - Find & provide item (alias Customer)",
        "code": "{TDS[Customer.Email]}"
      }
    ],
    "docs": [
      {
        "title": "Test Data Service expressions",
        "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/test_data_management/tds_expressions.htm"
      }
    ],
    "answer": "I keep the data in Test Data Service and let each TestCase find and reserve a matching record at runtime. After use, I update or move the record so it counts as consumed. That makes the tests safe to run in parallel because no two of them can hold the same record.",
    "topic": "Test data (TDM/TDS)",
    "difficulty": "Advanced",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 7,
    "question": "TestCase A creates an order. TestCase B must use that order number, but B runs later on a different agent. A Buffer does not work. Why, and what do you do?",
    "approach": [
      "Explain the cause: Buffers are stored locally on the machine that ran the test, so another agent never sees them.",
      "At the end of TestCase A, write the order number to Test Data Service as a new record.",
      "At the start of TestCase B, find and provide that item from TDS and read the value with a TDS expression such as {TDS[Order.OrderNumber]}.",
      "If the two steps truly belong together, the simpler option is to keep them in one TestCase or one ExecutionList on the same agent.",
      "Common mistake: building chains of TestCases that depend on Buffers, which pass on your own machine and fail in distributed execution."
    ],
    "syntax": [
      {
        "label": "TestCase B: value from the item that TestCase A wrote (alias Order)",
        "code": "{TDS[Order.OrderNumber]}"
      }
    ],
    "docs": [
      {
        "title": "Test Data Service expressions",
        "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/test_data_management/tds_expressions.htm"
      }
    ],
    "answer": "Buffers are local to the workstation, so they cannot carry data between agents. For data that has to cross TestCases or machines I write it to Test Data Service in the first test and read it in the second. I also try to keep TestCases independent so this is the exception.",
    "topic": "Test data (TDM/TDS)",
    "difficulty": "Intermediate",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 8,
    "question": "A login API returns a token that every following request needs in its header. How do you automate this chain in Tosca?",
    "approach": [
      "In API Scan, create and send the login request, check that it works, then export it to Tosca Commander as Modules and a TestCase.",
      "In the response TestStep, verify the status code and set the token element to ActionMode Buffer with a name such as Token.",
      "In the next request, set the Authorization header to Bearer {B[Token]}.",
      "Keep the login as a Reusable TestStepBlock so every API TestCase can start with it.",
      "Common mistake: pasting a token copied from Postman. It expires, and the whole suite fails with 401 errors the next day."
    ],
    "syntax": [
      {
        "label": "Response: token element, ActionMode Buffer (the value is the Buffer name)",
        "code": "Token"
      },
      {
        "label": "Next request: Authorization header",
        "code": "Bearer {B[Token]}"
      }
    ],
    "docs": [
      {
        "title": "ActionModes",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
      },
      {
        "title": "Text expressions (Buffer, XBuffer, CP)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
      }
    ],
    "answer": "I scan the login call in API Scan, buffer the token from the response, and reference that Buffer in the Authorization header of the next requests. I put the login into a reusable block so every API test gets a fresh token at runtime.",
    "topic": "API testing",
    "difficulty": "Intermediate",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 9,
    "question": "A 500-test regression suite takes about 10 hours on one machine. It must finish overnight. How do you set this up?",
    "approach": [
      "Work out the capacity first: total run time divided by the time window gives the number of agents. Ten hours of tests in a five-hour night needs two agents; 1000 tests of 3 minutes each in 2 hours needs about 25, plus a spare.",
      "Use Distributed Execution (DEX): a DEX Server hands work out to several DEX Agents that run in parallel.",
      "Split the suite into balanced ExecutionLists, add them to a TestEvent in Tosca Commander and assign agents or agent configurations.",
      "Make sure each agent has an unlocked desktop session, because UI tests cannot steer a locked screen.",
      "Start the TestEvent and follow progress in the DEX Monitor. If agents are short, run the highest-risk TestCases first and the rest later.",
      "Common mistake: distributing tests that depend on each other or share the same test data. They must be independent first."
    ],
    "answer": "I use Distributed Execution. I first calculate how many agents the time window needs, then split the suite into independent ExecutionLists, group them in a TestEvent and let the DEX Server distribute them. The key condition is that the tests do not depend on each other or on shared data, otherwise parallel runs produce false failures.",
    "topic": "Execution lists and DEX",
    "difficulty": "Advanced",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 10,
    "question": "A TestCase passes in the ScratchBook but fails when it runs from the ExecutionList. How do you investigate?",
    "approach": [
      "Remember the difference: the ScratchBook is a trial run with temporary results, while an ExecutionList is the official run with stored logs.",
      "Compare the Test Configuration Parameters. Values set on the ExecutionList or its folder can override the ones on the TestCase, for example browser or environment.",
      "Check what ran before it. In the ExecutionList the application may be left in a different state by the previous test.",
      "Check whether you ran only part of the TestCase in the ScratchBook, skipping a precondition step.",
      "Open the execution log, find the first failed TestStep and compare it with the ScratchBook run.",
      "Common mistake: reporting ScratchBook results as proof that a test passed."
    ],
    "answer": "I compare the two contexts. Usually the cause is a different Test Configuration Parameter on the ExecutionList, a leftover application state from the previous test, or a precondition I skipped in the ScratchBook. The ScratchBook is only for trying things out, so the ExecutionList result is the one that counts.",
    "topic": "Execution lists and DEX",
    "difficulty": "Beginner",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 11,
    "question": "An unexpected pop-up sometimes appears mid-run. The current test fails and so do all the tests after it. How do you handle this?",
    "approach": [
      "Create a RecoveryScenario collection on the relevant TestCase folder and add a RecoveryScenario with the steps that close the pop-up.",
      "Choose which failure types trigger it. Dialog failures are the default, and verification failures can be added.",
      "Set the RetryLevel (TestCase, TestStep or TestStepValue) to decide where Tosca resumes after recovering.",
      "Add a CleanUp scenario that resets the application, for example closing the browser, for the case where recovery does not help.",
      "Start every TestCase from a known state so one failure cannot affect the next test.",
      "Common mistake: adding a 'close pop-up if present' step to every TestCase instead of handling it centrally."
    ],
    "syntax": [
      {
        "label": "Test Configuration Parameter that starts recovery after a dialog failure",
        "code": "OnDialogFailure = Recover"
      },
      {
        "label": "RetryLevel of the Recovery Scenario, one of",
        "code": "TestStepValue\nTestStep\nTestCase"
      }
    ],
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
    "answer": "I use a Recovery Scenario that closes the pop-up and retries from the level I choose with RetryLevel. For failures that recovery cannot fix, a CleanUp scenario brings the application back to a clean state so the next TestCase starts fresh. Both are defined once at folder level, not in every test.",
    "topic": "Recovery and cleanup scenarios",
    "difficulty": "Intermediate",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 12,
    "question": "A cookie banner appears only on some runs. How do you click 'Accept' when it is there and continue without failing when it is not?",
    "approach": [
      "Use the TBox If statement from the Standard modules.",
      "In the Condition, add a TestStep on the banner that checks it with ActionMode Verify on the Visible property, typed as .Visible==True.",
      "In Then, add the step that clicks Accept. Leave Else empty.",
      "Keep the wait short for this check so the test does not lose time on every run where the banner is absent.",
      "Common mistake: clicking the banner unconditionally, so the TestCase fails whenever it does not show up."
    ],
    "syntax": [
      {
        "label": "Condition of the If statement: banner, ActionMode Verify",
        "code": ".Visible==True"
      }
    ],
    "docs": [
      {
        "title": "Using properties of controls",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
      }
    ],
    "answer": "I wrap the click in a TBox If statement. The Condition verifies whether the banner is visible, the Then branch clicks Accept, and when the banner is not there Tosca simply carries on. A failed Condition does not fail the TestCase.",
    "topic": "TBox",
    "difficulty": "Beginner",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 13,
    "question": "A page sometimes loads slowly and the next step fails with 'control not found'. How do you make the test reliable?",
    "approach": [
      "Add a TestStep with ActionMode WaitOn on a control that shows the page is ready, for example the results table being visible or a spinner no longer existing.",
      "Let Tosca's dynamic synchronisation do the waiting. WaitOn continues as soon as the condition is met, up to the configured timeout.",
      "If the application is slow in general, raise the synchronisation timeouts under Settings > TBox > Synchronization.",
      "Use the static TBox Wait module only when nothing on screen can be waited on.",
      "Common mistake: adding fixed waits everywhere. The suite becomes slow and still fails on the day the page takes one second longer."
    ],
    "syntax": [
      {
        "label": "Wait until the page is ready: ActionMode WaitOn",
        "code": ".Visible==True"
      },
      {
        "label": "Wait until a spinner is gone: ActionMode WaitOn, DataType Boolean",
        "code": ".Exists==False"
      }
    ],
    "docs": [
      {
        "title": "Using properties of controls",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
      },
      {
        "title": "ActionModes",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
      }
    ],
    "answer": "I replace fixed waits with ActionMode WaitOn on a control that signals the page is ready, so the test waits exactly as long as needed. If the whole application is slow I tune the synchronisation timeout in the TBox settings. A static wait is my last option.",
    "topic": "TBox",
    "difficulty": "Beginner",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 14,
    "question": "You must click a link whose text contains an order number that is only generated at runtime. How do you steer it?",
    "approach": [
      "Earlier in the TestCase, capture the order number with ActionMode Buffer, for example into OrderNo.",
      "Scan one example of the link and, on its ModuleAttribute, add the configuration parameter ExplicitName with the value True.",
      "In the TestStep, rename the TestStepValue to the runtime name using the Buffer, for example Order {B[OrderNo]}. Wildcards are allowed.",
      "Tosca now identifies the control by that name at runtime instead of by the value that was scanned.",
      "If the links sit in a table, the alternative is to steer the table and find the row with ActionMode Constraint.",
      "Common mistake: scanning the link with today's order number in its properties, so it can never be found again."
    ],
    "syntax": [
      {
        "label": "Capture the number earlier: ActionMode Buffer (the value is the Buffer name)",
        "code": "OrderNo"
      },
      {
        "label": "Configuration parameter on the link's ModuleAttribute",
        "code": "ExplicitName = True"
      },
      {
        "label": "Name of the TestStepValue",
        "code": "Order {B[OrderNo]}",
        "note": "ExplicitName makes the name editable. Using a Buffer inside the name is not shown in the manual, so try it in your version."
      }
    ],
    "docs": [
      {
        "title": "Properties for XModules (parameters)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
      },
      {
        "title": "ActionModes",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
      }
    ],
    "answer": "I buffer the order number first, then use ExplicitName on the ModuleAttribute so the TestStepValue name, which includes the Buffer, identifies the link at runtime. One Module then works for any order number. If the links are in a table I use table steering with a Constraint instead.",
    "topic": "Steering dynamic controls",
    "difficulty": "Advanced",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 15,
    "question": "A confirmation message says 'Order 48213 created successfully'. How do you capture only the order number and reuse it later?",
    "approach": [
      "Scan the message control so its text is available as a ModuleAttribute.",
      "Use ActionMode Verify with a partial Buffer in the value: Order {XB[OrderNo]} created successfully.",
      "Tosca checks the fixed text and stores only the changing part in the Buffer OrderNo.",
      "Reuse it in later steps with {B[OrderNo]}, for example in a search field.",
      "Check the stored value under Settings > Engine > Buffer when debugging.",
      "Common mistake: buffering the whole sentence with ActionMode Buffer and then searching for the full sentence instead of the number."
    ],
    "syntax": [
      {
        "label": "Message control, ActionMode Verify",
        "code": "Order {XB[OrderNo]} created successfully"
      },
      {
        "label": "Reuse in a later step",
        "code": "{B[OrderNo]}"
      }
    ],
    "docs": [
      {
        "title": "ActionModes",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
      },
      {
        "title": "Text expressions (Buffer, XBuffer, CP)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
      }
    ],
    "answer": "I use a partial Buffer. With ActionMode Verify and the XB expression inside the expected text, Tosca verifies the message and extracts just the order number into a Buffer. I then reference it with the normal B syntax in the following steps.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Intermediate",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 16,
    "question": "The same TestCases must run against QA and UAT, which have different URLs and users. How do you avoid maintaining two copies?",
    "approach": [
      "Create Test Configuration Parameters (TCPs) such as URL and User on a folder high up in the tree. Child objects inherit them.",
      "Reference them in TestSteps with {CP[URL]} instead of typing the value.",
      "Create one ExecutionList or execution folder per environment and override the TCP values there.",
      "Run the same TestCases from whichever ExecutionList matches the environment.",
      "Common mistake: hard-coding the URL in the steps, or using Buffers for environment values. Buffers are for runtime data, TCPs are for configuration."
    ],
    "syntax": [
      {
        "label": "Reference the parameter in a TestStep",
        "code": "{CP[URL]}"
      }
    ],
    "docs": [
      {
        "title": "Text expressions (Buffer, XBuffer, CP)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
      }
    ],
    "answer": "I keep environment values in Test Configuration Parameters and reference them with the CP syntax. Each environment has its own ExecutionList that overrides those parameters, so one set of TestCases runs against QA or UAT without any change to the steps.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Beginner",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 17,
    "question": "The team wants Tosca tests to run automatically after every build in Jenkins or Azure DevOps. How do you integrate them?",
    "approach": [
      "Prepare the run in Tosca first: group the ExecutionLists into a TestEvent that Distributed Execution can run.",
      "In the pipeline, add a stage after deployment that calls Tosca's command-line CI client (ToscaCIClient, or the Tosca Execution Client script in newer versions) and points it at that TestEvent on the Tosca Server.",
      "Have the client write the results in JUnit format and publish that file with the pipeline's test-results step.",
      "Let the client's exit code fail the stage when tests fail, so a broken build is visible.",
      "Keep credentials and server URLs in pipeline secrets or variables, not in the script.",
      "Common mistake: triggering the tests before the deployment has finished, so they run against the old version."
    ],
    "syntax": [
      {
        "label": "Tosca CI Client called from the pipeline (-x True returns an exit code the pipeline can act on)",
        "code": "ToscaCIClient.exe -m distributed -c \"c:/temp/CITestExecutionConfiguration.xml\" -r \"c:/temp/result.xml\" -t junit -x True",
        "note": "Tricentis lists the Tosca CI Client as a legacy feature. Newer versions use the Tosca Execution Client for the same job."
      }
    ],
    "docs": [
      {
        "title": "Tosca CI Client call parameters",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/continuous_integration/execution_remote.htm"
      }
    ],
    "answer": "The pipeline does not open Tosca Commander. It calls Tosca's CI client from a build step, which triggers a TestEvent through the Tosca Server and Distributed Execution, waits for it and returns JUnit results. The pipeline publishes those results and fails the stage if tests fail.",
    "topic": "CI/CD integration",
    "difficulty": "Advanced",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 18,
    "question": "You have to automate creating a sales order in SAP GUI, but XScan does not recognise any controls on the SAP screen. What do you check and how do you proceed?",
    "approach": [
      "Check that SAP GUI scripting is enabled on the server (parameter sapgui/user_scripting set to TRUE in transaction RZ11).",
      "Check that scripting is also enabled in the local SAP GUI options, with the notification pop-ups switched off.",
      "Use the standard SAP modules for logging on and entering the transaction code instead of scanning those screens yourself.",
      "Scan the transaction screens with XScan. Steer the items grid as a table, not as single cells.",
      "Capture the document number from the status bar with a partial Buffer ({XB[...]}) for later steps.",
      "Common mistake: spending hours on Module identification when the real cause is that scripting is switched off."
    ],
    "syntax": [
      {
        "label": "SAP server parameter, set in transaction RZ11",
        "code": "sapgui/user_scripting = TRUE"
      },
      {
        "label": "Status bar, ActionMode Verify: capture the document number",
        "code": "Standard Order {XB[OrderNumber]} has been saved"
      }
    ],
    "docs": [
      {
        "title": "ActionModes",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
      }
    ],
    "answer": "If XScan sees nothing in SAP GUI, scripting is almost always disabled, so I check it on the server and on the client first. Then I use the standard SAP logon and T-code modules, scan the transaction screens, steer the item grid as a table and buffer the document number from the status bar.",
    "topic": "SAP testing",
    "difficulty": "Intermediate",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 19,
    "question": "In a multi-user workspace you need to edit a TestCase, but a colleague who is on leave has it checked out. What do you do, and how is this avoided?",
    "approach": [
      "Explain the model: in a multi-user workspace an object must be checked out before editing, and it stays locked for everyone else until it is checked in.",
      "First try to reach the colleague, because only a check-in keeps their changes.",
      "If that is not possible, ask a Tosca administrator to revoke the checkout. Any changes that were not checked in are lost.",
      "Run Update All, then check out the TestCase yourself and make the change.",
      "As a team habit: Update All at the start of the day, check out only what you need, and Checkin All before you leave.",
      "Common mistake: checking out a whole folder tree 'to be safe' and blocking the rest of the team."
    ],
    "answer": "A checked-out object is locked for everyone else. If the owner cannot check it in, an administrator can revoke the checkout, with the risk that unsaved changes are lost. To prevent it, the team checks out only what it needs and does Checkin All at the end of every day.",
    "topic": "Multi-user workspaces",
    "difficulty": "Beginner",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 20,
    "question": "After each regression run, your manager wants a PDF summary and screenshots of the failed steps. How do you provide this from Tosca?",
    "approach": [
      "Run the tests from an ExecutionList, not the ScratchBook, so the results are stored as execution logs.",
      "Switch on screenshots for failed TestSteps under Settings > TBox > Logging, so each failure has evidence attached.",
      "Right-click the ExecutionList and use Print Report to create a PDF from one of the standard report definitions.",
      "If the manager wants coverage, link TestCases to Requirements and show the execution state in the Requirements section.",
      "For runs triggered from a pipeline, also publish the JUnit results so the summary is visible without opening Tosca.",
      "Common mistake: collecting screenshots by hand after the run, when the application is no longer in the failed state."
    ],
    "answer": "I run from an ExecutionList so the logs are saved, enable screenshots on failed steps in the TBox logging settings, and generate the PDF with Print Report on the ExecutionList. For a management view I link the tests to Requirements so coverage and execution state are visible in one place.",
    "topic": "Reporting",
    "difficulty": "Beginner",
    "source": {
      "title": "Sample entry - cross-check in the Tricentis Tosca documentation",
      "url": "https://docs.tricentis.com/"
    }
  },
  {
    "id": 21,
    "question": "A Register button must be clicked, but first you have to verify its label text. The button exists only once in the Module and you are not allowed to copy the TestStep. How do you do both?",
    "approach": [
      "Open the Module, select the button's ModuleAttribute and change its Cardinality from 0-1 to 0-N. The same attribute can then be used more than once in one TestStep.",
      "In the TestStep, use the attribute the first time with ActionMode Verify on its InnerText property, typed as .InnerText==Register, to check the spelling.",
      "Use the same attribute a second time (Tosca offers it again once it has been used) with ActionMode Input and {CLICK}, or X if a real mouse click is not needed.",
      "Run it once in the ScratchBook and confirm the log shows the verification before the click.",
      "Common mistake: copying the TestStep or scanning the button twice. Both work, but they double the maintenance and are exactly what the question rules out."
    ],
    "syntax": [
      {
        "label": "Cardinality of the button's ModuleAttribute",
        "code": "0-N"
      },
      {
        "label": "First use: ActionMode Verify",
        "code": ".InnerText==Register"
      },
      {
        "label": "Second use: ActionMode Input",
        "code": "{CLICK}"
      }
    ],
    "docs": [
      {
        "title": "Default properties for Modules",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/modules_properties.htm"
      },
      {
        "title": "Using properties of controls",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
      },
      {
        "title": "Click operations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/click_operations.htm"
      }
    ],
    "answer": "I set the Cardinality of the button's ModuleAttribute to 0-N. That lets me use the same attribute twice in one TestStep: first with ActionMode Verify on its InnerText, then with ActionMode Input to click it. Nothing is duplicated in the Module or the TestCase.",
    "topic": "TestCase design",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Scenario 1 | Tosca Interview Question of the Day 1 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=6mRmEiZ5EN0"
    }
  },
  {
    "id": 22,
    "question": "The Browser test configuration parameter is set to Chrome on the TestCase and to Edge on the ExecutionList. Which browser does Tosca use when the test runs, and why?",
    "approach": [
      "Recall how Test Configuration Parameters work: a value is inherited by everything below the object it is set on, and a value set further down replaces the inherited one.",
      "When the TestCase runs from the ExecutionList, the values on the execution side take priority over the ones on the TestCase. Edge is used.",
      "When the same TestCase runs from the ScratchBook, no ExecutionList is involved, so the TestCase value applies and Chrome is used.",
      "Use this on purpose: keep a default on the TestCase or its folder and set the browser or environment per ExecutionList.",
      "Common mistake: changing the parameter on the TestCase and wondering why the scheduled run still opens the other browser."
    ],
    "syntax": [
      {
        "label": "Test Configuration Parameter on the TestCase",
        "code": "Browser = Chrome"
      },
      {
        "label": "The same parameter on the ExecutionList, which wins",
        "code": "Browser = Edge"
      }
    ],
    "docs": [
      {
        "title": "XBrowser Engine 3.0",
        "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/engines_3.0/xbrowser/xbrowser.htm"
      }
    ],
    "answer": "Edge. A Test Configuration Parameter set on the ExecutionList overrides the same parameter on the TestCase, so the execution side wins. The TestCase value only applies when nothing overrides it, for example in a ScratchBook run. The same rule holds for any parameter, such as a QA versus UAT environment.",
    "topic": "Execution lists and DEX",
    "difficulty": "Beginner",
    "source": {
      "title": "Tosca Scenario 2 | Tosca Interview Question of the Day 2 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=ZIcaUtfMjGo"
    }
  },
  {
    "id": 23,
    "question": "For a web table you must find out how many rows and columns it has, and also how many times a given text, for example a country name, appears in it. How do you do this in Tosca?",
    "approach": [
      "Scan the table as a single Table control in XScan and give the Module a clear name.",
      "In the TestStep, read the table's RowCount property with ActionMode Buffer, and do the same for ColumnCount.",
      "To use the table attribute twice in the same TestStep, set its Cardinality to 0-N instead of copying the step.",
      "The header row is counted as well. For data rows only, subtract one with {MATH[{B[Rows]}-1]}.",
      "For the occurrences, add a row, set the Country cell to the text with ActionMode Constraint, and read the ResultCount property into a Buffer. It returns how many rows match.",
      "Common mistake: looping through every row and comparing cells. The table properties give the same numbers in one step."
    ],
    "syntax": [
      {
        "label": "Number of rows into a Buffer: on the table, ActionMode Buffer",
        "code": "Rows=.RowCount"
      },
      {
        "label": "Number of columns into a Buffer",
        "code": "Columns=.ColumnCount"
      },
      {
        "label": "Data rows without the header",
        "code": "{MATH[{B[Rows]}-1]}"
      },
      {
        "label": "Occurrences: table with ActionMode Select, Country cell with ActionMode Constraint, then on the row with ActionMode Verify",
        "code": ".ResultCount==1"
      }
    ],
    "docs": [
      {
        "title": "Table",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/type_table.htm"
      },
      {
        "title": "Using properties of controls",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
      },
      {
        "title": "ActionModes",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
      },
      {
        "title": "Perform calculations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/calculations.htm"
      }
    ],
    "answer": "I scan it as one Table control and use its properties. RowCount and ColumnCount with ActionMode Buffer give the size, remembering that the header row is included. For occurrences I put a Constraint on the column with the text I am looking for and read ResultCount, which is the number of matching rows.",
    "topic": "Steering dynamic controls",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Scenario 3 | Tosca Interview Question of the Day 3 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=18hbMWk0HU0"
    }
  },
  {
    "id": 24,
    "question": "A dropdown offers a list of values. Each time the test runs it must select a random one, not the same value every time. How do you automate that?",
    "approach": [
      "In XScan, scan just one entry of the dropdown's list and do not tie its identification to that entry's text.",
      "Add the configuration parameter ExplicitName = True to that ModuleAttribute, so the name of the TestStepValue decides which entry is steered.",
      "In the TestStep, name the value by position: #5 means the fifth entry. Mark the entry as selected rather than sending a mouse click to it.",
      "Replace the fixed number with a random one: #{RND[1][16]} picks a position from 1 to 16 on every run. Translate value shows the result changing.",
      "Do not hard-code the upper limit. Buffer the number of entries first and use #{RND[1][{B[EntryCount]}]}.",
      "Common mistake: fixing the list size in the expression. New entries are then never chosen, and a shorter list makes the step fail."
    ],
    "syntax": [
      {
        "label": "Configuration parameter on the list entry's ModuleAttribute",
        "code": "ExplicitName = True"
      },
      {
        "label": "Name of the TestStepValue: a fixed position",
        "code": "#5"
      },
      {
        "label": "Name of the TestStepValue: a random position from 1 to 16",
        "code": "#{RND[1][16]}",
        "note": "Shown working in the linked video. The manual does not cover this case, so try it in your version."
      },
      {
        "label": "Upper limit taken from a Buffer",
        "code": "#{RND[1][{B[EntryCount]}]}"
      }
    ],
    "docs": [
      {
        "title": "Properties for XModules (parameters)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
      },
      {
        "title": "Random values",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/random_values.htm"
      },
      {
        "title": "Table",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/type_table.htm"
      }
    ],
    "answer": "I scan one list entry, generalise it with ExplicitName, and address it by position with a hash and a number. The number comes from the RND expression with a lower and upper bound, so each run selects a different entry. I take the upper bound from the actual number of entries, not from a fixed value.",
    "topic": "Steering dynamic controls",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Scenario 4 | Tosca Interview Question of the Day 4 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=OHghrDBI8u0"
    }
  },
  {
    "id": 25,
    "question": "A Buffer holds a mixed string such as Ab12#cd$9. You need only the special characters from it, stored in a new Buffer. How do you extract them?",
    "approach": [
      "Use the STRINGREPLACE expression: it takes the input, what to search for, and what to put in its place.",
      "Pass the Buffer as the input: {B[Raw]}.",
      "As the search part, give a regular expression in double quotes that matches everything you want removed: \"[a-zA-Z0-9]\".",
      "Leave the replacement empty, so letters and digits disappear and the special characters remain: {STRINGREPLACE[{B[Raw]}][\"[a-zA-Z0-9]\"][]}.",
      "Put the expression in a TBox Set Buffer step to store the result, and check it with Translate value or in the Buffer viewer.",
      "Common mistake: leaving out the double quotes. The pattern is then searched as plain text and nothing is removed."
    ],
    "syntax": [
      {
        "label": "Keep only the special characters",
        "code": "{STRINGREPLACE[{B[Raw]}][\"[a-zA-Z0-9]\"][]}",
        "note": "The pattern is a regular expression. Writing it in double quotes is shown in the linked video; the manual does not give an example."
      }
    ],
    "docs": [
      {
        "title": "String operations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/string_operations.htm"
      },
      {
        "title": "Specify values (wildcards, escaping)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/specifying_values.htm"
      }
    ],
    "answer": "I use STRINGREPLACE with a regular expression. The pattern matches all letters and digits, I replace them with nothing, and what is left is the special characters. A TBox Set Buffer step stores that result in its own Buffer for later steps.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Scenario 5 | Tosca Interview Question of the Day 5 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=g-DgaS-TYwM"
    }
  },
  {
    "id": 26,
    "question": "Every run needs a new random password in a fixed pattern: four uppercase letters, one special character, three lowercase letters, one special character, then four digits. How do you generate it?",
    "approach": [
      "Use the RANDOMREGEX expression, which returns a random string that matches a regular expression.",
      "Build the pattern block by block: [A-Z]{4} for the uppercase letters, [a-z]{3} for the lowercase ones, [0-9]{4} for the digits.",
      "For the special characters, list the ones the application accepts, for example [!@#$%]. This is safer than 'anything that is not a letter or digit', which can produce a space or a character the field rejects.",
      "Join the blocks: {RANDOMREGEX[\"^[A-Z]{4}[!@#$%][a-z]{3}[!@#$%][0-9]{4}$\"]}.",
      "If the password is needed again, for example in a confirm field or at the next login, generate it once in a TBox Set Buffer step and reuse the Buffer.",
      "Common mistake: typing the expression into both password fields. Each use produces a different value, so the two fields never match."
    ],
    "syntax": [
      {
        "label": "Random password in the required pattern",
        "code": "{RANDOMREGEX[\"^[A-Z]{4}[!@#$%][a-z]{3}[!@#$%][0-9]{4}$\"]}"
      },
      {
        "label": "Reuse the stored password",
        "code": "{B[Password]}"
      }
    ],
    "docs": [
      {
        "title": "Random values",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/random_values.htm"
      },
      {
        "title": "Regular expressions",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/regular_expressions.htm"
      }
    ],
    "answer": "I use RANDOMREGEX with a pattern that describes the format block by block: four uppercase letters, a special character, three lowercase letters, another special character and four digits. I generate it once into a Buffer so the same password can be used in the confirm field and later at login.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Scenario 6 | Tosca Interview Question of the Day 6 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=uv-Wy8xkFL0"
    }
  },
  {
    "id": 27,
    "question": "A string mixes letters, digits and special characters, for example Ab7#2x6$3. You need to buffer only the digits, 7263. How do you do it?",
    "approach": [
      "Store the original string in a Buffer with TBox Set Buffer, for example Raw.",
      "Use STRINGREPLACE with a regular expression in double quotes that matches everything except digits: \"[^0-9]\". The ^ inside the brackets means 'not'.",
      "Replace those matches with nothing: {STRINGREPLACE[{B[Raw]}][\"[^0-9]\"][]}.",
      "Put the expression into a second TBox Set Buffer step so the digits are available as their own Buffer.",
      "The same idea covers other cases: \"[^a-z]\" keeps only lowercase letters and \"[^A-Z]\" only uppercase ones.",
      "Common mistake: leaving out the ^. That removes the digits and keeps everything else."
    ],
    "syntax": [
      {
        "label": "Keep only the digits",
        "code": "{STRINGREPLACE[{B[Raw]}][\"[^0-9]\"][]}",
        "note": "The pattern is a regular expression. Writing it in double quotes is shown in the linked video; the manual does not give an example."
      },
      {
        "label": "Keep only the letters",
        "code": "{STRINGREPLACE[{B[Raw]}][\"[^a-zA-Z]\"][]}"
      }
    ],
    "docs": [
      {
        "title": "String operations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/string_operations.htm"
      },
      {
        "title": "Specify values (wildcards, escaping)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/specifying_values.htm"
      }
    ],
    "answer": "I put the string in a Buffer and apply STRINGREPLACE with the pattern for 'not a digit', replacing every match with nothing. Only the digits remain, and a TBox Set Buffer step stores them. Changing the character class gives letters only in the same way.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Beginner",
    "source": {
      "title": "Tosca Scenario 7 | Tosca Interview Question of the Day 7 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=C9AcQzj13XU"
    }
  },
  {
    "id": 28,
    "question": "An Excel file contains a table of employees, and one cell in it has a red background. How do you verify that cell's background colour with Tosca?",
    "approach": [
      "Use the Excel modules from the Standard subset. No scanning is needed.",
      "Open the file with the Open Excel Workbook module (workbook name and full path), then describe the table with Define Excel Range: the worksheet, a range name and a data range with room to grow.",
      "In Excel Range Manipulation on that range, find the row with ActionMode Constraint on a column you know, such as the employee ID.",
      "On the target cell in that row, verify the BackgroundColor property against the RGB value of red, R=255, G=0, B=0. The word 'red' is not accepted.",
      "Close the workbook with the Close Excel Workbook module, and run once with a different colour value to prove the check can fail.",
      "Common mistake: comparing against a colour name, or leaving the workbook open so the next run cannot access the file."
    ],
    "syntax": [
      {
        "label": "Cell in the range, ActionMode Verify: red background",
        "code": ".BackgroundColor==R=255,G=0,B=0"
      }
    ],
    "docs": [
      {
        "title": "Excel Modules",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/engines_3.0/excel.htm"
      },
      {
        "title": "Using properties of controls",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
      }
    ],
    "answer": "I use the standard Excel modules: open the workbook, define the range, then in the range step locate the row with a Constraint on the employee ID and verify the BackgroundColor property of the cell. The expected value is the RGB code for red, 255, 0, 0, and I close the workbook at the end.",
    "topic": "TBox",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Scenario 8 | Tosca Interview Question of the Day 8 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=EJiQbFdihUI"
    }
  },
  {
    "id": 29,
    "question": "A TestStep value contains a Buffer inside a Buffer, for example {B[{B[Env]}]}. What does Tosca return, and when does the step fail?",
    "approach": [
      "Tosca resolves nested expressions from the inside out, so it reads the inner Buffer, Env, first.",
      "Say Env holds the text QA. The expression then becomes {B[QA]}.",
      "Tosca now looks for a Buffer named QA and returns its value, for example the QA URL.",
      "If no Buffer with that name exists, the step fails with a 'buffer not found' error that names the missing Buffer.",
      "Check the result before running with Translate value, and look up the existing Buffers in the Buffer viewer.",
      "Common mistake: expecting the value of the inner Buffer as the result. That value is only used as the name of the next Buffer."
    ],
    "syntax": [
      {
        "label": "Nested Buffer",
        "code": "{B[{B[Env]}]}"
      },
      {
        "label": "With Env = QA it resolves to",
        "code": "{B[QA]}"
      }
    ],
    "docs": [
      {
        "title": "Text expressions (Buffer, XBuffer, CP)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
      }
    ],
    "answer": "Tosca evaluates the inner Buffer first and uses its value as the name of a second Buffer. If a Buffer with that name exists, its value is returned; if not, the step fails with a buffer-not-found error. It is a way to look up a Buffer whose name is only known at runtime.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Beginner",
    "source": {
      "title": "Tosca Scenario 9 | Tosca Interview Question of the Day 9 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=u_7_yEUyUwI"
    }
  },
  {
    "id": 30,
    "question": "An amount such as 55.76543 comes back with a varying number of decimals. You need it in a Buffer with exactly two decimal places. How do you do that?",
    "approach": [
      "Use a calculation expression. MATH is built into Tosca. CALC passes the formula to Microsoft Excel, so Excel must be installed on the machine that runs the test.",
      "Cut after two decimals with {MATH[Truncate({B[Amount]}*100)/100]}, or with Excel's function: {CALC[TRUNC({B[Amount]},2)]}. 55.76543 becomes 55.76.",
      "If the rule is rounding, use {MATH[Round({B[Amount]},2)]}, which gives 55.77.",
      "Store the result with TBox Set Buffer and reuse it as {B[AmountShort]}.",
      "Decide whether the business rule is cutting or rounding before you choose the expression.",
      "Common mistake: treating the number as text and cutting characters by position. That breaks as soon as the digits before the decimal point change."
    ],
    "syntax": [
      {
        "label": "Round to two decimals",
        "code": "{MATH[Round({B[Amount]},2)]}"
      },
      {
        "label": "Cut to two decimals",
        "code": "{MATH[Truncate({B[Amount]}*100)/100]}"
      },
      {
        "label": "Cut with the Excel function (Microsoft Excel must be installed)",
        "code": "{CALC[TRUNC({B[Amount]},2)]}"
      }
    ],
    "docs": [
      {
        "title": "Perform calculations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/calculations.htm"
      }
    ],
    "answer": "I use a calculation expression on the buffered value. MATH with Truncate or Round works without Excel, and CALC with TRUNC does the same through Excel. I store the result with TBox Set Buffer. Whether to cut or to round depends on the business rule, so I check that first.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Beginner",
    "source": {
      "title": "Tosca Scenario 10 | Tosca Interview Question of the Day 10 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=JLo68t1HNmo"
    }
  },
  {
    "id": 31,
    "question": "An amount is displayed in European format, 45.000,00. A later step needs it as a plain number without the thousands separator. How do you convert it?",
    "approach": [
      "Capture the displayed value in a Buffer, for example Amount.",
      "Remove the thousands separator first. The pattern is a regular expression, so the dot has to be escaped: {STRINGREPLACE[{B[Amount]}][\\.][]} turns 45.000,00 into 45000,00.",
      "Wrap a second STRINGREPLACE around it to turn the decimal comma into a point: {STRINGREPLACE[{STRINGREPLACE[{B[Amount]}][\\.][]}][,][.]} returns 45000.00.",
      "Store the result with TBox Set Buffer and check it with Translate value.",
      "Common mistake: writing the dot unescaped, which as a regular expression matches every character, or removing every non-digit in one go. Either way the value is wrong."
    ],
    "syntax": [
      {
        "label": "45.000,00 becomes 45000.00",
        "code": "{STRINGREPLACE[{STRINGREPLACE[{B[Amount]}][\\.][]}][,][.]}",
        "note": "The pattern is a regular expression, so the dot that should be removed is escaped with a backslash."
      },
      {
        "label": "First step alone: remove the thousands dots",
        "code": "{STRINGREPLACE[{B[Amount]}][\\.][]}"
      }
    ],
    "docs": [
      {
        "title": "String operations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/string_operations.htm"
      }
    ],
    "answer": "I convert it in two steps with STRINGREPLACE: first remove the dots that separate thousands, then change the decimal comma into a point. I do not simply strip all special characters, because that also removes the decimal separator and changes the value.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Scenario 11 | Tosca Interview Question of the Day 11 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=Sh8KL5bH-jo"
    }
  },
  {
    "id": 32,
    "question": "A step needs the name of the TestCase that is currently running, for example to write it into a log or a field. How do you get it into a Buffer?",
    "approach": [
      "Add the TBox Name To Buffer module from the Standard subset to the TestCase.",
      "Enter the name of the Buffer that should receive the name, for example TestCaseName.",
      "Run the TestCase from an ExecutionList. The Buffer then holds the name of the entry as it appears there.",
      "Reuse it in later steps with {B[TestCaseName]} and check it in the Buffer viewer.",
      "Common mistake: trying it in the ScratchBook. The Buffer does not contain the real TestCase name there, so the module looks broken when it is not."
    ],
    "syntax": [
      {
        "label": "TBox Name To Buffer: attribute Buffer, ActionMode Input",
        "code": "TestCaseName"
      },
      {
        "label": "Reuse the name in a later step",
        "code": "{B[TestCaseName]}"
      }
    ],
    "docs": [
      {
        "title": "Buffer Operations",
        "url": "https://docs.tricentis.com/tosca-2023.1/en-us/content/standard_subset/automation_tools/buffer_operations.htm"
      },
      {
        "title": "Text expressions (Buffer, XBuffer, CP)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
      }
    ],
    "answer": "I use the TBox Name To Buffer module and give it a Buffer name. It returns the real name only when the TestCase runs from an ExecutionList, not in the ScratchBook. After that the name is available like any other Buffer.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Beginner",
    "source": {
      "title": "Tosca Scenario 12 | Tosca Interview Question of the Day 12 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=ouIalUFvJ-Q"
    }
  },
  {
    "id": 33,
    "question": "Five browser tabs with the same title are open. You must click the Register button in the third tab, but the step fails because Tosca cannot tell the tabs apart. How do you steer the right one?",
    "approach": [
      "Understand the failure: the Module's identification matches all five tabs, so there is no unique target.",
      "Check first whether the tabs differ in anything stable, such as the URL. If they do, identify the Module by that.",
      "If they are identical, add the configuration parameter ConstraintIndex on the Module itself.",
      "Set it to 3 to steer the third matching tab. The click then goes to that tab.",
      "To avoid a fixed number, fill a Buffer at the start of the TestCase and use it as the index.",
      "Common mistake: adding the parameter to the button's ModuleAttribute. It belongs on the Module, because the ambiguity is between windows, not between controls."
    ],
    "syntax": [
      {
        "label": "Configuration parameter on the Module: third matching tab",
        "code": "ConstraintIndex = 3",
        "note": "Using it on a Module to pick one of several tabs is shown in the linked video. The manual describes ConstraintIndex for controls."
      },
      {
        "label": "Index taken from a Buffer",
        "code": "ConstraintIndex = {B[TabIndex]}"
      }
    ],
    "docs": [
      {
        "title": "Properties for XModules (parameters)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
      }
    ],
    "answer": "When several tabs match the same Module, I add the ConstraintIndex configuration parameter at Module level and set it to the position of the tab I want, here 3. If the index varies, I pass it from a Buffer. If the tabs differ by URL or title, I prefer identifying the Module by that.",
    "topic": "Steering dynamic controls",
    "difficulty": "Advanced",
    "source": {
      "title": "Tosca Scenario 13 | Tosca Interview Question of the Day 13 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=HJPTAq6wQKY"
    }
  },
  {
    "id": 34,
    "question": "Four browser tabs with the same title are open. How do you close only the second tab?",
    "approach": [
      "Use the TBox Send Keys module from the Standard subset, which sends keyboard shortcuts to a window.",
      "Set Caption to the window title with a wildcard, for example Demo*, so it matches whatever follows the first word.",
      "Send ^(2) as the keys. ^ stands for Ctrl, so this is Ctrl+2 and the browser switches to the second tab.",
      "Add a second TBox Send Keys step with the same caption and the keys ^(w). That is Ctrl+W, which closes the active tab.",
      "Verify afterwards that the expected page is in front before the test continues.",
      "Common mistake: sending only Ctrl+W. It closes whichever tab happens to be active, not the second one."
    ],
    "syntax": [
      {
        "label": "TBox Send Keys: Caption",
        "code": "Demo*"
      },
      {
        "label": "Keys: switch to the second tab (Ctrl+2)",
        "code": "^(2)"
      },
      {
        "label": "Keys: close the active tab (Ctrl+W)",
        "code": "^(w)"
      }
    ],
    "docs": [
      {
        "title": "Basic Windows Operations (TBox Send Keys)",
        "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/standard_subset/automation_tools/windows_operations.htm"
      }
    ],
    "answer": "I use TBox Send Keys twice on the browser window, matched by caption with a wildcard. The first step sends Ctrl+2 to switch to the second tab, the second sends Ctrl+W to close it. Switching first matters, because Ctrl+W alone closes whatever tab is active.",
    "topic": "TBox",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Scenario 14 | Tosca Interview Question of the Day 14 (Tosca 100+ Real Time Scenarios Series)",
      "url": "https://www.youtube.com/watch?v=olP977IAowo"
    }
  },
  {
    "id": 35,
    "question": "You join a project where the whole team works on one shared Tosca repository. How do you create your workspace, and how does that differ from creating one just for yourself?",
    "approach": [
      "Start Tosca Commander and choose to create a new workspace.",
      "For work on your own, create a single-user workspace: give it a name and a path, and keep 'Use workspace template' ticked so the Standard subset is imported.",
      "For the team project, select the type of the common repository instead (most often MS SQL Server) and enter the connection string with server, database, user and password. Use Test connection before you continue.",
      "Name the workspace according to the team's convention. There is no template option here, because the Standard subset already lives in the common repository.",
      "Tick 'Create slim workspace' if the repository is large. Objects with a high data volume are then not copied down, which makes the workspace faster to create.",
      "Common mistake: creating a single-user workspace on a team project. Your work then exists only on your machine and nobody else can see it."
    ],
    "answer": "For a team project I create a multi-user workspace: I choose the repository type, enter the connection string to the common repository and test the connection. A single-user workspace needs only a name and path plus the workspace template. For a large repository I create a slim workspace to keep it fast.",
    "topic": "Multi-user workspaces",
    "difficulty": "Beginner",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #1 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=pwk6Z5Vr1cU"
    }
  },
  {
    "id": 36,
    "question": "Before a test starts, browser windows and tabs from earlier runs are still open and interfere with it. How do you close every instance of the browser in one step?",
    "approach": [
      "Use the TBox Start Program module from the Standard subset. It can run any program, including Windows commands.",
      "Set Path to taskkill.",
      "Add the arguments /F (force), /IM (by image name) and the browser's process name: chrome.exe, msedge.exe or firefox.exe.",
      "Set the wait-for-exit option to True with a short timeout, so the next step starts only when the browsers are really gone.",
      "Put the step into a reusable precondition block or the CleanUp scenario so every TestCase starts from a clean state.",
      "Common mistake: using the wrong process name. Killing chrome.exe does nothing to Edge, so the name has to match the browser under test."
    ],
    "syntax": [
      {
        "label": "TBox Start Program: Path",
        "code": "taskkill"
      },
      {
        "label": "Arguments->Argument, one value per sub-attribute",
        "code": "/F\n/IM\nchrome.exe"
      },
      {
        "label": "Wait until it has finished (TimeoutForExit is in seconds)",
        "code": "WaitforExit = True\nTimeoutForExit = 20"
      },
      {
        "label": "The same as a Windows command",
        "code": "taskkill /F /IM chrome.exe"
      },
      {
        "label": "Process names of other browsers",
        "code": "msedge.exe\nfirefox.exe"
      }
    ],
    "docs": [
      {
        "title": "Process Operations (TBox Start Program)",
        "url": "https://docs.tricentis.com/tosca-2023.1/en-us/content/standard_subset/automation_tools/process_operations.htm"
      }
    ],
    "answer": "I run the Windows taskkill command through TBox Start Program, with /F /IM and the browser's process name, and wait for it to exit. That closes all windows and tabs of that browser at once. I keep it in a shared precondition or cleanup step, and I remember it also closes any browser windows I had open for other work.",
    "topic": "Recovery and cleanup scenarios",
    "difficulty": "Beginner",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #3 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=XqSPXkPeBkw"
    }
  },
  {
    "id": 37,
    "question": "In XScan a Username field is reported as not unique, and none of its own properties can make it unique. The Login button next to it is unique. How do you identify the field?",
    "approach": [
      "Select the field in XScan and switch its identification method from properties to Identify by Anchor.",
      "Choose a nearby control that is unique and stable as the anchor, here the Login button. Pick it on screen or drag it from the control tree onto the anchor slot.",
      "Leave the relative search algorithm on Auto unless you have a reason to change it.",
      "Check that XScan now reports the field as unique, then save. An anchor symbol marks controls identified this way.",
      "Run a quick input on the field from the ScratchBook to confirm that the right control is steered.",
      "Common mistake: choosing an anchor that is itself unstable, or using an anchor when a stable property was available. Try properties first."
    ],
    "answer": "When a control cannot be made unique by its own properties, I identify it by anchor. I pick a unique, stable neighbour such as the Login button, and Tosca finds my field relative to it. I only do this after checking that no stable property exists, because properties remain the most robust method.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Intermediate",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #5 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=uEsZo-QOAVg"
    }
  },
  {
    "id": 38,
    "question": "A control cannot be identified by its properties or by an anchor, for example because it is drawn as a picture. How do you steer it with image-based identification, and what are the risks?",
    "approach": [
      "Either choose Identify by Image for the control in XScan, or right-click a Module folder and create an image-based control directly.",
      "Capture the control image: drag a frame around the area you want to act on and set its type (button, text box or generic).",
      "Capture the identifying image: an area that is always visible and tells Tosca where the control is. It does not have to be the control itself.",
      "If small rendering differences cause misses, lower the required accuracy somewhat, for example to around 80 percent.",
      "Run it from the ScratchBook on the kind of machine that will execute it, because resolution and scaling change what the image looks like.",
      "Common mistake: using images as the first choice. It is the slowest and least reliable method, so keep it for cases where properties and anchors fail."
    ],
    "answer": "Image-based identification needs two pictures: the control image I act on and an identifying image that locates it. It depends on resolution, scaling and rendering, and it runs slower, so I lower the accuracy a little to make it tolerant and use it only when properties and anchor identification are not possible.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Intermediate",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #6 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=_GzZi310QyI"
    }
  },
  {
    "id": 39,
    "question": "A page shows two identical input fields with the same properties and no stable neighbour to anchor on. How do you make sure Tosca steers the right one?",
    "approach": [
      "In XScan, select the field and confirm that it really cannot be made unique by properties.",
      "Switch the identification to Identify by Index. XScan shows how many matching controls exist, for example 1 of 2.",
      "Pick the position of the control you want. XScan then reports it as unique and marks it with a hash symbol.",
      "Give the ModuleAttribute a clear name, such as Username_second, so the TestStep stays readable.",
      "Re-check the Module after every release, because an added or removed control shifts the positions.",
      "Common mistake: choosing index first because it is quick. The order of preference is properties, then anchor, then image, and index only when nothing else is possible."
    ],
    "answer": "If two controls are truly identical, I identify the one I need by index, which is its position among the matching controls. It works, but it is the least stable method because any layout change shifts the positions. So I use it only after properties, anchor and image have been ruled out, and I re-check it after releases.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Beginner",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #7 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=_MRHslJ5M_M"
    }
  },
  {
    "id": 40,
    "question": "A TestStep that clicks the Login button is reported as passed, but the button is never actually clicked. The Module shows the control as unique. How do you find the cause?",
    "approach": [
      "Do not rely on the green result. Confirm on screen that the click has no effect, then jump to the Module and rescan the page.",
      "Check that each control is still reported as unique. Here they are, so identification is not the problem.",
      "Use Highlight in XScan. If the frame is drawn beside the control instead of on it, Tosca is calculating the wrong position.",
      "Check the browser zoom. It must be 100 percent, the same as when the Module was scanned.",
      "Check the Windows display scaling too and set it to 100 percent, then reload the page and run again.",
      "Common mistake: changing identification properties or rescanning everything when the real cause is a zoom or scaling setting on the machine."
    ],
    "answer": "I rescan and use Highlight to see where Tosca thinks the control is. If the highlight is offset, the cause is usually the browser zoom or the Windows display scaling not being at 100 percent. Setting both back to 100 percent fixes it without touching the Module.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Intermediate",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #8 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=sExCYge3G8s"
    }
  },
  {
    "id": 41,
    "question": "A registration form needs a different value in the Username field on every run. Depending on the rules it must be digits only, mixed characters, or letters only. Which expressions do you use?",
    "approach": [
      "For a random number, use {RND[5]}. The number in brackets is how many digits you get.",
      "For random characters, use {RANDOMTEXT[6]}. The result mixes letters and digits.",
      "For letters only, use {RANDOMREGEX[\"^[A-Z]{6}$\"]}. Change the class to [A-Za-z] to allow lowercase as well.",
      "After typing an expression, click outside the cell. Tosca shows a recognised expression in its own formatting; if it stays plain text, the syntax is wrong.",
      "If the value is needed again, for example to log in with the new user, generate it once with TBox Set Buffer and reuse the Buffer.",
      "Common mistake: expecting the same value in two places. Every use of the expression produces a new random value."
    ],
    "syntax": [
      {
        "label": "Random number with five digits",
        "code": "{RND[5]}"
      },
      {
        "label": "Random letters and digits, six characters",
        "code": "{RANDOMTEXT[6]}"
      },
      {
        "label": "Letters only, six characters",
        "code": "{RANDOMREGEX[\"^[A-Z]{6}$\"]}"
      }
    ],
    "docs": [
      {
        "title": "Random values",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/random_values.htm"
      },
      {
        "title": "Regular expressions",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/regular_expressions.htm"
      }
    ],
    "answer": "Tosca has built-in random expressions: RND for a number with a given count of digits, RANDOMTEXT for mixed characters, and RANDOMREGEX when the value has to follow a pattern such as letters only. If I need the generated value again later, I store it in a Buffer first.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Beginner",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #9 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=spzrIQsXBbA"
    }
  },
  {
    "id": 42,
    "question": "A customer's first name is shown on a Customers page. The test must read it and type it into the First Name field of the Add Customer form on another page. How do you do it?",
    "approach": [
      "Scan the element that shows the name, and the form fields, as Modules.",
      "In the TestStep on the first page, set the name element to ActionMode Buffer and enter a Buffer name as its value, for example CustomerName.",
      "Add the steps that navigate to the Add Customer page.",
      "In the form step, set First Name to ActionMode Input with the value {B[CustomerName]}. The same Buffer can feed more than one field.",
      "If the wrong text arrives, check the stored value in the Buffer viewer.",
      "Common mistake: typing only the Buffer name in the second step, without {B[...]}. The literal word is then entered instead of the stored value."
    ],
    "syntax": [
      {
        "label": "First page: name element, ActionMode Buffer (the value is the Buffer name)",
        "code": "CustomerName"
      },
      {
        "label": "Second page: First Name field, ActionMode Input",
        "code": "{B[CustomerName]}"
      }
    ],
    "docs": [
      {
        "title": "ActionModes",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
      },
      {
        "title": "Text expressions (Buffer, XBuffer, CP)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
      }
    ],
    "answer": "I use a Buffer. On the first page the element gets ActionMode Buffer with a name, which stores its text at runtime. On the second page I enter the value with ActionMode Input and the B syntax. The Buffer stays available for the rest of the run, so I can reuse it in other fields.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Beginner",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #10 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=ao2dw4vu-mg"
    }
  },
  {
    "id": 43,
    "question": "A shopping cart lists the products the user picked, each with its own Remove button. The products differ on every run, and you must always remove the second one. How do you steer that button?",
    "approach": [
      "Scan one Remove button in XScan and take the product-specific ID out of its identification, since it changes with the product.",
      "Identify it by what all Remove buttons share, such as InnerText and Tag. It no longer needs to be unique.",
      "On that ModuleAttribute, create the configuration parameter ExplicitName with the value True.",
      "In the TestStep the value can now be renamed. Name it #2 to address the second matching button, and set the action to click.",
      "Change the number, or take it from a Buffer, to remove a different position. The step works whatever the products are.",
      "Common mistake: leaving the product ID in the identification. The step then works only for the product that was in the cart during scanning."
    ],
    "syntax": [
      {
        "label": "Configuration parameter on the Remove button's ModuleAttribute",
        "code": "ExplicitName = True"
      },
      {
        "label": "Name of the TestStepValue: second matching button",
        "code": "#2"
      },
      {
        "label": "Value: ActionMode Input",
        "code": "{CLICK}"
      }
    ],
    "docs": [
      {
        "title": "Properties for XModules (parameters)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
      },
      {
        "title": "Table",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/type_table.htm"
      },
      {
        "title": "Click operations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/click_operations.htm"
      }
    ],
    "answer": "I scan one Remove button, identify it only by properties that all Remove buttons share, and add ExplicitName = True. In the TestStep I name the value #2, so Tosca clicks the second matching button regardless of which products are in the cart.",
    "topic": "Steering dynamic controls",
    "difficulty": "Intermediate",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #12 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=-YCTaG8ic3A"
    }
  },
  {
    "id": 44,
    "question": "A website triggers a browser dialog such as 'Allow this site to know your location?'. XScan does not show the dialog's buttons when you scan the page. How do you handle it?",
    "approach": [
      "Recognise why: the dialog belongs to the browser itself, not to the web page, so the HTML engine cannot see it.",
      "Start the scan from the application list, right-click the browser window and choose the UIA engine instead of HTML.",
      "Select the dialog's buttons (Allow, Block, Close) and save them as their own Module.",
      "In the TestCase, add a step on that Module that clicks the button you need, before the steps that work on the page.",
      "The same approach works for other browser-level prompts, such as the 'Restore pages' message.",
      "Common mistake: trying different identification properties in the HTML scan. The control is simply not part of the HTML document."
    ],
    "answer": "Browser-level dialogs are not part of the page's HTML, so I scan them with the UIA engine instead of the HTML engine. That gives me the Allow and Block buttons as a separate Module, and I add a step that clicks the right one before the test continues on the page.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Intermediate",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #13 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=p8mvFjryvAY"
    }
  },
  {
    "id": 45,
    "question": "A test must start the browser in incognito (private) mode. How do you launch it that way from Tosca?",
    "approach": [
      "Use the TBox Start Program module from the Standard subset instead of the usual Open Url step.",
      "Set Path to the browser's executable, for example the full path to chrome.exe.",
      "Add --incognito as an argument (Edge uses --inprivate).",
      "Add the start URL as a further argument, in double quotes, so the browser opens the application directly.",
      "Allow the Tosca browser extension in incognito windows, otherwise the page opens but the following steps may not be able to steer it.",
      "Common mistake: putting the switch into the Path field. Path takes only the executable; switches belong in the arguments."
    ],
    "syntax": [
      {
        "label": "TBox Start Program: Path",
        "code": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      },
      {
        "label": "Arguments->Argument",
        "code": "--incognito\n\"https://your-application-url\""
      },
      {
        "label": "Edge uses this switch",
        "code": "--inprivate"
      }
    ],
    "docs": [
      {
        "title": "Process Operations (TBox Start Program)",
        "url": "https://docs.tricentis.com/tosca-2023.1/en-us/content/standard_subset/automation_tools/process_operations.htm"
      }
    ],
    "answer": "I start the browser with TBox Start Program: the path points to the browser executable, and the arguments carry the incognito switch and the URL. I also make sure the Tosca extension is allowed in private windows so the later steps can work on the page.",
    "topic": "TBox",
    "difficulty": "Beginner",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #14 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=ha3nqwNnAbI"
    }
  },
  {
    "id": 46,
    "question": "Within a single TestCase, one part must run in Chrome and the next part in Edge. How do you switch the browser in the middle of a TestCase?",
    "approach": [
      "The browser is chosen by the Browser Test Configuration Parameter, which normally holds one fixed value for the whole TestCase.",
      "Replace the fixed value with a Buffer: set the Browser parameter to {B[Browser]}.",
      "Before the first part, add a TBox Set Buffer step that sets Browser to Chrome.",
      "Before the second part, add another TBox Set Buffer step that sets it to Edge. Each part then opens in the browser set just before it.",
      "For ordinary cross-browser testing, prefer running the unchanged TestCase from several ExecutionLists, each with its own Browser value.",
      "Common mistake: placing the Set Buffer step after the steps it should affect. The Buffer has to be filled before the browser is opened."
    ],
    "syntax": [
      {
        "label": "Browser Test Configuration Parameter",
        "code": "Browser = {B[Browser]}",
        "note": "Shown working in the linked video. The manual does not cover this case, so try it in your version."
      },
      {
        "label": "TBox Set Buffer before the first part",
        "code": "Browser = Chrome"
      },
      {
        "label": "TBox Set Buffer before the second part",
        "code": "Browser = Edge"
      }
    ],
    "docs": [
      {
        "title": "XBrowser Engine 3.0",
        "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/engines_3.0/xbrowser/xbrowser.htm"
      },
      {
        "title": "Buffer Operations",
        "url": "https://docs.tricentis.com/tosca-2023.1/en-us/content/standard_subset/automation_tools/buffer_operations.htm"
      }
    ],
    "answer": "I set the Browser configuration parameter to a Buffer instead of a fixed value, and change that Buffer with TBox Set Buffer before each part of the TestCase. In a real project I would rather run the same TestCase from separate ExecutionLists with different Browser values, but this shows the parameter can be driven at runtime.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Intermediate",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #15 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=MTOH3Pcy5Fc"
    }
  },
  {
    "id": 47,
    "question": "In a multi-user workspace an ExecutionList can be checked out by only one person, but three testers must run different parts of it at the same time and the lead wants one combined result. How do you organise this?",
    "approach": [
      "Use TestMandates. A TestMandate holds a share of an ExecutionList's entries that one tester can run independently.",
      "In the Execution section, create a TestMandate for each tester.",
      "Drag the entries each person should run from the ExecutionList onto their TestMandate. A small icon on the entry shows that it is linked.",
      "Each tester checks out and runs only their own TestMandate, so nobody waits for the ExecutionList.",
      "The results flow back to the linked entries, so the lead sees the overall status in the original ExecutionList.",
      "Common mistake: copying the ExecutionList for each tester. That produces separate result sets and no single place to see the status."
    ],
    "answer": "I split the work with TestMandates. Each tester gets a TestMandate containing their share of the ExecutionList's entries and runs it independently, while the results are written back to the original ExecutionList. The lead can then follow the whole run in one place without anyone blocking the list.",
    "topic": "Execution lists and DEX",
    "difficulty": "Intermediate",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #17 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=pczeZ7bGsQ0"
    }
  },
  {
    "id": 48,
    "question": "After clicking a link you must verify that the browser has navigated to the correct URL. The address bar is not part of the web page, so how do you check it?",
    "approach": [
      "The address bar is browser UI, so scan the browser window with the UIA engine instead of HTML and select the address and search bar.",
      "In the Module, replace the page-specific part of the window title with a wildcard (*), so the same Module works on every page.",
      "Verify the property that holds the address, typically Text, with ActionMode Verify.",
      "The bar often shows a shortened address without https:// or www. To compare the full URL, double-click the bar first, buffer its text and compare it in TBox Evaluation Tool.",
      "Put the expected URL in quotes inside the Evaluation Tool expression, because characters such as : and / otherwise break the comparison.",
      "Common mistake: comparing against the full URL while the bar displays a shortened one, so a correct navigation is reported as a failure."
    ],
    "syntax": [
      {
        "label": "Address bar, ActionMode Verify",
        "code": ".Text==www.example.com/orders"
      },
      {
        "label": "TBox Evaluation Tool, Expression: strings go in single quotes",
        "code": "'{B[Url]}' == 'https://www.example.com/orders'"
      }
    ],
    "docs": [
      {
        "title": "Using properties of controls",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
      },
      {
        "title": "Expression Evaluation",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/automation_tools/expression_evaluation.htm"
      }
    ],
    "answer": "I scan the browser's address bar with the UIA engine, because it is not part of the HTML page, and make the Module's title generic with a wildcard. Then I verify its Text property. If I need the complete URL including the protocol, I double-click the bar, buffer the text and compare it in TBox Evaluation Tool with the expected value in quotes.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Intermediate",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #18 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=4zq93SBjdX4"
    }
  },
  {
    "id": 49,
    "question": "A verification fails in the middle of a TestCase, the remaining steps are skipped, and the browser stays open and disturbs the next TestCase. How do you make the remaining steps run?",
    "approach": [
      "Identify the failure type first: a verification failure (expected and actual differ) or a dialog failure (Tosca could not steer the control).",
      "Add the matching Test Configuration Parameter on the TestCase or a folder above it: OnVerificationFailure or OnDialogFailure.",
      "Set its value to Continue. The other choices move on to the next TestCase or start recovery.",
      "Run again and check in the log that the steps after the failed one, such as Close Browser, were executed while the TestCase is still reported as failed.",
      "For closing the application reliably, also consider a CleanUp scenario, which does not depend on the rest of the TestCase running.",
      "Common mistake: setting Continue for dialog failures everywhere. After a missing control the following steps usually fail too and only add noise."
    ],
    "syntax": [
      {
        "label": "Test Configuration Parameter for verification failures",
        "code": "OnVerificationFailure = Continue"
      },
      {
        "label": "Test Configuration Parameter for dialog failures",
        "code": "OnDialogFailure = Continue"
      },
      {
        "label": "Other allowed values",
        "code": "Execute next TestCase\nHalt execution\nRecover"
      }
    ],
    "docs": [
      {
        "title": "Configure error handling",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/exceptions.htm"
      }
    ],
    "answer": "I add the Test Configuration Parameter for that failure type, here the one for verification failures, and set it to Continue. Tosca then logs the failure and carries on with the remaining steps, so the browser is still closed at the end. For dialog failures I am more careful and rely on recovery and cleanup scenarios.",
    "topic": "Recovery and cleanup scenarios",
    "difficulty": "Intermediate",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #19 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=SKKidnlDdFY"
    }
  },
  {
    "id": 50,
    "question": "A web table has an Age column and the number of rows varies. How do you find the highest age in that column with Tosca?",
    "approach": [
      "Scan the table as one Table control and buffer its RowCount. It includes the header row.",
      "With TBox Set Buffer, set a Buffer Highest to 0 and a counter to 2, because row #1 is the header.",
      "Create a While statement whose condition is a TBox Evaluation Tool step: {B[Count]} <= {B[Rows]}.",
      "In the loop, buffer the Age cell of row #{B[Count]} into Current. With an If statement and TBox Evaluation Tool, check {B[Current]} > {B[Highest]} and, when true, set Highest to {B[Current]}.",
      "At the end of each pass, raise the counter with TBox Set Buffer and {MATH[{B[Count]}+1]}. If the table has empty rows at the bottom, also require in the condition that the Age cell is not empty.",
      "Common mistake: comparing only neighbouring rows and storing the larger of each pair. The last pair then overwrites a higher value found earlier."
    ],
    "syntax": [
      {
        "label": "While condition (TBox Evaluation Tool, Expression)",
        "code": "{B[Count]} <= {B[Rows]}"
      },
      {
        "label": "Row to read in each pass",
        "code": "#{B[Count]}"
      },
      {
        "label": "If condition (TBox Evaluation Tool, Expression)",
        "code": "{B[Current]} > {B[Highest]}"
      },
      {
        "label": "Raise the counter (TBox Set Buffer)",
        "code": "{MATH[{B[Count]}+1]}"
      }
    ],
    "docs": [
      {
        "title": "Expression Evaluation",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/automation_tools/expression_evaluation.htm"
      },
      {
        "title": "Conditional statements and loops",
        "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/conditional_statements.htm"
      },
      {
        "title": "Table",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/type_table.htm"
      },
      {
        "title": "Perform calculations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/calculations.htm"
      }
    ],
    "answer": "I loop over the rows with a While statement and keep a running maximum in a Buffer. Each pass reads the Age cell of the current row, compares it with the stored maximum in TBox Evaluation Tool and replaces it if it is larger, then increases the counter with a MATH expression. The loop ends at the row count or at the first empty row.",
    "topic": "TBox",
    "difficulty": "Advanced",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #20 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=mhvUUDaeUZY"
    }
  },
  {
    "id": 51,
    "question": "A Module contains four separate links (or radio buttons), and each TestCase uses exactly one of them. The TestSteps look cluttered. How can you offer them as a single choice?",
    "approach": [
      "Scan the links as usual, so each one is a ModuleAttribute.",
      "In the Module, select the related attributes together, right-click and convert them to a ControlGroup. Give the group a clear name.",
      "In the TestStep the group appears as one line, and its value is a dropdown listing the members. Pick the one to click.",
      "ControlGroups can be built from links, buttons and radio buttons.",
      "Fewer ActionModes are available on a group: Input and Verify, plus WaitOn for buttons. To undo it, convert the group back to separate attributes.",
      "Common mistake: grouping controls that a TestCase needs to use together in one step. A group lets you pick only one member per value."
    ],
    "answer": "I combine the related controls into a ControlGroup in the Module. In the TestStep they show up as one attribute with a dropdown of the members, which keeps the step short and readable. It works for links, buttons and radio buttons, with a limited set of ActionModes.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Beginner",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #21 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=SLW9VEr0a30"
    }
  },
  {
    "id": 52,
    "question": "A test clicks through the header menu of a website. On one of the pages the browser title changes, and the next click fails although the menu looks the same. How do you fix it?",
    "approach": [
      "Understand the cause: a web Module is first matched to the browser window by its Title. When the title changes, Tosca no longer finds the window and never gets as far as the control.",
      "Open the Module and look at the Title in its identification properties.",
      "If any title is acceptable, replace the changing part with a wildcard (*).",
      "If only certain titles are valid, use a regular expression that lists them separated by a pipe, for example {REGEX[\"MakeMyTrip.*|TripMoney.*\"]}.",
      "Run the flow again and confirm that the click works on both pages.",
      "Common mistake: scanning a second Module for the same menu under the other title. That doubles the maintenance for one set of controls."
    ],
    "syntax": [
      {
        "label": "Title of the Module: any ending",
        "code": "MakeMyTrip*"
      },
      {
        "label": "Title of the Module: one of several titles",
        "code": "{REGEX[\"MakeMyTrip.*|TripMoney.*\"]}"
      }
    ],
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
    "answer": "The Module identifies the window by its title, so a title change breaks every control in it. I make the Title property tolerant, with a wildcard or with a regular expression that accepts each valid title separated by a pipe. One Module then works on all the pages that share the menu.",
    "topic": "Steering dynamic controls",
    "difficulty": "Intermediate",
    "source": {
      "title": "Crack the Code: TOSCA Interview Question #22 | Real-Time Scenario-Based Insights",
      "url": "https://www.youtube.com/watch?v=RfuH9gXBnH8"
    }
  },
  {
    "id": 53,
    "question": "A web table has a fixed number of rows and some are empty. As long as an empty row remains, the test must click Add, fill in the form and submit, which fills one more row. How do you automate this?",
    "approach": [
      "Scan the table together with the Add button, and the registration form, as Modules.",
      "Create a While statement. In its condition, verify one cell of the last row: address the row as $last, pick a column such as First Name, and verify that it is empty.",
      "Inside the loop, click Add, fill the form fields and click Submit.",
      "The loop repeats while the last row is empty and stops on the first pass where that verification fails. This final failed condition is expected and does not fail the TestCase.",
      "Raise the While statement's maximum repetitions if more than 30 passes could be needed, since 30 is the default limit.",
      "Common mistake: counting the empty rows beforehand and hard-coding the number of passes. The count changes with the data."
    ],
    "syntax": [
      {
        "label": "Row to check in the While condition",
        "code": "$last"
      },
      {
        "label": "Property of the While statement; the default is 30",
        "code": "MaximumRepetitions = 50"
      },
      {
        "label": "Related row keywords",
        "code": "$firstEmptyRow\n$lastContentRow"
      }
    ],
    "docs": [
      {
        "title": "Table",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/type_table.htm"
      },
      {
        "title": "Conditional statements and loops",
        "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/conditional_statements.htm"
      }
    ],
    "answer": "I use a While statement whose condition checks whether the last row of the table, addressed with $last, is still empty. While it is, the loop clicks Add, fills the form and submits. It stops by itself once the last row has data, and I raise the maximum repetitions if the table could need more than the default 30 passes.",
    "topic": "Steering dynamic controls",
    "difficulty": "Advanced",
    "source": {
      "title": "How to Fill Data in Empty Rows of a Table Automatically | TOSCA Real Time interview Question #23",
      "url": "https://www.youtube.com/watch?v=edFHtaW-Au8"
    }
  },
  {
    "id": 54,
    "question": "A number is stored in a Buffer. The test must decide whether it is odd or even and continue differently in each case. How do you build that check?",
    "approach": [
      "Create an If statement in the TestCase.",
      "In its Condition, use the TBox Evaluation Tool module.",
      "Divide by two and look at the remainder with the modulo operator, wrapped in a MATH expression: {MATH[{B[Number]}%2]} == 0.",
      "Put the steps for an even number in Then and add an Else branch for the odd case. If you only need the result, store it there with TBox Set Buffer.",
      "Try it with one odd and one even value and check the outcome in the Buffer viewer.",
      "Common mistake: writing {B[Number]}%2 without MATH. Arithmetic is calculated only inside a MATH expression."
    ],
    "syntax": [
      {
        "label": "Condition (TBox Evaluation Tool, Expression): true for an even number",
        "code": "{MATH[{B[Number]}%2]} == 0"
      }
    ],
    "docs": [
      {
        "title": "Expression Evaluation",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/automation_tools/expression_evaluation.htm"
      },
      {
        "title": "Perform calculations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/calculations.htm"
      }
    ],
    "answer": "I use an If statement with TBox Evaluation Tool as the condition. The expression takes the Buffer modulo 2 inside a MATH expression and compares the remainder with zero. Zero means even and goes to the Then branch; anything else is odd and goes to Else.",
    "topic": "TBox",
    "difficulty": "Beginner",
    "source": {
      "title": "TOSCA Interview Q#23 - Check if Number is ODD or EVEN (Real-Time Example)",
      "url": "https://www.youtube.com/watch?v=ZhVVa5I81lo"
    }
  },
  {
    "id": 55,
    "question": "On a web page you must count all links, read each link's text and URL, and write them into an Excel file. How do you do this without scanning every link?",
    "approach": [
      "Scan one link and reduce its identification to what every link shares, the Tag A. It is deliberately not unique.",
      "Read the ResultCount property of that attribute with ActionMode Buffer. This gives the number of links on the page.",
      "Add ExplicitName = True to the attribute. Put the reading steps in a TestStep folder and set the folder's Repetition to the buffered count.",
      "Inside the folder, name the value #{REPETITION} so each pass addresses the next link, and buffer InnerText and Href into Buffers that also carry {REPETITION} in their names.",
      "Write each pair with the standard Excel modules: open the workbook, define a range, and in the range step input the two Buffers into row #{REPETITION}, columns #1 and #2. Save when closing.",
      "Common mistake: using one fixed Buffer name inside the loop. Each pass overwrites the previous value and only the last link survives."
    ],
    "syntax": [
      {
        "label": "Number of links: link attribute, ActionMode Buffer",
        "code": "LinkCount=.ResultCount"
      },
      {
        "label": "Configuration parameter on the link's ModuleAttribute",
        "code": "ExplicitName = True"
      },
      {
        "label": "Repetition of the TestStep folder",
        "code": "{B[LinkCount]}"
      },
      {
        "label": "Name of the TestStepValue and of the Excel row",
        "code": "#{REPETITION}",
        "note": "Shown working in the linked video. The manual does not cover this case, so try it in your version."
      },
      {
        "label": "Text and address of each link, ActionMode Buffer",
        "code": "LinkName{REPETITION}=.InnerText\nUrl{REPETITION}=.Href",
        "note": "Shown working in the linked video. The manual does not cover this case, so try it in your version."
      }
    ],
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
        "title": "Properties for XModules (parameters)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
      },
      {
        "title": "Repetitions",
        "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/repetition.htm"
      },
      {
        "title": "Excel Modules",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/engines_3.0/excel.htm"
      }
    ],
    "answer": "I scan a single link identified only by its tag, use ResultCount to get the number of links, and loop over them with a repeated folder, ExplicitName and the REPETITION counter. In each pass I buffer the link text and Href and write them to the matching Excel row. I also check the count, because hidden links are included.",
    "topic": "Steering dynamic controls",
    "difficulty": "Advanced",
    "source": {
      "title": "#26 Part A | TOSCA Automation | Count & Export All Links to Excel (Real-Time Interview Scenario)",
      "url": "https://www.youtube.com/watch?v=zG3yIaYLKSk"
    }
  },
  {
    "id": 56,
    "question": "You must verify that a button has the right background colour, font size and font family. These do not appear among the properties XScan shows by default. How do you verify them?",
    "approach": [
      "Scan the button, then in XScan choose More and Load all to list every property. The style values are not loaded at first, to keep scanning fast.",
      "Find the style properties for background colour, font size and font family in the list and note their exact names and current values.",
      "In the TestStep, use ActionMode Verify and enter the property name with the expected value. Any property of the control can be verified, not only the few offered in the dropdown.",
      "The colour is stored as an RGB value such as rgb(61, 220, 145) and the size as, for example, 16px. If the requirement gives a hex code, convert it to RGB first.",
      "The font family is a list: the preferred font followed by fallbacks. Verify the preferred font and cover the rest with a wildcard.",
      "Common mistake: comparing against a colour name such as 'green'. The browser reports an exact RGB value, and many shades count as green."
    ],
    "syntax": [
      {
        "label": "Expected background colour",
        "code": "rgb(61, 220, 145)",
        "note": "Take the exact names of the style properties from XScan (More > Load all); the manual does not list them."
      },
      {
        "label": "Expected font size",
        "code": "16px"
      },
      {
        "label": "Expected font family: preferred font, then a wildcard for the fallbacks",
        "code": "Roboto*"
      }
    ],
    "docs": [
      {
        "title": "Using properties of controls",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
      }
    ],
    "answer": "I load all properties of the control in XScan to find the style properties for background colour, font size and font family. Then I verify each one in the TestStep by its property name: the colour as an RGB value, the size in pixels, and the font family with a wildcard for the fallback fonts.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Intermediate",
    "source": {
      "title": "#27 | TOSCA Automation | Validate Background Color, Font Size & Font Family (Real-Time Scenario)",
      "url": "https://www.youtube.com/watch?v=BQHCMNKkfc0"
    }
  },
  {
    "id": 57,
    "question": "You need the first data row of a web table that has a header row. Do you address it as $1 or #1, and what is the difference?",
    "approach": [
      "# is an absolute position. #1 is the first physical row of the table, which is normally the header.",
      "$ counts data rows only. $1 is the first row after the header, so it is the first real record.",
      "For the first data row, use $1. With # you would have to write #2.",
      "Prove it by buffering the same cell both ways: with $1 you get the first record, with #1 you get the column title.",
      "Use $ when working with the data of a table that has a header, and # when you need an exact physical position or the table has no header.",
      "Common mistake: using #1 and then wondering why the test reads the header text instead of data."
    ],
    "syntax": [
      {
        "label": "First data row, header skipped",
        "code": "$1"
      },
      {
        "label": "First physical row, normally the header",
        "code": "#1"
      },
      {
        "label": "Last row",
        "code": "$last"
      },
      {
        "label": "The header row itself",
        "code": "$header"
      }
    ],
    "docs": [
      {
        "title": "Table",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/type_table.htm"
      }
    ],
    "answer": "I use $1. The dollar sign counts only data rows and skips the header, so $1 is the first record. The hash sign is the absolute physical position, so #1 is the header row itself. I use $ for data and # only when I need an exact position.",
    "topic": "Steering dynamic controls",
    "difficulty": "Intermediate",
    "source": {
      "title": "#28 | Tosca Interview Question: $ vs # in Web Tables (Most Testers Get This Wrong)",
      "url": "https://www.youtube.com/watch?v=poPDXFUdxYI"
    }
  },
  {
    "id": 58,
    "question": "A web table has its labels in the first column instead of, or as well as, the first row. Addressing rows and columns with $ returns the wrong cells. How do you make Tosca treat the right cells as headers?",
    "approach": [
      "Know the default: Tosca treats the first row as the header and does not treat the first column as one.",
      "Rescan the table, select it in XScan and open Show content preview.",
      "Tick 'Use header column' when the first column holds labels, and untick 'Use header row' if the first row is ordinary data.",
      "$ now skips whatever was defined as a header. With both set, row $1 and column $1 point to the first cell that is in neither the header row nor the header column.",
      "Where no header is defined in a direction, $ behaves exactly like # there. # always means the physical position.",
      "Common mistake: changing the numbers in the TestStep to compensate. The header definition in the Module decides how $ counts."
    ],
    "syntax": [
      {
        "label": "Steering parameters that hold the header position (default 1)",
        "code": "HeaderRow\nHeaderColumn"
      }
    ],
    "docs": [
      {
        "title": "Properties for XModules (parameters)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
      },
      {
        "title": "Table",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/type_table.htm"
      }
    ],
    "answer": "How $ counts depends on which headers are defined for the table in the Module. In XScan's content preview I switch on 'Use header column', and switch 'Use header row' on or off to match the table. After that $ skips exactly those headers, and where none is defined it behaves like #.",
    "topic": "Steering dynamic controls",
    "difficulty": "Advanced",
    "source": {
      "title": "#28 | Tosca Interview Question (Part 2): Column Header Handling in Web Tables | $ vs # Explained",
      "url": "https://www.youtube.com/watch?v=u3fL8hx9zbI"
    }
  },
  {
    "id": 59,
    "question": "One TestCase covers a report page that takes far longer to load than the rest of the application. How do you give just this TestCase a longer wait without slowing down every other test?",
    "approach": [
      "Keep a WaitOn on a control that shows the page is ready. WaitOn waits only as long as needed, up to its timeout.",
      "That timeout comes from the synchronisation settings, which apply to the whole project by default.",
      "Override it locally: add the Test Configuration Parameter SynchronizationTimeoutDuringWaitOn on this TestCase or its folder, with a higher value in milliseconds.",
      "A value set lower in the tree overrides the default, so all other TestCases keep the normal timeout.",
      "If the page is always this slow, report it as a possible performance problem too.",
      "Common mistake: raising the global timeout in Settings. Every failing step in the whole suite then waits longer before it reports the failure."
    ],
    "syntax": [
      {
        "label": "Test Configuration Parameter on the TestCase or folder, in milliseconds (the default is 20000)",
        "code": "SynchronizationTimeoutDuringWaitOn = 60000"
      }
    ],
    "docs": [
      {
        "title": "Settings - Synchronization",
        "url": "https://docs.tricentis.com/tosca-2026.1/en-us/content/tosca_commander/settings_tbox_synchronization.htm"
      },
      {
        "title": "Properties for XModules (parameters)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
      }
    ],
    "answer": "I keep WaitOn on a key control and override the synchronisation timeout only for that TestCase or folder through a Test Configuration Parameter. Parameters set at a lower level win over the project default, so the rest of the suite is not slowed down.",
    "topic": "TBox",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 1 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=rKuC9abCWec"
    }
  },
  {
    "id": 60,
    "question": "An Amount field needs a random value on each run with three digits before and two after the decimal point, for example 222.32. How do you generate it?",
    "approach": [
      "Use RNDDECIMAL with the number of decimal places and the limits: {RNDDECIMAL[2][100][999]}. RANDOMREGEX does the same when the value has to follow a stricter pattern.",
      "Start with [1-9] so the first digit is never zero, then [0-9]{2} for the next two digits.",
      "Add an escaped decimal point and two more digits: {RANDOMREGEX[\"^[1-9][0-9]{2}\\.[0-9]{2}$\"]}.",
      "Generate it once with TBox Set Buffer if the same amount must be verified later, for example on a confirmation page.",
      "Check the application's locale. If it expects a comma as the decimal separator, put a comma in the pattern.",
      "Common mistake: leaving the point unescaped. In a regular expression a plain point means 'any character', so a letter or symbol can appear there."
    ],
    "syntax": [
      {
        "label": "Random number between 100 and 999 with two decimal places",
        "code": "{RNDDECIMAL[2][100][999]}"
      },
      {
        "label": "The same shape as a pattern",
        "code": "{RANDOMREGEX[\"^[1-9][0-9]{2}\\.[0-9]{2}$\"]}"
      }
    ],
    "docs": [
      {
        "title": "Random values",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/random_values.htm"
      },
      {
        "title": "Regular expressions",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/regular_expressions.htm"
      }
    ],
    "answer": "I use RANDOMREGEX with a pattern for three digits, an escaped decimal point and two digits, making sure the first digit is not zero. If the amount is needed again for a later verification, I generate it once into a Buffer and reuse that.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Beginner",
    "source": {
      "title": "Infosys Tosca - Real Interview Questions (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 61,
    "question": "A field shows two words separated by a space, for example 'King Queen'. You need the first word in one Buffer and the second word in another. How do you split it?",
    "approach": [
      "Scan the control that shows the text.",
      "In the TestStep, use ActionMode Verify, not Buffer.",
      "Enter two partial Buffers with the fixed separator between them: {XB[Value1]} {XB[Value2]}.",
      "Tosca matches the text against that pattern and stores King in Value1 and Queen in Value2. Both are then available as {B[Value1]} and {B[Value2]}.",
      "The same pattern works with other separators, for example {XB[First]}-{XB[Second]} for a hyphen.",
      "Common mistake: using ActionMode Buffer. It stores the whole text in one Buffer and the splitting is still to be done."
    ],
    "syntax": [
      {
        "label": "Field, ActionMode Verify",
        "code": "{XB[Value1]} {XB[Value2]}"
      },
      {
        "label": "The same with named groups, ActionMode Verify",
        "code": "{REGEX[\"(?<Value1>\\w+) (?<Value2>\\w+)\"]}"
      },
      {
        "label": "Reuse the two parts",
        "code": "{B[Value1]}\n{B[Value2]}"
      }
    ],
    "docs": [
      {
        "title": "ActionModes",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
      },
      {
        "title": "Regular expressions",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/regular_expressions.htm"
      }
    ],
    "answer": "I use ActionMode Verify with two XB expressions separated by the space. Tosca treats the space as the fixed part and stores what is on either side in the two Buffers. From then on I use them with the normal B syntax.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Intermediate",
    "source": {
      "title": "Infosys Tosca - Real Interview Questions (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 62,
    "question": "The nightly regression runs through DEX on virtual machines where nobody is logged in, and the UI tests fail because there is no desktop to work on. How do you set the agents up?",
    "approach": [
      "Know the two modes. Attended: the agent runs inside a logged-in, unlocked user session. Unattended: nobody is logged in and the agent has to create its own session.",
      "UI automation always needs an interactive desktop, so a machine that is logged off or locked cannot be steered.",
      "Configure the DEX agent for unattended execution with the user it should run as. It then opens an RDP session by itself before running the tests.",
      "Give the agents characteristics, such as browser or operating system, so TestEvents land only on suitable machines.",
      "Start the TestEvent from a schedule or the CI pipeline and follow it in the DEX monitor.",
      "Common mistake: logging in by hand, starting the run and disconnecting the remote session. The desktop is then locked and the tests fail partway through the night."
    ],
    "answer": "UI tests need an unlocked desktop session. For machines where nobody is logged in, I configure the DEX agents for unattended execution, so each agent opens its own RDP session with stored credentials before it runs. Attended execution is only for machines with a user session that stays open.",
    "topic": "Execution lists and DEX",
    "difficulty": "Advanced",
    "source": {
      "title": "Infosys Tosca - Real Interview Questions (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 63,
    "question": "You must check how many entries a dropdown list contains, and the list can grow over time. How do you get or verify the count?",
    "approach": [
      "In XScan, scan one entry of the list and keep only properties that every entry shares, so the attribute matches all of them.",
      "In the TestStep, use the ResultCount property on that attribute.",
      "With ActionMode Buffer it stores the number of matching entries; with ActionMode Verify it compares against an expected number, typed as .ResultCount==6.",
      "The same idea works for tables: put a Constraint on the cell you search for and read ResultCount for the matching rows.",
      "Use the buffered count afterwards, for example as the upper bound of a random selection or as the Repetition of a loop.",
      "Common mistake: leaving the entry's own text or ID in the identification. The attribute then matches one entry and the count is always 1."
    ],
    "syntax": [
      {
        "label": "Count into a Buffer: ActionMode Buffer",
        "code": "EntryCount=.ResultCount"
      },
      {
        "label": "Check the count: ActionMode Verify",
        "code": ".ResultCount==6"
      }
    ],
    "docs": [
      {
        "title": "Using properties of controls",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/control_properties.htm"
      },
      {
        "title": "ActionModes",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
      }
    ],
    "answer": "I scan a single list entry with only generic properties so that it matches every entry, then use ResultCount on it. ActionMode Buffer gives me the number, and ActionMode Verify checks it against an expected value. The count stays correct when entries are added.",
    "topic": "Steering dynamic controls",
    "difficulty": "Intermediate",
    "source": {
      "title": "Infosys Tosca - Real Interview Questions (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 64,
    "question": "For an audit, the client wants a document for every executed TestCase that shows each step with a screenshot. How do you produce this evidence without taking screenshots by hand?",
    "approach": [
      "Use DokuSnapper, Tosca's built-in documentation of test runs.",
      "Switch it on in the settings and set the folder where the documents are stored.",
      "Run the TestCases from an ExecutionList. Tosca writes a document per TestCase with the steps, their values and screenshots.",
      "If only some suites need evidence, enable it just for those and not globally, because taking screenshots slows execution.",
      "Archive the documents with the release or attach them in the test management tool.",
      "Common mistake: enabling it for every run. Large regression suites become slower and fill the disk with documents nobody reads."
    ],
    "answer": "I use DokuSnapper. Once enabled, Tosca creates a document for each executed TestCase with the steps and screenshots, which serves as audit evidence. I switch it on only for the runs that need evidence, because it slows execution and produces a lot of files.",
    "topic": "Reporting",
    "difficulty": "Beginner",
    "source": {
      "title": "Infosys Tosca - Real Interview Questions (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 65,
    "question": "A TestCase writes its results to an Excel file, and every run overwrites the file from the previous run. How do you keep the report of each run?",
    "approach": [
      "Build the file name dynamically: a fixed prefix plus Tosca's time stamp, for example Results_{DATETIME}, which contains both date and time.",
      "Use that name in the step that creates or saves the workbook, so each run produces a new file.",
      "Store the generated name in a Buffer at the start, so later steps write to the same file.",
      "Optionally mail the file in a final step, or publish the results to a test management tool such as qTest or Jira, where every run is kept anyway.",
      "Remove old files from time to time so the folder does not grow without limit.",
      "Common mistake: using a date-only stamp. Two runs on the same day still overwrite each other."
    ],
    "syntax": [
      {
        "label": "File name with Tosca's time stamp (date and time)",
        "code": "Results_{DATETIME}.xlsx"
      },
      {
        "label": "Date only",
        "code": "Results_{DATE[][][yyyyMMdd]}.xlsx"
      }
    ],
    "docs": [
      {
        "title": "Dynamic date and time expressions",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/date_and_time_expressions.htm"
      }
    ],
    "answer": "I make the file name dynamic by adding a date and time stamp to a fixed prefix, and I keep that name in a Buffer so all steps of the run use the same file. Each run then leaves its own report. For long-term history I also push results to the test management tool.",
    "topic": "Reporting",
    "difficulty": "Beginner",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 2 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=dejlm5hNjAk"
    }
  },
  {
    "id": 66,
    "question": "You read test data from an Excel sheet with the standard Excel modules, but the column headers are in row 3, not row 1, so columns are not found by name. How do you handle it?",
    "approach": [
      "Keep the normal flow: open the workbook, define the range, work on it with Excel Range Manipulation, close the workbook.",
      "The simplest fix, when possible, is to start the defined range at the header row: set the Start Cell to A3 instead of A1.",
      "Otherwise change which row counts as the header: the range module's table has the steering parameter HeaderRow, 1 by default.",
      "Copy the standard module into your own project folder and set HeaderRow to 3 on the copy, then use the copy in the TestCases that read this sheet.",
      "If another sheet has its header in a different row, make another copy with its own value.",
      "Common mistake: editing the original standard module. Every TestCase in the project that uses it then reads the wrong row."
    ],
    "syntax": [
      {
        "label": "TBox Define Excel Range: Data Range->Start Cell",
        "code": "A3"
      },
      {
        "label": "Data Range->End Cell",
        "code": "F200"
      },
      {
        "label": "Or the steering parameter on a copy of the range module's table",
        "code": "HeaderRow = 3"
      }
    ],
    "docs": [
      {
        "title": "Excel Modules",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/engines_3.0/excel.htm"
      },
      {
        "title": "Properties for XModules (parameters)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/xmodules_properties.htm"
      }
    ],
    "answer": "Either I define the range so it begins at the header row, or I set the HeaderRow parameter to 3. I make that change on a copy of the standard Excel module in my project folder, never on the original, because other TestCases rely on the default.",
    "topic": "TBox",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 3 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=dGCceercMdc"
    }
  },
  {
    "id": 67,
    "question": "A web table lists users, and each row has an Edit button. You must click Edit in the row where Name is John, wherever that row is. How do you do it?",
    "approach": [
      "Scan the table as one Table control. The button inside the cell is an embedded control and is reached through its row and column.",
      "In the TestStep, add a row without a fixed number.",
      "In that row, set the Name cell to John with ActionMode Constraint, so Tosca finds the matching row.",
      "In the same row, go to the cell that holds the button and act on the embedded control with ActionMode Input and {CLICK}.",
      "If several rows could match, add a second Constraint on another column, or check ResultCount first.",
      "Common mistake: scanning the Edit button of one row as a separate control. It then always clicks that row's button, whoever is listed there."
    ],
    "syntax": [
      {
        "label": "Name cell, ActionMode Constraint",
        "code": "John"
      },
      {
        "label": "Button in the same row, ActionMode Input",
        "code": "{CLICK}"
      }
    ],
    "docs": [
      {
        "title": "Table",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/type_table.htm"
      },
      {
        "title": "Click operations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/click_operations.htm"
      }
    ],
    "answer": "I steer it through the table. A Constraint on the Name cell selects the row that contains John, and in that same row I click the embedded Edit button. The step keeps working when rows are added, removed or sorted differently.",
    "topic": "Steering dynamic controls",
    "difficulty": "Intermediate",
    "source": {
      "title": "Infosys Tosca Interview Prep (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 68,
    "question": "Test data or an expected value is stored in a text file (.txt). How do you read it in a TestCase and use part of it?",
    "approach": [
      "Use the file modules from the Standard subset; do not open Notepad and steer its window.",
      "Check first that the file is there with TBox File Existence, so a missing file gives a clear failure.",
      "Read the content into a Buffer with the standard module for reading files (TBox Read/Create File).",
      "If only part of the content is needed, cut it out with a partial Buffer or a regular expression.",
      "Use the Buffer in the following steps, as input or as the expected value of a verification.",
      "Common mistake: automating the Notepad window to copy the text. It is slow, depends on window focus and breaks on a locked screen."
    ],
    "syntax": [
      {
        "label": "TBox File Existence: File, ActionMode Verify",
        "code": "data.txt"
      },
      {
        "label": "TBox Read/Create File: Text, ActionMode Buffer (the value is the Buffer name)",
        "code": "FileText"
      },
      {
        "label": "Use the content in a later step",
        "code": "{B[FileText]}"
      }
    ],
    "docs": [
      {
        "title": "File Operations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/automation_tools/file_operations.htm"
      },
      {
        "title": "ActionModes",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/action_modes.htm"
      }
    ],
    "answer": "I read the file with the standard file modules: first a check that it exists, then reading its content into a Buffer. From there I extract the part I need and use it like any other Buffer. I avoid steering Notepad itself because that is fragile.",
    "topic": "TBox",
    "difficulty": "Intermediate",
    "source": {
      "title": "Infosys Tosca - Real Interview Questions (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 69,
    "question": "The Modules were scanned while the application was in English. The same application is now delivered in French and many steps fail. How do you run the same TestCases in both languages?",
    "approach": [
      "Find out what fails: controls identified by visible text (InnerText, Title, label) no longer match. Controls identified by Id, Name or ClassName still work.",
      "Re-identify the failing controls by language-independent properties wherever these exist.",
      "Where no such property exists, use an anchor or, as a last resort, an index in place of the text.",
      "Texts that are still needed, such as expected messages in verifications, go into Test Configuration Parameters or TestCaseDesign with one set of values per language.",
      "Run the same TestCases from one ExecutionList per language, each setting its language values.",
      "Common mistake: copying all Modules and TestCases for the French version. Every later change then has to be made twice."
    ],
    "syntax": [
      {
        "label": "Expected text kept per language in a Test Configuration Parameter",
        "code": "{CP[SuccessMessage]}"
      }
    ],
    "docs": [
      {
        "title": "Text expressions (Buffer, XBuffer, CP)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
      }
    ],
    "answer": "Only the controls identified by visible text break. I move their identification to language-independent properties such as Id or Name, and I parameterise the texts that verifications need, with one set per language. The same Modules and TestCases then run for both languages from separate ExecutionLists.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Advanced",
    "source": {
      "title": "Infosys Tosca - Real Interview Questions (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 71,
    "question": "After a customer is created through the UI, you must verify that the record was saved correctly in the database. How do you check it from Tosca?",
    "approach": [
      "Create an ODBC data source (DSN) for the database on the machine that executes the test, with valid credentials.",
      "In the TestCase, open the connection with TBox DB Open Connection and the DSN name.",
      "Run a query with TBox DB Run SQL Statement, using the value buffered from the UI in the WHERE clause.",
      "Verify the cells of the result against the values that were entered, or buffer them for later steps.",
      "Close the connection at the end. Several statements can run over one open connection.",
      "Common mistake: creating the DSN only on your own machine, or with the wrong bitness. The test passes locally and fails on the agents."
    ],
    "syntax": [
      {
        "label": "TBox DB Open Connection: DSN",
        "code": "QA_Customers"
      },
      {
        "label": "TBox DB Run SQL Statement (table and columns are an example)",
        "code": "SELECT name, email FROM customers WHERE email = '{B[Email]}'"
      }
    ],
    "docs": [
      {
        "title": "Database Modules",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/engines_3.0/database.htm"
      }
    ],
    "answer": "I use the database modules from the Standard subset. With an ODBC DSN in place, I open the connection, run a SELECT filtered by the value I buffered from the UI, verify the returned cells and close the connection. The DSN has to exist on every machine that runs the test.",
    "topic": "TBox",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 2 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=dejlm5hNjAk"
    }
  },
  {
    "id": 72,
    "question": "One TestCase must compare data between two different databases, for example the source system and the reporting database. How do you work with both at once?",
    "approach": [
      "Create a separate ODBC DSN for each database.",
      "Add TBox DB Open Connection twice, once per DSN, and give each connection its own name, for example Source and Reporting.",
      "TBox DB Run SQL Statement uses the connection that was opened last. Before each query, select the one you need with TBox DB Current Connection and its connection name.",
      "Buffer the value from the first query and verify it against the result of the second.",
      "Close both connections at the end of the TestCase.",
      "Common mistake: running both queries without switching the connection. Both then go to the database that was opened last."
    ],
    "syntax": [
      {
        "label": "TBox DB Open Connection, once per database: Connection name",
        "code": "Source\nReporting"
      },
      {
        "label": "TBox DB Current Connection before each query: Connection name",
        "code": "Source"
      },
      {
        "label": "Query on Source (tables are an example)",
        "code": "SELECT total FROM orders WHERE id = {B[OrderId]}"
      },
      {
        "label": "Query on Reporting",
        "code": "SELECT total FROM order_report WHERE order_id = {B[OrderId]}"
      }
    ],
    "docs": [
      {
        "title": "Database Modules",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/engines_3.0/database.htm"
      }
    ],
    "answer": "I open two connections with TBox DB Open Connection, each with its own connection name. Before a query I select the connection with TBox DB Current Connection, so I can read from one database, buffer the value and verify it against the other. The same approach scales to more than two databases.",
    "topic": "TBox",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 3 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=dGCceercMdc"
    }
  },
  {
    "id": 73,
    "question": "The nightly regression shows many random failures: different TestCases fail on different nights and pass when rerun. How do you make the suite stable?",
    "approach": [
      "Sort the failures by cause before changing anything: control not found, timeout, test data, or a real defect.",
      "Fix timing problems with WaitOn on a key control of the next page in place of fixed waits, and raise the synchronisation timeout only where needed.",
      "Add a Recovery scenario for known interruptions such as pop-ups, and a CleanUp scenario that closes the browser so one failure cannot affect the next TestCase.",
      "Fix data problems: generate unique values at runtime or reserve records through Test Data Service.",
      "Rerun only the failed TestCases to confirm, and report whatever still fails as a defect with log and screenshot.",
      "Common mistake: adding longer fixed waits everywhere, or rerunning until the result is green. That hides the cause and slows the suite."
    ],
    "answer": "I first classify the failures, because timing, data and real defects need different fixes. Timing gets WaitOn in place of fixed waits, interruptions get recovery and cleanup scenarios, and data gets unique or reserved values. Then I rerun the failed tests and report what remains as defects.",
    "topic": "Recovery and cleanup scenarios",
    "difficulty": "Advanced",
    "source": {
      "title": "Infosys Tosca Interview Prep (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 74,
    "question": "A TestCase that passed for weeks failed in last night's run. Walk through how you analyse it.",
    "approach": [
      "Open the execution log, find the first failed TestStep and read the message and the screenshot.",
      "Rerun the TestCase once to rule out a one-off problem such as a slow environment.",
      "For 'control not found', check whether the UI changed, for example a button renamed from Login to Sign in. If so, update the Module, which repairs every TestCase that uses it.",
      "Run the flow by hand. If the application behaves wrongly it is a defect: raise it with steps, log and screenshot.",
      "If the cause is the environment or the test data, inform the team and rerun after the fix.",
      "Common mistake: changing the TestCase until it passes without understanding why it failed. A real defect can be hidden that way."
    ],
    "answer": "I start at the first failed step in the log and its screenshot, then rerun once to exclude a one-off. After that I decide between three causes: the automation needs an update because the UI changed, the application has a defect, or the environment or data was wrong. Each has a different owner and next step.",
    "topic": "Execution lists and DEX",
    "difficulty": "Beginner",
    "source": {
      "title": "Infosys Tosca Interview Prep (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 75,
    "question": "Clicking a link opens a report in a new browser tab. The test must verify something there and then continue in the original tab. How do you handle it?",
    "approach": [
      "Scan the page in the new tab as its own Module.",
      "Give that Module a tolerant Title, for example Report*, so Tosca finds the tab whatever follows the first word.",
      "Because a Module finds its window by title, the steps on the new Module run in the new tab without an explicit switch.",
      "To go back, close the new tab, or simply continue with steps on the Module of the original page.",
      "If both tabs have the same title, tell them apart with ConstraintIndex or switch with TBox Send Keys.",
      "Common mistake: looking for a 'switch window' step. In Tosca the Module's identification decides which window is steered."
    ],
    "syntax": [
      {
        "label": "Title of the Module for the new tab",
        "code": "Report*"
      }
    ],
    "docs": [
      {
        "title": "Specify values (wildcards, escaping)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/specifying_values.htm"
      }
    ],
    "answer": "There is no separate switch step. I scan the new tab as its own Module with a wildcard in the Title, and Tosca steers whichever window matches the Module being used. To return, I close the tab or just continue with the original page's Module.",
    "topic": "Steering dynamic controls",
    "difficulty": "Intermediate",
    "source": {
      "title": "Infosys Tosca Interview Prep (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 76,
    "question": "A test must upload a document and later download a generated file. How do you automate the upload and prove that the download arrived?",
    "approach": [
      "Upload: scan the file input and set the file path on it directly with ActionMode Input, which avoids the Windows file dialog.",
      "If the application forces the Windows dialog, scan that dialog (it is not HTML) or use TBox Send Keys to enter the path and confirm.",
      "Download: clear the download folder at the start of the test, so an old file cannot produce a false pass.",
      "Trigger the download and handle any browser prompt.",
      "Verify the result with TBox File Existence, using a wildcard such as Invoice*.pdf if the name contains a date or number.",
      "Common mistake: checking only that some file exists in a folder that is never cleaned. The check then passes on yesterday's file."
    ],
    "syntax": [
      {
        "label": "Upload: file input, ActionMode Input",
        "code": "C:\\TestData\\contract.pdf"
      },
      {
        "label": "Download: TBox File Existence, File, ActionMode Verify",
        "code": "Invoice*.pdf"
      }
    ],
    "docs": [
      {
        "title": "File Operations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/automation_tools/file_operations.htm"
      }
    ],
    "answer": "For the upload I set the path directly on the file input, and only fall back to the Windows dialog if I have to. For the download I empty the target folder first, trigger the download and verify the file with TBox File Existence and a wildcard. Clearing the folder first is what makes the check trustworthy.",
    "topic": "TBox",
    "difficulty": "Intermediate",
    "source": {
      "title": "Infosys Tosca Interview Prep (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 77,
    "question": "The login of the application under test asks for a one-time password (OTP) or shows a CAPTCHA. How do you automate tests behind that login?",
    "approach": [
      "A CAPTCHA exists to stop automation, so do not try to solve it. Agree with the developers that it is switched off or bypassed in test environments.",
      "For OTP, the cleanest option is a fixed code configured for test users in the test environment.",
      "Otherwise read the real code from where the system stores or sends it: the database with the TBox DB modules, a test API, or a test mailbox.",
      "Buffer the code and enter it in the OTP field.",
      "Keep the login in one reusable block so this handling exists in one place.",
      "Common mistake: building image recognition or similar tricks to get past the CAPTCHA. It is unreliable and works against a control the business wants."
    ],
    "syntax": [
      {
        "label": "Read the code from the database (table and columns are an example)",
        "code": "SELECT code FROM otp_codes WHERE user_name = '{B[User]}' ORDER BY created_at DESC"
      }
    ],
    "docs": [
      {
        "title": "Database Modules",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/engines_3.0/database.htm"
      }
    ],
    "answer": "I do not automate around a CAPTCHA; it should be disabled or bypassed for test users in the test environment, and I agree that with the developers. For an OTP I either use a fixed test code or read the generated code from the database, an API or a test mailbox, buffer it and enter it.",
    "topic": "TestCase design",
    "difficulty": "Intermediate",
    "source": {
      "title": "Infosys Tosca Interview Prep (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 78,
    "question": "A registration test passes once and fails on every later run, because the same email address cannot be registered twice. How do you make it repeatable?",
    "approach": [
      "Generate the unique part at runtime, for example test_{RND[6]}@mail.com, or a RANDOMREGEX pattern if the format is strict.",
      "Store the generated value in a Buffer, so later steps such as login or search use the same one.",
      "If the data cannot be invented, for example existing policies, keep a pool in Test Data Service and mark each record as used once it is consumed.",
      "Alternatively, reset the data before the run with a database script or an API call.",
      "Choose per case: random values for free data, TDS for data that must already exist, a reset for small fixed sets.",
      "Common mistake: changing the email by hand before every run. The test is then not automated in any useful sense."
    ],
    "syntax": [
      {
        "label": "Unique email address on every run",
        "code": "test_{RND[6]}@mail.com"
      }
    ],
    "docs": [
      {
        "title": "Random values",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/random_values.htm"
      }
    ],
    "answer": "Data that is consumed has to be new on every run. For values I can invent, I generate them with RND or RANDOMREGEX and keep them in a Buffer. For data that must exist beforehand I use a pool in Test Data Service and mark records as used, or I reset the data before the run.",
    "topic": "Test data (TDM/TDS)",
    "difficulty": "Intermediate",
    "source": {
      "title": "Infosys Tosca Interview Prep (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 79,
    "question": "An Excel file holds many records. For each row the test must read the data, process it in the application and write the result back into that row. How do you build this?",
    "approach": [
      "Open the workbook and define the range with the standard Excel modules.",
      "Find out how many rows there are (row count or last row with content) and store the number in a Buffer.",
      "Create the loop: a folder with Repetition set to that Buffer, where {REPETITION} serves as the row counter, or a While statement with your own counter Buffer.",
      "In each pass, read the current row into Buffers, run the application steps and write the outcome back into the same row.",
      "With your own counter, increase it at the end of each pass with {MATH[{B[Counter]}+1]}. Close and save the workbook after the loop.",
      "Common mistake: using a loop where a separate result per record matters. One failing row can hide the others; a TestCaseDesign Template gives one TestCase and one result per row."
    ],
    "syntax": [
      {
        "label": "Repetition of the TestStep folder",
        "code": "{B[RowCount]}"
      },
      {
        "label": "Row to read and write in each pass",
        "code": "#{REPETITION}",
        "note": "Shown working in the linked video. The manual does not cover this case, so try it in your version."
      },
      {
        "label": "With your own counter: raise it at the end of each pass",
        "code": "{MATH[{B[Counter]}+1]}"
      }
    ],
    "docs": [
      {
        "title": "Repetitions",
        "url": "https://docs.tricentis.com/tosca-2025.1/en-us/content/tosca_commander/repetition.htm"
      },
      {
        "title": "Excel Modules",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/engines_3.0/excel.htm"
      },
      {
        "title": "Perform calculations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/calculations.htm"
      }
    ],
    "answer": "I open the workbook, buffer the number of rows and loop over them with a repeated folder or a While statement, using a counter as the row index. Each pass reads the row, runs the application steps and writes the result back. If each record needs its own pass or fail result, I prefer a Template with TestCaseDesign over a loop.",
    "topic": "TBox",
    "difficulty": "Advanced",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 2 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=dejlm5hNjAk"
    }
  },
  {
    "id": 80,
    "question": "A submenu item becomes visible only when the mouse hovers over the main menu. Clicking the item directly fails because it is not visible. How do you automate it?",
    "approach": [
      "Scan both the main menu entry and the submenu item. Open the menu by hand while scanning so the item can be captured.",
      "In the TestStep, first act on the main menu entry with {MOUSEOVER} to make the submenu appear.",
      "Then click the submenu item with {CLICK}.",
      "If the submenu is slow to appear, add WaitOn on the item before the click.",
      "If hovering stays unreliable and the menu is not what the test is about, navigate straight to the target URL.",
      "Common mistake: adding a fixed wait and clicking the hidden item anyway. Without the hover the item never becomes visible."
    ],
    "syntax": [
      {
        "label": "Main menu entry, ActionMode Input",
        "code": "{MOUSEOVER}"
      },
      {
        "label": "Submenu item, ActionMode Input",
        "code": "{CLICK}"
      }
    ],
    "docs": [
      {
        "title": "Click operations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/click_operations.htm"
      }
    ],
    "answer": "I reproduce what a user does: a mouse-over on the parent menu entry first, then a click on the submenu item, with a WaitOn in between if the menu opens slowly. When the menu itself is not under test, going directly to the page by URL is the more stable option.",
    "topic": "Steering dynamic controls",
    "difficulty": "Beginner",
    "source": {
      "title": "Infosys Tosca Interview Prep (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 81,
    "question": "You are asked to automate 300 manual test cases within three sprints. How do you plan the work?",
    "approach": [
      "Sort the cases by risk and reuse. Start with smoke tests and high-value business flows; leave out one-off checks and features that are still changing.",
      "Build the shared parts first: Modules per screen and Reusable TestStepBlocks for login, navigation and other repeated steps.",
      "Group cases that follow the same flow with different data and cover them with one TestCase Template and TestCaseDesign.",
      "Agree naming, folder structure and review rules on day one, so several people can work in the repository in parallel.",
      "Track progress every sprint and reserve time for maintaining what is already automated.",
      "Common mistake: automating the cases one by one in the order of the list. Shared steps are rebuilt many times and maintenance becomes expensive later."
    ],
    "answer": "I prioritise by risk and reuse and drop cases that are not worth automating. The first effort goes into shared Modules and reusable blocks, and cases that differ only in data become one Template with TestCaseDesign. That way 300 manual cases turn into far fewer assets to build, and I track progress sprint by sprint with time kept for maintenance.",
    "topic": "TestCase design",
    "difficulty": "Advanced",
    "source": {
      "title": "Infosys Tosca Interview Prep (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 82,
    "question": "The application generates a PDF statement. You must verify that key values in it, such as the amount and customer number, match what the UI showed. How do you check the PDF?",
    "approach": [
      "Buffer the values from the UI before the PDF is generated.",
      "Download the PDF to a known folder and confirm it arrived with TBox File Existence.",
      "Read the document with Tosca's PDF support, not through the PDF viewer window: scan the PDF or use the standard PDF modules.",
      "Verify the key values against the Buffers, with wildcards around them if the surrounding text varies.",
      "If the whole layout must stay unchanged, compare the document with an approved baseline PDF and exclude areas that change, such as dates.",
      "Common mistake: comparing the complete PDF with a baseline although it contains a date or running number. The comparison then fails on every run."
    ],
    "answer": "I buffer the values in the UI, download the PDF and read it with Tosca's PDF modules to verify the amount and customer number against those Buffers. A full comparison with a baseline document is only useful when the changing parts, such as dates, are excluded.",
    "topic": "TBox",
    "difficulty": "Intermediate",
    "source": {
      "title": "Infosys Tosca Interview Prep (PDF notes)",
      "url": ""
    }
  },
  {
    "id": 83,
    "question": "A date-of-birth field needs a date exactly 3 years, 2 months and 5 days before today, whatever day the test runs. How do you produce it?",
    "approach": [
      "Use the DATE expression. It has three parts: base date, offset and output format.",
      "Leave the base date empty to start from today.",
      "Give the offset with a minus sign for the past: -3y-2M-5d.",
      "Set the format the application expects, for example dd/MM/yyyy: {DATE[][-3y-2M-5d][dd/MM/yyyy]}.",
      "Check the result with Translate value before using it.",
      "Common mistake: typing a fixed date. The test starts failing once that date falls outside the rule being tested."
    ],
    "syntax": [
      {
        "label": "3 years, 2 months and 5 days before today",
        "code": "{DATE[][-3y-2M-5d][dd/MM/yyyy]}"
      },
      {
        "label": "Today",
        "code": "{DATE[][][dd/MM/yyyy]}"
      },
      {
        "label": "Tomorrow",
        "code": "{DATE[][+1d][dd/MM/yyyy]}"
      }
    ],
    "docs": [
      {
        "title": "Dynamic date and time expressions",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/date_and_time_expressions.htm"
      }
    ],
    "answer": "I use the DATE expression with an empty base date, which means today, a negative offset for the years, months and days, and the output format the field expects. The value is recalculated on every run, so the test never depends on a hard-coded date.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Beginner",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 1 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=rKuC9abCWec"
    }
  },
  {
    "id": 84,
    "question": "A reusable login block takes the user name as a Business Parameter. The user differs per environment and is kept in a Test Configuration Parameter. How do you connect the two?",
    "approach": [
      "Keep the block generic: inside it, the step uses the Business Parameter, not a fixed value.",
      "Define the user as a Test Configuration Parameter at the level where the environment is decided, for example the ExecutionList.",
      "In each TestCase that references the block, set the Business Parameter's value to {CP[User]}.",
      "At runtime the configuration parameter is resolved first and its value is passed into the block.",
      "Switching the environment now means changing one parameter; the block and the TestCases stay untouched.",
      "Common mistake: writing {CP[User]} directly inside the reusable block. It works, but the block can no longer be used with a different user in the same environment."
    ],
    "syntax": [
      {
        "label": "Value of the Business Parameter in the TestCase",
        "code": "{CP[User]}"
      },
      {
        "label": "Inside the reusable block",
        "code": "{PL[Username]}"
      }
    ],
    "docs": [
      {
        "title": "Text expressions (Buffer, XBuffer, CP)",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/text_expressions.htm"
      },
      {
        "title": "Reusable TestStepBlocks",
        "url": "https://docs.tricentis.com/tosca-2024.1/en-us/content/tosca_commander/reusable_teststepblocks.htm"
      }
    ],
    "answer": "Yes, a Test Configuration Parameter can be the value of a Business Parameter. In the TestCase that uses the block I set the Business Parameter to the CP expression, so the block stays generic and the environment-specific value comes from configuration.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 2 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=dejlm5hNjAk"
    }
  },
  {
    "id": 85,
    "question": "An order form has five fields with several valid and invalid values each. Testing every combination would give thousands of TestCases. How do you reduce the number and still see which field causes a failure?",
    "approach": [
      "Model the fields as Attributes and their values as Instances in a TestSheet in TestCaseDesign.",
      "For each Attribute, mark the most common valid Instance as StraightThrough. Together these form the happy-path TestCase.",
      "Generate the combinations with Linear Expansion. Each further TestCase changes exactly one Attribute and keeps the others on StraightThrough.",
      "The number of TestCases is then roughly the sum of the remaining Instances plus one, not the product of all Instances.",
      "Link the TestSheet to a Template and instantiate it.",
      "Common mistake: generating All Combinations by default. Most of those TestCases add no information, and a failure cannot be tied to one value."
    ],
    "syntax": [
      {
        "label": "Number of TestCases with Linear Expansion",
        "code": "1 + sum of (Instances per Attribute - 1)"
      },
      {
        "label": "Example: 5 Attributes with 4 Instances each",
        "code": "Linear Expansion: 1 + 5 x 3 = 16\nAll Combinations: 4 x 4 x 4 x 4 x 4 = 1024"
      }
    ],
    "answer": "I use Linear Expansion in TestCaseDesign. One straight-through TestCase uses the standard value of every field, and each additional TestCase varies a single field. That gives high coverage with few TestCases, and when one fails I know which value caused it.",
    "topic": "TestCase design",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 2 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=dejlm5hNjAk"
    }
  },
  {
    "id": 86,
    "question": "Before a release, the client asks which requirements are covered by tests and what the latest result for each one is. How do you show this from Tosca?",
    "approach": [
      "Maintain the requirements in the Requirements section, created there or synchronised from the requirements tool.",
      "Link the TestCases to the requirements they cover.",
      "Link the ExecutionLists or their entries too, so that execution results are counted and not only the existence of tests.",
      "The Requirements section then shows, per requirement, how much is covered by TestCases and what the execution state is.",
      "Weight the requirements by frequency and damage class if the client wants to see risk coverage, and export the view as the report.",
      "Common mistake: linking TestCases only. Coverage looks complete while nothing shows whether the tests were run or passed."
    ],
    "answer": "I build traceability in the Requirements section: requirements linked to TestCases and to ExecutionLists. Tosca then shows per requirement the coverage and the latest execution state, and with frequency and damage classes also the risk coverage. That view is what I export for the client.",
    "topic": "Reporting",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 1 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=rKuC9abCWec"
    }
  },
  {
    "id": 87,
    "question": "After a registration the UI shows 'Registration successful' and the TestCase verifies that message. The reviewer says this is not enough. What else should the TestCase verify?",
    "approach": [
      "The message only proves that the UI reacted. Buffer the key values, such as the user name or generated ID, for further checks.",
      "Database: query the record with the TBox DB modules and verify that the stored values match.",
      "API: send a GET for the new ID and verify the status code and the returned fields against the same Buffers.",
      "Downstream: if other applications receive the record, check that it appears there.",
      "Pick the checks that fit the project. One independent check behind the UI already makes the test much stronger.",
      "Common mistake: verifying only the success message. The test stays green even when nothing was saved."
    ],
    "syntax": [
      {
        "label": "Database check (table and columns are an example)",
        "code": "SELECT user_name, email FROM users WHERE user_name = '{B[UserName]}'"
      },
      {
        "label": "API check: expect status 200",
        "code": "GET /users/{B[UserId]}"
      }
    ],
    "docs": [
      {
        "title": "Database Modules",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/engines_3.0/database.htm"
      }
    ],
    "answer": "A success message is not proof that the data was saved. I add at least one independent check behind the UI: the record in the database, the same record through the API, or its arrival in a downstream system, all verified against values buffered from the UI.",
    "topic": "TestCase design",
    "difficulty": "Intermediate",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 3 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=dGCceercMdc"
    }
  },
  {
    "id": 88,
    "question": "Testers keep mistyping the allowed values of a control in TestSteps, for example 'Aproved' in a status field. How do you offer the valid values as a dropdown in the TestStep?",
    "approach": [
      "Open the Module and look at the ValueRange of the ModuleAttribute. Tosca fills it during scanning from the control type, for example the click actions of a button.",
      "Add your own values to the ValueRange, separated by semicolons, for example Approved;Rejected;Pending.",
      "Remove suggestions that make no sense for this control.",
      "Every TestStep that uses the attribute now offers these entries as a dropdown in the value cell.",
      "Maintain the list in the Module when the application gains a new status, so all TestCases see it.",
      "Common mistake: assuming the dropdown is fixed by Tosca. It is a property of the ModuleAttribute and can be edited."
    ],
    "syntax": [
      {
        "label": "ValueRange of the ModuleAttribute, values separated by semicolons",
        "code": "Approved;Rejected;Pending"
      }
    ],
    "docs": [
      {
        "title": "Default properties for Modules",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tosca_commander/modules_properties.htm"
      }
    ],
    "answer": "The dropdown in a TestStep comes from the ValueRange of the ModuleAttribute, which Tosca fills while scanning. I can edit it, so I add the valid values there and remove unsuitable ones. Testers then pick from a list and cannot mistype.",
    "topic": "Module scanning (XScan)",
    "difficulty": "Beginner",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 3 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=dGCceercMdc"
    }
  },
  {
    "id": 89,
    "question": "A page shows a date of birth and the calculated age. How do you calculate the expected age in Tosca to verify what the page shows?",
    "approach": [
      "Buffer the date of birth from the page. It has to be in the date format Tosca is configured for.",
      "Get the year of the birth date and of today with the DATE expression and the format yyyy, and subtract them with a MATH expression.",
      "That result is only right if this year's birthday has already passed. Get month and day as one number (format MMdd) for both dates.",
      "With an If statement and TBox Evaluation Tool, check whether today's MMdd is smaller than the birthday's MMdd. If it is, subtract one.",
      "Verify the age shown on the page against the calculated Buffer.",
      "Common mistake: dividing the difference in days by 365. Leap years make the result wrong around the birthday."
    ],
    "syntax": [
      {
        "label": "Years between the two dates",
        "code": "{MATH[{DATE[][][yyyy]}-{DATE[{B[DOB]}][][yyyy]}]}",
        "note": "The Buffer must hold the date in Tosca's date format (dd.MM.yyyy unless changed in the settings)."
      },
      {
        "label": "If condition: this year's birthday has not happened yet",
        "code": "{DATE[][][MMdd]} < {DATE[{B[DOB]}][][MMdd]}"
      }
    ],
    "docs": [
      {
        "title": "Dynamic date and time expressions",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/date_and_time_expressions.htm"
      },
      {
        "title": "Perform calculations",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/tbox/calculations.htm"
      },
      {
        "title": "Expression Evaluation",
        "url": "https://docs.tricentis.com/tosca-2023.2/en-us/content/standard_subset/automation_tools/expression_evaluation.htm"
      }
    ],
    "answer": "I subtract the birth year from the current year using DATE expressions and MATH, then correct by one if this year's birthday has not yet happened, which I check by comparing month and day in an If statement. The result goes into a Buffer and is verified against the age on the page.",
    "topic": "Buffers and parameterisation",
    "difficulty": "Advanced",
    "source": {
      "title": "Tosca Interview Questions and Answers 2025 | Tricentis | Part 3 | TechnologyTrainingExperts",
      "url": "https://www.youtube.com/watch?v=dGCceercMdc"
    }
  }
];
