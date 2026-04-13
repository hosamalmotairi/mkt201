# PPTX Content Injection Design Spec

**Goal:** Add all missing PPTX slide content to the existing lo-section HTML structure in `mkt201_midterm.html`, making each chapter 100% complete.

**Approach:** 4 parallel subagents (one per chapter). Each agent extracts its PPTX, reads its lo-sections, identifies gaps, and injects missing HTML.

---

## Source Files

| Chapter | PPTX | HTML Lines (lo-sections) |
|---------|------|--------------------------|
| Ch1 | `/Users/hosam/Downloads/ch-01-PPTaccessible.pptx` | LO 1-1 (439) → LO 1-5 (796–836) |
| Ch2 | `/Users/hosam/Downloads/ch-02-PPTaccessible.pptx` | LO 2-1 (936) → LO 2-5 (1248–1466) |
| Ch3 | `/Users/hosam/Downloads/ch-03-PPTaccessible.pptx` | LO 3-1 (1468) → LO 3-5 (1793–1822) |
| Ch5 | `/Users/hosam/Downloads/ch-05-PPTaccessible.pptx` | LO 5-1 (1911) → LO 5-4 (2291–2417) |

**Target file:** `/Users/hosam/Desktop/MKT 201 exam/mkt201_midterm.html`

---

## PPTX Extraction Method

Each agent extracts slide text using Python zipfile (no external dependencies):

```python
import zipfile, xml.etree.ElementTree as ET

def extract_pptx(path):
    slides = []
    with zipfile.ZipFile(path) as z:
        slide_files = sorted([f for f in z.namelist()
                              if f.startswith('ppt/slides/slide') and f.endswith('.xml')])
        for sf in slide_files:
            with z.open(sf) as f:
                tree = ET.parse(f)
                texts = [e.text.strip() for e in tree.iter()
                         if e.tag.endswith('}t') and e.text and e.text.strip()]
                if texts:
                    slides.append(' | '.join(texts))
    return slides
```

---

## HTML Element Mapping

Each agent must map slide content to the correct HTML element:

| Content Type | HTML Element | When to Use |
|---|---|---|
| Term + definition | `def-spotlight` | Named concepts with formal definitions |
| 2 contrasting ideas | `concept-row` + 2× `concept-card` | Side-by-side comparisons |
| 3-5 similar concepts | `concept-row` + multiple `concept-card` | Groups of related concepts |
| Sequential steps | `process-flow` + `process-step` (with `process-num`) | Numbered processes/stages |
| "Remember this" summary | `memory-box` | Key relationships, mnemonics, order |
| Exam-critical fact | `exam-tip` | Frequently tested, easy to confuse |
| Section subheading | `<h3>` | Major subtopic within an LO |
| Bullet list | `<ul class="slide-bullets"><li>` | Lists that don't fit cards |

**Concept card colors** (rotate through): `teal`, `blue`, `purple`, `amber`, `rose`

---

## Bilingual Requirement (MANDATORY)

**Every piece of content must have Arabic.** No exceptions.

```html
<!-- For def-spotlight -->
<div class="def-spotlight">
  <div class="def-term">📌 Term — المصطلح بالعربي</div>
  <div class="def-body">English definition with <strong>key terms bolded</strong>.</div>
  <div class="ar-line">الشرح بالعربي الكامل.</div>
</div>

<!-- For concept-card -->
<div class="concept-card teal">
  <strong>Concept Name (الاسم)</strong>
  <p>English description.<span class="ar-line">الشرح بالعربي.</span></p>
</div>

<!-- For process-step -->
<div class="process-step">
  <div class="process-num">1</div>
  <div class="process-content">
    <strong>Step Name</strong>
    <span class="ar-line">اسم الخطوة بالعربي</span>
    <p>English detail.<span class="ar-line">التفصيل بالعربي.</span></p>
  </div>
</div>

<!-- For memory-box -->
<div class="memory-box">English key point.<span class="ar-line">النقطة المهمة بالعربي.</span></div>

<!-- For exam-tip -->
<div class="exam-tip">English exam tip.<span class="ar-line">نصيحة الامتحان بالعربي.</span></div>
```

---

## Rules for Each Agent

### DO:
- Read the PPTX fully before touching the HTML
- Read ALL existing lo-sections for your chapter before making any edits
- Add content INSIDE `<div class="lo-body">` of the relevant lo-section, BEFORE the closing `</div>`
- Follow existing element patterns exactly (copy structure, not content)
- Add Arabic translation for every English phrase
- Use `exam-tip` for any concept that appears in `pastQuestions[]` (past exam material)
- Commit after completing your chapter

### DO NOT:
- Touch lo-sections belonging to other chapters
- Modify or delete any existing content
- Add duplicate content (check existing text before adding)
- Use any HTML class not already present in the file
- Add content outside `lo-body` divs
- Skip Arabic translation

---

## LO → Slide Content Mapping

### Chapter 1 LOs
| LO | Topic | Key Missing Content |
|----|-------|---------------------|
| 1-1 | What is Marketing? | Product concept, Selling concept (named formally with contrast diagram) |
| 1-2 | Marketplace & 5 Concepts | Customer satisfaction definition, customer value definition, exchange relationships |
| 1-3 | Marketing Strategy | Marketing management definition, segmentation/targeting/positioning overview, value proposition examples |
| 1-4 | CRM & Value Capture | Customer-perceived value, customer satisfaction, consumer-generated marketing, partner relationship management, customer lifetime value |
| 1-5 | Changing Landscape | Digital age/IoT, social media marketing, mobile marketing, sustainable marketing, not-for-profit marketing, globalization |

### Chapter 2 LOs
| LO | Topic | Key Missing Content |
|----|-------|---------------------|
| 2-1 | Strategic Planning | 4 steps of strategic planning, SBU definition, mission statement market-orientation |
| 2-2 | Portfolio & Growth | BCG matrix limitations, Ansoff matrix full detail, value delivery network |
| 2-3 | Marketing's Role | Marketing's role in cross-functional planning, partnering with other departments |
| 2-4 | Marketing Mix | Full 4Ps detail, market segmentation/targeting/positioning (STP) formal definitions, differentiation |
| 2-5 | Managing & ROI | Marketing implementation, marketing control (4 steps), operating/strategic control types |

### Chapter 3 LOs
| LO | Topic | Key Missing Content |
|----|-------|---------------------|
| 3-1 | Micro & Macro Environment | 6 actors of microenvironment (company, suppliers, intermediaries, customer markets, competitors, publics), 7 types of publics |
| 3-2 | Demographic Environment | Generational segments (Baby Boomers, Gen X, Millennials, Gen Z, Gen Alpha), changing family structures, geographic shifts, diversity |
| 3-3 | Economic & Natural | Economic environment detail (consumer spending, income levels), natural environment (raw materials, pollution, sustainability) |
| 3-4 | Tech & Political | Technological innovation impact, R&D spending, legislation types (protecting companies/consumers/society), cause-related marketing |
| 3-5 | Cultural Environment | Cultural values shifts (views of self/others/organizations/society/nature/universe), core vs secondary beliefs detail |

### Chapter 5 LOs
| LO | Topic | Key Missing Content |
|----|-------|---------------------|
| 5-1 | Consumer Behavior Model | Model of consumer behavior (stimulus → black box → response), cultural factors complete (subculture types, social class) |
| 5-2 | Social & Personal Factors | Family influence, roles & status, word-of-mouth, online social networks, influencer marketing, occupation, age & life stage, personality & brand personality |
| 5-3 | Psychological Factors | Maslow's hierarchy (5 levels), motivation research, learning process (drives/stimuli/cues/responses/reinforcement), beliefs & attitudes, subliminal advertising |
| 5-4 | Buyer Decision Process | 5-stage process complete (need recognition→info search→evaluation→purchase→postpurchase), 4 buying behavior types (complex/dissonance-reducing/habitual/variety-seeking), new product adoption (5 stages + 5 adopter categories) |

---

## Commit Convention

Each agent commits separately:
```bash
git add mkt201_midterm.html
git commit -m "content: complete Ch[N] lo-sections with full PPTX slide content"
```

Since 4 agents run in parallel and all edit the same file, **agents must NOT run git operations simultaneously**. Each agent makes its edits, then the main session commits chapter by chapter after all edits are done.

> **Note on parallel edits:** Because all agents edit the same file, they should NOT commit. Instead, each agent reports "DONE — edits applied" and the main session commits once all 4 are complete.

---

## Success Criteria

- Every lo-section has content covering all slides in its LO range
- No lo-section is empty or has only a title
- Every element has Arabic translation via `ar-line`
- No existing content was modified or deleted
- HTML is valid (all tags properly closed)
- File renders without JS errors
