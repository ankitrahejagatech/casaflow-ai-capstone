# Synthetic Data Starter

Use synthetic data by default. The goal is to make the workflow realistic without using private or sensitive data.

Create synthetic data for the student's own project. Do not force the student into the Northstar Home example.

## What To Create

For most capstone projects, create:

- 10 user inputs
- 5 user profiles
- 5 history rows
- 2 short policy docs
- 5 eval cases

## Prompt

```text
Create synthetic data for my agentic AI capstone.

Project:
[describe project]

Create:
1. 10 realistic workflow inputs
2. 5 fake user profiles
3. 5 fake history rows
4. 2 short policy documents
5. 5 eval cases

Use fake names, fake IDs, and no real company data.
Make the data realistic enough to demo edge cases.
Return CSVs for structured data and Markdown for policies.
```

## Data Quality Bar

Good synthetic data includes:

- Normal cases
- Missing information
- Angry or confused users
- Policy edge cases
- Escalation cases
- Clear expected behavior

## Privacy Rule

Do not paste real customer, employee, company, health, financial, legal, or private data into AI tools.
