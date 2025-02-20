Feature: Login Functionallity

  Background:
    Given I open Automation Excercise

  @TC01
  Scenario: Verify the title of web is correct
    Then I check the title of web

  @TC02
  Scenario: Verify login with the empty data
    When I click on the SignIn cta in the Header
    When I click the Log In button without filling in any data
    Then I should not be able to log in successfully and displayed error message

  @TC03
  Scenario: Verify login with invalid email
    When I click on the SignIn cta in the Header
    When I log in with the invalid <email>
    Then I should not be able to log in successfully and displayed error message

    Examples:
      | email |
      | hanh  |