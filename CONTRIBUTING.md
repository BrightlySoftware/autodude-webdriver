Contributing
============


Issues
======

If you have a bug or feature request, please file an issue.

When submitting an issue, please include a reproducible case that we can actually run.

Please format code and markup in your issue using [github markdown](https://help.github.com/articles/github-flavored-markdown).


Contributing to Source Code (Pull Requests)
===========================================
 * If your PR changes any behavior or fixes an issue, it should have an associated test.
 * New features should be general and as simple as possible.
 * Breaking changes should be avoided if possible.
 * All pull requests require review. No PR will be merged without approval from a member of the Dude Solutions engineering team.
 * JavaScript style should generally follow the Dude Solutions JS Style Guide ## (TODO: INSERT LINK TO THIS).

Commit Messages
---------------
Please write meaningful commit messages - they are used to generate the changelog, so the commit message should tell a user everything they need to know about a commit.


Testing your changes
--------------------
Running unit tests should be as simple as:
npm install
npm test

If there's enough interest, we may look to building an application with some very small e2e tests just to validate functionality of the underlying methods that consume Selenium-Webdriver
