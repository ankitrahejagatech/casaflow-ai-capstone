# 01 - Discovery Walkthrough

Goal: choose your own safe, specific, demoable agentic workflow and prepare Discovery PRD answers.

Discovery answers:

```text
What recurring workflow should an agent help with, and why is this worth solving?
```

## Stop Point

This companion stops at Discovery.

Do not continue to Design, Develop, or Deploy until your instructor gives you the next guide.

## Step 1: Pick A Lane

Choose one lane:

1. Work-inspired workflow with synthetic data
2. Fictional business workflow
3. Consumer workflow

Good projects can come from any lane.

Northstar Home is only an example of lane 2. It is not the default project.

## Step 2: Name A Workflow

A workflow is a recurring sequence of steps.

It has:

- A trigger
- A user
- Steps
- Decisions
- Data or context
- Output
- Human boundary

Weak:

```text
A chatbot for travel.
```

Better:

```text
An itinerary planning agent that gathers preferences, checks constraints, proposes a weekend plan, and asks the user to approve changes.
```

## Step 3: Grill The Idea

Use this prompt:

```text
Act as my Discovery coach.
Ask one question at a time.
Do not let me move forward until I have my own specific user, clear trigger, recurring workflow, safe synthetic data plan, visible demo output, and human boundary.
Do not recommend Northstar Home as my project. Use it only as an example if needed.
```

## Step 4: Answer The Discovery Questions

The companion should ask these one at a time:

1. Who is the specific user?
2. What event starts the workflow?
3. What does the user do today?
4. Where does the workflow slow down or fail?
5. What decision should the agent help with?
6. What should the agent not be allowed to do?
7. What data can you safely use?
8. What output will the demo show?
9. What metric would show value?
10. What would make this clearly agentic?

## Step 5: Write The Discovery PRD Answers

When the idea is strong enough, the companion should produce this format:

```text
User:

Workflow:

Trigger:

Current process:

Pain points:

Agent opportunity:

Synthetic data plan:

Human boundary:

Success metric:

Initial demo idea:
```

## Good Example Format

This example uses Northstar Home only to show the pattern:

```text
User: Support associate at a fictional home goods retailer.
Workflow: Support ticket triage.
Trigger: A new customer support ticket arrives.
Current process: The associate reads the ticket, checks order history, checks return policy, classifies urgency, drafts a response, and decides whether to escalate.
Pain points: Tickets are repetitive, policy interpretation is inconsistent, and urgent cases can be missed.
Agent opportunity: The agent can summarize the ticket, check policy, classify urgency, draft a response, and recommend approval or escalation.
Synthetic data plan: Fake customer tickets, customer profiles, order history, return policy, and escalation policy.
Human boundary: A human must approve refunds, exceptions, and outbound messages.
Success metric: Draft acceptance rate and escalation accuracy.
Initial demo idea: Show one ticket moving through input, context check, agent recommendation, draft response, and human review.
```

## Final Stop Message

At the end, the companion should say:

```text
Discovery is complete. Paste these answers into your Discovery PRD section. Stop here and wait for the Design guide before moving forward.
```

