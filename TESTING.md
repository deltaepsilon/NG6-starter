# Installation

- Clone this repo
- Run ```npm install```
- Run ```npm run test```

Running ```npm run test``` will get your tests up and running in a live Chrome window. Find that Chrome window and open Chrome DevTools within it for better debugging.

# Concepts

### Only test the code you want to last

- Dentists advise to "brush the teeth you want to keep". The same principle applies. 
- Testing is more important than feature development. A feature without tests is a refactor/bug nightmare just waiting to happen.
- Your feature-focused dev brain says, "But no! Features are the fun part! I want to work on features!". This is because your dev brain is not yet converted.
- A proper testing framework makes tests much, much easier to write. When tests become cheap to write, you'll wonder why you ever shipped code without tests.
- The goal is to get your testing framework so good that writing tests is a net-positive in the ***near term***. Meaning you can ship features ***faster***.

### How can I ship features faster if I'm writing tests for every line???

- Web devs typically reload their browsers hundreds of times a day. This is a waste.
- Testing tightens your dev cycle into a bunch of tiny, almost instant feedback loops.
- You can develop and release with much greater confidence.
- Manual testing becomes higher-level. You'll test manually to make sure your styling is there and that your components are loading.
- The underlying code just works.

### Testing code is first-class code

- Tests do not need to be as performant as the underlying code base. Beyond that point, tests need just as much love as features.
- Follow the same best-practices in your tests that you follow for your feature codebase.
- Write small tests.
- Don't repeat yourself
- Write test-only mocks and classes to hide complexity and reduce copy/paste misery.
- As your mocks and test-only classes develop, your tests will become much more condensed and faster to write.

For instance, let's say that a class has ten setters and ten getters. 

1. Make an array of those getter and setter names. 
2. Write a framework function to test a list of getters.
3. Write another framework function for setters.
4. Write a test that loops through and tests your getters.
5. Do the same thing for your setters.

Use your new framework getter/setter testing functions to test all of the getters and setters you write from now on. It's a piece of cake.

### Group your tests into sub-groups

- Use ```describe``` blocks to nest your test code logically.
- If three functions in a class are closely related, nest them in their own ```describe``` block so that they can be moved to a different class later.
- Write your code and your tests with refactoring in mind. Try to minimize coupling between tests and classes.
- Mock ***every single function**. If the function you're testing calls three sub-functions, you need three mocks. Don't let the functions call through.
- Aggressive mocking avoids coupling functions to their tests.

### Refactor as you test

- Well-written code is testable code.
- If your code is difficult to test... refactor it!
- You may find yourself in a refactor loop where you need to write tests, refactor code, then refactor the tests.
- Spend time to refactor your tests. The next dev who works on your class should be impressed by how efficient and well-abstracted the tests are.
- If two tests look similar, write a local function to abstract out the similarities, keeping your tests as DRY as your code.


# Writing tests

- Open the tests and the code side-by-side. You need to see both.
- Use code-folding to hide everything that's not relevant to the one test you're writing.
- Go to your Zen place. Take a deep, patient breath. Write as many tests as necessary to cover every possible code path.
