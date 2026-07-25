# Northstar Home Example

This is an example only.

Do not recommend Northstar Home as the student's project. Use it only to teach the pattern of a strong capstone idea.

The student should choose their own project.

Northstar Home is a fictional online home goods retailer.

## Project Idea

Build a support ticket triage agent.

## User

Support associate.

## Workflow

A new customer support ticket arrives. The associate reads the ticket, checks order context, checks policy, classifies urgency, drafts a response, and decides whether to escalate.

## Agent Job

The agent helps by:

- Summarizing the ticket.
- Classifying the issue.
- Checking relevant policy.
- Drafting a response.
- Recommending urgency.
- Recommending approve, edit, or escalate.

## Human Boundary

The agent cannot:

- Send messages without approval.
- Issue refunds.
- Override policy.
- Make exceptions.
- Handle legal, safety, or harassment issues without escalation.

## Synthetic Data

Use:

- `data/tickets.csv`
- `data/customers.csv`
- `data/order_history.csv`
- `policies/return_policy.md`
- `policies/escalation_policy.md`

## Example Agent Output

```text
Ticket summary:
Customer says the lamp arrived damaged and wants a replacement.

Classification:
Damaged item.

Urgency:
Medium.

Policy check:
Damaged items are eligible for replacement or refund if reported within 30 days.

Draft response:
Hi Maya, I am sorry the lamp arrived damaged. We can help with a replacement or refund. Please upload a photo of the damaged item and packaging, and our team will review it right away.

Recommended action:
Human approve after confirming order date and photo.
```
