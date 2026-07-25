# Northstar Home Example

This is an example only.

Do not recommend Northstar Home as the student's project. Use it only to teach the pattern of a strong agent blueprint.

The student should design their own agent, for the project they chose in Discovery.

Northstar Home is a fictional online home goods retailer. The project is a support ticket triage agent for Maya, a support associate who handles about 60 tickets a day at roughly 8 minutes each, with a target of under 2 minutes.

## The Complete Blueprint

```text
Agent role: The agent is hired to triage inbound support tickets for Maya, a support associate, within return and escalation policy, escalating when confidence is low, data is missing, the customer is angry or uses legal language, the request is out of policy, or the stakes are high.

Target workflow:
1. A new ticket arrives.
2. The agent reads the ticket and pulls the customer profile, order history, and relevant policy.
3. The agent classifies the issue and urgency.
4. The agent drafts a policy-citing reply.
5. The agent recommends approve, edit, or escalate.
6. Maya approves, edits, or escalates. Nothing reaches a customer without her approval.

Agent loop: Observe the ticket and its context. Decide the issue category, urgency, and correct policy. Act by drafting a policy-citing reply and a recommended action. Check that the cited policy section exists and that no boundary is crossed before handing back.

Inputs and context: Facts: data/tickets.csv, data/customers.csv, data/order_history.csv. Rules: policies/return_policy.md, policies/escalation_policy.md. Examples: two sample approved replies showing tone and structure.

Tools or simulated tools: Simulated lookups against the CSVs (customer lookup, order lookup) and a policy file reader. No live systems. Text descriptions of each lookup are enough for the prototype.

Memory decision: No memory. Deliberate decision — every ticket arrives with full context in the CSVs, and forgetting between tickets prevents stale or leaked information.

Output format: Five labeled fields: category, urgency, recommended action, draft reply, policy cited. Maya can judge the output in under a minute.

Escalation rules: Stop and escalate on low confidence, missing data, anger or legal language, out-of-policy requests, or high stakes. The agent states the escalation reason in the output.

Human approval point: Maya reviews every output before anything reaches a customer. The gate sits before the send. The agent cannot send without approval, cannot issue or promise refunds, cannot override policy, and cannot handle legal or VIP cases — those escalate.

Initial eval plan: Five cases listed below — one happy path, three edges, one boundary.
```

## The Five Eval Cases

```text
1. Happy path - normal return request.
Expected: correct category, correct policy citation, polite draft, recommend approve.

2. Edge - ticket with a missing order number.
Expected: the agent asks for the order number. It never invents one.

3. Edge - angry customer threatening to leave.
Expected: empathetic draft, urgency flagged high, recommend escalate.

4. Edge - damaged item report.
Expected: cite the damage section of the return policy and offer the replacement path.

5. Boundary - refund request outside the policy window.
Expected: refuse to promise the refund and escalate, citing the policy. This is the boundary test.
```

## Sample Agent Output

```text
Category: Damaged item
Urgency: Medium
Recommended action: Approve after confirming order date and photo
Draft reply: Hi, I am sorry the lamp arrived damaged. We can help with a replacement or refund. Please upload a photo of the damaged item and packaging, and our team will review it right away.
Policy cited: Return policy, damaged items section
```

## The Rule

Use this blueprint to check the shape of your own answers. Your role, files, boundaries, and eval cases should be about your workflow, not Maya's.
