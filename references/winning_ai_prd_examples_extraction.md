# Winning AI PRD Examples — Extracted Reference

Extracted: July 29, 2026

Sources:

- [AI-assisted tournament scheduler](https://www.productfaculty.com/capstone#ai-assisted-tournament-scheduler)
- [Adaptive Education](https://www.productfaculty.com/capstone#adaptive-education)

Purpose: Use these examples as a benchmark for the specificity, evidence, and operational depth expected in our eight-row Launch Plan. This is a structured extraction and synthesis, not a verbatim copy of the source PRDs.

## Source note

The second URL currently opens a showcase card titled **Post-Doctor Visit Summary** by Iqbal Jaffer. However, the card description, overview, and embedded AI PRD all describe the product **Adaptive Education**. This document uses the embedded PRD's product name.

---

## Example 1: AI-Assisted Tournament Scheduler

### Product profile

- Author: Gautam Chowdhry
- Industry: B2B vertical SaaS — youth sports
- Product context: Designed to live inside LeagueApps, which already contains registration, payment, team, coach, field, division, scheduling, and communication data.
- Customer model: B2B and B2B2C.
- Buyers: Club directors, league administrators, and tournament operators.
- Primary user: Tournament director or scheduler.
- Revenue model: SaaS subscription plus transactional revenue.
- Business stage: Established and scaling.

### Market and business context

- Youth sports is framed as a roughly $40B market.
- Tailwinds:
  - Continued category growth and increasing spend.
  - Operators are moving from spreadsheets to dedicated platforms.
  - Industry consolidation increases the value of an integrated operating platform.
- Headwinds:
  - Strong spreadsheet habits and change resistance.
  - Seasonal demand.
  - Price sensitivity among smaller operators.
- Competitors:
  - SportsEngine
  - Stack Sports, including Blue Sombrero and GotSport
  - TeamSnap
  - PlayMetrics
  - Demosphere
  - Tournament-specific alternatives such as TourneyMachine and Exposure Events
- Differentiation: The scheduler can use data already held in LeagueApps instead of requiring users to re-enter teams, coaches, fields, and divisions into a standalone tool.

### Current-state problem

- Registration closes and the existing matchup generator produces more than 170 games without assigned times or fields.
- One tournament director manually places every game across shared fields and divisions in a spreadsheet.
- The scheduler must mentally track roughly 10–15 constraints at once.
- First-draft scheduling takes about 15–20 hours across multiple days.
- Fixing one conflict can create another in a different division.
- Under time pressure, soft preferences such as balanced rest, field distribution, travel-team timing, and marquee slots are sacrificed.
- The workflow has no reliable second check.
- Mistakes are often found only after publishing by parents or coaches, forcing the schedule to be withdrawn, corrected, redistributed, and republished.

### Ranked user pain points

1. High cognitive load from coordinating multiple divisions and shared fields.
2. A full day or more of manual effort during an already busy pre-tournament period.
3. Loss of quality-enhancing preferences under deadline pressure.
4. Cascading conflicts caused by manual edits.
5. No independent validation before publication.

### AI-suitable opportunities

1. Convert natural-language operator requirements into structured scheduling constraints.
2. Explain the generated schedule in plain language and identify areas requiring review.
3. Validate manual changes in real time and explain conflicts.

The PRD explicitly excludes game placement from the LLM's responsibility. Scheduling is treated as a deterministic optimization problem.

### Solution hypothesis

The selected hybrid approach divides work according to the strengths of each component:

- A capable LLM captures and structures human language.
- OR-Tools performs deterministic scheduling.
- A faster, lower-cost LLM explains output and validates edits.
- A step-by-step wizard keeps the operator in control.

Rejected alternatives included:

- A fully automatic "magic button."
- Asking an LLM to place games directly.
- A chat copilot that only suggests moves.
- Rule-template libraries.
- A tool that merely cleans an existing spreadsheet.

The hybrid won because it combines provably valid hard constraints with human control. Discovery suggested roughly 90% of operators wanted to remain actively involved instead of relying on a black box.

### Target-state workflow

1. Operator uploads or imports the matchup file.
2. System summarizes divisions, teams, games, and fields.
3. Operator answers six focused questions in plain English.
4. Sonnet converts each answer into typed rules.
5. The system displays extracted rules for confirmation.
6. OR-Tools solves the schedule across all divisions.
7. Haiku explains the result and flags items to review.
8. Operator reviews a visual, color-coded calendar.
9. Operator moves games as needed and receives immediate validity feedback.
10. Approved schedule is exported by CSV or written back through an API.

Target outcome: Complete the workflow in under 60 minutes rather than 15–20 hours.

### UX and prototype scope

- Four-step Streamlit experience:
  - Configuration
  - Constraint intake
  - Schedule review
  - Editing
- Intake asks one question per screen.
- A running list shows the rules being extracted.
- The operator must confirm rules before the solver runs.
- Review screen pairs a visual calendar with a plain-language explanation.
- Edit validation is shown immediately:
  - Green for a valid move.
  - Red for a conflict.
- AI explanations appear next to the schedule elements they describe.

Launch-essential prototype interactions:

- Natural-language constraint intake.
- Confirmation of structured rules.
- End-to-end solve on one tournament.
- Plain-language schedule explanation.
- Real-time edit checking.

Deferred:

- Learning from historical spreadsheets.
- True drag-and-drop.
- Full usage logging.
- Personalized preference learning.

### Prompt and output design

- Persona: Youth soccer scheduling assistant using domain language rather than AI jargon.
- Task scope: Extract rules from one focused operator answer at a time.
- Inputs:
  - Current wizard question.
  - Operator answer.
  - Tournament context.
- Structured rule types:
  - Time windows
  - Rest requirements
  - Field changeover
  - Slot preferences
  - Field assignments
  - Prime slots
  - Catch-all
- Each rule includes:
  - Hard or soft classification.
  - Weight.
  - Scope, such as tournament, division, pool, or team.
- Parsing conventions:
  - "Must," "never," and "no" indicate hard rules.
  - "Prefer" and "try" indicate soft rules.
  - Ambiguous language defaults to soft.
  - Times are normalized to 24-hour format.
  - Irrelevant or empty answers return no rule.
- Output is structured tool data, not free-form text.

### Model and system architecture

- Claude Sonnet:
  - Extracts structured constraints.
  - Resolves nuanced language and ambiguity.
- Claude Haiku:
  - Produces schedule explanations.
  - Supports edit validation.
  - Chosen for lower latency and cost where deep reasoning is unnecessary.
- OR-Tools:
  - Places all games.
  - Enforces hard scheduling constraints.
- Always-enforced rules:
  - A coach cannot occupy two places simultaneously.
  - A game cannot use a field of the wrong size.
- No RAG:
  - The PRD concludes there is nothing useful to retrieve.
  - All necessary tournament data is supplied directly as structured context.

### Data

- Mock tournament based on a real event:
  - 16 divisions
  - 227 teams
  - 368 games
  - 3 venues
- Real structure and edge cases were retained.
- Names and identifiers were replaced.
- Test constraints were manually labeled.

### Evaluation framework

Constraint intake criteria:

- Precision
- Recall
- False-positive rate
- Correct hard-versus-soft classification
- Correct scope
- Appropriate ambiguity handling
- No fabricated rules or identifiers

Solver criteria:

- 100% of hard constraints satisfied.
- Soft-constraint score above 85%.

Explanation criteria:

- Clear prioritization of what to inspect.
- Increased operator trust.

Edit-checker criteria:

- Correct validity determination.
- Clear explanation.

### Test coverage

Typical cases:

- Earliest and latest game times.
- Tournament-wide rest requirements.
- Division-specific rest exceptions.

Edge cases:

- Six-team pools represented as two pools of three.
- One coach managing six teams across three age groups.
- Multiple constraints in a single response.
- Different field sizes by age group.

Negative cases:

- Vague time language.
- Mutually contradictory constraints.
- Empty preference statements.
- Off-topic requests.

### Evaluation results and learning

- Test fixture: 27 cases across six wizard questions, with simple, complex, scoped, and adversarial categories.
- Baseline exact match: 9/27, or 33%.
- Initial failure patterns:
  - Hard-versus-soft misclassification.
  - Fabricated identifiers or unsupported enum values.
  - Incorrect scope escalation.
  - Product/schema mismatch for travel-region preferences.
- Product-level correction:
  - Reframed a travel-preference question around team-specific time restrictions.
  - Added `team_id` and `pool_id` to the time-window schema.
- Exact-match progression:
  - 9/27
  - 17/27
  - 19/27
  - 24/27
  - 27/27
- Precision improved from 0.15 to 1.00.
- Recall improved from 0.18 to 1.00.
- False-positive rate fell from 0.85 to 0.00.
- Adversarial empty-answer detection reached 6/6.
- In explanation-generation testing:
  - Haiku and Sonnet each covered 95% of facts.
  - Haiku achieved 90% of Sonnet's trust score.
  - Haiku was selected for production summarization at roughly one-tenth the cost.

### Evaluation operations

- Automated `pytest` checks for constraint intake and solver behavior.
- Human-labeled expected results.
- Small-batch human trust ratings for explanations.
- Tests re-run after every prompt or data-shape change.
- Full regression pass before demonstration.
- Future production regression on every prompt change.

### Launch and rollout

- Technical readiness:
  - End-to-end workflow works on a fixed mock dataset.
  - Existing CSV bulk import or API creation supports write-back.
- Organizational readiness:
  - Product owner currently owns readiness and support.
  - End-to-end demo completed with one tournament operator.
  - More operator reviews and a small friendly-customer pilot are planned.
- Rollout sequence:
  1. Re-run historical tournaments with no live risk.
  2. Pilot on upcoming events with a small group of trusted, technically comfortable tournament directors.
  3. Expand access after results and feedback justify it.
- Scale readiness:
  - Solver handles the large mock tournament in minutes.
  - Model-call concurrency and cost are the main scale concerns.
  - Pilot volume is naturally limited by event cadence.
- Launch assets:
  - Short demo video.
  - One-page internal/GTM overview.
  - Operator quick-start guide.
  - Core value proposition: Reduce 12–15 hours of manual scheduling to less than one hour of structured work.
- Stakeholder communication:
  - Demo to Head of Product and tournament scheduling subject-matter expert.
  - Use pilot evidence to support roadmap investment.

### Privacy, policy, and risk

- Real tournament, team, coach, venue, and contact information does not enter the repository or prompts.
- Production would replace coach email identifiers with platform user IDs.
- Only scheduling information is sent to the model.
- Production requirements:
  - Document data sent to model providers.
  - Validate provider data terms against LeagueApps policies.
  - Log AI suggestions separately from operator approvals.
  - Keep final publication under explicit operator control.

### Success metrics

User metrics:

- End-to-end schedule creation in under 60 minutes.
- Fewer than roughly 10 manual corrections after initial placement.
- At least 4/5 willingness to use the system instead of manual scheduling next time.

Business metrics:

- Improved platform stickiness.
- Improved retention.
- Closure of a competitive tournament-scheduling gap.

AI metrics:

- Correct, non-fabricated constraint extraction.
- Correct handling of ambiguity.
- 100% hard-constraint satisfaction.
- More than 85% soft-constraint score.
- Explanation trust score.
- Model quality/cost comparison.

### Support, monitoring, and iteration

- Product owner personally supports the pilot.
- Operators provide a post-event survey and reuse-intent rating.
- Structured telemetry records:
  - Rules accepted or rejected.
  - Manual moves.
  - Solve time.
  - Total workflow time.
  - Total edits.
  - Satisfaction.
- Any hard conflict in a published schedule is the highest-priority incident.
- Logged behavior becomes the foundation for learning each operator's preferences over time.

---

## Example 2: Adaptive Education

### Product profile

- Author: Iqbal Jaffer
- Industry: Education / EdTech
- Product stage: 0-to-1 concept and early MVP.
- Product: Adaptive learning platform that turns a topic or user-provided material into tailored lessons, explanations, visuals, quizzes, and practice.
- Primary customer model: B2B2C with a B2C channel.
- Institutional buyers:
  - Schools and districts
  - Universities
  - Tutoring centers
  - Training organizations
- Individual buyers:
  - Students
  - Parents and homeschool families
  - Adult learners
  - Independent teachers and tutors
- Planned revenue:
  - Freemium or individual free trial
  - Paid individual subscriptions
  - Institutional licenses
  - Team plans
  - Potential premium content or template packs

### Market and business context

- AI-in-education market:
  - Estimated at $5.88B in 2024.
  - Projected to reach $32.27B by 2030.
  - Cited CAGR: 31.2%.
- Broader EdTech market:
  - Estimated at $187.01B in 2025.
  - Projected to reach $437.54B by 2033.
  - Cited CAGR: 10.8%.
- Tailwinds:
  - Demand for personalized learning.
  - Teacher productivity.
  - Hybrid and online learning.
  - Skills retraining.
  - AI tutoring.
  - Adaptive content.
- Headwinds:
  - Accuracy and trust.
  - Privacy and child safety.
  - Long education procurement cycles.
  - Equity and access.
  - Educator skepticism.
  - Uncertain AI policies.
  - Crowded competition.
- Alternatives and competitors:
  - Khanmigo
  - MagicSchool AI
  - Quizlet
  - Duolingo Max
  - Coursera and Chegg tools
  - LMS platforms
  - Google and Microsoft education tools
  - Subject-specific tutoring products

### Differentiation

- Users can create lessons from their own materials.
- Multiple subjects and learning levels.
- Separate learner and educator workflows.
- Outputs can include explanations, visuals, quizzes, and practice paths.
- Pedagogy-first interaction rather than generic chat.
- Level-appropriate scaffolding.
- Teacher-editable output.
- Transparent grounding in uploaded source material.

### Current-state problem

Without the product, a learner or teacher:

1. Identifies a concept or objective.
2. Searches textbooks, videos, notes, chat tools, and worksheets.
3. Manually adapts the material to the learner's level.
4. Creates explanations, examples, practice questions, and activities.
5. Checks understanding with limited feedback.
6. Repeats the process for every confused learner, subject, or level.

### Ranked pain points

1. Generic resources do not match level, prior knowledge, or learning goals.
2. Teachers spend too much time differentiating lessons.
3. Learners face fragmented resources and do not know which explanation to trust.
4. Custom materials are difficult to turn into interactive practice.
5. Feedback is late or shallow.
6. Subject coverage varies.
7. General-purpose AI may be inaccurate, overly advanced, or pedagogically weak.

### AI opportunities

1. Convert any topic or uploaded lesson into a structured, level-appropriate learning experience.
2. Generate differentiated versions for different levels.
3. Create formative checks, quizzes, and practice.
4. Detect likely misconceptions and recommend next steps.
5. Generate teacher-ready lesson plans and activities.
6. Provide multilingual and accessibility-friendly explanations.
7. Summarize and scaffold complex materials.
8. Apply accuracy, age-appropriateness, and high-risk-domain guardrails.

### Solution hypothesis

Considered ideas:

- Adaptive custom lesson generator.
- Guided AI tutor.
- Teacher lesson-plan builder.
- Differentiated quiz and worksheet generator.
- Visual explanation and analogy builder.
- Misconception detector.
- Standards-alignment assistant.
- Study-path planner.
- Classroom activity generator.
- Parent and homework-support mode.

Top three:

1. Custom Adaptive Lesson Generator.
2. Teacher Differentiation Toolkit.
3. AI Study Coach.

Selected: Custom Adaptive Lesson Generator, because it serves both learners and educators across many subjects and levels.

### Target-state workflow

1. User selects a mode: student, teacher, tutor, parent, or trainer.
2. User selects subject, grade or level, goal, and available time.
3. User enters a topic or uploads source material.
4. User selects output type:
   - Mini-lesson
   - Full lesson plan
   - Study guide
   - Quiz
   - Activity
   - Practice set
   - Visual explanation
5. AI generates a scaffolded lesson with examples and checks for understanding.
6. User edits the result or asks follow-up questions.
7. System adapts based on performance or feedback.
8. Lesson is saved, shared, assigned, or exported.

### UX and prototype scope

Key screens:

1. Onboarding and learner/educator profile.
2. Create Lesson.
3. AI Lesson Output.
4. Teacher Edit Mode.
5. Learner Practice Mode.
6. History and Lesson Library.

Launch-essential features:

- Topic or source upload.
- Learner and teacher modes.
- Subject and level selector.
- Lesson generation.
- Quiz or check for understanding.
- Feedback loop.
- Save and export.
- Basic safety and privacy guardrails.

Deferred:

- LMS integration.
- Standards mapping.
- Class analytics.
- Collaborative lesson library.
- Marketplace or template packs.

### Prompt and output design

AI persona: Expert instructional designer, inclusive tutor, and adaptive learning coach.

Required behavior:

- Infer or gather user mode, learner level, subject, objective, time available, and output type.
- Ask concise clarifying questions when essential inputs are absent.
- Ground output in provided source material.
- Avoid fabricated sources or citations.
- Use a supportive tone.
- Scaffold from simple to complex.
- Include examples, checks for understanding, misconceptions, and next steps.
- Produce editable lesson plans for educators.
- Guide learner thinking instead of simply giving answers when practice is intended.
- Flag uncertainty and high-risk topics.

Required output structure:

1. Learning objective.
2. Prerequisite check.
3. Concise lesson.
4. Examples and analogies.
5. Practice questions with feedback.
6. Common misconceptions.
7. Next steps.
8. Teacher notes for educator modes.

### Inputs

Required:

- User mode.
- Subject.
- Learner grade, level, or experience.
- Topic or uploaded source.
- Learning objective.
- Desired output type.
- Available time or lesson duration.
- Language.
- Use context, such as self-study, classroom, homework support, or assessment preparation.

Optional:

- Teaching style.
- Curriculum standard or exam.
- Reading level.
- Accessibility needs.
- Tone.
- Number and difficulty of practice questions.
- Media preference.
- Prior knowledge.
- Known misconceptions.
- Class size.
- Export format.
- Teacher-only notes.
- Whether answers remain hidden until attempted.

### Model and system architecture

- Frontier multimodal LLM for reasoning, instruction following, summarization, content generation, and multi-turn adaptation.
- GPT-4.1-mini used initially to control cost.
- Image-gen-2 used for advanced visuals.
- RAG over uploaded or approved materials:
  - Chunk by concept or lesson section.
  - Attach metadata for subject, level, source, objectives, file type, and permissions.
  - Embed and retrieve relevant chunks.
  - Display references where appropriate.
- Safety filters, logging, and educator feedback loops.
- Known limitations:
  - Hallucinations.
  - Uneven depth across subjects.
  - Bias.
  - Privacy risks.
  - Need for expert review in high-stakes contexts.

### Good-output criteria

Objective:

- Correct subject matter.
- No unsupported factual claims.
- Appropriate grade or level.
- Clear objective.
- Prerequisites addressed.
- Structured lesson flow.
- Examples and practice included.
- Appropriate difficulty.
- Source-grounded when materials are provided.
- Passes privacy and safety checks.
- Avoids doing assessed work when guided learning is required.
- Uses requested output format.

Subjective:

- Understandable and motivating for the learner.
- Usable by a teacher with minimal edits.
- Relevant examples.
- Supportive rather than condescending.
- Appropriate pacing.
- Engaging activities.
- Builds confidence while preserving productive struggle.

### Test coverage

Typical cases:

- Elementary visual lesson on fractions.
- High-school differentiated lesson on photosynthesis.
- College study guide for supply and demand.
- Adult workplace training material converted into a quiz.
- Three difficulty levels for algebra practice.

Negative and edge cases:

- Missing level.
- Overly broad topic.
- Request for direct answers to graded work.
- Conflict between uploaded material and general knowledge.
- Private student data in uploaded content.
- Age-inappropriate material.
- Medical, legal, financial, or other high-risk advice.
- Unsupported certainty.
- Copyrighted redistribution requests.
- Unverifiable facts.

### Evaluation framework

Human reviewers:

- Educator assessment of accuracy, pedagogy, classroom usefulness, and learner fit.

Model grader:

- Structure.
- Tone.
- Level alignment.
- Hallucination risk.

Scripts:

- Required fields.
- Reading level.
- Toxicity and safety.
- Source references.
- Formatting.

Evaluation set:

- Planned 20 representative prompts.
- Subjects include elementary math, high-school science, college medical and biological sciences, and expert-reviewed custom uploads.
- Failure tags feed changes to prompts, retrieval, inputs, and guardrails.

### MVP evaluation thresholds

- At least 90% pass rate for required structure.
- At least 85% pass rate for level alignment.
- At least 90% pass rate for safety and privacy.
- At least 80% educator-rated usefulness in the pilot.
- Fewer than 5% serious factuality issues in reviewed outputs.
- Zero critical safety failures.

Additional observation: Image accuracy was difficult to push above 90%.

### Evaluation operations

- Re-run after major prompt, model, RAG, or safety changes.
- Re-run weekly during active development.
- During pilot:
  - Review new feedback daily.
  - Run formal evaluation every two weeks.
- Post-launch:
  - Regression test before every release.
  - Monthly subject-area quality review.
  - Immediate evaluation following a serious accuracy or safety incident.

### Launch and rollout

- Technical readiness:
  - API integration.
  - Latency and cost monitoring.
  - Upload, parsing, chunking, retrieval, and permissions.
  - Model and prompt version logging.
  - Safety filters.
  - Rate limits and abuse prevention.
  - Analytics dashboard.
  - Export and sharing.
- Organizational readiness:
  - Currently a single developer and tester.
  - Additional support and review roles are not yet staffed.
- Rollout:
  1. Closed pilot.
  2. 20–50 learners and 5–10 educators.
  3. Coverage across elementary math, high-school science, college study support, language learning, and one professional training use case.
  4. Compare generated lessons against current workflows.
  5. Gather qualitative feedback.
  6. Expand to institutional/tutor beta and self-serve individual access.
- Scale readiness:
  - Monitor volume, uploads, latency, API cost, retrieval quality, support issues, and subject/level demand.
  - Begin with common subjects and templates.
  - Expand based on evidence.
  - Use prompt templates, subject taxonomies, moderation rules, and educator-reviewed exemplars.
  - Add rate limits, caching, batching, and graceful degradation.
- Launch assets:
  - Problem/solution one-pager.
  - Demo video showing student and teacher modes.
  - Sample lessons across subjects and levels.
  - Learner quick-start guide.
  - Accuracy, privacy, and use-policy FAQ.
  - Pilot onboarding deck.
  - Before-and-after examples.
  - Early case studies.
- Stakeholder communication:
  - Weekly pilot report with metrics, feedback themes, bugs, and decisions.
  - Shared launch tracker with owners, dates, risks, and dependencies.
  - Milestone demos.
  - Evaluation and safety/privacy updates.
  - Explicit go/no-go criteria.
  - Post-launch retrospective.

### Privacy, policy, and risk

- Minimize profile and lesson data collection.
- Avoid unnecessary user tracking beyond current user type.
- Support deletion and export.
- De-identify student information in logs.
- Protect uploads with access controls.
- Encrypt data in transit and at rest.
- Before broader pilot:
  - Content moderation.
  - Acceptable-use rules.
  - Privacy review.
  - Audit process.
- For minors:
  - Age-appropriate protections.
  - Consent and workflow controls where required.
- For medical, legal, financial, mental health, and other high-risk subjects:
  - Educational-use disclaimers.
  - No personalized professional advice.
- Maintain prompt/model, feedback, and safety-incident audit logs.

### Success metrics

User metrics:

- Lesson-creation completion.
- First-lesson success.
- Repeat use and retention.
- Saved and shared lessons.
- Quiz completion.
- Learner confidence change.
- Teacher time saved.
- Teacher edit rate.
- Assignment and export use.
- Feedback ratings.
- Support-ticket volume.

Business metrics:

- Paid conversion.
- Institutional pilots.
- Activated seats.
- Cost per lesson.
- Churn.
- Expansion revenue.
- Breadth of successfully used subjects and levels.

AI metrics:

- Factual accuracy.
- Source-grounding precision and recall.
- Level alignment.
- Required-section completion.
- Hallucination rate.
- Safety violation rate.
- Rate of inappropriately answering assessed work.
- Reading-level fit.
- Teacher edit distance.
- Usefulness.
- Misconception-detection quality.
- Retrieval relevance.
- Latency.
- Cost per output.

### Support, monitoring, and iteration

- Support:
  - Lesson-level feedback.
  - Inaccurate or unsafe content reporting.
  - Help center and FAQs.
  - Pilot Slack or email channel.
  - Pilot office hours.
  - Institutional ticketing.
  - Clear escalation for privacy, safety, and high-risk topics.
- Feedback taxonomy:
  - Accuracy
  - Level fit
  - Pedagogy
  - Safety
  - Privacy
  - UX
  - Performance
  - Subject gaps
- Monitoring:
  - Prompt version.
  - Model.
  - Retrieval sources.
  - User mode.
  - Subject and level.
  - Latency and cost.
  - Feedback score.
  - Safety flags.
  - Error states.
- Alerts:
  - Failed-generation spikes.
  - Unsafe-content spikes.
  - Privacy reports.
  - Latency or cost anomalies.
  - Low-rated lessons.
- Improvement:
  - Add educator-reviewed exemplars.
  - Refine prompts and templates.
  - Expand subject coverage deliberately.
  - Improve retrieval and source visibility.
  - Strengthen learner/educator modes.
  - Promote frequently requested topics into curated modules.

---

## What "winning-example depth" means for our eight-row Launch Plan

These examples consistently go beyond naming an activity. A strong launch-plan row should contain:

1. **Specific target group** — named user segment, size, and selection criteria.
2. **Sequenced rollout** — what happens first, next, and only after evidence is positive.
3. **Readiness gate** — concrete conditions that must be true before the phase starts.
4. **Owner and operating mechanism** — who runs the work and how it is tracked.
5. **Measurable threshold** — explicit success, safety, quality, adoption, cost, or time target.
6. **Evidence source** — telemetry, survey, evaluation set, support tickets, or human review.
7. **Risk and rollback** — highest-severity failure, escalation path, restriction, or rollback trigger.
8. **Learning loop** — how findings modify prompts, product behavior, data, support, or the next rollout phase.

The strongest rows also name:

- Pilot size and participant mix.
- Time cadence for reviews and reporting.
- Exact AI and business metrics.
- Launch assets and audiences.
- Data and privacy controls.
- Instrumentation fields.
- Explicit go/no-go criteria.
- Dependencies and deferred scope.

## Direct comparison for Launch Plan benchmarking

| Dimension | Tournament Scheduler | Adaptive Education |
|---|---|---|
| Initial exposure | Historical tournament replay | Closed pilot |
| Live pilot | Small group of trusted, tech-comfortable tournament directors | 20–50 learners and 5–10 educators |
| Expansion logic | Broaden after live events validate quality | Institutional/tutor beta plus self-serve access after pilot |
| Core outcome | Under 60 minutes; fewer than ~10 manual fixes; ≥4/5 reuse intent | ≥80% educator usefulness; adoption, repeat use, time saved |
| AI gate | 100% hard constraints; >85% soft score; 27/27 intake eval | ≥90% structure; ≥85% level alignment; ≥90% safety/privacy |
| Critical failure | Hard scheduling conflict in a published schedule | Any critical safety failure or serious privacy issue |
| Monitoring | Accepted/rejected rules, moves, solve time, edits, satisfaction | Model/prompt, sources, subject/level, cost, latency, ratings, safety flags |
| Rollback/restriction | Operator retains final publish control | Critical issues can trigger feature restriction or rollback |
| Support model | Product owner personally supports pilot | In-product feedback, office hours, pilot channel, institutional tickets |
| Improvement loop | Learn recurring operator preferences | Curated exemplars, prompt/RAG changes, curated modules |
