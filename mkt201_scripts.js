// ══════════════════════════════════════════════
//  MKT 201 — Principles of Marketing Study Hub
//  All Quiz Questions, Flash Cards & Logic
// ══════════════════════════════════════════════

'use strict';

// ── FIREBASE CONFIG ───────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyAGi32F3NSdwO9dxuVZ9UFMB9HH4XFg_-A",
  authDomain: "mkt201-study-hub.firebaseapp.com",
  projectId: "mkt201-study-hub",
  storageBucket: "mkt201-study-hub.firebasestorage.app",
  messagingSenderId: "39900605711",
  appId: "1:39900605711:web:de27e34772482ec8bb227a",
  measurementId: "G-7CN9VRC3W1"
};

// ── STATE ─────────────────────────────────────
let currentUser = null;
let bestScores   = JSON.parse(localStorage.getItem('mkt201_bestScores')   || '{}');
let totalQuizzes = parseInt(localStorage.getItem('mkt201_totalQuizzes')   || '0');
let totalCorrect = parseInt(localStorage.getItem('mkt201_totalCorrect')   || '0');
let arabicVisible = true;

// ══════════════════════════════════════════════
//  FLASH CARDS DATA (60 cards, 15 per chapter)
// ══════════════════════════════════════════════
const flashCards = [
  // ── CHAPTER 1 ─────────────────────────────
  { ch:"ch1", front:"Marketing", back:"A process by which companies create value for customers and build strong customer relationships in order to capture value from customers in return." },
  { ch:"ch1", front:"Needs", back:"States of felt deprivation — basic human requirements such as food, clothing, warmth, and safety." },
  { ch:"ch1", front:"Wants", back:"The form that human needs take as they are shaped by culture, personality, and individual experience." },
  { ch:"ch1", front:"Demands", back:"Human wants that are backed by buying power — when people have the ability and willingness to purchase." },
  { ch:"ch1", front:"Market Offerings", back:"Some combination of products, services, information, or experiences offered to a market to satisfy a need or want." },
  { ch:"ch1", front:"Marketing Myopia", back:"The mistake of paying more attention to the specific products a company offers than to the benefits and experiences produced; losing sight of underlying consumer needs." },
  { ch:"ch1", front:"Exchange", back:"The act of obtaining a desired object from someone by offering something in return; the core concept of marketing." },
  { ch:"ch1", front:"Market", back:"The set of all actual and potential buyers of a product or service." },
  { ch:"ch1", front:"Value Proposition", back:"The set of benefits or values a company promises to deliver to consumers to satisfy their needs; why customers should choose a product over competitors." },
  { ch:"ch1", front:"Production Concept", back:"Marketing management orientation holding that consumers will favor products that are available and highly affordable; focus on improving production and distribution efficiency." },
  { ch:"ch1", front:"Marketing Concept", back:"The philosophy that achieving organizational goals depends on knowing the needs and wants of target markets and delivering the desired satisfactions better than competitors; an outside-in perspective." },
  { ch:"ch1", front:"Societal Marketing Concept", back:"The concept that a company should make good marketing decisions by considering consumers' wants, the company's requirements, and society's long-run interests simultaneously." },
  { ch:"ch1", front:"Customer Relationship Management (CRM)", back:"The overall process of building and maintaining profitable customer relationships by delivering superior customer value and satisfaction." },
  { ch:"ch1", front:"Customer Equity", back:"The total combined customer lifetime values of all of the company's customers; a measure of the future value of the company's customer base." },
  { ch:"ch1", front:"Share of Customer", back:"The portion of the customer's purchasing that a company gets in its product categories; getting more business from existing customers." },
  { ch:"ch1", front:"Value and Satisfaction", back:"Customer value = benefits gained minus costs of obtaining a market offering. Satisfaction = perceived performance matches or exceeds expectations. Delighted customers become brand evangelists." },
  { ch:"ch1", front:"Product Concept", back:"The idea that consumers will favor products offering the most quality, performance, and features; focus on continuous product improvements. Can lead to marketing myopia." },
  { ch:"ch1", front:"Selling Concept", back:"The idea that consumers will not buy enough unless the firm undertakes large-scale selling and promotion. Inside-out perspective. Typically used for unsought goods (e.g., insurance, blood donations)." },
  { ch:"ch1", front:"Customer Lifetime Value (CLV)", back:"The total stream of purchases a customer will make over a lifetime of patronage. Keeping existing customers is more profitable than constantly acquiring new ones." },
  { ch:"ch1", front:"Marketing Mix (4 Ps)", back:"The set of tactical marketing tools: Product (what you offer), Price (what you charge), Place (how you deliver), Promotion (how you communicate). Blended into an integrated program." },
  { ch:"ch1", front:"4 Cs (Customer View)", back:"Customer-centered reframe of 4 Ps: Product → Customer Solution, Price → Customer Cost, Place → Convenience, Promotion → Communication." },
  { ch:"ch1", front:"Customer-Engagement Marketing", back:"Making the brand a meaningful part of consumers' conversations and lives by fostering direct involvement in shaping brand experiences and community — beyond just transactions." },
  { ch:"ch1", front:"Consumer-Generated Marketing", back:"Brand exchanges created by consumers themselves — reviews, videos, posts — that marketers invite or amplify to shape brand content." },
  { ch:"ch1", front:"Partner Relationship Management", back:"Working closely with partners inside other company departments and outside the company to jointly bring greater value to customers." },
  { ch:"ch1", front:"4 Customer Relationship Types", back:"Strangers (low profit, low loyalty), Butterflies (high profit, low loyalty), Barnacles (high loyalty, low profit), True Friends (high profit, high loyalty) ← goal." },

  // ── CHAPTER 2 ─────────────────────────────
  { ch:"ch2", front:"Strategic Planning", back:"The process of developing and maintaining a strategic fit between the organization's goals and capabilities and its changing marketing opportunities." },
  { ch:"ch2", front:"Mission Statement", back:"A statement of the organization's purpose — what it wants to accomplish in the larger environment. Should be market-oriented, not product-oriented." },
  { ch:"ch2", front:"Business Portfolio", back:"The collection of businesses and products that make up the company; guides resource allocation decisions." },
  { ch:"ch2", front:"Stars (BCG Matrix)", back:"High-growth, high-market-share businesses or products. Require heavy investment but will eventually become cash cows as growth slows." },
  { ch:"ch2", front:"Cash Cows (BCG Matrix)", back:"Low-growth, high-market-share businesses or products. Established and successful, require less investment to maintain market share; generate cash." },
  { ch:"ch2", front:"Question Marks (BCG Matrix)", back:"Low-share business units in high-growth markets. Require a lot of cash to hold their share; uncertain future — can become stars or dogs." },
  { ch:"ch2", front:"Dogs (BCG Matrix)", back:"Low-growth, low-share businesses and products. May generate enough cash to maintain themselves but do not promise to be large sources of cash." },
  { ch:"ch2", front:"Market Penetration", back:"A growth strategy increasing sales of current products to current market segments without changing the product; same product, same market, more sales." },
  { ch:"ch2", front:"Market Development", back:"A growth strategy that identifies and develops new market segments for current company products; taking existing products into new markets." },
  { ch:"ch2", front:"Product Development", back:"A growth strategy that offers new or modified products to existing market segments; selling new products to existing customers." },
  { ch:"ch2", front:"Diversification", back:"A growth strategy through starting up or acquiring businesses outside the company's current products and markets; new products in new markets." },
  { ch:"ch2", front:"Value Chain", back:"The series of internal departments that carry out value-creating activities to design, produce, market, deliver, and support a firm's products." },
  { ch:"ch2", front:"SWOT Analysis", back:"An overall evaluation of the company's Strengths, Weaknesses, Opportunities, and Threats; used for strategic planning." },
  { ch:"ch2", front:"Marketing ROI", back:"The net return from a marketing investment divided by the costs of the marketing investment; measures marketing profitability." },
  { ch:"ch2", front:"Downsizing", back:"Reducing the business portfolio by eliminating products or business units that are not profitable or that no longer fit the company's overall strategy." },
  { ch:"ch2", front:"Strategic Business Unit (SBU)", back:"A unit of the company with a separate mission and objectives that can be planned independently. Can be a division, a product line, or a single product/brand." },
  { ch:"ch2", front:"BCG Growth-Share Matrix", back:"Portfolio tool evaluating SBUs on two axes: market growth rate (vertical = industry attractiveness) and relative market share (horizontal = company strength). Produces Stars, Cash Cows, Question Marks, Dogs." },
  { ch:"ch2", front:"Market Segmentation", back:"Dividing a market into distinct groups of buyers with different needs, characteristics, or behaviors who might require separate products or marketing programs." },
  { ch:"ch2", front:"Differentiation", back:"Actually differentiating the market offering to create superior customer value compared to competitors; making a product distinct in target customers' eyes." },
  { ch:"ch2", front:"Positioning", back:"Arranging for a product to occupy a clear, distinctive, and desirable place relative to competing products in the minds of target consumers." },
  { ch:"ch2", front:"Value Delivery Network", back:"The company, its suppliers, distributors, and ultimately customers who partner together to improve the performance of the entire system in delivering customer value." },
  { ch:"ch2", front:"Marketing Implementation", back:"The process that turns marketing strategies and plans into marketing actions to accomplish strategic marketing objectives — who does what, where, when, and how." },

  // ── CHAPTER 3 ─────────────────────────────
  { ch:"ch3", front:"Marketing Environment", back:"The actors and forces outside marketing that affect marketing management's ability to build and maintain successful relationships with target customers." , exp:"بيئة التسويق = كل القوى والعوامل خارج إدارة التسويق التي تؤثر على قدرة الشركة في بناء علاقات ناجحة مع العملاء المستهدفين." },
  { ch:"ch3", front:"Microenvironment", back:"The actors close to the company that affect its ability to serve its customers — the company itself, suppliers, marketing intermediaries, customer markets, competitors, and publics." , exp:"الـ Microenvironment = القوى القريبة من الشركة: الشركة نفسها، الموردون، الوسطاء، الأسواق، المنافسون، والجمهور." },
  { ch:"ch3", front:"Macroenvironment", back:"The larger societal forces that affect the microenvironment: demographic, economic, natural, technological, political/legal, and cultural forces (CDNPTC)." , exp:"الـ Macroenvironment = القوى المجتمعية الكبرى: الديموغرافية، الاقتصادية، الطبيعية، التكنولوجية، السياسية/القانونية، والثقافية." },
  { ch:"ch3", front:"Resellers", back:"Marketing intermediaries that buy and resell merchandise, including wholesalers and retailers." , exp:"Resellers = وسطاء تسويق يشترون البضائع ويعيدون بيعها بسعر ربحي — يشملون تجار الجملة والتجزئة." },
  { ch:"ch3", front:"Demography", back:"The study of human populations in terms of size, density, location, age, gender, race, occupation, and other statistics; part of the demographic environment." , exp:"Demography = علم دراسة السكان من حيث الحجم والكثافة والموقع والعمر والجنس والعرق والمهنة — يُشكّل جزءاً من البيئة الديموغرافية." },
  { ch:"ch3", front:"Value Marketing", back:"Offering financially cautious buyers greater value — the right combination of quality and good service at a fair price; approach used in economic downturns." , exp:"Value Marketing = تقديم مزيج مناسب من الجودة والخدمة بسعر عادل للمشترين الحذرين مالياً — يُستخدم خاصة في أوقات التراجع الاقتصادي." },
  { ch:"ch3", front:"Environmental Sustainability", back:"Meeting present needs without compromising the ability of future generations to meet their needs; managing the natural environment responsibly." , exp:"Environmental Sustainability = تلبية احتياجات الحاضر دون الإضرار بقدرة الأجيال القادمة على تلبية احتياجاتها — إدارة مسؤولة للبيئة الطبيعية." },
  { ch:"ch3", front:"Marketing Intermediaries", back:"Firms that help the company promote, sell, and distribute its goods to final buyers — including resellers, physical distribution firms, marketing services agencies, and financial intermediaries." , exp:"Marketing Intermediaries = شركات تساعد الشركة في الترويج والبيع والتوزيع للمشترين النهائيين — تشمل الموزعين وشركات التوزيع ووكالات التسويق والوسطاء الماليين." },
  { ch:"ch3", front:"Publics", back:"Any group that has an actual or potential interest in or impact on an organization's ability to achieve its objectives. Includes financial, media, government, citizen-action, local, general, and internal publics." , exp:"Publics = أي مجموعة لها مصلحة فعلية أو محتملة أو تأثير على قدرة المنظمة في تحقيق أهدافها — تشمل: المالية، الإعلامية، الحكومية، جماعات الضغط، المحلية، العامة، والداخلية." },
  { ch:"ch3", front:"Cultural Environment", back:"Institutions and other forces that affect society's basic values, perceptions, preferences, and behaviors." , exp:"البيئة الثقافية = المؤسسات والقوى التي تؤثر على القيم الأساسية للمجتمع وتصوراته وتفضيلاته وسلوكياته." },
  { ch:"ch3", front:"Core Beliefs", back:"Primary cultural values that are persistent and passed on from parents to children; very resistant to change (e.g., belief in hard work, family, honesty)." , exp:"Core Beliefs = القيم الثقافية الأساسية الراسخة التي تنتقل من الآباء إلى الأبناء وتقاوم التغيير بشدة — مثل الإيمان بالعمل الجاد والأسرة والأمانة." },
  { ch:"ch3", front:"Secondary Beliefs", back:"Cultural values that are more open to change than core beliefs; marketers can more easily shift these (e.g., preference for a specific style or brand)." , exp:"Secondary Beliefs = القيم الثقافية الأقل ثباتاً والأكثر قابلية للتغيير مقارنة بالمعتقدات الأساسية — يستطيع المسوقون التأثير فيها بسهولة أكبر." },
  { ch:"ch3", front:"Reactive Approach", back:"Passively accepting the marketing environment as an uncontrollable element and adapting strategies to it without attempting to change it." , exp:"Reactive Approach = القبول السلبي بالبيئة التسويقية كعنصر غير قابل للسيطرة والتكيف معها دون محاولة تغييرها." },
  { ch:"ch3", front:"Proactive Approach", back:"Developing strategies to change the marketing environment rather than just reacting to it; considered the better approach for competitive advantage." , exp:"Proactive Approach = تطوير استراتيجيات لتغيير البيئة التسويقية بدلاً من مجرد الاستجابة لها — يُعدّ النهج الأفضل لتحقيق الميزة التنافسية." },
  { ch:"ch3", front:"Political Environment", back:"Laws, government agencies, and pressure groups that influence and limit various organizations and individuals in a given society." , exp:"Political Environment = القوانين والجهات الحكومية وجماعات الضغط التي تؤثر وتُقيّد مختلف المنظمات والأفراد في المجتمع." },
  { ch:"ch3", front:"Economic Environment", back:"Factors affecting consumer buying power and spending patterns — income levels, income distribution, and economic conditions (recession/growth). Key response: value marketing." },
  { ch:"ch3", front:"Natural Environment", back:"Natural resources needed as inputs or affected by marketing. Key trends: raw material shortages, increased pollution, government intervention, and the green sustainability movement." },
  { ch:"ch3", front:"Technological Environment", back:"The most dramatic force shaping the marketplace. Creates new products and market opportunities but also threatens existing industries. Changes rapidly — companies that don't adapt fall behind." },
  { ch:"ch3", front:"Cause-Related Marketing", back:"Linking a company's products to a social cause to build brand image and loyalty while contributing to a good cause. Example: Warby Parker 'Buy a Pair, Give a Pair.'" },
  { ch:"ch3", front:"5 Customer Market Types", back:"(1) Consumer markets — individuals/households, (2) Business markets — buy for production, (3) Reseller markets — buy to resell, (4) Government markets — public services, (5) International markets — foreign buyers." },

  // ── CHAPTER 5 ─────────────────────────────
  { ch:"ch5", front:"Consumer Buyer Behavior", back:"The buying behavior of final consumers — individuals and households that buy goods and services for personal consumption." },
  { ch:"ch5", front:"Culture", back:"The set of basic values, perceptions, wants, and behaviors learned by a member of society from family and other important institutions; the most basic cause of a person's wants and behavior." },
  { ch:"ch5", front:"Subculture", back:"A group of people with shared value systems based on common life experiences and situations — including nationalities, religions, racial groups, and geographic regions." },
  { ch:"ch5", front:"Reference Groups", back:"Groups that serve as direct (face-to-face) or indirect points of comparison or reference in forming a person's attitudes and behavior." },
  { ch:"ch5", front:"Opinion Leaders", back:"Also called influentials — people within a reference group who, because of special skills, knowledge, personality, or other characteristics, exert social influence on others." },
  { ch:"ch5", front:"Buzz Marketing", back:"Enlisting or even creating opinion leaders to serve as brand ambassadors who spread the word about a company's products; a form of word-of-mouth marketing." },
  { ch:"ch5", front:"Psychographics (AIOs)", back:"The technique of measuring lifestyles and developing lifestyle classifications; based on Activities, Interests, and Opinions (AIOs)." },
  { ch:"ch5", front:"Motivation / Motive", back:"A need that is sufficiently pressing to direct a person to seek satisfaction; what drives buying behavior from within." },
  { ch:"ch5", front:"Perception", back:"The process by which people select, organize, and interpret information to form a meaningful picture of the world; how we make sense of stimuli." },
  { ch:"ch5", front:"Selective Attention", back:"The tendency for people to screen out most of the information to which they are exposed — people notice things that stand out or relate to current needs." },
  { ch:"ch5", front:"Selective Distortion", back:"The tendency of people to interpret information in a way that will support what they already believe; twisting incoming info to fit preconceptions." },
  { ch:"ch5", front:"Selective Retention", back:"Consumers are likely to remember good points made about a brand they favor and to forget good points made about competing brands." },
  { ch:"ch5", front:"Cognitive Dissonance", back:"Buyer discomfort caused by post-purchase conflict; occurs when buyers regret a purchase and may return the product or seek information to comfort themselves." },
  { ch:"ch5", front:"Complex Buying Behavior", back:"Consumer buying behavior in situations characterized by high consumer involvement and significant perceived differences among brands; typically expensive, risky, or infrequent purchases." },
  { ch:"ch5", front:"Habitual Buying Behavior", back:"Consumer buying behavior in situations characterized by low consumer involvement and few significantly perceived brand differences; routine, low-risk purchases (e.g., toothpaste)." },
  { ch:"ch5", front:"Social Class", back:"Relatively permanent and ordered divisions in society whose members share similar values, interests, and behaviors. Measured by occupation, income, education, and wealth." },
  { ch:"ch5", front:"Black Box Model", back:"Marketing and other stimuli (product, price, place, promo + economic, tech, social) enter the buyer's 'black box' (mind) and produce observable responses. Marketers must understand what happens inside." },
  { ch:"ch5", front:"Maslow's Hierarchy of Needs", back:"5 levels from most to least pressing: Physiological (food, water) → Safety → Social (belonging) → Esteem (status) → Self-actualization. People satisfy lower needs before moving up." },
  { ch:"ch5", front:"Learning", back:"Changes in behavior arising from experience. Occurs through drives (strong internal stimuli), cues (minor stimuli that trigger response), responses, and reinforcement (rewarding experience)." },
  { ch:"ch5", front:"Beliefs and Attitudes", back:"Belief = descriptive thought about something based on knowledge or faith. Attitude = consistently favorable or unfavorable evaluations/feelings toward an object. Attitudes are hard to change." },
  { ch:"ch5", front:"Dissonance-Reducing Buying Behavior", back:"High consumer involvement but few perceived differences among brands. Buyer purchases quickly then seeks reassurance to reduce post-purchase doubt (cognitive dissonance). Example: flooring." },
  { ch:"ch5", front:"Variety-Seeking Buying Behavior", back:"Low consumer involvement but significant perceived brand differences. Consumers frequently switch brands — not from dissatisfaction but for variety. Example: cookies, snacks." },
  { ch:"ch5", front:"5-Stage Buyer Decision Process", back:"(1) Need Recognition → (2) Information Search → (3) Evaluation of Alternatives → (4) Purchase Decision → (5) Postpurchase Behavior. Process starts before purchase and continues after." },
  { ch:"ch5", front:"Product Adoption Process", back:"Mental process from first learning about an innovation to adoption: (1) Awareness → (2) Interest → (3) Evaluation → (4) Trial → (5) Adoption." },
  { ch:"ch5", front:"5 Adopter Categories", back:"Innovators (2.5% — risk takers), Early Adopters (13.5% — opinion leaders), Early Majority (34%), Late Majority (34% — skeptical), Laggards (16% — tradition-bound, last to adopt)." },

  // ── CHAPTER 1 — Added from slides content ─────────────────
  { ch:"ch1", front:"Five-Step Marketing Process", back:"(1) Understand marketplace & customer needs → (2) Design a customer value-driven marketing strategy → (3) Construct an integrated marketing program (4 Ps) → (4) Engage customers & build profitable relationships → (5) Capture value from customers in return. ⭐ Step 5 is the ONLY step that captures value — all others create value FOR customers." },
  { ch:"ch1", front:"Shared Value", back:"The concept that companies should create economic value while ALSO creating value for society by addressing its needs and challenges. Societal needs, not just economic needs, define markets. Goes beyond the Societal Marketing Concept by embedding social value creation into the core business model." },

  // ── CHAPTER 2 — Added from slides content ─────────────────
  { ch:"ch2", front:"Marketing Strategy", back:"The marketing logic by which a company hopes to create customer value and achieve profitable customer relationships. Involves two key decisions: (1) Which customers to serve? → segmentation & targeting. (2) How to serve them best? → differentiation & positioning (value proposition)." },
  { ch:"ch2", front:"Market Targeting", back:"The process of evaluating each market segment's attractiveness and selecting one or more segments to enter. A market segment is a group of consumers who respond in a similar way to a given set of marketing efforts. Links segmentation (divide) → targeting (select) → positioning (place)." },
  { ch:"ch2", front:"BCG Investment Strategies", back:"Four strategies for managing SBUs based on BCG matrix position: (1) Build — invest more to grow share (promising Question Marks → Stars); (2) Hold — maintain current share (strong Cash Cows); (3) Harvest — milk short-term cash without concern for long-term effect (weak Cash Cows, Dogs); (4) Divest — sell or discontinue (Dogs & losing Question Marks)." },
  { ch:"ch2", front:"Marketing Control", back:"Measuring and evaluating results of marketing strategies and taking corrective action. Four steps: (1) Set goals → (2) Measure performance → (3) Evaluate causes of gaps → (4) Take corrective action. Two types: operating control (checking ongoing performance vs. plan) and strategic control (checking whether strategy fits the environment)." },

  // ── CHAPTER 3 — Added from slides content ─────────────────
  { ch:"ch3", front:"Generational Marketing", back:"Segmenting people by lifestyle or life stage rather than age alone. Four major U.S. generational cohorts: Baby Boomers (born 1946–64) — largest, most affluent; Generation X (1965–76); Millennials/Gen Y (1977–2000) — digital natives, largest group; Generation Z (2001+) — true digital natives. Each cohort shares values shaped by shared world events." },

  // ── CHAPTER 5 — Added from slides content ─────────────────
  { ch:"ch5", front:"5 Product Characteristics Affecting Adoption Rate", back:"(1) Relative Advantage — degree to which innovation appears superior to existing products; (2) Compatibility — consistent with values & experiences of potential adopters; (3) Complexity — difficulty of understanding or using; (4) Divisibility / Trialability — can be tried on a limited basis before full commitment; (5) Communicability / Observability — results visible and describable to others. Higher relative advantage, compatibility, trialability, and communicability → faster adoption." }
];

// ══════════════════════════════════════════════
//  QUIZ QUESTIONS DATA (434 questions from official test bank)
//  ch1:102, ch2:113, ch3:105, ch5:114
// ══════════════════════════════════════════════
const allQuestions = [
  // ══════════════ Chapter 1 — 107 questions ══════════════
  { ch:"ch1", diff:"hard", q:"Which of the following is NOT an accurate description of modern marketing?", opts:["Marketing is the creation of value for customers.", "Marketing involves managing profitable customer relationships.", "Marketing emphasizes selling and advertising exclusively.", "Marketing involves satisfying customers' needs.", "Marketing is building value-laden exchange relationships with customers."], ans:2 , past:true, exp:"Modern marketing is about creating value and building relationships — NOT just selling/advertising. That narrow view is the old selling concept.", expW:{0:"صحيح — التسويق يخلق قيمة",1:"صحيح — يبني علاقات مربحة",3:"صحيح — يُرضي احتياجات العملاء",4:"صحيح — يبني علاقات تبادلية"} },
  { ch:"ch1", diff:"medium", q:"According to management guru Peter Drucker, \"The aim of marketing is to ________.\"", opts:["maximize profits of the company", "emphasize customer wants and not customer needs", "make selling unnecessary", "fulfill unrealistic customer expectations", "sell products"], ans:2, exp:"Peter Drucker قال إن هدف التسويق هو جعل البيع غير ضروري — لما تفهم العميل وتقدم له القيمة المناسبة، ينبيع المنتج تلقائياً." , expW:{0:"Maximizing profits = هدف تجاري عام — Drucker قال ابعد ما يكون عن هذا", 1:"Need = حاجة أساسية — يتحول إلى demand مع القوة الشرائية", 3:"Unrealistic expectations = عكس التسويق الجيد — Drucker يرفض هذا", 4:"Sell products = الهدف الضيق — Drucker يريد جعل البيع غير ضروري"} },
  { ch:"ch1", diff:"easy", q:"Marketing is defined as a social and managerial process by which individuals and organizations obtain what they need and want through ________.", opts:["research and development", "innovation and creativity", "manufacturing efficiencies", "value creation and exchange", "sales and revenue creation"], ans:3, exp:"Marketing = عملية اجتماعية وإدارية يحصل فيها الأفراد والمنظمات على ما يحتاجونه من خلال خلق القيمة وتبادلها مع الآخرين." , expW:{0:"R&D = البحث والتطوير — ليس تعريف التسويق", 1:"الابتكار والإبداع — أدوات مهمة لكن ليست تعريف التسويق", 2:"Manufacturing efficiencies = كفاءة التصنيع — تعريف مضيّق", 4:"Sales and revenue = نتيجة التسويق وليست تعريفه"} },
  { ch:"ch1", diff:"medium", q:"According to the five-step model of the marketing process, which of the following is the final step in creating value for customers?", opts:["designing a customer-driven marketing strategy", "understanding the marketplace and customer needs", "constructing an integrated marketing program that delivers superior value", "building profitable relationships and creating customer delight", "capturing value from customers to create profit and customer equity"], ans:4 , past:true, exp:"الخطوة الأخيرة في النموذج الخماسي: capturing value (الحصول على القيمة في المقابل = أرباح + customer equity). الشركة بدأت بفهم السوق وتنتهي بالحصول على القيمة.", expW:{0:"الخطوة 2",1:"الخطوة 1",2:"الخطوة 3",3:"الخطوة 4"} },
  { ch:"ch1", diff:"medium", q:"According to the five-step model of the marketing process, a company should ________ before designing a customer-driven marketing strategy.", opts:["determine how to deliver superior value to customers", "build profitable relationships with customers", "use customer relationship management to create full partnerships with key customers", "understand the marketplace and customer needs and wants", "construct an integrated marketing program"], ans:3, exp:"الخطوة الأولى في النموذج الخماسي هي فهم السوق واحتياجات العملاء." , expW:{0:"determine how to deliver superior value = تسليم القيمة يأتي في مرحلة لاحقة بعد فهم السوق — ليست الخطوة الأولى", 1:"build profitable relationships = بناء العلاقات المربحة هو الخطوة الرابعة، ليس قبل تصميم الاستراتيجية", 2:"CRM = بناء علاقات قوية ومربحة مع العملاء", 4:"construct an integrated marketing program = برنامج التسويق يُصمَّم بعد فهم السوق واختيار الاستراتيجية"} },
  { ch:"ch1", diff:"medium", q:"________ are human needs that are shaped by culture and individual personality.", opts:["Necessities", "Wants", "Demands", "Values", "Exchanges"], ans:1 , past:true, exp:"Wants = needs shaped by culture & personality. e.g., hunger (need) → بيتزا (want for an Italian). Demands = wants + buying power.", expW:{0:"Necessities = ضرورات، مرادفة للـ needs",2:"Demands = wants + قدرة شرائية",3:"Values = قيم، مفهوم مختلف",4:"Exchanges = تبادل"} },
  { ch:"ch1", diff:"medium", q:"When backed by buying power, wants become ________.", opts:["social needs", "demands", "physical needs", "self-esteem needs", "exchanges"], ans:1 , past:true, exp:"Demand = Want + Buying Power. لما يكون عندك الرغبة والقدرة الشرائية، الرغبة تصبح طلباً فعلياً.", expW:{0:"Social needs = احتياجات اجتماعية (من Maslow)",2:"Physical needs = احتياجات جسدية (من Maslow)",3:"Self-esteem = تقدير الذات (من Maslow)",4:"Exchange = التبادل نفسه"} },
  { ch:"ch1", diff:"hard", q:"Needs include all of the following EXCEPT ________.", opts:["food", "knowledge", "affection", "the newest iphone", "belonging"], ans:3, exp:"Needs = حاجات أساسية (طعام، معرفة، انتماء، مودة). أحدث iPhone = رغبة (want) شكّلتها الثقافة، ليست حاجة أساسية." , expW:{0:"food = طعام — حاجة فسيولوجية أساسية لبقاء الإنسان", 1:"knowledge = المعرفة — حاجة نفسية وعقلية أساسية", 2:"affection = المودة — حاجة اجتماعية أساسية (الحب والانتماء)", 4:"belonging = الانتماء — حاجة اجتماعية أساسية عند ماسلو"} },
  { ch:"ch1", diff:"hard", q:"Greg Williams now has the buying power to purchase the desktop computer that he has wanted for the last six months. Greg's want now has become a(n) ________.", opts:["need", "necessity", "demand", "exchange", "transaction"], ans:2, exp:"Demand = Want + Buying Power. لما عنده الرغبة + القدرة الشرائية → تحولت الرغبة إلى طلب فعلي." , expW:{0:"Need = حاجة أساسية — يتحول إلى demand مع القوة الشرائية", 1:"Necessity = مرادفة للـ needs — ليست مفهوماً تسويقياً منفصلاً", 3:"exchange = تبادل قيمة بين طرفين — وصف للمعاملة لا لحالة الطلب", 4:"Transaction = صفقة فردية — أضيق من مفهوم demand"} },
  { ch:"ch1", diff:"medium", q:"A ________ is some combination of products, services, information, or experiences provided to consumers to satisfy a need or want.", opts:["market offering", "value proposition", "brand positioning", "market segment", "market mix"], ans:0, past:true, exp:"Market offering = أي تركيبة من منتجات/خدمات/معلومات/تجارب تُقدَّم لإشباع حاجة أو رغبة.", expW:{1:"Value proposition = الوعد بالقيمة (ليش تختارنا؟)",2:"Brand positioning = مكانة العلامة التجارية في الذهن",3:"Market segment = شريحة من السوق",4:"Marketing mix = المزيج التسويقي (4Ps)"} },
  { ch:"ch1", diff:"easy", q:"Which of the following terms refers to sellers being preoccupied with their own products and losing sight of underlying consumer needs?", opts:["vendor lock-in", "social loafing", "value proposition", "marketing myopia", "conspicuous consumption"], ans:3, exp:"Marketing myopia = قصر النظر التسويقي: الشركة تنشغل بمنتجها وتنسى الحاجة الأساسية. مثلاً: شركات القطارات فكّرت أنها في صناعة القطارات لا النقل." , expW:{0:"Vendor lock-in = مفهوم تقني لربط العميل بمورد — غير ذي صلة", 1:"Social loafing = ظاهرة نفسية جماعية — لا علاقة بالتسويق", 2:"Value proposition = مجموعة الفوائد التي تعد بها الشركة للعميل", 4:"Conspicuous consumption = الاستهلاك المظهري لإبراز المكانة"} },
  { ch:"ch1", diff:"medium", q:"When marketers set low expectations for a market offering, they run the risk of ________.", opts:["disappointing loyal customers", "having to use an outside-in rather than an inside-out perspective", "failing to attract enough customers", "failing to understand their customers' needs", "incorrectly identifying a target market"], ans:2, exp:"التوقعات المنخفضة تجعل العرض غير جذاب وتفشل في استقطاب عملاء كافيين — التوقعات لازم تكون واقعية وجذابة." , expW:{0:"disappointing loyal customers = التوقعات المنخفضة لا تُخيّب الأمل — بل تُقلّل جاذبية العرض فيفشل في استقطاب عملاء", 1:"Inside-out = يبدأ من المنتج ثم يحاول إقناع السوق بشرائه", 3:"failing to understand customer needs = تحديد الاحتياجات خطوة سابقة — التوقعات تؤثر على الجذب لا الفهم", 4:"Target market = الشريحة المستهدفة — ليست العرض المقدَّم للسوق"} },
  { ch:"ch1", diff:"easy", q:"________ is the act of obtaining a desired object from someone by offering something in return.", opts:["Valuation", "Exchange", "Market offering", "Confiscation", "Donation"], ans:1, exp:"Exchange = التبادل: الحصول على شيء مرغوب مقابل تقديم شيء آخر. هو المفهوم الجوهري للتسويق." , expW:{0:"Valuation = تقييم مالي — لا يعني التبادل الطوعي", 2:"Market offering = مجموعة منتجات/خدمات/تجارب لإشباع حاجة", 3:"Confiscation = مصادرة بالقوة — عكس التبادل الطوعي", 4:"Donation = تبرع من طرف واحد — لا يشمل الحصول على شيء في المقابل"} },
  { ch:"ch1", diff:"easy", q:"A(n) ________ is the set of actual and potential buyers of a product or service.", opts:["market", "control group", "subsidiary", "focus group", "audience"], ans:0, exp:"Market = السوق: مجموعة المشترين الفعليين والمحتملين لمنتج أو خدمة." , expW:{1:"Control group = مصطلح بحثي — ليس مجموعة مشترين", 2:"Subsidiary = شركة تابعة — ليست السوق", 3:"Focus group = مجموعة بحثية — ليست مجموعة مشترين", 4:"Audience = جمهور مستهدف — أضيق من تعريف السوق الكامل"} },
  { ch:"ch1", diff:"medium", q:"Consumer research, product development, communication, distribution, pricing, and service are all core ________ activities.", opts:["positioning", "marketing", "outsourcing", "production", "logistics"], ans:1, exp:"التسويق يشمل: بحث المستهلك، تطوير المنتج، التواصل، التوزيع، التسعير، والخدمة — كلها جوهر العملية التسويقية." , expW:{0:"Positioning = تحديد المكانة المميزة للعلامة في ذهن العميل", 2:"Outsourcing = الاستعانة بمصادر خارجية — ليس نشاطاً تسويقياً جوهرياً", 3:"production = الإنتاج يهتم بصنع المنتج — لا يشمل البحث والتوزيع والتسعير معاً", 4:"Logistics = إدارة التوزيع والنقل — ليست نشاطاً تسويقياً أساسياً"} },
  { ch:"ch1", diff:"medium", q:"When are sellers most effective?", opts:["when they focus more on their specific products and services", "when they focus more on the price of their products and services", "when they focus more on the benefits and experiences produced by their products and services", "when they focus more on where their products and services can be purchased", "when they focus more on cost to produce the product or service"], ans:2, exp:"البائعون أكثر فعالية لما يركزون على الفوائد والتجارب التي ينتجها المنتج — لا على المنتج نفسه. هذا جوهر Marketing concept." , expW:{0:"focus on specific products = التركيز على المنتج نفسه (product concept) يُفضي إلى marketing myopia — إغفال ما يريده العميل فعلاً", 1:"focus on the price = السعر وحده لا يحقق الفعالية — العميل يشتري الفائدة لا الرقم", 3:"focus on where products can be purchased = مكان البيع يصف التوزيع — لا يعكس ما يجعل البائع فعّالاً", 4:"focus on cost to produce = التركيز على تكلفة الإنتاج هو فلسفة داخلية — لا تصب في مصلحة العميل"} },
  { ch:"ch1", diff:"hard", q:"Seagull Terrace offers its customers good accommodations, local delicacies, and amazing seaside views. The overall experience provided at the motel is a part of its ________.", opts:["market offering", "target market", "market segment", "product positioning", "marketing mix"], ans:0, exp:"Market offering = كل ما تقدمه الشركة: منتجات + خدمات + تجارب (الإقامة + الأكل + الإطلالة = market offering متكامل)." , expW:{1:"Target market = الشريحة المستهدفة — ليست العرض المقدَّم للسوق", 2:"Market segment = شريحة من السوق — ليست العرض المقدَّم", 3:"Positioning = تحديد المكانة المميزة للعلامة في ذهن العميل", 4:"Marketing mix = المزيج التسويقي (4Ps): المنتج، السعر، التوزيع، الترويج"} },
  { ch:"ch1", diff:"easy", q:"The art and science of choosing target markets and building profitable relationships with them is called ________.", opts:["marketing management", "positioning", "marketing mix", "market offering", "differentiation"], ans:0, exp:"Marketing management = فن وعلم اختيار الأسواق المستهدفة وبناء علاقات مربحة معها." , expW:{1:"Positioning = تحديد المكانة المميزة للعلامة في ذهن العميل", 2:"Marketing mix = المزيج التسويقي (4Ps): المنتج، السعر، التوزيع، الترويج", 3:"Market offering = مجموعة منتجات/خدمات/تجارب لإشباع حاجة", 4:"Differentiation = التمييز عن المنافسين بخصائص فريدة"} },
  { ch:"ch1", diff:"medium", q:"Selecting which segments of a population to serve is called ________.", opts:["market segmentation", "positioning", "customization", "target marketing", "differentiation"], ans:3 , past:true, exp:"Target marketing = اختيار الشريحة التي ستخدمها. أما Segmentation = تقسيم السوق، و Positioning = تحديد مكانتك في ذهن العميل.", expW:{0:"Segmentation = تقسيم السوق (الخطوة قبل اختيار الهدف)",1:"Positioning = تحديد المكانة في الذهن",2:"Customization = التخصيص",4:"Differentiation = التمييز عن المنافسين"} },
  { ch:"ch1", diff:"easy", q:"Dividing the market into various groups of customers that a company may serve is called ________.", opts:["market segmentation", "positioning", "customization", "target marketing", "differentiation"], ans:0, exp:"Market segmentation = تقسيم السوق إلى مجموعات من العملاء ذوي خصائص متشابهة. هي الخطوة قبل اختيار السوق المستهدف." , expW:{1:"Positioning = تحديد المكانة المميزة للعلامة في ذهن العميل", 2:"customization = تخصيص المنتج لكل عميل بشكل فردي — يختلف عن تقسيم السوق إلى مجموعات", 3:"Target marketing = اختيار الشريحة المستهدفة وتوجيه الجهود لها", 4:"Differentiation = التمييز عن المنافسين بخصائص فريدة"} },
  { ch:"ch1", diff:"hard", q:"Cathy's Clothes is a small yet successful retail chain that sells women's clothing and accessories with a focus on buyers who have relatively modest means. For this specific purpose, the firm has rolled out several marketing initiatives aimed at women of a specific demographic. This is an example of ________.", opts:["ambush marketing", "social marketing", "societal marketing", "target marketing", "cause marketing"], ans:3, exp:"Target marketing = توجيه الجهود نحو شريحة محددة (نساء بدخل محدود). الشركة اختارت شريحة وبنت برنامجها التسويقي حولها." , expW:{0:"Ambush marketing = الظهور في فعاليات المنافسين بدون رعاية رسمية", 1:"Social marketing = حملات تغيير السلوك لصالح المجتمع", 2:"Societal marketing = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى", 4:"cause marketing = ربط العلامة بقضية خيرية لاستقطاب العملاء — ليس توجيه الجهود لشريحة ديموغرافية"} },
  { ch:"ch1", diff:"medium", q:"An organic farmer has identified three distinct groups that might be interested in his products: vegetarians, health-conscious individuals, and people identified as trendsetters who try out new products in the market before others. These three groups are examples of ________.", opts:["marketing mixes", "market segments", "value propositions", "market offerings", "marketing intermediaries"], ans:1, exp:"Market segments = شرائح السوق: مجموعات المشترين المحتملين تجمعهم خصائص مشتركة (النباتيون، المهتمون بالصحة، المبدعون)." , expW:{0:"Marketing mix = المزيج التسويقي (4Ps): المنتج، السعر، التوزيع، الترويج", 2:"Value proposition = مجموعة الفوائد التي تعد بها الشركة للعميل", 3:"Market offering = مجموعة منتجات/خدمات/تجارب لإشباع حاجة", 4:"marketing intermediaries = وسطاء التوزيع (تجار الجملة والتجزئة) — لا علاقة بمجموعات المشترين"} },
  { ch:"ch1", diff:"easy", q:"Which of the following refers to a set of benefits that a company promises to deliver to customers to satisfy their needs?", opts:["customer lock-in", "a cartel", "marketing mix", "value proposition", "market segmentation"], ans:3, exp:"Value proposition = مجموعة الفوائد التي تعد الشركة بتقديمها للعملاء لإشباع احتياجاتهم — الوعد الذي يُميّزها عن المنافسين." , expW:{0:"Customer lock-in = إبقاء العميل بعوائق التحول — مختلف عن Value proposition", 1:"Cartel = تحالف احتكاري لتحديد الأسعار — لا يصف الوعد بالقيمة", 2:"Marketing mix = المزيج التسويقي (4Ps): المنتج، السعر، التوزيع، الترويج", 4:"Market segmentation = تقسيم السوق إلى شرائح ذات خصائص مشتركة"} },
  { ch:"ch1", diff:"medium", q:"Which of the following customer questions is answered by a company's value proposition?", opts:["\"Why should I buy your brand rather than a competitor's?\"", "\"What is your company's estimated customer equity?\"", "\"What are the costs involved in the production of your brand?\"", "\"What is the budget allocated by your company for research and development?\"", "\"What is the financial stability of your company?\""], ans:0 , past:true, exp:"Value proposition = الوعد بالقيمة. يجيب على سؤال 'ليش تشتري منّا ومو من المنافس؟' — هو جوهر الميزة التنافسية.", expW:{1:"Customer equity = مالي، مو تسويقي",2:"تكاليف الإنتاج = داخلية، مو علاقة للعميل",3:"ميزانية R&D = داخلية",4:"الاستقرار المالي = مالي"} },
  { ch:"ch1", diff:"medium", q:"Which of the following marketing management orientations focuses primarily on improving efficiencies along the supply chain?", opts:["production concept", "product concept", "selling concept", "marketing concept", "societal marketing concept"], ans:0 , past:true, exp:"Production concept = التركيز على الكفاءة في الإنتاج والتوزيع (supply chain). يفترض أن المنتجات المتاحة والرخيصة ستُباع.", expW:{1:"Product concept = يركز على جودة المنتج وميزاته",2:"Selling concept = يركز على البيع والترويج بقوة",3:"Marketing concept = يركز على فهم احتياجات العميل",4:"Societal concept = يراعي مصلحة المجتمع أيضاً"} },
  { ch:"ch1", diff:"medium", q:"Which of the following marketing management concepts is most likely to lead to marketing myopia?", opts:["customer-driven marketing concept", "customer-driving marketing concept", "societal marketing concept", "marketing concept", "product concept"], ans:4, exp:"Product concept يؤدي لـ marketing myopia: الشركة تنشغل بتحسين المنتج وتنسى أن العميل يبحث عن إشباع حاجة، لا عن المنتج نفسه." , expW:{0:"Customer-driven marketing = تلبية الاحتياجات المعلنة للعملاء", 1:"Customer-driving marketing = الشركة تتوقع احتياجات العميل المستقبلية", 2:"Societal marketing concept = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى", 3:"Marketing concept = يبدأ من السوق واحتياج العميل — outside-in"} },
  { ch:"ch1", diff:"medium", q:"Which of the following statements is true of the production concept?", opts:["It considers customer focus and value to be the paths to sales and profits.", "It follows the customer-centered sense-and-respond philosophy.", "It takes an outside-in perspective.", "It calls for sustainable marketing.", "It leads to companies focusing too narrowly on their own operations."], ans:4, exp:"Production concept = يركز على الكفاءة الإنتاجية والتوزيع، مما يجعل الشركات تنشغل بعملياتها الداخلية وتتجاهل العميل." , expW:{0:"Customer focus = Marketing concept — ليس صحيحاً عن Production concept", 1:"Customer-centered = فلسفة Marketing concept", 2:"Outside-in = يبدأ من السوق والعميل ثم يصمم المنتج", 3:"Sustainable marketing = تسويق يحافظ على البيئة والمجتمع"} },
  { ch:"ch1", diff:"medium", q:"The ________ concept is aligned with the philosophy of continuous product improvement and the belief that customers will choose products that offer the most in quality, performance, and innovative features.", opts:["product", "production", "societal marketing", "marketing", "selling"], ans:0, exp:"Product concept = يؤمن أن العملاء يختارون أفضل جودة وأداء → يركّز على التحسين المستمر للمنتج (لكن يخاطر بـ marketing myopia)." , expW:{1:"production = يركّز على الكفاءة الإنتاجية وخفض التكلفة — لا على تحسين الجودة والميزات", 2:"Societal marketing = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى", 3:"marketing = يبدأ من احتياج العميل — لا من جودة المنتج", 4:"selling = يركّز على الترويج المكثف لبيع ما تم إنتاجه — لا على تحسين المنتج"} },
  { ch:"ch1", diff:"medium", q:"Which of the following is the aim of the product concept?", opts:["improve the marketing of a firm's best products", "market only those products with high customer appeal", "focus on the target market and make products that meet those customers' demands", "focus on making continuous product improvements", "ensure that product promotion has the highest priority"], ans:3, exp:"Product concept هدفه التحسين المستمر للمنتج — يؤمن أن الجودة والأداء العالي هما ما يجذب العميل." , expW:{0:"improve the marketing = تحسين التسويق يصف Marketing concept — Product concept يحسّن المنتج لا التسويق", 1:"market only products with high customer appeal = هذا قرار انتقائي للمحفظة — لا يصف فلسفة Product concept", 2:"focus on the target market = هذا Marketing concept — يبدأ من العميل وليس من المنتج", 4:"ensure product promotion has highest priority = الترويج أولوية Selling concept — ليس Product concept"} },
  { ch:"ch1", diff:"hard", q:"Henry Ford's philosophy was to perfect the Model T so that its cost could be reduced further for increased consumer affordability. This reflects the ________ concept.", opts:["product", "production", "selling", "marketing", "societal marketing"], ans:1, exp:"Production concept = هنري فورد أراد تكميل موديل T لتخفيض تكلفته وجعله في متناول الجميع — تركيز على الكفاءة الإنتاجية والأسعار المنخفضة." , expW:{0:"product = يركّز على جودة وميزات المنتج — فورد أراد تخفيض التكلفة وتوسيع إمكانية التحمّل لا تحسين الميزات", 2:"selling = يركّز على الترويج المكثف — فورد ركّز على كفاءة الإنتاج", 3:"marketing = يبدأ من احتياجات العميل — فورد بدأ من الإنتاج وخفض التكاليف", 4:"Societal marketing = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى"} },
  { ch:"ch1", diff:"hard", q:"Railroads were once operated based on the thinking that users wanted trains that would offer the most in quality, performance, and innovative features. The railroad managing companies overlooked the fact that there could be other modes of transportation. This reflects the ________ concept.", opts:["product", "production", "selling", "marketing", "societal marketing"], ans:0, exp:"Product concept = شركات القطارات ركّزت على تحسين القطار (جودة + أداء) لكن تجاهلت أن العميل يريد النقل — وهذا هو مثال marketing myopia الكلاسيكي." , expW:{1:"production = يركّز على الكفاءة وخفض التكلفة — لا على تحسين الأداء والميزات", 2:"selling = يركّز على الترويج المكثف — لا على الانشغال بتحسين المنتج", 3:"marketing = يبدأ من احتياج العميل (النقل) ويصمم الحل — عكس ما فعلته شركات القطارات", 4:"Societal marketing = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى"} },
  { ch:"ch1", diff:"medium", q:"Which of the following statements is true of the selling concept?", opts:["It requires minimum promotion efforts.", "It creates long-term, profitable customer relationships.", "It takes an outside-in perspective.", "It is typically practiced with unsought goods.", "It follows the customer-centered sense-and-respond philosophy."], ans:3, exp:"Selling concept يُطبَّق على البضائع غير المرغوبة (unsought goods) — يحتاج جهود ترويجية كثيفة لإقناع الناس بالشراء." , expW:{0:"It requires minimum promotion efforts = عكس الصحيح: Selling concept يعتمد على الترويج المكثف والإقناع القوي", 1:"It creates long-term, profitable relationships = هذا هدف Marketing concept — Selling concept يركّز على البيع الفوري لا العلاقة طويلة المدى", 2:"Outside-in = يبدأ من السوق والعميل ثم يصمم المنتج", 4:"Customer-centered = فلسفة Marketing concept"} },
  { ch:"ch1", diff:"medium", q:"Which of the following marketing orientations calls for aggressive promotional efforts and focuses on creating transactions rather than long-term customer relationships?", opts:["the marketing concept", "the production concept", "the product concept", "the selling concept", "the societal marketing concept"], ans:3, exp:"Selling concept = يركّز على البيع والترويج المكثف لإتمام الصفقات — لا يهتم ببناء علاقات طويلة الأمد مع العميل." , expW:{0:"Marketing concept = يبدأ من السوق واحتياج العميل — outside-in", 1:"Production concept = يركّز على كفاءة الإنتاج والأسعار المنخفضة", 2:"Product concept = يركّز على الجودة والأداء — خطر marketing myopia", 4:"Societal marketing concept = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى"} },
  { ch:"ch1", diff:"hard", q:"Jolene's firm markets preplanning services for a mortician. She finds that most of her target market avoids discussing future funeral needs. She convinces people to invest in the firm's services through her large-scale promotional efforts. Jolene's firm most likely practices the ________.", opts:["production concept", "marketing concept", "selling concept", "product concept", "societal marketing concept"], ans:2, exp:"Selling concept = تستخدمه شركات الخدمات الجنائزية لأن الناس لا يفكرون فيها تلقائياً (unsought goods) — تحتاج إقناع وجهود ترويجية." , expW:{0:"Production concept = يركّز على كفاءة الإنتاج والأسعار المنخفضة", 1:"Marketing concept = يبدأ من السوق واحتياج العميل — outside-in", 3:"Product concept = يركّز على الجودة والأداء — خطر marketing myopia", 4:"Societal marketing concept = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى"} },
  { ch:"ch1", diff:"medium", q:"The selling concept is typically practiced ________.", opts:["to balance consumers' wants, company's requirements, and the society's long-run interests", "with products that offer the most in terms of quality, performance, and innovative features", "when the company focuses on building long-term customer relationships", "with goods that buyers normally do not think of buying", "by customer-driven companies"], ans:3, exp:"Selling concept يُطبَّق على unsought goods = البضائع التي لا يفكر المشتري في شرائها عادةً (مثل التأمين على الحياة والخدمات الجنائزية)." , expW:{0:"to balance consumers' wants = هذا هدف Societal marketing concept — Selling concept لا يهتم بالموازنة بين مصالح الجميع", 1:"with products that offer the most in quality = هذا Product concept — يركّز على الجودة والميزات لا على الإقناع بالشراء", 2:"when the company focuses on long-term customer relationships = هذا هدف Marketing concept — Selling concept يسعى للبيع الفوري", 4:"Customer-driven = تلبّي الاحتياجات المعروفة للعميل"} },
  { ch:"ch1", diff:"medium", q:"Which of the following marketing orientations holds that achieving organizational goals depends on knowing the needs and wants of target markets and delivering the desired satisfactions better than competitors do?", opts:["the product concept", "the production concept", "the selling concept", "the marketing concept", "the societal marketing concept"], ans:3, exp:"Marketing concept = تحقيق الأهداف يعتمد على فهم احتياجات السوق المستهدف وتقديم الإشباع أفضل من المنافسين." , expW:{0:"Product concept = يركّز على الجودة والأداء — خطر marketing myopia", 1:"Production concept = يركّز على كفاءة الإنتاج والأسعار المنخفضة", 2:"Selling concept = بيع ما تصنع بقوة إقناع — لا يبدأ من احتياج العميل", 4:"Societal marketing concept = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى"} },
  { ch:"ch1", diff:"medium", q:"Which of the following uses a customer-centered \"sense-and-respond\" philosophy rather than a product-centered \"make-and-sell\" philosophy?", opts:["market segmentation", "the production concept", "the marketing concept", "the inside-out perspective", "marketing myopia"], ans:2, exp:"Marketing concept = sense-and-respond: اكتشف احتياج العميل (sense) ثم استجب بالمنتج المناسب (respond) — عكس make-and-sell." , expW:{0:"Market segmentation = تقسيم السوق إلى شرائح ذات خصائص مشتركة", 1:"Production concept = يركّز على كفاءة الإنتاج والأسعار المنخفضة", 3:"Inside-out = يبدأ من المنتج ثم يحاول إقناع السوق بشرائه", 4:"Marketing myopia = التركيز على المنتج وإهمال الحاجة الأساسية للعميل"} },
  { ch:"ch1", diff:"medium", q:"A firm that uses the selling concept takes a(n) ________ approach.", opts:["outside-in", "niche marketing", "inside-out", "societal marketing", "customer-driven"], ans:2, exp:"Selling concept = inside-out: ابدأ من داخل الشركة (المنتج) ← حاول بيعه للسوق. عكس Marketing concept الذي هو outside-in." , expW:{0:"Outside-in = يبدأ من السوق والعميل ثم يصمم المنتج", 1:"Niche marketing = التركيز على شريحة صغيرة ومتخصصة", 3:"Societal marketing = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى", 4:"Customer-driven = تلبّي الاحتياجات المعروفة للعميل"} },
  { ch:"ch1", diff:"medium", q:"The marketing concept takes a(n) ________. It starts with a well-defined market, focuses on customer needs, and integrates all the marketing activities that affect customers.", opts:["outside-in perspective", "product-centered make-and-sell philosophy", "inside-out perspective", "consumer-generated marketing approach", "telling-and-selling approach"], ans:0, exp:"Marketing concept = outside-in: يبدأ من السوق المحدد → يركّز على احتياجات العميل → يدمج أنشطة التسويق حول العميل." , expW:{1:"product-centered make-and-sell = يبدأ من المنتج ثم يبيعه — عكس Marketing concept الذي يبدأ من العميل", 2:"Inside-out = يبدأ من المنتج ثم يحاول إقناع السوق بشرائه", 3:"Consumer-generated marketing = محتوى يصنعه العملاء أنفسهم", 4:"telling-and-selling approach = أسلوب Selling concept: أخبر ثم بِع — لا يبدأ من السوق"} },
  { ch:"ch1", diff:"medium", q:"Which of the following is a characteristic of customer-driven marketing?", opts:["Companies understand customer needs even better than customers themselves do.", "Customers are unaware of their needs.", "Products are created that meet both existing and latent needs, now and in the future.", "Customers know what they want.", "Customers don't know what is possible."], ans:3, exp:"Customer-driven marketing = يخدم العملاء الذين يعرفون ما يريدون. الشركة تستجيب لرغبات واضحة ومعلنة من العميل." , expW:{0:"Companies understand needs better than customers = هذا Customer-driving marketing — يتجاوز الـ driven ليقود العميل", 1:"Customers are unaware of their needs = هذا سيناريو Customer-driving — في Customer-driven العميل يعرف احتياجاته", 2:"Products meet both existing and latent needs = هذا Customer-driving: يلبي حاجات مُعلنة وكامنة في الوقت نفسه", 4:"Customers don't know what is possible = هذا سيناريو Customer-driving أيضاً — الشركة تبتكر ما لم يتخيله العميل"} },
  { ch:"ch1", diff:"medium", q:"________ marketing is practiced by an organization that understands and anticipates customer needs even better than customers themselves do and creates products and services to meet current and future needs.", opts:["Customer-driven", "Customer-driving", "Affinity", "Societal", "Ambush"], ans:1, exp:"Customer-driving marketing = الشركة تفهم احتياجات العميل أفضل منه — تصنع منتجات تلبي احتياجاته الحالية والمستقبلية قبل أن يطلبها." , expW:{0:"Customer-driven = تلبّي الاحتياجات المعروفة للعميل", 2:"Affinity marketing = تسويق قائم على الانتماء لمجموعة معينة — لا يصف توقع الاحتياجات", 3:"Societal marketing = يوازن بين مصلحة العميل والمجتمع — لا يصف التنبؤ بالاحتياجات", 4:"Ambush marketing = الظهور في فعاليات المنافسين بدون رعاية — لا علاقة له بتوقع احتياجات العميل"} },
  { ch:"ch1", diff:"medium", q:"When customers don't know what they want or don't even know what's possible, the most effective marketing strategy is ________ marketing.", opts:["customer-driven", "customer-driving", "societal", "ambush", "affinity"], ans:1, exp:"Customer-driving marketing = لما العميل لا يعرف ما يريد، الشركة تقوده وتبتكر له (مثل Apple مع الـ iPhone — العميل لم يطلبه لكنه احتاجه)." , expW:{0:"Customer-driven = تلبّي الاحتياجات المعروفة للعميل", 2:"societal marketing = يوازن بين مصلحة العميل والمجتمع — لا يصف قيادة العميل نحو احتياجات جديدة", 3:"ambush marketing = الظهور في فعاليات المنافسين بدون رعاية — لا علاقة له بهذا السيناريو", 4:"affinity marketing = تسويق قائم على الانتماء لمجموعة — لا يصف توقع الاحتياجات"} },
  { ch:"ch1", diff:"medium", q:"The societal marketing concept seeks to establish a balance between ________.", opts:["customer lifetime value and customer equity", "an inside-out perspective and an outside-in perspective", "consumer short-run wants and consumer long-run welfare", "marketing mixes and market offerings", "customer-driven marketing and customer-driving marketing"], ans:2 , past:true, exp:"Societal marketing concept = توازن بين رغبات المستهلك قصيرة المدى ومصلحته طويلة المدى (صحته، بيئته، مجتمعه).", expW:{0:"Customer equity مفهوم مختلف (قيمة قاعدة العملاء)",1:"Inside-out vs outside-in = فلسفة التوجه التسويقي",3:"Marketing mix vs offering = أدوات مختلفة",4:"Customer-driven vs driving = استراتيجيتان مختلفتان"} },
  { ch:"ch1", diff:"easy", q:"________ refers to socially and environmentally responsible marketing that meets the needs of consumers and businesses while also preserving or enhancing the ability of future generations to meet their needs.", opts:["Ambush marketing", "Evangelism marketing", "Sustainable marketing", "Database marketing", "Affinity marketing"], ans:2, exp:"Sustainable marketing = تسويق مسؤول بيئياً واجتماعياً — يلبي احتياجات الحاضر دون المساس بقدرة الأجيال القادمة." , expW:{0:"Ambush marketing = الظهور في فعاليات المنافسين بدون رعاية رسمية", 1:"Evangelism marketing = تحويل العملاء المتحمسين إلى مبشّرين", 3:"Database marketing = استخدام قواعد البيانات لاستهداف العملاء بدقة", 4:"Affinity marketing = استهداف مجموعات ذات اهتمامات مشتركة"} },
  { ch:"ch1", diff:"hard", q:"Some fast-food restaurants offer tasty and convenient food at affordable prices, but in doing so they contribute to a national obesity epidemic and environmental problems. These fast-food restaurants overlook the ________ philosophy.", opts:["marketing concept", "product concept", "production concept", "societal marketing concept", "selling concept"], ans:3, past:true, exp:"Societal marketing concept = يوازن بين رغبة العميل الآنية + مصلحته طويلة المدى + مصلحة المجتمع. الوجبات السريعة تُرضي الرغبة لكن تضر المجتمع.", expW:{0:"Marketing concept = يركز على العميل لكن يتجاهل المجتمع",1:"Product concept = يركز على تطوير المنتج",2:"Production concept = يركز على الكفاءة والأسعار المنخفضة",4:"Selling concept = يركز على البيع والترويج المكثف"} },
  { ch:"ch1", diff:"medium", q:"The set of marketing tools a firm uses to implement its marketing strategy is called the ________.", opts:["promotion mix", "product mix", "marketing mix", "market offering", "marketing effort"], ans:2 , past:true, exp:"Marketing mix = المزيج التسويقي (4Ps: Product, Price, Place, Promotion). هي الأدوات التي تُنفِّذ الاستراتيجية التسويقية.", expW:{0:"Promotion mix = جزء من المزيج التسويقي فقط",1:"Product mix = تشكيلة المنتجات",3:"Market offering = ما تقدمه للسوق",4:"Marketing effort = مجهود عام"} },
  { ch:"ch1", diff:"medium", q:"Which of the following is the most likely result of a marketing strategy that attempts to serve all potential customers?", opts:["All customers will be delighted.", "Customer-perceived value will increase.", "All customers will directly turn into customer evangelists.", "Not all customers will be satisfied.", "Customers will not show interest in any other company's products."], ans:3, exp:"لا يمكن لشركة واحدة إرضاء الجميع — محاولة خدمة كل العملاء بدون تركيز تعني عدم تلبية احتياجات أي شريحة بشكل كافٍ." , expW:{0:"All customers will be delighted = عكس الصحيح: استهداف الجميع يعني عدم التركيز — مما يقلل رضا كل شريحة", 1:"Customer-perceived value = الفوائد مقابل التكاليف كما يراها العميل", 2:"All customers will become evangelists = التبشير بالعلامة يستلزم رضا عالياً — وهو نتيجة غير محتملة عند خدمة الجميع", 4:"No interest in competitors' products = عكس الصحيح: خدمة الجميع بتركيز ضعيف تفتح الباب للمنافسين"} },
  { ch:"ch1", diff:"medium", q:"Which of the following statements reflects the marketing concept?", opts:["Focus on making continuous product improvements.", "Undertake a large-scale selling and promotion effort.", "Emphasize an inside-out perspective.", "Consider customer focus and value as the paths to sales and profits.", "Focus on a product-centered make-and-sell philosophy."], ans:3, past:true, exp:"Marketing concept = outside-in: ابدأ من احتياج العميل وقدِّم له قيمة. العميل هو المحور، وليس المنتج أو المبيعات.", expW:{0:"هذا Product concept",1:"هذا Selling concept",2:"Inside-out = عكس Marketing concept (هو outside-in)",4:"Make-and-sell = Production/Selling concept"} },
  { ch:"ch1", diff:"hard", q:"Bead Beautiful is a jewelry brand targeted at preteen girls. What needs do NOT fit with this audience, as the marketing team develops a value proposition for Bead Beautiful?", opts:["variety of colors in products", "price", "quality of materials", "mature designs", "ease of availability"], ans:3, exp:"البنات الصغيرات لا يهتمن بالتصاميم الناضجة (mature designs) — تصميم الـ value proposition لازم يتوافق مع احتياجات الشريحة المستهدفة." , expW:{0:"variety of colors = البنات الصغيرات يحببن التنوع في الألوان — هذا يناسبهن تماماً", 1:"price = السعر المناسب مهم لشريحة ذات ميزانية محدودة — هذا يناسبهن", 2:"quality of materials = جودة المواد مطلب عملي وأمان للأطفال — هذا يناسبهن", 4:"ease of availability = سهولة الحصول على المنتج مهمة لهذه الشريحة — هذا يناسبهن"} },
  { ch:"ch1", diff:"hard", q:"When demand for athletic shoes produced by Nike and endorsed by Michael Jordan is high, Nike limits how many pairs of shoes are manufactured. This action maintains strong demand by limiting supply. This decision contradicts the philosophy of which marketing concept?", opts:["marketing concept", "product concept", "production concept", "societal marketing concept", "selling concept"], ans:2, exp:"Production concept = يفترض أن المنتجات يجب أن تكون متاحة (availability) وبأسعار معقولة. Nike عكست هذا بتقييد الإنتاج — يتعارض مع مبدأ الإتاحة." , expW:{0:"Marketing concept = يبدأ من السوق واحتياج العميل — outside-in", 1:"Product concept = يركّز على الجودة والأداء — خطر marketing myopia", 3:"Societal marketing concept = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى", 4:"Selling concept = بيع ما تصنع بقوة إقناع — لا يبدأ من احتياج العميل"} },
  { ch:"ch1", diff:"hard", q:"At a local farmers' market, Molly Malone sells mussels while shouting to passersby, \"Fresh seafood, get your fresh seafood here!\" What kind of perspective is Molly taking?", opts:["customer-driving", "inside-out", "customer-driven", "outside-in", "niche marketing"], ans:1, exp:"Inside-out perspective: تبدأ من المنتج (المحار) وتحاول بيعه — Molly تنادي على بضاعتها ولا تسأل ماذا يريد الزبون." , expW:{0:"Customer-driving = تتوقع احتياجات العميل وتبتكر له المستقبل", 2:"Customer-driven = تلبّي الاحتياجات المعروفة للعميل", 3:"Outside-in = يبدأ من السوق والعميل ثم يصمم المنتج", 4:"Niche marketing = التركيز على شريحة صغيرة ومتخصصة"} },
  { ch:"ch1", diff:"medium", q:"In which of the following situations has a company most actively embraced customer- managed relationships?", opts:["American Airlines awards frequent flyer points to returning customers.", "Paige Premium Denim jeans provide superior quality and perfect fit.", "iRobot invites enthusiastic Roomba owners to develop and share their own uses for the company's robotic vacuum cleaner.", "Best Buy distinguishes between its best customers and its less profitable customers, stocking merchandise to appeal to each group.", "Toyota develops a marketing presence on social networks and other online communities."], ans:2, exp:"Customer-managed relationships = العميل يشارك في تشكيل العلاقة. iRobot دعت العملاء لإنشاء محتوى واستخدامات — المبادرة من العميل." , expW:{0:"Frequency marketing = مكافأة الولاء — تُدار من الشركة لا العميل", 1:"Product quality = منتج ممتاز — ليس نموذج Customer-managed relationship", 3:"CRM segmentation = تمييز العملاء من الشركة — ليس Customer-managed", 4:"Social media presence = بناء تواصل — ليس إدارة علاقة من العميل"} },
  { ch:"ch1", diff:"medium", q:"Which of the following statements is true about creating customer loyalty and retention?", opts:["Losing a customer means losing the entire stream of purchases that the customer would make over a lifetime of patronage.", "Customer delight creates a rational preference and not an emotional relationship with the brand.", "The aim of customer relationship management is to focus solely on customer delight.", "Losing a customer hardly makes a difference to a company's sales.", "The aim of customer relationship management is to focus solely on customer satisfaction."], ans:0, exp:"خسارة عميل واحد = خسارة كل مشترياته المستقبلية طوال حياته (customer lifetime value). ولهذا يُعدّ الاحتفاظ بالعملاء استثماراً طويل الأمد." , expW:{1:"Customer delight = الأداء يتجاوز توقعات العميل", 2:"CRM = بناء علاقات قوية ومربحة مع العملاء", 3:"Losing a customer hardly makes a difference = عكس الصحيح تماماً: خسارة عميل واحد قد تكلّف الشركة آلاف الدولارات من القيمة المستقبلية", 4:"CRM = بناء علاقات قوية ومربحة مع العملاء"} },
  { ch:"ch1", diff:"hard", q:"FedEx offers its customers fast and reliable package delivery. When FedEx customers weigh these benefits against the monetary cost of using FedEx along with other costs of using the service, they are acting upon ________.", opts:["brand loyalty", "customer equity", "customer-perceived value", "customer lifetime value", "a societal marketing campaign"], ans:2, exp:"Customer-perceived value = العميل يقيّم الفوائد (سرعة + موثوقية FedEx) مقابل التكاليف (سعر + وقت + جهد) — هذا هو القيمة المُدركة." , expW:{0:"Brand loyalty = وفاء العميل لعلامة تجارية — نتيجة وليست عملية تقييم", 1:"Customer equity = مجموع CLV لجميع عملاء الشركة", 3:"CLV = إجمالي ما ينفقه العميل طوال علاقته بالشركة", 4:"Societal marketing = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى"} },
  { ch:"ch1", diff:"medium", q:"Customer satisfaction is a goal that companies strive to earn. Companies can achieve customer delight by ________.", opts:["regularly putting products on sale", "promising only what they can deliver and then delivering more than they promise", "offering promotional deals such as \"buy one and get one free\"", "creating contests with exciting prizes", "using celebrities to advertise the products"], ans:1 , past:true, exp:"Customer delight = تجاوز التوقعات. الوصفة: وعِد بما تقدر عليه، ثم قدِّم أكثر. الرضا يأتي عندما الأداء = التوقعات؛ الإبهار يأتي عندما يتجاوزها.", expW:{0:"التخفيضات لا تبني delight حقيقي",2:"العروض الترويجية مؤقتة",3:"المسابقات لا تعكس جودة المنتج",4:"المشاهير يرفعون الوعي لكن لا يضمنون الرضا"} },
  { ch:"ch1", diff:"easy", q:"Building and maintaining profitable customer relationships by delivering superior customer value and satisfaction is called ________.", opts:["customer lifetime value", "customer-perceived value", "customer relationship management", "partner relationship management", "customer equity"], ans:2, exp:"CRM = إدارة علاقات العملاء: بناء والحفاظ على علاقات مربحة من خلال تقديم قيمة ورضا متفوقين للعملاء." , expW:{0:"CLV = إجمالي ما ينفقه العميل طوال علاقته بالشركة", 1:"Customer-perceived value = الفوائد مقابل التكاليف كما يراها العميل", 3:"PRM = الشراكة مع موردين وموزعين لخلق قيمة أكبر", 4:"Customer equity = مجموع CLV لجميع عملاء الشركة"} },
  { ch:"ch1", diff:"medium", q:"Which of the following marketing strategies should marketing managers focus on to manage detailed information about individual customers and carefully manage customer touchpoints to maximize customer loyalty?", opts:["customer divestment", "customer-managed relationships", "the societal marketing concept", "partner relationship management", "customer relationship management"], ans:4 , past:true, exp:"CRM = إدارة علاقات العملاء: جمع معلومات تفصيلية عن كل عميل وإدارة كل نقطة تواصل معه لبناء الولاء.", expW:{0:"Customer divestment = التخلص من عملاء غير مربحين",1:"Customer-managed = العميل يتحكم، ليس الشركة",2:"Societal concept = فلسفة مختلفة تماماً",3:"Partner relationship management = علاقات مع الشركاء"} },
  { ch:"ch1", diff:"medium", q:"________ is determined by a customer's evaluation of the benefits and costs of a market offering relative to those of competing offers.", opts:["Customer-perceived value", "Customer lifetime value", "Share of customer", "Customer-managed relationship", "Brand value proposition"], ans:0 , past:true, exp:"Customer-perceived value = تقييم العميل للفوائد مقارنةً بالتكاليف مقارنةً بالمنافسين. هو ما يراه العميل، ليس ما تعتقده الشركة.", expW:{1:"Lifetime value = القيمة الكلية للعميل على مدى العلاقة",2:"Share of customer = نسبة مشتريات العميل لديك",3:"Customer-managed = إدارة يتولاها العميل",4:"Value proposition = الوعد بالقيمة للعميل"} },
  { ch:"ch1", diff:"easy", q:"Customer equity refers to ________.", exp:"Customer equity = مجموع customer lifetime values لجميع عملاء الشركة.", opts:["a firm's current sales", "the share a firm earns of a customer's purchasing in their product categories", "the amount a customer is spending each year on certain products", "the total combined customer lifetime value of all of the company's current and potential customers", "a firm's market share"], ans:3 , expW:{0:"a firm's current sales = المبيعات الحالية تقيس الأداء الآني — Customer equity تقيس القيمة المستقبلية الكاملة لقاعدة العملاء", 1:"share of customer's purchasing = هذا مفهوم share of customer — نسبة إنفاق عميل بعينه في فئتك", 2:"amount customer spends each year = هذا إنفاق سنوي نقطي — Customer equity تجمع كل العملاء على مدى حياتهم", 4:"Market share = نسبة مبيعات الشركة من السوق — مختلف عن Customer equity"} },
  { ch:"ch1", diff:"medium", q:"It is most accurate to say that when customers purchase products they act on ________ as they judge values and costs.", exp:"Perceived value: العملاء يقيّمون القيمة بناءً على تصورهم الخاص، ليس بالأرقام الموضوعية.", opts:["objective value", "perceived value", "customer lifetime value", "company image", "society's interests"], ans:1 , expW:{0:"objective value = القيمة الموضوعية تُقاس بأرقام فعلية — لكن العميل يتصرف بناءً على تصوره الذاتي لا الأرقام", 2:"CLV = إجمالي ما ينفقه العميل طوال علاقته بالشركة", 3:"company image = صورة الشركة تؤثر على التصور لكنها ليست المعيار الذي يحكم به العميل على القيمة والتكاليف", 4:"society's interests = مصالح المجتمع غير ذات صلة بكيفية حكم العميل على القيمة عند الشراء"} },
  { ch:"ch1", diff:"medium", q:"The primary key to delivering customer satisfaction is to match product performance with ________.", exp:"Customer satisfaction = مطابقة أداء المنتج لتوقعات العميل. المفتاح: قدِّم ما يتوقعه العميل بالضبط.", opts:["the performance of competitive products", "competitive prices", "aggressive advertising", "limited customer services", "customer expectations"], ans:4 , expW:{0:"performance of competitive products = مقارنة الأداء بالمنافسين تفيد التمركز — لكن الرضا يُقاس بالتوقعات لا بالمنافس", 1:"competitive prices = السعر التنافسي يؤثر على القيمة المُدركة — لكن الرضا يعتمد على مطابقة الأداء للتوقع", 2:"aggressive advertising = الإعلان يرفع التوقعات — لكنه ليس مفتاح تحقيق الرضا", 3:"limited customer services = تحديد الخدمة يقلل التكلفة — لكنه لا يُعبّر عن مفتاح الرضا"} },
  { ch:"ch1", diff:"medium", q:"Which of the following terms refers to customers who make repeat purchases and tell others about their positive experiences with a product or service?", opts:["barnacles", "customer evangelists", "butterflies", "surrogate customers", "market mavens"], ans:1 , past:true, exp:"Customer evangelists = عملاء يشترون مراراً ويوصون الآخرين بنشاط (مثل المبشّرين!). أقوى نوع من الولاء.", expW:{0:"Barnacles = مخلصون لكن مربحيتهم منخفضة",2:"Butterflies = مربحون لكن غير مخلصين",3:"Surrogate consumers = ينوبون عن آخرين في القرار",4:"Market mavens = خبراء في السوق لكن المصطلح مختلف"} },
  { ch:"ch1", diff:"hard", q:"Sally recently purchased Brand X lotion. In comparing her perception of how the lotion made her skin feel and look to her expectations about Brand X lotion, Sally was measuring her level of ________.", opts:["share of customer", "customer satisfaction", "customer equity", "customer-perceived value", "customer lifetime value"], ans:1 , past:true, exp:"Customer satisfaction = مقارنة الأداء الفعلي بالتوقعات. سالي تقارن تجربتها الفعلية بما توقعته = هذا هو الرضا.", expW:{0:"Share of customer = نسبة مشترياتك من إجمالي مشترياته",2:"Customer equity = قيمة قاعدة العملاء الكلية",3:"Perceived value = تقييم قبل الشراء (فوائد vs تكاليف vs منافسين)",4:"Lifetime value = القيمة على مدى العلاقة بأكملها"} },
  { ch:"ch1", diff:"medium", q:"Which of the following strategies would a company most likely use to increase customer satisfaction?", exp:"تخفيض الأسعار يزيد رضا العميل لأنه يرفع القيمة المُدركة عند إبقاء الفوائد ثابتة.", opts:["decreasing the variety of offered services", "divesting", "lowering prices", "\"firing\" unprofitable customers", "limiting customer experiences with a brand"], ans:2 , expW:{0:"decreasing the variety of services = تقليص الخيارات يُضعف تجربة العميل — لا يزيد رضاه", 1:"divesting = التخلص من أصول أو وحدات أعمال — لا علاقة له بزيادة رضا العميل", 3:"firing unprofitable customers = هذه استراتيجية لزيادة الربحية — لا لزيادة رضا العميل", 4:"limiting customer experiences = تقييد تجربة العميل يُقلل فرص البهجة والرضا"} },
  { ch:"ch1", diff:"hard", q:"Hank is an assistant marketing director for a firm in a market with many low-margin customers. What type of relationship with these customers would be the most profitable for him?", exp:"Basic relationships = مع العملاء كثيري العدد ومنخفضي الهامش — يتواصل معهم باتصالات بسيطة (إعلانات، عروض) دون استثمار شخصي عالٍ.", opts:["full partnerships", "basic relationships", "causal relationships", "club marketing programs", "inverse relationships"], ans:1 , expW:{0:"full partnerships = تتطلب استثماراً شخصياً عالياً — غير مجدية مع عملاء كثيري العدد ومنخفضي الهامش", 2:"Causal relationship = علاقة سببية إحصائية — لا تصف علاقة تسويقية", 3:"Club marketing = عضوية حصرية لبناء ولاء العملاء", 4:"Inverse relationship = علاقة عكسية إحصائية — لا تصف علاقة تسويقية"} },
  { ch:"ch1", diff:"medium", q:"A room upgrade offered by a hotel to a guest who often stays in the hotel is an example of ________.", opts:["a frequency marketing program", "a basic relationship", "a club marketing program", "partner relationship management", "sustainable marketing"], ans:0 , past:true, exp:"Frequency marketing program = مكافآت للعملاء الأكثر تكراراً. الترقية مقابل الإقامة المتكررة = مكافأة على التكرار (برامج النقاط والمايلز مثلاً).", expW:{1:"Basic relationship = علاقة بسيطة بدون برامج",2:"Club marketing = عضوية نادي، مختلف عن مكافأة التكرار",3:"Partner relationship management = مع الشركاء التجاريين",4:"Sustainable marketing = تسويق مستدام، مفهوم مختلف"} },
  { ch:"ch1", diff:"hard", q:"A gym equipment manufacturer encourages customers to become members of the firm's Web site. Membership provides customers with exercise tips as well as discounts on gym equipment and workout apparel. This is an example of ________.", opts:["a frequency marketing program", "a basic customer relationship", "a club marketing program", "the selling concept", "consumer-generated marketing"], ans:2, exp:"Club marketing program = برنامج عضوية يمنح الأعضاء مزايا حصرية (نصائح رياضية + خصومات). الهدف بناء ولاء العميل بإنشاء مجتمع حول العلامة." , expW:{0:"Frequency marketing = مكافآت للعملاء الأكثر شراءً", 1:"basic customer relationship = تواصل بسيط بدون مزايا حصرية — لا يصف برنامج عضوية كامل", 3:"Selling concept = بيع ما تصنع بقوة إقناع — لا يبدأ من احتياج العميل", 4:"Consumer-generated marketing = محتوى يصنعه العملاء أنفسهم"} },
  { ch:"ch1", diff:"medium", q:"The marketing world is most likely embracing ________ because consumers wield greater power now with many platforms for airing and sharing their brand views with other consumers.", opts:["partner relationship management", "supply chain management", "customer-managed relationships", "market segmentation", "consumer ethnocentrism"], ans:2, exp:"Customer-managed relationships: العملاء باتوا أكثر قوة بمنصات التواصل — يتحكمون في العلاقة مع العلامة أكثر من ذي قبل." , expW:{0:"PRM = الشراكة مع موردين وموزعين لخلق قيمة أكبر", 1:"Supply chain management = إدارة سلسلة التوريد من المورد للمستهلك", 3:"Market segmentation = تقسيم السوق إلى شرائح ذات خصائص مشتركة", 4:"consumer ethnocentrism = تفضيل المستهلك للمنتجات الوطنية على الأجنبية — لا علاقة له بإدارة العلاقة مع العلامة"} },
  { ch:"ch1", diff:"medium", q:"Greater consumer control means that companies can no longer rely on ________.", exp:"Marketing by intrusion = الإعلانات التدخلية. مع قوة العميل، الشركات لا تستطيع إقحام رسائلها — لازم تجذب العميل.", opts:["promoting brand-consumer interaction", "marketing by intrusion", "creating market offerings and messages that involve consumers", "developing marketing concepts with an outside-in perspective", "marketing by attraction"], ans:1 , expW:{0:"Brand-consumer interaction = التفاعل بين العلامة والمستهلك", 2:"Market offering = مجموعة منتجات/خدمات/تجارب لإشباع حاجة", 3:"Marketing concept = يبدأ من السوق واحتياج العميل — outside-in", 4:"Marketing by attraction = التسويق بالجذب — الاتجاه الصحيح بعد قوة العميل"} },
  { ch:"ch1", diff:"hard", q:"Kao Corp., a deodorant manufacturer, invited teenage girls to make an ad that would encourage other girls to buy the product. This program is an example of ________.", exp:"Consumer-generated marketing = محتوى يصنعه المستهلكون أنفسهم. Kao دعت الفتيات لصنع الإعلان — المحتوى من العميل للعميل.", opts:["societal marketing", "the production concept", "the selling concept", "partner relationship management", "consumer-generated marketing"], ans:4 , expW:{0:"Societal marketing = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى", 1:"Production concept = يركّز على كفاءة الإنتاج والأسعار المنخفضة", 2:"Selling concept = بيع ما تصنع بقوة إقناع — لا يبدأ من احتياج العميل", 3:"PRM = الشراكة مع موردين وموزعين لخلق قيمة أكبر"} },
  { ch:"ch1", diff:"hard", q:"Elisandra, a marketing manager at a regional chain restaurant, has decided to organize a contest calling for customers to create commercials for the restaurant. Winning entries will be posted on the organization's home page. Elisandra's plan is an example of ________.", opts:["consumer-generated marketing", "partner relationship management", "customer lifetime value", "community development around a brand", "customer divestment"], ans:0, exp:"Consumer-generated marketing = العملاء يصنعون المحتوى التسويقي (إعلانات، مقاطع). المسابقة هنا تدعو العملاء لصنع الإعلانات." , expW:{1:"PRM = الشراكة مع موردين وموزعين لخلق قيمة أكبر", 2:"CLV = إجمالي ما ينفقه العميل طوال علاقته بالشركة", 3:"Community development = بناء مجتمع حول العلامة — ليس محتوى يصنعه العملاء مباشرةً", 4:"Customer divestment = التخلص من عملاء غير مربحين — عكس Consumer-generated marketing"} },
  { ch:"ch1", diff:"medium", q:"Through ________, companies today are strengthening their connections with all partners, from providers of raw materials and components to those involved in the delivery of final goods and services.", opts:["supply chain management", "direct marketing", "customer relationship marketing", "customized marketing", "inventory management"], ans:0, exp:"Supply chain management = إدارة سلسلة التوريد: تقوية العلاقات مع جميع الشركاء من الموردين للموزعين — هي partner relationship management الخارجي." , expW:{1:"Direct marketing = التواصل المباشر مع العملاء — لا يصف الشراكة مع الموردين", 2:"customer relationship marketing = يركّز على العلاقة مع العملاء — لا مع سلسلة التوريد كاملة", 3:"Customized marketing = تخصيص العروض — لا يصف الشراكة مع الموردين والموزعين", 4:"Inventory management = إدارة المخزون — لا يصف شراكات التوريد"} },
  { ch:"ch1", diff:"medium", q:"The final step in the marketing process is ________.", opts:["capturing value from customers", "creating customer delight", "creating customer lifetime value", "understanding the marketplace", "designing a customer-driven marketing strategy"], ans:0, exp:"الخطوة الأخيرة: capturing value = الحصول على القيمة من العملاء (أرباح + ولاء + customer equity)." , expW:{1:"Customer delight = الأداء يتجاوز توقعات العميل", 2:"CLV = إجمالي ما ينفقه العميل طوال علاقته بالشركة", 3:"understanding the marketplace = هذه الخطوة الأولى في النموذج الخماسي — ليست الأخيرة", 4:"designing a customer-driven marketing strategy = هذه الخطوة الثانية — تصميم الاستراتيجية بعد فهم السوق"} },
  { ch:"ch1", diff:"medium", q:"\"Losing a customer once means losing the entire stream of possible purchases that the customer would make over an extended period of patronage.\" This statement specifically indicates loss in terms of ________.", opts:["customer-perceived value", "marketing offerings", "partner relationship management", "customer lifetime value", "value proposition"], ans:3, exp:"Customer lifetime value = إجمالي الإنفاق المتوقع من العميل طوال علاقته بالشركة. خسارة العميل تعني خسارة كل هذا التدفق المستقبلي." , expW:{0:"Customer-perceived value = الفوائد مقابل التكاليف كما يراها العميل", 1:"marketing offerings = المنتجات والخدمات المقدَّمة للسوق — لا تقيس تدفق الأرباح المستقبلية", 2:"PRM = الشراكة مع موردين وموزعين لخلق قيمة أكبر", 4:"Value proposition = مجموعة الفوائد التي تعد بها الشركة للعميل"} },
  { ch:"ch1", diff:"hard", q:"At Gina's retail stores, the posted policy reads, \"Without our customers, we don't exist.\" Gina and her staff aim to delight each customer, and they are quick to offer discounts or extra services whenever a customer is anything less than satisfied. Gina and her staff strive to make every customer a repeat customer. It is most accurate to say that instead of focusing on each individual transaction, Gina and her staff put a priority on ________.", opts:["managing partner relationships", "selling new products", "attracting \"butterflies\"", "converting \"barnacles\" to \"strangers\"", "capturing customer lifetime value"], ans:4, exp:"Capturing customer lifetime value = Gina تركّز على تحويل كل تفاعل إلى علاقة طويلة الأمد مربحة — هذا هو جوهر إدارة قيمة عمر العميل." , expW:{0:"Partner relationships = إدارة قنوات التوزيع — ليس ما تستهدفه Gina", 1:"بيع منتجات جديدة = Selling concept — ليس هدف Gina", 2:"Butterflies = عملاء مربحون مؤقتاً — Gina تريد علاقات مستدامة", 3:"Barnacles = ولاء↑ + ربحية↓ — حاول رفع ربحيتهم"} },
  { ch:"ch1", diff:"easy", q:"The portion of the customer's purchasing that a company gets in its product categories is known as ________.", opts:["customer-perceived value", "share of customer", "customer insight", "consumption function", "induced consumption"], ans:1, exp:"Share of customer = نسبة ما ينفقه العميل على شركتك من إجمالي إنفاقه في فئة المنتج. الهدف زيادة هذه الحصة." , expW:{0:"Customer-perceived value = الفوائد مقابل التكاليف كما يراها العميل", 2:"Customer insight = فهم عميق لدوافع العميل وسلوكه", 3:"consumption function = دالة الاستهلاك الاقتصادية — مفهوم اقتصادي كلي لا علاقة له بحصة الإنفاق", 4:"induced consumption = الاستهلاك المُحفَّز بدخل إضافي — مصطلح اقتصادي لا يصف حصة إنفاق العميل"} },
  { ch:"ch1", diff:"medium", q:"Apart from retaining good customers, most marketers want to constantly increase their \"share of customer.\" What does this mean in marketing terms?", opts:["Marketers want to increase their market share.", "Marketers want to increase the share they get of the customer's purchasing in their product categories.", "Marketers want to diversify their operations and customize their products to cater to the entire market.", "Marketers want to continuously increase their customers' levels of satisfaction.", "Marketers want to turn satisfied customers into delighted customers."], ans:1, exp:"Share of customer = الحصول على نسبة أكبر من إنفاق العميل في فئتك. يختلف عن market share الذي يقيس حصتك من السوق الكلي." , expW:{0:"Market share = نسبة مبيعات الشركة من السوق — مختلف عن share of customer", 2:"diversify operations and customize for entire market = هذا تنويع المحفظة — لا يصف زيادة نسبة إنفاق العميل الفردي", 3:"continuously increase satisfaction = الرضا هدف منفصل — share of customer تقيس نسبة الإنفاق لا مستوى الرضا", 4:"turn satisfied into delighted customers = Customer delight هدف خاص — لا يصف معنى share of customer"} },
  { ch:"ch1", diff:"medium", q:"________ is one of the best ways to increase share of customer.", opts:["Targeting new customers", "Using bait and switch", "Cross-selling", "Divesting", "Partnership marketing"], ans:2, exp:"Cross-selling = أفضل طريقة لزيادة share of customer: بيع منتجات إضافية للعملاء الحاليين (مثل: عميل يشتري هاتفاً — اقترح له كفرة وسماعة)." , expW:{0:"Targeting new customers = يزيد market share — لا share of customer التي تعني زيادة إنفاق العميل الحالي", 1:"Bait and switch = إغراء بسعر ثم تبديل المنتج — ممارسة مضللة", 3:"Divesting = التخلص من وحدات أعمال — يُقلص الخيارات بدلاً من زيادة حصة إنفاق العميل", 4:"Partnership marketing = الشراكة مع علامات أخرى — لا يصف مباشرةً كيفية زيادة حصة إنفاق العميل"} },
  { ch:"ch1", diff:"hard", q:"Keith, a clothing store owner, offers product suggestions to customers based on their current purchases. Which of the following is Keith trying to increase?", opts:["shared value", "share of customer", "social responsibility", "customer-generated marketing", "customer loyalty"], ans:1, exp:"Share of customer = Keith يقترح منتجات بناءً على المشتريات الحالية (cross-selling) لزيادة نسبة ما ينفقه العميل في متجره." , expW:{0:"Shared value = خلق قيمة مشتركة للشركة والمجتمع — ليس حصة الإنفاق", 2:"Social responsibility = مسؤولية الشركة تجاه المجتمع", 3:"customer-generated marketing = محتوى يصنعه العملاء أنفسهم (مراجعات، مقاطع) — لا علاقة له باقتراح المنتجات", 4:"Customer loyalty = الولاء = نتيجة الرضا والقيمة — ليس حصة الإنفاق"} },
  { ch:"ch1", diff:"medium", q:"Which of the following refers to the total combined customer lifetime value of all of the company's current and potential customers?", opts:["share of customer", "marketing mix", "customer equity", "target market", "customer-perceived value"], ans:2 , past:true, exp:"Customer equity = مجموع قيم عمر جميع عملاء الشركة (الحاليين والمحتملين). هو مقياس مالي لقيمة قاعدة العملاء.", expW:{0:"Share of customer = نسبة مشتريات عميل واحد",1:"Marketing mix = المزيج التسويقي (4Ps)",3:"Target market = السوق المستهدف",4:"Customer-perceived value = القيمة التي يراها العميل"} },
  { ch:"ch1", diff:"easy", q:"In the context of customer relationship groups, a potentially profitable and short-term customer is referred to as a ________.", opts:["true friend", "butterfly", "stranger", "barnacle", "market maven"], ans:1, exp:"Butterflies = عملاء ذوو ربحية عالية لكن ولاء منخفض (قصير الأمد). مربحون على المدى القصير لكن لا يبقون." , expW:{0:"True friends = ولاء↑ + ربحية↑ — أفضل العملاء", 2:"Strangers = ولاء↓ + ربحية↓ — لا تستثمر فيهم", 3:"Barnacles = ولاء↑ + ربحية↓ — حاول رفع ربحيتهم", 4:"Market maven = خبير يشارك معلومات السوق — ليس تصنيف CRM"} },
  { ch:"ch1", diff:"medium", q:"Customers can be classified into four relationship groups based on their profitability and projected loyalty. Which customer type is associated with high profitability and long-term loyalty?", opts:["barnacles", "strangers", "butterflies", "true friends", "cash cows"], ans:3 , past:true, exp:"True friends = ربحية عالية + ولاء طويل الأمد. هم أفضل نوع من العملاء — يستحقون استثمار الشركة في العلاقة.", expW:{0:"Barnacles = ولاء عالٍ لكن ربحية منخفضة",1:"Strangers = ولاء منخفض وربحية منخفضة",2:"Butterflies = ربحية عالية لكن ولاء منخفض",4:"Cash cows = BCG matrix، مفهوم مختلف"} },
  { ch:"ch1", diff:"medium", q:"A company should not always target all possible customers. Which kind of customer is not the most valuable to a company, but, can over time, contribute to the firm's success?", opts:["butterflies", "shooting stars", "barnacles", "true friends", "strangers"], ans:0, exp:"Butterflies = مربحون لكن غير مخلصين. تستطيع الشركة الاستفادة منهم مؤقتاً لكنهم ليسوا الأكثر قيمة على المدى البعيد." , expW:{1:"Shooting stars = ليست مجموعة CRM معروفة", 2:"Barnacles = ولاء↑ + ربحية↓ — حاول رفع ربحيتهم", 3:"True friends = ولاء↑ + ربحية↑ — أفضل العملاء", 4:"Strangers = ولاء↓ + ربحية↓ — لا تستثمر فيهم"} },
  { ch:"ch1", diff:"medium", q:"A financial services firm has several loyal customers who conduct business with them exclusively. However, the company has noticed that this customer group is the least profitable for the company, and in some cases, it increases their losses when engaging in business with this group. Which of the following customer groups is being referred to in this scenario?", opts:["butterflies", "true friends", "strangers", "barnacles", "cash cows"], ans:3, exp:"Barnacles = عملاء مخلصون لكن ربحيتهم منخفضة (أو حتى خسائر). الولاء العالي + الربحية المنخفضة = barnacles." , expW:{0:"butterflies = ربحية مرتفعة + ولاء منخفض — عكس الوصف (الوصف يقول ولاء عالٍ وربحية منخفضة)", 1:"True friends = ولاء↑ + ربحية↑ — أفضل العملاء", 2:"Strangers = ولاء↓ + ربحية↓ — لا تستثمر فيهم", 4:"Cash cows = وحدات BCG منخفضة النمو وعالية الحصة — ليست مجموعة CRM"} },
  { ch:"ch1", diff:"hard", q:"Digital technology allows companies to reach out to customers in numerous ways. Which of the following is NOT the purpose of a company reaching out using digital and social media?", opts:["solving consumer problems", "building customer relationships", "helping customers shop", "providing product information", "working with suppliers"], ans:4, exp:"Digital technology للتواصل مع العملاء تهدف إلى: حل مشاكلهم، بناء علاقات، مساعدتهم في التسوق، وتقديم معلومات المنتج. العمل مع الموردين هو partner relationship وليس هدف التواصل مع العميل." , expW:{0:"Solving problems = هدف من أهداف Digital marketing", 1:"Building relationships = هدف أساسي للتواصل الرقمي — لا يُعدّ 'NOT the purpose'", 2:"Helping shop = تسهيل الشراء — هدف من Digital marketing", 3:"Providing info = تقديم المعلومات — هدف من Digital marketing"} },
  { ch:"ch1", diff:"medium", q:"A seller pursues a basic relationship with what kind of customers?", opts:["many customers regardless of profitability", "many high-margin customers", "many low-margin customers", "a few high-margin customers", "a few low-margin customers"], ans:2, exp:"Basic relationship = مع العملاء ذوي الهامش المنخفض والعدد الكبير — يتواصل معهم باتصالات بسيطة (إعلانات، رسائل) بدلاً من شراكة شخصية مكلفة." , expW:{0:"many customers regardless of profitability = Basic relationship تستهدف تحديداً منخفضي الهامش — الربحية عامل أساسي", 1:"many high-margin customers = العملاء ذوو الهامش المرتفع يستحقون full partnership — لا basic relationship", 3:"a few high-margin customers = هؤلاء يستحقون full partnership الشخصية والمكثفة", 4:"a few low-margin customers = Basic relationship مع الكثرة + الهامش المنخفض — لا مع العدد القليل"} },
  { ch:"ch1", diff:"medium", q:"A seller pursues a full partnership with what kind of customers?", opts:["many customers regardless of profitability", "many high-margin customers", "many low-margin customers", "a few high-margin customers", "a few low-margin customers"], ans:3, exp:"Full partnership = مع عملاء قليلين ذوي هامش ربح عالٍ — تستحق الشركة الاستثمار في شراكة عميقة وشخصية معهم." , expW:{0:"many customers regardless of profitability = Full partnership مكلفة ولا تناسب عملاء كثيرين", 1:"many high-margin customers = Full partnership تُبنى مع عدد محدود جداً لا مع عملاء كثيرين حتى لو هامشهم مرتفع", 2:"many low-margin customers = العدد الكبير + الهامش المنخفض = basic relationship — لا full partnership", 4:"a few low-margin customers = الهامش المنخفض لا يبرر تكلفة full partnership"} },
  { ch:"ch1", diff:"medium", q:"A marketer wants to increase its \"share of customer.\" It can do this by offering a greater variety to customers, or by ________.", opts:["decreasing prices", "increasing discounts and coupons", "sending samples directly to customers", "introducing customers to \"brand evangelists\"", "creating programs to cross-sell and up-sell to market more products and service to existing customers"], ans:4, exp:"زيادة share of customer تتم بـ: تنويع العروض للعميل الحالي، أو cross-selling وup-selling لبيع منتجات وخدمات إضافية لنفس العميل." , expW:{0:"decreasing prices = تخفيض الأسعار قد يجذب عملاء جدد — لكنه لا يزيد بالضرورة نسبة إنفاق العميل الحالي", 1:"increasing discounts and coupons = الخصومات تقليل للسعر — لا تزيد share of customer", 2:"sending samples directly = توزيع عينات يعرّف بالمنتج — لا يعني زيادة حصة إنفاق العميل", 3:"Brand evangelists = المبشّرون بالعلامة — ليس طريقة زيادة حصة إنفاق العميل"} },
  { ch:"ch1", diff:"hard", q:"Carol Veldt's plan also involves a seasonal promotional gimmick that she wants to promote aggressively. This is an example of the ________ concept.", opts:["selling", "marketing", "product", "production", "societal marketing"], ans:0, exp:"Selling concept = Carol تستخدم الترويج المكثف لمنتج موسمي لإقناع الناس بشرائه — هذا نموذج الـ selling (ابدأ بالمنتج ثم أقنع السوق)." , expW:{1:"marketing = يبدأ من احتياج العميل ويصمم المنتج له — Carol بدأت بالمنتج الموسمي وترويجه", 2:"product = يركّز على تحسين جودة المنتج وميزاته — ليس على الترويج الانتهازي", 3:"production = يركّز على الكفاءة وخفض التكلفة — ليس على الترويج المكثف", 4:"Societal marketing = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى"} },
  { ch:"ch1", diff:"hard", q:"Renovations of the guest rooms at the Seagull Terrace and plans to add an indoor pool area are examples of the ________ concept.", opts:["selling", "marketing", "product", "production", "societal marketing"], ans:2, exp:"Product concept = تحسين المنتج وإضافة مزايا جديدة (تجديد الغرف + المسبح) = التركيز على جودة وميزات المنتج." , expW:{0:"selling = يركّز على الترويج المكثف لبيع ما تم إنتاجه — التجديد وإضافة المزايا ليس ترويجاً", 1:"marketing = يبدأ من بحث احتياجات العميل — هنا الفندق يحسّن المنتج دون إشارة لبحث عملاء", 3:"production = يركّز على الكفاءة وخفض التكلفة — تجديد الغرف يرفع التكلفة", 4:"Societal marketing = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى"} },
  { ch:"ch1", diff:"hard", q:"Carol Veldt has decided to ask selected guests to participate in an extensive survey about their experience at Seagull Terrace and about their requirements in terms of amenities and cuisines. By implementing the suggestions she receives from guests, Carol would be following the ________ concept.", opts:["production", "product", "selling", "marketing", "societal marketing"], ans:3, exp:"Marketing concept = Carol تبدأ من العميل: تسأله عن تجربته ومتطلباته ثم تُطبّق اقتراحاته. هذا هو الـ outside-in." , expW:{0:"production = يركّز على الكفاءة وخفض التكلفة — Carol تبدأ من رأي العميل لا من تكاليف الإنتاج", 1:"product = يركّز على تحسين الجودة والميزات — Carol تستند لمقترحات العملاء لا لمعايير الجودة الداخلية", 2:"selling = يركّز على الترويج المكثف — Carol تستمع للعملاء بدلاً من إقناعهم", 4:"Societal marketing = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى"} },
  { ch:"ch1", diff:"hard", q:"Marketers use mobile channels for several purposes. Which of the following is LEAST likely to be one of those purposes?", opts:["Enrich the brand experience.", "Send billing statement.", "Stimulate immediate buying.", "Make shopping easier.", "Boost sampling."], ans:1, exp:"إرسال كشف الفاتورة (billing statement) ليس من أهداف القنوات التسويقية المحمولة — هو عملية إدارية/مالية وليس تسويقاً." , expW:{0:"Brand experience = تجربة العلامة التجارية الشاملة", 2:"تحفيز الشراء الفوري = هدف Mobile marketing", 3:"تسهيل التسوق = هدف Mobile marketing", 4:"تحفيز التجربة = هدف Mobile marketing"} },
  { ch:"ch1", diff:"hard", q:"Marketers set up company and brand Web sites that provide information and promote the company's products. Social media is a significant part of today's marketing strategy. Which of these tools is NOT part of the growth in digital technology?", opts:["blogs", "e-mail", "telemarketing calls", "mobile apps", "videos"], ans:2, exp:"Telemarketing calls = مكالمات تليفونية تقليدية، ليست جزءاً من نمو التكنولوجيا الرقمية. الرقمي يشمل: blogs، email، mobile apps، videos." , expW:{0:"blogs = منصات رقمية تفاعلية — جزء أصيل من نمو التكنولوجيا الرقمية", 1:"e-mail = تواصل رقمي مباشر — ركيزة أساسية في التسويق الرقمي", 3:"mobile apps = تطبيقات الهاتف — من أبرز أدوات التسويق الرقمي الحديثة", 4:"videos = محتوى رقمي مرئي عبر الإنترنت — جزء أساسي من نمو التسويق الرقمي"} },
  { ch:"ch1", diff:"medium", q:"Following the change in consumer values and consumption patterns after the Great Recession, marketers have changed their marketing strategies to emphasize the ________ of their products.", opts:["image", "value", "durability", "safety", "uniqueness"], ans:1, exp:"بعد الأزمة المالية الكبرى، تغيّرت قيم المستهلكين نحو التوفير والحذر — لذا بدأ المسوقون يُبرزون value (القيمة مقابل السعر) في حملاتهم." , expW:{0:"image = الصورة الذهنية للعلامة — لم تكن محور التغيير بعد الركود الذي دفع المستهلكين للحذر المالي", 2:"durability = المتانة ميزة دائمة — لكن إبراز القيمة مقابل السعر كان الاستجابة الأشمل للركود", 3:"safety = السلامة مهمة في قطاعات معينة — لكن Value كانت الأولوية الأشمل بعد الأزمة", 4:"uniqueness = التفرد أسلوب تمييز — لكن المستهلكين بعد الركود أولوا الأولوية لاستحقاق السعر"} },
  { ch:"ch1", diff:"medium", q:"Which of the following actions should a marketer take in response to the new economy?", opts:["Offer selected discounts.", "Cut marketing budgets.", "Hold the line on prices.", "Cut costs.", "Discontinue products."], ans:2, exp:"في الاقتصاد الجديد بعد الركود، الاستراتيجية الأنسب هي الحفاظ على الأسعار (hold the line) مع إبراز القيمة — لا التخفيض الذي يضر الهامش." , expW:{0:"Offer selected discounts = الخصومات تضر بالهامش وتُشير للعميل أن المنتج مبالغ في سعره", 1:"Cut marketing budgets = تقليص ميزانية التسويق يُضعف الوجود في السوق — خاصةً في أوقات المنافسة الشديدة", 3:"Cut costs = خفض التكاليف قد يضر بالجودة والقيمة المُدركة للعميل", 4:"Discontinue products = إيقاف المنتجات يُقلص الخيارات ويُضعف الموقف التنافسي"} },
  { ch:"ch1", diff:"medium", q:"Government agencies design ________ to encourage energy conservation and discourage smoking, excessive drinking, and drug use.", opts:["club marketing programs", "social marketing campaigns", "consumer-generated marketing campaigns", "ambush marketing campaigns", "frequency marketing programs"], ans:1, exp:"Social marketing campaigns = حملات اجتماعية تستخدم أدوات التسويق لتغيير سلوك المجتمع (ترشيد الطاقة، مكافحة التدخين). الحكومة تستخدمها لصالح عام." , expW:{0:"Club marketing = عضوية حصرية لبناء ولاء العملاء", 2:"Consumer-generated marketing = محتوى يصنعه العملاء أنفسهم", 3:"Ambush marketing = الظهور في فعاليات المنافسين بدون رعاية رسمية", 4:"Frequency marketing = مكافآت للعملاء الأكثر شراءً"} },
  { ch:"ch1", diff:"medium", q:"As part of the rapid globalization of today's economy, companies are selling more domestically produced goods in international markets and ________.", opts:["taking a local view of their industry", "purchasing more supplies abroad", "reducing competition within their industry", "downplaying concerns for social responsibility", "competing solely in traditional marketplaces"], ans:1, exp:"العولمة = الشركات تبيع محلياً أكثر في الأسواق الدولية وتشتري مستلزماتها من الخارج (purchasing more supplies abroad). هذا جوهر التكامل الاقتصادي العالمي." , expW:{0:"التركيز المحلي = يتعارض مع التوجه العالمي للعولمة", 2:"تقليل المنافسة ليس نتيجة العولمة — بل تزيدها", 3:"Social responsibility = مسؤولية الشركة تجاه المجتمع", 4:"الاقتصاد العالمي يدفع للأسواق الإلكترونية لا التقليدية فقط"} },
  { ch:"ch1", diff:"hard", q:"Iceco Inc., an ice cream manufacturing company, encourages all stakeholders, including the top management and all employees, to consider individual and community welfare in their day-to-day decisions. This action undertaken by Iceco reflects ________.", opts:["environmentalism", "social responsibility", "the selling concept", "partner relationship management", "marketing myopia"], ans:1, exp:"Social responsibility = مسؤولية اجتماعية: تشجيع الموظفين والإدارة على مراعاة رفاهية الفرد والمجتمع في قراراتهم اليومية." , expW:{0:"Environmentalism = الاهتمام بالبيئة — ليس مسؤولية الشركة تجاه كل أصحاب المصلحة", 2:"Selling concept = بيع ما تصنع بقوة إقناع — لا يبدأ من احتياج العميل", 3:"PRM = الشراكة مع موردين وموزعين لخلق قيمة أكبر", 4:"Marketing myopia = التركيز على المنتج وإهمال الحاجة الأساسية للعميل"} },
  { ch:"ch1", diff:"medium", q:"Marketing in the non-profit sector is applied in all but which of these ways?", opts:["to enhance their images", "to attract memberships", "to publicize the organization's supporters", "to design social marketing campaigns for specific causes", "to encourage donor support"], ans:2, exp:"التسويق في القطاع غير الربحي يشمل: تحسين الصورة، استقطاب الأعضاء، تصميم الحملات الاجتماعية، وتشجيع التبرعات. الإعلان عن الداعمين ليس هدفاً رئيسياً." , expW:{0:"Image enhancement = ليس الهدف الأساسي للتسويق غير الربحي", 1:"Attracting memberships = هدف مشروع للمنظمات غير الربحية", 3:"Social marketing = حملات تغيير السلوك لصالح المجتمع", 4:"Donor support = هدف أساسي للمنظمات غير الربحية"} },
  { ch:"ch1", diff:"medium", q:"A church targeting different demographic groups to increase attendance is an example of ________.", opts:["affinity marketing", "not-for-profit marketing", "societal marketing", "evangelism marketing", "affiliate marketing"], ans:1, exp:"Not-for-profit marketing = التسويق للمنظمات غير الربحية. الكنيسة تستهدف مجموعات سكانية مختلفة لزيادة الحضور = تطبيق مبادئ التسويق في السياق غير الربحي." , expW:{0:"Affinity marketing = استهداف مجموعات ذات اهتمامات مشتركة", 2:"Societal marketing = يوازن بين رغبة العميل ومصلحة المجتمع طويل المدى", 3:"Evangelism marketing = تحويل العملاء المتحمسين إلى مبشّرين", 4:"Affiliate marketing = تسويق بالعمولة عبر الشركاء"} },
  { ch:"ch1", diff:"hard", q:"Your state's department of education has budgeted a significant amount of money for a radio, print, television, and online advertising campaign emphasizing the long-term benefits, both educationally and professionally, of reading every day. This is an example of a(n) ________ campaign.", opts:["ambush marketing", "social marketing", "inbound marketing", "consumer-generated marketing", "affiliate marketing"], ans:1, exp:"Social marketing campaign = حملة تسويقية اجتماعية تروّج لفكرة أو سلوك اجتماعي مفيد (القراءة اليومية). الحكومة تستخدم التسويق لخدمة المصلحة العامة." , expW:{0:"Ambush marketing = الظهور في فعاليات المنافسين بدون رعاية رسمية", 2:"Inbound marketing = جذب العملاء عبر المحتوى بدلاً من الإعلانات التقليدية", 3:"Consumer-generated marketing = محتوى يصنعه العملاء أنفسهم", 4:"Affiliate marketing = تسويق بالعمولة عبر الشركاء"} },
  { ch:"ch1", diff:"easy", q:"Many organizations use multiple social media, such as Facebook, Twitter, Instagram, and YouTube. What is the primary reason a company would use multiple social media?", opts:["entice customers to one of the social media sites", "present a carefully integrated message to fans and customers", "improve its \"hit\" count", "appeal to new customers", "increase its prices because it is more well-known"], ans:1, exp:"الهدف من استخدام وسائل التواصل المتعددة هو تقديم رسالة متكاملة ومتسقة للعملاء عبر جميع القنوات — وليس الاعتماد على قناة واحدة." , expW:{0:"إغراء العملاء لمنصة واحدة = عكس استخدام منصات متعددة", 2:"Hit count = مقياس كمي — ليس الهدف الرئيسي من تعدد المنصات", 3:"استقطاب عملاء جدد = هدف جانبي — ليس الهدف الرئيسي من تعدد المنصات", 4:"رفع الأسعار بسبب الشهرة = لا علاقة باستخدام منصات متعددة"} },
  { ch:"ch1", diff:"medium", q:"Companies want to build strong relationships with the customers by consistently ________.", opts:["Creating profits", "Delivering superior customer value", "Capturing market share from competitors", "Creating sales", "Running frequent sales promotions"], ans:1, past:true, exp:"العلاقات القوية مع العملاء تُبنى بتقديم قيمة متفوقة باستمرار — هذا هو جوهر CRM وفلسفة التسويق الحديثة.", expW:{0:"الأرباح نتيجة، ليست الطريقة لبناء العلاقة",2:"Market share = نتيجة، ليست طريقة",3:"المبيعات نتيجة، ليست الأساس",4:"العروض المؤقتة لا تبني ولاء حقيقي"} },
  { ch:"ch1", diff:"medium", q:"Which of the following is an example of the Internal publics?", opts:["Employees", "Government", "NGOs", "Media", "Marketing intermediaries"], ans:0, past:true, exp:"Internal publics = الجمهور الداخلي: الموظفون وكل من داخل الشركة. الباقون خارج الشركة (حكومة، إعلام، وسطاء).", expW:{1:"Government = government publics (خارجي)",2:"NGOs = citizen-action publics (خارجي)",3:"Media = media publics (خارجي)",4:"Marketing intermediaries = جزء من الـ microenvironment"} },
  { ch:"ch1", diff:"hard", q:"The societal marketing concept holds that marketing strategy should deliver value to customers while also improving consumers' and society's well-being. This strategy should deliver value to all EXCEPT:", opts:["Company", "Customers", "Society", "Competitors"], ans:3, past:true, exp:"Societal marketing = توازن بين 3 أطراف: الشركة + العملاء + المجتمع. المنافسون ليسوا جزءاً من هذا التوازن.", expW:{0:"Company = طرف رئيسي (أرباح الشركة)",1:"Customers = طرف رئيسي (رضا العميل)",2:"Society = طرف رئيسي (مصلحة المجتمع)"} },
  { ch:"ch1", diff:"hard", q:"JetBlue promises to put \"You above all\" by bringing \"humanity back to travel\". Spirit Airlines gives you \"Bare fare\" pricing: \"Less Money. More Go.\" Such _______ differentiate one brand from another, and answer the customer's question: \"Why should I buy your brand rather than a competitor's?\"", opts:["Target marketing strategies", "Marketing mix designs", "Value propositions", "Market segmentation bases", "Customer relationship programs"], ans:2, past:true, exp:"Value propositions = الوعود التي تُميّز العلامة وتجيب على 'ليش تختارنا؟'. JetBlue تعد بالإنسانية، Spirit تعد بالسعر المنخفض.", expW:{0:"Target marketing = اختيار الشريحة المستهدفة",1:"Marketing mix = أدوات التنفيذ (4Ps)",3:"Market segmentation = تقسيم السوق",4:"CRM = برامج إدارة العلاقات"} },
  { ch:"ch1", diff:"medium", q:"The marketing program builds customer relationships by transforming the marketing strategy into action. To engage target consumers and persuade them of the offer's merits, it uses the:", opts:["Product", "Place", "Promotion mix", "Pricing strategy"], ans:2, past:true, exp:"الـ Promotion mix = الجزء من المزيج التسويقي المسؤول عن إقناع العميل وإشراكه (إعلانات، مبيعات شخصية، علاقات عامة، إلخ).", expW:{0:"Product = المنتج نفسه",1:"Place = التوزيع والوصول",3:"Pricing = تحديد السعر"} },
  { ch:"ch1", diff:"hard", q:"All of the following are accurate descriptions of modern marketing EXCEPT ___.", opts:["It involves building profitable customer relationships","It creates value for customers","It focuses exclusively on advertising and promotions","It satisfies customer needs better than competitors","It captures value from customers in return"], ans:2, exp:"التسويق الحديث لا يقتصر على الإعلان والترويج فقط. هذه النظرة الضيقة هي مفهوم البيع القديم. التسويق يشمل خلق القيمة وبناء العلاقات والتقاط القيمة.", expW:{0:"صحيح — يبني علاقات مربحة",1:"صحيح — يخلق قيمة للعملاء",3:"صحيح — يُرضي الاحتياجات",4:"صحيح — يلتقط القيمة"} },
  { ch:"ch1", diff:"hard", q:"A company that believes in the production concept would most likely ___.", opts:["Focus heavily on advertising campaigns","Research customer needs before producing","Prioritize high availability and low cost over customer needs","Develop innovative new products constantly","Build long-term customer relationships"], ans:2, exp:"Production concept = التركيز على كفاءة الإنتاج والتوزيع الواسع والأسعار المنخفضة. لا يُعنى بما يريده العميل فعلاً.", expW:{0:"Advertising focus = Selling concept",1:"Research needs = Marketing concept",3:"Constant innovation = Product concept",4:"Long-term relationships = Marketing/CRM concept"} },
  { ch:"ch1", diff:"hard", q:"Which of the following scenarios BEST illustrates marketing myopia?", opts:["A car company defines its business as providing transportation solutions","A railroad company defines itself as being in the transportation business","A railroad company defines itself as being in the railroad business not transportation","A cosmetics company says it sells hope and beauty","A technology company focuses on customer experience over product specs"], ans:2, exp:"Marketing myopia = تعريف الشركة بمنتجها لا بالحاجة التي تُشبعها. شركة السكك الحديدية التي تقول 'نحن في مجال السكك الحديدية' تعاني من الـ myopia. لو قالت 'نحن في مجال النقل' = market-oriented.", expW:{0:"Transportation solutions = market-oriented صحيح",1:"Transportation business = market-oriented صحيح",3:"Hope and beauty = market-oriented صحيح",4:"Customer experience focus = marketing concept صحيح"} },
  { ch:"ch1", diff:"hard", q:"A company following the societal marketing concept must balance all of the following EXCEPT ___.", opts:["Consumer wants","Company profits","Competitor pricing strategies","Society long-run interests","Human welfare"], ans:2, exp:"Societal marketing يوازن بين: رغبات المستهلك + أرباح الشركة + مصلحة المجتمع على المدى البعيد. أسعار المنافسين ليست أحد العناصر الثلاثة.", expW:{0:"Consumer wants = يجب موازنتها",1:"Company profits = يجب موازنتها",3:"Society's long-run interests = يجب موازنتها",4:"Human welfare = جزء من مصلحة المجتمع"} },
  { ch:"ch1", diff:"hard", q:"Customer equity differs from brand equity in that customer equity ___.", opts:["Focuses on the product market reputation","Is always higher than brand equity","Measures the total lifetime value of all customers combined","Is built through advertising spend only","Reflects perceptions of a brand quality"], ans:2, exp:"Customer equity = مجموع القيمة الإجمالية لعمر جميع العملاء. Brand equity = قيمة العلامة التجارية في أذهان العملاء. الأول يقيس العملاء، الثاني يقيس العلامة.", expW:{0:"Market reputation = Brand equity",1:"ليس دائماً صحيحاً",3:"Advertising only = Brand equity approach",4:"Brand quality perceptions = Brand equity"} },
  // ══════════════ Chapter 2 — 114 questions ══════════════
  { ch:"ch2", diff:"easy", q:"________ is the process of developing and maintaining a crucial fit between the organization's goals and capabilities and its changing marketing opportunities.", opts:["Benchmarking", "SWOT analysis", "Market segmentation", "Strategic planning", "Diversification"], ans:3, exp:"Strategic planning = عملية تطوير توافق بين أهداف/قدرات الشركة وفرص السوق المتغيرة. الإجابة: Strategic planning لأنه التعريف الدقيق للمصطلح." , expW:{0:"مقارنة أداء الشركة بالمنافسين", 1:"تحليل القوى والضعف والفرص والتهديدات", 2:"مجموعة تستجيب بنفس الطريقة للمزيج التسويقي", 4:"منتجات جديدة في أسواق جديدة — أعلى مخاطرة"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following is true with regard to strategic planning?", opts:["At the corporate level, the company starts the strategic planning process by determining what portfolio of businesses and products is best for the company.", "A strategic plan deals with a company's short-term goals.", "The focus of strategic planning is to define a game plan for long-run survival and growth.", "The strategic plan is a statement of an organization's purpose.", "Strategic planning involves identifying segments of consumers with identical preferences."], ans:2, past:true, exp:"Strategic planning = وضع خطة للبقاء والنمو طويل الأمد. التركيز على long-run (ليس short-term) وعلى التوافق بين القدرات والفرص.", expW:{0:"Corporate-level يبدأ بالمهمة، ثم الأهداف، ثم المحفظة",1:"Strategic plan = طويل الأمد (ليس قصير)",3:"هذا تعريف Mission statement",4:"تحديد الشرائح = Market segmentation"} },
  { ch:"ch2", diff:"medium", q:"Which of the following is the first step in strategic planning?", opts:["setting short-term goals", "developing the business portfolio", "defining the organizational mission", "formulating the key marketing strategies", "identifying the organization's weaknesses and the threats it faces"], ans:2, exp:"أول خطوة في التخطيط الاستراتيجي = تحديد المهمة (mission). قبل أي شيء يجب أن تعرف الشركة لماذا توجد وما غرضها." , expW:{0:"الأهداف قصيرة الأمد — يأتي بعد المهمة، ليس أولاً", 1:"مجموعة الأعمال والمنتجات للشركة", 3:"صياغة الاستراتيجيات — تأتي لاحقاً بعد المهمة والأهداف", 4:"تحديد الضعف والتهديدات = SWOT، يأتي بعد تحديد المهمة"}  },
  { ch:"ch2", diff:"hard", q:"Which of the following is NOT a step in the strategic planning process?", opts:["defining the company mission", "setting company objectives and goals", "designing the business portfolio", "planning marketing and other functional strategies", "evaluating members of the company's value chain"], ans:4, exp:"خطوات التخطيط الاستراتيجي: تعريف المهمة → أهداف → محفظة الأعمال → الاستراتيجيات. تقييم أعضاء سلسلة القيمة ليست خطوة ضمنها." , expW:{0:"بيان مهمة الشركة", 1:"تحديد الأهداف = الخطوة الثانية في التخطيط الاستراتيجي الفعلي", 2:"مجموعة الأعمال والمنتجات للشركة", 3:"التخطيط الاستراتيجي"}  },
  { ch:"ch2", diff:"medium", q:"A ________ documents an organization's purpose—what it wants to accomplish in the larger environment.", opts:["vision statement", "mission statement", "business portfolio", "value proposition", "product strategy"], ans:1 , past:true, exp:"Mission statement = بيان مهمة المنظمة: ما غرضها؟ ماذا تريد تحقيقه؟ يجب أن يكون market-oriented وطويل الأمد.", expW:{0:"Vision statement = رؤية المستقبل (أين تريد أن تكون؟)",2:"Business portfolio = محفظة الأعمال والمنتجات",3:"Value proposition = الوعد بالقيمة للعملاء",4:"Product strategy = استراتيجية المنتج"} },
  { ch:"ch2", diff:"medium", q:"Mission statements should ________ and be defined in terms of ________.", opts:["be technology oriented; meeting the self-actualization needs of customers", "be product oriented; satisfying the esteem needs of customers", "embody the company's short-term plans; current opportunities", "be market oriented; satisfying basic customer needs", "address sales and profits; the net return on investments"], ans:3, past:true, exp:"المهمة الجيدة: market-oriented (تتكلم عن احتياجات العميل لا المنتج) + تُحدَّد من حيث إشباع احتياجات العميل الأساسية.", expW:{0:"Technology-oriented = تركيز على التكنولوجيا لا السوق",1:"Product-oriented = يؤدي لـ marketing myopia",2:"Short-term = المهمة يجب أن تكون طويلة الأمد",4:"Sales & profits = مؤشرات مالية، ليست هدف المهمة"} },
  { ch:"ch2", diff:"medium", q:"A mission statement serves as a ________.", opts:["statement of the organization's net profits", "plan for short-term sustainability", "statement of the organization's purpose", "statement of the organization's current liabilities", "reward plan for the organization's highly skilled employees"], ans:2, exp:"Mission statement = بيان غرض المنظمة (what it wants to accomplish). ليس عن الأرباح أو الخطط القصيرة الأمد." , expW:{0:"بيان الأرباح = تقرير مالي، ليس هدف بيان المهمة", 1:"الاستدامة قصيرة الأمد — المهمة تصف الغرض الدائم لا الخطة المرحلية", 3:"الالتزامات الحالية = مصطلح محاسبي، لا صلة له ببيان المهمة", 4:"خطة مكافآت الموظفين = إدارة بشرية، لا تعريف لبيان المهمة"}  },
  { ch:"ch2", diff:"hard", q:"Which of the following is NOT a market-oriented business definition?", opts:["\"We empower customers to realize their dreams.\"", "\"We make high-quality consumer food products.\"", "\"We sell success and status.\"", "\"We create the Hilton experience.\"", "\"We bring innovation to every home.\""], ans:1, exp:"تعريف product-oriented = يركز على المنتج نفسه. 'نصنع منتجات غذائية عالية الجودة' = product-oriented لأنها تصف المنتج لا حاجة العميل." , expW:{0:"نُمكّن العملاء من أحلامهم = market-oriented (تركّز على حاجة العميل)", 2:"بيع النجاح والمكانة = market-oriented (قيمة عاطفية للعميل)", 3:"خلق تجربة Hilton = market-oriented (تجربة العميل)", 4:"إحضار الابتكار للمنزل = market-oriented (فائدة العميل)"}  },
  { ch:"ch2", diff:"medium", q:"Companies that define their missions in terms of products or technologies are considered myopic primarily because ________.", opts:["products and technologies result in low returns on investment", "consumer preferences with regard to products and technology are difficult to predict", "consumer preferences for different product categories vary from time to time", "products and technologies eventually become outdated", "most consumers are not comfortable using sophisticated technology during the buying process"], ans:3, exp:"Marketing myopia = قصر نظر تسويقي. المنتجات والتقنيات تتقادم بمرور الوقت، بينما الحاجة الإنسانية تبقى. الشركة التي تركّز على المنتج وليس الحاجة ستنتهي عندما يتقادم منتجها." , expW:{0:"عائد الاستثمار ليس السبب — المنتجات قد تربح لفترة ثم تتقادم", 1:"صعوبة التنبؤ بتفضيلات التكنولوجيا ليست سبب marketing myopia", 2:"المنتج — ما تقدمه الشركة", 4:"تعقيد التكنولوجيا على المستهلكين ليس تعريف marketing myopia"}  },
  { ch:"ch2", diff:"medium", q:"Mission statements should be defined in terms of ________.", opts:["the advantages a company's products provide", "satisfying basic customer needs", "the value a company's products provide", "the profitability of a company's products", "the variety they offer to a customer"], ans:1 , past:true, exp:"Mission statement = تُعرَّف من منظور العميل وإشباع احتياجاته الأساسية — ليس من منظور المنتج أو الأرباح.", expW:{0:"مزايا المنتج = product-oriented myopia",2:"القيمة المقدمة قريبة لكن 'satisfying needs' أدق",3:"الربحية = هدف مالي",4:"التنوع = ميزة منتج"} },
  { ch:"ch2", diff:"hard", q:"Orion Inc. operates in many industries, including pharmaceuticals and food products. The company's goal is to create \"abundant and affordable food for all and a healthy environment.\" This represents Orion's ________.", opts:["marketing plan", "product mix", "business portfolio", "marketing mix", "mission statement"], ans:4, exp:"Mission statement = بيان غرض الشركة الكبير. جملة 'إنشاء غذاء وفير وبأسعار معقولة للجميع وبيئة صحية' = غرض المنظمة وليس خطة أو مزيج." , expW:{0:"خطة التسويق التفصيلية", 1:"المنتج — ما تقدمه الشركة", 2:"مجموعة الأعمال والمنتجات للشركة", 3:"product, price, place, promotion"}  },
  { ch:"ch2", diff:"hard", q:"A company's broad mission leads it to develop all of the following EXCEPT ________.", opts:["budget objectives", "business objectives", "sales objectives", "marketing objectives", "customer engagement objectives"], ans:0, exp:"المهمة الشاملة تُنتج هرماً من الأهداف: أهداف الأعمال → أهداف التسويق → أهداف المبيعات وإشراك العملاء. أهداف الميزانية = تفصيل مالي لا يُشتق مباشرة من المهمة." , expW:{1:"Business objectives = تُشتق مباشرة من المهمة الشاملة للشركة", 2:"Sales objectives = تنبثق من أهداف الأعمال والمهمة الشاملة", 3:"Marketing objectives = تنبثق من أهداف الأعمال والمهمة", 4:"Customer engagement objectives = تُشتق من المهمة والأهداف التسويقية"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following companies has a product-oriented business definition?", opts:["A luxury hotel, whose business definition is: \"We sell out-of-the-world experiences to our guests.\"", "A real estate company, whose business definition is: \"We sell dreams.\"", "A cosmetic company, whose business definition is: \"We offer hope and self-expression.\"", "A shoe manufacturer, whose business definition is: \"We manufacture affordable and long- lasting shoes for all.\"", "A high-technology company, whose business definition is: \"We sell inspirations.\""], ans:3, exp:"'نصنع أحذية بأسعار معقولة' = product-oriented لأنها تصف المنتج (الحذاء). الباقون يتحدثون عن تجارب وأحلام وأمل = market-oriented." , expW:{0:"بيع تجارب من العالم الآخر = market-oriented (تجربة العميل)", 1:"بيع الأحلام = market-oriented (حاجة عاطفية للعميل)", 2:"تقديم الأمل والتعبير الذاتي = market-oriented (قيمة عاطفية)", 4:"بيع الإلهام = market-oriented (قيمة نفسية للعميل)"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following companies has a market-oriented business definition?", opts:["An electronics company, whose business definition is: \"We produce microchips.\"", "A hotel, whose business definition is: \"We rent rooms.\"", "An apparel company, whose business definition is: \"We make and sell women's clothing.\"", "A cosmetic company, whose business definition is: \"We sell hope and self-esteem.\"", "A pizzeria, whose business definition is: \"We sell the world's most delicious thin-crust pizzas.\""], ans:3, exp:"'نبيع الأمل وتقدير الذات' = market-oriented لأنه يتحدث عن ما يحصل عليه العميل (قيمة عاطفية). الباقون يصفون المنتج نفسه (رقائق، غرف، ملابس، بيتزا)." , expW:{0:"ننتج رقائق إلكترونية = product-oriented (يصف المنتج لا قيمة العميل)", 1:"نؤجر غرفاً = product-oriented (يصف النشاط لا حاجة العميل)", 2:"نصنع ونبيع ملابس نسائية = product-oriented (يصف المنتج)", 4:"نبيع أشهى بيتزا = product-oriented (يصف المنتج لا حاجة العميل)"}  },
  { ch:"ch2", diff:"hard", q:"Which of the following is NOT an example of product-oriented mission statements?", opts:["\"We are an online library.\"", "\"We run theme parks.\"", "\"We sell athletic shoes.\"", "\"We sell memorable experiences.\"", "\"We rent hotel rooms.\""], ans:3, exp:"'نبيع تجارب لا تُنسى' = market-oriented لأنها تتحدث عن التجربة (القيمة للعميل). الباقون = product-oriented لأنهم يصفون نشاطهم أو منتجاتهم." , expW:{0:"مكتبة إلكترونية = product-oriented (يصف النشاط لا فائدة العميل)", 1:"ندير مدن ملاهٍ = product-oriented (يصف النشاط لا التجربة)", 2:"نبيع أحذية رياضية = product-oriented (يصف المنتج)", 4:"نؤجر غرف فندقية = product-oriented (يصف النشاط لا قيمة العميل)"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following is a market-oriented mission statement?", opts:["\"We empower customers to achieve their dreams.\"", "\"We sell jumbo burgers.\"", "\"We are an online library.\"", "\"We are a low-cost airline.\"", "\"We make porcelain figurines.\""], ans:0, exp:"'نُمكّن العملاء من تحقيق أحلامهم' = market-oriented لأنها تتمحور حول العميل وما يستفيده. الباقون يصفون منتجاتهم أو ما يفعلونه." , expW:{1:"نبيع برجر = product-oriented (يصف المنتج)", 2:"مكتبة إلكترونية = product-oriented (يصف النشاط)", 3:"شركة طيران رخيصة = product-oriented (يصف المنتج/السعر)", 4:"نصنع تماثيل خزفية = product-oriented (يصف المنتج)"}  },
  { ch:"ch2", diff:"medium", q:"Mission statements should be ________.", opts:["meaningful and specific yet motivating", "technology oriented", "written solely for public relations purposes", "focused on increasing sales or profits", "strictly product oriented"], ans:0, exp:"بيان المهمة الجيد = ذو معنى + محدد + محفّز. لا يجب أن يكون تقني أو ربحي أو product-oriented فقط." , expW:{1:"Technology-oriented = يقود لـ marketing myopia (قصر النظر)", 2:"للعلاقات العامة فقط = ضيق الهدف، المهمة أشمل من ذلك", 3:"التركيز على المبيعات/الأرباح = مؤشرات مالية لا غرض وجودي", 4:"product-oriented = يقود لقصر النظر التسويقي"}  },
  { ch:"ch2", diff:"medium", q:"A company's broad mission leads to ________.", opts:["increasing profits and more customers", "increasing sales and decreasing costs", "a higher share price", "a hierarchy of objectives, including business objective and marketing objectives", "increased market share and increasing profitability"], ans:3, exp:"المهمة الشاملة تُنتج هرماً من الأهداف: أهداف الأعمال → أهداف التسويق. المهمة ليست هدفاً بحد ذاتها بل تُشتق منها الأهداف التفصيلية." , expW:{0:"الأرباح والعملاء نتائج، لا ما تُنتجه المهمة مباشرة", 1:"زيادة المبيعات وتقليل التكاليف أهداف تشغيلية، لا مخرج المهمة", 2:"سعر السهم مؤشر مالي لا يُشتق من المهمة مباشرة", 4:"الحصة السوقية والربحية مقاييس أداء، لا مخرج مباشر للمهمة"}  },
  { ch:"ch2", diff:"medium", q:"The collection of businesses and products that make up a company is called its ________.", opts:["strategic business unit", "supply chain", "strategic plan", "business portfolio", "internal value chain"], ans:3 , past:true, exp:"Business portfolio = مجموعة الأعمال والمنتجات التي تمتلكها الشركة. مثل شركة P&G التي لديها عشرات العلامات التجارية.", expW:{0:"SBU = وحدة عمل واحدة ضمن المحفظة",1:"Supply chain = سلسلة التوريد",2:"Strategic plan = خطة الاستراتيجية",4:"Internal value chain = سلسلة القيمة الداخلية"} },
  { ch:"ch2", diff:"medium", q:"Which of the following is the first step of business portfolio planning?", opts:["shaping the future portfolio by developing strategies for growth and downsizing", "determining which businesses should receive more, less, or no investment", "identifying internal strengths and weaknesses", "identifying future opportunities", "determining short-term goals"], ans:1, exp:"أول خطوة في تخطيط المحفظة = تحديد أي الأعمال تستحق استثماراً أكثر أو أقل أو لا شيء. ثم تأتي الخطوة الثانية: تشكيل محفظة المستقبل." , expW:{0:"تشكيل المحفظة المستقبلية = الخطوة الثانية، ليس الأولى", 2:"القوة والضعف = SWOT، ليس بداية تخطيط المحفظة", 3:"فرص المستقبل = تأتي بعد تحليل المحفظة الحالية", 4:"الأهداف قصيرة الأمد = ليست جزءاً من تخطيط المحفظة"}  },
  { ch:"ch2", diff:"medium", q:"The major activity in strategic planning is ________, whereby management evaluates the products and businesses that make up the company.", opts:["SWOT analysis", "benchmarking", "business portfolio analysis", "breakeven analysis", "prospecting"], ans:2, exp:"النشاط الرئيسي في التخطيط الاستراتيجي = تحليل محفظة الأعمال (business portfolio analysis)، أي تقييم كل الوحدات والمنتجات لاتخاذ قرارات الاستثمار." , expW:{0:"تحليل القوى والضعف والفرص والتهديدات", 1:"مقارنة أداء الشركة بالمنافسين", 3:"نقطة التعادل — لا ربح ولا خسارة", 4:"Prospecting = البحث عن عملاء محتملين جدد"}  },
  { ch:"ch2", diff:"medium", q:"The best business portfolio is the one that ________.", opts:["provides the greatest opportunity for increasing profits", "best fits the company's strengths and weaknesses to opportunities in the environment", "ensures that the company will realize increased share of market", "allows the company to decrease its overall costs", "entices customers to purchase even more products from the company"], ans:1, exp:"أفضل محفظة أعمال = تلك التي تُوافق نقاط قوة الشركة وضعفها مع الفرص البيئية. هذا هو جوهر Strategic planning." , expW:{0:"زيادة الأرباح نتيجة، ليست معيار اختيار المحفظة", 2:"الحصة السوقية نتيجة، ليست معيار اختيار المحفظة", 3:"تخفيض التكاليف هدف تشغيلي، ليس معيار المحفظة", 4:"إغراء العملاء = تسويق، ليس معيار اختيار المحفظة"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following best describes a strategic business unit?", opts:["the internal value chain of a company", "the supply chain of a company", "the key businesses that make up a company", "the key channel intermediaries of a service company", "the key competitors of a company"], ans:2, exp:"SBU (Strategic Business Unit) = الأعمال الرئيسية التي تتكون منها الشركة. كل SBU مستقلة ولها مهمتها واستراتيجيتها الخاصة." , expW:{0:"سلسلة الأنشطة الداخلية التي تخلق قيمة", 1:"سلسلة التوريد من الموردين", 3:"وسطاء القناة = microenvironment، ليسوا SBU", 4:"المنافسون = microenvironment، ليسوا SBU"}  },
  { ch:"ch2", diff:"medium", q:"During portfolio analysis, a company ________ after identifying the key businesses that make up the company.", opts:["formulates a short-term marketing plan", "assesses the attractiveness of its various SBUs", "assesses its strengths and weaknesses", "performs a SWOT analysis", "assesses the effectiveness of its various channel intermediaries"], ans:1 , past:true, exp:"تحليل المحفظة: الخطوة 1 = تحديد الـ SBUs ← الخطوة 2 = تقييم جاذبية كل SBU (باستخدام BCG matrix مثلاً).", expW:{0:"Short-term plan = يأتي بعد التحليل",2:"نقاط القوة والضعف = SWOT، خطوة مختلفة",3:"SWOT = أداة تحليل مختلفة",4:"Channel intermediaries = microenvironment"} },
  { ch:"ch2", diff:"hard", q:"Which of the following is NOT something a company must determine when analyzing its current business portfolio?", opts:["which businesses should receive more investment", "which businesses should receive less investment", "which businesses should receive no investment", "which businesses should be sold or closed", "which businesses shape the future portfolio"], ans:4, exp:"عند تحليل المحفظة الحالية: تُقرِّر الشركة حجم الاستثمار لكل وحدة — Build (بناء) أو Hold (حفظ) أو Harvest (حصاد) أو Divest (تخلص/بيع). 'تشكيل المحفظة المستقبلية' هي الخطوة الثانية المنفصلة (باستخدام Ansoff matrix) وليست جزءاً من تحليل المحفظة الحالية." , expW:{0:"خيار خاطئ — تحديد من يستحق استثماراً أكثر جزء من التحليل (Build)", 1:"خيار خاطئ — تحديد من يستحق استثماراً أقل جزء من التحليل (Harvest)", 2:"خيار خاطئ — تحديد من لا يستحق استثماراً جزء من التحليل (Hold)", 3:"خيار خاطئ — Divest (بيع/إغلاق) هو إحدى الاستراتيجيات الأربع التي تُقرَّر خلال تحليل المحفظة الحالية"}  },
  { ch:"ch2", diff:"medium", q:"Most standard portfolio analysis methods evaluate SBUs on the ________.", opts:["potential for niche or global marketing", "degree of product differentiation", "strength of the market or industry position", "accessibility to rural markets", "number of successful business acquisitions"], ans:2, exp:"معظم أساليب تحليل المحفظة (كـ BCG) تُقيّم الـ SBUs على أساس قوة الموقع في السوق/الصناعة (market position strength) — ليس التمييز أو الوصول الجغرافي." , expW:{0:"تخصص في شريحة يتجاهلها المنافسون", 1:"المنتج — ما تقدمه الشركة", 3:"الوصول للأسواق الريفية ليس معياراً في BCG", 4:"الاستحواذات الناجحة لا تقيس قوة الموقع في السوق"}  },
  { ch:"ch2", diff:"hard", q:"According to the Boston Consulting Group approach, ________ provides a measure of market attractiveness.", opts:["product attribute", "product design", "market penetration", "market growth rate", "market segmentation"], ans:3, exp:"BCG matrix محوران: المحور العمودي = معدل نمو السوق (market growth rate) = جاذبية السوق. المحور الأفقي = الحصة السوقية النسبية = قوة الشركة." , expW:{0:"المنتج — ما تقدمه الشركة", 1:"المنتج — ما تقدمه الشركة", 2:"نفس المنتج + نفس السوق — زيادة مبيعات", 4:"مجموعة تستجيب بنفس الطريقة للمزيج التسويقي"}  },
  { ch:"ch2", diff:"medium", q:"According to the Boston Consulting Group approach, ________ serves as a measure of company strength in the market.", opts:["relative market share", "product development", "market diversification", "product attribute", "market segmentation"], ans:0, exp:"في BCG matrix: الحصة السوقية النسبية (relative market share) = مقياس قوة الشركة في السوق. كلما كانت الحصة أعلى كلما كانت الشركة أقوى." , expW:{1:"منتجات جديدة للسوق الحالية", 2:"منتجات جديدة في أسواق جديدة — أعلى مخاطرة", 3:"المنتج — ما تقدمه الشركة", 4:"مجموعة تستجيب بنفس الطريقة للمزيج التسويقي"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following is true of the BCG matrix approach?", opts:["It is inexpensive to implement.", "It does not have any limitations.", "It considers market growth rate to be a measure of market attractiveness.", "It describes consumer motivations and needs.", "It does not consider relative market share to be a measure of company strength in the market."], ans:2 , past:true, exp:"BCG matrix محوران: Market growth rate = جاذبية السوق ← Market share = قوة الشركة. كلاهما أساس المصفوفة.", expW:{0:"BCG مكلف التطبيق على الشركات الكبيرة",1:"له محدودية معروفة",3:"BCG لا يصف دوافع المستهلكين",4:"Relative market share هو بالضبط ما يقيسه المحور الأفقي"} },
  { ch:"ch2", diff:"medium", q:"Within a company, who is most likely to perform strategic planning?", opts:["the president and vice presidents", "the accounting and finance departments", "the marketing and sales departments", "cross-functional teams of divisional managers close to their markets", "the manufacturing and production departments"], ans:3, exp:"التخطيط الاستراتيجي الحديث = لا مركزي (decentralized). فرق متعددة الوظائف من مديري الأقسام القريبين من أسواقهم هي الأنسب لأنها الأقرب للواقع." , expW:{0:"الرئيس ونوابه يُشاركون لكن ليسوا الأنسب في النموذج الحديث", 1:"المحاسبة والمالية تنفذ، لا تخطط استراتيجياً", 2:"التسويق يُشارك لكن التخطيط أشمل من قسم واحد", 4:"التصنيع يُنفذ، لا يخطط استراتيجياً"}  },
  { ch:"ch2", diff:"medium", q:"The key businesses of Kimberley and Price consist of a division that produces and sells breakfast cereals and another that manufactures gardening tools. Each of these businesses is called a ________.", opts:["market segment", "strategic business unit", "question mark", "prospect", "product portfolio"], ans:1, past:true, exp:"SBU (Strategic Business Unit) = وحدة عمل مستقلة داخل شركة كبيرة، لها مهمتها واستراتيجيتها الخاصة (كل قسم هنا = SBU).", expW:{0:"Market segment = شريحة من السوق (عملاء)",2:"Question mark = تصنيف BCG، ليس اسم وحدة عمل",3:"Prospect = عميل محتمل",4:"Product portfolio = المحفظة الكاملة"} },
  { ch:"ch2", diff:"easy", q:"________ are a type of SBU that often require heavy investments to finance their rapid growth.", opts:["Cash cows", "Question marks", "Stars", "Dogs", "Bears"], ans:2, exp:"Stars = نمو عالٍ + حصة سوقية عالية. تحتاج استثمارات ضخمة لتمويل النمو السريع، لكنها في المستقبل ستصبح Cash Cows عندما يتباطأ السوق." , expW:{0:"نمو↓ حصة↑ — مصدر نقد ثابت", 1:"نمو↑ حصة↓ — مستقبل غير مؤكد", 3:"نمو↓ حصة↓ — ضعيفة، يُفكَّر في التخلص منها", 4:"Bears = غير موجود في BCG matrix"}  },
  { ch:"ch2", diff:"medium", q:"________ are low-growth, high-share businesses/products that need less investment to hold their market share.", opts:["Stars", "Cash cows", "Question marks", "Dogs", "Bears"], ans:1 , past:true, exp:"Cash cows = نمو منخفض + حصة عالية → تحتاج استثمار أقل لأن السوق ناضج، لكن تولّد نقداً كثيراً يُموّل الـ Stars و Question Marks.", expW:{0:"Stars = نمو عالٍ + حصة عالية (تحتاج استثمار كثير)",2:"Question marks = نمو عالٍ + حصة منخفضة",3:"Dogs = نمو منخفض + حصة منخفضة",4:"Bears = غير موجود في BCG"} },
  { ch:"ch2", diff:"medium", q:"Which of the following is true with regard to cash cows?", opts:["They are high-growth, high-share businesses or products.", "They can be used to help finance the company's question marks and stars.", "They require significant cash to maintain market share.", "They are low-share businesses and products.", "They do not promise to be large sources of cash."], ans:1 , past:true, exp:"Cash cows تولّد نقداً وفيراً لأن السوق ناضج والاستثمار المطلوب منخفض → هذا النقد يُموّل بقية الوحدات (Stars, Question Marks).", expW:{0:"High-growth + high-share = Stars",2:"تحتاج استثماراً قليلاً، ليس كثيراً",3:"Cash cows = حصة عالية (ليست منخفضة)",4:"هي بالعكس من أكبر مصادر النقد"} },
  { ch:"ch2", diff:"medium", q:"________ are low-share business units in high-growth markets that require a lot of cash to hold their share.", opts:["Stars", "Dogs", "Question marks", "Cash cows", "Bears"], ans:2, exp:"Question marks = نمو عالٍ + حصة منخفضة. تحتاج نقداً كثيراً للحفاظ على حصتها. مستقبلها غير مؤكد: إما تصبح Stars أو Dogs." , expW:{0:"نمو↑ حصة↑ — تحتاج استثماراً كثيراً", 1:"نمو↓ حصة↓ — ضعيفة، يُفكَّر في التخلص منها", 3:"نمو↓ حصة↑ — مصدر نقد ثابت", 4:"Bears = غير موجود في BCG matrix"}  },
  { ch:"ch2", diff:"medium", q:"The pharmaceuticals division of Omni Healthcare holds low market share in a high-growth market. According to the BCG matrix, the pharmaceuticals division of Omni can be classified as a ________.", opts:["star", "bear", "question mark", "cash cow", "dog"], ans:2, exp:"حصة منخفضة + نمو عالٍ = Question mark في BCG matrix. هذه الوحدة تحتاج قرار: هل تستثمر فيها لترفع حصتها (Star) أم تتخلص منها؟" , expW:{0:"نمو↑ حصة↑ — Stars تحتاج استثماراً كثيراً", 1:"Bears = غير موجود في BCG matrix", 3:"نمو↓ حصة↑ — Cash cows مصدر نقد ثابت", 4:"نمو↓ حصة↓ — Dogs ضعيفة، يُفكَّر في التخلص منها"}  },
  { ch:"ch2", diff:"medium", q:"By harvesting its SBU, a company would most likely be ________.", opts:["milking the SBU's short-term cash flow regardless of the long-term effect", "selling the SBU or phasing it out and using the resources elsewhere", "investing just enough to hold the SBU's current market share", "investing more in the business unit to build its share", "diversifying the company's product line"], ans:0, exp:"Harvesting = حلب الوحدة: تقليل الاستثمار فيها لتحقيق أقصى تدفق نقدي على المدى القصير بغض النظر عن تأثير ذلك على المدى البعيد." , expW:{1:"Divesting = بيع الوحدة أو إيقافها (استراتيجية مختلفة)", 2:"Hold strategy = الاحتفاظ بالحصة الحالية دون تغيير", 3:"Build strategy = بناء الحصة السوقية بالاستثمار", 4:"التنويع = استراتيجية Ansoff، ليست من قرارات BCG"}  },
  { ch:"ch2", diff:"medium", q:"A company can ________ an SBU by selling it or phasing it out and using the resources elsewhere.", opts:["divest", "promote", "expand", "harvest", "hold"], ans:0 , past:true, exp:"Divest = التخلص من الوحدة (بيعها أو إيقافها) لتحرير الموارد وتوجيهها لفرص أفضل. يُستخدم عادة مع Dogs.", expW:{1:"Promote = ترويج (ليس قرار محفظة)",2:"Expand = توسع",3:"Harvest = حلب الوحدة لتوليد نقد قصير الأمد دون استثمار",4:"Hold = الحفاظ على الحصة الحالية"} },
  { ch:"ch2", diff:"medium", q:"Modern strategic planning ________.", opts:["exclusively consists of a company's short-term goals", "is decentralized", "does not involve cross-functional teams", "does not take the overall mission of the company into consideration", "is highly centralized"], ans:1, exp:"التخطيط الاستراتيجي الحديث = لامركزي (decentralized). يُشرك فرقاً متعددة الوظائف على مستويات مختلفة، عكس النموذج القديم المركزي." , expW:{0:"التخطيط الحديث يشمل أهدافاً طويلة الأمد، ليست قصيرة فقط", 2:"يُشرك بالضبط فرقاً متعددة الوظائف (cross-functional)", 3:"بيان المهمة الشركة هو نقطة البداية في التخطيط الاستراتيجي", 4:"النموذج القديم كان مركزياً، الحديث لامركزي (decentralized)"}  },
  { ch:"ch2", diff:"medium", q:"The BCG matrix approach is problematic in that it ________.", opts:["focuses on planning for the future at the cost of ignoring the present", "focuses solely on current businesses and provides little scope for future planning", "tends to undermine the importance of market growth rate as a measure of market attractiveness", "tends to undermine the importance of relative market share as a measure of company strength in the market", "fails to classify SBUs"], ans:1 , past:true, exp:"عيب BCG الرئيسي: يركز على الأعمال الحالية ولا يوجّه جيداً نحو الفرص المستقبلية (لا ينظر خارج المحفظة الحالية).", expW:{0:"العكس: BCG يركز على الحاضر لا المستقبل",2:"Market growth rate محور أساسي في BCG",3:"Relative market share محور أساسي في BCG",4:"BCG يصنّف الـ SBUs بالضبط"} },
  { ch:"ch2", diff:"medium", q:"Which of the following is a portfolio-planning tool for identifying company growth opportunities through market penetration, market development, product development, or diversification?", opts:["BCG matrix", "analysis of variance", "product/market expansion grid", "Harris matrix", "SWOT analysis"], ans:2 , past:true, exp:"Product/Market Expansion Grid (Ansoff Matrix) = الأداة التي تُحدد 4 استراتيجيات نمو بناءً على منتج جديد/حالي × سوق جديد/حالي.", expW:{0:"BCG matrix = لتحليل المحفظة الحالية (ليس للنمو المستقبلي)",1:"Analysis of variance = إحصاء",3:"Harris matrix = غير موجود",4:"SWOT = تحليل البيئة الداخلية والخارجية"} },
  { ch:"ch2", diff:"medium", q:"Phoenix, a popular coffee shop chain in North America, recently opened 400 stores to cater to its rapidly increasing number of patrons. This exemplifies ________.", opts:["product differentiation", "product development", "diversification", "market penetration", "market segmentation"], ans:3, exp:"Market penetration = نفس المنتج (قهوة) + نفس السوق (أمريكا الشمالية). فتح فروع أكثر = بيع أكثر لنفس العملاء في نفس السوق." , expW:{0:"المنتج — ما تقدمه الشركة", 1:"منتجات جديدة للسوق الحالية", 2:"منتجات جديدة في أسواق جديدة — أعلى مخاطرة", 4:"مجموعة تستجيب بنفس الطريقة للمزيج التسويقي"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following is true with regard to the product/expansion grid?", opts:["It classifies SBUs into four distinct categories.", "It is a useful device for identifying growth opportunities.", "It helps companies analyze their internal strengths and weaknesses.", "It functions on the premise that firms should downsize to regain market share.", "It is a useful device for segregating customers into distinct categories."], ans:1, exp:"Product/market expansion grid (Ansoff Matrix) = أداة لتحديد فرص النمو عبر أربع استراتيجيات. ليست لتصنيف SBUs (تلك BCG) ولا لتحليل نقاط القوة (تلك SWOT)." , expW:{0:"تصنيف SBUs = BCG matrix، ليست Ansoff", 2:"تحليل القوة والضعف = SWOT، ليست Ansoff", 3:"التخلص من منتجات أو أسواق ضعيفة = Divesting (BCG)", 4:"تقسيم العملاء = market segmentation، ليست Ansoff"}  },
  { ch:"ch2", diff:"medium", q:"Making more sales to current customers without changing a firm's products is known as ________.", opts:["market segmentation", "market penetration", "product diversification", "product development", "prospecting"], ans:1, past:true, exp:"Market penetration = نفس المنتج + نفس السوق = بع أكثر لنفس العملاء. الاستراتيجية الأقل مخاطرة في مصفوفة Ansoff.", expW:{0:"Market segmentation = تقسيم السوق",2:"Product diversification = منتج جديد في سوق جديد",3:"Product development = منتج جديد في سوق حالي",4:"Prospecting = البحث عن عملاء جدد"} },
  { ch:"ch2", diff:"hard", q:"Lark Inc., an American electronics company, is currently reviewing new geographical markets to sell its highly popular televisions. By 2020, it plans to open new stores across all the major South Asian cities. Lark is most likely following a ________ strategy.", opts:["local marketing", "market development", "diversification", "product adaptation", "product development"], ans:1, past:true, exp:"Market development = نفس المنتج (تلفزيونات) + سوق جديد (جنوب آسيا). Lark لم تغير منتجها، فقط دخلت أسواقاً جغرافية جديدة.", expW:{0:"Local marketing = تخصيص التسويق محلياً",2:"Diversification = منتج جديد + سوق جديد",3:"Product adaptation = تعديل المنتج",4:"Product development = منتج جديد لسوق حالي"} },
  { ch:"ch2", diff:"medium", q:"The managers of Arrow, an American retail chain, are currently reviewing new demographic markets to sell the firm's current products. This is an example of ________.", opts:["market penetration", "product development", "mass marketing", "market development", "product adaptation"], ans:3, exp:"Market development = نفس المنتج الحالي + سوق ديموغرافي جديد. Arrow لم تغير منتجاتها، فقط تبحث عن شرائح عملاء جديدة." , expW:{0:"نفس المنتج + نفس السوق — زيادة مبيعات", 1:"منتجات جديدة للسوق الحالية", 2:"Mass marketing = استهداف الجميع بنفس الرسالة، لا تطوير سوق جديد", 4:"Product adaptation = تعديل المنتج ليناسب سوقاً جديداً"}  },
  { ch:"ch2", diff:"medium", q:"The managers of Alfredo's Pizza, a popular pizzeria in New York City, have been increasingly encouraging senior citizens to visit the pizzeria's numerous outlets spread across the city. Anticipating a rise in the population of senior citizens in the area, the management of Alfredo's Pizza is seeking to tap into this promising segment that consists of retired, affluent consumers. In this instance, the managers of Alfredo's Pizza are anticipating company growth through ________.", opts:["market development", "product development", "mass customization", "niche marketing", "product differentiation"], ans:0, exp:"Market development = نفس المنتج (البيتزا) + سوق جديد (كبار السن كشريحة جديدة). Alfredo's لم تغير منتجها، بل تستهدف شريحة ديموغرافية جديدة." , expW:{1:"Product development = منتج جديد لسوق حالي", 2:"Mass customization = تخصيص كل منتج لكل عميل، غير متعلق بالسيناريو", 3:"Niche marketing = تخصص في شريحة صغيرة يتجاهلها المنافسون", 4:"Product differentiation = تمييز المنتج عن المنافسين"}  },
  { ch:"ch2", diff:"hard", q:"FencePro, a local company, has developed an entirely new mounting system for chain link fences. After acquiring a distributor, FencePro now has the ability to market its products nationwide. FencePro is most likely following a ________ strategy.", opts:["market penetration", "market development", "downsizing", "product adaptation", "product development"], ans:1, exp:"Market development = نفس المنتج (نظام التثبيت) + سوق جغرافي جديد (على مستوى البلد بدل المحلي). التوسع الجغرافي = market development." , expW:{0:"نفس المنتج + نفس السوق — زيادة مبيعات", 2:"التخلص من منتجات أو أسواق ضعيفة", 3:"المنتج — ما تقدمه الشركة", 4:"منتجات جديدة للسوق الحالية"}  },
  { ch:"ch2", diff:"medium", q:"Amor, a successful brand of women's clothing, recently introduced a line of fitness equipment. This is an example of ________.", opts:["mass customization", "niche marketing", "diversification", "prospecting", "product adaptation"], ans:2, exp:"Diversification = منتج جديد تماماً (أجهزة لياقة) في سوق مختلف تماماً. Amor خرجت من مجال الملابس لمجال مختلف = أعلى مخاطرة في Ansoff Matrix." , expW:{0:"Mass customization = تخصيص كل منتج حسب رغبة كل عميل", 1:"Niche marketing = تخصص في شريحة يتجاهلها المنافسون", 3:"Prospecting = البحث عن عملاء جدد محتملين", 4:"Product adaptation = تعديل المنتج ليناسب سوقاً جديداً"}  },
  { ch:"ch2", diff:"hard", q:"Sunny Brews is a coffeehouse chain based in Boston. It recently introduced Eva, a mild roast, which became immensely popular. This exemplifies ________.", opts:["benchmarking", "diversification", "mass customization", "product development", "downsizing"], ans:3, exp:"Product development = منتج جديد (Eva, نوع تحميص جديد) لنفس العملاء الحاليين (محبو القهوة). Sunny Brews أضافت منتجاً جديداً لقاعدة عملائها الحالية." , expW:{0:"Benchmarking = مقارنة أداء الشركة بالمنافسين", 1:"Diversification = منتجات جديدة في أسواق جديدة", 2:"Mass customization = تخصيص كل منتج حسب رغبة كل عميل", 4:"Downsizing = التخلص من منتجات أو أسواق ضعيفة"}  },
  { ch:"ch2", diff:"medium", q:"A women's apparel manufacturer in California recently acquired a Houston-based company that manufactures office furniture. This is an example of ________.", opts:["product development", "market development", "market penetration", "diversification", "product differentiation"], ans:3, past:true, exp:"Diversification = دخول منتج جديد تماماً (أثاث مكتبي) في سوق جديد تماماً. الأعلى مخاطرة في Ansoff matrix.", expW:{0:"Product development = منتج جديد في سوق حالي (نفس العملاء)",1:"Market development = نفس المنتج في سوق جديد",2:"Market penetration = نفس المنتج + نفس السوق",4:"Product differentiation = تمييز عن المنافسين"} },
  { ch:"ch2", diff:"medium", q:"Cleats, Unlimited developed a new style of soccer shoe. This is an example of ________.", opts:["product development", "market development", "market penetration", "diversification", "product differentiation"], ans:0, exp:"Product development = منتج جديد/معدّل (تصميم جديد) لنفس السوق الحالي (لاعبو كرة القدم). تطوير منتج للعملاء الحاليين = product development." , expW:{1:"نفس المنتج في أسواق جديدة", 2:"نفس المنتج + نفس السوق — زيادة مبيعات", 3:"منتجات جديدة في أسواق جديدة — أعلى مخاطرة", 4:"المنتج — ما تقدمه الشركة"}  },
  { ch:"ch2", diff:"medium", q:"Companies may want to downsize their business portfolios for all but which of the following reasons?", opts:["The firm may have grown too fast.", "The firm may have entered areas where it lacks experience.", "The customers may have purchased all they need.", "The market environment might change.", "The products might simply age."], ans:2, exp:"Downsizing = التخلص من منتجات/أعمال ضعيفة. يحدث بسبب: نمو سريع جداً، دخول مجالات بدون خبرة، تغير البيئة، تقادم المنتجات. أن يشتري العملاء كل ما يحتاجون ليس سبباً للتقليص." , expW:{0:"نمو سريع جداً = سبب حقيقي للتقليص (overcapacity)", 1:"دخول مجالات بدون خبرة = سبب حقيقي للتخلص منها", 3:"تغير البيئة = سبب حقيقي لإعادة تقييم المحفظة", 4:"تقادم المنتجات = سبب حقيقي للتخلص منها"}  },
  { ch:"ch2", diff:"medium", q:"Elmo Corp., a manufacturer of personal computers and printers, recently established an office furniture exporting business. This is an example of ________.", opts:["niche marketing", "local marketing", "diversification", "product adaptation", "downsizing"], ans:2, exp:"Diversification = منتج جديد تماماً (أثاث مكتبي) في سوق جديد تماماً. Elmo خرجت من الإلكترونيات للأثاث = diversification بمعناها الكامل." , expW:{0:"Niche marketing = تخصص في شريحة صغيرة يتجاهلها المنافسون", 1:"Local marketing = التسويق على مستوى حي أو مدينة", 3:"Product adaptation = تعديل المنتج ليناسب سوقاً جديداً", 4:"Downsizing = التخلص من أعمال أو منتجات ضعيفة"}  },
  { ch:"ch2", diff:"medium", q:"Fun-Spot's mission is ________.", opts:["product oriented", "technology oriented", "market oriented", "design oriented", "narrowly focused on profits"], ans:2, exp:"Mission statement الجيد = market-oriented: يتحدث عن ما يُقدمه للعميل (تجربة، ترفيه، متعة) لا عن منتج معين. Fun-Spot يُعرّف نفسه بالقيمة للعميل." , expW:{0:"Product-oriented = يصف منتجاً لا قيمة للعميل", 1:"Technology-oriented = يقود لـ marketing myopia (قصر النظر)", 3:"Design-oriented = ليس تصنيفاً معترفاً به لبيان المهمة", 4:"التركيز الضيق على الأرباح = مؤشر مالي لا غرض وجودي"}  },
  { ch:"ch2", diff:"medium", q:"Fun-Spot Fun Park represents a high-growth, high-share business. According to the BCG matrix, it can be classified as a ________.", opts:["star", "question mark", "bear", "cat", "dog"], ans:0, exp:"Stars في BCG = نمو عالٍ + حصة عالية. Fun-Spot يحقق نمواً سريعاً ويملك حصة سوقية كبيرة = Star. يحتاج استثمارات لكنه المستقبل الواعد." , expW:{1:"Question mark = نمو↑ حصة↓ — مستقبل غير مؤكد", 2:"Bear = غير موجود في BCG matrix", 3:"Cat = غير موجود في BCG matrix", 4:"Dog = نمو↓ حصة↓ — ضعيفة، يُفكَّر في التخلص منها"}  },
  { ch:"ch2", diff:"medium", q:"Ron and Gail plan to lower Fun-Spot's prices in an effort to encourage customers to stay longer, visit more often, and spend more money during each visit. What type of strategy are Ron and Gail planning?", opts:["market penetration", "market development", "product development", "product adaptation", "diversification"], ans:0, exp:"Market penetration = نفس المنتج + نفس السوق + زيادة المبيعات. تخفيض الأسعار لتشجيع نفس العملاء على الزيارة أكثر = market penetration." , expW:{1:"نفس المنتج في أسواق جديدة", 2:"منتجات جديدة للسوق الحالية", 3:"المنتج — ما تقدمه الشركة", 4:"منتجات جديدة في أسواق جديدة — أعلى مخاطرة"}  },
  { ch:"ch2", diff:"medium", q:"Ron and Gail, owners of Fun-Spot, strive to provide new offerings and entertainment options for their visitors. This type of strategy can be best described as ________.", opts:["market penetration", "market development", "product development", "niche marketing", "diversification"], ans:2, exp:"Product development = منتجات/عروض جديدة لنفس العملاء الحاليين. Fun-Spot يضيف خيارات ترفيه جديدة لزواره الحاليين = product development." , expW:{0:"نفس المنتج + نفس السوق — زيادة مبيعات", 1:"نفس المنتج في أسواق جديدة", 3:"تخصص في شريحة يتجاهلها المنافسون", 4:"منتجات جديدة في أسواق جديدة — أعلى مخاطرة"}  },
  { ch:"ch2", diff:"hard", q:"Marketing plays a key role in the company's strategic planning in all of these ways EXCEPT ________.", opts:["providing input to identify attractive market opportunities", "designing new products from scratch", "creating customer value and building profitable relationships with customer groups", "designing strategies for reaching a unit's objective", "providing a guiding philosophy"], ans:1, exp:"التسويق في التخطيط الاستراتيجي: يُحدد الفرص، يخلق القيمة، يبني العلاقات، يضع الاستراتيجيات، يُوجّه الفلسفة. أما تصميم منتجات جديدة من الصفر = مهمة R&D والهندسة." , expW:{0:"تحديد الفرص السوقية الجذابة = دور حقيقي للتسويق", 2:"خلق القيمة وبناء علاقات مربحة = دور حقيقي للتسويق", 3:"تصميم استراتيجيات الوحدات = دور حقيقي للتسويق", 4:"الفلسفة التوجيهية (customer-first) = دور حقيقي للتسويق"}  },
  { ch:"ch2", diff:"medium", q:"Each department in a company that carries out value-creating activities can be thought of as a link in the company's ________.", opts:["channel of intermediaries", "external value stream", "demand chain", "internal value chain", "supplier chain"], ans:3 , past:true, exp:"Internal value chain = سلسلة القيمة الداخلية. كل قسم (R&D, إنتاج, تسويق, مبيعات) = حلقة تُضيف قيمة. الفكرة: التنسيق الداخلي يخلق القيمة للعميل.", expW:{0:"Channel of intermediaries = وسطاء خارج الشركة (توزيع)",1:"External value stream = خارجي",2:"Demand chain = ما يريده العميل (منظور مختلف)",4:"Supplier chain = سلسلة الموردين (خارجية)"} },
  { ch:"ch2", diff:"medium", q:"RedFin manufactures diving equipment that is highly regarded by customers worldwide. Each department in RedFin contributes to its success and can be thought of as a(n) ________.", opts:["link in the company's internal value chain", "separate organization", "independent subsidiary of the company", "separate market segment", "SBU"], ans:0, exp:"Value chain = كل قسم في الشركة = حلقة في سلسلة القيمة الداخلية. من R&D إلى الإنتاج إلى التسويق إلى المبيعات — كل قسم يُضيف قيمة." , expW:{1:"Separate organization = كيان قانوني مستقل", 2:"Independent subsidiary = شركة تابعة مستقلة", 3:"Market segment = مجموعة تستجيب بنفس الطريقة للمزيج التسويقي", 4:"SBU = وحدة أعمال استراتيجية مستقلة داخل الشركة"}  },
  { ch:"ch2", diff:"medium", q:"The network made up of the company, its suppliers, its distributors, and, ultimately, its customers who partner with each other to improve the performance of the entire system is known as the ________.", opts:["business portfolio", "supply chain", "marketing mix", "value delivery network", "internal value chain"], ans:3 , past:true, exp:"Value delivery network = شبكة خارجية: الشركة + الموردين + الموزعين + العملاء. الجميع يتعاون لتقديم قيمة أفضل. مختلف عن سلسلة القيمة الداخلية.", expW:{0:"Business portfolio = مجموعة الأعمال",1:"Supply chain = الموردين فقط (بدون عملاء)",2:"Marketing mix = 4Ps",4:"Internal value chain = داخل الشركة فقط"} },
  { ch:"ch2", diff:"easy", q:"The marketing logic by which a company hopes to create customer value and achieve profitable customer relationships is referred to as the ________.", opts:["price", "marketing implementation", "value chain", "marketing strategy", "downsizing"], ans:3, exp:"Marketing strategy = المنطق التسويقي الذي تأمل الشركة من خلاله خلق قيمة للعملاء وبناء علاقات مربحة معهم. هي الكيف وليست التنفيذ." , expW:{0:"التسعير", 1:"تحويل الخطط إلى أفعال", 2:"سلسلة الأنشطة الداخلية التي تخلق قيمة", 4:"التخلص من منتجات أو أسواق ضعيفة"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following is an element of the marketing mix?", opts:["place", "education", "needs", "wants", "esteem"], ans:0, exp:"Marketing mix = 4Ps: Product, Price, Place, Promotion. Place = التوزيع. التعليم والاحتياجات والرغبات والتقدير ليست من الـ 4Ps." , expW:{1:"Education = تعليم، ليس من عناصر 4Ps", 2:"Needs = احتياجات (مفهوم تسويقي لكن ليس من 4Ps)", 3:"Wants = رغبات (مفهوم تسويقي لكن ليس من 4Ps)", 4:"Esteem = تقدير ذاتي (هرم Maslow، ليس 4Ps)"}  },
  { ch:"ch2", diff:"hard", q:"Which of the following is NOT part of a company's decision about which customers it will serve and how?", opts:["differentiation", "targeting", "budgeting", "segmentation", "positioning"], ans:2, exp:"قرارات خدمة العملاء = Segmentation + Targeting + Differentiation + Positioning (STP+D). الميزانية (Budgeting) = قرار مالي وليس قراراً تسويقياً لاختيار العملاء." , expW:{0:"تمييز العرض لخلق قيمة فائقة", 1:"اختيار الشريحة المستهدفة", 3:"تقسيم السوق", 4:"تحديد مكانة المنتج في أذهان العملاء"}  },
  { ch:"ch2", diff:"hard", q:"Which of the following is NOT an element of the marketing mix?", opts:["place", "purchase", "product", "price", "promotion"], ans:1, exp:"الـ 4Ps = Product, Price, Place, Promotion. Purchase (الشراء) ليس أحد الـ 4Ps، هو نتيجة وليس عنصراً في المزيج التسويقي." , expW:{0:"التوزيع — جعل المنتج متاحاً", 2:"المنتج — ما تقدمه الشركة", 3:"التسعير", 4:"الترويج والإعلان"}  },
  { ch:"ch2", diff:"hard", q:"Customers can be grouped and served in various ways based on several factors. These include all of the following EXCEPT ________ factors.", opts:["psychographic", "behavioral", "technological", "demographic", "geographic"], ans:2, exp:"أسس تقسيم السوق = ديموغرافية + جغرافية + نفسية + سلوكية. العوامل التكنولوجية ليست أساساً معترفاً به لتقسيم العملاء في التسويق." , expW:{0:"Psychographic = نفسية (شخصية، قيم، أسلوب حياة) — أساس معترف به", 1:"Behavioral = سلوكية (استخدام المنتج، الولاء) — أساس معترف به", 3:"Demographic = ديموغرافية (العمر، الجنس، الدخل) — أساس معترف به", 4:"Geographic = جغرافية (المنطقة، الدولة) — أساس معترف به"}  },
  { ch:"ch2", diff:"medium", q:"Market segmentation can be best described as the process of ________.", opts:["assigning specific human attributes to a given brand", "dividing a market into distinct groups of buyers who have different needs, characteristics, or behaviors, and who might require separate marketing programs", "evaluating each market segment's attractiveness and selecting one or more segments to enter", "turning marketing plans into marketing actions to accomplish strategic marketing objectives", "maintaining a strategic fit between organizational goals and changing marketing opportunities"], ans:1 , past:true, exp:"Market segmentation = تقسيم السوق لمجموعات مشترين لديهم احتياجات/سمات/سلوكيات مختلفة، وكل مجموعة تحتاج برنامج تسويقي منفصل.", expW:{0:"هذا brand personality (إسناد صفات إنسانية للعلامة)",2:"هذا Market targeting (اختيار الشريحة)",3:"هذا Marketing implementation",4:"هذا Strategic planning"} },
  { ch:"ch2", diff:"medium", q:"Teenagers are expected to respond in a similar way to a set of marketing efforts. In other words, this group represents a ________.", opts:["channel intermediary", "line extension", "market segment", "product attribute", "brand personality"], ans:2 , past:true, exp:"Market segment = مجموعة عملاء يستجيبون بنفس الطريقة لجهود التسويق. المراهقون مثال على شريحة ديموغرافية.", expW:{0:"Channel intermediary = وسيط توزيع",1:"Line extension = توسع في خط المنتجات",3:"Product attribute = خاصية منتج",4:"Brand personality = شخصية العلامة التجارية"} },
  { ch:"ch2", diff:"medium", q:"Each company must divide up the total market, choose the best segments, and design strategies for profitably serving chosen segments. This process involves market segmentation, ________, differentiation, and positioning.", opts:["market targeting", "marketing implementation", "supply-chain analysis", "price discrimination", "market diversification"], ans:0, exp:"العملية الكاملة = Segmentation (تقسيم) → Targeting (اختيار شريحة) → Differentiation (تمييز) → Positioning (تحديد المكانة)." , expW:{1:"Marketing implementation = تحويل الخطط إلى أفعال", 2:"Supply-chain analysis = تحليل سلسلة التوريد (ليس من مراحل STP)", 3:"Price discrimination = التمييز السعري (ليس من مراحل STP)", 4:"Market diversification = منتجات وأسواق جديدة (Ansoff)"}  },
  { ch:"ch2", diff:"easy", q:"Which of the following refers to the process of dividing a market into distinct groups of buyers with different needs, characteristics, or behaviors?", opts:["market diversification", "market segmentation", "downsizing", "customer relationship management", "prospecting"], ans:1, exp:"Market segmentation = تقسيم السوق لمجموعات متمايزة من المشترين ذوي احتياجات/خصائص/سلوكيات مختلفة. هذا هو التعريف الدقيق للمصطلح." , expW:{0:"Market diversification = منتجات وأسواق جديدة (ليس تقسيماً)", 2:"Downsizing = التخلص من منتجات أو أسواق ضعيفة", 3:"CRM = إدارة علاقات العملاء، ليست تقسيم السوق", 4:"Prospecting = البحث عن عملاء جدد محتملين"}  },
  { ch:"ch2", diff:"medium", q:"Rob has been asked by his manager to identify a group of potential customers who would respond in a similar way to a given set of marketing efforts. In this instance, Rob has been asked to identify a ________.", opts:["new product", "market segment", "marketing intermediary", "brand", "product line"], ans:1, exp:"Market segment = مجموعة عملاء يستجيبون بنفس الطريقة لجهود التسويق. Rob يبحث عن شريحة سوق لا عن منتج أو علامة تجارية." , expW:{0:"New product = منتج جديد (ليس مجموعة عملاء)", 2:"Marketing intermediary = وسيط يساعد في توزيع المنتج", 3:"Brand = العلامة التجارية (ليست مجموعة عملاء)", 4:"Product line = خط المنتجات (ليس مجموعة عملاء)"}  },
  { ch:"ch2", diff:"easy", q:"The process of evaluating each market segment's attractiveness and selecting one or more segments to enter is known as ________.", opts:["market segmentation", "diversification", "market targeting", "prospecting", "downsizing"], ans:2, exp:"Market targeting = تقييم جاذبية كل شريحة واختيار الشرائح التي ستدخلها الشركة. هو الخطوة الثانية بعد Segmentation في عملية STP." , expW:{0:"Market segmentation = تقسيم السوق (الخطوة قبل targeting)", 1:"Diversification = منتجات جديدة في أسواق جديدة", 3:"Prospecting = البحث عن عملاء جدد محتملين", 4:"Downsizing = التخلص من منتجات أو أسواق ضعيفة"}  },
  { ch:"ch2", diff:"hard", q:"Paul Robinson has identified a group of potential customers who seem to respond in a similar way to a series of magazine and radio advertisements for his company's product. Paul has identified a ________.", opts:["target market", "market segment", "niche market", "product attribute", "product design"], ans:1, exp:"Market segment = مجموعة عملاء يستجيبون بنفس الطريقة لجهود تسويقية محددة. Paul وجد شريحة (ليس السوق المستهدف بأكمله ولا متخصصة صغيرة)." , expW:{0:"اختيار الشريحة المستهدفة", 2:"تخصص في شريحة يتجاهلها المنافسون", 3:"المنتج — ما تقدمه الشركة", 4:"المنتج — ما تقدمه الشركة"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following is true with regard to a market segment?", opts:["A market segment consists of consumers with dissimilar needs and preferences.", "A market segment consists of consumers who respond in a similar way to a given set of marketing efforts.", "Very few markets have segments.", "Dividing the market into segments decreases the efficiency of the selling process.", "Dividing the market into segments reduces composite demand."], ans:1, past:true, exp:"تعريف Market segment = مجموعة عملاء يستجيبون بنفس الطريقة. أساس التسويق المستهدف: اعرف شريحتك أولاً.", expW:{0:"الشريحة تجمع عملاء متشابهين (ليس مختلفين)",2:"معظم الأسواق لديها شرائح متعددة",3:"التقسيم يرفع الكفاءة لأنه يركّز الجهد",4:"التقسيم لا يقلل الطلب"} },
  { ch:"ch2", diff:"easy", q:"The process of arranging for a product to occupy a clear, distinctive, and desirable place relative to competing products in the minds of target consumers is known as ________.", opts:["market segmentation", "differentiation", "target marketing", "market targeting", "positioning"], ans:4, exp:"Positioning = ترتيب المنتج ليحتل مكانة واضحة ومميزة ومرغوبة في أذهان العملاء المستهدفين مقارنةً بالمنافسين. هو الخطوة الأخيرة في STP." , expW:{0:"مجموعة تستجيب بنفس الطريقة للمزيج التسويقي", 1:"تمييز العرض لخلق قيمة فائقة", 2:"اختيار الشريحة المستهدفة", 3:"اختيار الشريحة المستهدفة"}  },
  { ch:"ch2", diff:"medium", q:"Crocus, a gift store, specializes in serving customer segments that major competitors overlook and ignore. Which of the following best describes Crocus?", opts:["market follower", "market challenger", "early adopter", "market nicher", "laggard"], ans:3, exp:"Market nicher = شركة تتخصص في خدمة شرائح صغيرة يتجاهلها المنافسون الكبار. Crocus تخدم شرائح مهملة = استراتيجية التخصص." , expW:{0:"Market follower = يتبع قائد السوق بدون تحديه", 1:"Market challenger = يتحدى قائد السوق مباشرة", 2:"Early adopter = أول من يتبنى المنتج الجديد", 4:"Laggard = آخر من يتبنى المنتج الجديد"}  },
  { ch:"ch2", diff:"medium", q:"Arrow is \"a different kind of company, manufacturing a different kind of a car\"; the RoadPro is \"like nothing else.\" Statements such as these reflect a firm's ________.", opts:["portfolio", "marketing segment", "positioning", "marketing mix", "mission statement"], ans:2, exp:"Positioning = رسائل تحدد مكانة المنتج في ذهن العميل. جمل مثل نوع مختلف من السيارة = تموضع يميز المنتج عن المنافسين." , expW:{0:"محفظة الأعمال", 1:"تقسيم السوق", 3:"product, price, place, promotion", 4:"تعريف الشركة: ماذا تفعل، لمن، ولماذا"}  },
  { ch:"ch2", diff:"hard", q:"Alpha Motors offers \"Green automobiles for a greener world.\" This refers to the ________ of Alpha automobiles.", opts:["brand resonance", "position", "brand equity", "pleasure value", "added value"], ans:1 , past:true, exp:"Position = المكانة في ذهن العميل. 'سيارات خضراء لعالم أخضر' = رسالة واضحة تحدد مكانة Alpha في ذهن المستهلك البيئي.", expW:{0:"Brand resonance = مستوى التواصل العميق مع العلامة",2:"Brand equity = قيمة العلامة التجارية",3:"Pleasure value = قيمة المتعة",4:"Added value = قيمة مضافة"} },
  { ch:"ch2", diff:"easy", q:"Arranging for a product to occupy a clear, distinctive, and desirable place relative to competing products in the minds of target consumers is known as ________.", opts:["positioning", "segmenting", "diversifying", "prospecting", "satisficing"], ans:0, exp:"Positioning = ترتيب المنتج ليشغل مكانة واضحة ومميزة ومرغوبة في ذهن العميل المستهدف مقارنةً بالمنافسين." , expW:{1:"Segmenting = تقسيم السوق (الخطوة الأولى قبل positioning)", 2:"Diversifying = منتجات جديدة في أسواق جديدة (Ansoff)", 3:"Prospecting = البحث عن عملاء جدد محتملين", 4:"Satisficing = اتخاذ قرار مقبول لا مثالي"}  },
  { ch:"ch2", diff:"medium", q:"Effective positioning begins with ________.", opts:["pricing", "diversification", "differentiation", "promotion", "segmentation"], ans:2, exp:"Positioning الفعّال يبدأ بالـ Differentiation = تمييز عرض الشركة لخلق قيمة فائقة للعميل. لا يمكن تموضع منتج قبل تمييزه عن المنافسين." , expW:{0:"Pricing = يؤثر في التموضع لكن لا يبدأ به", 1:"Diversification = منتجات جديدة في أسواق جديدة (Ansoff)", 3:"Promotion = الترويج والإعلان (4Ps)", 4:"Segmentation = تقسيم السوق (يسبق positioning)"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following Ps in the marketing mix describes the goods-and-services combination the company offers to the target market?", opts:["price", "promotion", "product", "place", "package"], ans:2, exp:"Product في الـ 4Ps = مزيج السلع والخدمات الذي تقدمه الشركة للسوق المستهدف. هو 'ماذا تبيع' في المزيج التسويقي." , expW:{0:"Price = التسعير، ليس وصف المنتج", 1:"Promotion = الترويج والإعلان", 3:"Place = التوزيع — جعل المنتج متاحاً", 4:"Package = تغليف (ليس أحد الـ 4Ps)"}  },
  { ch:"ch2", diff:"medium", q:"In the marketing mix, design, packaging, services, and variety can be categorized under ________.", opts:["product", "price", "promotion", "place", "position"], ans:0, exp:"Product في الـ 4Ps يشمل التصميم والتغليف والخدمات والتنوع." , expW:{1:"التسعير", 2:"الترويج والإعلان", 3:"التوزيع — جعل المنتج متاحاً", 4:"تحديد المكانة الذهنية"}  },
  { ch:"ch2", diff:"medium", q:"In the context of a company's marketing mix, ________ includes company activities that make the product available to target consumers.", opts:["position", "place", "price", "promotion", "branding"], ans:1, exp:"Place في الـ 4Ps = الأنشطة التي تجعل المنتج متاحاً للعملاء المستهدفين. يشمل قنوات التوزيع واللوجستيات." , expW:{0:"Position = تحديد المكانة الذهنية، ليس التوزيع", 2:"Price = التسعير", 3:"Promotion = الترويج والإعلان", 4:"Branding = تطوير العلامة التجارية (ليس P)"}  },
  { ch:"ch2", diff:"medium", q:"In the marketing mix, place includes ________.", opts:["logistics", "discounts", "sales promotion", "advertising", "packaging"], ans:0, exp:"Place يشمل اللوجستيات. الخصومات = Price. الترويج والإعلان = Promotion. التغليف = Product." , expW:{1:"Discounts = خصومات (ضمن Price)", 2:"Sales promotion = الترويج (ضمن Promotion)", 3:"Advertising = إعلان (ضمن Promotion)", 4:"Packaging = التغليف (ضمن Product)"}  },
  { ch:"ch2", diff:"easy", q:"________ refers to activities that communicate the merits of the product and persuade target customers to buy it.", opts:["Position", "Promotion", "Pricing", "Segmentation", "Prospecting"], ans:1, exp:"Promotion = أنشطة توصيل مزايا المنتج وإقناع العملاء المستهدفين بالشراء. يشمل الإعلان والترويج والبيع الشخصي والعلاقات العامة." , expW:{0:"Position = تحديد المكانة الذهنية (ليس نشاط ترويجي)", 2:"Pricing = التسعير (P آخر في المزيج)", 3:"Segmentation = تقسيم السوق (ليس ترويجاً)", 4:"Prospecting = البحث عن عملاء جدد محتملين"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following would be classified as an opportunity in a SWOT analysis of Fun- Spot?", opts:["A rival amusement park announces plans to open three new rides next season.", "A new luxury hotel is being constructed in the area, with the aim of attracting more high- spending families on vacation.", "Ron and Gail have paid off the mortgage on Fun-Spot, significantly reducing their monthly expenses.", "Fun-Spot employees tend to be enthusiastic and young, projecting an image of fun and vitality.", "Fun-Spot plans to further diversify its offerings by beginning a two-week summer camp for elementary school students."], ans:1, exp:"Opportunities في SWOT = فرص خارجية. الفندق الجديد يجلب عائلات غنية للمنطقة = فرصة." , expW:{0:"Threat = خطر خارجي (المنافس الجديد يهدد Fun-Spot)", 2:"Strength = قدرة داخلية (دفع الرهن يقلل التكاليف)", 3:"Strength = قدرة داخلية (موظفون متحمسون)", 4:"هذا قرار diversification، ليس تصنيفاً SWOT"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following is true with regard to a SWOT analysis?", opts:["It classifies SBUs into four distinct categories.", "It measures customer response to a new product.", "It evaluates the company's overall strengths.", "It evaluates the growth potential of a market segment.", "It ignores the threats faced by a company while assessing its situation in the market."], ans:2, exp:"SWOT تقيّم نقاط القوة الشاملة للشركة. لا تصنف SBUs ولا تقيس استجابة العملاء." , expW:{0:"تصنيف SBUs = BCG matrix وليس SWOT", 1:"قياس استجابة العملاء = Marketing research", 3:"تقييم نمو الشريحة = تحليل السوق (ليس SWOT)", 4:"SWOT يُحدد التهديدات ولا يتجاهلها"}  },
  { ch:"ch2", diff:"medium", q:"________ analysis is an overall evaluation of the company's strengths, weaknesses, opportunities, and threats.", opts:["Porter's five forces", "A breakeven", "A regression", "A SWOT", "A cluster"], ans:3, exp:"SWOT = Strengths + Weaknesses + Opportunities + Threats. هو التحليل الشامل للشركة من الداخل (قوة/ضعف) والخارج (فرص/تهديدات)." , expW:{0:"Porter's five forces = تحليل تنافسية الصناعة، ليس SWOT", 1:"Breakeven = نقطة التعادل (لا ربح ولا خسارة)", 2:"Regression = أداة إحصائية، ليست تحليلاً شاملاً للشركة", 4:"Cluster = تجميع إحصائي، ليس تحليلاً شاملاً"}  },
  { ch:"ch2", diff:"medium", q:"In a SWOT analysis, which of the following would be considered a strength?", opts:["industry trends", "technological shifts", "environmental demands", "performance challenges", "internal capabilities"], ans:4, exp:"Strengths = القدرات الداخلية للشركة. Internal capabilities = نقاط قوة داخلية. اتجاهات الصناعة والتحولات التكنولوجية = خارجية (فرص أو تهديدات)." , expW:{0:"Industry trends = خارجية (فرص أو تهديدات، ليست strengths)", 1:"Technological shifts = خارجية (فرص أو تهديدات)", 2:"Environmental demands = خارجية (تهديدات)", 3:"Performance challenges = ضعف داخلي (Weaknesses)"}  },
  { ch:"ch2", diff:"medium", q:"In a SWOT analysis, ________ include favorable trends in the external environment.", opts:["strengths", "challenges", "weaknesses", "opportunities", "threats"], ans:3, exp:"الفرص Opportunities = الاتجاهات الخارجية المواتية في البيئة." , expW:{0:"Strengths = نقاط قوة داخلية (ليست اتجاهات خارجية مواتية)", 1:"Challenges = ليس من عناصر SWOT الأربعة المعتمدة", 2:"Weaknesses = نقاط ضعف داخلية (ليست اتجاهات خارجية)", 4:"Threats = اتجاهات خارجية غير مواتية (ليست مواتية)"}  },
  { ch:"ch2", diff:"hard", q:"Harris Brown, the marketing manager at a small retail chain, wants to assess his firm's strengths, opportunities, weaknesses, and threats. Which of the following would be best suited for his purpose?", opts:["SWOT analysis", "cluster analysis", "portfolio analysis", "regression analysis", "Porter's five forces analysis"], ans:0, exp:"SWOT analysis = الأداة المخصصة لتقييم Strengths + Weaknesses + Opportunities + Threats. هذا بالضبط ما يحتاجه Harris." , expW:{1:"تجميع إحصائي", 2:"تقييم جاذبية وحدات الأعمال", 3:"أداة إحصائية لا علاقة لها بالتخطيط", 4:"تحليل تنافسية الصناعة — ليس SWOT"}  },
  { ch:"ch2", diff:"hard", q:"Which of the following functions is NOT part of managing the marketing process?", opts:["planning", "control", "budgeting", "implementation", "organization"], ans:2, exp:"وظائف إدارة التسويق = التخطيط + التنظيم + التنفيذ + التحكم. الميزانية نشاط ضمن التخطيط وليست وظيفة إدارية مستقلة." , expW:{0:"Planning = التخطيط الاستراتيجي (وظيفة إدارية حقيقية)", 1:"Control = قياس ومراقبة الأداء (وظيفة إدارية حقيقية)", 3:"Implementation = تنفيذ الخطط (وظيفة إدارية حقيقية)", 4:"Organization = التنظيم الهيكلي (وظيفة إدارية حقيقية)"}  },
  { ch:"ch2", diff:"medium", q:"________ provides a complete analysis of the company's situation.", opts:["A SWOT analysis", "A marketing audit", "Regression analysis", "Return on marketing investment", "Marketing budget evaluation"], ans:0, exp:"SWOT analysis = التحليل الشامل لوضع الشركة: داخلياً (قوة/ضعف) وخارجياً (فرص/تهديدات)." , expW:{1:"Marketing audit = مراجعة شاملة للأنشطة (جزء من التحليل)", 2:"Regression = أداة إحصائية، ليست تحليلاً للوضع الكلي", 3:"ROI = يقيس العائد المالي فقط (ليس التحليل الشامل)", 4:"Budget evaluation = تقييم الميزانية (ليس تحليلاً للوضع)"}  },
  { ch:"ch2", diff:"medium", q:"Marketing ________ addresses the what and why of marketing activities, while marketing ________ addresses the who, where, when, and how.", opts:["analysis; planning", "planning; implementation", "implementation; planning", "organization; implementation", "control; planning"], ans:1, exp:"Planning = ماذا ولماذا (استراتيجية). Implementation = من وأين ومتى وكيف (التنفيذ الفعلي). هذا الترتيب المنطقي: خطط أولاً ثم نفّذ." , expW:{0:"التخطيط الاستراتيجي", 2:"التخطيط الاستراتيجي", 3:"تنفيذ الخطط", 4:"التخطيط الاستراتيجي"}  },
  { ch:"ch2", diff:"hard", q:"Omega Inc. makes lightweight sunglasses with 100-percent UV protection for people who love to hunt, hike, and ride bikes. The company's long-term plans include the development of lenses that, in addition to protecting users from UV rays, would help reduce lens spotting through effective water-sheeting methods. This new feature would be valuable to people who fish. Given the rising popularity of recreational fishing in the United States, Omega products clearly have a huge market potential. In terms of a SWOT analysis, Omega has recognized a market ________.", opts:["weakness", "strength", "threat", "opportunity", "challenge"], ans:3, exp:"ازدياد شعبية صيد السمك + ميزة المنتج الجديدة = Opportunity. الفرصة هي اتجاه خارجي إيجابي يمكن الاستفادة منه." , expW:{0:"Weakness = نقاط ضعف داخلية (ليست فرصة خارجية)", 1:"Strength = نقاط قوة داخلية (ليست فرصة خارجية)", 2:"Threat = اتجاه خارجي سلبي (ليس إيجابياً)", 4:"Challenge = ليس من عناصر SWOT الأربعة"}  },
  { ch:"ch2", diff:"medium", q:"The main section of the marketing plan most likely presents a detailed ________ analysis of the current marketing situation.", opts:["breakeven", "SBU", "SWOT", "regression", "cluster"], ans:2, exp:"القسم الرئيسي من خطة التسويق يعرض تحليل SWOT تفصيلياً للوضع التسويقي الحالي." , expW:{0:"Breakeven = نقطة التعادل — لا ربح ولا خسارة", 1:"SBU = وحدة أعمال استراتيجية (ليس تحليلاً للخطة)", 3:"Regression = أداة إحصائية، ليست جزءاً من خطة التسويق", 4:"Cluster = تحليل إحصائي للتجميع"}  },
  { ch:"ch2", diff:"medium", q:"A marketing plan begins with a(n) ________, which presents a brief summary of the main goals and recommendations of the plan for management review.", opts:["budget", "opportunity analysis", "threat analysis", "executive summary", "action program"], ans:3, exp:"خطة التسويق تبدأ بـ Executive summary = ملخص تنفيذي للأهداف والتوصيات الرئيسية." , expW:{0:"Budget = الميزانية (ليست مقدمة الخطة)", 1:"Opportunity analysis = تحليل الفرص (قسم داخل الخطة، ليس البداية)", 2:"Threat analysis = تحليل التهديدات (ليس البداية)", 4:"Action program = برنامج العمل (يأتي بعد المقدمة)"}  },
  { ch:"ch2", diff:"medium", q:"Many managers think that \"doing things right,\" or ________, is as important as, or even more important than, \"doing the right things.\"", opts:["strategy", "planning", "positioning", "implementation", "targeting"], ans:3, exp:"Implementation = التنفيذ = عمل الأشياء بطريقة صحيحة. Strategy/Planning = اختيار الأشياء الصحيحة. الاثنان ضروريان للنجاح." , expW:{0:"Strategy = اختيار الأشياء الصحيحة (doing the right things)", 1:"Planning = التخطيط لما ستفعله (ليس الكيفية)", 2:"Positioning = تحديد مكانة المنتج في أذهان العملاء", 4:"Targeting = اختيار الشريحة المستهدفة"}  },
  { ch:"ch2", diff:"medium", q:"The most common form of marketing organization is the ________ organization. Under this organization, an operational specialist heads different marketing activities.", opts:["geographic", "product management", "functional", "customer management", "market"], ans:2, exp:"Functional organization = أكثر أشكال التنظيم التسويقي شيوعاً. كل متخصص وظيفي يرأس نشاطاً تسويقياً مختلفاً (إعلان، بحث سوقي، مبيعات...)." , expW:{0:"Geographic = تنظيم بحسب مناطق جغرافية", 1:"Product management = تنظيم حول خطوط المنتجات", 3:"Customer management = تركيز على شرائح العملاء", 4:"Market = تنظيم حول شرائح السوق"}  },
  { ch:"ch2", diff:"hard", q:"Berman Electronics, a chain of appliance stores in North America, caters to a wide range of customers. It has a marketing organization in which different operational specialists head different marketing activities. Berman Electronics is a(n) ________.", opts:["customer management organization", "niche marketer", "early adopter", "functional organization", "laggard"], ans:3, exp:"Functional organization = متخصصون مختلفون يرأسون أنشطة تسويقية مختلفة. هذا بالضبط هيكل Berman Electronics." , expW:{0:"Customer management = تنظيم حول احتياجات شرائح العملاء", 1:"Niche marketer = تخصص في شريحة يتجاهلها المنافسون", 2:"Early adopter = أول من يتبنى المنتج الجديد", 4:"Laggard = آخر من يتبنى المنتج الجديد"}  },
  { ch:"ch2", diff:"medium", q:"________ refer(s) to meaningful sets of marketing performance measures in a single display used to monitor strategic marketing performance.", opts:["Field automation systems", "Market segments", "Market share", "Marketing dashboards", "Line extensions"], ans:3, exp:"Marketing dashboards لوحات معلومات لمراقبة الاداء التسويقي الاستراتيجي." , expW:{0:"Field automation = أنظمة أتمتة المبيعات الميدانية", 1:"Market segments = شرائح السوق (ليست لوحات أداء)", 2:"Market share = الحصة السوقية (مقياس واحد فقط)", 4:"Line extensions = توسع في خط المنتجات"}  },
  { ch:"ch2", diff:"hard", q:"Emerson Studios has designed its marketing organization along the lines of a ________ organization in which operational specialists head different marketing activities.", opts:["geographic", "product", "functional", "customer", "market"], ans:2, exp:"Functional org = متخصصون مختلفون يرأسون انشطة تسويقية مختلفة." , expW:{0:"Geographic = تنظيم بحسب مناطق جغرافية", 1:"Product = تنظيم حول خطوط المنتجات", 3:"Customer = تنظيم حول احتياجات شرائح العملاء", 4:"Market = تنظيم حول شرائح السوق"}  },
  { ch:"ch2", diff:"hard", q:"Ravenshaw Corp. assigns its sales and marketing people to specific countries, regions, and districts. Ravenshaw Corp. is most likely an example of a ________.", opts:["geographic organization", "product organization", "functional organization", "niche marketer", "mass marketer"], ans:0, exp:"Geographic organization = تنظيم جغرافي حيث يُعيّن موظفو المبيعات لدول ومناطق ومقاطعات محددة." , expW:{1:"Product organization = تنظيم حول خطوط المنتجات", 2:"Functional organization = الأكثر شيوعاً (متخصصون يرأسون الأنشطة)", 3:"Niche marketer = تخصص في شريحة يتجاهلها المنافسون", 4:"Mass marketer = يستهدف الجميع بنفس الرسالة"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following is true with regard to geographic organization?", opts:["It is the most common form of marketing organization.", "Different marketing activities are headed by a functional specialist.", "It requires salespeople to have international experience.", "It reduces the overall efficiency of salespeople.", "It allows salespeople to work with a minimum of travel time and cost."], ans:4, exp:"Geographic organization = تعيين موظفي المبيعات لمناطق جغرافية محددة. ميزتها الرئيسية: توفير وقت التنقل والتكاليف لأن كل مندوب يعمل في منطقته." , expW:{0:"Most common = Functional organization، ليس Geographic", 1:"Functional specialist = يصف الـ Functional org لا Geographic", 2:"International experience = ليس شرطاً في التنظيم الجغرافي", 3:"Reduces efficiency = العكس، التنظيم الجغرافي يرفع الكفاءة"}  },
  { ch:"ch2", diff:"medium", q:"Which of the following is a major advantage of the market organization?", opts:["The company is organized around the needs of specific customer segments.", "The company exploits bleeding-edge technologies to keep ahead in the market.", "The company has a flat organizational structure.", "The company allows its salespeople to settle into a specific territory.", "The company caters to a single, small market segment."], ans:0, exp:"Market organization ميزتها = تنظيم الشركة حول احتياجات شرائح العملاء المحددة." , expW:{1:"Bleeding-edge tech = ليس مزية market organization", 2:"Flat structure = ليس ميزة خاصة بـ market organization", 3:"Specific territory = ميزة Geographic organization", 4:"Single small segment = Niche marketing (ليس market org)"}  },
  { ch:"ch2", diff:"medium", q:"More and more, companies are shifting their brand management focus from brand profitability toward ________.", opts:["technology management", "product management", "customer management", "functional management", "geographic management"], ans:2, exp:"الشركات تتحول من ادارة العلامة نحو customer management = ادارة العميل." , expW:{0:"Technology management = إدارة التكنولوجيا (ليس تحول brand)", 1:"Product management = إدارة المنتجات (النهج التقليدي)", 3:"Functional management = الإدارة الوظيفية", 4:"Geographic management = الإدارة الجغرافية"}  },
  { ch:"ch2", diff:"medium", q:"________ refers to measuring and evaluating the results of marketing strategies and plans and taking corrective action to ensure that the objectives are achieved.", opts:["Marketing control", "Marketing implementation", "Satisficing", "Prospecting", "Benchmarking"], ans:0, past:true, exp:"Marketing control = قياس + تقييم النتائج + الإجراء التصحيحي. هو المرحلة الأخيرة في عملية التخطيط التسويقي.", expW:{1:"Marketing implementation = التنفيذ (قبل التحكم)",2:"Satisficing = قبول نتائج جيدة بدل الأمثل",3:"Prospecting = البحث عن عملاء جدد",4:"Benchmarking = مقارنة الأداء بالمنافسين"} },
  { ch:"ch2", diff:"hard", q:"Marketing control involves four steps including all the following EXCEPT ________.", opts:["setting specific marketing goals", "measuring the marketing plan's performance in the marketplace", "evaluating the causes of any differences between expected and actual performance", "increasing the staffing in the planning department", "taking corrective action to close the gaps between goals and performance"], ans:3, past:true, exp:"خطوات Marketing Control الأربع: 1)تحديد أهداف 2)قياس الأداء 3)تقييم الفجوات 4)الإجراء التصحيحي. زيادة الموظفين ليست خطوة في هذه العملية.", expW:{0:"خطوة 1: تحديد الأهداف ✓",1:"خطوة 2: قياس الأداء ✓",2:"خطوة 3: تقييم الأسباب ✓",4:"خطوة 4: الإجراء التصحيحي ✓"} },
  { ch:"ch2", diff:"hard", q:"All of the following steps pertain to the marketing control process EXCEPT ________.", opts:["setting goals", "measuring performance", "taking corrective action", "defining the company's mission", "evaluating the causes of gaps between expected and actual performance"], ans:3, exp:"خطوات Marketing Control = تحديد الأهداف + قياس الأداء + اتخاذ الإجراء التصحيحي + تقييم الفجوات. تعريف مهمة الشركة = خطوة في التخطيط الاستراتيجي وليس في التحكم." , expW:{0:"Setting goals = خطوة 1 في Marketing Control ✓", 1:"Measuring performance = خطوة 2 في Marketing Control ✓", 2:"Taking corrective action = خطوة 4 في Marketing Control ✓", 4:"Evaluating causes of gaps = خطوة 3 في Marketing Control ✓"}  },
  { ch:"ch2", diff:"medium", q:"The purpose of ________ is to ensure that the company achieves the sales, profits, and other goals set out in its annual marketing plan.", opts:["benchmarking", "operating control", "strategic control", "SWOT analysis", "a marketing audit"], ans:1, exp:"Operating control = التحكم التشغيلي: يضمن تحقيق الشركة للمبيعات والأرباح والأهداف المحددة في الخطة التسويقية السنوية. مقارنة الأداء الفعلي بالخطة." , expW:{0:"مقارنة أداء الشركة بالمنافسين", 2:"تقييم الاستراتيجية الكلية للشركة", 3:"تحليل القوى والضعف والفرص والتهديدات", 4:"مراجعة شاملة للأنشطة التسويقية"}  },
  { ch:"ch2", diff:"medium", q:"________ involves looking at whether a company's key action plans are well-matched to its opportunities.", opts:["Operating control", "Benchmarking", "Strategic control", "Regression analysis", "Portfolio analysis"], ans:2, exp:"Strategic control = التحكم الاستراتيجي: تقييم مدى توافق خطط الشركة مع فرصها. أشمل من Operating control لأنه يفحص الاستراتيجية الكلية." , expW:{0:"مقارنة الأداء الفعلي بالخطة السنوية", 1:"مقارنة أداء الشركة بالمنافسين", 3:"أداة إحصائية لا علاقة لها بالتخطيط", 4:"تقييم جاذبية وحدات الأعمال"}  },
  { ch:"ch2", diff:"medium", q:"________ measures the profits generated by investments in marketing activities.", opts:["A SWOT analysis", "A marketing audit", "Regression analysis", "Return on marketing investment", "Marketing budget evaluation"], ans:3, exp:"Return on marketing investment (Marketing ROI) = يقيس الأرباح الناتجة عن الاستثمارات التسويقية. صافي العائد التسويقي ÷ تكلفة الاستثمار التسويقي." , expW:{0:"SWOT = تحليل القوى والضعف والفرص والتهديدات", 1:"Marketing audit = مراجعة شاملة للأنشطة التسويقية", 2:"Regression = أداة إحصائية لا علاقة لها بقياس عائد الاستثمار", 4:"Marketing budget evaluation = تقييم الميزانية (ليس قياس العائد)"}  },

  { ch:"ch2", diff:"medium", q:"In the growth-share matrix, Stars products:", opts:["Generate enough cash to maintain themselves but do not promise to be large sources of cash", "Require less investment to maintain market share", "Require a lot of cash to hold their share", "Need to be divested at the earliest", "Require heavy investment to finance rapid growth"], ans:4, past:true, exp:"Stars = نمو عالٍ + حصة عالية. النمو السريع يعني منافسة شديدة → تحتاج استثماراً ثقيلاً للحفاظ على مكانتها. مع تباطؤ النمو تصبح Cash Cow.", expW:{0:"هذا وصف Dogs",1:"هذا وصف Cash Cows",2:"هذا وصف Question Marks",3:"Divest = للـ Dogs، ليس Stars"} },
  { ch:"ch2", diff:"hard", q:"In the BCG matrix, which unit requires the MOST strategic attention due to its uncertain future?", opts:["Stars","Cash Cows","Dogs","Question Marks","SBUs with medium share"], ans:3, exp:"Question Marks = حصة منخفضة في سوق عالي النمو. مستقبلها غير واضح — قد تصبح Stars أو تتحول لـ Dogs. تحتاج قرارات استراتيجية صعبة.", expW:{0:"Stars = مستقبل واعد تحتاج استثمار",1:"Cash Cows = مستقبل مستقر تولّد نقداً",2:"Dogs = مستقبل ضعيف لكن قرارها أوضح",4:"Medium share = ليست فئة BCG"} },
  { ch:"ch2", diff:"hard", q:"All of the following are steps in the strategic planning process EXCEPT ___.", opts:["Defining the company mission","Setting company objectives and goals","Designing the business portfolio","Conducting employee performance reviews","Planning marketing and other functional strategies"], ans:3, exp:"خطوات Strategic planning: (1) تحديد الرسالة، (2) وضع الأهداف، (3) تصميم المحفظة، (4) تخطيط الاستراتيجيات الوظيفية. مراجعات الأداء الوظيفي = HR وليست جزءاً من التخطيط الاستراتيجي.", expW:{0:"Defining mission = الخطوة الأولى",1:"Setting objectives = الخطوة الثانية",2:"Business portfolio = الخطوة الثالثة",4:"Functional strategies = الخطوة الرابعة"} },
  { ch:"ch2", diff:"hard", q:"When Coca-Cola launches a new flavored water targeting health-conscious consumers this is an example of ___.", opts:["Market penetration","Diversification","Market development","Product development","Horizontal integration"], ans:3, exp:"Product development = منتج جديد (flavored water) + سوق موجود (قاعدة عملاء Coca-Cola الحالية). ليس Diversification لأن المشروبات مجالها الأصلي.", expW:{0:"Market penetration = نفس المنتج + نفس السوق",1:"Diversification = منتج جديد + سوق جديد كلياً",2:"Market development = نفس المنتج + سوق جديد",4:"Horizontal integration = استحواذ على منافس"} },
  { ch:"ch2", diff:"hard", q:"A company value chain differs from its value delivery network in that the value chain ___.", opts:["Includes suppliers and distributors","Focuses on external partnerships only","Refers to internal departments that carry out value-creating activities","Is the same as the supply chain","Measures customer satisfaction scores"], ans:2, exp:"Value chain = الأقسام الداخلية (logistics، operations، marketing، service). Value delivery network = شركاء خارجيون (موردون + موزعون + عملاء).", expW:{0:"Suppliers/distributors = value delivery network",1:"External only = value delivery network",3:"Same as supply chain = غير صحيح Supply chain أضيق",4:"Customer satisfaction = ليس تعريف value chain"} },
  // ══════════════ Chapter 3 — 105 questions ══════════════
  { ch:"ch3", diff:"medium", q:"Dan has been directed to study the forces close to a company that affect its ability to serve its customers, such as the company, suppliers, marketing intermediaries, customer markets, competitors, and publics. In this instance, Dan has been directed to study the ________ of the company.", opts:["macroenvironment", "microenvironment", "technological environment", "demographic environment", "political environment"], ans:1, exp:"Microenvironment = البيئة القريبة: القوى المحيطة مباشرة بالشركة — الشركة نفسها، الموردون، الوسطاء، العملاء، المنافسون، الجمهور. كل هذه العناصر ذُكرت في السؤال." , expW:{0:"Macroenvironment = القوى الكبرى البعيدة كالاقتصاد والتكنولوجيا والثقافة", 2:"Technological environment = جزء من الـ Macroenvironment", 3:"Demographic environment = جزء من الـ Macroenvironment", 4:"Political environment = جزء من الـ Macroenvironment"} },
  { ch:"ch3", diff:"medium", q:"Which of the following terms is used to describe the actors and forces outside marketing that affect marketing management's ability to build and maintain successful relationships with target customers?", opts:["marketing environment", "marketing orientation", "strategic planning", "target markets", "marketing mix"], ans:0 , past:true, exp:"Marketing environment = البيئة التسويقية: كل الجهات والقوى خارج إدارة التسويق التي تؤثر على قدرتها لبناء علاقات مع العملاء.", expW:{1:"Marketing orientation = التوجه التسويقي (فلسفة)",2:"Strategic planning = التخطيط الاستراتيجي",3:"Target markets = الأسواق المستهدفة",4:"Marketing mix = 4Ps (أدوات)"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is a component of a firm's microenvironment?", opts:["customer demographics", "economic recessions", "population shifts", "marketing intermediaries", "technological changes"], ans:3 , past:true, exp:"Microenvironment = البيئة القريبة: الشركة، الموردون، الوسطاء التسويقيون، العملاء، المنافسون، الجمهور. الباقي = Macroenvironment.", expW:{0:"Demographics = Macroenvironment (ديموغرافي)",1:"Economic recessions = Macroenvironment (اقتصادي)",2:"Population shifts = Macroenvironment (ديموغرافي)",4:"Technological changes = Macroenvironment (تكنولوجي)"} },
  { ch:"ch3", diff:"medium", q:"Sam has been directed to study the demographic, economic, political, and cultural forces that affect an organization. In this instance, Sam has been directed to study the ________ of the organization.", opts:["macroenvironment", "microenvironment", "internal environment", "marketing mix", "marketing intermediaries"], ans:0 , past:true, exp:"Macroenvironment = البيئة الكلية: الديموغرافية، الاقتصادية، الطبيعية، التكنولوجية، السياسية، الثقافية (CDNPTC). أكبر من الـ micro.", expW:{1:"Microenvironment = الشركة، الموردون، الوسطاء، العملاء، المنافسون",2:"Internal environment = داخل الشركة فقط",3:"Marketing mix = 4Ps (أدوات)",4:"Marketing intermediaries = جزء من الـ micro"} },
  { ch:"ch3", diff:"medium", q:"The interrelated departments within a company that influence marketing decisions form the ________ environment.", opts:["cultural", "economic", "company", "political", "technological"], ans:2, exp:"Company environment = البيئة الداخلية للشركة: الأقسام المترابطة (المحاسبة، الهندسة، التصنيع، المبيعات...) التي تؤثر على قرارات التسويق. هي جزء من الـ Microenvironment." , expW:{0:"Cultural environment = من قوى الـ Macroenvironment", 1:"Economic environment = من قوى الـ Macroenvironment", 3:"Political environment = من قوى الـ Macroenvironment", 4:"Technological environment = من قوى الـ Macroenvironment"} },
  { ch:"ch3", diff:"hard", q:"Which is NOT part of the company environment that influences marketing decisions?", opts:["accounting", "engineering", "manufacturing", "sales", "retailers"], ans:4, exp:"البيئة الداخلية للشركة تشمل أقسامها الداخلية: المحاسبة، الهندسة، التصنيع، المبيعات. أما Retailers = تجار التجزئة فهم خارج الشركة (وسطاء في الـ microenvironment)." , expW:{0:"Accounting = قسم داخلي مؤثر على قرارات التسويق", 1:"Engineering = قسم داخلي مؤثر", 2:"Manufacturing = قسم داخلي مؤثر", 3:"Sales = قسم داخلي مؤثر"} },
  { ch:"ch3", diff:"medium", q:"________ provide the resources needed by a company to produce its goods and services.", opts:["Retailers", "Marketing services agencies", "Resellers", "Suppliers", "Financial intermediaries"], ans:3, exp:"Suppliers = الموردون: يوفرون الموارد اللازمة للإنتاج. أي اضطراب في التوريد يؤثر مباشرة على التسويق." , expW:{0:"Retailers = تجار التجزئة — وسطاء يبيعون للمستهلك", 1:"Marketing services agencies = وكالات تسويق وإعلان", 2:"Resellers = يشترون ليبيعوا — لا يوفرون الموارد", 4:"Financial intermediaries = بنوك وتأمين وتمويل"} },
  { ch:"ch3", diff:"hard", q:"Sparex Inc. is a manufacturer of metal bolts that are used by Boilex Inc. to manufacture heavy machineries. In this instance, Sparex acts as a ________.", opts:["financial intermediary", "supplier", "retailer", "customer", "local public"], ans:1, exp:"Supplier = المورد: يوفر الموارد اللازمة للإنتاج. Sparex تصنع براغي تستخدمها Boilex لصنع الآلات — إذن Sparex هي المورد." , expW:{0:"Financial intermediary = بنوك وتمويل وتأمين", 2:"Retailer = يبيع للمستهلك النهائي", 3:"Customer = يشتري للاستهلاك", 4:"Local public = المجتمع المحلي المحيط بالشركة"} },
  { ch:"ch3", diff:"hard", q:"Jonathan works for a firm that assists companies in promoting, distributing, and selling their products to end consumers. The firm Jonathan works for is a ________.", opts:["licensor", "supplier", "marketing intermediary", "local public", "general public"], ans:2, exp:"Marketing intermediary = وسيط تسويقي: شركة تساعد على الترويج، التوزيع، والبيع للمستهلكين النهائيين. يشمل الموزعين، وكالات التسويق، الوسطاء الماليين." , expW:{0:"Licensor = يمنح ترخيص استخدام العلامة", 1:"Supplier = يوفر الموارد للإنتاج", 3:"Local public = الجيران والمجتمع المحلي", 4:"General public = الجمهور العام"} },
  { ch:"ch3", diff:"medium", q:"________ help companies stock and move goods from their points of origin to their destinations.", opts:["Retailers", "Physical distribution firms", "Marketing services agencies", "Resellers", "Suppliers"], ans:1, exp:"Physical distribution firms = شركات التوزيع المادي: تساعد في نقل وتخزين البضائع من مكان الإنتاج إلى وجهتها (مستودعات، شركات نقل)." , expW:{0:"Retailers = يبيعون للمستهلك النهائي", 2:"Marketing services agencies = وكالات إعلان وأبحاث السوق", 3:"Resellers = يشترون ليبيعوا بسعر ربحي", 4:"Suppliers = يوفرون الموارد للإنتاج"} },
  { ch:"ch3", diff:"medium", q:"________ include banks, credit companies, insurance companies, and other businesses that help insure against the risks associated with the buying and selling of goods.", opts:["Financial intermediaries", "Physical distribution firms", "Resellers", "Marketing services agencies", "Wholesalers"], ans:0, exp:"Financial intermediaries = الوسطاء الماليون: البنوك، شركات الائتمان، شركات التأمين — تمول وتؤمّن على عمليات الشراء والبيع." , expW:{1:"Physical distribution firms = تساعد في نقل وتخزين البضائع", 2:"Resellers = يشترون ليبيعوا بسعر ربحي", 3:"Marketing services agencies = وكالات إعلان وأبحاث سوق", 4:"Wholesalers = تجار جملة (نوع من الـ resellers)"} },
  { ch:"ch3", diff:"hard", q:"Maria works for Sigma Inc., a firm that helps companies target and promote their products to the right markets. Sigma is most likely a ________.", opts:["financial intermediary", "physical distribution firm", "marketing services agency", "reseller", "wholesaler"], ans:2, exp:"Marketing services agency = وكالة خدمات تسويقية: تساعد الشركات في استهداف وترويج منتجاتها (بحوث سوقية، إعلانات، استشارات). Sigma تستهدف وتروج = وكالة تسويق." , expW:{0:"Financial intermediary = بنوك وتأمين وتمويل المعاملات", 1:"Physical distribution firm = تساعد في نقل وتخزين البضائع", 3:"Reseller = يشتري ليبيع بسعر ربحي", 4:"Wholesaler = تاجر جملة"} },
  { ch:"ch3", diff:"medium", q:"LandPort Transportation and Omega Warehousing help companies move and stock goods from their manufacturing plants to their destinations. These two businesses are examples of ________.", opts:["resellers", "marketing services agencies", "financial intermediaries", "physical distribution firms", "wholesalers"], ans:3, exp:"Physical distribution firms = شركات التوزيع المادي: تنقل وتخزن البضائع. LandPort (نقل) وOmega (تخزين) كلاهما من هذه الفئة." , expW:{0:"Resellers = يشترون ليبيعوا — لا يتعلقون بالنقل والتخزين", 1:"Marketing services agencies = وكالات إعلان وأبحاث سوق", 2:"Financial intermediaries = بنوك وتأمين وتمويل", 4:"Wholesalers = تجار جملة"} },
  { ch:"ch3", diff:"hard", q:"Boxes, Inc. sells products to end users or to other companies that will sell to end users. Boxes, Inc. is a ________.", opts:["reseller", "marketing services agencies", "financial intermediaries", "physical distribution firms", "wholesalers"], ans:0 , past:true, exp:"Reseller = وسيط يشتري المنتجات ليبيعها مرة أخرى (للمستهلك النهائي أو لشركات أخرى). Boxes تبيع للمستخدم النهائي = reseller.", expW:{1:"Marketing services agencies = شركات بحوث، إعلان",2:"Financial intermediaries = بنوك، شركات تأمين",3:"Physical distribution firms = نقل وتخزين",4:"Wholesalers = تاجر جملة (نوع من الـ resellers، لكن للشركات فقط)"} },
  { ch:"ch3", diff:"medium", q:"Which of the following groups influences the company's ability to obtain funds?", opts:["financial publics", "local publics", "general publics", "citizen-action publics", "internal publics"], ans:0 , past:true, exp:"Financial publics = البنوك، المستثمرون، شركات التصنيف الائتماني — كلهم يؤثرون على قدرة الشركة في الحصول على تمويل.", expW:{1:"Local publics = جيران الشركة والمجتمع المحلي",2:"General publics = الرأي العام",3:"Citizen-action publics = منظمات حماية المستهلك والبيئة",4:"Internal publics = الموظفون"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is true with regard to media publics?", opts:["The primary function of this group is to protect the interests of minority groups.", "This group carries news, features, and editorial opinion.", "The primary function of this group is to critique the marketing decisions of companies.", "This group includes neighborhood residents and community organizations.", "This group directly influences the company's ability to obtain funds."], ans:1, exp:"Media publics = وسائل الإعلام: تنقل الأخبار والمقالات والآراء التحريرية. تأثيرها قوي على سمعة الشركة — لذلك تهتم الشركات بعلاقاتها معها." , expW:{0:"هذا وصف citizen-action publics — تحمي مصالح الأقليات", 2:"هذا ليس الوظيفة الرئيسية للإعلام", 3:"هذا وصف local publics — الجيران والمجتمع", 4:"هذا وصف financial publics — تؤثر على تمويل الشركة"} },
  { ch:"ch3", diff:"hard", q:"Companies can succeed against their competitors by all of the following EXCEPT ________.", opts:["providing greater customer value and satisfaction", "better meeting the needs of target customers", "positioning their offerings strongly against competitors' offerings in the minds of consumers", "considering their own size and position compared to the competition", "providing the same product as the competition"], ans:4, exp:"لتحقيق التنافسية لا يكفي تقديم نفس المنتج — يجب تقديم قيمة أعلى، تلبية احتياجات أفضل، أو تمييز المنتج في أذهان المستهلكين. نسخ المنتج لا يؤدي إلى النجاح." , expW:{0:"صحيح — تقديم قيمة أعلى وسيلة للتنافس", 1:"صحيح — تلبية الاحتياجات أفضل وسيلة", 2:"صحيح — التميز في الأذهان وسيلة للتنافس", 3:"صحيح — معرفة حجمك مقارنةً بالمنافس مهمة"} },
  { ch:"ch3", diff:"medium", q:"A company's marketing decisions may be questioned by consumer organizations, environmental groups, minority groups, and others. These organizations and groups are also known as ________.", opts:["media publics", "marketing intermediaries", "customers", "citizen-action publics", "internal publics"], ans:3, exp:"Citizen-action publics = جماعات العمل المدني: منظمات المستهلكين، المجموعات البيئية، الأقليات — تراقب وتتحدى قرارات الشركات دفاعاً عن المصلحة العامة." , expW:{0:"Media publics = الإعلام — يُغطي الأخبار لا يُشكّك في القرارات", 1:"Marketing intermediaries = وسطاء التسويق في الـ microenvironment", 2:"Customers = العملاء الذين يشترون المنتجات", 4:"Internal publics = الموظفون والمديرون — داخل الشركة"} },
  { ch:"ch3", diff:"medium", q:"A consumer organization in Ohio has challenged the marketing decision of a local firm alleging it to be against the larger social interest. In this instance, the firm is challenged by a(n) ________ public.", opts:["internal", "general", "government", "citizen-action", "media"], ans:3, exp:"Citizen-action publics = جماعات العمل المدني: تتحدى قرارات الشركات التي تعتبرها ضد المصلحة الاجتماعية. منظمات المستهلكين والمجموعات البيئية أمثلة." , expW:{0:"Internal = داخل الشركة (موظفون، مديرون)", 1:"General = الجمهور العام الواسع", 2:"Government = الجهات الحكومية والتنظيمية", 4:"Media = الصحافة والتلفزيون"} },
  { ch:"ch3", diff:"medium", q:"Which group includes neighborhood residents and community organizations?", opts:["local publics", "government publics", "internal publics", "citizen-action publics", "media publics"], ans:0, exp:"Local publics = الجمهور المحلي: الجيران والمجتمعات المحلية المحيطة بالشركة. يهتم بالضوضاء، التلوث، والتأثير على الحي." , expW:{1:"Government publics = الجهات الحكومية والتنظيمية", 2:"Internal publics = الموظفون والمديرون داخل الشركة", 3:"Citizen-action publics = منظمات المستهلكين والجماعات البيئية", 4:"Media publics = الصحافة والتلفزيون"} },
  { ch:"ch3", diff:"medium", q:"Cape Sky Inc., an international insurance and financial services company, is the primary sponsor of the annual New York City Marathon, which is attended by over one million fans and watched by approximately 300 million viewers worldwide. The Cape Sky logo and name are displayed throughout the racecourse. Cape Sky most likely sponsors this event in order to appeal to which of the following types of publics?", opts:["financial publics", "citizen-action publics", "government publics", "general publics", "internal publics"], ans:3, exp:"General publics = الجمهور العام: الرأي العام الواسع. رعاية ماراثون يشاهده 300 مليون شخص = محاولة بناء صورة إيجابية لدى الجمهور العام." , expW:{0:"Financial publics = بنوك ومستثمرون يؤثرون على التمويل", 1:"Citizen-action = منظمات المستهلكين والجماعات البيئية", 2:"Government = الجهات الحكومية والتنظيمية", 4:"Internal = الموظفون والمديرون داخل الشركة"} },
  { ch:"ch3", diff:"medium", q:"Workers, managers, and members of the board are examples of ________ publics.", opts:["general", "internal", "local", "citizen-action", "media"], ans:1, exp:"Internal publics = الجمهور الداخلي: العمال، المديرون، أعضاء مجلس الإدارة. رضاهم وتحفيزهم يؤثران على جودة المنتج والخدمة." , expW:{0:"General publics = الجمهور العام الواسع", 2:"Local publics = الجيران والمجتمع المحلي", 3:"Citizen-action = منظمات المستهلكين والجماعات البيئية", 4:"Media publics = الصحافة والتلفزيون"} },
  { ch:"ch3", diff:"hard", q:"Price & Malone Corp., a company based in Houston, caters to a market of individuals and households that buy goods and services for personal consumption. Price & Malone caters to a ________ market.", opts:["business", "reseller", "government", "consumer", "wholesale"], ans:3, exp:"Consumer market = سوق المستهلكين: أفراد وأسر يشترون السلع والخدمات للاستهلاك الشخصي (B2C). هو أكبر أسواق الشراء." , expW:{0:"Business market = شركات تشتري للتصنيع أو الإنتاج", 1:"Reseller market = يشترون ليبيعوا للآخرين", 2:"Government market = حكومات تشتري لتقديم خدمات عامة", 4:"Wholesale = نوع من الوسطاء وليس نوع سوق"} },
  { ch:"ch3", diff:"medium", q:"________ markets buy goods and services for further processing.", opts:["Business", "Reseller", "Wholesale", "Consumer", "Retail"], ans:0 , past:true, exp:"Business markets = تشتري سلع وخدمات لمعالجتها أو استخدامها في إنتاج سلع أخرى (B2B). مختلف عن reseller الذي يعيد البيع دون تغيير.", expW:{1:"Reseller = يعيد البيع دون معالجة",2:"Wholesale = نوع من الوسطاء",3:"Consumer = يشتري للاستهلاك الشخصي",4:"Retail = التجزئة (يبيع للمستهلك النهائي)"} },
  { ch:"ch3", diff:"hard", q:"Government markets consist of government agencies that buy goods and services ________.", opts:["to produce public services", "to resell at a profit", "for further processing", "for personal consumption", "that are generally of poor quality"], ans:0 , exp:"Government market = الجهات الحكومية التي تشتري السلع والخدمات لتقديم الخدمات العامة للمواطنين." , expW:{1:"Reseller market = يشترون ليبيعوا بسعر ربحي", 2:"Business market = يشترون لمزيد من المعالجة", 3:"Consumer market = أفراد يشترون للاستهلاك الشخصي", 4:"الحكومة تشتري خدمات عالية الجودة — ليس رديئة"} },
  { ch:"ch3", diff:"hard", q:"Rachel works for a furniture company in Ireland. She is responsible for buying and selling goods at a profit to small retailers. Rachel most likely operates in a ________ market.", opts:["business", "reseller", "wholesale", "consumer", "retail"], ans:1 , exp:"Reseller market = يشتري السلع ليبيعها بسعر ربحي للمستهلكين أو تجار التجزئة — مثال على سوق الموزعين." , expW:{0:"Business market = يشترون لمزيد من الإنتاج لا لإعادة البيع", 2:"Wholesale = نوع من الوسطاء", 3:"Consumer market = أفراد يشترون للاستهلاك الشخصي", 4:"Retail market = يبيع مباشرةً للمستهلك النهائي"} },
  { ch:"ch3", diff:"hard", q:"Sparks Inc. has a growing ________ market in the United States consisting of individuals and households that buy Sparks' products for personal use.", opts:["consumer", "government", "business", "international", "financial"], ans:0 , exp:"Consumer market = أفراد وأسر يشترون المنتجات للاستهلاك الشخصي — أكبر الأسواق حجماً." , expW:{1:"Government market = حكومات تشتري لتقديم خدمات عامة", 2:"Business market = شركات تشتري للتصنيع أو الإنتاج", 3:"International = أسواق خارج الحدود", 4:"Financial = مصطلح اقتصادي لا يصف نوع السوق"} },
  { ch:"ch3", diff:"medium", q:"Which of the following microenvironment actors has had the most influence on The Landing?", opts:["competitors", "suppliers", "marketing intermediaries", "resellers", "citizen-action publics"], ans:0 , exp:"Microenvironment actors = تشمل: الشركة، الموردون، الوسطاء، المنافسون، الجمهور، العملاء — جميعها تؤثر مباشرة على استراتيجية التسويق." , expW:{1:"Suppliers = يوفرون الموارد — أثرهم غير مباشر", 2:"Marketing intermediaries = وسطاء التوزيع والبيع", 3:"Resellers = يشترون ليبيعوا بسعر ربحي", 4:"Citizen-action = منظمات مدنية"} },
  { ch:"ch3", diff:"medium", q:"The marketing team of 7 Star Inc., a company manufacturing smartphones, is currently studying the size, density, location, age, and occupation of its target market. Which of the following environments is being studied in this scenario?", opts:["demographic environment", "political environment", "economic environment", "technological environment", "cultural environment"], ans:0, past:true, exp:"Demographic environment = دراسة السكان: الحجم، الكثافة، الموقع، العمر، الجنس، المهنة. كل ما في السؤال وصف للديموغرافيا.", expW:{1:"Political = قوانين، حكومة، ضغط",2:"Economic = قوة الشراء، أنماط الإنفاق",3:"Technological = R&D، تقنية جديدة",4:"Cultural = قيم، معتقدات، أنماط حياة"} },
  { ch:"ch3", diff:"medium", q:"The single most important demographic trend in the United States is the ________.", opts:["changing age structure of the population", "mobility of families", "changing family structure of the population", "increasing number of professional jobs", "increasing birth rate"], ans:0 , exp:"الاتجاه الديموغرافي الأهم في أمريكا = التغيّر في الهيكل العمري للسكان — يؤثر على كل فئة مستهلكين ويعيد تشكيل الأسواق." , expW:{1:"Mobility of families = التنقل الأسري — اتجاه ثانوي", 2:"Family structure = بنية الأسرة — مهمة لكن ليست الأهم", 3:"Professional jobs = نمو الوظائف المهنية", 4:"Birth rate = معدل المواليد"} },
  { ch:"ch3", diff:"medium", q:"Among the generational groups in U.S population, the ________ are still the wealthiest generation in U.S. history.", opts:["baby boomers", "Generation Xers", "Millennials", "echo boomers", "Silent Generation"], ans:0 , exp:"Baby boomers = ما زالوا أثرى جيل في التاريخ الأمريكي رغم تقدمهم في السن — يسيطرون على نسبة ضخمة من الدخل المتاح." , expW:{1:"Generation Xers = مواليد 1965-1980 — ثروتهم أقل", 2:"Millennials = مواليد 1981-1996 — لم يبلغوا ذروة الإنفاق بعد", 3:"Echo boomers = مصطلح آخر للـ Millennials", 4:"Silent Generation = جيل أكبر سناً وأقل في الإنفاق"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is true of the baby boomers?", opts:["They tend to see themselves as far older than they actually are.", "They represent a rapidly shrinking market for new housing and home remodeling.", "They are long past their peak earning and spending years.", "They control an estimated 70 percent of the United States' disposable income.", "They have utter fluency and comfort with digital technology."], ans:3 , exp:"Baby boomers = يسيطرون على نحو 70% من الدخل المتاح في أمريكا — لا يزالون سوقاً ضخماً لخدمات السفر والمالية والترفيه." , expW:{0:"Baby boomers يرون أنفسهم أصغر مما هم عليه", 1:"سوق الإسكان لا يتقلص — Baby boomers لا يزالون مشترين", 2:"لم يتجاوزوا ذروة الإنفاق بعد — لا يزالون نشطين", 4:"Baby boomers أقل ارتياحاً مع التكنولوجيا من Millennials"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is true of Gen Xers?", opts:["They are considerably larger than the boomer generation.", "They were the first to grow up in the Internet era.", "They are less educated than the baby boomers.", "They are more materialistic than the Millennials.", "They rarely research a product before purchasing it."], ans:1 , exp:"Gen Xers = مواليد 1965-1980 — كانوا أول من نشأ في عصر الإنترنت، وهم الجيل الأكثر تعليماً حتى الآن." , expW:{0:"Gen Xers أصغر عدداً من Baby boomers", 2:"Gen Xers الأكثر تعليماً — أعلى من Baby boomers", 3:"Gen Xers أقل مادية من غيرهم", 4:"Gen Xers يبحثون في المنتجات قبل الشراء"} },
  { ch:"ch3", diff:"medium", q:"Which of the following generations is the most educated to date?", opts:["Lost Generation", "Baby boomers", "Millennials", "Generation X", "Silent Generation"], ans:3 , exp:"Generation X = الجيل الأكثر تعليماً حتى الآن — يتمتعون باستقلالية عالية وتكيف مع التكنولوجيا." , expW:{0:"Lost Generation = جيل الحرب العالمية الأولى", 1:"Baby boomers = مواليد 1946-1964 — تعليمهم أقل من Gen X", 2:"Millennials = مواليد 1981-1996 — يأتون بعد Gen X تعليمياً", 4:"Silent Generation = جيل أكبر سناً وأقل تعليماً"} },
  { ch:"ch3", diff:"medium", q:"Mary Adams is helping her company develop a marketing program for a new product line. The program is designed to appeal most to less materialistic consumer groups who are likely to prize experience, not acquisition. The marketing program is most likely designed to appeal to which of the following demographic groups?", opts:["Generation X", "Millennials", "Echo Boomers", "Silent Generation", "Lost Generation"], ans:0 , exp:"Generation X = يُقدّرون التجارب على التملّك، وهم أقل مادية من الأجيال الأخرى." , expW:{1:"Millennials = يُقدّرون التكنولوجيا والتجارب أيضاً لكن أكثر مادية", 2:"Echo Boomers = مصطلح آخر للـ Millennials", 3:"Silent Generation = جيل أكبر وليس هدف هذه الحملة", 4:"Lost Generation = جيل قديم جداً"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is true of the Millennials?", opts:["They are the children of baby boomers and were born between 1977 and 2000.", "They control an estimated 70 percent of the disposable income in the United States.", "They have reached their peak earning and spending years.", "They were the first to grow up in the Internet era.", "They are less immersed in technology than Gen Xers."], ans:0 , exp:"Millennials (Gen Y) = أبناء البومرز، مواليد 1977-2000 — يمثلون سوقاً ضخماً وكانوا أول من نشأ في العصر الرقمي." , expW:{1:"70% of disposable income = Baby boomers لا Millennials", 2:"Millennials لم يبلغوا ذروة الإنفاق بعد بشكل عام", 3:"Gen Xers هم أول من نشأ في عصر الإنترنت", 4:"Millennials أكثر غمراً في التكنولوجيا من Gen Xers"} },
  { ch:"ch3", diff:"medium", q:"Which of the following generational groups is most comfortable with digital technology and embraces that technology?", opts:["Generation X", "Millennials", "Baby Boomers", "Silent Generation", "Lost Generation"], ans:1 , exp:"Millennials = الأكثر ارتياحاً مع التكنولوجيا الرقمية لأنهم نشأوا في عصر الإنترنت والأجهزة الرقمية." , expW:{0:"Generation X = نشأوا في عصر الإنترنت لكن أقل ارتياحاً", 2:"Baby Boomers = الجيل الأقل ارتياحاً مع التكنولوجيا", 3:"Silent Generation = جيل أكبر سناً وأبعد عن التكنولوجيا", 4:"Lost Generation = جيل قديم لا علاقة له بالتكنولوجيا"} },
  { ch:"ch3", diff:"medium", q:"Wholesome Soups, a maker of organic soups, is starting a new marketing campaign emphasizing the ease of preparing and eating Wholesome Soups. Print, television, and Internet ads feature college students enjoying Wholesome Soups in between classes and during study breaks. Wholesome Soups' new marketing campaign is most likely aimed at which of the following?", opts:["Baby Boomers", "Gen Zers", "Gen Xers", "Millennials", "the SOHO market"], ans:3 , exp:"Millennials = الجمهور المستهدف لحملات التسويق التي تُبرز السهولة والتجربة — أبناء البومرز المولودون بين 1977 و2000." , expW:{0:"Baby Boomers = أكبر سناً ولا يتناسبون مع إعلانات الجامعة", 1:"Gen Zers = مواليد ما بعد 1996 — أصغر من طلاب الجامعة عادةً", 2:"Gen Xers = أكبر عمراً من طلاب الجامعة الحاليين", 4:"SOHO market = عاملون من المنزل — ليس الجمهور المستهدف"} },
  { ch:"ch3", diff:"medium", q:"Marketers target Generation Z because they ________.", opts:["listen to their parents and follow their examples", "dislike technology", "spend an estimated $44 billion annually of their own money", "prefer shopping in brick-and-mortar stores with actual products", "have long attention spans and are easily targeted"], ans:2 , exp:"Generation Z = مواليد ما بعد 1996 — ينفقون ما يقارب 44 مليار دولار سنوياً من أموالهم الخاصة وهم سوق استهلاكي متنامٍ." , expW:{0:"Gen Z مستقلون في قراراتهم — لا يتبعون آباءهم", 1:"Gen Z يستخدمون التكنولوجيا بكثافة", 3:"Gen Z يفضلون التسوق الإلكتروني", 4:"Gen Z لديهم فترات انتباه قصيرة"} },
  { ch:"ch3", diff:"medium", q:"Gen Zers are highly mobile, connected, and social. They base their purchases on ________.", opts:["input from their friends", "text messages", "social media ratings", "product research on their own", "their parents' opinions"], ans:3 , exp:"Generation Z = الجيل الرقمي الأصيل — على الرغم من تواصلهم الاجتماعي الواسع، يتميزون بإجراء بحث مستقل وذاتي عن المنتجات قبل الشراء. يعتمدون على بحثهم الخاص أكثر من توصيات الآخرين أو تقييمات وسائل التواصل." , expW:{0:"Gen Z لا يعتمدون على آراء الأصدقاء في الشراء — بحثهم الذاتي المستقل هو الأساس", 1:"الرسائل النصية = وسيلة اتصال لا أساس القرار الشرائي", 2:"تقييمات وسائل التواصل مؤثرة لكن Gen Z يُجرون بحثهم الخاص بشكل مستقل وليس بالاعتماد عليها", 4:"Gen Z مستقلون في قراراتهم — لا يعتمدون على آراء الوالدين"} },
  { ch:"ch3", diff:"medium", q:"Marketers can group people in a number of ways, including by birth date. However, the following combination of groups has proven to be more effective: ________.", opts:["income, lifestyle, life stage", "profession, common values they seek in products they buy, lifestyle", "lifestyle, life stage, common values they seek in products they buy", "place of residence, life stage, lifestyle", "race or nationality, lifestyle, common values they seek in products they buy"], ans:2 , exp:"تجميع المستهلكين حسب أسلوب الحياة ومرحلة الحياة والقيم المشتركة أكثر فاعلية من التقسيم بالعمر وحده." , expW:{0:"Income + lifestyle + life stage = مفيد لكن ليس الأكثر فاعلية", 1:"Profession + values + lifestyle = مفيد لكن أقل شمولاً", 3:"Place + life stage + lifestyle = مفيد لكن أقل دقة", 4:"Race + lifestyle + values = مفيد لكن يُهمل مرحلة الحياة"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is a trend that depicts the increasingly nontraditional nature of today's American families?", opts:["the low percentage of working women in the workforce", "the low percentage of married couples with children", "the sharply declining number of dual-income families", "the sharply declining number of stay-at-home dads", "the decreasing reliance on convenience foods and services"], ans:1 , exp:"الأسر غير التقليدية تتزايد في أمريكا — مثل الأزواج بلا أطفال وأسر الوالد المنفرد — مما يُغيّر أنماط الاستهلاك." , expW:{0:"نسبة المرأة العاملة مرتفعة وليست منخفضة", 2:"الأسر ذات الدخلين في ازدياد وليس في تراجع", 3:"الآباء المقيمون في المنزل في ازدياد", 4:"الاعتماد على خدمات الراحة في ازدياد"} },
  { ch:"ch3", diff:"medium", q:"In the context of geographical shifts in population, the migration toward ________ areas has resulted in a rapid increase in the number of people who telecommute.", opts:["urban", "remote", "rural", "metropolitan", "micropolitan"], ans:4 , exp:"Micropolitan areas = مناطق صغيرة تجمع مزايا المدينة وهدوء الريف — أدى التحرك نحوها لزيادة العمل عن بُعد." , expW:{0:"Urban = حضري كبير — لا يتسبب في زيادة العمل عن بُعد", 1:"Remote = نائي — صعوبة الاتصال تُقلل العمل عن بُعد", 2:"Rural = ريفي — أقل توافراً للبنية التحتية", 3:"Metropolitan = حضري كبير — الناس يتنقلون لمكان العمل"} },
  { ch:"ch3", diff:"hard", q:"Over the past two decades, the U.S. population has shifted toward the ________ states.", opts:["Northern", "Northeast", "Sunbelt", "Midwest", "Corn belt"], ans:2 , exp:"Geographical shift = تحرّك السكان الأمريكيين نحو ولايات حزام الشمس (Sunbelt) في الجنوب والغرب." , expW:{0:"Northern = تفقد السكان", 1:"Northeast = تفقد السكان", 3:"Midwest = نمو محدود", 4:"Corn belt = مصطلح زراعي لا يصف الاتجاه السكاني"} },
  { ch:"ch3", diff:"medium", q:"Which of the following has lost population in the past two decades?", opts:["California", "Florida", "the Western states", "the Northeast states", "the Southern states"], ans:3 , exp:"ولايات الشمال الشرقي فقدت سكاناً في العقدين الماضيين بينما نمت ولايات الجنوب والغرب." , expW:{0:"California = نمت ثم استقرت", 1:"Florida = من أسرع الولايات نمواً في Sunbelt", 2:"Western states = نمت في العقود الأخيرة", 4:"Southern states = من أسرع الولايات نمواً"} },
  { ch:"ch3", diff:"medium", q:"In the 1950s, Americans made a massive exit ________.", opts:["from the South to the Northeast", "from the West to the Midwest", "to foreign countries", "from the cities to the suburbs", "from the coastal towns to the cities"], ans:3 , exp:"في الخمسينيات غادر الأمريكيون المدن الكبرى نحو الضواحي — هذه النقلة أعادت تشكيل توزيع السكان." , expW:{0:"لم يكن هناك هجرة جماعية من الجنوب للشمال الشرقي", 1:"لم تكن هناك هجرة من الغرب للمنطقة الوسطى", 2:"لم تكن هجرة للخارج بشكل ملحوظ", 4:"الهجرة كانت من المدن — لا من المدن الساحلية"} },
  { ch:"ch3", diff:"medium", q:"An increasing number of American workers currently work from their homes or remote offices and conduct their business by phone or the Internet. This trend has created a ________.", opts:["booming real estate market in the big cities", "booming SOHO market", "decline in the demand for convenience foods", "decline in the demand for financial services", "steady increase in global enterprises"], ans:1 , exp:"SOHO market (Small Office/Home Office) = سوق العاملين من المنزل أو المكاتب الصغيرة — نما بفضل التكنولوجيا وانتشار العمل عن بُعد." , expW:{0:"العقارات في المدن الكبرى لم تزدهر بسبب هذا الاتجاه", 2:"الطلب على الأغذية الجاهزة ارتفع مع العمل من المنزل", 3:"الخدمات المالية لا تتأثر مباشرة", 4:"هذا اتجاه داخلي لا يُحفز المشاريع الدولية"} },
  { ch:"ch3", diff:"medium", q:"Which of the following demographic trends is the most likely cause for a rapid increase in telecommuting?", opts:["the migration toward micropolitan and suburban areas", "the migration from rural to metropolitan areas", "the increasing number of traditional households", "the growing percentage of married couples who do not have children", "the declining number of manufacturing workers in today's workforce"], ans:0 , exp:"التحرك نحو المناطق شبه الحضرية (micropolitan) يدفع المزيد من الناس للعمل عن بُعد بدلاً من التنقل اليومي." , expW:{1:"الهجرة من الريف للمدن = عكس الاتجاه (تقلل العمل عن بُعد)", 2:"الأسر التقليدية تتراجع — لا علاقة مباشرة بالعمل عن بُعد", 3:"الأزواج بلا أطفال = ليس سبباً مباشراً للعمل عن بُعد", 4:"تراجع الوظائف الصناعية = سبب اقتصادي لا سكاني"} },
  { ch:"ch3", diff:"medium", q:"Micropolitan areas are ________.", opts:["likely to have a higher crime rate than metropolitan areas", "less likely to attract telecommuters", "likely to offer the same advantages as metropolitan areas", "less likely to offer market expansion opportunities", "generally unattractive to niche marketers"], ans:2 , exp:"Micropolitan areas = مناطق تقدم مزايا مشابهة للمناطق الحضرية الكبيرة لكنها أصغر حجماً — جذابة للعائلات والمهنيين." , expW:{0:"المناطق شبه الحضرية ليست بالضرورة ذات جريمة أعلى", 1:"المناطق شبه الحضرية جذابة للعمل عن بُعد", 3:"توفر فرص توسع سوقي للشركات الصغيرة", 4:"جذابة للمسوقين المتخصصين (niche)"} },
  { ch:"ch3", diff:"medium", q:"In the United States, job growth currently is the weakest for ________.", opts:["white collar workers", "manufacturing workers", "salespeople", "telecommuters", "professional workers"], ans:1 , exp:"الوظائف الصناعية (manufacturing) تتراجع في أمريكا بسبب التكنولوجيا والأتمتة والعولمة." , expW:{0:"White collar = وظائف الياقة البيضاء في نمو", 2:"Salespeople = وظائف المبيعات ليست الأضعف", 3:"Telecommuters = العمل عن بُعد في ازدياد", 4:"Professional workers = الأسرع نمواً"} },
  { ch:"ch3", diff:"medium", q:"Currently, in the United States, job growth is the strongest for ________.", opts:["blue collar workers", "manufacturing workers", "professional workers", "construction workers", "sanitation workers"], ans:2 , exp:"الوظائف المهنية والخدمية (professional workers) هي الأسرع نمواً في الاقتصاد الأمريكي الحديث." , expW:{0:"Blue collar = الوظائف اليدوية في تراجع", 1:"Manufacturing = الأضعف نمواً بسبب الأتمتة", 3:"Construction = نمو متوسط متأثر بالاقتصاد", 4:"Sanitation workers = وظائف خدمية لكن ليست الأسرع"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is an accurate statement about the diversity of the American population?", opts:["African Americans represent the largest non-white segment of the population.", "More than 20 percent of the people living in the United States were born in another country.", "By 2050, the Asian population is estimated to remain at 4.7 percent.", "By 2060, Hispanics are estimated to be 28 percent of the population.", "The United States has become more of a \"melting pot\" than a \"salad bowl.\""], ans:3 , exp:"بحلول 2060 سيمثل الهسبانيون 28% من سكان أمريكا — مما يجعلهم أسرع الأقليات نمواً." , expW:{0:"African Americans ليسوا أكبر شريحة غير بيضاء — Hispanics أكبر", 1:"أقل من 15% من سكان أمريكا وُلدوا خارجها", 2:"نسبة الآسيويين ستنمو لأكثر من 4.7%", 4:"أمريكا أصبحت أكثر 'طبق سلطة' — لا 'بوتقة انصهار'"} },
  { ch:"ch3", diff:"medium", q:"By 2060, ________ will be an estimated 14 percent of the U.S. population.", opts:["African Americans", "Asians", "Hispanics", "Native Americans", "Native Hawaiians"], ans:0 , exp:"African Americans = يُتوقع أن يمثلوا 14% من سكان أمريكا بحلول 2060 — سوق استهلاكي ضخم." , expW:{1:"Asians = يمثلون ~6% في 2060", 2:"Hispanics = سيمثلون 28% في 2060 — أكثر من 14%", 3:"Native Americans = نسبة أصغر بكثير", 4:"Native Hawaiians = مجموعة أصغر جداً"} },
  { ch:"ch3", diff:"medium", q:"Which of the following situations is expected to enhance the use of targeted advertising messages by marketers?", opts:["increase in derived demand in the market", "increase in ethnic populations", "rising global inflation rates", "inadequate quality control", "low advertising budgets"], ans:1 , exp:"تزايد الأقليات العرقية يُشجع المسوقين على استخدام رسائل إعلانية موجهة لكل شريحة ثقافية." , expW:{0:"Derived demand = طلب مشتق في B2B — لا علاقة له", 2:"التضخم العالمي = يُقلل الإنفاق لا يُشجع الاستهداف", 3:"ضعف ضبط الجودة = مشكلة داخلية", 4:"ميزانية إعلانية منخفضة = عائق وليس محفزاً"} },
  { ch:"ch3", diff:"medium", q:"With an expected increase in ethnic diversity within the American population, marketers are most likely to place a greater emphasis on ________.", opts:["geographic segmentation", "targeted advertising messages", "mass marketing", "\"do well by doing good\" missions", "corporate giving"], ans:1, past:true, exp:"التنوع العرقي = شرائح متعددة بحاجات مختلفة → التركيز على رسائل إعلانية مستهدفة لكل شريحة عرقية (targeted advertising).", expW:{0:"Geographic segmentation = تقسيم جغرافي (ليس عرقي)",2:"Mass marketing = عكس الاستهداف",3:"Do well by doing good = مسؤولية اجتماعية",4:"Corporate giving = تبرعات"} },
  { ch:"ch3", diff:"hard", q:"Soon-Yi Park's chain of travel agencies has identified the lesbian, gay, bisexual, and transgender community as a growing market that spends an increasing percentage of its income on travel. Which of the following would be the LEAST effective component of a marketing plan for Soon-Yi to take advantage of this opportunity?", opts:["develop a presence on LGBT-oriented social networking sites", "position his agency as focused on specialized experiences", "implement a mass marketing campaign", "place specially targeted ads in gay-themed publications", "advertise on LOGO, the cable television network aimed at gays and lesbians and their friends and family"], ans:2 , exp:"مجتمع LGBT = شريحة سوقية متنامية ذات قوة شرائية عالية — تستجيب لحملات التسويق المتخصصة والموجهة لها." , expW:{0:"الحضور على مواقع LGBT = فعّال جداً", 1:"التموضع للتجارب = فعّال للـ LGBT", 3:"الإعلانات في المنشورات المتخصصة = فعّالة", 4:"الإعلان على LOGO = فعّال لأنه يصل مباشرة للجمهور"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is true with regard to the diversity segment of U.S. adults with disabilities?", opts:["Most individuals with disabilities are active consumers.", "The market represented by U.S. adults with disabilities is smaller than that represented by African Americans or Hispanics.", "The diversity segment, U.S. adults with disabilities, is a rather unattractive segment for the tourism industry.", "The annual spending power of U.S. adults with disabilities is less than $100 billion.", "Most companies are reluctant to reach out to consumers with disabilities."], ans:0 , exp:"الأمريكيون من ذوي الإعاقات = سوق ضخم من المستهلكين النشطين — معظمهم يتسوقون ويُنفقون بنشاط على المنتجات والخدمات." , expW:{1:"سوق ذوي الإعاقات أكبر من سوق African Americans وHispanics", 2:"ذوو الإعاقات سوق جذاب لصناعة السياحة", 3:"القوة الشرائية لذوي الإعاقات تتجاوز 400 مليار دولار سنوياً", 4:"كثير من الشركات تتواصل مع ذوي الإعاقات بنشاط"} },
  { ch:"ch3", diff:"medium", q:"The economic environment consists of economic factors that affect ________.", opts:["cultural patterns of communities", "entrepreneurial orientation of a population", "the quality of technological innovation", "consumer purchasing power", "the natural environment"], ans:3, past:true, exp:"Economic environment = العوامل الاقتصادية التي تؤثر على القوة الشرائية للمستهلك وأنماط إنفاقه. الدخل والأسعار والادخار كلها عوامل اقتصادية.", expW:{0:"Cultural patterns = البيئة الثقافية",1:"Entrepreneurial orientation = توجه الأعمال",2:"Technological innovation = البيئة التكنولوجية",4:"Natural environment = البيئة الطبيعية"} },
  { ch:"ch3", diff:"medium", q:"Consumers' spending patterns since the Great Recession include ________.", opts:["spending freely, without caution", "buying less and looking for greater value in what they buy", "amassing record levels of debt", "experiencing rapid increases in housing values", "participating in a booming stock market"], ans:1 , exp:"بعد الركود الكبير 2008 تغيّرت أنماط الإنفاق: يشتري المستهلكون أقل ويبحثون عن قيمة أعلى مقابل أموالهم." , expW:{0:"الإنفاق الحر كان قبل الركود 2008 — ليس بعده", 2:"مستويات الديون انخفضت بعد الركود", 3:"أسعار المساكن لم ترتفع بسرعة بعد الركود", 4:"سوق الأسهم شهد تذبذباً كبيراً بعد الركود"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is an accurate statement about the income distribution of the American population?", opts:["The top 20 percent of earners achieves 68 percent of the country's adjusted gross income.", "The bottom 40 percent of earners captures just 11 percent of total income.", "The top 5 percent of American earners captures 18 percent of all income.", "The distribution of income allows most companies to target earners of all income levels.", "Changes in income and interest rates minimally impact spending patterns."], ans:1 , exp:"توزيع الدخل في أمريكا غير متساوٍ — أدنى 40% يستحوذون على 11% فقط من الدخل الإجمالي." , expW:{0:"أعلى 20% يستحوذون على أكثر من 50% ليس 68%", 2:"أعلى 5% يستحوذون على ~22% ليس 18%", 3:"توزيع الدخل غير المتساوي يجعل الاستهداف الشامل صعباً", 4:"الدخل وأسعار الفائدة تؤثر بشكل كبير على أنماط الإنفاق"} },
  { ch:"ch3", diff:"medium", q:"A value marketer is most likely to ________.", opts:["offer consumers superior quality of goods and services at a very high price", "offer consumers only those products that are associated with status and prestige", "offer consumers low quality goods and services at very low prices", "offer consumers a balanced combination of product quality at a fair price", "deny discounts to consumers to increase profits"], ans:3 , exp:"Value marketing = تقديم مزيج مناسب من الجودة والخدمة بسعر عادل — ليس أرخص سعراً ولا أعلى جودة، بل أفضل قيمة." , expW:{0:"Value marketing لا يرتبط بالسعر المرتفع جداً", 1:"Value marketing لا يقتصر على منتجات الهيبة", 2:"Value marketing لا يعني جودة منخفضة وسعراً منخفضاً", 4:"Value marketing يقدم خصومات وقيمة مناسبة"} },
  { ch:"ch3", diff:"hard", q:"Which of the following statements about income distribution in the United States is NOT true?", opts:["Over the past several decades, the rich have grown richer.", "Over the past several decades, the middle class has grown faster than other classes.", "Over the past several decades, the poor have remained poor.", "The top 20 percent of earners capture over 50 percent of all income.", "The top five percent of American earners get nearly 22 percent of the country's adjusted gross income."], ans:1 , exp:"الطبقة الوسطى لم تنمُ في العقود الأخيرة — بل تقلصت بينما ازداد الأثرياء ثروةً وبقي الفقراء فقراء." , expW:{0:"الأثرياء ازدادوا ثروةً — صحيح", 2:"الفقراء بقوا فقراء — صحيح", 3:"أعلى 20% يستحوذون على أكثر من 50% — صحيح", 4:"أعلى 5% يحصلون على ~22% من الدخل — صحيح"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is the macroenvironmental force that has had the greatest effect on The Landing?", opts:["the demographic environment", "the technological environment", "marketing intermediaries", "the political environment", "citizen-action publics"], ans:0 , exp:"البيئة الديموغرافية = أكثر القوى الكلية تأثيراً على The Landing — مثل التغيرات في الفئات العمرية للمستهلكين." , expW:{1:"Technological environment = تؤثر لكن ليست الأكبر", 2:"Marketing intermediaries = جزء من الـ microenvironment لا macro", 3:"Political environment = تؤثر عبر التشريعات", 4:"Citizen-action publics = جزء من الـ microenvironment"} },
  { ch:"ch3", diff:"medium", q:"Which of the following generational groups is most likely to represent the present owners of cottages surrounding Witmer Lake?", opts:["Baby Boomers", "Echo Boomers", "Gen Xers", "Lost Generation", "Millennials"], ans:2 , exp:"Gen Xers (مواليد 1965-1980) = في مرحلة منتصف العمر الآن — الأكثر احتمالاً لامتلاك بيوت الأكواخ حول بحيرة Witmer." , expW:{0:"Baby Boomers = أكبر سناً — قد يكون لهم أكواخ لكن Gen X أكثر احتمالاً الآن", 1:"Echo Boomers = Millennials — أصغر سناً وأقل احتمالاً لامتلاك أكواخ", 3:"Lost Generation = جيل قديم جداً", 4:"Millennials = لا يزالون صغاراً نسبياً في القدرة الشرائية للأكواخ"} },
  { ch:"ch3", diff:"easy", q:"The physical environment affecting marketing activities is referred to as the ________ environment.", opts:["economic", "natural", "cultural", "political", "social"], ans:1 , exp:"النظر إلى البيئة الطبيعية باعتبارها قوة بيئية كلية تؤثر على الموارد الخام وتكاليف الطاقة وتوجهات الاستدامة." , expW:{0:"Economic environment = القوة الشرائية وأنماط الإنفاق", 2:"Cultural environment = القيم والمعتقدات والأعراف", 3:"Political environment = القوانين والجهات الحكومية", 4:"Social environment = ليست تصنيفاً رسمياً في الـ macro"} },
  { ch:"ch3", diff:"medium", q:"The environmental sustainability movement encourages companies to ________.", opts:["actively resist social change", "operate freely in the black market", "go beyond government regulations", "institute deregulation", "curb organizational anarchy"], ans:2 , exp:"Environmental sustainability = تُشجع حركة الاستدامة الشركات على تجاوز اشتراطات الحكومة والتصرف بمسؤولية بيئية أكبر." , expW:{0:"Environmental sustainability تشجع التغيير الاجتماعي — لا تقاومه", 1:"لا علاقة لها بالسوق السوداء", 3:"Deregulation = إلغاء القيود — عكس الاستدامة", 4:"Anarchy = فوضى — لا علاقة بالاستدامة"} },
  { ch:"ch3", diff:"medium", q:"As a consequence of the concern for the natural environment, many companies are developing strategies and practices that support ________.", opts:["government intervention", "environmental sustainability", "deregulation", "mass marketing", "rapid exploitation of natural resources"], ans:1 , past:true, exp:"Environmental sustainability = الاستدامة البيئية: تلبية احتياجات الحاضر دون المساس بقدرة الأجيال القادمة. الشركات تستجيب بمبادرات خضراء.", expW:{0:"Government intervention = تدخل حكومي",2:"Deregulation = إلغاء القيود",3:"Mass marketing = لا علاقة له بالبيئة",4:"Rapid exploitation = العكس تماماً — استغلال سريع"} },
  { ch:"ch3", diff:"medium", q:"A firm dumping chemical wastes in the local lake is ________.", opts:["actively resisting social change", "contributing to organizational anarchy", "engaging in a \"do well by doing good\" mission", "adopting a proactive stance toward the marketing environment", "contributing to increased pollution"], ans:4 , exp:"إلقاء النفايات الكيماوية في البيئة = يُسهم في التلوث المتزايد — وهو انتهاك للمسؤولية البيئية والاجتماعية للشركة." , expW:{0:"مقاومة التغيير الاجتماعي ليست نتيجة مباشرة لإلقاء النفايات", 1:"الفوضى المؤسسية = مصطلح مختلف", 2:"Do well by doing good = الشركة تتصرف أخلاقياً — عكس ما حدث", 3:"Proactive stance = مبادرة إيجابية — عكس ما حدث"} },
  { ch:"ch3", diff:"medium", q:"New technologies most likely lead to ________.", opts:["economic imbalance in society", "reduced exports", "trade deficits", "an increased demand for unskilled labor", "new markets and opportunities"], ans:4 , exp:"التكنولوجيا الجديدة = تخلق أسواقاً وفرصاً جديدة مع تدمير الصناعات القديمة — أسرع القوى البيئية تأثيراً." , expW:{0:"التكنولوجيا تساعد على توازن الاقتصاد لا اختلاله", 1:"التكنولوجيا تزيد الصادرات عموماً لا تُقلّلها", 2:"التكنولوجيا تُحسّن الميزان التجاري عموماً", 3:"التكنولوجيا تُقلل الطلب على العمالة غير الماهرة — عكس ما ذُكر"} },
  { ch:"ch3", diff:"medium", q:"Many firms today use RFID technology to ________.", opts:["identify new target markets", "analyze threats and opportunities in the macroenvironment", "move toward environmental sustainability", "track products through various points in the distribution channel", "track patterns of online consumer behavior"], ans:3 , exp:"RFID technology = تُستخدم لتتبع المنتجات في قنوات التوزيع — تُحسّن إدارة المخزون وسلسلة التوريد." , expW:{0:"RFID لا تُستخدم أساساً لتحديد أسواق جديدة", 1:"RFID أداة تشغيلية لا تحليلية للـ macro", 2:"RFID لا تعمل مباشرة على الاستدامة", 4:"RFID تتبع المنتجات في التوزيع لا سلوك المستهلك الإلكتروني"} },
  { ch:"ch3", diff:"medium", q:"Many companies use RFID product labels on their goods, which exemplifies the ________ environment in business.", opts:["natural", "political", "economic", "demographic", "technological"], ans:4 , exp:"RFID = مثال على تأثير البيئة التكنولوجية في عمليات الأعمال — يُعبّر عن قوة التكنولوجيا في تحسين التوزيع." , expW:{0:"Natural environment = البيئة الطبيعية والموارد", 1:"Political environment = القوانين والتشريعات", 2:"Economic environment = القوة الشرائية والإنفاق", 3:"Demographic environment = خصائص السكان"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is most likely a result of regulations set up by the Food and Drug Administration and the Consumer Product Safety Commission?", opts:["The time between new product ideas and their introduction to the market has decreased.", "Annual spending on research and development has decreased.", "Research costs for companies have risen.", "Product innovation has significantly declined.", "Marketers have grown increasingly apathetic toward meeting safety standards."], ans:2 , exp:"لوائح FDA وCPSC = تزيد من تكاليف البحث والتطوير وتطيل الوقت اللازم بين ابتكار المنتج وإطلاقه." , expW:{0:"اللوائح تُطيل وقت الإطلاق — لا تُقصّره", 1:"ميزانية R&D ترتفع بسبب اللوائح لا تنخفض", 3:"الابتكار ليس في تراجع دائماً — اللوائح تُشجع الابتكار الآمن", 4:"الشركات تُركز على معايير السلامة — لا تتجاهلها"} },
  { ch:"ch3", diff:"hard", q:"Trends in the natural environment include all of the following EXCEPT ________.", opts:["increased government intervention", "the development of an environmental sustainability movement", "increased pollution", "decreased costs of product development", "shortages of raw materials"], ans:3 , past:true, exp:"اتجاهات البيئة الطبيعية: تدخل حكومي متزايد + حركة الاستدامة + تلوع متزايد + نقص الموارد الخام. تكلفة تطوير المنتج لا علاقة لها بالبيئة الطبيعية.", expW:{0:"تدخل حكومي متزايد ✓",1:"حركة الاستدامة ✓",2:"تلوث متزايد ✓",4:"نقص المواد الخام ✓"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is a true statement about the benefits of RFID technology?", opts:["It allows firms to track products and customers at various points in the distribution channel.", "The chips are used to track shipments but not individual items.", "The chips do not risk invading people's privacy.", "Sharing of data decreases the buying experience for consumers.", "The technology will be available for the foreseeable future, allowing companies to fully invest in its capabilities."], ans:0 , exp:"RFID = تتيح للشركات تتبع المنتجات والعملاء في نقاط مختلفة من قناة التوزيع — تحسّن الكفاءة." , expW:{1:"RFID تتبع الشحنات والمنتجات الفردية أيضاً", 2:"RFID تطرح مخاوف خصوصية", 3:"مشاركة البيانات تُحسّن تجربة المستهلك", 4:"التكنولوجيا تتطور — لا يمكن الاعتماد عليها إلى الأبد"} },
  { ch:"ch3", diff:"hard", q:"Regulations force companies to be responsible. However, most companies want to be responsible. Impacts of government regulations include all of the following EXCEPT ________.", opts:["informing the public that products are safe", "higher research costs", "increased sales because they have been found to be safe", "penalties to companies that fail to meet the regulations", "longer times between new product ideas and their introduction"], ans:0 , exp:"لوائح الحكومة تُلزم الشركات بالمسؤولية — لكن معظم آثارها إيجابية (سلامة المنتجات وثقة المستهلك) وليست سلبية." , expW:{1:"تكاليف أبحاث أعلى = تأثير حقيقي للوائح", 2:"زيادة المبيعات بعد التحقق من الأمان = تأثير إيجابي", 3:"غرامات على الشركات المخالفة = تأثير حقيقي", 4:"وقت أطول من الفكرة للإطلاق = تأثير حقيقي"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is the macroenvironmental force that benefitted The Landing the most?", opts:["the legal environment", "the natural environment", "the economic environment", "the political environment", "the technological environment"], ans:1 , exp:"البيئة الطبيعية = أكثر القوى الكلية استفادةً لـ The Landing — مثل موقعها الطبيعي الذي يجذب السياح.", expW:{0:"Legal environment = القوانين والتشريعات — لا تُوفر ميزة مباشرة لموقع طبيعي", 2:"Economic environment = القوة الشرائية وأنماط الإنفاق", 3:"Political environment = القوانين والجهات الحكومية", 4:"Technological environment = التكنولوجيا الجديدة والابتكار"} },
  { ch:"ch3", diff:"medium", q:"The ________ prohibits monopolies and activities (price-fixing, predatory pricing) that restrain trade or competition in interstate commerce.", opts:["Sherman Antitrust Act", "Lanham Trademark Act", "Fair Packaging and Labeling Act", "CAN-SPAM Act", "Magnuson-Moss Warranty Act"], ans:0 , exp:"Sherman Antitrust Act = قانون يحظر الاحتكار وممارسات تقييد التجارة مثل تثبيت الأسعار والتسعير الجائر في التجارة بين الولايات." , expW:{1:"Lanham Trademark Act = يحمي العلامات التجارية", 2:"Fair Packaging and Labeling Act = يُنظم التغليف والتسمية", 3:"CAN-SPAM Act = يُنظم الرسائل التجارية الإلكترونية", 4:"Magnuson-Moss Warranty Act = يُنظم ضمانات المنتجات"} },
  { ch:"ch3", diff:"medium", q:"The ________ limits the number of commercials aired during children's programs.", opts:["Children's Online Privacy Protection Act", "Child Protection Act", "Fair Packaging and Labeling Act", "Children's Television Act", "Consumer Product Safety Act"], ans:3 , exp:"Children's Television Act = قانون يُقيّد عدد الإعلانات التجارية في برامج الأطفال لحمايتهم من التأثير التسويقي المفرط." , expW:{0:"Children's Online Privacy Protection Act = يحمي خصوصية الأطفال على الإنترنت", 1:"Child Protection Act = يحمي الأطفال من الإساءة", 2:"Fair Packaging and Labeling Act = يُنظم التغليف", 4:"Consumer Product Safety Act = يضمن سلامة المنتجات"} },
  { ch:"ch3", diff:"medium", q:"The ________ environment consists of laws, government agencies, and pressure groups that influence or limit various organizations and individuals in a given society.", opts:["socio-legal", "cultural", "political", "technological", "economic"], ans:2 , exp:"البيئة السياسية/القانونية = القوانين والجهات الحكومية وجماعات الضغط التي تُقيّد وتؤثر على قرارات التسويق." , expW:{0:"Socio-legal = مصطلح غير رسمي", 1:"Cultural environment = القيم والمعتقدات والأعراف", 3:"Technological environment = التكنولوجيا الجديدة والابتكار", 4:"Economic environment = القوة الشرائية وأنماط الإنفاق"} },
  { ch:"ch3", diff:"medium", q:"Governments develop public policy to ________.", opts:["encourage deregulation", "identify demographic patterns", "identify cultural patterns", "guide commerce", "protect marketers"], ans:3 , exp:"الحكومات تُطوّر سياسات عامة لتوجيه التجارة وحماية المجتمع من الممارسات الضارة." , expW:{0:"الحكومات تُنظّم التجارة — لا تُشجع إلغاء القيود", 1:"الأنماط الديموغرافية = مهمة إحصائياً لكن ليست هدف السياسة العامة", 2:"الأنماط الثقافية = دراسة اجتماعية لا هدف مباشر للسياسة", 4:"الحكومات تحمي المجتمع — لا المسوقين تحديداً"} },
  { ch:"ch3", diff:"hard", q:"Laws in the United States and many other countries have many business-oriented laws covering issues such as competition, environmental protection, pricing, packaging and labeling, product safety, truth in advertising, consumer privacy, and ________.", opts:["land ownership", "taxation", "fair-trade practices", "education", "interdepartmental communication"], ans:2 , exp:"قوانين الأعمال تُغطي: المنافسة، حماية البيئة، التسعير، التغليف والتسمية، سلامة المنتجات، الصدق في الإعلان، وخصوصية المستهلك." , expW:{0:"ملكية الأراضي = تُنظَّم بقوانين العقارات لا قوانين الأعمال", 1:"الضرائب = قوانين مالية منفصلة", 3:"التعليم = قطاع منفصل", 4:"التواصل بين الأقسام = شأن داخلي للشركة"} },
  { ch:"ch3", diff:"medium", q:"Business legislation is enacted to protect ________.", opts:["consumers from unfair business practices", "businesses from unfair attacks by consumers", "consumers from competition by businesses", "businesses from achieving unfairly high profits", "society from profitable business activity"], ans:0 , exp:"قوانين الأعمال تُسنّ لحماية المستهلكين من الممارسات التجارية غير العادلة — وليس لحماية الشركات." , expW:{1:"قوانين الأعمال تحمي المستهلكين من الشركات — لا العكس", 2:"قوانين الأعمال لا تحمي المستهلكين من المنافسة", 3:"الأرباح المرتفعة ليست هدف القوانين لتقليصها", 4:"الأنشطة التجارية المربحة لا تُحظر بالقانون"} },
  { ch:"ch3", diff:"medium", q:"Laws are passed to define and prevent unfair competition primarily because ________.", opts:["business executives tend to favor pure monopolies", "businesses sometimes try to neutralize threatening firms", "governments in free market economies tend to nationalize ailing firms", "private lobbying hurts the interests of national and state governments", "most multinational entities in advanced economies are averse to invest in emerging markets"], ans:1 , exp:"قوانين منع المنافسة غير العادلة = تمنع الشركات من تحييد المنافسين بطرق غير مشروعة وتضمن السوق التنافسي." , expW:{0:"الاحتكار الكامل = الأعمال لا تفضّله عموماً", 2:"الحكومات في الاقتصاد الحر لا تُأمّم الشركات المتعثرة عادةً", 3:"الضغط السياسي الخاص قد يُؤثر على الحكومات إيجاباً", 4:"الشركات متعددة الجنسية تستثمر في الأسواق الناشئة"} },
  { ch:"ch3", diff:"medium", q:"Funco Inc., a toy manufacturer, sold plastic racing cars that were manufactured with toxic materials, which threatened the health of several children. Which purpose of government regulation to protect consumers is involved?", opts:["misleading customers in their advertising", "deceiving consumers through their packaging", "making shoddy products", "deceiving consumers through their pricing", "invading consumer privacy"], ans:2 , exp:"قوانين حماية المستهلك تهدف لمنع بيع منتجات رديئة أو غير آمنة — مثال: ألعاب أطفال مصنوعة من مواد سامة." , expW:{0:"التضليل الإعلاني = مشكلة مختلفة", 1:"الخداع في التغليف = مشكلة مختلفة", 3:"الخداع في التسعير = مشكلة مختلفة", 4:"انتهاك الخصوصية = مشكلة مختلفة"} },
  { ch:"ch3", diff:"medium", q:"A company or association's ________ is designed to help guide responses to complex social responsibility issues.", opts:["code of ethics", "marketing plan", "non-disclosure policy", "privacy policy", "non-compete clause"], ans:0 , exp:"Code of ethics = وثيقة رسمية تُرشد الشركة والموظفين في الاستجابة للمواقف الأخلاقية والمسؤولية الاجتماعية المعقدة." , expW:{1:"Marketing plan = خطة تسويقية لتحقيق الأهداف — ليست توجيهاً أخلاقياً", 2:"Non-disclosure policy = سياسة حماية المعلومات السرية", 3:"Privacy policy = سياسة حماية بيانات العملاء", 4:"Non-compete clause = بند عدم المنافسة في العقود"} },
  { ch:"ch3", diff:"medium", q:"The boom in Internet marketing has created a new set of social and ethical issues. Critics worry most about ________.", opts:["accessibility", "puffery in advertising", "online privacy issues", "sustainability", "issues pertaining to efficiency"], ans:2 , exp:"التسويق الإلكتروني أثار مخاوف حول خصوصية المستهلك عبر الإنترنت — من أكثر القضايا الأخلاقية إثارةً للجدل." , expW:{0:"Accessibility = سهولة الوصول — مشكلة مختلفة", 1:"Puffery = مبالغة في الإعلان — موجودة لكن ليست المخاوف الأكبر", 3:"Sustainability = الاستدامة — مهمة لكن ليست أبرز مشكلة إنترنت", 4:"Efficiency issues = الكفاءة — ليست مخاوف أخلاقية"} },
  { ch:"ch3", diff:"hard", q:"Cause-related marketing has become a primary form of ________.", opts:["quality control", "corporate fraud protection", "corporate giving", "legislative lobbying", "price discrimination"], ans:2 , exp:"Cause-related marketing = أصبح الشكل الرئيسي للعطاء المؤسسي — يُحقق مكاسب تسويقية ويدعم قضايا اجتماعية." , expW:{0:"Quality control = ضبط الجودة في الإنتاج", 1:"Corporate fraud protection = مكافحة الاحتيال المؤسسي", 3:"Legislative lobbying = الضغط التشريعي", 4:"Price discrimination = التمييز السعري"} },
  { ch:"ch3", diff:"medium", q:"A regional supermarket chain runs print, radio, and television advertisements announcing that 1 percent of its sales is donated to local after-school programs for underprivileged youth. This is an example of ________.", opts:["cause-related marketing", "generational marketing", "sustainable marketing", "market segmentation", "product differentiation"], ans:0 , exp:"Cause-related marketing = ربط مبيعات الشركة بدعم قضية اجتماعية (مثل برامج ما بعد المدرسة) لتعزيز صورة العلامة التجارية." , expW:{1:"Generational marketing = استهداف الأجيال المختلفة", 2:"Sustainable marketing = تسويق مستدام بيئياً", 3:"Market segmentation = تقسيم السوق إلى شرائح", 4:"Product differentiation = تمييز المنتج عن المنافسين"} },
  { ch:"ch3", diff:"medium", q:"The ________ environment consists of institutions and other forces that affect a society's basic values, perceptions, preferences, and behaviors.", opts:["social", "cultural", "political", "physical", "natural"], ans:1 , exp:"البيئة الثقافية = المؤسسات والقوى التي تشكّل القيم الأساسية للمجتمع وتصوراته وتفضيلاته وسلوكياته." , expW:{0:"Social environment = ليست تصنيفاً رسمياً في الـ macro", 2:"Political environment = القوانين والجهات الحكومية", 3:"Physical environment = وصف للبيئة الطبيعية", 4:"Natural environment = الموارد الطبيعية والاستدامة"} },
  { ch:"ch3", diff:"medium", q:"Marketers should understand that people's core beliefs and values tend to be ________.", opts:["fixed", "highly flexible", "similar around the world", "constantly and rapidly changing", "easily influenced by secondary beliefs"], ans:0 , exp:"Core beliefs = القيم الأساسية ثابتة وراسخة — تُبنى في مرحلة الطفولة وتُعزّزها الأسرة والتعليم والدين وتقاوم التغيير." , expW:{1:"Highly flexible = وصف للـ secondary beliefs — ليس core", 2:"Similar worldwide = غير صحيح — الثقافات تختلف في core beliefs", 3:"Constantly changing = وصف للـ secondary beliefs", 4:"Easily influenced = صفة secondary beliefs لا core"} },
  { ch:"ch3", diff:"hard", q:"Babita Singh, a 51-year-old schoolteacher from Los Angeles, believes that people should choose a profession they like, which is an example of Babita's ________.", opts:["secondary belief", "core belief", "core value", "work ethic", "moral code"], ans:0 , exp:"Secondary belief = معتقد ثانوي قابل للتغيير — مثل اختيار المهنة بناءً على الشغف، خلافاً للمعتقدات الأساسية الراسخة." , expW:{1:"Core belief = معتقد راسخ مقاوم للتغيير — اختيار المهنة قابل للتغيير", 2:"Core value = قيمة راسخة كالنزاهة والعدل", 3:"Work ethic = أخلاقيات العمل (مجهود ودقة)", 4:"Moral code = مبادئ أخلاقية عامة"} },
  { ch:"ch3", diff:"easy", q:"A pastor from Kansas believes that adultery is immoral. This refers to the pastor's ________.", opts:["secondary belief", "acquired belief", "social identity", "core belief", "cultural orientation"], ans:3 , exp:"Core belief = معتقد ديني أخلاقي أساسي راسخ يصعب تغييره — يُبنى في الطفولة ويتعزز بمؤسسات الدين والمجتمع." , expW:{0:"Secondary belief = معتقد قابل للتغيير — الزنا يعتبر أساسياً لا ثانوياً", 1:"Acquired belief = مصطلح غير رسمي", 2:"Social identity = هوية اجتماعية — مختلفة", 4:"Cultural orientation = توجه ثقافي عام"} },
  { ch:"ch3", diff:"medium", q:"Mercury Inc., an American multinational corporation, is currently planning to enter the promising consumer goods market in India. The firm will most likely discover that ________ beliefs and values are more open to change in India.", opts:["inherited", "secondary", "primary", "core", "traditional"], ans:1 , exp:"Secondary beliefs = المعتقدات الثانوية أكثر انفتاحاً على التغيير — يستطيع المسوقون التأثير فيها مقارنةً بالمعتقدات الأساسية." , expW:{0:"Inherited beliefs = مرادفة للـ core beliefs — أقل قابلية للتغيير", 2:"Primary beliefs = مرادفة للـ core beliefs — أقل قابلية للتغيير", 3:"Core beliefs = راسخة يصعب تغييرها", 4:"Traditional beliefs = مرادفة للـ core — صعبة التغيير"} },
  { ch:"ch3", diff:"medium", q:"A society's ________ are expressed in how people view themselves and others, organizations, society, nature, and the universe.", opts:["social codes", "cultural values", "demographics", "public policies", "norms"], ans:1, past:true, exp:"Cultural values = القيم الثقافية. تُعبَّر عنها في كيفية نظر الناس لأنفسهم، للآخرين، للمجتمع، للطبيعة. أساس السلوك الاستهلاكي.", expW:{0:"Social codes = قواعد السلوك الاجتماعي",2:"Demographics = بيانات إحصائية (عمر، جنس)",3:"Public policies = سياسات عامة",4:"Norms = معايير سلوكية"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is most likely true with regard to people's views of organizations in contemporary America?", opts:["In the American workplace, there has been an overall increase in organizational loyalty.", "Most Americans are confident in their employers and are unlikely to switch jobs as frequently as in the past.", "The past two decades have seen a sharp decrease in confidence in and loyalty toward America's business organizations.", "Most U.S. workers view work as a source of personal satisfaction and organizational pride.", "In the last decade, corporate scandals and layoffs had little impact on people's confidence in U.S. firms."], ans:2 , exp:"الثقة في المنظمات الأمريكية تراجعت بشكل حاد في العقدين الماضيين نتيجة الفضائح المؤسسية وموجات التسريح." , expW:{0:"الولاء المؤسسي تراجع — لم يتزايد", 1:"الثقة بأصحاب العمل تراجعت وتنقل الموظفين ارتفع", 3:"معظم الموظفين يشعرون بعدم الرضا بسبب الفضائح", 4:"الفضائح والتسريح أثّرت بشكل كبير على الثقة"} },
  { ch:"ch3", diff:"medium", q:"People vary in their attitudes toward their society—while ________ defend it, malcontents want to leave it.", opts:["reformers", "patriots", "activists", "environmentalists", "historical revisionists"], ans:1 , exp:"الناس يختلفون في علاقتهم بمجتمعهم: الوطنيون يدافعون عنه، والساخطون يريدون مغادرته — وهذا يؤثر على استجابتهم للتسويق." , expW:{0:"Reformers = المصلحون — يسعون لتغييرها", 2:"Activists = الناشطون — يسعون للتغيير", 3:"Environmentalists = البيئيون — يُركزون على الطبيعة", 4:"Historical revisionists = مراجعو التاريخ — فئة مختلفة"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is a potential downside to using patriotic themes in marketing programs?", opts:["Consumers rarely respond to patriotic marketing messages in a favorable manner.", "A consumer's societal orientation has no visible impact on product consumption.", "Patriotism could be viewed as an attempt to cash in on the nation's emotions.", "Patriotic Americans may have less disposable income than reformers.", "Mass marketing has limited appeal among patriotic Millennials."], ans:2 , exp:"الخطر في التسويق الوطني = قد يُنظر إليه على أنه استغلال تجاري لمشاعر الناس الوطنية." , expW:{0:"المستهلكون يستجيبون للتسويق الوطني بشكل إيجابي في الغالب", 1:"التوجه المجتمعي يؤثر على الاستهلاك بشكل مرئي", 3:"الوطنيون لا يفتقرون بالضرورة للدخل المتاح", 4:"التسويق الجماهيري يمكن أن يصل للـ Millennials أيضاً"} },
  { ch:"ch3", diff:"medium", q:"Consumers in the \"lifestyles of health and sustainability\" market are more likely to seek ________.", opts:["alternative medicine", "perfumes made from animal products", "clothing made of fur", "leather goods", "foods high in saturated fat"], ans:0 , exp:"LOHAS market = مستهلكون يسعون لأسلوب حياة صحي ومستدام — يُفضّلون الطب البديل والمنتجات الطبيعية والأغذية العضوية." , expW:{1:"العطور من منتجات حيوانية = تتعارض مع قيم LOHAS", 2:"ملابس الفرو = تتعارض مع الاستدامة والحيوانات", 3:"المنتجات الجلدية = قد تتعارض مع قيم LOHAS", 4:"الأطعمة الغنية بالدهون المشبعة = تتعارض مع نمط الحياة الصحي"} },
  { ch:"ch3", diff:"medium", q:"The fact that people are dropping out of organized religion doesn't mean that they are abandoning their faith. Some futurists have noted a renewed interest in ________, perhaps as a part of a broader search for a new inner purpose.", opts:["interacting with nature", "the fine arts", "charitable giving", "spirituality", "materialism"], ans:3 , exp:"اتجاه ثانوي قابل للتغيير = ابتعاد الناس عن الأديان المنظمة مع بحثهم عن الروحانية كجزء من رحلة داخلية." , expW:{0:"التفاعل مع الطبيعة = قريب لكن ليس الإجابة الأشمل", 1:"الفنون الجميلة = اهتمام ثقافي لا روحاني", 2:"العطاء الخيري = فعل اجتماعي لا بحث روحاني", 4:"المادية = عكس الروحانية"} },
  { ch:"ch3", diff:"medium", q:"Josie's FarmFresh creates sustainable, all-natural food products. These products are most likely to become popular with which group?", opts:["SOHO", "environmentally conscious", "LGBT", "business", "Millennials'"], ans:1 , exp:"المستهلكون المهتمون بالبيئة = شريحة سوقية متنامية تفضل المنتجات الطبيعية والمستدامة — هدف رئيسي لـ Josie's FarmFresh." , expW:{0:"SOHO = عاملون من المنزل — لا يتمحور اهتمامهم حول الاستدامة", 2:"LGBT = شريحة مختلفة التفضيلات", 3:"Business market = يشترون للإنتاج لا للاستهلاك الشخصي", 4:"Millennials = شريحة تهتم بالبيئة لكن ليست الأدق للمنتجات الطبيعية"} },
  { ch:"ch3", diff:"medium", q:"Rather than assuming that strategic options are bounded by the current environment, firms adopting a(n) ________ to the marketing environment develop strategies to change the environment.", opts:["environmental stance", "proactive stance", "reactive stance", "relativist approach", "no-compromise approach"], ans:1 , exp:"Proactive stance = الشركات التي تطور استراتيجيات لتغيير البيئة التسويقية بدلاً من مجرد التكيف معها." , expW:{0:"Environmental stance = مصطلح عام غير محدد", 2:"Reactive stance = التكيف مع البيئة دون تغييرها — عكس المطلوب", 3:"Relativist approach = مصطلح فلسفي لا تسويقي", 4:"No-compromise approach = مصطلح تفاوضي لا تسويقي"} },
  { ch:"ch3", diff:"medium", q:"Companies that take a proactive stance toward the marketing environment are most likely to ________.", opts:["develop strategies to change the environment in their favor", "passively accept the marketing environment", "resist organizational change", "discourage innovation", "consider technological advances more disruptive than beneficial"], ans:0 , past:true, exp:"Proactive stance = الموقف الاستباقي: تطوير استراتيجيات لتغيير البيئة لصالح الشركة (مثل التلاعب بالقوانين عبر الضغط). عكسه Reactive = قبول سلبي.", expW:{1:"Passively accepting = reactive stance (موقف سلبي)",2:"Resist change = مخالف لروح الاستباقية",3:"Discourage innovation = مخالف",4:"Technology disruptive = موقف سلبي"} },
  { ch:"ch3", diff:"hard", q:"Katrina Mendoza is a senior manager in a manufacturing firm that hires lobbyists to influence legislation that affects the manufacturing industry. Katrina's firm takes a(n) ________ stance toward the marketing environment.", opts:["reactive", "proactive", "adversarial", "passive", "altruistic"], ans:1 , exp:"Proactive stance = توظيف لوبيين للتأثير على التشريعات = نهج استباقي لتشكيل البيئة التسويقية لصالح الشركة." , expW:{0:"Reactive = التكيف مع التغيير — الضغط التشريعي هو التأثير لا التكيف", 2:"Adversarial = عدائي — الضغط التشريعي قانوني", 3:"Passive = سلبي — عكس ما فعلته Katrina", 4:"Altruistic = تطوعي غير أناني — الضغط لصالح الشركة"} },
  { ch:"ch3", diff:"medium", q:"Which of the following is most likely influenced by marketers?", opts:["population shifts", "core cultural values", "income distribution", "ethnic diversity", "media"], ans:4 , exp:"المسوقون يستطيعون التأثير في وسائل الإعلام أكثر من غيرها — عبر الإعلانات والعلاقات العامة وإدارة المحتوى." , expW:{0:"Population shifts = تتشكّل بعوامل اجتماعية وديموغرافية", 1:"Core cultural values = راسخة يصعب تغييرها", 2:"Income distribution = تتحدد بالسياسات الاقتصادية والضرائب", 3:"Ethnic diversity = تتشكّل بالهجرة والمواليد"} },
  { ch:"ch3", diff:"medium", q:"Companies and their products often create ________.", opts:["new consumers", "new technologies", "new industries and their structures", "new advertising campaigns", "new manufacturing methods"], ans:2 , exp:"الشركات ومنتجاتها كثيراً ما تُنشئ صناعات جديدة وتعيد تشكيل هياكلها — كما فعل الإنترنت والهواتف الذكية." , expW:{0:"New consumers = يوجدون مسبقاً — الشركات تستهدفهم", 1:"New technologies = الشركات تستخدمها لا تصنعها دائماً", 3:"New advertising campaigns = وسيلة لا نتيجة", 4:"New manufacturing methods = عملية داخلية"} },
  { ch:"ch3", diff:"hard", q:"Which of the following is a PROACTIVE response to the marketing environment?", opts:["Adapting prices to match inflation","Lobbying government to change unfavorable regulations","Withdrawing products during economic downturns","Waiting for competitor moves before acting","Reducing marketing spend when the environment is uncertain"], ans:1, exp:"Proactive approach = محاولة تغيير البيئة بدلاً من مجرد التكيف. Lobbying = تغيير القانون بشكل نشط. الباقية كلها reactive (تكيّف مع البيئة).", expW:{0:"Adapting prices = reactive",2:"Withdrawing products = reactive",3:"Waiting for competitors = reactive",4:"Reducing spend = reactive"} },
  { ch:"ch3", diff:"hard", q:"All of the following are types of publics in the microenvironment EXCEPT ___.", opts:["Financial publics","Media publics","Government publics","Demographic publics","Citizen-action publics"], ans:3, exp:"أنواع Publics: Financial, Media, Government, Citizen-action, Local, General, Internal. Demographic = فئة من الـ Macroenvironment وليست نوعاً من الـ publics.", expW:{0:"Financial publics = بنوك ومستثمرون",1:"Media publics = صحف وتلفزيون",2:"Government publics = هيئات حكومية",4:"Citizen-action = جمعيات وجماعات ضغط"} },
  { ch:"ch3", diff:"hard", q:"A consumer goods company notices its target demographic is rapidly aging. Which macroenvironmental force is this?", opts:["Economic environment","Cultural environment","Technological environment","Demographic environment","Political environment"], ans:3, exp:"التغير في تركيبة السكان العمرية = Demographic environment. هذا أحد أهم القوى الكبرى التي يتابعها المسوقون.", expW:{0:"Economic = أسعار ودخل وتضخم",1:"Cultural = قيم ومعتقدات وأنماط حياة",2:"Technological = ابتكارات تقنية",4:"Political = قوانين وتشريعات"} },
  // ══════════════ Chapter 5 — 114 questions ══════════════
  { ch:"ch5", diff:"medium", q:"Individuals and households that buy or acquire goods and services for personal consumption make up the ________.", opts:["consumer market", "market offering", "market mix", "subculture", "social class"], ans:0, exp:"Consumer market = الأفراد والأسر الذين يشترون السلع والخدمات للاستهلاك الشخصي. هذا هو التعريف المباشر للسوق الاستهلاكي." , expW:{1:"Market offering = ما تعرضه الشركة لإشباع حاجة",2:"Market mix = المزيج التسويقي 4Ps",3:"Subculture = مجموعة تشترك في قيم مشتركة",4:"Social class = تقسيم المجتمع بالدخل والتعليم"}},
  { ch:"ch5", diff:"medium", q:"Marketing stimuli include which of the following?", opts:["economic stimuli", "price stimuli", "technological stimuli", "social stimuli", "cultural stimuli"], ans:1, exp:"Marketing stimuli = مثيرات التسويق وتشمل الـ 4Ps (المنتج والسعر والمكان والترويج). السعر price هو أحد عناصر المزيج التسويقي." , expW:{0:"Economic stimuli = مثيرات بيئية اقتصادية لا تسويقية",2:"Technological stimuli = مثيرات بيئية تكنولوجية لا تسويقية",3:"Social stimuli = مثيرات بيئية اجتماعية لا تسويقية",4:"Cultural stimuli = مثيرات بيئية ثقافية لا تسويقية"}},
  { ch:"ch5", diff:"medium", q:"Which of the following is one of the other stimuli present in a buyer's environment apart from marketing stimuli?", opts:["product stimuli", "cultural stimuli", "price stimuli", "place stimuli", "promotion stimuli"], ans:1, exp:"المثيرات الأخرى في بيئة المشتري (غير التسويقية) = اقتصادية، تكنولوجية، سياسية، ثقافية. الثقافة cultural هي المثير البيئي الصحيح هنا." , expW:{0:"Product stimuli = جزء من المزيج التسويقي (4Ps)",2:"Price stimuli = جزء من المزيج التسويقي (4Ps)",3:"Place stimuli = جزء من المزيج التسويقي (4Ps)",4:"Promotion stimuli = جزء من المزيج التسويقي (4Ps)"}},
  { ch:"ch5", diff:"medium", q:"Companies can research many aspects of buying decisions. However, the one that is the most difficult to identify is ________.", opts:["what consumers buy", "how and how much they buy", "why they buy", "when they buy", "where they buy"], ans:2, exp:"الأصعب في دراسة قرارات الشراء هو معرفة السبب why — لأن المستهلكين أنفسهم لا يعرفون دوافعهم الحقيقية الكامنة في الـ black box." , expW:{0:"What consumers buy = يمكن قياسه بسجلات المبيعات",1:"How and how much = يمكن قياسه بالكميات المشتراة",3:"When they buy = يمكن تتبعه زمنياً",4:"Where they buy = يمكن تحديده جغرافياً"}},
  { ch:"ch5", diff:"medium", q:"According to the model of buyer behavior, which of the following is one of the two primary parts of a \"buyer's black box\"?", opts:["technological stimuli", "buyer's decision process", "buyer's spending habits", "social stimuli", "promotion stimuli"], ans:1, exp:"الـ buyer's black box يتكون من جزأين: خصائص المشتري (buyer characteristics) وعملية قرار الشراء (buyer's decision process). الإجابة هي buyer's decision process." , expW:{0:"Technological stimuli = مثيرات بيئية خارجية",2:"Buyer\'s spending habits = عادات الإنفاق نتيجة وليست جزءاً",3:"Social stimuli = مثيرات بيئية خارجية",4:"Promotion stimuli = جزء من المزيج التسويقي"}},
  { ch:"ch5", diff:"hard", q:"Marketing stimuli consist of the four Ps. Which of the following is NOT one of these?", opts:["product", "packaging", "price", "promotion", "place"], ans:1, exp:"الـ 4Ps = Product, Price, Place, Promotion. التغليف packaging ليس أحد الـ 4Ps الأصلية — هو جزء من المنتج وليس P مستقلة." , expW:{0:"Product = أحد الـ 4Ps الأصلية",2:"Price = أحد الـ 4Ps الأصلية",3:"Promotion = أحد الـ 4Ps الأصلية",4:"Place = أحد الـ 4Ps الأصلية"}},
  { ch:"ch5", diff:"hard", q:"In the model of buyer behavior, which of the following is NOT a major type of force or event in the buyer's environment?", opts:["economic", "technological", "social", "political", "cultural"], ans:2, exp:"القوى البيئية الأخرى في نموذج Kotler لسلوك المشتري = اقتصادية، تكنولوجية، سياسية، ثقافية (Economic, Technological, Political, Cultural). 'الاجتماعية' Social ليست ضمن هذه القوى الأربع كفئة مستقلة في هذا النموذج — العوامل الاجتماعية تُصنَّف ضمن خصائص المشتري لا قوى البيئة." , expW:{0:"Economic = قوة بيئية رئيسية في نموذج سلوك المشتري",1:"Technological = قوة بيئية رئيسية في نموذج سلوك المشتري",3:"Political = قوة بيئية رئيسية في نموذج سلوك المشتري — ليست الإجابة",4:"Cultural = قوة بيئية رئيسية في نموذج سلوك المشتري"}},
  { ch:"ch5", diff:"hard", q:"Buyer responses are influenced by marketing stimuli. The responses to the stimuli include all of the following EXCEPT ________.", opts:["brand engagement", "buying attitudes", "purchasing behavior", "buying preferences", "the \"why\" regarding the responses"], ans:4, exp:"استجابات المشتري تشمل: التفاعل مع العلامة، المواقف، السلوك الشرائي، والتفضيلات. أما \"لماذا\" يستجيب فهذا سؤال بحثي صعب وليس استجابة بحد ذاته." , expW:{0:"Brand engagement = تفاعل مع العلامة (استجابة حقيقية)",1:"Buying attitudes = مواقف شرائية (استجابة حقيقية)",2:"Purchasing behavior = سلوك الشراء (استجابة حقيقية)",3:"Buying preferences = تفضيلات الشراء (استجابة حقيقية)"}},
  { ch:"ch5", diff:"easy", q:"________ is the most basic determinant of a person's wants and behavior.", opts:["Culture", "Brand personality", "Cognitive dissonance", "Motive", "Attitude"], ans:0, exp:"Culture = الثقافة هي المحدد الأساسي لرغبات وسلوك الإنسان. يتعلمها الفرد من الأسرة والمؤسسات الاجتماعية منذ الطفولة." , expW:{1:"Brand personality = صفات إنسانية تُنسب لعلامة تجارية",2:"Cognitive dissonance = قلق ما بعد الشراء",3:"Motive = حاجة ملحّة تدفع للتصرف",4:"Attitude = تقييمات ومشاعر ثابتة نحو شيء"}},
  { ch:"ch5", diff:"medium", q:"Each culture contains smaller ________, or groups of people with shared value systems based on common life experiences and situations.", opts:["cultural universals", "reference groups", "subcultures", "monocultures", "social networks"], ans:2, exp:"Subculture = ثقافة فرعية: مجموعات داخل الثقافة الكبرى تشترك في قيم وتجارب مشتركة مثل الجنسيات والأديان والمناطق الجغرافية." , expW:{0:"Cultural universals = سمات مشتركة عبر كل الثقافات",1:"Reference groups = مجموعات تؤثر على الفرد",3:"Monocultures = ثقافة واحدة متجانسة",4:"Social networks = شبكات التواصل الاجتماعي"}},
  { ch:"ch5", diff:"medium", q:"Subcultures include nationalities, religions, geographic regions, and ________.", opts:["genders", "ages", "professions", "racial groups", "income levels"], ans:3, exp:"الثقافات الفرعية تشمل: الجنسيات، الأديان، المناطق الجغرافية، والمجموعات العرقية racial groups. هذه الأربعة هي التصنيفات الرسمية للـ subcultures." , expW:{0:"Genders = الجنس ليس تصنيفاً رسمياً للثقافات الفرعية",1:"Ages = العمر ليس تصنيفاً رسمياً للثقافات الفرعية",2:"Professions = المهنة ليست تصنيفاً رسمياً للثقافات الفرعية",4:"Income levels = الدخل يُحدد الطبقة الاجتماعية لا الثقافة الفرعية"}},
  { ch:"ch5", diff:"medium", q:"Which consumer group tends to show more brand loyalty and makes shopping a family event, with children having a big say in the purchase decision?", opts:["Hispanic Americans", "African Americans", "Arab Americans", "working class consumers", "middle class consumers"], ans:0, exp:"Hispanic Americans = يتميزون بالولاء للعلامة التجارية وجعل التسوق حدثاً عائلياً مع إشراك الأطفال في قرار الشراء." , expW:{1:"African Americans = حساسون للسعر لكن مهتمون بالجودة والعلامات",2:"Arab Americans = لا تنطبق عليهم هذه الخصائص تحديداً",3:"Working class consumers = تصنيف اقتصادي لا عرقي",4:"Middle class consumers = تصنيف اقتصادي لا عرقي"}},
  { ch:"ch5", diff:"medium", q:"________ consumers are one of the fastest-growing U.S. population subsegments and are expected to surge to nearly one third of the total U.S. population by 2030.", opts:["African American", "Hispanic American", "Asian American", "Baby boomer", "Millennial"], ans:1, exp:"Hispanic Americans = أسرع شرائح السكان نمواً في أمريكا ومن المتوقع أن يشكلوا ثلث السكان بحلول 2030." , expW:{0:"African Americans = لا يُعدّون الأسرع نمواً في أمريكا",2:"Asian Americans = الأكثر ثراءً لكن ليسوا الأسرع نمواً",3:"Baby boomers = جيل لا مجموعة عرقية",4:"Millennials = جيل لا مجموعة عرقية"}},
  { ch:"ch5", diff:"hard", q:"Hispanic Americans tend to be deeply family oriented and make shopping a family affair. Older consumers are brand loyal, while younger Hispanics have shown increasing price sensitivity and willingness to choose store brands. Hispanic Americans make up a ________.", opts:["subculture", "social class", "social network", "life-cycle stage", "lifestyle"], ans:0, exp:"Hispanic Americans = مجموعة تشترك في قيم وتجارب حياتية مشتركة = subculture (ثقافة فرعية). ليسوا طبقة اجتماعية لأن الطبقة تُحدَّد بالدخل والمهنة." , expW:{1:"Social class = تُحدَّد بالدخل والتعليم والمهنة",2:"Social network = شبكة تواصل اجتماعي",3:"Life-cycle stage = مرحلة من مراحل الحياة",4:"Lifestyle = نمط الحياة (AIOs)"}},
  { ch:"ch5", diff:"medium", q:"Although more price-conscious than other population segments, ________ consumers tend to be strongly motivated by quality and selection, and give importance to brands.", opts:["lower upper", "African American", "Asian American", "Filipino", "working class"], ans:1, exp:"African American consumers = رغم حساسيتهم للسعر إلا أنهم يهتمون بالجودة والتنوع ويعطون أهمية كبيرة للعلامات التجارية." , expW:{0:"Lower upper = تصنيف طبقي اقتصادي لا عرقي",2:"Asian Americans = الأكثر ثراءً والأكثر وعياً بالعلامات",3:"Filipino = مجموعة محددة غير مذكورة في هذا السياق",4:"Working class = تصنيف اقتصادي لا عرقي"}},
  { ch:"ch5", diff:"medium", q:"________ consumers are the most affluent U.S. demographic segment and are expected to have an annual buying power approaching $1 trillion by 2017.", opts:["Hispanic American", "African American", "Asian American", "Baby boomers", "Generation X"], ans:2, exp:"Asian Americans = الشريحة الأكثر ثراءً ديموغرافياً في أمريكا مع قوة شرائية تقترب من تريليون دولار سنوياً." , expW:{0:"Hispanic Americans = الأسرع نمواً لكن ليسوا الأكثر ثراءً",1:"African Americans = مهتمون بالجودة لكن ليسوا الأكثر ثراءً",3:"Baby boomers = جيل لا مجموعة عرقية",4:"Generation X = جيل لا مجموعة عرقية"}},
  { ch:"ch5", diff:"medium", q:"________ consumers are the most brand conscious of all the ethnic groups, are extremely brand loyal, and shop frequently.", opts:["African American", "Native American", "Hispanic American", "Italian American", "Asian American"], ans:4, exp:"Asian Americans = الأكثر وعياً بالعلامات التجارية بين المجموعات العرقية، ويتمتعون بولاء شديد للعلامة ويتسوقون بتكرار." , expW:{0:"African Americans = مهتمون بالجودة والعلامات لكن ليسوا الأكثر",1:"Native Americans = لا تنطبق عليهم هذه الخاصية",2:"Hispanic Americans = يُظهرون ولاءً عالياً لكن ليسوا الأكثر",3:"Italian Americans = لا تنطبق عليهم هذه الخاصية تحديداً"}},
  { ch:"ch5", diff:"easy", q:"Many companies use ethnically specific themes in their mainstream marketing strategy because marketers have realized that insights gleaned from ethnic consumers can influence their broader markets. This type of marketing is known as ________.", opts:["total market strategy", "buzz marketing", "social networking", "word-of-mouth marketing", "life-style marketing"], ans:0, exp:"Total market strategy = استراتيجية تدمج رؤى ثقافية متخصصة في التسويق الشامل. الشركات أدركت أن فهم المستهلكين العرقيين يُثري التسويق العام." , expW:{1:"Buzz marketing = تسويق شفهي عبر المستهلكين أنفسهم",2:"Social networking = استخدام شبكات التواصل الاجتماعي",3:"Word-of-mouth marketing = توصيات شفهية بين المستهلكين",4:"Life-style marketing = تسويق قائم على نمط الحياة"}},
  { ch:"ch5", diff:"medium", q:"________ are society's relatively permanent and ordered divisions whose members share similar values, interests, and behaviors.", opts:["Social classes", "Societal norms", "Reference groups", "Universal cultures", "Social networks"], ans:0, exp:"Social classes = التقسيمات الدائمة والمرتبة في المجتمع التي يتشارك أعضاؤها قيماً واهتمامات وسلوكيات مماثلة." , expW:{1:"Societal norms = معايير اجتماعية سلوكية",2:"Reference groups = مجموعات تؤثر على الفرد",3:"Universal cultures = ثقافات كونية مشتركة",4:"Social networks = شبكات التواصل الاجتماعي"}},
  { ch:"ch5", diff:"medium", q:"Consumer purchases are influenced strongly by characteristics that marketers cannot control but must take into account, including cultural, social, psychological, and ________ characteristics.", opts:["economic", "professional", "medical", "personal", "genetic"], ans:3, exp:"العوامل الأربعة التي تؤثر على سلوك المستهلك = ثقافية، اجتماعية، نفسية، وشخصية (personal). الأسرة تندرج ضمن العوامل الاجتماعية." , expW:{0:"Economic = وضع اقتصادي لا خاصية شخصية",1:"Professional = ليست التصنيف المستخدم في الكتاب",2:"Medical = لا علاقة له بالعوامل الأربعة"}},
  { ch:"ch5", diff:"medium", q:"Which of the following statements is true of cultural factors that influence consumer behavior?", opts:["Cultural influences on buying behavior are identical across countries.", "Social classes show distinct product and brand preferences in areas such as clothing and travel.", "Subcultures include nationalities and racial groups, but exclude religions.", "Subcultures are groups within which each individual has a unique and distinct value system.", "Hispanic Americans and African Americans are examples of racially segregated groups and not subcultures."], ans:1, exp:"الطبقات الاجتماعية تُظهر تفضيلات مختلفة في المنتجات والعلامات التجارية في مجالات كالملابس والسفر. هذه حقيقة موثقة في سلوك المستهلك." , expW:{0:"خطأ — التأثيرات الثقافية تختلف بين الدول",2:"خطأ — الثقافات الفرعية تشمل الأديان أيضاً",3:"خطأ — الثقافات الفرعية تشترك في قيم مشتركة لا فريدة",4:"خطأ — Hispanic وAfrican Americans ثقافات فرعية حقيقية"}},
  { ch:"ch5", diff:"medium", q:"Which of the following statements is true of social classes?", opts:["Social classes are society's temporary divisions.", "Members of a social class have unique and distinct values, interests, and behaviors.", "People within a social class tend to exhibit similar buying behavior.", "Income is the single factor that determines social class.", "Social classes universally exhibit identical product and brand preferences."], ans:2, exp:"أفراد الطبقة الاجتماعية الواحدة يميلون لإظهار سلوك شرائي متشابه. الطبقة الاجتماعية ليست مؤقتة ولا تُحدَّد بالدخل وحده." , expW:{0:"Social classes = تقسيمات دائمة نسبياً لا مؤقتة",1:"خطأ — أعضاء الطبقة يتشاركون قيماً متشابهة لا فريدة",3:"خطأ — الطبقة تتحدد بالدخل والتعليم والمهنة معاً",4:"خطأ — الطبقات تُظهر تفضيلات متشابهة لا متطابقة"}},
  { ch:"ch5", diff:"medium", q:"Which of the following statements is true regarding social classes in the United States?", opts:["Social class is determined by income alone.", "Lines between social classes in the United States are fixed and rigid.", "Social classes show distinct product preferences in clothing and automobiles.", "Wealth is more critical than education level in measuring social class.", "People are relegated to a permanent social class in the United States."], ans:2, exp:"الطبقات الاجتماعية تُظهر تفضيلات مختلفة في الملابس والسيارات. في أمريكا الحدود بين الطبقات ليست صارمة ويمكن الانتقال بينها." , expW:{0:"خطأ — الطبقة تتحدد بعوامل متعددة لا الدخل وحده",1:"خطأ — في أمريكا الحدود مرنة وليست صارمة",3:"خطأ — التعليم مهم مثل الثروة في تحديد الطبقة",4:"خطأ — الحراك الاجتماعي ممكن في أمريكا"}},
  { ch:"ch5", diff:"medium", q:"Family is one of the ________ factors that influence consumer behavior.", opts:["regional", "social", "personal", "psychological", "business"], ans:1, exp:"الأسرة تُصنَّف ضمن العوامل الاجتماعية (social factors) التي تؤثر على سلوك المستهلك. العوامل الاجتماعية تشمل: المجموعات المرجعية، الأسرة، الأدوار والمكانة." , expW:{0:"Regional = ليست تصنيفاً من العوامل الأربعة",2:"Personal = تشمل العمر والمهنة والدخل ونمط الحياة",3:"Psychological = تشمل الدوافع والإدراك والتعلم",4:"Business = ليست تصنيفاً من العوامل الأربعة"}},
  { ch:"ch5", diff:"medium", q:"________ are groups to which an individual wishes to belong, as when a young basketball player hopes to play someday in the NBA or WNBA.", opts:["Membership groups", "Aspirational groups", "Leading adopters", "Subcultures", "Reference groups"], ans:1, exp:"Aspirational groups = مجموعات يتمنى الفرد الانتماء إليها. مختلفة عن Membership groups (التي ينتمي إليها فعلاً) والـ Reference groups (الأشمل)." , expW:{0:"Membership groups = مجموعات ينتمي إليها الفرد فعلاً",3:"Subcultures = مجموعات تشترك في قيم ثقافية مشتركة",4:"Reference groups = المصطلح الأشمل يشمل membership وaspirational"}},
  { ch:"ch5", diff:"medium", q:"A shoe manufacturing company uses ads featuring the members of a country music band with the hope that the band's fans will see them wearing the company's shoes and hence purchase the same brand of shoes. The shoe company believes that the band portrays the image of a ________ to the band's fans.", opts:["membership group", "reference group", "status symbol", "subculture", "lifestyle"], ans:1, exp:"Reference group = مجموعة مرجعية تُستخدم كمقياس للمقارنة. الفرقة الموسيقية هنا تمثل نقطة مرجعية لمحبيها في قرارات الشراء." , expW:{0:"Membership group = مجموعة ينتمي إليها الفرد فعلاً",2:"Status symbol = رمز المكانة وليس مجموعة",3:"Subculture = مجموعة ثقافية فرعية",4:"Lifestyle = نمط الحياة"}},
  { ch:"ch5", diff:"medium", q:"Word-of-mouth influence comes to consumers from family, colleagues, and ________.", opts:["investors", "athletes", "neighbors", "entertainment celebrities", "friends"], ans:4, exp:"Word-of-mouth = التأثير الشفهي يأتي من الأسرة والزملاء والأصدقاء. الأصدقاء friends هم أحد المصادر الرئيسية للتأثير الاجتماعي في قرارات الشراء." , expW:{0:"Investors = مستثمرون لا يؤثرون بشكل شفهي",1:"Athletes = رياضيون يؤثرون كمشاهير لا بشكل شخصي",2:"Neighbors = الجيران أقل تأثيراً من الأصدقاء",3:"Entertainment celebrities = مشاهير مؤثرون لكن ليسوا word-of-mouth"}},
  { ch:"ch5", diff:"hard", q:"Rachel loves fashion and is always seen wearing the trendiest fashion outfits. She actively shares her knowledge with a wide group of friends and colleagues about where to shop for the latest fashion at great deals. Most of her friends and colleagues follow her fashion tips. Rachel portrays the image of a(n) ________.", opts:["surrogate consumer", "lagging adopter", "opinion leader", "brand personality", "social networker"], ans:2, exp:"Rachel = opinion leader (قائد رأي). لديها معرفة متخصصة في الموضة وتؤثر على سلوك شراء الآخرين بفضل خبرتها ومعرفتها." , expW:{0:"Surrogate consumer = يقرر الشراء نيابة عن آخرين",1:"Lagging adopter = آخر من يتبنى المنتج الجديد",3:"Brand personality = صفات إنسانية تُنسب لعلامة",4:"Social networker = شخص نشط في شبكات التواصل"}},
  { ch:"ch5", diff:"medium", q:"________ are people within a reference group who, because of special skills, knowledge, personality, or other characteristics, exert influence on others.", opts:["Opinion leaders", "Innovators", "Surrogate consumers", "Stealth marketers", "Lagging adopters"], ans:0 , past:true, exp:"Opinion leaders = قادة الرأي. يؤثرون على الآخرين بسبب معرفتهم أو شخصيتهم. المشاهير والمؤثرون في السوشل ميديا أمثلة حديثة.", expW:{1:"Innovators = أوائل المتبنين للمنتج (2.5% الأوائل)",2:"Surrogate consumers = يقررون نيابة عن آخرين",3:"Stealth marketers = يسوّقون دون إفصاح",4:"Lagging adopters = آخر من يتبنى المنتج (16%)"} },
  { ch:"ch5", diff:"medium", q:"Opinion leaders are also referred to as ________.", opts:["leading adopters", "lower uppers", "innovators", "lagging adopters", "surrogate consumers"], ans:0, exp:"Opinion leaders يُعرَّفون أيضاً بـ leading adopters (المتبنون الرائدون). يتبنون الأفكار الجديدة مبكراً ويؤثرون على الآخرين." , expW:{1:"Lower uppers = تصنيف طبقي اجتماعي",2:"Innovators = أوائل 2.5% يتبنون المنتج الجديد",3:"Lagging adopters = آخر 16% يتبنون المنتج",4:"Surrogate consumers = يقررون نيابة عن آخرين"}},
  { ch:"ch5", diff:"medium", q:"________ are ambassadors who enthusiastically share their passion for a company's products with large circles of friends and acquaintances.", opts:["Leading adopters", "Brand evangelists", "Surrogate consumers", "Market mavens", "Innovators"], ans:1, exp:"Brand evangelists = سفراء العلامة التجارية المتحمسون الذين يشاركون شغفهم بالمنتج مع دائرة واسعة من المعارف بطريقة تلقائية." , expW:{0:"Leading adopters = المتبنون الرائدون (opinion leaders)",2:"Surrogate consumers = يقررون الشراء نيابة عن غيرهم",3:"Market mavens = خبراء السوق الذين يشاركون معلومات",4:"Innovators = أوائل 2.5% يتبنون المنتج الجديد"}},
  { ch:"ch5", diff:"medium", q:"Companies that use brand ambassadors are most likely involved in ________ marketing.", opts:["ambush", "spam", "buzz", "viral", "database"], ans:2, exp:"Buzz marketing = التسويق الطنيني. يستخدم سفراء العلامة لنشر الكلام الإيجابي عنها. استخدام brand ambassadors = buzz marketing." , expW:{0:"Ambush marketing = تسويق كمين بدون رعاية رسمية",1:"Spam marketing = إرسال رسائل غير مرغوبة",3:"Viral marketing = انتشار سريع عبر الإنترنت",4:"Database marketing = تسويق قائم على قواعد البيانات"}},
  { ch:"ch5", diff:"medium", q:"Facebook, Snapchat and LinkedIn are all examples of ________.", opts:["brand alliances", "opinion leaders", "social networks", "early adopters", "market mavens"], ans:2, exp:"Facebook وSnapchat وLinkedIn = شبكات اجتماعية (social networks). تُتيح للمسوقين التواصل مع المستهلكين وبناء مجتمعات حول العلامة التجارية." , expW:{0:"Brand alliances = تحالفات بين علامات تجارية",1:"Opinion leaders = خبراء يؤثرون على آراء الآخرين",3:"Early adopters = 13.5% الأوائل في تبني المنتج",4:"Market mavens = خبراء السوق الذين يشاركون معلومات"}},
  { ch:"ch5", diff:"medium", q:"Which of the following is characteristic of online social networks?", opts:["use of one-way communication techniques", "negligible adoption rates", "guaranteed positive results", "easy methods to measure results", "interactive media content"], ans:4, exp:"الشبكات الاجتماعية تتميز بالمحتوى التفاعلي (interactive media content). التواصل ثنائي الاتجاه وليس ذا اتجاه واحد، والنتائج صعبة القياس." , expW:{0:"خطأ — الشبكات ثنائية الاتجاه لا أحادية",1:"خطأ — معدلات التبني مرتفعة جداً",2:"خطأ — النتائج غير مضمونة",3:"خطأ — قياس النتائج صعب وليس سهلاً"}},
  { ch:"ch5", diff:"medium", q:"Independent bloggers are self-made influencers. Traits that make them relevant to marketers include ________.", opts:["creative writing skills", "professional Web site", "good fit with the brand", "a few vocal followers", "technological skills"], ans:2, exp:"المدونون المستقلون يصبحون مؤثرين مفيدين للمسوقين عندما يكون هناك good fit مع العلامة التجارية — التوافق مع قيم وجمهور العلامة هو الأهم." , expW:{0:"Creative writing skills = المهارة الكتابية ليست الأهم",1:"Professional Web site = الموقع المهني ليس الأهم",3:"A few vocal followers = عدد قليل من المتابعين يُقلل التأثير",4:"Technological skills = المهارة التقنية ليست الأهم"}},
  { ch:"ch5", diff:"easy", q:"What is the most important consumer buying organization in society?", opts:["family", "social class", "membership group", "subculture", "reference group"], ans:0, exp:"الأسرة = أهم مؤسسة شرائية في المجتمع. تؤثر تأثيراً مباشراً على قرارات الشراء للأعضاء وتُشكِّل القيم والأذواق منذ الطفولة." , expW:{1:"Social class = تقسيم المجتمع بالدخل والتعليم",2:"Membership group = مجموعة ينتمي إليها الفرد",3:"Subculture = مجموعة ثقافية فرعية",4:"Reference group = مجموعة مرجعية للمقارنة"}},
  { ch:"ch5", diff:"medium", q:"________ traditionally has been considered the main purchasing agent for the family in the areas of food, household products, and clothing, although this is changing as more work outside the home.", opts:["A teenager", "The husband", "The wife", "The couple together", "The parent"], ans:2, exp:"The wife = تقليدياً الوكيل الشرائي الرئيسي للأسرة في الغذاء والمنتجات المنزلية والملابس. هذا الدور يتغير مع دخول المرأة سوق العمل." , expW:{0:"A teenager = ليس الوكيل الشرائي التقليدي",1:"The husband = يتحكم في قطاعات كالسيارات لكن ليس تقليدياً الرئيسي",3:"The couple together = القرار المشترك يزداد لكن ليس التقليدي",4:"The parent = مصطلح عام لا يحدد المقصود"}},
  { ch:"ch5", diff:"medium", q:"A ________ consists of the activities an individual is expected to perform, according to the people around him/her.", opts:["motive", "role", "lifestyle", "life cycle", "perception"], ans:1, exp:"Role = الدور: مجموعة الأنشطة التي يُتوقع من الشخص أداؤها وفق نظرة المحيطين به. مثلاً: دور الأب، دور الموظف، دور المشتري." , expW:{0:"Motive = حاجة ملحّة تدفع الشخص للتصرف",2:"Lifestyle = نمط الحياة (AIOs)",3:"Life cycle = مراحل حياة الأسرة",4:"Perception = كيف نختار ونفسر المعلومات"}},
  { ch:"ch5", diff:"medium", q:"A buyer's decisions are influenced by ________ such as the buyer's age and life-cycle stage, occupation, economic situation, lifestyle, personality, and self-concept.", opts:["personal characteristics", "stereotypes", "perceptions", "attitudes", "psychographics"], ans:0, exp:"Personal characteristics (الخصائص الشخصية) تشمل: العمر ومرحلة دورة الحياة، المهنة، الوضع الاقتصادي، نمط الحياة، الشخصية، ومفهوم الذات." , expW:{1:"Stereotypes = صور نمطية ليست عوامل نموذج سلوك المشتري",2:"Perceptions = إدراك (عامل نفسي لا شخصي)",3:"Attitudes = مواقف (عامل نفسي لا شخصي)",4:"Psychographics = أداة قياس نمط الحياة"}},
  { ch:"ch5", diff:"easy", q:"Consumer information provider Nielsen uses a life-stage segmentation system that places U.S. households into one of 66 different life-stage groups. According to Nielsen's groups, which of the following refers to the group consisting of hip, single twenty-somethings who are politically liberal, listen to alternative music, and enjoy lively nightlife?", opts:["Striving Singles", "Young Achievers", "Bohemian Mix", "Young Influentials", "Young Digerati"], ans:1, exp:"Young Achievers = الشباب العازبون في العشرينيات، ليبراليون سياسياً، يستمعون للموسيقى البديلة ويستمتعون بالحياة الليلية. هذا التوصيف يطابق Nielsen." , expW:{0:"Striving Singles = عزاب يكافحون في ظروف مالية صعبة",2:"Bohemian Mix = متنوعون حضرياً مع تقاليد وتنوع عرقي",3:"Young Influentials = شباب طموحون يميلون للمحافظة",4:"Young Digerati = متميزون تقنياً يسكنون الأحياء الراقية"}},
  { ch:"ch5", diff:"medium", q:"Life-stage changes usually result from ________.", opts:["birthdays", "mentors", "friends", "life-changing events", "siblings"], ans:3, exp:"تغيرات مرحلة الحياة تنتج عادةً من أحداث حياتية مهمة (life-changing events) كالزواج، الطلاق، الإنجاب، أو التقاعد — وليس من أعياد الميلاد وحدها." , expW:{0:"Birthdays = أعياد الميلاد لا تُحدث تغيرات كبيرة وحدها",1:"Mentors = المرشدون لا يُسببون تغيرات المرحلة",2:"Friends = الأصدقاء يؤثرون لكن لا يُحدثون تغيرات المرحلة",4:"Siblings = الأشقاء لا يُسببون تغيرات المرحلة عادةً"}},
  { ch:"ch5", diff:"medium", q:"Life-stage segmentation allows marketers to create targeted, actionable, and ________ campaigns based on how people consume and interact with brands.", opts:["inexpensive", "professional", "multimedia", "social media", "personalized"], ans:4, exp:"Life-stage segmentation تُمكِّن المسوقين من إنشاء حملات personalized (مخصصة) بناءً على كيفية استهلاك الناس وتفاعلهم مع العلامات التجارية." , expW:{0:"Inexpensive = التخصيص لا يعني رخص التكلفة",1:"Professional = الاحترافية صفة عامة لا ميزة للتجزئة",2:"Multimedia = الوسائط المتعددة أسلوب لا نتيجة التجزئة",3:"Social media = وسيلة تواصل لا نتيجة التجزئة"}},
  { ch:"ch5", diff:"medium", q:"Since a person's economic situation will affect her store and product choices, marketers watch trends in spending, personal income, interest rates, and ________.", opts:["employment", "savings", "home purchases", "rents", "fuel prices"], ans:1, exp:"المسوقون يراقبون الادخار savings إلى جانب الإنفاق والدخل وأسعار الفائدة لفهم التغيرات في القدرة الشرائية للمستهلكين." , expW:{0:"Employment = التوظيف مهم لكن ليس ما يُراقبه المسوقون هنا",2:"Home purchases = ليست المؤشر الرئيسي المتابع",3:"Rents = الإيجارات ليست المؤشر الرئيسي المتابع",4:"Fuel prices = أسعار الوقود ليست المؤشر الرئيسي"}},
  { ch:"ch5", diff:"easy", q:"________ is a person's pattern of living as expressed in his/her psychographics, and it includes the individual's activities, interests, and opinions.", opts:["Personality", "Culture", "Lifestyle", "Motive", "Social class"], ans:2, exp:"Lifestyle = نمط الحياة: الطريقة التي يعيش بها الشخص معبَّراً عنها في psychographics = الأنشطة والاهتمامات والآراء (AIO)." , expW:{0:"Personality = الخصائص النفسية الفريدة للشخص",1:"Culture = القيم والمعتقدات المكتسبة من المجتمع",3:"Motive = حاجة ملحّة تدفع للتصرف",4:"Social class = تقسيم المجتمع بالدخل والتعليم"}},
  { ch:"ch5", diff:"medium", q:"In the context of the AIO dimensions for measuring consumers' lifestyles, \"A\" stands for ________.", opts:["activities", "achievements", "admirations", "attitudes", "associations"], ans:0, exp:"AIO dimensions = Activities (أنشطة) + Interests (اهتمامات) + Opinions (آراء). الـ A تقف لـ Activities وليس achievements أو attitudes.", expW:{1:"Achievements = إنجازات (ليست من AIO)",2:"Admirations = إعجابات (ليست من AIO)",3:"Attitudes = مواقف (ليست من AIO)",4:"Associations = انتماءات (ليست من AIO)"} },
  { ch:"ch5", diff:"medium", q:"A current trend in the United States involves rediscovering the benefits of home-cooked food and the use of organic ingredients. People are choosing to spend hours in the kitchen using only the freshest ingredients to cook healthy and nutritious meals. This change in ________ is one of the reasons for the increasing demand for organic ingredients.", opts:["self-concept", "subculture", "lifestyle", "personality", "life-cycle"], ans:2, exp:"التغيير في نمط الحياة (lifestyle) هو ما يفسر الطلب المتزايد على المكونات العضوية. نمط الحياة يعكس الأنشطة والاهتمامات والآراء." , expW:{0:"Self-concept = كيف يرى الشخص نفسه",1:"Subculture = مجموعة ثقافية فرعية",3:"Personality = الخصائص النفسية الفريدة",4:"Life-cycle = مراحل الحياة"}},
  { ch:"ch5", diff:"easy", q:"________ refers to the unique psychological characteristics that distinguish an individual or group.", opts:["Attitude", "Belief", "Perception", "Personality", "Self-awareness"], ans:3, exp:"Personality = الشخصية: الخصائص النفسية الفريدة التي تميز الفرد أو المجموعة وتجعله يستجيب بثبات نسبي لبيئته." , expW:{0:"Attitude = تقييمات ومشاعر ثابتة نحو شيء",1:"Belief = فكرة وصفية يحملها الشخص عن شيء",2:"Perception = كيف نختار ونفسر المعلومات",4:"Self-awareness = وعي الشخص بنفسه"}},
  { ch:"ch5", diff:"easy", q:"Which of the following terms refers to a specific mix of human traits that may be attributed to a particular brand?", opts:["brand perception", "brand identity", "brand personality", "brand concept", "brand equity"], ans:2, exp:"Brand personality = شخصية العلامة التجارية: مزيج من الصفات الإنسانية المنسوبة لعلامة تجارية (مثل: جدية، إثارة، تطور، كفاءة، صلابة)." , expW:{0:"Brand perception = كيف يُدرك المستهلك العلامة",1:"Brand identity = كيف تُريد الشركة أن تُرى",3:"Brand concept = فكرة العلامة التجارية",4:"Brand equity = قيمة العلامة التجارية"}},
  { ch:"ch5", diff:"hard", q:"Shoez Inc., a manufacturer of shoes, has recently launched a brand of sturdy shoes ideal for hiking and other outdoor activities. Which of the following brand personalities could be best associated with the new brand?", opts:["sincerity", "excitement", "sophistication", "competence", "ruggedness"], ans:4, exp:"Ruggedness (الصلابة والمتانة) = شخصية العلامة المناسبة لأحذية التنزه والأنشطة الخارجية. تعكس القوة والتحمل في البيئات الصعبة." , expW:{0:"Sincerity = صدق وأمانة (مناسب لعلامات العائلة)",1:"Excitement = إثارة وجرأة (مناسب للشباب والموضة)",2:"Sophistication = تطور ورقي (مناسب للفخامة)",3:"Competence = كفاءة وموثوقية (مناسب للتقنية)"}},
  { ch:"ch5", diff:"medium", q:"Many marketers use the self-concept premise that people's possessions contribute to and reflect their identities—that is, \"we are what we consume.\" According to this premise, consumers ________.", opts:["buy products to support their self-image", "rarely identify with brand personalities", "are affected by opinion leaders", "compare product brands", "conduct primary research"], ans:0, exp:"Self-concept premise: نحن ما نستهلكه. المستهلكون يشترون المنتجات لدعم صورتهم الذاتية وتعزيز هويتهم." , expW:{1:"خطأ — المستهلكون يتماهون مع شخصيات العلامات",2:"Affected by opinion leaders = نعم لكن ليس بسبب self-concept",3:"Compare product brands = نعم لكن ليس بسبب self-concept",4:"Conduct primary research = الشركات تجري البحث لا المستهلكون"}},
  { ch:"ch5", diff:"hard", q:"Harley-Davidson promotes its motorcycles with images of independence, freedom, and power. Harley-Davidson has created a ________.", opts:["motive", "life-cycle stage", "self-concept", "brand personality", "self-actualization need"], ans:3, exp:"Harley-Davidson ربطت علامتها بصور الاستقلالية والحرية والقوة = brand personality (شخصية العلامة التجارية بصفات إنسانية)." , expW:{0:"Motive = حاجة ملحّة تدفع للتصرف",1:"Life-cycle stage = مرحلة من مراحل الحياة",2:"Self-concept = كيف يرى الشخص نفسه",4:"Self-actualization need = أعلى مستويات هرم Maslow"}},
  { ch:"ch5", diff:"medium", q:"A marketer of women's hair care products targeting Chinese customers created an advertising message that told women their hair could be worn any way they wanted as opposed to wearing it straight. The message suggested the women did not need to conform to the mainstream media definition of beauty. It is most accurate to say that this ad was based on an understanding of customers' ________.", opts:["social class", "life-cycle stage", "self-concept", "status", "role"], ans:2, exp:"الإعلان يستهدف self-concept (مفهوم الذات): كيف ترى المرأة نفسها — حرة في اختياراتها وغير مقيدة بتعريفات الجمال السائدة." , expW:{0:"Social class = تقسيم المجتمع بالدخل والتعليم",1:"Life-cycle stage = مرحلة من مراحل الحياة",3:"Status = المكانة الاجتماعية",4:"Role = ما يُتوقع من الشخص أداؤه"}},
  { ch:"ch5", diff:"hard", q:"A person's buying choices are influenced by four major psychological factors. Which of the following is NOT one of these factors?", opts:["motivation", "perception", "association", "learning", "beliefs"], ans:2, exp:"العوامل النفسية الأربعة الرئيسية: الدافعية (motivation)، الإدراك (perception)، التعلم (learning)، والمعتقدات والمواقف (beliefs & attitudes). Association ليست واحدة منها." , expW:{0:"Motivation = الدافعية (عامل نفسي حقيقي)",1:"Perception = الإدراك (عامل نفسي حقيقي)",3:"Learning = التعلم (عامل نفسي حقيقي)",4:"Beliefs = المعتقدات (عامل نفسي حقيقي)"}},
  { ch:"ch5", diff:"easy", q:"A ________ is a need that is sufficiently pressing to direct a person to seek satisfaction.", opts:["stimulus", "perception", "culture", "motive", "tradition"], ans:3, exp:"Motive = الدافع: حاجة ملحّة بما يكفي لتوجيه الشخص نحو البحث عن الإشباع. الدافع هو المحرك الداخلي للسلوك الشرائي." , expW:{0:"Stimulus = مثير خارجي يُحرك الاستجابة",1:"Perception = كيف نختار ونفسر المعلومات",2:"Culture = القيم والمعتقدات المكتسبة",4:"Tradition = عادة موروثة"}},
  { ch:"ch5", diff:"medium", q:"According to Freud, a person's buying decisions are primarily affected by ________.", opts:["family influences", "societal expectations", "brand images", "cultural norms", "subconscious motives"], ans:4, exp:"Freud = قرارات الشراء تتأثر أساساً بالدوافع اللاشعورية (subconscious motives). الناس لا يدركون دوافعهم الحقيقية في الغالب." , expW:{0:"Family influences = تأثيرات اجتماعية خارجية",1:"Societal expectations = توقعات اجتماعية خارجية",2:"Brand images = صور العلامات (نتيجة لا سبب)",3:"Cultural norms = معايير ثقافية خارجية"}},
  { ch:"ch5", diff:"medium", q:"Many marketers now use ________ research to dig deeply into consumer psyches and develop better marketing strategies.", opts:["analytical", "interpretive", "causal", "descriptive", "experiential"], ans:1, exp:"Interpretive research = البحث التفسيري النوعي الذي يتعمق في نفسية المستهلك لاكتشاف الدوافع الخفية. يُستخدم لفهم سلوك المستهلك بعمق." , expW:{0:"Analytical = بحث كمي لا نوعي",2:"Causal = بحث يدرس العلاقات السببية",3:"Descriptive = بحث يصف الظواهر",4:"Experiential = بحث تجريبي ميداني"}},
  { ch:"ch5", diff:"easy", q:"________ refers to qualitative research designed to probe consumers' hidden, subconscious motivations.", opts:["Perception analysis", "Subliminal analysis", "Motivation research", "Need recognition", "Market segmentation"], ans:2, exp:"Motivation research = بحث الدوافع: بحث نوعي مصمم لاستكشاف الدوافع الخفية واللاشعورية للمستهلك. يستخدم مناهج إسقاطية وتحليل نوعي." , expW:{0:"Perception analysis = تحليل الإدراك",1:"Subliminal analysis = تحليل تحت عتبة الإدراك",3:"Need recognition = إدراك الحاجة (مرحلة قرار الشراء)",4:"Market segmentation = تقسيم السوق"}},
  { ch:"ch5", diff:"medium", q:"A marketing research company asked members of a focus group to describe several brands as animals. The purpose of the request is to measure the prestige of the various brands. This is an example of ________.", opts:["brand strength analysis", "interpretive consumer research", "quantitative research", "buzz marketing", "brand extension"], ans:1, exp:"طلب وصف العلامات كحيوانات = interpretive consumer research (بحث تفسيري). يستخدم أساليب إسقاطية لكشف تصورات المستهلك غير المعلنة." , expW:{0:"Brand strength analysis = قياس كمي لقوة العلامة",2:"Quantitative research = يعتمد على أرقام وإحصاءات",3:"Buzz marketing = تسويق شفهي",4:"Brand extension = توسعة العلامة التجارية"}},
  { ch:"ch5", diff:"medium", q:"Maslow's theory is that ________ can be arranged in a hierarchy.", opts:["marketing stimuli", "personal beliefs", "perceptions", "human needs", "decisions"], ans:3, exp:"Maslow = نظرية تُرتِّب الحاجات الإنسانية (human needs) في هرم من الأكثر إلحاحاً للأقل: فسيولوجية → أمان → اجتماعية → تقدير → تحقيق الذات." , expW:{0:"Marketing stimuli = المزيج التسويقي",1:"Personal beliefs = معتقدات الشخص",2:"Perceptions = إدراكات الشخص",4:"Decisions = قرارات الشخص"}},
  { ch:"ch5", diff:"hard", q:"Which of the following is NOT part of Maslow's hierarchy of needs?", opts:["physiological needs", "safety needs", "spiritual needs", "esteem needs", "social needs"], ans:2, exp:"هرم Maslow الخماسي = فسيولوجية، أمان، اجتماعية، تقدير، تحقيق الذات. الحاجات الروحانية (spiritual) ليست جزءاً من نموذج Maslow الأصلي." , expW:{0:"Physiological needs = أول مستوى في الهرم",1:"Safety needs = ثاني مستوى في الهرم",3:"Esteem needs = رابع مستوى في الهرم",4:"Social needs = ثالث مستوى في الهرم"}},
  { ch:"ch5", diff:"medium", q:"According to Maslow's hierarchy of needs, which of the following is the LEAST pressing need?", opts:["physiological needs", "social needs", "esteem needs", "self-actualization needs", "safety needs"], ans:3 , past:true, exp:"Maslow's hierarchy من الأكثر إلحاحاً للأقل: 1)Physiological 2)Safety 3)Social 4)Esteem 5)Self-actualization. الأقل إلحاحاً = القمة = تحقيق الذات.", expW:{0:"Physiological = الأكثر إلحاحاً (جوع، عطش)",1:"Social = المستوى 3",2:"Esteem = المستوى 4",4:"Safety = المستوى 2"} },
  { ch:"ch5", diff:"easy", q:"________ is the process by which people select, organize, and interpret information to form a meaningful picture of the world.", opts:["Motivation", "Perception", "Dissonance", "Learning", "Self-actualization"], ans:1, exp:"Perception = الإدراك: العملية التي يختار فيها الناس وينظمون ويفسرون المعلومات لتكوين صورة ذات معنى عن العالم." , expW:{0:"Motivation = الدافعية (حاجة ملحّة)",2:"Dissonance = التنافر المعرفي بعد الشراء",3:"Learning = تغيير السلوك بسبب الخبرة",4:"Self-actualization = تحقيق الذات"}},
  { ch:"ch5", diff:"easy", q:"People cannot focus on all of the stimuli that surround them each day. A person's tendency to screen out most of the information is called ________.", opts:["subliminal retention", "selective distortion", "cognitive dissonance", "selective attention", "cognitive inertia"], ans:3, exp:"Selective attention = الانتباه الانتقائي: الميل لتصفية معظم المعلومات التي يتعرض لها الشخص. ننتبه فقط لما يثير اهتمامنا أو يلبي حاجة حالية." , expW:{0:"Subliminal retention = مصطلح غير معياري",1:"Selective distortion = تفسير المعلومات لتتوافق مع معتقداتنا",2:"Cognitive dissonance = قلق ما بعد الشراء",4:"Cognitive inertia = الجمود المعرفي"}},
  { ch:"ch5", diff:"easy", q:"People tend to interpret new information in a way that will support what they already believe. This is called ________.", opts:["selective retention", "selective distortion", "cognitive dissonance", "selective attention", "cognitive bias"], ans:1, exp:"Selective distortion = التحريف الانتقائي: تفسير المعلومات بطريقة تدعم ما نؤمن به مسبقاً. نُكيِّف المعلومات الجديدة لتتوافق مع قناعاتنا." , expW:{0:"Selective retention = الاحتفاظ بالمعلومات الإيجابية",2:"Cognitive dissonance = قلق ما بعد الشراء",3:"Selective attention = الانتباه لما يثير اهتمامنا",4:"Cognitive bias = تحيز معرفي عام"}},
  { ch:"ch5", diff:"medium", q:"________ means that consumers are likely to remember good points made about a brand they favor and forget good points made about competing brands.", opts:["Selective attention", "Selective retention", "Cognitive dissonance", "Selective distortion", "Cognitive bias"], ans:1 , past:true, exp:"Selective retention = الاحتفاظ الانتقائي: نتذكر ما يتوافق مع معتقداتنا ونتجاهل ما يعارضها. مؤيد علامة يتذكر إيجابياتها فقط.", expW:{0:"Selective attention = الانتباه الانتقائي (ما نلاحظه)",2:"Cognitive dissonance = التنافر بعد الشراء",3:"Selective distortion = تحريف المعلومات لتوافق معتقداتنا",4:"Cognitive bias = تحيز معرفي عام"} },
  { ch:"ch5", diff:"hard", q:"Mark has long supported a particular brand of footwear and has always bought that brand. Recently, the footwear manufacturer was embroiled in a controversy for using child labor at its manufacturing plants. Mark doubts the news reports and continues to purchase the same brand of footwear. It is most accurate to say that Mark displays ________.", opts:["selective distortion", "cognitive dissonance", "selective retention", "selective attention", "consumer ethnocentrism"], ans:0, exp:"Mark يشكك في الأخبار السلبية عن علامته المفضلة = selective distortion (تحريف انتقائي). يُفسِّر المعلومات بما يتوافق مع معتقداته السابقة." , expW:{1:"Cognitive dissonance = قلق ما بعد الشراء",2:"Selective retention = الاحتفاظ بالمعلومات الإيجابية",3:"Selective attention = الانتباه لما يثير اهتمامنا",4:"Consumer ethnocentrism = تفضيل المنتجات المحلية"}},
  { ch:"ch5", diff:"medium", q:"Juana looked at the September issue of her favorite fashion magazine and did not find anything particularly interesting despite the fact that the magazine had several advertisements that were targeted at Juana's demographic. The only thing that interested her was an article about an upcoming fashion show. Which consumer behavior is being illustrated in this instance?", opts:["subliminal advertising", "groupthink", "selective attention", "social loafing", "consumer ethnocentrism"], ans:2, exp:"Juana تجاهلت الإعلانات ولاحظت فقط مقال عرض الأزياء = selective attention (انتباه انتقائي). الدماغ يُصفي ما لا يهمنا ويحتفظ بما يثير اهتمامنا." , expW:{0:"Subliminal advertising = إعلان تحت عتبة الإدراك",1:"Groupthink = التفكير الجماعي",3:"Social loafing = التكاسل الاجتماعي في المجموعات",4:"Consumer ethnocentrism = تفضيل المنتجات المحلية"}},
  { ch:"ch5", diff:"medium", q:"Stephanie and John wanted to purchase a high-end sports car. They viewed a commercial for a particular sports car that highlighted the cost, design, and power of the car. After viewing the ad, Stephanie felt that the car's price was acceptable, considering the superior and unique design. John thought that the car was expensive owing to the high power engine installed in it. They used the information in different ways, focusing on issues that each considered important. Which of the following concepts does this scenario demonstrate?", opts:["selective distortion", "consumer ethnocentrism", "selective retention", "selective attention", "cognitive dissonance"], ans:0, exp:"Stephanie وJohn فسَّرا نفس الإعلان بطريقتين مختلفتين = selective distortion. كل شخص ركَّز على ما يتوافق مع اهتماماته وأعاد تفسير المعلومات." , expW:{1:"Consumer ethnocentrism = تفضيل المنتجات الوطنية",2:"Selective retention = الاحتفاظ بالمعلومات الإيجابية",3:"Selective attention = الانتباه لما يثير اهتمامنا",4:"Cognitive dissonance = قلق ما بعد الشراء"}},
  { ch:"ch5", diff:"medium", q:"Some consumers worry that they will be affected by marketing messages without even knowing it. They are concerned about ________.", opts:["alternative evaluation", "subliminal advertising", "selective retention", "cognitive dissonance", "selective communication"], ans:1, exp:"Subliminal advertising = الإعلان تحت عتبة الإدراك: القلق من التأثر برسائل تسويقية دون أن ندرك ذلك بوعي. هذه ظاهرة تُقلق بعض المستهلكين." , expW:{0:"Alternative evaluation = تقييم البدائل المتاحة",2:"Selective retention = الاحتفاظ بالمعلومات الإيجابية",3:"Cognitive dissonance = قلق ما بعد الشراء",4:"Selective communication = ليس مصطلحاً معيارياً"}},
  { ch:"ch5", diff:"medium", q:"________ describes changes in an individual's behavior arising from experience.", opts:["Lifestyle", "Learning", "Perception", "Cognitive dissonance", "Selective attention"], ans:1, exp:"Learning = التعلم: التغيرات في سلوك الفرد الناتجة عن الخبرة. يحدث من خلال: drive (دافع) → cue (إشارة) → response (استجابة) → reinforcement (تعزيز)." , expW:{0:"Lifestyle = نمط الحياة (AIOs)",2:"Perception = كيف نختار ونفسر المعلومات",3:"Cognitive dissonance = قلق ما بعد الشراء",4:"Selective attention = الانتباه الانتقائي"}},
  { ch:"ch5", diff:"medium", q:"________ are minor stimuli that determine where, when, and how a person responds to an idea.", opts:["Cues", "Drives", "Reinforcers", "Cognitions", "Impulses"], ans:0, exp:"Cues = الإشارات أو المثيرات الصغيرة التي تحدد أين ومتى وكيف يستجيب الشخص. مثلاً: رؤية إعلان أو شم رائحة تُحدد نوع الاستجابة." , expW:{1:"Drives = دوافع (قوى داخلية قوية)",2:"Reinforcers = معززات الاستجابة",3:"Cognitions = عمليات التفكير المعرفي",4:"Impulses = دوافع آنية"}},
  { ch:"ch5", diff:"medium", q:"A(n) ________ is a descriptive thought that a person has about something.", opts:["lifestyle", "motive", "belief", "attitude", "cognition"], ans:2 , past:true, exp:"Belief = فكرة وصفية (descriptive thought). 'هذا المنتج جودته عالية' = اعتقاد. مختلف عن Attitude التي تتضمن تقييماً ومشاعر.", expW:{0:"Lifestyle = نمط الحياة (AIOs)",1:"Motive = دافع (حاجة ملحّة)",3:"Attitude = تقييم + مشاعر + ميول ثابتة",4:"Cognition = عملية التفكير بشكل عام"} },
  { ch:"ch5", diff:"easy", q:"A(n) ________ is a person's relatively consistent evaluations, feelings, and tendencies toward an object or idea.", opts:["lifestyle", "motive", "belief", "attitude", "perception"], ans:3, exp:"Attitude = الموقف: تقييمات ومشاعر وميول ثابتة نسبياً تجاه شيء أو فكرة. يصعب تغيير المواقف لأنها راسخة في نمط تفكير متسق." , expW:{0:"Lifestyle = نمط الحياة (AIOs)",1:"Motive = حاجة ملحّة تدفع للتصرف",2:"Belief = فكرة وصفية يحملها الشخص",4:"Perception = كيف نختار ونفسر المعلومات"}},
  { ch:"ch5", diff:"medium", q:"Which of the following best supports the idea that The Attic Trunk's mature, wealthy clientele can remain a viable target market?", opts:["Older, first generation Hispanic consumers are not especially family-oriented.", "Older, first-generation Hispanic consumers favor sellers who show special interest in them.", "Older, first generation Hispanic consumers tend to be very price conscious.", "Older, first generation Hispanic consumers tend to display little brand loyalty.", "Older, first generation Hispanic consumers are motivated by mainstream marketing."], ans:1, exp:"المستهلكون من الجيل الأول من Hispanic Americans يُفضِّلون البائعين الذين يُظهرون اهتماماً خاصاً بهم — وهذا يجعلهم سوقاً مستمرة ومربحة." , expW:{0:"خطأ — المستهلكون من الجيل الأول يهتمون بالأسرة",2:"خطأ — ليسوا حساسين للسعر بشكل خاص",3:"خطأ — الجيل الأول يُظهر ولاءً للعلامة",4:"خطأ — الإعلانات السائدة لا تجذبهم بقوة"}},
  { ch:"ch5", diff:"medium", q:"Many families with children are now attracted to the shopping district in Forest Ridge. What characteristics about families as consumer groups might the owners of The Attic Trunk want to keep in mind?", opts:["Though more women hold jobs outside the home today than when The Attic Trunk first opened, husband-wife involvement in the buying process has remained relatively unchanged.", "Children have considerable amounts of disposable income and have a strong influence on family buying decisions.", "Women seldom account for any technology-related purchases.", "Women typically account for most habitual purchases.", "Men make all the major purchasing decisions in most families."], ans:1, exp:"الأطفال لديهم دخل متاح للإنفاق ويمارسون تأثيراً قوياً على قرارات الشراء الأسرية. هذا يؤثر على استراتيجية The Attic Trunk مع الأسر." , expW:{0:"خطأ — مشاركة الزوج والزوجة في الشراء تتغير",2:"خطأ — المرأة تُقرر كثيراً من مشتريات التكنولوجيا",3:"خطأ — المرأة لا تقتصر على المشتريات الاعتيادية",4:"خطأ — الرجل لا يتخذ كل قرارات الشراء"}},
  { ch:"ch5", diff:"medium", q:"Which of the following would each consumer segment attracted to The Attic Trunk have in common with the other consumer segments?", opts:["habitual buying behaviors", "self-concepts", "AIO dimensions", "life-cycle stages", "aspirational groups"], ans:2, exp:"AIO dimensions (الأنشطة والاهتمامات والآراء) هي القاسم المشترك بين شرائح عملاء The Attic Trunk — حبهم للتسوق والموضة يجمعهم." , expW:{0:"Habitual buying behaviors = روتين الشراء يختلف بين الشرائح",1:"Self-concepts = مفهوم الذات يختلف بين الشرائح",3:"Life-cycle stages = مراحل الحياة تختلف بين الشرائح",4:"Aspirational groups = المجموعات المرغوبة تختلف"}},
  { ch:"ch5", diff:"medium", q:"When consumers are highly involved with the purchase of an expensive product and they perceive significant differences among brands, they most likely will exhibit ________.", opts:["consumer capitalism", "complex buying behavior", "consumer ethnocentrism", "dissonance-reducing buying behavior", "variety-seeking buying behavior"], ans:1, exp:"Complex buying behavior = تورط عالٍ + فروق كبيرة بين الماركات. المنتجات الغالية التي تُشترى نادراً وبين علاماتها فروق واضحة تستدعي هذا السلوك." , expW:{0:"Consumer capitalism = مفهوم اقتصادي",2:"Consumer ethnocentrism = تفضيل المنتجات المحلية",3:"Dissonance-reducing = تورط عالٍ + فروق قليلة بين الماركات",4:"Variety-seeking = تورط منخفض + فروق كبيرة بين الماركات"}},
  { ch:"ch5", diff:"hard", q:"George is buying his first house. He has spent a month looking at houses and comparing attributes such as price and location. He has contacted several real estate agents to look at different types of houses. George is most likely exhibiting ________.", opts:["variety-seeking buying behavior", "complex buying behavior", "consumer capitalism", "dissonance-reducing buying behavior", "marketing myopia"], ans:1, exp:"George يشتري منزلاً للمرة الأولى ويقارن ويبحث كثيراً = complex buying behavior. تورط عالٍ + فروق كبيرة بين الخيارات المتاحة." , expW:{0:"Variety-seeking = تورط منخفض + فروق كبيرة بين الماركات",2:"Consumer capitalism = مفهوم اقتصادي",3:"Dissonance-reducing = تورط عالٍ + فروق قليلة بين الماركات",4:"Marketing myopia = تركيز على المنتج لا على الحاجة"}},
  { ch:"ch5", diff:"medium", q:"When consumers are highly involved with an expensive, infrequent, or risky purchase but see little difference among brands, they most likely will exhibit ________.", opts:["habitual buying behavior", "complex buying behavior", "impulse buying behavior", "dissonance-reducing buying behavior", "consumer capitalism"], ans:3, exp:"Dissonance-reducing behavior = تورط عالٍ (منتج غالي/نادر) + فروق قليلة بين الماركات → يشتري بسرعة ثم يبحث عن تأكيد أن قراره كان صحيحاً." , expW:{0:"Habitual buying = تورط منخفض + فروق قليلة",1:"Complex buying = تورط عالٍ + فروق كبيرة بين الماركات",2:"Impulse buying = شراء اندفاعي غير مخطط",4:"Consumer capitalism = مفهوم اقتصادي"}},
  { ch:"ch5", diff:"medium", q:"For the past ten years, Bill and Margaret have saved money to go to the Super Bowl should their team, the Chicago Bears, reach the finals of the NFC championship. This is the year, and several tour companies offer attractive, but very similar, packages to the game. Since all packages are pretty much the same, they have chosen one that fits their budget. Bill and Margaret are most likely exhibiting ________.", opts:["complex buying behavior", "dissonance-reducing buying behavior", "habitual buying behavior", "consumer capitalism", "consumer ethnocentrism"], ans:1, exp:"Bill وMargaret: تورط عالٍ (هدف حياتي بعد 10 سنوات) + فروق قليلة بين الباقات السياحية → dissonance-reducing buying behavior." , expW:{0:"Complex buying = تورط عالٍ + فروق كبيرة بين الباقات",2:"Habitual buying = تورط منخفض + فروق قليلة",3:"Consumer capitalism = مفهوم اقتصادي",4:"Consumer ethnocentrism = تفضيل المنتجات الوطنية"}},
  { ch:"ch5", diff:"medium", q:"Which of the following consumer buying behaviors is related to conditions of low- consumer involvement and little significant brand difference?", opts:["complex buying behavior", "dissonance-reducing buying behavior", "habitual buying behavior", "variety-seeking buying behavior", "consumer capitalism"], ans:2 , past:true, exp:"Habitual buying = تورط منخفض + فرق بين الماركات قليل → شراء بالعادة (مثل ملح، بنزين). الشراء التلقائي الروتيني.", expW:{0:"Complex = تورط عالٍ + فرق كبير بين الماركات",1:"Dissonance-reducing = تورط عالٍ + فرق قليل بين الماركات",3:"Variety-seeking = تورط منخفض + فرق كبير بين الماركات",4:"Consumer capitalism = مفهوم اقتصادي"} },
  { ch:"ch5", diff:"medium", q:"Pat thought he had received the best deal on his new car. Shortly after buying the car, Pat started to notice certain disadvantages of his new car as he learned more about other cars available in the market. Pat is experiencing ________.", opts:["dissonance-reducing buying behavior", "need recognition", "postpurchase dissonance", "marketing myopia", "complex buying behavior"], ans:2, exp:"Pat يشعر بالقلق بعد شراء السيارة = postpurchase dissonance (التنافر المعرفي بعد الشراء). يلاحظ عيوب سيارته ومزايا السيارات الأخرى." , expW:{0:"Dissonance-reducing behavior = سلوك شراء بتورط عالٍ وفروق قليلة",1:"Need recognition = إدراك الحاجة (أولى مراحل الشراء)",3:"Marketing myopia = تركيز على المنتج لا على الحاجة",4:"Complex buying behavior = تورط عالٍ + فروق كبيرة"}},
  { ch:"ch5", diff:"hard", q:"Which of the following would a marketer LEAST likely do to encourage habitual buying behavior?", opts:["dominate shelf space", "run frequent reminder ads", "keep shelves fully stocked", "stress unique features in ads", "offer lower prices and coupons"], ans:3, exp:"Habitual buying = شراء بالعادة بدون تفكير كثير. التركيز على الميزات الفريدة في الإعلانات يُشجع التفكير والمقارنة — عكس ما يريده المسوق لهذا السلوك." , expW:{0:"Dominate shelf space = سيطرة على رفوف البيع تُشجع الشراء الاعتيادي",1:"Run frequent reminder ads = إعلانات تذكيرية تُشجع الشراء الاعتيادي",2:"Keep shelves fully stocked = توفر المنتج يُشجع الشراء الاعتيادي",4:"Offer lower prices and coupons = أسعار منخفضة تُشجع الشراء الاعتيادي"}},
  { ch:"ch5", diff:"medium", q:"Eduardo usually purchases the same breakfast cereal, the kind he grew up eating. Eduardo exhibits ________.", opts:["dissonance-reducing buying behavior", "complex buying behavior", "habitual buying behavior", "variety-seeking buying behavior", "conspicuous consumption behavior"], ans:2, exp:"Eduardo يشتري نفس الحبوب دائماً = habitual buying behavior. تورط منخفض + فروق قليلة بين الماركات = شراء روتيني تلقائي." , expW:{0:"Dissonance-reducing = تورط عالٍ + فروق قليلة",1:"Complex buying = تورط عالٍ + فروق كبيرة",3:"Variety-seeking = تورط منخفض + فروق كبيرة",4:"Conspicuous consumption = استهلاك استعراضي"}},
  { ch:"ch5", diff:"hard", q:"Carrie tends to purchase various brands of bath soap. She has never been loyal to a specific brand; instead she does a lot of brand switching. Carrie exhibits ________.", opts:["dissonance-reducing buying behavior", "complex buying behavior", "habitual buying behavior", "variety-seeking buying behavior", "conspicuous consumption behavior"], ans:3, exp:"Carrie تُبدِّل العلامات باستمرار في الصابون = variety-seeking behavior. تورط منخفض + فروق كبيرة بين الماركات = يجرب لمجرد التغيير." , expW:{0:"Dissonance-reducing = تورط عالٍ + فروق قليلة",1:"Complex buying = تورط عالٍ + فروق كبيرة",2:"Habitual buying = تورط منخفض + فروق قليلة",4:"Conspicuous consumption = استهلاك استعراضي"}},
  { ch:"ch5", diff:"medium", q:"When customers have low involvement in a purchase but perceive significant brand differences, they will most likely engage in ________.", opts:["complex buying behavior", "dissonance-reducing buying behavior", "habitual buying behavior", "variety-seeking buying behavior", "consumer ethnocentrism"], ans:3, exp:"Variety-seeking = تورط منخفض + فروق كبيرة بين الماركات. المستهلك يُبدِّل الماركات ليس لعدم رضاه بل لمجرد التنوع والتجربة." , expW:{0:"Complex buying = تورط عالٍ + فروق كبيرة",1:"Dissonance-reducing = تورط عالٍ + فروق قليلة",2:"Habitual buying = تورط منخفض + فروق قليلة",4:"Consumer ethnocentrism = تفضيل المنتجات الوطنية"}},
  { ch:"ch5", diff:"hard", q:"The buyer decision process consists of five stages. Which of the following is NOT one of these stages?", opts:["need recognition", "information search", "conspicuous consumption", "purchase decision", "postpurchase behavior"], ans:2, exp:"مراحل قرار الشراء الخمس = إدراك الحاجة، البحث عن معلومات، تقييم البدائل، قرار الشراء، السلوك بعد الشراء. Conspicuous consumption ليست مرحلة." , expW:{0:"Need recognition = أولى مراحل قرار الشراء",1:"Information search = ثاني مراحل قرار الشراء",3:"Purchase decision = رابع مراحل قرار الشراء",4:"Postpurchase behavior = خامس مراحل قرار الشراء"}},
  { ch:"ch5", diff:"medium", q:"The buying decision process starts with ________, in which the buyer spots a problem.", opts:["need recognition", "information search", "impulse purchases", "buyer's remorse", "alternative evaluation"], ans:0, exp:"Need recognition = إدراك الحاجة: أولى مراحل قرار الشراء حين يلاحظ المشتري مشكلة أو حاجة. هذا هو البداية المحركة للعملية الشرائية." , expW:{1:"Information search = ثاني مراحل قرار الشراء",2:"Impulse purchases = شراء اندفاعي غير مخطط",3:"Buyer\'s remorse = ندم ما بعد الشراء",4:"Alternative evaluation = ثالث مراحل قرار الشراء"}},
  { ch:"ch5", diff:"medium", q:"An invitation to go skiing over the weekend forced Donna to look at her current wardrobe. She realized that she required a warmer coat. Which of the following stages of the buyer decision process does Donna exemplify?", opts:["product evaluation", "situational analysis", "need recognition", "problem screening", "information search"], ans:2, exp:"Donna أدركت أنها تحتاج معطفاً أدفأ = need recognition. تغيير الظروف (الدعوة للتزلج) خلق وعياً بالحاجة وأطلق عملية الشراء." , expW:{0:"Product evaluation = ليست مرحلة رسمية في قرار الشراء",1:"Situational analysis = ليست مرحلة رسمية في قرار الشراء",3:"Problem screening = ليست مرحلة رسمية في قرار الشراء",4:"Information search = ثانية المراحل وليس الأولى"}},
  { ch:"ch5", diff:"hard", q:"Donna wants to buy a new coat. During the ________ stage of the buyer decision process she will ask her friends to recommend stores that sell good quality winterwear clothing. She will also go through newspapers and magazines to look out for offers and sales on coats.", opts:["product evaluation", "alternative evaluation", "need recognition", "information search", "purchase decision"], ans:3, exp:"Donna تسأل أصدقاءها وتبحث في الجرائد = information search (البحث عن معلومات). هذه المرحلة الثانية من قرار الشراء." , expW:{0:"Product evaluation = ليست مرحلة رسمية في قرار الشراء",1:"Alternative evaluation = المرحلة الثالثة بعد جمع المعلومات",2:"Need recognition = المرحلة الأولى (إدراك الحاجة)",4:"Purchase decision = المرحلة الرابعة"}},
  { ch:"ch5", diff:"medium", q:"If a consumer's drive is strong and a satisfying product is near at hand, the consumer is likely to purchase the product at that time. If not, the consumer may store the need in memory or undertake ________.", opts:["consumer ethnocentrism", "buyer's remorse", "a need recognition", "an information search", "cognitive dissonance"], ans:3, exp:"إذا لم يُشبَع الدافع فوراً، يخزن المستهلك الحاجة في الذاكرة أو يقوم بالبحث عن معلومات (information search) لإيجاد منتج مناسب." , expW:{0:"Consumer ethnocentrism = تفضيل المنتجات الوطنية",1:"Buyer\'s remorse = ندم ما بعد الشراء",2:"A need recognition = مرحلة إدراك الحاجة (سابقة)",4:"Cognitive dissonance = قلق ما بعد الشراء"}},
  { ch:"ch5", diff:"hard", q:"James has decided to buy a new vehicle. His brother John has recently purchased a new truck and recommends the same model to James. James finally decides to buy the same truck. Which of the following sources of information has most likely influenced James' purchase decision?", opts:["experiential sources", "public sources", "personal sources", "commercial sources", "market mavens"], ans:2, exp:"توصية أخيه = personal sources (مصادر شخصية). المصادر الشخصية كالأسرة والأصدقاء هي الأكثر تأثيراً في قرارات الشراء." , expW:{0:"Experiential sources = مصادر تجريبية مباشرة مع المنتج",1:"Public sources = مصادر عامة كالإعلام والتقييمات",3:"Commercial sources = مصادر تجارية كالإعلانات",4:"Market mavens = خبراء السوق الذين يشاركون معلومات"}},
  { ch:"ch5", diff:"hard", q:"John has decided to buy a particular smartphone that he saw reviewed online. Which of the following sources of information has most likely influenced John's purchase decision?", opts:["laggards", "commercial sources", "public sources", "personal sources", "market mavens"], ans:2, exp:"المراجعة عبر الإنترنت = public sources (مصادر عامة). تشمل وسائل الإعلام ومواقع التقييم ومنظمات المستهلكين." , expW:{0:"Laggards = آخر من يتبنى المنتج",1:"Commercial sources = مصادر تجارية كالإعلانات",3:"Personal sources = توصيات أسرة وأصدقاء",4:"Market mavens = خبراء السوق"}},
  { ch:"ch5", diff:"medium", q:"Marketers realize that their commercial sources ________ the buyer.", opts:["legitimize products", "attract", "evaluate products", "personalize products to", "inform"], ans:4, exp:"المصادر التجارية (commercial sources) تُخبر (inform) المشتري. أما المصادر الشخصية فهي التي تُضفي الشرعية وتُقيِّم المنتجات." , expW:{0:"Legitimize products = هذه وظيفة المصادر الشخصية",1:"Attract = الجذب أثر لا وظيفة المصادر",2:"Evaluate products = هذه وظيفة المصادر الشخصية",3:"Personalize products to = ليست وظيفة المصادر"}},
  { ch:"ch5", diff:"medium", q:"The information sources that are the most effective at influencing a consumer's purchase decision are ________. These sources legitimize or evaluate products for the buyer.", opts:["commercial", "public", "experimental", "personal", "attitudinal"], ans:3, exp:"Personal sources (مصادر شخصية) = الأكثر فاعلية لأنها تُضفي الشرعية وتُقيِّم المنتجات للمشتري. الإعلانات تُعلِّم لكن التوصيات الشخصية تُقنِع." , expW:{0:"Commercial = تُخبر المشتري لكن لا تُضفي الشرعية",1:"Public = تُقيِّم بموضوعية لكن أقل تأثيراً",2:"Experimental = مصادر تجريبية مباشرة مع المنتج",4:"Attitudinal = ليست تصنيفاً معيارياً"}},
  { ch:"ch5", diff:"medium", q:"Marketers describe the way a consumer processes information to arrive at brand choices as ________.", opts:["alternative evaluation", "information search", "impulse buying", "consumer capitalism", "cognitive dissonance"], ans:0, exp:"Alternative evaluation = تقييم البدائل: الطريقة التي يعالج بها المستهلك المعلومات للوصول إلى اختيارات العلامة التجارية." , expW:{1:"Information search = المرحلة الثانية (جمع المعلومات)",2:"Impulse buying = شراء اندفاعي غير مخطط",3:"Consumer capitalism = مفهوم اقتصادي",4:"Cognitive dissonance = قلق ما بعد الشراء"}},
  { ch:"ch5", diff:"hard", q:"Robert has taken up cycling as a hobby and as a way to maintain his physical fitness. He wants to buy a hydration system since he will need a lot of water as he cycles. Having gathered a great deal of information, he has finally narrowed down his choices to three systems: Waterbags for Roadies, Supertanker Hydropacks, and Fast Water. Robert is in the ________ stage of the buyer decision process.", opts:["need recognition", "evaluation of alternatives", "product trial", "postpurchase evaluation", "information search"], ans:1, exp:"Robert ضيَّق اختياراته إلى ثلاثة = evaluation of alternatives (تقييم البدائل). بعد جمع المعلومات يُقيِّم الخيارات بناءً على معايير معينة." , expW:{0:"Need recognition = إدراك الحاجة (المرحلة الأولى)",2:"Product trial = تجربة المنتج",3:"Postpurchase evaluation = تقييم ما بعد الشراء",4:"Information search = جمع المعلومات (المرحلة الثانية)"}},
  { ch:"ch5", diff:"hard", q:"Sara is about to purchase a new television. She is using several attributes to evaluate her choices. Which of the following is least likely to be a criterion Sara is using?", opts:["price", "size of screen", "color of body", "network connectivity", "availability"], ans:4, exp:"الإتاحة (availability) الأقل احتمالاً كمعيار تقييم — المستهلك يُقيِّم عادةً بالسعر والحجم والاتصال بالشبكة والميزات، لا بمجرد الإتاحة." , expW:{0:"Price = سعر (معيار شائع للتقييم)",1:"Size of screen = حجم الشاشة (معيار شائع)",2:"Color of body = لون الجهاز (معيار جمالي شائع)",3:"Network connectivity = الاتصال بالشبكة (معيار مهم)"}},
  { ch:"ch5", diff:"medium", q:"Generally, the consumer's purchase decision will be to buy the most preferred brand, but two factors can come between the purchase intention and the purchase decision. Which of the following is one of these factors?", opts:["economic risks", "attitudes of others", "cognitive dissonance", "alternative evaluation", "buyer's remorse"], ans:1, exp:"العاملان بين نية الشراء وقرار الشراء = مواقف الآخرين (attitudes of others) والعوامل الظرفية غير المتوقعة. مثلاً: رأي صديق قد يُغير القرار." , expW:{0:"Economic risks = مخاطر اقتصادية (ليست العامل المحدد)",2:"Cognitive dissonance = قلق ما بعد الشراء (لاحق للقرار)",3:"Alternative evaluation = مرحلة سابقة للنية",4:"Buyer\'s remorse = ندم ما بعد الشراء"}},
  { ch:"ch5", diff:"medium", q:"After the purchase of a product, consumers will be either satisfied or dissatisfied and engage in ________.", opts:["consumer capitalism", "alternative evaluation", "postpurchase behavior", "consumer ethnocentrism", "information searches"], ans:2, exp:"Postpurchase behavior = السلوك بعد الشراء: المرحلة الخامسة والأخيرة. المستهلك يكون راضياً أو غير راضٍ وقد يُقدِّم ردود فعل مختلفة." , expW:{0:"Consumer capitalism = مفهوم اقتصادي",1:"Alternative evaluation = مرحلة سابقة للشراء",3:"Consumer ethnocentrism = تفضيل المنتجات الوطنية",4:"Information searches = مرحلة سابقة للشراء"}},
  { ch:"ch5", diff:"medium", q:"The relationship between the consumer's expectations and the product's ________ determines whether the buyer is satisfied or dissatisfied with a purchase.", opts:["perceived performance", "brand personality", "market reach", "consumer market", "market share"], ans:0, exp:"الرضا = العلاقة بين توقعات المستهلك والأداء المُدرَك (perceived performance). إذا الأداء فوق التوقعات → رضا عالٍ، وإذا دون التوقعات → خيبة." , expW:{1:"Brand personality = صفات إنسانية تُنسب للعلامة",2:"Market reach = مدى انتشار المنتج في السوق",3:"Consumer market = سوق المستهلكين",4:"Market share = الحصة السوقية"}},
  { ch:"ch5", diff:"medium", q:"A particular automobile company works to keep its customers happy after each sale, aiming to delight each one of them in order to increase their customer lifetime value. Which of the following steps of the buyer decision process does the company exemplify?", opts:["need recognition", "information search", "evaluation of alternatives", "purchase decision", "postpurchase behavior"], ans:4, exp:"إسعاد العملاء بعد البيع = postpurchase behavior stage. الشركة تعمل على تحقيق الرضا وتعزيز العلاقة لزيادة customer lifetime value." , expW:{0:"Need recognition = إدراك الحاجة (المرحلة الأولى)",1:"Information search = جمع المعلومات (المرحلة الثانية)",2:"Evaluation of alternatives = المرحلة الثالثة",3:"Purchase decision = المرحلة الرابعة"}},
  { ch:"ch5", diff:"hard", q:"Leona bought two different brands of wine from vineyards in Australia. When asked for her opinion about the wines, she said that one brand of wine tasted like alcoholic grape juice, but the other had a crisp taste that she really enjoyed. These statements were most likely made during the ________ stage of the buyer decision process.", opts:["information search", "need recognition", "alternative evaluation", "purchase decision", "postpurchase behavior"], ans:4, exp:"Leona تُعطي رأيها بعد شرائها وتجربتها = postpurchase behavior (السلوك بعد الشراء). تقييمها يعكس مستوى رضاها عن المنتج." , expW:{0:"Information search = جمع المعلومات (قبل الشراء)",1:"Need recognition = إدراك الحاجة (المرحلة الأولى)",2:"Alternative evaluation = مقارنة الخيارات (قبل الشراء)",3:"Purchase decision = قرار الشراء الفعلي"}},
  { ch:"ch5", diff:"medium", q:"Almost all major purchases result in ________, or discomfort caused by postpurchase conflict.", opts:["need recognition", "cognitive dissonance", "consumer ethnocentrism", "conspicuous consumption", "consumer capitalism"], ans:1, exp:"Cognitive dissonance = التنافر المعرفي: عدم الارتياح الناتج عن التعارض بعد الشراء. معظم المشتريات الكبيرة تُولِّد قدراً من هذا القلق." , expW:{0:"Need recognition = إدراك الحاجة (بداية عملية الشراء)",2:"Consumer ethnocentrism = تفضيل المنتجات الوطنية",3:"Conspicuous consumption = استهلاك استعراضي",4:"Consumer capitalism = مفهوم اقتصادي"}},
  { ch:"ch5", diff:"medium", q:"When a customer feels uneasy about losing out on the benefits of a brand not purchased, she is likely to experience ________.", opts:["selective retention", "selective attention", "selective distortion", "cognitive dissonance", "consumer ethnocentrism"], ans:3, exp:"الشعور بالقلق من خسارة مزايا العلامة غير المشتراة = cognitive dissonance. المستهلك يحتاج لتأكيد أن قراره كان صحيحاً." , expW:{0:"Selective retention = الاحتفاظ بالمعلومات الإيجابية",1:"Selective attention = الانتباه لما يثير اهتمامنا",2:"Selective distortion = تفسير المعلومات لتوافق معتقداتنا",4:"Consumer ethnocentrism = تفضيل المنتجات الوطنية"}},
  { ch:"ch5", diff:"medium", q:"Consumers learn about new products for the first time and make the decision to buy those products during the ________.", opts:["need recognition stage", "adoption process", "evaluation process", "trial process", "quality assessment stage"], ans:1, exp:"Adoption process = عملية التبني: المسار الذهني الذي يمر به الفرد من معرفة المنتج الجديد لأول مرة إلى قرار التبني النهائي." , expW:{0:"Need recognition stage = مرحلة إدراك الحاجة في قرار الشراء",2:"Evaluation process = تقييم المنتج الجديد",3:"Trial process = تجربة المنتج الجديد",4:"Quality assessment stage = تقييم الجودة"}},
  { ch:"ch5", diff:"medium", q:"Which of the following is the first stage in the new product adoption process?", opts:["awareness", "adoption", "evaluation", "interest", "trial"], ans:0, exp:"Awareness (الوعي) = أولى مراحل تبني المنتج الجديد: المستهلك يسمع عن المنتج لأول مرة لكنه لا يعرف تفاصيله بعد." , expW:{1:"Adoption = المرحلة الأخيرة في عملية التبني",2:"Evaluation = المرحلة الثالثة في عملية التبني",3:"Interest = المرحلة الثانية في عملية التبني",4:"Trial = المرحلة الرابعة في عملية التبني"}},
  { ch:"ch5", diff:"medium", q:"Which of the following is the adoption process stage at which the consumer considers whether trying the new product makes sense?", opts:["awareness", "interest", "evaluation", "adoption", "trial"], ans:2, exp:"Evaluation = مرحلة التقييم: المستهلك يفكر إذا كان تجربة المنتج الجديد منطقية له. هي المرحلة التي يُقرر فيها هل يجرب أم لا." , expW:{0:"Awareness = الوعي (المرحلة الأولى)",1:"Interest = الاهتمام (المرحلة الثانية)",3:"Adoption = التبني (المرحلة الأخيرة)",4:"Trial = التجربة (المرحلة الرابعة)"}},
  { ch:"ch5", diff:"hard", q:"Cameron loves to own and be up-to-date on the latest technological gadgets available in the market. Among his friends, he is always the first to own the latest electronic gadgets. He loves trying out new products before others. Cameron most likely belongs to the ________ adopter group.", opts:["innovator", "surrogate consumer", "late mainstream", "early mainstream", "lagging"], ans:0, exp:"Cameron = innovator (مبتكر). أول 2.5% يتبنون المنتج الجديد. مغامرون يحبون التجربة ويرحبون بالمجهول والتكنولوجيا الجديدة." , expW:{1:"Surrogate consumer = يقرر الشراء نيابة عن غيره",2:"Late mainstream = 34% المتأخرون (late majority)",3:"Early mainstream = 34% الأوائل (early majority)",4:"Lagging = آخر 16% يتبنون المنتج"}},
  { ch:"ch5", diff:"hard", q:"Five characteristics are important in influencing an innovation's rate of adoption. Which of the following is NOT one of those characteristics?", opts:["relative advantage", "compatibility", "consumability", "complexity", "communicability"], ans:2, exp:"الخصائص الخمس المؤثرة في سرعة التبني = relative advantage, compatibility, complexity, divisibility, communicability. Consumability ليست واحدة منها." , expW:{0:"Relative advantage = الميزة النسبية (من الخمسة)",1:"Compatibility = التوافق (من الخمسة)",3:"Complexity = التعقيد (من الخمسة)",4:"Communicability = قابلية التواصل (من الخمسة)"}},
  { ch:"ch5", diff:"easy", q:"In the context of product characteristics that influence the rate of adoption, ________ refers to the degree to which the innovation fits the values and experiences of potential consumers.", opts:["communicability", "relative advantage", "compatibility", "complexity", "divisibility"], ans:2, exp:"Compatibility = التوافق: درجة انسجام المنتج الجديد مع قيم وتجارب المستهلكين المحتملين. كلما زاد التوافق، زادت سرعة التبني." , expW:{0:"Communicability = قابلية ملاحظة النتائج ووصفها",1:"Relative advantage = درجة تفوق المنتج على المنتجات الحالية",3:"Complexity = صعوبة فهم المنتج واستخدامه",4:"Divisibility = إمكانية التجربة على نطاق محدود"}},
  { ch:"ch5", diff:"easy", q:"Which of the following product characteristics refers to the degree to which the innovation appears superior to existing products?", opts:["compatibility", "divisibility", "communicability", "relative advantage", "complexity"], ans:3, exp:"Relative advantage = الميزة النسبية: درجة تفوق المنتج الجديد على المنتجات القائمة. كلما كانت الميزة واضحة، كان التبني أسرع." , expW:{0:"Compatibility = درجة انسجام المنتج مع قيم المستهلكين",1:"Divisibility = إمكانية التجربة على نطاق محدود",2:"Communicability = قابلية ملاحظة النتائج ووصفها",4:"Complexity = صعوبة فهم المنتج واستخدامه"}},
  { ch:"ch5", diff:"medium", q:"Which of the following best describes divisibility of an innovation that influences the rate of adoption?", opts:["It is the degree to which the innovation is difficult to understand.", "It is the degree to which the results of using the innovation can be observed or described to others.", "It is the degree to which the innovation appears superior to existing products.", "It is the degree to which the innovation may be tried on a limited basis.", "It is the degree to which the innovation fits the values and experiences of potential consumers."], ans:3, exp:"Divisibility = قابلية التقسيم: إمكانية تجربة المنتج الجديد على نطاق محدود. كلما أمكن التجربة بسهولة قبل الالتزام الكامل، كان التبني أسرع." , expW:{0:"هذا تعريف Complexity (صعوبة الفهم)",1:"هذا تعريف Communicability (قابلية وصف النتائج)",2:"هذا تعريف Relative advantage (تفوق المنتج)",4:"هذا تعريف Compatibility (التوافق مع قيم المستهلك)"}},
  { ch:"ch5", diff:"medium", q:"Relative advantage, compatibility, complexity, divisibility, and communicability are all characteristics of ________.", opts:["alternative evaluations", "the degree of buyer involvement", "a product's rate of adoption", "unexpected situational factors", "postpurchase behaviors"], ans:2, exp:"Relative advantage, compatibility, complexity, divisibility, وcommunicability = الخصائص الخمس التي تحدد سرعة تبني المنتج الجديد (product's rate of adoption)." , expW:{0:"Alternative evaluations = تقييم بدائل الشراء",1:"The degree of buyer involvement = درجة تورط المشتري",3:"Unexpected situational factors = عوامل ظرفية غير متوقعة",4:"Postpurchase behaviors = سلوك ما بعد الشراء"}},
  { ch:"ch1", diff:"medium", q:"TRUE or FALSE: Marketing is managing profitable customer relationships.", opts:["True","False"], ans:0 , past:true, exp:"صح. تعريف التسويق الجوهري = بناء وإدارة علاقات مربحة مع العملاء من خلال تقديم قيمة متفوقة." },
  { ch:"ch1", diff:"medium", q:"TRUE or FALSE: Human needs are shaped by culture and individual personality.", opts:["True","False"], ans:1, past:true, exp:"خطأ. الـ WANTS (الرغبات) هي التي تُشكَّل بالثقافة والشخصية. أما الـ Needs (الحاجات) فهي فطرية (جوع، أمان، انتماء).", expW:{0:"الثقافة تُشكّل الـ wants، ليس الـ needs"} },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: The difference between human needs and wants is that needs are not created by marketers.", opts:["True","False"], ans:0, exp:"صح. Needs = حاجات فطرية (جوع، أمان). المسوقون لا يخلقون الحاجات — فقط يكتشفون الـ wants (الرغبات) التي تُعبّر عن هذه الحاجات." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: When backed by buying power, needs become wants.", opts:["True","False"], ans:1, exp:"خطأ. Demands = Wants + Buying Power. عندما تُدعم الرغبة بالقدرة الشرائية تصبح طلباً (demand) — وليس عندما تُدعم الحاجة." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: Market offerings are limited to physical products.", opts:["True","False"], ans:1, exp:"خطأ. Market offerings لا تقتصر على المنتجات المادية — تشمل الخدمات والمعلومات والتجارب أيضاً." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: An experience such as a vacation can be defined as a market offering.", opts:["True","False"], ans:0, exp:"صح. الإجازة (vacation) = تجربة، وهي جزء من market offering. المفهوم يشمل كل ما يُقدَّم لإشباع حاجة أو رغبة." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: When sellers focus on existing needs and lose sight of underlying customer wants, they suffer from marketing myopia.", opts:["True","False"], ans:1, exp:"خطأ. Marketing myopia = انشغال البائعين بمنتجاتهم القائمة وفقدان النظر للحاجة الأساسية للعميل — ليس التركيز على الـ wants." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: A market is the set of actual and potential buyers of a product or service.", opts:["True","False"], ans:0, exp:"صح. هذا هو تعريف السوق (market): مجموعة المشترين الفعليين (actual) والمحتملين (potential) لمنتج أو خدمة." },
  { ch:"ch1", diff:"medium", q:"TRUE or FALSE: Market segmentation is the process of seeking fewer customers and reduced demand for profit maximization only.", opts:["True","False"], ans:1 , past:true, exp:"خطأ. Market segmentation = تقسيم السوق إلى شرائح متجانسة لاستهداف أكثر دقة وفعالية. الهدف ليس تقليل العملاء." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: The selling concept holds that consumers will not buy enough of the firm's products unless the firm undertakes a large-scale selling and promotion effort.", opts:["True","False"], ans:0, exp:"صح. Selling concept = يفترض أن المستهلكين لن يشتروا بكميات كافية دون جهود ترويجية ضخمة — يُطبَّق على unsought goods." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: An organization's department follows a customer-centered sense-and-respond philosophy. The department is most likely practicing the product concept.", opts:["True","False"], ans:1, exp:"خطأ. Customer-centered sense-and-respond = Marketing concept (ليس product concept). Product concept يركّز على تحسين المنتج." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: The production concept and the product concept are marketing management orientations that are more likely to lead to marketing myopia.", opts:["True","False"], ans:0, exp:"صح. كلا المفهومين يعانيان من قصر النظر التسويقي: Production concept ينشغل بالكفاءة، وProduct concept ينشغل بالجودة — كلاهما يتجاهل العميل." },
  { ch:"ch1", diff:"medium", q:"TRUE or FALSE: The societal marketing concept calls on marketers to balance consumer wants and desires, company profits, and society's interests.", opts:["True","False"], ans:0, past:true, exp:"صح. هذا هو تعريف Societal marketing concept بالضبط: توازن بين 3 أطراف: رغبات العميل + أرباح الشركة + مصلحة المجتمع." },
  { ch:"ch1", diff:"hard", q:"TRUE or FALSE: Fast Food, Inc. views marketing as the process of finding and retaining profitable customers by providing them with the food they want. Fast Food, Inc. practices societal marketing.", opts:["True","False"], ans:1, past:true, exp:"خطأ. هذا هو Marketing concept (تركيز على رضا العميل وأرباح الشركة فقط). Societal marketing يضيف مصلحة المجتمع (صحة، بيئة).", expW:{0:"Societal marketing يتجاوز رضا العميل الفوري ليراعي المجتمع"} },
  { ch:"ch1", diff:"hard", q:"TRUE or FALSE: Healthy Veggies, LLC, believes that marketing is a tool to use in finding customers and keeping them by providing vegetables that are grown using chemical-free farming techniques and selling through small family-owned stores. Healthy Veggies, LLC, practices societal marketing.", opts:["True","False"], ans:0, exp:"صح. Healthy Veggies تجمع: رضا العميل (خضروات خالية من المواد الكيميائية) + مصلحة المجتمع (زراعة طبيعية) + قنوات توزيع محلية — هذا هو Societal marketing concept." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: The marketing mix refers to the set of marketing tools the firm uses to implement its marketing strategy.", opts:["True","False"], ans:0, exp:"صح. Marketing mix = المزيج التسويقي (4Ps) = الأدوات التي تستخدمها الشركة لتنفيذ استراتيجيتها التسويقية." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: For most marketers, customer relationship management is exclusively a matter of customer data management.", opts:["True","False"], ans:1, exp:"خطأ. CRM ليس فقط إدارة بيانات العملاء — هو بناء علاقات مربحة طويلة الأمد بتقديم قيمة ورضا متفوقين، ويشمل جميع نقاط التواصل." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: Customer-perceived value is defined as the customer's evaluation of the difference between all the benefits and all the costs of a market offering relative to those of competing offers.", opts:["True","False"], ans:0, exp:"صح. Customer-perceived value = تقييم العميل للفرق بين الفوائد الكلية والتكاليف الكلية مقارنةً بالعروض المنافسة." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: The meaning of value is perceived identically by all consumers.", opts:["True","False"], ans:1, exp:"خطأ. القيمة نسبية وتختلف من عميل لآخر بحسب الاحتياجات، التوقعات، التجربة، والخلفية الثقافية." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: Customer-managed relationships are marketing relationships that are controlled by customers; therefore, they are of no significance to marketers.", opts:["True","False"], ans:1, exp:"خطأ. Customer-managed relationships مهمة جداً للمسوقين — العملاء يشاركون في تشكيل علامتهم، والمسوقون يستفيدون منها لفهم توقعاتهم." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: Large-scale marketing approaches that foster two-way customer relationships are made possible by new communication technologies.", opts:["True","False"], ans:0, exp:"صح. التكنولوجيا الجديدة (وسائل التواصل، المنصات الرقمية) مكّنت الشركات من بناء علاقات ثنائية الاتجاه مع العملاء على نطاق واسع." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: In consumer-generated marketing, marketers play a bigger role in shaping consumers' brand experiences and those of others.", opts:["True","False"], ans:1, exp:"خطأ. في consumer-generated marketing، المستهلكون هم من يلعبون دوراً أكبر في تشكيل تجارب العلامة — لا المسوقون." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: To increase its \"share of customer,\" a firm concentrates on retaining as many customers as possible over its lifetime.", opts:["True","False"], ans:1, exp:"خطأ. Share of customer = زيادة نسبة إنفاق العميل عليك في فئتك. يختلف عن الاحتفاظ بالعملاء — يركّز على الحصة من محفظة إنفاقه." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: A company can create customer delight by meeting customer expectations through offering good products that do what is promised.", opts:["True","False"], ans:1, exp:"خطأ. Customer delight لا يتحقق بمجرد الوفاء بالوعود — بل يتطلب تجاوز التوقعات. الوفاء بالوعود فقط = customer satisfaction." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: Many companies now use customer profitability analysis to identify and weed out unprofitable customers.", opts:["True","False"], ans:0, exp:"صح. Customer profitability analysis = تحليل ربحية العميل لتحديد العملاء غير المربحين (strangers/barnacles) واتخاذ قرار بشأنهم." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: Many company and brand Web sites also serve as online brand communities, where customers can congregate and exchange brand-related interests and information.", opts:["True","False"], ans:0, exp:"صح. مواقع العلامات التجارية تُشكّل مجتمعات رقمية (online communities) يتبادل فيها العملاء الاهتمامات والمعلومات حول العلامة." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: The Internet of Things is a new product created by multiple companies working together.", opts:["True","False"], ans:1, exp:"خطأ. Internet of Things = شبكة من الأجهزة المتصلة بالإنترنت التي تتبادل البيانات (مثل الثلاجة الذكية). ليس منتجاً صنعته شركات معاً." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: Organizations choose to use only a few of the available online and social media. Using multiple social media results in confused fans.", opts:["True","False"], ans:1, exp:"خطأ. الشركات تستخدم منصات متعددة لتقديم رسائل متكاملة. التعدد لا يُشوّش — بل يُعزز التواصل مع شرائح مختلفة." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: Social media sites with small audiences, such as Birdpost.com, can be as effective in creating customer engagement as sites with large audiences, such as Pinterest.", opts:["True","False"], ans:0, exp:"صح. المنصات الصغيرة المتخصصة (niche) قد تكون فعّالة مثل الكبيرة في تحقيق تفاعل عالٍ — لأن جمهورها أكثر اهتماماً بالموضوع." },
  { ch:"ch1", diff:"easy", q:"TRUE or FALSE: Companies that do not target individual consumers do not benefit from using social media tools to appeal to their business customers.", opts:["True","False"], ans:1, exp:"خطأ. حتى الشركات التي لا تستهدف المستهلكين الأفراد (B2B) تستفيد من وسائل التواصل للوصول إلى العملاء التجاريين وبناء الثقة." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: The purpose of strategic planning is to find ways in which your company can best use its strengths to take advantage of attractive opportunities in the environment.", opts:["True","False"], ans:0, exp:"صح. Strategic planning = إيجاد أفضل الطرق لاستخدام قوة الشركة للاستفادة من الفرص المتاحة في البيئة. هذا هو جوهر التخطيط الاستراتيجي." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: A company's mission statement provides the depth needed for all segments of the company to reach their goals.", opts:["True","False"], ans:1, exp:"خطأ. Mission statement = بيان عام للغرض وليس خارطة طريق تفصيلية لكل قسم. الأقسام تضع أهدافها وخططها التفصيلية الخاصة." },
  { ch:"ch2", diff:"medium", q:"TRUE or FALSE: A mission statement is a document embodying an organization's short-term goals.", opts:["True","False"], ans:1, past:true, exp:"خطأ. Mission statement = غرض المنظمة طويل الأمد (ليس أهدافاً قصيرة الأمد). مثل Google: 'تنظيم معلومات العالم'." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: A clear mission statement acts as an \"invisible hand\" that guides people in the organization.", opts:["True","False"], ans:0, exp:"صح. Mission statement كاليد الخفية التي توجّه جميع أفراد المنظمة نحو غرض مشترك دون الحاجة لتوجيهات مستمرة." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: Mission statements should be market oriented.", opts:["True","False"], ans:0, exp:"صح. Mission statement يجب أن يكون market-oriented = يتحدث عن احتياجات العميل وليس عن المنتج. التركيز على المنتج = marketing myopia." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: \"At Joe's Diner, we serve great burgers\" is a product-oriented business definition.", opts:["True","False"], ans:0, exp:"صح. نخدم برغر رائع = product-oriented لأنه يصف المنتج (البرغر). المهمة الجيدة تصف القيمة للعميل (تجربة، إشباع حاجة)." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: \"At Trader Joe's, our mission is to provide all our customers the best food and beverage values to be found anywhere, and the information to make informed buying decisions.\" This is a product-oriented business definition.", opts:["True","False"], ans:1, exp:"خطأ. هذا market-oriented لأنه يتحدث عن تقديم قيمة للعملاء وتمكينهم من اتخاذ قرارات مستنيرة — ليس عن منتج معين." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: A company's mission could appropriately be stated as \"making more sales or profits.\"", opts:["True","False"], ans:1, exp:"خطأ. Mission statement لا يجب أن يكون عن الأرباح أو المبيعات. هذه أهداف مالية. المهمة = غرض أعمق يحدد لماذا توجد الشركة." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: The major activity in strategic planning is business portfolio analysis, whereby management evaluates the products and businesses that make up the company.", opts:["True","False"], ans:0, exp:"صح. النشاط الرئيسي في التخطيط الاستراتيجي = تحليل محفظة الأعمال: تقييم كل الوحدات والمنتجات لاتخاذ قرارات الاستثمار." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: The major activity in strategic planning is product innovation.", opts:["True","False"], ans:1, exp:"خطأ. النشاط الرئيسي = business portfolio analysis (تحليل المحفظة). ابتكار المنتجات هو نتيجة لقرارات strategic planning وليس النشاط الأساسي." },
  { ch:"ch2", diff:"medium", q:"TRUE or FALSE: On the BCG matrix, \"question marks\" are high-growth, high-share businesses or products.", opts:["True","False"], ans:1 , past:true, exp:"خطأ. Question marks = نمو عالٍ + حصة سوقية منخفضة. (نمو عالٍ + حصة عالية = Stars)." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: Market penetration involves offering modified or new products to current markets.", opts:["True","False"], ans:1, exp:"خطأ. Market penetration = نفس المنتج الحالي + نفس السوق الحالي (بيع أكثر لنفس العملاء). تقديم منتجات جديدة = Product development." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: Market development involves company growth by identifying and developing new market segments for current company products.", opts:["True","False"], ans:0, exp:"صح. Market development = نفس المنتج + سوق جديد. الشركة تأخذ منتجاتها الحالية وتبحث عن شرائح أو مناطق جغرافية جديدة." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: An American airline company started a grocery chain in Australia. This is an example of product development.", opts:["True","False"], ans:1, exp:"خطأ. هذا Diversification = منتج جديد تماماً (سلسلة بقالة) + سوق جديد (أستراليا). Product development = منتج جديد لنفس السوق الحالي." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: Company growth through diversification involves offering modified or new products to the company's current markets.", opts:["True","False"], ans:1, exp:"خطأ. Diversification = منتج جديد + سوق جديد (الاثنان جديدان). تقديم منتجات جديدة للأسواق الحالية = Product development." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: Customer engagement and value are the key ingredients in the marketer's formula for success.", opts:["True","False"], ans:0, exp:"صح. القيمة للعميل وإشراكه هما ركيزتا النجاح التسويقي. بدون قيمة حقيقية وإشراك فعّال لا يمكن بناء علاقات مربحة." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: Each department in a company can be thought of as a link in the company's internal value chain.", opts:["True","False"], ans:0, exp:"صح. كل قسم (R&D، إنتاج، تسويق، مبيعات، خدمة) = حلقة في سلسلة القيمة الداخلية. التنسيق بين الحلقات يخلق القيمة للعميل." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: Since companies want to work together to attract customers, marketers do not need to practice partner relationship management.", opts:["True","False"], ans:1, exp:"خطأ. Partner relationship management مطلوب بالضبط لأن الشركات تعتمد على شبكة شركاء (موردون، موزعون). بناء العلاقات مع الشركاء ضروري." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: To succeed in today's competitive marketplace, companies must be product-centered.", opts:["True","False"], ans:1, exp:"خطأ. النجاح اليوم يتطلب أن تكون الشركة customer-centered (محورها العميل). التمركز حول المنتج = marketing myopia." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: Dividing a market into distinct groups of buyers who have different needs, characteristics, or behaviors, and who might require separate products or marketing programs is known as market diversification.", opts:["True","False"], ans:1, exp:"خطأ. هذا التعريف الدقيق لـ Market segmentation (تقسيم السوق). Market diversification = دخول أسواق جديدة بمنتجات جديدة." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: A market segment consists of consumers who respond in different ways to a given set of marketing efforts.", opts:["True","False"], ans:1, exp:"خطأ. Market segment = مجموعة عملاء يستجيبون بنفس الطريقة (ليس بطرق مختلفة) لجهود التسويق. التشابه في الاستجابة هو جوهر الشريحة." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: A product's position is the place it occupies relative to competitors' products in consumers' minds.", opts:["True","False"], ans:0, exp:"صح. Positioning = مكانة المنتج في ذهن العميل مقارنةً بالمنافسين. هو المكان الذي يحتله المنتج في الخريطة الإدراكية للعميل." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: The marketing mix consists of people, property, planning, and position.", opts:["True","False"], ans:1, exp:"خطأ. Marketing mix = 4Ps: Product + Price + Place + Promotion. ليس People أو Property أو Planning أو Position." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: Product refers to the goods-and-services combination that a company offers to its target market.", opts:["True","False"], ans:0, exp:"صح. Product في الـ 4Ps = مزيج السلع والخدمات الذي تقدمه الشركة للسوق المستهدف." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: One valid criticism of the four Ps concept of the marketing mix is that services are not considered.", opts:["True","False"], ans:1, exp:"خطأ. الـ 4Ps تشمل الخدمات ضمن Product. انتقاد حقيقي للـ 4Ps هو أنها تبنّت منظور البائع لا المشتري (لذلك اقترح البعض الـ 4Cs)." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: The four Cs concept adopts the buyer's view of the market.", opts:["True","False"], ans:0, exp:"صح. الـ 4Cs (Customer solution, Customer cost, Convenience, Communication) = منظور المشتري. يقابل الـ 4Ps من منظور البائع." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: A SWOT analysis allows a marketer to evaluate the company's overall strengths, weaknesses, opportunities and threats.", opts:["True","False"], ans:0, exp:"صح. SWOT = تحليل نقاط القوة والضعف (داخلية) والفرص والتهديدات (خارجية). أداة شاملة لتقييم وضع الشركة." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: The four marketing management functions are analysis, planning, implementation, and control.", opts:["True","False"], ans:0, exp:"صح. وظائف إدارة التسويق الأربع: التحليل + التخطيط + التنفيذ + التحكم. تعمل بشكل دوري مستمر." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: Benchmarking refers to the process that turns marketing plans into marketing actions to accomplish strategic marketing objectives.", opts:["True","False"], ans:1, exp:"خطأ. هذا تعريف Marketing implementation. Benchmarking = مقارنة أداء الشركة بالمنافسين الرائدين لتحديد مجالات التحسين." },
  { ch:"ch2", diff:"easy", q:"TRUE or FALSE: Operating control involves checking ongoing performance against the annual plan and taking corrective action when necessary.", opts:["True","False"], ans:0, exp:"صح. Operating control = مقارنة الأداء الجاري بالخطة السنوية واتخاذ الإجراء التصحيحي. يختلف عن Strategic control الذي يفحص الاستراتيجية الكلية." },
  { ch:"ch2", diff:"medium", q:"TRUE or FALSE: Return on marketing investment refers to the net return from a marketing investment divided by the costs of the marketing investment.", opts:["True","False"], ans:0, past:true, exp:"صح. Marketing ROI = صافي العائد من الاستثمار التسويقي ÷ تكلفة الاستثمار التسويقي. يقيس ربحية التسويق." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: The microenvironment consists of larger societal forces that affect a company, such as demographic, economic, political, and cultural forces.", opts:["True","False"], ans:1 , exp:"FALSE: الـ Microenvironment = القوى القريبة (موردون، وسطاء، منافسون، عملاء). أما القوى المجتمعية الكبرى فهي الـ Macroenvironment." },
  { ch:"ch3", diff:"medium", q:"TRUE or FALSE: The macroenvironment consists of the factors close to the company that affect its ability to serve its customers, such as suppliers, customer markets, competitors, and publics.", opts:["True","False"], ans:1, past:true, exp:"خطأ. هذا وصف الـ Microenvironment. أما Macroenvironment = قوى المجتمع الكبيرة (ديموغرافية، اقتصادية، تكنولوجية، سياسية، ثقافية)." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Marketing success requires building relationships with other company departments, suppliers, marketing intermediaries, competitors, various publics, and customers, which combine to make up the company's value delivery network.", opts:["True","False"], ans:0 , exp:"TRUE: النجاح التسويقي يتطلب بناء علاقات مع الموردين والوسطاء والمنافسين والجمهور والعملاء — معاً يُشكّلون شبكة تقديم القيمة." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: A company's marketing environment excludes the forces outside the marketing department that affect marketing management's ability to build and maintain successful relationships with target customers.", opts:["True","False"], ans:1 , exp:"FALSE: البيئة التسويقية تشمل جميع القوى داخل وخارج إدارة التسويق التي تؤثر على قدرة الشركة في بناء علاقات ناجحة مع العملاء." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Marketing services agencies are the marketing research firms, advertising agencies, media firms, and marketing consulting firms that help the company target and promote its products to the right markets.", opts:["True","False"], ans:0 , exp:"TRUE: Marketing services agencies = شركات أبحاث التسويق ووكالات الإعلان وشركات الإعلام والاستشاريين — يساعدون الشركة في استهداف الأسواق الصحيحة." },
  { ch:"ch3", diff:"medium", q:"TRUE or FALSE: Local publics include consumer organizations, environmental groups, minority groups, and others.", opts:["True","False"], ans:0, past:true, exp:"صح. Local publics = الجيران والمجتمع المحلي. تشمل منظمات المستهلكين، المجموعات البيئية، الأقليات، وغيرهم في المجتمع المحيط." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: The aim of the entire value delivery network is to serve target customers and create strong relationships with them.", opts:["True","False"], ans:0 , exp:"TRUE: هدف شبكة تقديم القيمة بأكملها = خدمة العملاء المستهدفين وبناء علاقات قوية ومستدامة معهم." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Business markets buy goods and services for further processing or for use in their production processes.", opts:["True","False"], ans:0 , exp:"TRUE: Business markets = تشتري السلع والخدمات لمزيد من المعالجة أو استخدامها في عمليات الإنتاج — بخلاف المستهلك الفردي." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Trudie Jones works for a distribution channel firm that helps several electronics companies find customers or make sales to them. Trudie works for a reseller.", opts:["True","False"], ans:0 , exp:"TRUE: Resellers = شركات قنوات التوزيع التي تساعد في إيجاد العملاء أو إتمام عمليات البيع — وليس شركات التوزيع المادي." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: A business's suppliers are the most important actors in the company's microenvironment.", opts:["True","False"], ans:1 , exp:"FALSE: لا يوجد أكثر أهمية بين أطراف الـ Microenvironment — الموردون مهمون لكن العملاء والمنافسون والوسطاء أيضاً أساسيون." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Companies that watch variables such as income, cost of living, and interest rates, are more likely to be negatively affected by an economic change such as a recession or boom.", opts:["True","False"], ans:1 , exp:"FALSE: الشركات التي تراقب المتغيرات الاقتصادية (الدخل، تكلفة المعيشة، أسعار الفائدة) تكون أكثر قدرةً على التكيف مع التغيرات الاقتصادية — وليس أكثر تضرراً." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Government agencies such as the Food and Drug Administration and the Consumer Product Safety Commission investigate and ban potentially unsafe products. Regulations created by these and other agencies result in higher research costs and longer times between new product ideas and their introduction.", opts:["True","False"], ans:0 , exp:"TRUE: FDA وCPSC تتحقق من سلامة المنتجات وقد تحظرها — لوائحهما ترفع تكاليف البحث وتطيل وقت طرح المنتجات." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: A trend has been people's growing mastery over nature through technology and the belief that nature is bountiful, but also the realization that it is finite and fragile.", opts:["True","False"], ans:0 , exp:"TRUE: الاتجاه الحديث = إدراك متزايد بأن الطبيعة ثمينة وهشة مما يعزز حركة الاستدامة البيئية." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Marketing management can control environmental forces. A reactive approach is, therefore, the most beneficial approach to the marketing environment.", opts:["True","False"], ans:1 , exp:"FALSE: لا يستطيع التسويق التحكم في القوى البيئية — والنهج الاستباقي (Proactive) أفضل من الانتظار والتكيف فقط." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: The demographic environment is of major interest to marketers because it involves people, and people make up markets.", opts:["True","False"], ans:0 , exp:"TRUE: البيئة الديموغرافية تدرس البشر — والبشر هم الأسواق — لذا هي الأساس لفهم المستهلكين وتحديد الفرص." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: The single most important demographic trend in the United States that marketers should understand is the changing family structure of the population.", opts:["True","False"], ans:1 , exp:"الاتجاه الديموغرافي الأهم في أمريكا = التغيّر في الهيكل العمري للسكان — يؤثر على كل فئة مستهلكين ويعيد تشكيل الأسواق." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: As baby boomers reach their peak earning and spending years, they become lucrative markets for financial services, travel, and entertainment.", opts:["True","False"], ans:0 , exp:"TRUE: Baby boomers في ذروة سنوات الربح والإنفاق يصبحون أسواقاً مربحة للخدمات المالية والسفر والترفيه." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Millennials comprise the most financially affluent group in America today.", opts:["True","False"], ans:1 , exp:"FALSE: Baby boomers هم الأكثر ثراءً وأعلى دخلاً في أمريكا — لا الـ Millennials." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: The Gen Xers are increasingly displacing the lifestyles, culture, and values of the baby boomers.", opts:["True","False"], ans:0 , exp:"TRUE: Gen Xers يُحلّون تدريجياً محل قيم وأساليب حياة Baby boomers في الثقافة والاقتصاد الأمريكي." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Millennials represent a larger demographic segment than the baby boomers or Gen Xers.", opts:["True","False"], ans:0 , exp:"TRUE: Millennials يمثلون الشريحة الديموغرافية الأكبر في تاريخ أمريكا — يتجاوزون عدد Baby boomers وGen Xers." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Marketers must increasingly consider the special needs of traditional households because this segment of the population is growing more rapidly than nontraditional households.", opts:["True","False"], ans:1 , exp:"FALSE: الأسر غير التقليدية هي التي تنمو بسرعة — وليس التقليدية. يجب أن يُركّز المسوقون على الأسر غير التقليدية." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: The American workforce today is less white-collar than in the late twentieth century.", opts:["True","False"], ans:1 , exp:"FALSE: القوى العاملة الأمريكية أصبحت أكثر من ذوي الياقات البيضاء (white-collar) وليس أقل — بسبب التحول نحو الاقتصاد الخدمي." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Companies in several industries have recognized the buying power of the LGBT segment of the U.S. population and have begun explicitly targeting these consumers with gay-specific ads and marketing efforts.", opts:["True","False"], ans:0 , exp:"TRUE: الشركات بدأت تستهدف مجتمع LGBT بإعلانات موجهة لأنهم يمتلكون قوة شرائية عالية وولاءً للعلامات التجارية الداعمة." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Prior to the Great Recession of 2008/2009, American consumer spending was careful and restrained.", opts:["True","False"], ans:1 , exp:"FALSE: قبل الركود الكبير كان المستهلكون الأمريكيون يُنفقون بحرية وتفاؤل — لم يكن إنفاقهم حذراً ومتحفظاً." },
  { ch:"ch3", diff:"medium", q:"TRUE or FALSE: Environmental sustainability concerns have declined steadily over the past three decades.", opts:["True","False"], ans:1, past:true, exp:"خطأ. اهتمامات الاستدامة البيئية ازدادت بشكل ملحوظ خلال العقود الثلاثة الماضية — لم تنخفض. التغير المناخي والتلوث زادوا الوعي." },
  { ch:"ch3", diff:"medium", q:"TRUE or FALSE: The technological environment is predominantly static.", opts:["True","False"], ans:1, past:true, exp:"خطأ. البيئة التكنولوجية من أسرع البيئات تغيراً (dynamic). الإنترنت، الذكاء الاصطناعي، التطبيقات — كلها أمثلة على التغير المتسارع." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: The introduction of new technologies is equally beneficial to all industries.", opts:["True","False"], ans:1 , exp:"FALSE: التكنولوجيا الجديدة تُفيد بعض الصناعات وتضر أخرى — مثل الإنترنت الذي أضر بصناعة الصحافة الورقية." },
  { ch:"ch3", diff:"medium", q:"TRUE or FALSE: The popularity of cause-related marketing as a form of corporate giving is rapidly declining.", opts:["True","False"], ans:1, past:true, exp:"خطأ. Cause-related marketing في ازدياد — الشركات تربط علامتها بقضايا اجتماعية (بيئة، تعليم) لبناء صورة إيجابية." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: Secondary beliefs and values are less open to change than core beliefs and values.", opts:["True","False"], ans:1 , exp:"FALSE: Secondary beliefs = أكثر انفتاحاً على التغيير، بعكس Core beliefs التي تقاوم التغيير بشدة." },
  { ch:"ch3", diff:"easy", q:"TRUE or FALSE: When a company hires lobbyists to influence legislation affecting its industry, it is taking a defensive stance toward the marketing environment.", opts:["True","False"], ans:1 , exp:"Proactive stance = توظيف لوبيين للتأثير على التشريعات = نهج استباقي لتشكيل البيئة التسويقية لصالح الشركة." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: The starting point of understanding how consumers respond to various marketing efforts is called the stimulus-response model of buyer behavior.", opts:["True","False"], ans:0, exp:"صح. نموذج الاستجابة للمثيرات (stimulus-response model) هو نقطة البداية لفهم كيفية استجابة المستهلكين للجهود التسويقية." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Consumers can easily explain what influences their purchases.", opts:["True","False"], ans:1, exp:"خطأ. معظم عوامل الشراء تقع داخل الـ black box (اللاوعي). المستهلكون لا يستطيعون دائماً شرح ما يؤثر فعلاً على قراراتهم." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Subcultures consist only of religious groups.", opts:["True","False"], ans:1, exp:"خطأ. الثقافات الفرعية تشمل: الجنسيات، الأديان، المجموعات العرقية، والمناطق الجغرافية — وليس الأديان فحسب." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Asian-American consumers are the least brand conscious of all ethnic groups.", opts:["True","False"], ans:1, exp:"خطأ. Asian Americans هم الأكثر وعياً بالعلامات التجارية بين المجموعات العرقية — وليس الأقل." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Social class is based on shared value systems and common life experiences and situations.", opts:["True","False"], ans:1, exp:"خطأ. هذا تعريف الـ subculture (الثقافة الفرعية). أما Social class فتُحدَّد بالدخل والتعليم والمهنة والثروة." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: In the United States, the lines between social classes are not fixed and rigid, but people can only drop to a lower social class and not move up into a higher one.", opts:["True","False"], ans:1, exp:"خطأ. في أمريكا الحراك الاجتماعي ممكن في الاتجاهين: صعوداً وهبوطاً. الحدود بين الطبقات ليست صارمة." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Online social networks represent an important avenue to create buzz for marketers.", opts:["True","False"], ans:0, exp:"صح. الشبكات الاجتماعية الإلكترونية أداة مهمة لإنشاء buzz marketing (التسويق الطنيني) ونشر الكلام الشفهي الإيجابي عن العلامة." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Children exert little influence on family buying decisions.", opts:["True","False"], ans:1, exp:"خطأ. الأطفال يمارسون تأثيراً كبيراً على قرارات الشراء الأسرية خاصة في منتجات الطعام والألعاب والترفيه." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: A person's occupation has no effect on the goods and services that she buys.", opts:["True","False"], ans:1, exp:"خطأ. المهنة تؤثر تأثيراً كبيراً على نوع المنتجات المشتراة — طبيب يشتري زياً مختلفاً عن عامل بناء مثلاً." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: People's tastes in food, clothes, recreation, and even furniture remain unchanged as they age.", opts:["True","False"], ans:1, exp:"خطأ. أذواق الناس تتغير مع العمر ومراحل الحياة (age and life-cycle). ما يُفضِّله الشاب يختلف عما يُفضِّله الكهل." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Personality is a person's pattern of living as expressed in his or her psychographics.", opts:["True","False"], ans:1, exp:"خطأ. هذا تعريف Lifestyle (نمط الحياة). أما Personality فهي الخصائص النفسية الفريدة التي تميز الشخص." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: A brand personality is the specific mix of human traits that may be attributed to a particular brand.", opts:["True","False"], ans:0, exp:"صح. Brand personality = مزيج محدد من الصفات الإنسانية المنسوبة لعلامة تجارية. مثلاً: Apple = إبداع وابتكار، Harley = حرية وقوة." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: According to Maslow's hierarchy of needs theory, when the most important need is satisfied, it will cease to be a motivator, and the person will then try to satisfy the next most important need.", opts:["True","False"], ans:0, exp:"صح. هرم Maslow: عندما تُشبَع الحاجة الأكثر إلحاحاً تتوقف عن التحفيز، ويسعى الشخص لإشباع الحاجة التالية في الترتيب." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Alternative evaluation is the process by which people select, organize, and interpret information to form a meaningful picture of the world.", opts:["True","False"], ans:1, exp:"خطأ. هذا تعريف Perception (الإدراك). أما Alternative evaluation فهي مرحلة مقارنة الخيارات المتاحة في قرار الشراء." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: While an individual's beliefs are difficult to change, an individual's attitudes are easy to change.", opts:["True","False"], ans:1, exp:"خطأ. كلاهما صعب التغيير. المواقف (attitudes) راسخة ومتسقة ولا تتغير بسهولة — لهذا يتحاشى المسوقون محاولة تغييرها ويُفضِّلون العمل في إطارها." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Store salespeople and a consumer's friends rarely impact someone's final purchase decision.", opts:["True","False"], ans:1, exp:"خطأ. البائعون والأصدقاء يؤثرون تأثيراً كبيراً على قرار الشراء النهائي — يمثلون عوامل ظرفية غير متوقعة وعوامل اجتماعية مهمة." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Dissonance-reducing buying behavior typically occurs when a buyer sees little difference among brands but is highly involved with the purchase.", opts:["True","False"], ans:0, exp:"صح. Dissonance-reducing = تورط عالٍ + فروق قليلة بين الماركات. المشتري يتخذ قراراً سريعاً ثم يبحث عن تأكيد لصحة قراره." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Jim is planning on buying an expensive HDTV and he realizes that there are few differences between brands. Jim is displaying complex buying behavior.", opts:["True","False"], ans:1, exp:"خطأ. Jim: تورط عالٍ + فروق قليلة = dissonance-reducing behavior. Complex buying يتطلب فروقاً كبيرة بين الماركات." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Habitual buying behavior involves consumers searching extensively for information about brands and evaluating brand characteristics.", opts:["True","False"], ans:1, exp:"خطأ. Habitual buying = شراء روتيني بدون بحث أو تقييم مكثف. البحث المكثف صفة Complex buying behavior (تورط عالٍ)." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Commercial sources of information typically legitimize and evaluate products for buyers.", opts:["True","False"], ans:1, exp:"خطأ. المصادر التجارية (commercial sources) تُخبر المشتري. أما التي تُضفي الشرعية وتُقيِّم المنتجات فهي المصادر الشخصية (personal sources)." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Postpurchase behavior is the stage of the buyer decision process in which consumers take further action after purchase, based on their satisfaction or dissatisfaction.", opts:["True","False"], ans:0, exp:"صح. Postpurchase behavior = المرحلة الخامسة والأخيرة. المستهلك يُتابع (شكوى، إعادة، توصية) بناءً على مستوى رضاه." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Abel is considering whether or not to get an e-reader. He has read online reviews of three different kinds of readers and has talked with two friends who own e-readers. Abel is at the awareness stage of the new product adoption process.", opts:["True","False"], ans:1, exp:"خطأ. Abel يُقيِّم ويبحث = evaluation stage أو interest stage. أما Awareness فهي مجرد معرفة وجود المنتج لأول مرة." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: The adoption process for new products refers to the mental process through which an individual passes from first learning about an innovation to final adoption.", opts:["True","False"], ans:0, exp:"صح. Adoption process = المسار الذهني من أول معرفة بالمنتج الجديد إلى التبني النهائي: وعي → اهتمام → تقييم → تجربة → تبني." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Being able to try a new product is an unimportant stage in the adoption process as the consumer already has a good idea of the product's value.", opts:["True","False"], ans:1, exp:"خطأ. مرحلة التجربة (trial) مهمة جداً في عملية التبني — تُتيح للمستهلك تجربة المنتج على نطاق محدود قبل الالتزام الكامل." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: People differ greatly in their readiness to try new products. In each product area, there are \"consumption pioneers,\" also referred to as lagging adopters.", opts:["True","False"], ans:1, exp:"خطأ. رواد الاستهلاك (consumption pioneers) يُسمَّون innovators أو early adopters — وليس lagging adopters الذين هم آخر من يتبنى." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Early adopters are opinion leaders in their communities. They adopt new ideas early but carefully.", opts:["True","False"], ans:0, exp:"صح. Early adopters = المتبنون المبكرون (13.5%). هم قادة رأي في مجتمعاتهم يتبنون الأفكار الجديدة مبكراً لكن بعناية وتروٍّ." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Early mainstream adopters accept new ideas after the average person.", opts:["True","False"], ans:1, exp:"خطأ. Early majority (34%) يتبنون قبل الشخص العادي — وليس بعده. الـ late majority هم من يتبنون بعد الشخص العادي." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Ed purchased electronic devices such as a smartphone, and tablet after many people he knew already owned the devices. Ed belongs to the adopter group called lagging adopters.", opts:["True","False"], ans:0, exp:"صح. Ed اشترى بعد أن امتلك معظم معارفيه الأجهزة = lagging adopters (آخر 16%). مقاومون للتغيير ويتبنون فقط عندما يصبح المنتج تقليداً." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Viviana wants to be the first to own the new fashion style of shoes. Viviana is an early mainstream adopter.", opts:["True","False"], ans:1, exp:"خطأ. Viviana تريد أن تكون الأولى = innovator (أول 2.5%). Early mainstream adopters يتبعون الأوائل ولا يكونون الأوائل." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: Two of the characteristics that are especially important in influencing an innovation's rate of adoption are relative advantage and compatibility.", opts:["True","False"], ans:0, exp:"صح. Relative advantage (الميزة النسبية) وCompatibility (التوافق) هما من أهم خصائص تحديد سرعة تبني المنتج الجديد." },

  // ── Customer Journey (19th Edition) ──
  { ch:"ch5", diff:"medium", q:"The ________ is defined as the sum of the ongoing experiences consumers have with a brand that affect their buying behavior, engagement, and brand advocacy over time.", opts:["buyer decision process","customer journey","adoption process","consumer behavior model","postpurchase evaluation"], ans:1, exp:"Customer journey = مجموع التجارب المستمرة التي يمر بها المستهلك مع العلامة التجارية — تؤثر على سلوك الشراء والتفاعل والدفاع عن العلامة بمرور الوقت.", expW:{0:"Buyer decision process = الخطوات الخمس لاتخاذ قرار شراء محدد",2:"Adoption process = مراحل تبني منتج جديد",3:"Consumer behavior model = نموذج للعوامل المؤثرة في السلوك",4:"Postpurchase evaluation = تقييم ما بعد الشراء فقط"} },
  { ch:"ch5", diff:"medium", q:"Which of the following best describes the purpose of understanding the customer journey?", opts:["To identify the cheapest marketing channels","To create brand experiences that result in positive purchase behavior and brand advocacy","To reduce the number of steps in the buying process","To eliminate postpurchase dissonance","To track competitors' marketing activities"], ans:1, exp:"فهم رحلة العميل يُمكِّن المسوقين من تصميم تجارب علامة تجارية تُحقق: سلوك شراء إيجابي، تفاعل مستمر، ودفاع المستهلك عن العلامة.", expW:{0:"المسارات الأرخص هدف تشغيلي لا علاقة له برحلة العميل",2:"تقليل خطوات الشراء ليس هدف رحلة العميل",3:"التنافر بعد الشراء جزء من الرحلة لا يُزال",4:"متابعة المنافسين هدف مختلف"} },
  { ch:"ch5", diff:"hard", q:"A brand manager wants to improve long-term customer loyalty and advocacy. According to the customer journey concept introduced in the 19th edition, what should she focus on?", opts:["Offering the lowest price in the market","Understanding and shaping the sum of ongoing consumer experiences with the brand over time","Launching more aggressive advertising campaigns","Increasing the number of product variants","Reducing delivery times only"], ans:1, exp:"Customer journey: التركيز على مجموع التجارب المستمرة مع العلامة بمرور الوقت — لا على عامل واحد كالسعر أو الإعلان — هو ما يبني الولاء والدفاع عن العلامة على المدى البعيد.", expW:{0:"السعر الأدنى قد يجذب لكنه لا يبني الولاء طويل الأمد",2:"الإعلان المكثف لا يضمن تجربة إيجابية متكاملة",3:"تنوع المنتجات لا يعالج رحلة العميل",4:"سرعة التوصيل عامل واحد فقط من الرحلة"} },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: The customer journey refers only to the moment of purchase and nothing else.", opts:["True","False"], ans:1, exp:"خطأ. Customer journey = مجموع التجارب المستمرة قبل الشراء وأثناءه وبعده — تشمل الوعي، التفاعل، الشراء، الاستخدام، والدفاع عن العلامة." },
  { ch:"ch5", diff:"easy", q:"TRUE or FALSE: By understanding the customer journey, marketers can work to create brand experiences that result in positive purchase behavior, engagement, and brand advocacy over time.", opts:["True","False"], ans:0, exp:"صح. هذا هو الهدف الرئيسي من فهم رحلة العميل — تصميم تجارب إيجابية في كل نقطة تماس مع العلامة لبناء ولاء مستدام." },
  { ch:"ch5", diff:"hard", q:"According to Maslow hierarchy of needs a company marketing home security systems is primarily appealing to which level?", opts:["Physiological needs","Safety needs","Social needs","Esteem needs","Self-actualization needs"], ans:1, exp:"Home security systems = يُشبع حاجة الأمان (Safety needs) — المستوى الثاني في هرم ماسلو. بعد تلبية الاحتياجات الفيزيولوجية (طعام، ماء).", expW:{0:"Physiological = طعام وماء ومأوى",2:"Social = انتماء وصداقة",3:"Esteem = احترام الذات ومكانة",4:"Self-actualization = تحقيق الذات"} },
  { ch:"ch5", diff:"hard", q:"A consumer who buys the same brand of coffee every week without much thought is exhibiting ___.", opts:["Complex buying behavior","Dissonance-reducing buying behavior","Variety-seeking buying behavior","Habitual buying behavior","Impulse buying behavior"], ans:3, exp:"Habitual buying = مشاركة منخفضة + فروق بسيطة بين الماركات. الشراء المتكرر بدون تفكير عميق = عادة لا ولاء حقيقي.", expW:{0:"Complex = مشاركة عالية + فروق كبيرة",1:"Dissonance-reducing = مشاركة عالية + فروق بسيطة",2:"Variety-seeking = مشاركة منخفضة + رغبة في التجربة",4:"Impulse = شراء غير مخطط مختلف عن العادة"} },
  { ch:"ch5", diff:"hard", q:"All of the following are stages in the buyer decision process EXCEPT ___.", opts:["Need recognition","Information search","Evaluation of alternatives","Post-purchase behavior","Brand positioning"], ans:4, exp:"مراحل قرار الشراء الخمس: (1) Need recognition، (2) Information search، (3) Evaluation of alternatives، (4) Purchase decision، (5) Post-purchase behavior. Brand positioning = استراتيجية تسويق وليست مرحلة شراء.", expW:{0:"Need recognition = المرحلة الأولى",1:"Information search = المرحلة الثانية",2:"Evaluation of alternatives = المرحلة الثالثة",3:"Post-purchase = المرحلة الخامسة"} },
  { ch:"ch5", diff:"hard", q:"A consumer buys a laptop then worries it was not the best choice and seeks positive reviews to reduce discomfort. This behavior is called ___.", opts:["Complex buying","Selective distortion","Cognitive dissonance","Variety-seeking","Selective retention"], ans:2, exp:"Cognitive dissonance = قلق ما بعد الشراء. المستهلك يبحث عن معلومات تؤكد صحة قراره لتقليل التوتر الداخلي.", expW:{0:"Complex buying = مرحلة ما قبل الشراء",1:"Selective distortion = تحريف المعلومات لتناسب معتقداتنا",3:"Variety-seeking = رغبة في التجديد",4:"Selective retention = تذكر المعلومات الإيجابية فقط"} },
];

// ══════════════════════════════════════════════
//  FIREBASE INIT
// ══════════════════════════════════════════════
let auth, db;
try {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  else firebase.app();
  auth = firebase.auth();
  db   = firebase.firestore();
} catch(e) { console.warn('Firebase init error:', e); }

// ── AUTH FUNCTIONS ─────────────────────────────
function authTab(tab) {
  const accent = '#0d9488';
  const isLogin = tab === 'login';
  const onStyle  = `flex:1;padding:10px;border-radius:10px;font-weight:700;cursor:pointer;font-size:.95rem;background:${accent};color:#fff;border:none;`;
  const offStyle = `flex:1;padding:10px;border-radius:10px;font-weight:700;cursor:pointer;font-size:.95rem;background:transparent;color:${accent};border:2px solid rgba(13,148,166,0.35);`;
  document.getElementById('tab-login').style.cssText    = isLogin  ? onStyle : offStyle;
  document.getElementById('tab-register').style.cssText = !isLogin ? onStyle : offStyle;
  document.getElementById('auth-name-wrap').style.display = isLogin ? 'none' : 'block';
  document.getElementById('auth-submit').textContent = isLogin ? 'دخول' : 'إنشاء حساب';
  document.getElementById('auth-submit').dataset.mode = tab;
  document.getElementById('auth-err').textContent = '';
  const forgotBtn = document.getElementById('auth-forgot');
  if (forgotBtn) forgotBtn.style.display = isLogin ? 'inline-block' : 'none';
}

async function forgotPassword() {
  if (!auth) return;
  const email = document.getElementById('auth-email').value.trim();
  const err = document.getElementById('auth-err');
  if (!email) { err.textContent = 'أدخل بريدك الإلكتروني أولاً'; err.style.color = '#f87171'; return; }
  try {
    await auth.sendPasswordResetEmail(email);
    err.textContent = 'تم إرسال رابط إعادة تعيين كلمة السر إلى بريدك ✓';
    err.style.color = '#34d399';
  } catch(e) {
    err.textContent = 'البريد غير موجود أو حدث خطأ';
    err.style.color = '#f87171';
  }
}

async function authSubmit() {
  if (!auth) return;
  const mode  = document.getElementById('auth-submit').dataset.mode || 'login';
  const email = document.getElementById('auth-email').value.trim();
  const pass  = document.getElementById('auth-pass').value;
  const nameEl = document.getElementById('auth-name');
  const name  = nameEl ? nameEl.value.trim() : '';
  const err   = document.getElementById('auth-err');
  if (!email || !pass) { err.textContent = 'الرجاء تعبئة جميع الحقول'; return; }
  if (mode === 'register' && !name) { err.textContent = 'الرجاء كتابة اسمك'; return; }
  document.getElementById('auth-submit').textContent = '...';
  try {
    if (mode === 'login') {
      await auth.signInWithEmailAndPassword(email, pass);
    } else {
      const cred = await auth.createUserWithEmailAndPassword(email, pass);
      await cred.user.updateProfile({ displayName: name });
      if (db) await db.collection('mkt201_users').doc(cred.user.uid).set(
        { name, email, createdAt: firebase.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );
    }
    err.textContent = '';
  } catch(e) {
    const firebaseErrors = {
      'auth/wrong-password': 'كلمة السر غلط، حاول مرة ثانية',
      'auth/invalid-credential': 'البريد أو كلمة السر غلط',
      'auth/user-not-found': 'ما لقينا حساب بهالبريد',
      'auth/email-already-in-use': 'البريد مستخدم من قبل، جرب تسجّل دخول',
      'auth/weak-password': 'كلمة السر ضعيفة — لازم ٦ أحرف على الأقل',
      'auth/invalid-email': 'البريد الإلكتروني غير صالح',
      'auth/too-many-requests': 'محاولات كثيرة، انتظر شوي وحاول مرة ثانية',
      'auth/network-request-failed': 'مشكلة بالاتصال، تأكد من الانترنت',
      'auth/user-disabled': 'الحساب موقوف، تواصل مع الدعم',
      'auth/operation-not-allowed': 'العملية غير مسموحة حالياً',
    };
    err.textContent = firebaseErrors[e.code] || e.message.replace('Firebase: ','').replace(/ \(auth\/.*\)/,'');
    document.getElementById('auth-submit').textContent = mode === 'login' ? 'دخول' : 'إنشاء حساب';
  }
}

function skipAuth() {
  const overlay = document.getElementById('auth-overlay');
  if (overlay) overlay.style.display = 'none';
  showThemePickerIfNeeded();
}

function signOutUser() {
  if (!auth) return;
  auth.signOut().then(() => {
    const overlay = document.getElementById('auth-overlay');
    if (overlay) overlay.style.display = 'flex';
    const ui = document.getElementById('fb-user-info');
    if (ui) ui.style.display = 'none';
  });
}

if (auth) {
  auth.onAuthStateChanged(async user => {
    currentUser = user;
    if (user) {
      const overlay = document.getElementById('auth-overlay');
      if (overlay) overlay.style.display = 'none';
      const ui   = document.getElementById('fb-user-info');
      const uname= document.getElementById('fb-user-name');
      if (ui)    ui.style.display = 'flex';
      if (uname) uname.textContent = user.displayName || user.email.split('@')[0];
      await syncUserProgress(user);
      renderLeaderboard();
      showThemePickerIfNeeded();
    } else {
      const overlay = document.getElementById('auth-overlay');
      if (overlay) overlay.style.display = 'flex';
      const ui = document.getElementById('fb-user-info');
      if (ui) ui.style.display = 'none';
    }
  });
}

async function syncUserProgress(user) {
  if (!db || !user) return;
  try {
    const ref = db.collection('mkt201_users').doc(user.uid);
    const doc = await ref.get();
    const localBest    = JSON.parse(localStorage.getItem('mkt201_bestScores')   || '{}');
    const localTotal   = parseInt(localStorage.getItem('mkt201_totalQuizzes')   || '0');
    const localCorrect = parseInt(localStorage.getItem('mkt201_totalCorrect')   || '0');
    let mergedBest = { ...localBest }, mergedTotal = localTotal, mergedCorrect = localCorrect;
    if (doc.exists) {
      const data = doc.data();
      const remoteBest = data.bestScores || {};
      Object.keys(remoteBest).forEach(k => {
        if (mergedBest[k] === undefined || remoteBest[k] > mergedBest[k]) mergedBest[k] = remoteBest[k];
      });
      mergedTotal   = Math.max(localTotal,   data.totalQuizzes  || 0);
      mergedCorrect = Math.max(localCorrect, data.totalCorrect  || 0);
      // Sync mastery from Firebase
      if (data.mastery) {
        try {
          const localMastery = JSON.parse(localStorage.getItem('mkt201_mastery') || '{}');
          const remoteMastery = JSON.parse(data.mastery);
          const merged = { ...remoteMastery };
          Object.keys(localMastery).forEach(key => {
            if (!merged[key]) {
              merged[key] = localMastery[key];
            } else {
              merged[key] = {
                correct: Math.max(merged[key].correct || 0, localMastery[key].correct || 0),
                wrong:   Math.max(merged[key].wrong   || 0, localMastery[key].wrong   || 0),
              };
            }
          });
          localStorage.setItem('mkt201_mastery', JSON.stringify(merged));
        } catch(e) {}
      }
    }
    localStorage.setItem('mkt201_bestScores',   JSON.stringify(mergedBest));
    localStorage.setItem('mkt201_totalQuizzes', mergedTotal);
    localStorage.setItem('mkt201_totalCorrect', mergedCorrect);
    bestScores   = mergedBest;
    totalQuizzes = mergedTotal;
    totalCorrect = mergedCorrect;
    await ref.set({
      profile: { name: user.displayName || '', email: user.email || '' },
      bestScores: mergedBest, totalQuizzes: mergedTotal, totalCorrect: mergedCorrect,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    renderDashboard();
  } catch(e) { console.error('Sync error:', e); }
}

async function saveQuizResult(ch, score, correct, wrong, elapsed) {
  const localBest     = JSON.parse(localStorage.getItem('mkt201_bestScores')    || '{}');
  const localTotal    = parseInt(localStorage.getItem('mkt201_totalQuizzes')    || '0');
  const localCorrect  = parseInt(localStorage.getItem('mkt201_totalCorrect')    || '0');
  const localAnswered = parseInt(localStorage.getItem('mkt201_totalAnswered')   || '0');
  if (!localBest[ch] || score > localBest[ch]) localBest[ch] = score;
  const newTotal    = localTotal    + 1;
  const newCorrect  = localCorrect  + correct;
  const newAnswered = localAnswered + correct + wrong;
  localStorage.setItem('mkt201_bestScores',    JSON.stringify(localBest));
  localStorage.setItem('mkt201_totalQuizzes',  newTotal);
  localStorage.setItem('mkt201_totalCorrect',  newCorrect);
  localStorage.setItem('mkt201_totalAnswered', newAnswered);
  bestScores   = localBest;
  totalQuizzes = newTotal;
  totalCorrect = newCorrect;
  renderDashboard();
  if (!currentUser || !db) return;
  try {
    const uid = currentUser.uid;
    await db.collection('mkt201_users').doc(uid).collection('sessions').add({
      ch, score, correct, wrong, elapsed,
      date: firebase.firestore.FieldValue.serverTimestamp()
    });
    const masteryRaw = localStorage.getItem('mkt201_mastery') || '{}';
    await db.collection('mkt201_users').doc(uid).set({
      bestScores: localBest, totalQuizzes: newTotal, totalCorrect: newCorrect,
      mastery: masteryRaw,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    renderLeaderboard();
  } catch(e) { console.error('Save quiz error:', e); }
}

async function renderLeaderboard() {
  const container = document.getElementById('leaderboard-list');
  if (!container) return;
  if (!currentUser || !db) {
    container.innerHTML = '<div class="lb-signin">سجّل دخولك لترى الـ Leaderboard 🔒</div>';
    return;
  }
  container.innerHTML = '<div class="lb-loading">⏳ جاري التحميل...</div>';
  try {
    const snap = await db.collection('mkt201_users').orderBy('bestScores.all', 'desc').limit(20).get();
    if (snap.empty) { container.innerHTML = '<div class="lb-empty">لا يوجد طلاب بعد 🚀</div>'; return; }
    const medals = ['🥇','🥈','🥉'];
    let html = '', rank = 1;
    snap.forEach(doc => {
      const d = doc.data(), p = d.profile || {}, b = d.bestScores || {};
      const bestAll = b.all !== undefined ? b.all + '%' : '—';
      const isMe = doc.id === currentUser.uid;
      if (isMe) return;
      html += `<div class="lb-row${isMe?' lb-me':''}">
        <div class="lb-rank">${medals[rank-1] || ('#'+rank)}</div>
        <div class="lb-avatar">👤</div>
        <div class="lb-info">
          <div class="lb-name">${p.name || p.email || 'طالب'}${isMe?' <span class="lb-you">(أنت)</span>':''}</div>
          <div class="lb-sub">${d.totalQuizzes||0} كويز · Ch1:${b.ch1!==undefined?b.ch1+'%':'—'} · Ch2:${b.ch2!==undefined?b.ch2+'%':'—'} · Ch3:${b.ch3!==undefined?b.ch3+'%':'—'} · Ch5:${b.ch5!==undefined?b.ch5+'%':'—'}</div>
        </div>
        <div class="lb-score">${bestAll}</div>
      </div>`;
      rank++;
    });
    container.innerHTML = html;
  } catch(e) { container.innerHTML = '<div class="lb-error">تعذّر التحميل</div>'; }
}

// ══════════════════════════════════════════════
//  PAGE NAVIGATION
// ══════════════════════════════════════════════
let _skipHashChange = false;
function showPage(id) {
  // Clear mock exam timer when navigating away
  try { if (mockState && mockState.timer) { clearInterval(mockState.timer); mockState.timer = null; } } catch(e) {}
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  // Deep linking: update URL hash
  if (!_skipHashChange) {
    history.pushState(null, '', '#' + id.replace('page-', ''));
  }
  if (id === 'page-home') { renderMasteryBars(); updateTodayCard(); renderReadinessCard(); renderWeakSpots(); renderStudyPlan(); }
  if (id === 'page-quiz') { updateSessionBadge(); }
  if (id === 'page-flash') { initFlashCards(); }
  if (id === 'page-mock') { checkMockExamLock(); }
  if (id === 'page-dashboard') { renderStreakCalendar(); }
  if (id === 'page-ch1') { renderChapterHighlights('ch1'); }
  if (id === 'page-ch2') { renderChapterHighlights('ch2'); }
  if (id === 'page-ch3') { renderChapterHighlights('ch3'); }
  if (id === 'page-ch5') { renderChapterHighlights('ch5'); }
  // Update active nav link in sidebar
  document.querySelectorAll('.sidebar-menu li a').forEach(a => {
    const oc = a.getAttribute('onclick') || '';
    if (oc.includes("'" + id + "'") || oc.includes('"' + id + '"')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}
// Deep linking: handle browser back/forward and direct URL access
window.addEventListener('hashchange', () => {
  const hash = location.hash.replace('#', '');
  if (hash) {
    const pageId = 'page-' + hash;
    if (document.getElementById(pageId)) {
      _skipHashChange = true;
      showPage(pageId);
      _skipHashChange = false;
    }
  }
});
window.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.replace('#', '');
  if (hash && document.getElementById('page-' + hash)) {
    showPage('page-' + hash);
  }
}, { once: true });

// ── PAST EXAM QUESTIONS (تجميعات) ──
const pastQuestions = [
  // MCQ Questions
  { diff:"easy", q:"The economic environment consists of economic factors that affect ___.", opts:["The quality of technological innovation","Cultural patterns of communities","The natural environment","Consumer purchasing power","Entrepreneurial orientation of a population"], ans:3, exp:"البيئة الاقتصادية = العوامل التي تؤثر على القوة الشرائية للمستهلك (دخل، تضخم، ادخار، ائتمان)." },
  { diff:"hard", q:"Marketing control involves four steps including all the following EXCEPT ___.", opts:["Increasing the staffing in the planning department","Evaluating the causes of any differences between expected and actual performance","Setting specific marketing goals","Measuring the marketing plan's performance in the marketplace","Taking corrective action to close the gaps between goals and performance"], ans:0, exp:"خطوات Marketing control الأربع: (1) تحديد أهداف، (2) قياس الأداء، (3) تقييم الفجوات، (4) إجراء تصحيحي. زيادة الموظفين ليست خطوة منها." },
  { diff:"hard", q:"The marketing team of 7 Star Inc., a company manufacturing smartphones, is currently studying the size, density, location, age, and occupation of its target market. Which of the following environments is being studied?", opts:["Demographic environment","Cultural environment","Technological environment","Political environment","Economic environment"], ans:0, exp:"الـ Demographic environment = دراسة السكان: الحجم، الكثافة، الموقع، العمر، المهنة. كلها متغيرات ديموغرافية." },
  { diff:"easy", q:"A ___ is some combination of products, services, information, or experiences provided to consumers to satisfy a need or want.", opts:["Market segment","Market offering","Brand positioning","Value proposition","Market mix"], ans:1, exp:"Market offering = أي تركيبة من منتجات/خدمات/معلومات/تجارب تُقدَّم لإشباع حاجة أو رغبة." },
  { diff:"hard", q:"A women's apparel manufacturer in California recently acquired a Houston-based company that manufactures office furniture. This is an example of ___.", opts:["Product development","Market penetration","Market development","Product differentiation","Diversification"], ans:4, exp:"Diversification = منتج جديد (أثاث) + سوق جديد. الشركة دخلت مجالاً مختلفاً كلياً عن تخصصها الأصلي (ملابس)." },
  { diff:"easy", q:"___ refers to measuring and evaluating the results of marketing strategies and plans and taking corrective action to ensure that the objectives are achieved.", opts:["Benchmarking","Prospecting","Satisficing","Marketing control","Marketing implementation"], ans:3, exp:"Marketing control = قياس وتقييم نتائج الاستراتيجيات التسويقية واتخاذ إجراءات تصحيحية لضمان تحقيق الأهداف." },
  { diff:"medium", q:"Which of the following is true with regard to a market segment?", opts:["Dividing the market into segments reduces composite demand","A market segment consists of consumers who respond in a similar way to a given set of marketing efforts","Dividing the market into segments decreases the efficiency of the selling process","A market segment consists of consumers with dissimilar needs and preferences","Very few markets have segments"], ans:1, exp:"Market segment = مجموعة من المستهلكين يستجيبون بشكل متشابه لنفس الجهود التسويقية. هذا ما يميز الشريحة عن غيرها." },
  { diff:"hard", q:"Almarai, a Saudi dairy company, has invested in major farms in Argentina. Almarai sells its products in stores locally such as Danube and Al-Tamimi. In this example, Danube represents:", opts:["A manufacturer","An intermediary","A competitor","A supplier"], ans:1, exp:"Danube = وسيط (intermediary/reseller). يشتري منتجات المراعي ويبيعها للمستهلك النهائي. المزارع في الأرجنتين = supplier.", expW:{0:"Manufacturer = المصنّع = المراعي نفسها",2:"Competitor = منافس (Nada, Nadec مثلاً)",3:"Supplier = مورد المواد الخام (المزارع)"} },
  { diff:"medium", q:"Which of the following is true with regard to strategic planning?", opts:["The focus of strategic planning is to define a game plan for long-run survival and growth","A strategic plan deals with a company's short-term goals","Strategic planning involves identifying segments of consumers with identical preferences","At the corporate level, the company starts strategic planning by determining what portfolio of businesses is best","The strategic plan is a statement of an organization's purpose"], ans:0, exp:"Strategic planning = خطة اللعبة للبقاء والنمو على المدى البعيد. مو قصير المدى، ومو مجرد بيان الرسالة." },
  { diff:"medium", q:"Mission statements should ___ and be defined in terms of ___.", opts:["Be technology oriented; meeting the self-actualization needs of customers","Address sales and profits; the net return on investments","Embody the company's short-term plans; current opportunities","Be product oriented; satisfying the esteem needs of customers","Be market oriented; satisfying basic customer needs"], ans:4, exp:"بيان الرسالة يجب أن يكون موجهاً للسوق (market oriented) ومُعرَّفاً من حيث الاحتياجات الأساسية للعميل، لا من حيث المنتج." },
  { diff:"hard", q:"Lark Inc., an American electronics company, is currently reviewing new geographical markets to sell its highly popular televisions. By 2025, it plans to open new stores across all the major South Asian cities. Lark is most likely following a ___ strategy.", opts:["Local marketing","Product adaptation","Market development","Diversification","Product development"], ans:2, exp:"Market development = منتج موجود (تلفزيونات Lark) + سوق جغرافي جديد (جنوب آسيا). ليس Diversification لأن المنتج لم يتغير." },
  { diff:"easy", q:"Making more sales to current customers without changing a firm's products is known as ___.", opts:["Prospecting","Market segmentation","Market penetration","Product development","Product diversification"], ans:2, exp:"Market penetration = مبيعات أكثر للعملاء الحاليين بنفس المنتجات الموجودة. لا تغيير في المنتج ولا في السوق." },
  { diff:"medium", q:"Some fast-food restaurants offer tasty and convenient food at affordable prices, but in doing so they contribute to a national obesity epidemic and environmental problems. These fast-food restaurants overlook the ___ philosophy.", opts:["Marketing concept","Societal marketing concept","Production concept","Selling concept","Product concept"], ans:1, exp:"Societal marketing concept = التوازن بين رغبات العميل + أرباح الشركة + مصلحة المجتمع. مطاعم الوجبات السريعة تتجاهل الأثر الصحي والبيئي." },
  { diff:"medium", q:"With an expected increase in ethnic diversity within the American population, marketers are most likely to place a greater emphasis on ___.", opts:["'Do well by doing good' missions","Targeted advertising messages","Corporate giving","Mass marketing","Geographic segmentation"], ans:1, exp:"التنوع العرقي = مجموعات مختلفة بحاجات وثقافات مختلفة → يستوجب رسائل إعلانية مستهدفة لكل مجموعة.", expW:{0:"Do well by doing good = مسؤولية اجتماعية",2:"Corporate giving = تبرع",3:"Mass marketing = عكس التخصيص",4:"Geographic segmentation = تقسيم جغرافي لا عرقي"} },
  { diff:"easy", q:"A society's ___ are expressed in how people view themselves and others, organizations, society, nature, and the universe.", opts:["Norms","Cultural values","Social codes","Demographics","Public policies"], ans:1, exp:"Cultural values = القيم الثقافية: كيف ينظر الناس لأنفسهم والآخرين والمنظمات والمجتمع والطبيعة والكون." },
  { diff:"medium", q:"Which of the following statements reflects the marketing concept?", opts:["Focus on a product-centered make-and-sell philosophy","Undertake a large-scale selling and promotion effort","Focus on making continuous product improvements","Consider customer focus and value as the path to sales and profits","Emphasize an inside-out perspective"], ans:3, exp:"Marketing concept = العميل أولاً: اعرف احتياجاته وقدّم له قيمة أعلى من المنافسين. الطريق للأرباح يمر عبر إرضاء العميل." },
  { diff:"hard", q:"The key businesses of Kimberley and Price consist of a division that produces breakfast cereals and another that manufactures gardening tools. Each of these businesses is called a ___.", opts:["Market segment","Strategic business unit","Prospect","Product portfolio","Question mark"], ans:1, exp:"Strategic Business Unit (SBU) = وحدة أعمال مستقلة داخل الشركة لها استراتيجيتها ومنافسيها الخاصين. كل قسم = SBU منفصل." },
  // True/False (presented as MCQ)
  { diff:"easy", q:"TRUE or FALSE: The societal marketing concept calls on marketers to balance consumer wants and desires, company profits, and society's interests.", opts:["True","False"], ans:0, exp:"صحيح — Societal marketing concept يوازن بين: (1) رغبات المستهلك، (2) أرباح الشركة، (3) مصلحة المجتمع على المدى البعيد." },
  { diff:"easy", q:"TRUE or FALSE: Environmental sustainability concerns have declined steadily over the past three decades.", opts:["True","False"], ans:1, exp:"خطأ — الاهتمام بالاستدامة البيئية في ازدياد مستمر على مدى العقود الثلاثة الماضية، لم يتراجع أبداً." },
  { diff:"easy", q:"TRUE or FALSE: The macroenvironment consists of the factors close to the company that affect its ability to serve its customers, such as suppliers, customer markets, competitors, and publics.", opts:["True","False"], ans:1, exp:"خطأ — هذا وصف الـ Microenvironment. الـ Macroenvironment = القوى الكبرى (ديموغرافية، اقتصادية، تقنية، سياسية، ثقافية، بيئية)." },
  { diff:"hard", q:"TRUE or FALSE: Fast Food, Inc. views marketing as the process of finding and retaining profitable customers by providing them with the food they want. Fast Food, Inc. practices societal marketing.", opts:["True","False"], ans:1, exp:"خطأ — هذا Marketing concept (تلبية رغبات العميل). Societal marketing يراعي أيضاً مصلحة المجتمع (الصحة، البيئة)." },
  { diff:"easy", q:"TRUE or FALSE: Human needs are shaped by culture and individual personality.", opts:["True","False"], ans:1, exp:"خطأ — الـ Needs (الحاجات) فطرية وأساسية. الـ Wants (الرغبات) هي التي تتشكل بالثقافة والشخصية الفردية." },
  { diff:"easy", q:"TRUE or FALSE: The popularity of cause-related marketing as a form of corporate giving is rapidly declining.", opts:["True","False"], ans:1, exp:"خطأ — Cause-related marketing في ازدياد مستمر كأداة للمسؤولية الاجتماعية وبناء صورة الشركة الإيجابية." },
  { diff:"easy", q:"TRUE or FALSE: Return on marketing investment refers to the net return from a marketing investment divided by the costs of the marketing investment.", opts:["True","False"], ans:0, exp:"صحيح — ROMI = صافي العائد من الاستثمار التسويقي ÷ تكلفة ذلك الاستثمار." },
  { diff:"easy", q:"TRUE or FALSE: The technological environment is predominantly static.", opts:["True","False"], ans:1, exp:"خطأ — البيئة التكنولوجية ديناميكية ومتغيرة بسرعة كبيرة. الشركات التي لا تواكب التغيير التقني تتخلف." },
  { diff:"easy", q:"TRUE or FALSE: Local publics include consumer organizations, environmental groups, minority groups, and others.", opts:["True","False"], ans:0, exp:"صحيح — Local publics في بيئة التسويق تشمل منظمات المجتمع والمجموعات المحلية المختلفة التي تؤثر على نشاط الشركة." },
  { diff:"easy", q:"TRUE or FALSE: A mission statement is a document embodying an organization's short-term goals.", opts:["True","False"], ans:1, exp:"خطأ — بيان الرسالة (Mission Statement) يعكس غرض الشركة على المدى البعيد. الأهداف القصيرة = objectives أو targets." },

  // ── Additional MCQ — Chapter 1 ──
  { diff:"medium", q:"Which of the following best describes the concept of 'customer lifetime value'?", opts:["The total revenue a company generates in one quarter","The value of the entire stream of purchases a customer makes over a lifetime of patronage","The amount a customer spends in a single transaction","The cost of acquiring a new customer","The profit margin on a single product"], ans:1, exp:"Customer Lifetime Value (CLV) = مجموع ما سيشتريه العميل طوال علاقته بالشركة. هو سبب تركيز الشركات على الاحتفاظ بالعملاء." },
  { diff:"hard", q:"A marketing manager at Procter & Gamble says: 'Our goal is not just to satisfy customers, but to delight them.' This statement best reflects which marketing philosophy?", opts:["Production concept","Product concept","Selling concept","Marketing concept","Societal marketing concept"], ans:3, exp:"Marketing concept = افهم احتياجات العميل أولاً ثم قدّم قيمة أعلى من المنافسين. 'Delight customers' يشير مباشرة لهذا التوجه." },
  { diff:"easy", q:"___ is the act of obtaining a desired object from someone by offering something in return.", opts:["Needs","Wants","Exchange","Transaction","Relationship marketing"], ans:2, exp:"Exchange = التبادل: الحصول على شيء مرغوب مقابل تقديم شيء آخر. هو المفهوم الجوهري للتسويق." },
  { diff:"medium", q:"Which of the following is NOT one of the five core customer and marketplace concepts?", opts:["Needs, wants, and demands","Market offerings","Customer value and satisfaction","Marketing management orientations","Supply and demand curves"], ans:4, exp:"المفاهيم الخمسة الجوهرية: Needs/Wants/Demands، Market offerings، Value & Satisfaction، Exchanges & Relationships، Markets. Supply/demand curves = اقتصاد جزئي." },
  { diff:"hard", q:"Company X focuses its marketing efforts entirely on making its products available at low prices and in wide distribution. This company is most likely following the ___.", opts:["Product concept","Selling concept","Production concept","Marketing concept","Societal marketing concept"], ans:2, exp:"Production concept = التركيز على الإنتاج الواسع والأسعار المنخفضة والتوزيع الواسع. المثال هنا يطابق هذا التوجه تماماً." },
  { diff:"medium", q:"Which of the following represents the correct sequence of the customer value-driven marketing strategy?", opts:["Select customers → Create value → Capture value → Build relationships","Understand marketplace → Design strategy → Construct program → Build relationships → Capture value","Build relationships → Understand marketplace → Capture value → Design strategy","Capture value → Build relationships → Understand marketplace → Select customers","Design strategy → Understand marketplace → Build relationships → Capture value"], ans:1, exp:"النموذج الخماسي: (1) فهم السوق، (2) تصميم الاستراتيجية، (3) بناء البرنامج التسويقي، (4) بناء العلاقات، (5) الحصول على القيمة." },
  { diff:"easy", q:"Market offerings ___.", opts:["Are limited to physical products","Include only services","Can be products, services, experiences, or information that satisfy needs","Refer only to digital goods","Are always priced based on cost-plus pricing"], ans:2, exp:"Market offerings = أي شيء يُقدَّم للسوق لإشباع حاجة: منتج مادي، خدمة، تجربة، أو معلومة. ليست مقتصرة على المنتجات المادية." },
  { diff:"hard", q:"A customer buys a Honda Civic because it is reliable, fuel-efficient, and within budget — even though they wanted a luxury BMW. This illustrates the concept of ___.", opts:["Customer delight","Customer satisfaction","Customer perceived value","Customer lifetime value","Brand equity"], ans:2, exp:"Customer Perceived Value = ما يعتقده العميل أنه يحصل عليه مقابل ما يدفعه. اختار Civic لأن قيمته المُدرَكة أعلى في سياقه." },

  // ── Additional MCQ — Chapter 2 ──
  { diff:"medium", q:"In the BCG matrix, a 'cash cow' is characterized by ___.", opts:["High market growth and high market share","Low market growth and high market share","High market growth and low market share","Low market growth and low market share","High market growth and medium market share"], ans:1, exp:"Cash Cow = نمو منخفض + حصة سوقية عالية. توليد نقود كثيرة بدون حاجة لاستثمار كبير." },
  { diff:"hard", q:"A pharmaceutical company that currently sells aspirin decides to develop a new cholesterol drug for its existing customers. This is an example of ___.", opts:["Market penetration","Market development","Product development","Diversification","Horizontal integration"], ans:2, exp:"Product Development = منتج جديد (cholesterol drug) + سوق موجود (existing customers). ليس Diversification لأن السوق موجود مسبقاً." },
  { diff:"easy", q:"The _____ outlines the businesses, products, and activities that will receive investment and strategic resources.", opts:["Mission statement","Business portfolio","SWOT analysis","Value chain","Marketing mix"], ans:1, exp:"Business portfolio = قائمة الأعمال والمنتجات والأنشطة التي ستحصل على الاستثمار والموارد الاستراتيجية للشركة." },
  { diff:"medium", q:"Which of the following is an example of a market-oriented mission statement?", opts:["'We manufacture high-quality furniture'","'We sell the best coffee in the world'","'We help people create spaces where memories are made'","'We produce cars with superior engineering'","'We build computers for professionals'"], ans:2, exp:"Market-oriented = مركّز على القيمة التي يحصل عليها العميل، لا على المنتج نفسه. 'Help people create spaces' يعكس الحاجة العميقة." },
  { diff:"hard", q:"In a SWOT analysis, rising inflation rates and new government regulations would be classified as ___.", opts:["Strengths","Weaknesses","Opportunities","Threats","Internal factors"], ans:3, exp:"التضخم والقوانين الحكومية = عوامل خارجية سلبية = Threats. العوامل الداخلية (Strengths/Weaknesses) تخص الشركة نفسها." },
  { diff:"medium", q:"Which element of the marketing mix refers to the amount the customer pays for the product?", opts:["Product","Place","Promotion","Price","People"], ans:3, exp:"Price (السعر) = أحد عناصر المزيج التسويقي الأربعة (4Ps). هو المبلغ الذي يدفعه العميل مقابل الحصول على المنتج." },
  { diff:"hard", q:"Zara, a clothing retailer, uses customer trend data to constantly update its product lines. Which part of the value chain does this primarily reflect?", opts:["Outbound logistics","Operations","Marketing and sales","Service","Inbound logistics"], ans:2, exp:"استخدام بيانات اتجاهات العملاء لتحديث خطوط المنتجات = قسم Marketing and Sales في سلسلة القيمة." },
  { diff:"medium", q:"Stars in the BCG matrix are best described as ___.", opts:["Low-growth, high-share businesses that generate large cash flows","High-growth, high-share businesses that need heavy investment","Low-growth, low-share businesses that generate little cash","High-growth, low-share businesses that require large cash investments","Medium-growth, medium-share businesses"], ans:1, exp:"Stars = نمو عالٍ + حصة سوقية عالية. تحتاج استثماراً كبيراً لمواكبة النمو. تتحول لـ Cash Cows عند تباطؤ النمو." },
  { diff:"easy", q:"TRUE or FALSE: Dogs in the BCG matrix are high-growth, low-share business units.", opts:["True","False"], ans:1, exp:"خطأ — Dogs = نمو منخفض + حصة سوقية منخفضة. High-growth, low-share = Question Marks." },
  { diff:"easy", q:"TRUE or FALSE: Product development strategy involves selling existing products in new markets.", opts:["True","False"], ans:1, exp:"خطأ — هذا وصف Market Development. Product Development = منتج جديد + سوق موجود." },

  // ── Additional MCQ — Chapter 3 ──
  { diff:"medium", q:"Which of the following is a component of the MACROENVIRONMENT?", opts:["Suppliers","Marketing intermediaries","Competitors","Technological forces","Company's internal departments"], ans:3, exp:"Macroenvironment = DESTEC: Demographic, Economic, Social/Cultural, Technological, Environmental/Natural, Political/Legal. Technological forces = Macro." },
  { diff:"hard", q:"A consumer goods company notices that its target demographic is rapidly aging. Which macroenvironmental force is this?", opts:["Economic environment","Cultural environment","Technological environment","Demographic environment","Political environment"], ans:3, exp:"التغير في تركيبة السكان العمرية = Demographic environment. هذا أحد أهم القوى الكبرى التي يتابعها المسوقون." },
  { diff:"medium", q:"'Financial publics' in the microenvironment refers to ___.", opts:["The company's employees and management","Banks, investment analysts, and shareholders that affect the company's ability to obtain funds","Newspapers and TV stations that report on the company","Consumer groups and environmental organizations","Government regulatory agencies"], ans:1, exp:"Financial publics = المؤسسات المالية والمستثمرون. تؤثر على قدرة الشركة على تمويل عملياتها." },
  { diff:"hard", q:"Samsung invests billions in R&D to develop new display technology before competitors. Which macroenvironmental force is Samsung primarily responding to?", opts:["Demographic environment","Economic environment","Technological environment","Political environment","Cultural environment"], ans:2, exp:"استثمار Samsung في R&D لتطوير تقنية العرض = استجابة للبيئة التكنولوجية. إحدى قوى الماكرو بيئة الست." },
  { diff:"easy", q:"Marketing intermediaries help the company ___.", opts:["Produce goods at lower cost","Promote, sell, and distribute its products to final buyers","Set government regulations","Monitor competitor strategies","Train the company's sales force"], ans:1, exp:"Marketing intermediaries = الوسطاء يساعدون الشركة في ترويج وبيع وتوزيع منتجاتها للمستهلك النهائي (تجار جملة، تجزئة، وكلاء)." },
  { diff:"medium", q:"Which generation is characterized as being 'digital natives' who have never known a world without the internet and smartphones?", opts:["Baby Boomers","Generation X","Millennials","Generation Z","The Silent Generation"], ans:3, exp:"Generation Z (born after 1997) = Digital natives. لم يعيشوا حياة بدون إنترنت أو هواتف ذكية." },
  { diff:"hard", q:"A company's core values include 'honesty' and 'family first.' These are best described as ___ beliefs in the cultural environment.", opts:["Secondary","Tertiary","Core","Peripheral","Aspirational"], ans:2, exp:"Core beliefs = قيم راسخة يصعب تغييرها مثل الأمانة والأسرة. Secondary beliefs = أكثر مرونة (الموضة، الاهتمامات)." },
  { diff:"medium", q:"Which of the following is NOT part of the company's microenvironment?", opts:["Suppliers","Customers","Competitors","Demographic trends","Marketing intermediaries"], ans:3, exp:"Demographic trends = ماكرو بيئة (Macroenvironment). كل الباقين (Suppliers, Customers, Competitors, Intermediaries) = ميكرو بيئة." },
  { diff:"easy", q:"TRUE or FALSE: The natural environment includes natural resources, weather conditions, and environmental concerns.", opts:["True","False"], ans:0, exp:"صحيح — البيئة الطبيعية (Natural environment) تشمل: الموارد الطبيعية، الطقس، والمخاوف البيئية كالتلوث والاستدامة." },
  { diff:"medium", q:"A country imposes new import tariffs on foreign goods. This is an example of the ___ environment affecting marketing decisions.", opts:["Demographic","Cultural","Technological","Political-legal","Economic"], ans:3, exp:"الرسوم الجمركية = قرار حكومي/قانوني = Political-legal environment. إحدى قوى الماكرو بيئة المؤثرة على التسويق." },

  // ── Additional MCQ — Chapter 5 ──
  { diff:"medium", q:"Which of the following is an example of a SOCIAL factor influencing consumer behavior?", opts:["Age and life-cycle stage","Occupation and income","Reference groups and family","Motivation and perception","Personality and self-concept"], ans:2, exp:"Social factors = Reference groups, family, roles & status. Age/income = Personal factors. Motivation/perception = Psychological factors." },
  { diff:"hard", q:"A consumer buys a luxury watch not because they need to tell time, but to signal status to peers. Which psychological factor is most responsible?", opts:["Learning","Perception","Beliefs and attitudes","Motivation — esteem need (Maslow)","Cultural values"], ans:3, exp:"هرم ماسلو: الحاجة للمكانة الاجتماعية = Esteem needs. شراء ساعة فاخرة للإشارة للوضع الاجتماعي هو دافع نفسي." },
  { diff:"easy", q:"The buyer decision process begins with ___.", opts:["Information search","Evaluation of alternatives","Need recognition","Purchase decision","Post-purchase behavior"], ans:2, exp:"مراحل قرار الشراء الخمس: (1) التعرف على الحاجة، (2) البحث، (3) تقييم البدائل، (4) قرار الشراء، (5) سلوك ما بعد الشراء." },
  { diff:"medium", q:"After buying a new laptop, a student reads positive reviews online to confirm the purchase was wise. This behavior illustrates ___.", opts:["Need recognition","Information search","Alternative evaluation","Cognitive dissonance reduction","Routine response behavior"], ans:3, exp:"Cognitive dissonance = القلق بعد الشراء. البحث عن تأكيد إيجابي بعد الشراء = محاولة تقليل هذا التوتر." },
  { diff:"hard", q:"Marketers are particularly interested in which stage of the buyer decision process because it is the stage where the actual purchase can most likely be intercepted?", opts:["Need recognition","Information search","Evaluation of alternatives","Purchase decision","Post-purchase behavior"], ans:2, exp:"خلال مرحلة Evaluation of Alternatives، المسوق يستطيع التأثير على قرار العميل بمقارنات المنتج وعروض المبيعات." },
  { diff:"medium", q:"'Social class' as a cultural factor in consumer behavior is determined by ___.", opts:["Only income level","Only education level","A combination of income, education, occupation, and wealth","Race and ethnicity alone","Age and gender"], ans:2, exp:"Social class = مزيج من الدخل + التعليم + المهنة + الثروة. ليس عاملاً واحداً فقط." },
  { diff:"easy", q:"Which of the following is an ASPIRATIONAL reference group?", opts:["A student's current classmates","A worker's immediate colleagues","A teenager's group of friends","A group a person admires and aspires to join, such as professional athletes","A family member's opinion"], ans:3, exp:"Aspirational reference group = مجموعة يتطلع الشخص للانتساب إليها (مثل الرياضيين المحترفين). تؤثر على سلوك الشراء حتى دون الانتماء الفعلي." },
  { diff:"hard", q:"A marketer studying 'psychographics' is most likely measuring ___.", opts:["Age, income, and education","Geographic region and population density","AIOs: Activities, Interests, and Opinions","Brand loyalty and purchase frequency","Ethnic background and family size"], ans:2, exp:"Psychographics = AIO (Activities + Interests + Opinions). يعطي صورة أعمق عن نمط حياة المستهلك من المتغيرات الديموغرافية." },
  { diff:"medium", q:"Which type of buying decision behavior applies to a consumer who is buying toothpaste for the fifth consecutive month?", opts:["Complex buying behavior","Dissonance-reducing buying behavior","Habitual buying behavior","Variety-seeking buying behavior","Extended problem solving"], ans:2, exp:"Habitual buying behavior = شراء متكرر بدون بحث أو مقارنة كثيرة. منتجات منخفضة التورط والاختلاف كالمعجون." },
  { diff:"hard", q:"A teenager starts buying the same brand of sneakers that their favorite basketball player endorses, even though a friend's recommendation was the same brand. Which influence is STRONGEST here?", opts:["Aspirational reference group (athlete)","Membership reference group (friend)","Family influence","Cultural values","Personal lifestyle preferences"], ans:0, exp:"الرياضي المفضل = Aspirational reference group. رغم أن الصديق أوصى بنفس الماركة، فإن القوة الأكبر هنا هي التطلع لمكانة الرياضي." },
  { diff:"easy", q:"TRUE or FALSE: Complex buying behavior occurs when consumers are highly involved in a purchase and perceive significant differences among brands.", opts:["True","False"], ans:0, exp:"صحيح — Complex buying behavior = تورط عالٍ (high involvement) + اختلافات كبيرة بين الماركات. مثال: شراء سيارة أو منزل." },
  { diff:"easy", q:"TRUE or FALSE: Post-purchase satisfaction is determined by the relationship between the consumer's expectations and the product's perceived performance.", opts:["True","False"], ans:0, exp:"صحيح — رضا ما بعد الشراء = العلاقة بين توقعات العميل قبل الشراء وأداء المنتج المُدرَك بعد الاستخدام." },
  { diff:"medium", q:"Which of the following BEST describes 'perception' as a psychological factor?", opts:["The physical ability to see and hear marketing messages","The process by which people select, organize, and interpret information to form a meaningful picture","A person's enduring evaluation of objects or ideas","The drives that compel a person to seek need satisfaction","The change in behavior resulting from experience"], ans:1, exp:"Perception = كيف نختار ونرتب ونفسر المعلومات لبناء صورة ذهنية. يختلف من شخص لآخر حتى عند رؤية نفس الشيء." },

  // ── Additional MCQ (set 2) ──
  { diff:"hard", q:"A company finds that its brand is rated high on 'quality' and 'reliability' by loyal customers but low on 'excitement.' This information is most useful for which strategic decision?", opts:["Selecting a new distribution channel","Repositioning or extending the brand","Setting the product's price","Choosing a new supplier","Entering a new geographic market"], ans:1, exp:"Brand perception data (quality/excitement) guides repositioning strategy — كيف تُغيّر صورة العلامة التجارية في ذهن العميل." },
  { diff:"medium", q:"Which of the following represents a 'want' rather than a 'need'?", opts:["Food to satisfy hunger","Water to quench thirst","Safety from physical harm","A Big Mac from McDonald's to satisfy hunger","Shelter from the rain"], ans:3, exp:"Big Mac = Want (الرغبة المحددة) بينما الجوع = Need (الحاجة الأساسية). الثقافة والشخصية تحوّل الحاجة لرغبة محددة." },
  { diff:"easy", q:"The 4 Ps of the marketing mix are ___.", opts:["People, Place, Profit, Promotion","Product, Price, Place, Promotion","Product, People, Price, Purpose","Promotion, Production, Price, People","Performance, Price, Place, Promotion"], ans:1, exp:"المزيج التسويقي الأربعة (4Ps): المنتج (Product)، السعر (Price)، المكان/التوزيع (Place)، الترويج (Promotion)." },
  { diff:"medium", q:"A company that practices 'value marketing' during an economic recession most likely ___.", opts:["Reduces product quality to lower costs","Raises prices to signal premium quality","Offers the right combination of quality and good service at a fair price","Cuts all advertising spending","Focuses only on high-income customer segments"], ans:2, exp:"Value marketing في فترات الركود = الحفاظ على الجودة مع تقديم قيمة واضحة للسعر. ليس تخفيض الجودة." },
  { diff:"hard", q:"A marketer sends different advertising messages to young professionals in cities versus retirees in rural areas. This is an example of ___.", opts:["Mass marketing","Undifferentiated marketing","Target marketing with segmentation","Product concept","Societal marketing"], ans:2, exp:"إرسال رسائل مختلفة لمجموعات مختلفة (محترفون في المدن vs متقاعدون في الريف) = Target marketing مع Segmentation." },
  { diff:"easy", q:"TRUE or FALSE: The selling concept holds that consumers will not buy enough of the firm's products unless it undertakes a large-scale selling and promotion effort.", opts:["True","False"], ans:0, exp:"صحيح — Selling concept يؤمن بأن المستهلكين لن يشتروا بما يكفي إذا تُركوا وشأنهم، لذا تحتاج لجهود بيع وترويج مكثفة." },
  { diff:"easy", q:"TRUE or FALSE: Market development involves selling current products in new markets.", opts:["True","False"], ans:0, exp:"صحيح — Market development = منتج موجود + سوق جديد (جغرافي أو شريحة جديدة). مثال: دخول أسواق جديدة بنفس المنتج." },
  { diff:"medium", q:"A company's 'question marks' in the BCG matrix are in high-growth markets but have ___ market share.", opts:["High","Medium","Low","Zero","Dominant"], ans:2, exp:"Question Marks = High growth + Low share. خطرة لأنها تحتاج نقود لكن عوائدها قليلة. القرار: هل نستثمر فيها أم نتخلص منها؟" },
  { diff:"hard", q:"'Selective attention' means that people tend to ___.", opts:["Remember only negative information about brands","Interpret information in a way that supports existing beliefs","Filter out most stimuli and notice only those relevant to them","Change their behavior based on past experiences","Follow the opinions of reference groups"], ans:2, exp:"Selective attention = نميل لملاحظة المعلومات المتعلقة باحتياجاتنا الحالية وتجاهل الباقي. لذلك يجب أن يكون الإعلان ذا صلة بالمستهلك." },
  { diff:"medium", q:"Which of the following is an example of 'dissonance-reducing buying behavior'?", opts:["Buying a soft drink on impulse","Switching between cereal brands for variety","Carefully comparing laptops before buying, then worrying afterward","Buying the same brand of milk every week","Spending weeks comparing camera brands with obvious differences"], ans:2, exp:"Dissonance-reducing = تورط عالٍ + اختلافات بسيطة بين الماركات → شراء سريع ثم قلق ما بعد الشراء (cognitive dissonance)." },
  { diff:"easy", q:"'Learning' in consumer behavior refers to ___.", opts:["Formal education level of the consumer","Changes in an individual's behavior arising from experience","The way consumers select information from advertisements","A consumer's enduring evaluation of a product","The process of filtering out irrelevant stimuli"], ans:1, exp:"Learning في سلوك المستهلك = تغيير في سلوك الفرد ناتج عن التجربة والممارسة. جربت ماركة وأعجبتك → ستعيد الشراء." },
  { diff:"hard", q:"A food company reformulates its product to reduce sugar after research shows health-conscious consumers are declining purchases. Which macroenvironmental force most directly drove this decision?", opts:["Technological environment","Political-legal environment","Demographic environment","Cultural environment — shifting secondary beliefs toward health","Economic environment"], ans:3, exp:"Shifting health trends = Secondary beliefs في البيئة الثقافية. الشركة استجابت لتغير في القيم الاجتماعية نحو الصحة." },
  { diff:"medium", q:"A company decides to add a new product line to serve a new market segment while maintaining its existing product lines. According to Ansoff's matrix, this is ___.", opts:["Market penetration","Market development","Product development","Diversification","Horizontal integration"], ans:3, exp:"New product + New market = Diversification. إذا كان السوق موجوداً = Product development. إذا المنتج موجود = Market development." },
  { diff:"easy", q:"TRUE or FALSE: A company's internal departments (R&D, finance, HR) are considered part of its microenvironment.", opts:["True","False"], ans:0, exp:"صحيح — الأقسام الداخلية للشركة (R&D، المالية، الموارد البشرية، الإنتاج) = جزء من الـ microenvironment الداخلي." },
  { diff:"medium", q:"Which of the following best illustrates 'customer-driven' marketing?", opts:["Producing large quantities and pushing products to the market","Setting prices based solely on production costs","Researching what customers need and building products around those needs","Advertising heavily to change customer preferences","Hiring the largest sales force in the industry"], ans:2, exp:"Customer-driven = ابدأ بفهم العميل واحتياجاته ثم صمم المنتج والاستراتيجية. عكس Product/Production concept." },
  { diff:"hard", q:"A marketer notices that customers often feel uneasy about switching from a competitor's product because they are afraid of making the wrong choice. This fear is most directly related to which step in the buyer decision process?", opts:["Need recognition","Information search","Evaluation of alternatives","Purchase decision","Post-purchase behavior"], ans:3, exp:"Fear of making the wrong choice occurs AT the moment of Purchase Decision. Cognitive dissonance happens AFTER the purchase." },
];

// ── Assign ch fields to pastQuestions based on topic ──
(function() {
  const chMap = [
    "ch3","ch2","ch3","ch1","ch2","ch2","ch1","ch3","ch2","ch2", // 0-9
    "ch2","ch2","ch1","ch3","ch3","ch1","ch2",                   // 10-16
    "ch1","ch3","ch3","ch1","ch1","ch1","ch2","ch3","ch3","ch2", // 17-26
    "ch1","ch1","ch1","ch1","ch1","ch1","ch1","ch1",             // 27-34 Additional Ch1
    "ch2","ch2","ch2","ch2","ch2","ch2","ch2","ch2","ch2","ch2", // 35-44 Additional Ch2
    "ch3","ch3","ch3","ch3","ch3","ch3","ch3","ch3","ch3","ch3", // 45-54 Additional Ch3
    "ch5","ch5","ch5","ch5","ch5","ch5","ch5","ch5","ch5","ch5","ch5","ch5","ch5", // 55-67 Additional Ch5
    "ch2","ch1","ch2","ch1","ch1","ch1","ch2","ch2","ch5","ch5","ch5","ch3","ch2","ch3","ch1","ch5" // 68-83 Set 2
  ];
  pastQuestions.forEach(function(q, i) { if (chMap[i]) q.ch = chMap[i]; });
})();

let pastState = {
  questions:[], current:0, score:0, answered:false, selectedIdx:null,
  filter: 'all',       // فلتر الفصل المختار
  wrongAnswers: [],    // الأسئلة اللي غلط فيها
  chapterScores: {},   // نتيجة بالفصل {ch1:{correct,total}, ...}
  isReview: false      // وضع مراجعة الأخطاء
};

function setPastFilter(filter, btn) {
  pastState.filter = filter;
  document.querySelectorAll('.past-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function startPastExam(isReview = false) {
  let pool;
  if (isReview) {
    pool = pastState.wrongAnswers;
    pastState.isReview = true;
  } else {
    pool = pastQuestions;
    if (pastState.filter !== 'all') pool = pool.filter(q => q.ch === pastState.filter);
    pastState.isReview = false;
  }
  pastState.questions    = [...pool].sort(() => Math.random() - 0.5);
  pastState.current      = 0;
  pastState.score        = 0;
  pastState.answered     = false;
  pastState.selectedIdx  = null;
  pastState.wrongAnswers = [];
  pastState.chapterScores = {};
  document.querySelector('.past-setup').style.display = 'none';
  document.querySelector('.past-run').style.display = 'block';
  document.querySelector('.past-results').style.display = 'none';
  renderPastQuestion();
}

function renderPastQuestion() {
  const q     = pastState.questions[pastState.current];
  const total = pastState.questions.length;
  const pct   = ((pastState.current) / total * 100).toFixed(0);
  const chNames = { ch1:'الفصل 1', ch2:'الفصل 2', ch3:'الفصل 3', ch5:'الفصل 5' };

  document.querySelector('.past-progress-fill').style.width = pct + '%';
  document.querySelector('.past-q-counter').textContent =
    (pastState.isReview ? '🔴 مراجعة — ' : '') + `سؤال ${pastState.current + 1}`;
  const badge = document.querySelector('.past-ch-badge');
  if (badge) badge.textContent = chNames[q.ch] || '';

  window._currentReportQ = q.q;
  document.querySelector('.past-q-text').innerHTML =
    q.q + `<button class="report-q-btn" onclick="reportQuestion(window._currentReportQ,'Past Exam')">🚩 إبلاغ</button>`;

  const optsEl = document.querySelector('.past-opts');
  optsEl.innerHTML = q.opts.map((o, i) =>
    `<button class="past-opt-btn" onclick="selectPastOpt(${i})">${String.fromCharCode(65+i)}. ${o}</button>`
  ).join('');

  document.querySelector('.past-feedback').style.display = 'none';
  document.querySelector('.past-next-btn').style.display = 'none';
  const expEl = document.getElementById('past-explanation');
  if (expEl) expEl.style.display = 'none';
  pastState.answered    = false;
  pastState.selectedIdx = null;
}

function selectPastOpt(idx) {
  if (pastState.answered) return;
  pastState.answered    = true;
  pastState.selectedIdx = idx;
  const q       = pastState.questions[pastState.current];
  const correct = idx === q.ans;

  // تتبع النتائج
  if (correct) {
    pastState.score++;
  } else {
    pastState.wrongAnswers.push(q);  // للمراجعة لاحقاً
  }
  // نتيجة بالفصل
  if (q.ch) {
    if (!pastState.chapterScores[q.ch]) pastState.chapterScores[q.ch] = { correct:0, total:0 };
    pastState.chapterScores[q.ch].total++;
    if (correct) pastState.chapterScores[q.ch].correct++;
  }

  showQuizEncouragement(correct);

  // تلوين الخيارات
  const btns = document.querySelectorAll('.past-opt-btn');
  btns.forEach((b, i) => {
    if (i === q.ans) b.classList.add('past-correct');
    else if (i === idx && !correct) b.classList.add('past-wrong');
    b.disabled = true;
  });

  // فيدباك عربي
  const fb = document.querySelector('.past-feedback');
  fb.style.display = 'block';
  fb.className = 'past-feedback ' + (correct ? 'past-fb-correct' : 'past-fb-wrong');
  fb.textContent = correct
    ? '✅ صح! أحسنت'
    : `❌ خطأ — الإجابة الصحيحة: ${String.fromCharCode(65+q.ans)}. ${q.opts[q.ans]}`;

  // شرح الإجابة
  showPastExplanation(q, idx);

  document.querySelector('.past-next-btn').style.display = 'block';
}

function showPastExplanation(q, chosen) {
  const expEl   = document.getElementById('past-explanation');
  const innerEl = document.getElementById('past-exp-inner');
  if (!expEl || !innerEl || !q.exp) return;

  const isCorrect = chosen === q.ans;
  const letters   = ['A','B','C','D','E'];
  let html = `<div class="past-exp-main">${q.exp}</div>`;

  // شرح الخيار الغلط اللي اختاره
  if (!isCorrect && q.expW && q.expW[chosen] !== undefined) {
    html += `<div class="past-exp-wrong-note">
      <strong>❓ ليش ${letters[chosen]} غلط؟</strong><br>${q.expW[chosen]}
    </div>`;
  }
  innerEl.innerHTML = html;
  expEl.style.display = 'block';
}

function nextPastQuestion() {
  pastState.current++;
  if (pastState.current >= pastState.questions.length) {
    showPastResults();
  } else {
    renderPastQuestion();
  }
}

function showPastResults() {
  document.querySelector('.past-run').style.display = 'none';
  document.querySelector('.past-results').style.display = 'block';
  const total = pastState.questions.length;
  const pct   = Math.round(pastState.score / total * 100);

  document.querySelector('.past-score-num').textContent = `${pastState.score} / ${total}`;
  document.querySelector('.past-score-pct').textContent = pct + '%';
  document.querySelector('.past-score-msg').textContent =
    pct >= 80 ? '🎉 ممتاز! أنت جاهز للامتحان!'
    : pct >= 60 ? '👍 جيد! راجع المادة وحاول مجدداً'
    : '📚 واصل! راجع الفصول وحاول مجدداً';

  // احفظ أفضل نتيجة
  const bestKey  = 'mkt201_past_best_' + (pastState.filter || 'all');
  const prevBest = parseInt(localStorage.getItem(bestKey) || '0');
  if (pct > prevBest) localStorage.setItem(bestKey, pct);
  const best = Math.max(pct, prevBest);
  const bestRow = document.getElementById('past-best-row');
  const bestVal = document.getElementById('past-best-val');
  if (bestRow && bestVal) {
    bestRow.style.display = 'flex';
    bestVal.textContent   = best + '%' + (pct >= prevBest && prevBest > 0 ? ' 🆕 رقم جديد!' : '');
  }

  // تفصيل بالفصل
  const chNames = { ch1:'الفصل 1', ch2:'الفصل 2', ch3:'الفصل 3', ch5:'الفصل 5' };
  const breakdown = document.getElementById('past-ch-breakdown');
  if (breakdown && Object.keys(pastState.chapterScores).length > 1) {
    breakdown.innerHTML = '<h3 style="margin:0 0 14px;font-size:1rem;font-weight:700;">📊 نتيجتك بالفصل</h3>' +
      Object.entries(pastState.chapterScores).map(([ch, s]) => {
        const p = Math.round(s.correct / s.total * 100);
        const color = p >= 80 ? '#10b981' : p >= 60 ? '#f59e0b' : '#f43f5e';
        return `<div class="past-ch-row">
          <div class="past-ch-row-label">
            <span>${chNames[ch] || ch}</span>
            <span style="font-weight:800;color:${color};">${s.correct}/${s.total} <small>(${p}%)</small></span>
          </div>
          <div class="past-ch-bar-track">
            <div class="past-ch-bar-fill" style="width:${p}%;background:${color};"></div>
          </div>
        </div>`;
      }).join('');
    breakdown.style.display = 'block';
  } else {
    if (breakdown) breakdown.style.display = 'none';
  }

  // زر مراجعة الأخطاء
  const reviewBtn = document.getElementById('past-review-btn');
  if (reviewBtn) reviewBtn.style.display = pastState.wrongAnswers.length ? 'inline-block' : 'none';
}

function reviewWrongAnswers() {
  startPastExam(true);
}

function resetPastExam() {
  document.querySelector('.past-setup').style.display = 'block';
  document.querySelector('.past-run').style.display   = 'none';
  document.querySelector('.past-results').style.display = 'none';
}

// ── TEST BANK ──
const TB_KEYWORDS = /\b(NOT|EXCEPT|LEAST|BEST|MOST|TRUE|FALSE|FIRST|LAST|FINAL|ONLY|ALL|NEVER|ALWAYS|UNLIKELY|MOST LIKELY|PRIMARILY|CANNOT|DOES NOT|IS NOT|ARE NOT|WITHOUT|INCORRECT|CORRECT|MAIN|PRIMARY|KEY|MAJOR|IMPORTANT)\b/g;
const TB_TERM_KEYWORDS = /\b(marketing myopia|value proposition|market offering|customer equity|customer lifetime value|share of customer|customer relationship management|CRM|marketing mix|4Ps|4Cs|STP|segmentation|targeting|positioning|SWOT|BCG|market penetration|market development|product development|diversification|mission statement|strategic planning|value chain|value delivery network|marketing ROI|microenvironment|macroenvironment|demographic|economic|natural|technological|political|cultural|environmental sustainability|publics|marketing intermediaries|consumer buyer behavior|consumer market|black box|subculture|cross-cultural|opinion leader|buzz marketing|word-of-mouth|reference group|aspirational|lifestyle|psychographics|AIO|motivation|perception|selective attention|selective distortion|selective retention|cognitive dissonance|Maslow|complex buying|dissonance-reducing|habitual buying|variety-seeking|need recognition|information search|postpurchase|adoption process|innovators|early adopters|early majority|late majority|laggards|relative advantage|compatibility|complexity|trialability|observability|brand personality|influencer)\b/gi;

function highlightTbKeywords(text) {
  // First escape HTML entities
  let safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Highlight signal words (red/warning — these change the meaning)
  safe = safe.replace(TB_KEYWORDS, '<span class="tb-kw-signal">$1</span>');
  // Highlight marketing terms (teal — helps identify the concept)
  safe = safe.replace(TB_TERM_KEYWORDS, function(match) {
    // Don't double-wrap if already inside a span
    return '<span class="tb-kw-term">' + match + '</span>';
  });
  return safe;
}

const tbState = {
  filterCh: 'all',
  filterDiff: 'all',
  mode: 'practice',
  count: 50,
  questions: [],
  current: 0,
  score: 0,
  answered: false,
  wrongAnswers: [],
  chapterScores: {},
  examAnswers: [],
  isReview: false
};

function setTbFilter(type, val, btn) {
  if (type === 'ch') {
    tbState.filterCh = val;
    document.querySelectorAll('#tb-ch-btns .past-filter-btn').forEach(b => b.classList.remove('active'));
  } else if (type === 'diff') {
    tbState.filterDiff = val;
    document.querySelectorAll('#tb-diff-btns .past-filter-btn').forEach(b => b.classList.remove('active'));
  } else if (type === 'mode') {
    tbState.mode = val;
    document.querySelectorAll('#tb-mode-btns .past-filter-btn').forEach(b => b.classList.remove('active'));
  } else if (type === 'count') {
    tbState.count = val;
    document.querySelectorAll('#tb-count-btns .past-filter-btn').forEach(b => b.classList.remove('active'));
  }
  btn.classList.add('active');
  updateTbPoolCount();
}

function getTbPool() {
  let pool = typeof tbQuestions !== 'undefined' ? tbQuestions : [];
  if (tbState.filterCh !== 'all') pool = pool.filter(q => q.ch === tbState.filterCh);
  if (tbState.filterDiff !== 'all') pool = pool.filter(q => q.diff === tbState.filterDiff);
  return pool;
}

function updateTbPoolCount() {
  const pool = getTbPool();
  const el = document.getElementById('tb-pool-count');
  if (el) el.textContent = pool.length + ' سؤال متاح';
}

function startTbQuiz(isReview) {
  let pool;
  if (isReview) {
    pool = tbState.wrongAnswers;
    tbState.isReview = true;
  } else {
    pool = getTbPool();
    tbState.isReview = false;
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const count = tbState.count === 9999 ? shuffled.length : Math.min(tbState.count, shuffled.length);
  tbState.questions = shuffled.slice(0, count);
  tbState.current = 0;
  tbState.score = 0;
  tbState.answered = false;
  tbState.wrongAnswers = [];
  tbState.chapterScores = {};
  tbState.examAnswers = tbState.mode === 'exam' ? new Array(tbState.questions.length).fill(null) : [];

  document.querySelector('.tb-setup').style.display = 'none';
  document.querySelector('.tb-run').style.display = 'block';
  document.querySelector('.tb-results').style.display = 'none';
  const examRev = document.querySelector('.tb-exam-review');
  if (examRev) examRev.style.display = 'none';
  renderTbQuestion();
}

function renderTbQuestion() {
  const q = tbState.questions[tbState.current];
  const total = tbState.questions.length;
  const pct = ((tbState.current) / total * 100).toFixed(0);
  const chNames = { ch1: 'Ch 1', ch2: 'Ch 2', ch3: 'Ch 3', ch5: 'Ch 5' };
  const diffNames = { e: '🟢 Easy', m: '🟡 Moderate', d: '🔴 Difficult' };

  document.querySelector('.tb-progress-fill').style.width = pct + '%';
  document.querySelector('.tb-q-counter').textContent =
    (tbState.isReview ? '🔴 مراجعة — ' : '') + 'سؤال ' + (tbState.current + 1) + ' / ' + total;
  document.querySelector('.tb-ch-badge').textContent = chNames[q.ch] || '';
  document.querySelector('.tb-diff-badge').textContent = diffNames[q.diff] || '';

  // Highlight keywords in question - safe because we escape HTML first in highlightTbKeywords
  const qTextEl = document.querySelector('.tb-q-text');
  qTextEl.innerHTML = highlightTbKeywords(q.q);

  const optsEl = document.querySelector('.tb-opts');
  const prevSelected = tbState.mode === 'exam' ? tbState.examAnswers[tbState.current] : null;
  optsEl.textContent = '';
  q.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'past-opt-btn' + (prevSelected === i ? ' tb-exam-selected' : '');
    btn.textContent = String.fromCharCode(65 + i) + '. ' + o;
    btn.addEventListener('click', () => selectTbOpt(i));
    optsEl.appendChild(btn);
  });

  document.querySelector('.tb-feedback').style.display = 'none';
  const nextBtn = document.querySelector('.tb-next-btn');

  if (tbState.mode === 'exam') {
    nextBtn.style.display = 'block';
    nextBtn.textContent = tbState.current === tbState.questions.length - 1 ? 'إنهاء الامتحان ✓' : 'التالي ←';
    tbState.answered = false;
  } else {
    nextBtn.style.display = 'none';
    tbState.answered = false;
  }
}

function selectTbOpt(idx) {
  const q = tbState.questions[tbState.current];

  if (tbState.mode === 'exam') {
    tbState.examAnswers[tbState.current] = idx;
    const btns = document.querySelectorAll('.tb-opts .past-opt-btn');
    btns.forEach((b, i) => {
      b.classList.toggle('tb-exam-selected', i === idx);
    });
    return;
  }

  if (tbState.answered) return;
  tbState.answered = true;
  const correct = idx === q.ans;

  if (correct) tbState.score++;
  else tbState.wrongAnswers.push(q);

  if (q.ch) {
    if (!tbState.chapterScores[q.ch]) tbState.chapterScores[q.ch] = { correct: 0, total: 0 };
    tbState.chapterScores[q.ch].total++;
    if (correct) tbState.chapterScores[q.ch].correct++;
  }

  if (typeof showQuizEncouragement === 'function') showQuizEncouragement(correct);

  const btns = document.querySelectorAll('.tb-opts .past-opt-btn');
  btns.forEach((b, i) => {
    if (i === q.ans) b.classList.add('past-correct');
    else if (i === idx && !correct) b.classList.add('past-wrong');
    b.disabled = true;
  });

  const fb = document.querySelector('.tb-feedback');
  fb.style.display = 'block';
  fb.className = 'tb-feedback past-feedback ' + (correct ? 'past-fb-correct' : 'past-fb-wrong');
  fb.textContent = correct
    ? '✅ صح! أحسنت'
    : '❌ خطأ — الإجابة الصحيحة: ' + String.fromCharCode(65 + q.ans) + '. ' + q.opts[q.ans];

  document.querySelector('.tb-next-btn').style.display = 'block';
}

function nextTbQuestion() {
  tbState.current++;
  if (tbState.current >= tbState.questions.length) {
    if (tbState.mode === 'exam') {
      tbState.score = 0;
      tbState.wrongAnswers = [];
      tbState.chapterScores = {};
      tbState.questions.forEach((q, i) => {
        const sel = tbState.examAnswers[i];
        if (q.ch) {
          if (!tbState.chapterScores[q.ch]) tbState.chapterScores[q.ch] = { correct: 0, total: 0 };
          tbState.chapterScores[q.ch].total++;
        }
        if (sel === q.ans) {
          tbState.score++;
          if (q.ch) tbState.chapterScores[q.ch].correct++;
        } else {
          tbState.wrongAnswers.push(q);
        }
      });
    }
    showTbResults();
  } else {
    renderTbQuestion();
  }
}

function showTbResults() {
  document.querySelector('.tb-run').style.display = 'none';
  document.querySelector('.tb-results').style.display = 'block';
  const total = tbState.questions.length;
  const pct = Math.round(tbState.score / total * 100);

  document.querySelector('.tb-score-num').textContent = tbState.score + ' / ' + total;
  document.querySelector('.tb-score-pct').textContent = pct + '%';
  document.querySelector('.tb-score-msg').textContent =
    pct >= 80 ? '🎉 ممتاز! أداء رائع!'
    : pct >= 60 ? '👍 جيد! واصل المذاكرة'
    : '📚 تحتاج مراجعة — راجع الفصول وحاول مجدداً';

  const bestKey = 'mkt201_tb_best_' + tbState.filterCh + '_' + tbState.filterDiff;
  const prevBest = parseInt(localStorage.getItem(bestKey) || '0');
  if (pct > prevBest) localStorage.setItem(bestKey, pct);
  const best = Math.max(pct, prevBest);
  const bestRow = document.querySelector('.tb-best-row');
  const bestVal = document.querySelector('.tb-best-val');
  if (bestRow && bestVal) {
    bestRow.style.display = 'flex';
    bestVal.textContent = best + '%' + (pct >= prevBest && prevBest > 0 ? ' 🆕 رقم جديد!' : '');
  }

  const chNames = { ch1: 'الفصل 1', ch2: 'الفصل 2', ch3: 'الفصل 3', ch5: 'الفصل 5' };
  const breakdown = document.querySelector('.tb-ch-breakdown');
  if (breakdown && Object.keys(tbState.chapterScores).length > 0) {
    breakdown.textContent = '';
    const h3 = document.createElement('h3');
    h3.style.cssText = 'margin:0 0 14px;font-size:1rem;font-weight:700;';
    h3.textContent = '📊 نتيجتك بالفصل';
    breakdown.appendChild(h3);
    Object.entries(tbState.chapterScores).forEach(([ch, s]) => {
      const p = Math.round(s.correct / s.total * 100);
      const color = p >= 80 ? '#10b981' : p >= 60 ? '#f59e0b' : '#f43f5e';
      const row = document.createElement('div');
      row.className = 'past-ch-row';
      const label = document.createElement('div');
      label.className = 'past-ch-row-label';
      const nameSpan = document.createElement('span');
      nameSpan.textContent = chNames[ch] || ch;
      const scoreSpan = document.createElement('span');
      scoreSpan.style.cssText = 'font-weight:800;color:' + color + ';';
      scoreSpan.textContent = s.correct + '/' + s.total + ' (' + p + '%)';
      label.appendChild(nameSpan);
      label.appendChild(scoreSpan);
      const track = document.createElement('div');
      track.className = 'past-ch-bar-track';
      const fill = document.createElement('div');
      fill.className = 'past-ch-bar-fill';
      fill.style.cssText = 'width:' + p + '%;background:' + color + ';';
      track.appendChild(fill);
      row.appendChild(label);
      row.appendChild(track);
      breakdown.appendChild(row);
    });
    breakdown.style.display = 'block';
  } else if (breakdown) {
    breakdown.style.display = 'none';
  }

  const reviewBtn = document.querySelector('.tb-review-btn');
  if (reviewBtn) reviewBtn.style.display = tbState.wrongAnswers.length && tbState.mode === 'practice' ? 'inline-block' : 'none';
  const examReviewBtn = document.querySelector('.tb-exam-review-btn');
  if (examReviewBtn) examReviewBtn.style.display = tbState.mode === 'exam' ? 'inline-block' : 'none';
}

function showTbExamReview() {
  document.querySelector('.tb-results').style.display = 'none';
  const reviewEl = document.querySelector('.tb-exam-review');
  reviewEl.style.display = 'block';
  reviewEl.textContent = '';

  const h2 = document.createElement('h2');
  h2.style.cssText = 'margin:0 0 20px;font-size:1.2rem;';
  h2.textContent = '📋 مراجعة الامتحان';
  reviewEl.appendChild(h2);

  tbState.questions.forEach((q, i) => {
    const userAns = tbState.examAnswers[i];
    const correct = userAns === q.ans;
    const icon = userAns === null ? '⬜' : correct ? '✅' : '❌';
    const card = document.createElement('div');
    card.style.cssText = 'padding:16px;margin-bottom:12px;border-radius:12px;border:1px solid var(--line);background:' +
      (correct ? 'rgba(16,185,129,0.05)' : userAns === null ? 'rgba(0,0,0,0.02)' : 'rgba(244,63,94,0.05)') + ';';
    const header = document.createElement('div');
    header.style.cssText = 'font-weight:700;margin-bottom:8px;';
    header.textContent = icon + ' سؤال ' + (i + 1);
    card.appendChild(header);
    const qText = document.createElement('div');
    qText.style.cssText = 'margin-bottom:10px;line-height:1.6;';
    qText.textContent = q.q;
    card.appendChild(qText);
    q.opts.forEach((o, j) => {
      const optDiv = document.createElement('div');
      let bgStyle = 'padding:6px 10px;margin:3px 0;border-radius:8px;';
      if (j === q.ans) bgStyle += 'background:rgba(16,185,129,0.15);font-weight:700;';
      else if (j === userAns && !correct) bgStyle += 'background:rgba(244,63,94,0.15);text-decoration:line-through;';
      optDiv.style.cssText = bgStyle;
      optDiv.textContent = String.fromCharCode(65 + j) + '. ' + o;
      card.appendChild(optDiv);
    });
    reviewEl.appendChild(card);
  });

  const btnWrap = document.createElement('div');
  btnWrap.style.cssText = 'text-align:center;margin-top:20px;';
  const backBtn = document.createElement('button');
  backBtn.className = 'quiz-start-btn';
  backBtn.textContent = '↺ ارجع للإعداد';
  backBtn.addEventListener('click', resetTbQuiz);
  btnWrap.appendChild(backBtn);
  reviewEl.appendChild(btnWrap);
}

function reviewTbWrong() {
  tbState.mode = 'practice';
  startTbQuiz(true);
}

function resetTbQuiz() {
  document.querySelector('.tb-setup').style.display = 'block';
  document.querySelector('.tb-run').style.display = 'none';
  document.querySelector('.tb-results').style.display = 'none';
  const examRev = document.querySelector('.tb-exam-review');
  if (examRev) examRev.style.display = 'none';
  updateTbPoolCount();
}

document.addEventListener('DOMContentLoaded', function() { updateTbPoolCount(); });

// ── GAMIFICATION ──
const GAME_KEY = 'mkt201_game';

function getGameData() {
  const defaults = { xp: 0, level: 1, streak: 0, lastDate: null, badges: [], totalCorrect: 0, totalAnswered: 0, combo: 0, maxCombo: 0 };
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(GAME_KEY)) }; }
  catch { return defaults; }
}

function saveGameData(d) { localStorage.setItem(GAME_KEY, JSON.stringify(d)); }

const LEVELS = [
  { level:1, name:'مبتدئ',    icon:'🌱', xpNeeded:0   },
  { level:2, name:'طالب',     icon:'📖', xpNeeded:200 },
  { level:3, name:'متقدم',    icon:'🎯', xpNeeded:500 },
  { level:4, name:'محترف',    icon:'⚡', xpNeeded:1000},
  { level:5, name:'خبير',     icon:'🏆', xpNeeded:2000},
  { level:6, name:'أسطورة',   icon:'👑', xpNeeded:4000},
];

function getLevelInfo(xp) {
  let current = LEVELS[0];
  for (const l of LEVELS) { if (xp >= l.xpNeeded) current = l; }
  const idx = LEVELS.indexOf(current);
  const next = LEVELS[idx + 1] || null;
  const progress = next ? Math.round((xp - current.xpNeeded) / (next.xpNeeded - current.xpNeeded) * 100) : 100;
  return { ...current, next, progress };
}

const BADGES = [
  { id:'first_correct',  icon:'⭐', name:'أول إجابة صح',        check: d => d.totalCorrect >= 1 },
  { id:'streak_3',       icon:'🔥', name:'3 أيام متتالية',       check: d => d.streak >= 3 },
  { id:'streak_7',       icon:'🔥🔥',name:'أسبوع كامل',          check: d => d.streak >= 7 },
  { id:'combo_5',        icon:'⚡', name:'5 صح متتالية',         check: d => d.maxCombo >= 5 },
  { id:'combo_10',       icon:'💥', name:'10 صح متتالية',        check: d => d.maxCombo >= 10 },
  { id:'answered_50',    icon:'📚', name:'50 سؤال',              check: d => d.totalAnswered >= 50 },
  { id:'answered_100',   icon:'💯', name:'100 سؤال',             check: d => d.totalAnswered >= 100 },
  { id:'answered_500',   icon:'🎓', name:'500 سؤال',             check: d => d.totalAnswered >= 500 },
  { id:'level_3',        icon:'🎯', name:'وصلت المستوى المتقدم', check: d => d.level >= 3 },
  { id:'level_5',        icon:'👑', name:'وصلت مستوى الخبير',    check: d => d.level >= 5 },
  { id:'perfect_quiz',   icon:'🌟', name:'كويز بدون أخطاء',      check: d => d.perfectQuiz  },
];

function awardXP(amount, comboMultiplier) {
  const d = getGameData();
  const oldLevel = getLevelInfo(d.xp).level;
  const earned = Math.round(amount * comboMultiplier);
  d.xp += earned;
  const newLevelInfo = getLevelInfo(d.xp);
  d.level = newLevelInfo.level;
  saveGameData(d);
  showXPPop(earned, comboMultiplier > 1);
  if (newLevelInfo.level > oldLevel) showLevelUp(newLevelInfo);
  return earned;
}

function updateCombo(correct) {
  const d = getGameData();
  if (correct) {
    d.combo = (d.combo || 0) + 1;
    d.maxCombo = Math.max(d.maxCombo || 0, d.combo);
    d.totalCorrect = (d.totalCorrect || 0) + 1;
  } else {
    d.combo = 0;
  }
  d.totalAnswered = (d.totalAnswered || 0) + 1;
  saveGameData(d);
  updateStreakDaily();
  checkBadges(d);
  updateGameHUD();
  return d.combo;
}

function updateStreakDaily() {
  const d = getGameData();
  const today = new Date().toDateString();
  if (d.lastDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    d.streak = d.lastDate === yesterday ? (d.streak || 0) + 1 : 1;
    d.lastDate = today;
    saveGameData(d);
  }
}

function checkBadges(d) {
  let newBadges = [];
  for (const b of BADGES) {
    if (!d.badges.includes(b.id) && b.check(d)) {
      d.badges.push(b.id);
      newBadges.push(b);
    }
  }
  if (newBadges.length) { saveGameData(d); newBadges.forEach(b => showBadgeToast(b)); }
}

function showXPPop(amount, isCombo) {
  const el = document.createElement('div');
  el.className = 'xp-pop' + (isCombo ? ' xp-pop-combo' : '');
  el.textContent = (isCombo ? '🔥 ' : '') + '+' + amount + ' XP';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

// ── تشجيع بعد كل إجابة ──
const QUIZ_ENCOURAGEMENTS_CORRECT = [
  'ممتاز! 🌟', 'صح! 💪', 'أحسنت! 🎯',
  'رائع! ✨', 'بالضبط! 🔥', 'عظيم! 🏆',
  'واو! 😎', 'صاح! 👏', 'زين! ⭐'
];
const QUIZ_ENCOURAGEMENTS_WRONG = [
  'كمّل 💪', 'المرة الجاية! 💡', 'تقدر! 🌱',
  'ما يهم، واصل! 🚀', 'الغلط تعلّم 💡', 'ارفع رأسك 👊'
];
// ── أصوات الإجابة (Web Audio API — بدون ملفات خارجية) ──
function playAnswerSound(isCorrect) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (isCorrect) {
      // صوت صح: نغمتان صاعدتان (ding-ding)
      [523.25, 783.99].forEach((freq, i) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.28, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.25);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.25);
      });
    } else {
      // صوت غلط: نغمة نازلة هادئة (مش مزعجة)
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch (e) { /* المتصفح ما يدعم AudioContext */ }
}

function showQuizEncouragement(isCorrect = true) {
  playAnswerSound(isCorrect);
  const pool = isCorrect ? QUIZ_ENCOURAGEMENTS_CORRECT : QUIZ_ENCOURAGEMENTS_WRONG;
  const msg  = pool[Math.floor(Math.random() * pool.length)];
  const el   = document.createElement('div');
  el.className   = 'quiz-encourage' + (isCorrect ? '' : ' quiz-encourage-wrong');
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1400);
}

function showLevelUp(levelInfo) {
  const el = document.createElement('div');
  el.className = 'level-up-toast';
  el.innerHTML = `<div class="lu-icon">${levelInfo.icon}</div><div class="lu-text"><strong>ترقية!</strong><br>وصلت مستوى <strong>${levelInfo.name}</strong></div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

function showBadgeToast(badge) {
  const el = document.createElement('div');
  el.className = 'badge-toast';
  el.innerHTML = `<span class="bt-icon">${badge.icon}</span><div><strong>شارة جديدة!</strong><br>${badge.name}</div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function updateGameHUD() {
  const d = getGameData();
  const li = getLevelInfo(d.xp);
  const hudLevel = document.getElementById('hud-level');
  const hudXP    = document.getElementById('hud-xp');
  const hudStreak = document.getElementById('hud-streak');
  const hudCombo  = document.getElementById('hud-combo');
  const hudXPBar  = document.getElementById('hud-xp-bar');
  if (hudLevel) hudLevel.textContent = li.icon + ' ' + li.name;
  if (hudXP)    hudXP.textContent    = d.xp + ' XP';
  if (hudStreak) hudStreak.textContent = '🔥 ' + (d.streak || 0);
  if (hudCombo && d.combo > 1) { hudCombo.textContent = '⚡ x' + d.combo; hudCombo.style.display = 'flex'; }
  else if (hudCombo) hudCombo.style.display = 'none';
  if (hudXPBar) hudXPBar.style.width = li.progress + '%';
}

function getComboMultiplier(combo) {
  if (combo >= 10) return 3;
  if (combo >= 5)  return 2;
  if (combo >= 3)  return 1.5;
  return 1;
}

function renderBadgesPage() {
  const d = getGameData();
  const grid = document.getElementById('badges-grid');
  if (!grid) return;
  const dark = document.body.classList.contains('dark');
  grid.innerHTML = BADGES.map(b => {
    const earned = d.badges.includes(b.id);
    // Inline colour guarantees visibility regardless of CSS cache
    const nameColor = earned
      ? '#92400e'
      : dark ? '#d1fae5' : '#111827';
    const iconOpacity = earned ? '1' : '0.3';
    return `<div class="badge-card ${earned ? 'badge-earned' : 'badge-locked'}" style="opacity:1;filter:none;">
      <div class="badge-icon" style="opacity:${iconOpacity};filter:${earned ? 'none' : 'grayscale(1)'};">${earned ? b.icon : '🔒'}</div>
      <div class="badge-name" style="color:${nameColor};font-weight:700;font-size:.85rem;">${b.name}</div>
    </div>`;
  }).join('');
}

// ── KEYWORD HIGHLIGHT ─────────────────────
// 🔴 danger = تحذير  |  🟡 concept = مصطلح مهم
const kwDanger = [
  'except','not a ','not one of','does not','is not','is NOT','EXCEPT',
  'least likely','least important','not true','not correct','not include',
  'would not','should not','cannot','rather than',
];
const kwConcepts = [
  // ── CH1 TERMS ──
  'societal marketing concept','societal marketing','marketing concept','selling concept',
  'production concept','product concept','customer-perceived value','customer equity',
  'customer lifetime value','lifetime value','true friends','barnacles','butterflies',
  'strangers','market offering','marketing myopia','value proposition',
  'exchange','target marketing','customer-driven marketing','customer-driving marketing',
  'customer-driven','customer-driving','sustainable marketing','customer delight',
  'share of customer','consumer-generated marketing','partner relationship management',
  'club marketing','frequency marketing program','frequency marketing',
  'customer relationship management','crm','customer satisfaction','customer loyalty',
  'customer value','market','marketing environment','marketing management',
  'marketing strategy','marketing program','customer touchpoint',
  // CH1 PHRASES (الجمل الدالة)
  'profitable customer relationship','managing profitable',
  'shaped by culture and individual','shaped by culture',   // → wants
  'backed by buying power','buying power',                  // → demands
  'state of felt deprivation',                              // → need
  'combination of products, services, information',         // → market offering
  'benefits minus','benefits and all the costs',            // → customer value
  'exceeds expectations','meets expectations',              // → satisfaction/delight
  'society\'s interests','society\'s long-run interests',   // → societal marketing
  'make-and-sell','make and sell',                          // → selling/production
  'sense-and-respond','sense and respond',                  // → marketing concept
  'five-step model','5-step model',
  'peter drucker',
  'social and managerial process',
  'preoccupied with their own products','losing sight of underlying',  // → myopia
  'act of obtaining a desired object',                      // → exchange
  'set of actual and potential buyers','actual and potential buyers',  // → market
  'set of all actual',                                      // → market
  'delight customers','achieve customer delight','customer is delighted',
  'promising only what they can','deliver more than they promise',
  'full partnerships','full partnership','basic relationships','basic relationship',
  'customer evangelists','customer equity',
  'customer relationship groups','relationship groups',
  'customer-managed relationship',
  // ── CH2 TERMS ──
  'strategic planning','mission statement','bcg matrix','cash cows','question marks',
  'stars','dogs','growth-share matrix',
  'market penetration','market development','product development','diversification',
  'marketing control','marketing roi','strategic business unit','sbu',
  'ansoff matrix','value chain','value delivery network','internal value chain',
  'value-creating activities','value-creating',
  'marketing mix','four ps','4ps',
  'marketing implementation','downsizing','harvesting','divesting','portfolio analysis',
  'business portfolio','operating control','strategic control',
  'market-oriented mission','product-oriented mission',
  // CH2 PHRASES
  'high growth, high share','high growth, low share',       // → stars / question marks
  'low growth, high share','low growth, low share',         // → cash cows / dogs
  'new markets for current','new products for current',     // → market dev / product dev
  'more sales to current customers',                        // → market penetration
  'new products for new',                                   // → diversification
  'purpose of the organization','organization\'s purpose',  // → mission statement
  'long-run survival and growth',                           // → strategic planning
  'net return from a marketing investment',                 // → marketing ROI
  'measuring and evaluating the results',                   // → marketing control
  'corrective action',                                      // → marketing control
  'product oriented','market oriented','market-oriented',
  'company\'s goals and capabilities','goals and capabilities',
  'collection of businesses','key businesses',
  'high-share','low-share','high-growth','low-growth',
  'require heavy investment','generate cash','generate enough cash',
  'sell or phase out','selling it or phasing',
  'turning marketing plans into','turning plans into actions',
  'evaluating the results of marketing',
  'arranging for a product to occupy','clear, distinctive, and desirable',
  // ── CH3 TERMS ──
  'macroenvironment','microenvironment','demographic environment','economic environment',
  'natural environment','technological environment','political environment','cultural values',
  'baby boomers','generation x','millennials','generation z',
  'suppliers','resellers','intermediar','financial intermediar',
  'cause-related marketing',
  'consumer market','business market','government market','reseller market',
  'citizen-action public','financial public','internal public','general public',
  'proactive stance','reactive stance','proactive approach','reactive approach',
  'value marketing','environmental scanning',
  'physical distribution firm','marketing services agenc',
  'purchasing power','spending patterns','income distribution',
  'inflation','interest rate','credit availab',
  'natural resources shortage','raw material shortage','increased pollution',
  'subsistence econom','industrializing econom','industrial econom',
  'lobbying','political action','government regulation',
  // CH3 PHRASES
  'size, density, location, age',                           // → demographic
  'purchasing power and spending patterns',                 // → economic env
  'natural resources','raw materials','environmental sustainability',
  'rapid change','r&d spending','research and development',
  'legislation','regulatory agencies','lobbying',           // → political/legal
  'core beliefs','secondary beliefs',
  'how people view themselves',                             // → cultural values
  'how people view others','how people view organizations',
  'consumer organizations, environmental groups',           // → local publics
  'local publics','media publics','government publics',
  'born between 1946','born 1946',                          // → baby boomers
  'carries news, features','carries news',                  // → media publics
  'buy goods and services for further processing',
  'buy goods and services for personal consumption',
  'buy goods and services to resell',
  'help the company promote, sell, and distribute',
  'actors and forces outside marketing',
  'forces close to the company',
  'larger societal forces',
  'actors close to the company',
  // ── CH5 TERMS ──
  'complex buying','dissonance-reducing','habitual buying','variety-seeking',
  'adoption process','innovators','early adopters','early mainstream',
  'late mainstream','laggards','cognitive dissonance','need recognition',
  'maslow','reference group','perception','subculture','opinion leader',
  'black box','stimulus-response',
  'social class','lifestyle','personality','self-concept',
  'new task','straight rebuy','modified rebuy',
  'buying center','buyer role','buying role',
  'derived demand','inelastic demand','fluctuating demand',
  'culture','social factors','personal factors','psychological factors',
  'age and life-cycle','life-cycle stage',
  'roles and status','role and status',
  'motive','motivation','drive','cue','reinforcement',
  'belief','attitude',
  // CH5 PHRASES
  'most basic cause of a person\'s wants',                  // → culture
  'shared value systems based on common',                   // → subculture
  'direct or indirect influence on',                        // → reference groups
  'high involvement','low involvement',                     // → buying behavior type
  'significant brand differences','few brand differences',
  'post-purchase','postpurchase','buyer\'s remorse',        // → cognitive dissonance
  'awareness, interest, evaluation, trial',                 // → adoption process
  'first 2.5%','last 16%','opinion leaders',
  'physiological','safety needs','esteem needs','self-actualization', // → maslow
  'selective attention','selective distortion','selective retention', // → perception
  'most pressing need','least pressing need',
  'select, organize, and interpret','interpret information',
  'face-to-face','points of comparison or reference',       // → reference groups
  'descriptive thought that a person',                      // → belief
  'evaluations, feelings, and tendencies',                  // → attitude
  'because of special skills, knowledge',                   // → opinion leader
  'limited problem solving','extended problem solving',
  'problem recognition','information search','alternative evaluation',
  'purchase decision','postpurchase behavior',
  'rate of adoption','relative advantage','compatibility','complexity','divisibility','communicability',
  // ── CH5 extra ──
  'buzz marketing','word-of-mouth','psychographics','aio',
  'activities, interests, and opinions',
  // ── CH1 EXTRA PHRASES (للأسئلة التي لا تذكر اسم المفهوم) ──
  'sellers most effective',                                   // sellers most effective
  'benefits and experiences produced by their products',      // sellers most effective
  'overall experience provided at the motel',                 // market offering
  'segments of a population to serve',                        // target marketing
  'set of benefits that a company promises to deliver',       // value proposition
  'cost could be reduced further for increased',              // production concept
  'offer the most in quality, performance, and innovative',   // product concept
  'obesity epidemic',                                         // societal marketing
  'enthusiastic Roomba owners',                               // consumer-generated
  'fast and reliable package delivery',                       // customer-perceived value
  'purchase products they act on',                            // perceived value
  'stream of possible purchases',                             // customer lifetime value
  'without our customers, we have no business',               // customer focus
  'portion of the customer\'s purchasing that a company',     // share of customer
  'product suggestions to customers based on their current',  // share of customer
  'losing the entire stream of possible',                     // customer lifetime value
  'low-margin customers','high-margin customers',
  'repeat purchases and tell others about their positive',    // customer evangelists
  'room upgrade offered by a hotel',                          // frequency marketing
  'become members of the firm\'s web site',                   // club marketing
  'become members of the firm',                               // club marketing
  'greater consumer control',                                 // consumer control
  'rely on ________ marketing',                               // marketing by intrusion
  'social marketing campaign',                                // social marketing
  'not-for-profit marketing',
  'encourage energy conservation',                            // social marketing
  'invited teenage girls to make an',                         // consumer-generated
  'seasonal promotional gimmick',                             // selling concept
  // ── CH2 EXTRA PHRASES ──
  'abundant and affordable food for all',                     // mission statement
  'product-oriented business definition',
  'broad mission leads to',                                   // hierarchy of objectives
  '400 stores to cater',                                      // market penetration (Phoenix)
  'product/expansion grid',                                   // ansoff matrix
  'encouraging senior citizens to visit',                     // market development
  'Fun-Spot\'s mission',                                      // mission statement
  'lower Fun-Spot\'s prices',                                 // market penetration
  'new offerings and entertainment for',                      // product development
  'RedFin manufactures diving equipment',                     // internal value chain
  'respond in a similar way to a series',                     // market segment
  'introduced Eva, a mild roast',                             // product development
  'new style of soccer shoe',                                 // product development
  'checking ongoing performance against the annual plan',     // operating control
  'assesses the attractiveness of its various',               // portfolio analysis
  'independently owned businesses',                           // marketing intermediary
  'hopes to create customer value and achieve',               // marketing strategy
  // ── CH3 EXTRA PHRASES ──
  'move and stock goods from their manufacturing',            // physical distribution
  'ability to obtain funds',                                  // financial publics
  'neighborhood residents and community organizations',       // local publics
  'international insurance and financial services',           // general publics
  'workers, managers, and members of the board',              // internal publics
  'changing age structure of the population',                 // demographic
  'generational groups in U.S',                              // demographics
  'first to grow up in the Internet era',                     // gen x
  'most educated to date',                                    // gen x
  'most comfortable with digital technology',                 // millennials
  'highly mobile, connected, and social',                     // gen z
  'increasingly nontraditional',                              // demographic
  'migration to micropolitan',                                // demographic
  'financially cautious buyers greater value',                // value marketing
  'Food and Drug Administration',                             // political/legal
  'Consumer Product Safety Commission',                       // political/legal
  'Sherman Antitrust',                                        // political/legal
  'limits the number of commercials aired during children',   // political/legal
  'laws, government agencies, and pressure groups',           // political environment
  'Governments develop public policy',                        // political
  'business-oriented laws covering',                          // political/legal
  'price-fixing','predatory pricing','monopolies',            // political/legal
  'RFID technology',                                          // technological
  'knowledge explosion',                                      // technological
  'persistence of cultural values',                           // core/secondary beliefs
  'primary cultural values are resistant to change',          // core beliefs
  'more open to change',                                      // secondary beliefs
  'carries news, features, and editorial',                    // media publics
  'buy goods and services for personal consumption',          // consumer market
  'buy goods and services for further processing',            // business market
  'government agencies that buy goods and services',          // government market
  'actively resist social change',                            // proactive/reactive
  'lobbyists to influence legislation',                       // proactive stance
  // ── CH3 MORE PHRASES ──
  'workers, managers, and members of the board are examples',  // internal publics
  'workers, managers',                                         // internal publics
  'food and drug administration',                              // political/legal
  'consumer product safety commission',                        // political/legal
  'prohibits monopolies and activities',                       // Sherman Act
  'number of commercials aired during children',               // political/legal
  'society by passing legislation',                            // political/legal
  'public policy to',                                         // political/legal
  'business-oriented laws',                                    // political/legal
  'social criticism of marketing','high prices','deceptive practices',
  'high-pressure selling','unsafe products','planned obsolescence',
  'shoddy or unsafe','inferior products',
  'consumerism movement','environmentalism',
  'green marketing','sustainable companies',
  'natural resources','shortages of raw materials',
  'growth of internet','digital age','online social media',
  'older consumers','aging population',
  'gender differences','changing roles of women',
  'micropolitan areas','suburban areas',
  'second-largest minority','largest minority',
  'Hispanic American','African American','Asian American',
  'brand conscious','most brand conscious',
  'deeply family oriented',
  'more price-conscious','price-conscious',
  'total number of people','population growth',
  'financially cautious','new frugality','value marketing',
  'stricter regulations','legislation affecting',
  'enforces laws','laws to promote competition',
  'fair pricing','truth in advertising',
  'privacy concerns','consumer privacy',
  'persistence of primary','very resistant to change',
  // ── CH5 MORE PHRASES ──
  'individuals and households that buy or acquire goods',      // consumer buyer behavior
  'most basic determinant of a person\'s wants and behavior',  // culture
  'society\'s relatively permanent and ordered divisions',     // social class
  'show distinct product and brand preferences',               // social class
  'one of the social factors',                                 // social factors
  'groups to which an individual wishes to belong',            // aspirational group
  'most susceptible to reference group',
  'buy goods for personal consumption',
  'cannot research','why they buy',
  'age, life-cycle stage','life-cycle stage segmentation',
  'life-changing events',
  'unique psychological characteristics',
  'mix of human traits that may be attributed to a brand',     // brand personality
  'high-risk situations and yet finds few differences',
  'variety of low-cost products',
  'low-risk, frequently purchased',
  'first step in the buyer',
  'buyers who are purchasing items',
  'buyers become satisfied or dissatisfied',
  'actions taken after the purchase',
  'discomfort caused by post-purchase',                        // cognitive dissonance
  'reduced after purchase',
  'typically expensive, infrequent, or risky',
  'extensively before buying',
  'brand comparison','brand evaluation',
  // ── CH5 EXTRA PHRASES ──
  'most important consumer buying organization in society',   // family
  'traditionally has been considered the main purchasing agent', // family
  'expected to perform for others in a group',                // role
  'Life-stage changes usually result from',                   // life-cycle
  'rediscovering the benefits of',                            // lifestyle
  'unique psychological characteristics that distinguish',    // personality
  'specific mix of human traits that may be attributed',      // brand personality
  'high-risk situations and yet finds few differences',       // dissonance-reducing
  'low-risk, frequently purchased products',                  // habitual buying
  'first step in the buyer decision process',                 // need recognition
  'most susceptible to reference group influence',            // reference groups
  'aspirational group',                                       // reference group
  'viral marketing',                                          // buzz marketing
  'straight rebuy',                                           // straight rebuy
  'modified rebuy',                                           // modified rebuy
  'new task purchase','new-task buying',                      // new task
  'buying center',                                            // buying center
  'derived from the demand for consumer goods',               // derived demand
  'not much affected by price changes',                       // inelastic demand
  'sharp increase or decrease in business',                   // fluctuating demand
  'characteristic of online social networks',                 // social media
  'brand evangelists who spread the word',                    // buzz marketing
  'life-stage segmentation',                                  // life-cycle stage
  'individual is expected to perform',                        // roles and status
  'how a person makes a major purchase',                      // complex buying
  'ruggedness','sincerity','excitement','competence','sophistication', // brand personality dims
  'interpret stimuli into a meaningful picture',              // perception
  'exposed to thousands of ads',                              // selective attention
  'people tend to interpret new information in a way',        // selective distortion
  'good points made about a brand they favor',                // selective retention
  // ── FIXES: SINGULAR/ABBREVIATED FORMS ──
  'secondary belief','core belief',                           // singular fix
  'gen xers','gen zers','gen x','gen z',                     // abbreviated generational names
  'highly involved with the purchase',                        // high involvement (exact phrase)
  'highly involved with an expensive',                        // high involvement
  'mission','company\'s mission',                             // mission statement (short form)
  'product\'s position','product position',                  // positioning (noun form)
  'demographic trend','demographic trends',                   // demographic environment
  'stock and move goods',                                     // physical distribution
  // ── CH2 REMAINING PHRASES ──
  'define their missions in terms of products or technologies', // marketing myopia
  'missions in terms of products',                            // marketing myopia
  'new line of men\'s clothing','recently introduced a line', // diversification
  'manufacturer of personal computers and printers, recently', // diversification
  'market nicher','specializes in serving customer segments',
  'a different kind of company',                              // positioning
  'green automobiles for a greener world',                    // position/value prop
  'communicate the merits of the product',                    // promotion
  'refers to activities that communicate',
  'complete analysis of the company\'s situation',            // SWOT
  'doing things right',                                       // implementation
  'doing the right things',                                   // strategy
  'geographic organization',
  'shifting their brand management focus','brand management focus',
  // ── CH3 REMAINING PHRASES ──
  'directed to study the demographic, economic',              // macroenvironment
  'resources needed by a company to produce',                 // suppliers
  'manufacturer of metal bolts','manufactures goods used by',
  'assists companies in promoting, distributing',             // marketing intermediary
  'help companies stock and move goods from their points',    // physical distribution
  'include banks, credit companies, insurance companies',     // financial intermediaries
  'sells products to end users or to other companies that will', // reseller
  'demographic trend','most important demographic trend',
  'true of gen xers','true of gen zers',
  'geographical shifts in population','migration toward',
  'population has shifted toward','Sunbelt',
  'lost population in the past two decades',
  '1950s, Americans made a massive exit',
  'work from their homes','SOHO market','SOHO',
  'job growth currently is the weakest','weakest for',
  'job growth is the strongest','strongest for',
  'accurate statement about the diversity',
  'fastest-growing U.S. population',
  'most brand conscious of all the ethnic',
  'individuals with disabilities',
  'generational groups is most likely',
  'dumping chemical wastes','chemical wastes in the local lake',
  'new technologies most likely lead to',
  'RFID product labels',
  'define and prevent unfair competition','unfair competition',
  'code of ethics','guide responses to ethical situations',
  'dropping out of organized religion','spirituality',
  'sustainable, all-natural food products','environmentally conscious',
  'create new industries',
  // ── CH5 REMAINING PHRASES ──
  'fastest-growing U.S. population subsegment','Hispanic American',
  'cultural factors that influence consumer behavior',
  'social factors','one of the social factors',
  'ads featuring members of a','country music band',
  'actively shares her knowledge with a wide group',
  'ambassadors who enthusiastically share their passion','brand evangelists',
  'Facebook, Snapchat','LinkedIn are all examples',
  'launched a brand of sturdy','brand of sturdy',
  'promotes its motorcycles with images of independence',
  'need that is sufficiently pressing to direct a person',
  'according to Freud','Freud',
  'long supported a particular brand of footwear',
  'didn\'t notice many of the ads','didn\'t notice',
  'purchase a high-end sports car','high-end sports car',
  'changes in an individual\'s behavior arising from experience',
  'minor stimuli that determine where, when, and how',
  'AIO dimensions','each consumer segment attracted',
  'highly involved with the purchase of an expensive product',
  'buying his first house','first house',
  'expensive, infrequent, or risky purchase','infrequent, or risky',
  'ten years, Bill and Margaret have saved money','Super Bowl',
  'conditions of low consumer involvement and little significant',
  'same breakfast cereal','purchases the same',
  'various brands of bath soap','never been loyal to a brand',
  'buyer spots a problem or need','buyer spots a problem',
  'going skiing over the weekend forced Donna',
  'new coat. During the','coat. During the',
  'taken up cycling as a hobby',
  'satisfied or dissatisfied after the purchase',
  'consumer\'s expectations and the product\'s perceived performance',
  'two different brands of wine from vineyards',
  'uneasy about losing out on the benefits of a brand not purchased',
  'learn about new products for the first time and make the decision',
  'degree to which the innovation appears superior',
  // TRUE/FALSE remaining
  'value is perceived identically','perceived identically',
  'Internet of Things',
  'small audiences','small audience social media',
  'do not target individual consumers',
  'making money for stockholders','mission could appropriately be stated',
  'place it occupies relative to competitors in the minds',
  'distribution channel firm that helps','distribution channel firm',
  'American workforce today is less white-collar',
  'prior to the Great Recession','Great Recession',
  'introduction of new technologies is equally beneficial',
  'easily explain what influences their purchases',
  'children exert little influence on family buying',
  'person\'s occupation has no effect',
  'tastes in food, clothes, recreation','food, clothes, recreation',
  'commercial sources of information typically legitimize',
  'word-of-mouth recommendations','recommendations from others',
  // ── FINAL 28 UNCOVERED FIXES ──
  // CH1
  'customer-managed relationships','customer- managed relationships',   // [0]
  'without our customers, we don\'t exist',                            // [1]
  'renovations of the guest rooms','add an indoor pool',               // [2]
  'implementing the suggestions she receives',                         // [3]
  'individual and community welfare',                                  // [4]
  'church targeting different demographic','to increase attendance',   // [5]
  'multiple social media','facebook, twitter, instagram',              // [6]
  'build strong relationships with the customers by consistently',     // [7]
  'multiple social media results in confused',                         // [25 T/F]
  // CH2
  'women\'s apparel manufacturer','recently acquired a houston-based', // [8]
  'new offerings and entertainment options',                           // [9]
  // CH3
  '14 percent of the u.s. population',                                // [10]
  'adults with disabilities','u.s. adults with disabilities',          // [11]
  'guide responses to complex social',                                 // [12]
  'people should choose a profession','choose a profession they like', // [13]
  'adultery is immoral',                                               // [14]
  'views of organizations in contemporary',                            // [15]
  'sharp decrease in confidence',
  'companies and their products often create',                         // [16]
  // CH5
  'most difficult to identify',                                        // [17]
  'factors that influence consumer behavior',                          // [18]
  'did not find anything particularly interesting',                    // [19]
  'disposable income','strong influence on family buying',             // [20]
  'families as consumer groups','families with children are now attracted', // [20b]
  'low- consumer involvement','little significant brand difference',   // [21]
  'skiing over the weekend forced donna','to go skiing over the weekend', // [22]
  'consumers will be either satisfied or dissatisfied',                // [23]
  'either satisfied or dissatisfied and engage',
  'consumer\'s expectations and the product\'s',                      // [24]
  'consumption pioneers','readiness to try new products',              // [26 T/F]
  'lagging adopters',                                                  // [27 T/F]
  // ── GENERAL SIGNALS ──
  'inside-out','outside-in','long-run','long-term','short-term','short-run',
  'profitable','unprofitable','break-even',
  'target market','market segment','market segmentation',
  'positioning','differentiation',
  'swot','strengths','weaknesses','opportunities','threats',
  'competitive advantage','market share','brand equity',
  'marketing plan','marketing audit',
];

// Pre-compile keyword regexes once (was rebuilding 470+ regexes per question)
const _kwAllSorted = [
  ...kwConcepts.map(w => ({ w, cls:'kw-concept' })),
  ...kwDanger.map(w   => ({ w, cls:'kw-danger'  })),
].sort((a,b) => b.w.length - a.w.length);
const _kwCompiled = _kwAllSorted.map(({ w, cls }) => ({
  regex: new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'),
  cls
}));

function highlightKeywords(text) {
  let result = text;
  const replacements = [];

  for (const { regex, cls } of _kwCompiled) {
    regex.lastIndex = 0;
    result = result.replace(regex, match => {
      const id = `__KW${replacements.length}__`;
      replacements.push(`<mark class="${cls}">${match}</mark>`);
      return id;
    });
  }
  replacements.forEach((html, i) => { result = result.replace(`__KW${i}__`, html); });
  return result;
}

// ── MATCHING GAME ─────────────────────────
const matchSets = {
  ch1: [
    { term:"Marketing",             def:"Managing profitable customer relationships" },
    { term:"Need",                  def:"A state of felt deprivation" },
    { term:"Want",                  def:"A need shaped by culture and personality" },
    { term:"Demand",                def:"A want backed by buying power" },
    { term:"Market Offering",       def:"A combination of products, services, info, or experiences" },
    { term:"Customer Value",        def:"Customer's evaluation of benefits minus costs vs competitors" },
    { term:"Customer Satisfaction", def:"Extent to which performance matches buyer's expectations" },
    { term:"True Friends",          def:"High profitability + long-term loyalty customers" },
    { term:"Barnacles",             def:"Highly loyal but low-profitability customers" },
    { term:"Customer Equity",       def:"Total combined lifetime values of all customers" },
    { term:"Societal Marketing",    def:"Balancing consumer wants, company profits, and society's interests" },
    { term:"Marketing Myopia",      def:"Focusing only on existing wants, ignoring underlying needs" },
  ],
  ch2: [
    { term:"Strategic Planning",    def:"Developing a game plan for long-run survival and growth" },
    { term:"Mission Statement",     def:"A statement of the organization's purpose — market oriented, long-term" },
    { term:"SBU",                   def:"A unit of a company with its own mission and that can be planned separately" },
    { term:"Stars",                 def:"BCG: High growth, high market share — need heavy investment" },
    { term:"Cash Cows",             def:"BCG: Low growth, high market share — generate cash" },
    { term:"Question Marks",        def:"BCG: High growth, low market share — require decision" },
    { term:"Dogs",                  def:"BCG: Low growth, low market share — consider phasing out" },
    { term:"Market Penetration",    def:"More sales to current customers without changing products" },
    { term:"Market Development",    def:"New markets for current products" },
    { term:"Diversification",       def:"New products for new markets" },
    { term:"Marketing Control",     def:"Measuring results and taking corrective action" },
    { term:"Marketing ROI",         def:"Net return from marketing investment divided by its costs" },
  ],
  ch3: [
    { term:"Microenvironment",      def:"Forces close to the company: suppliers, intermediaries, customers, competitors, publics" },
    { term:"Macroenvironment",      def:"Larger societal forces: demographic, economic, natural, tech, political, cultural" },
    { term:"Suppliers",             def:"Provide the resources needed to produce goods and services" },
    { term:"Resellers",             def:"Intermediaries that help the company find customers or make sales" },
    { term:"Demographic Env.",      def:"Studies population size, density, location, age, gender, occupation" },
    { term:"Economic Env.",         def:"Factors affecting consumer purchasing power and spending patterns" },
    { term:"Baby Boomers",          def:"Born 1946–1964; wealthiest generation; increasingly tech-savvy" },
    { term:"Natural Env.",          def:"Natural resources, raw materials, and energy needed by marketers" },
    { term:"Cultural Values",       def:"Expressed in how people view themselves, others, society, nature, universe" },
    { term:"Core Beliefs",          def:"Persistent values passed on from parents — difficult to change" },
    { term:"Local Publics",         def:"Include neighborhood and community organizations" },
    { term:"Cause-Related Mktg",    def:"A form of corporate giving linked to a social cause" },
  ],
  ch5: [
    { term:"Culture",               def:"Most basic cause of a person's wants and behavior — learned from family and institutions" },
    { term:"Subculture",            def:"Groups with shared value systems based on common experiences" },
    { term:"Reference Groups",      def:"Groups that have a direct or indirect influence on a person's attitudes" },
    { term:"Perception",            def:"The process of selecting, organizing, and interpreting information" },
    { term:"Learning",              def:"Changes in behavior arising from experience" },
    { term:"Cognitive Dissonance",  def:"Buyer discomfort caused by post-purchase conflict" },
    { term:"Complex Buying",        def:"High involvement + significant brand differences" },
    { term:"Habitual Buying",       def:"Low involvement + few significant brand differences" },
    { term:"Need Recognition",      def:"First stage of buyer decision process — detecting a problem or need" },
    { term:"Adoption Process",      def:"Awareness → Interest → Evaluation → Trial → Adoption" },
    { term:"Innovators",            def:"First 2.5% to adopt — adventurous, risk-tolerant" },
    { term:"Laggards",              def:"Last 16% to adopt — tradition-bound, suspicious of change" },
  ],
};

let matchState = {
  ch: 'ch1',
  pairs: [],
  selectedTerm: null,
  selectedDef: null,
  matched: [],
  wrong: [],
  score: 0,
  total: 0,
};

function startMatch(ch) {
  matchState.ch = ch;
  const allPairs = matchSets[ch];
  // Pick 8 random pairs
  const picked = [...allPairs].sort(() => Math.random() - 0.5).slice(0, 8);
  matchState.pairs = picked;
  matchState.matched = [];
  matchState.wrong = [];
  matchState.selectedTerm = null;
  matchState.selectedDef = null;
  matchState.score = 0;
  matchState.total = picked.length;

  document.querySelector('.match-setup').style.display = 'none';
  document.querySelector('.match-run').style.display = 'block';
  document.querySelector('.match-results').style.display = 'none';
  renderMatchGame();
}

function renderMatchGame() {
  const { pairs, matched } = matchState;
  const remaining = pairs.filter((_, i) => !matched.includes(i));
  const pct = Math.round(matched.length / pairs.length * 100);
  document.querySelector('.match-progress-fill').style.width = pct + '%';
  document.querySelector('.match-score-live').textContent = matched.length + ' / ' + pairs.length;

  // Shuffle terms and defs independently
  const termIdxs = remaining.map((_, i) => pairs.indexOf(remaining[i])).sort(() => Math.random() - 0.5);
  const defIdxs  = [...termIdxs].sort(() => Math.random() - 0.5);

  const termsEl = document.querySelector('.match-terms');
  const defsEl  = document.querySelector('.match-defs');

  termsEl.innerHTML = termIdxs.map(i =>
    `<button class="match-btn match-term-btn" data-idx="${i}" onclick="selectMatchTerm(${i}, this)">${pairs[i].term}</button>`
  ).join('');

  defsEl.innerHTML = defIdxs.map(i =>
    `<button class="match-btn match-def-btn" data-idx="${i}" onclick="selectMatchDef(${i}, this)">${pairs[i].def}</button>`
  ).join('');
}

function selectMatchTerm(idx, el) {
  // Deselect previous
  document.querySelectorAll('.match-term-btn').forEach(b => b.classList.remove('match-selected'));
  matchState.selectedTerm = idx;
  el.classList.add('match-selected');
  tryMatch();
}

function selectMatchDef(idx, el) {
  document.querySelectorAll('.match-def-btn').forEach(b => b.classList.remove('match-selected'));
  matchState.selectedDef = idx;
  el.classList.add('match-selected');
  tryMatch();
}

function tryMatch() {
  const { selectedTerm, selectedDef } = matchState;
  if (selectedTerm === null || selectedDef === null) return;

  const correct = selectedTerm === selectedDef;

  // Find the buttons
  const termBtn = document.querySelector(`.match-term-btn[data-idx="${selectedTerm}"]`);
  const defBtn  = document.querySelector(`.match-def-btn[data-idx="${selectedDef}"]`);

  if (correct) {
    termBtn?.classList.add('match-correct');
    defBtn?.classList.add('match-correct');
    matchState.matched.push(selectedTerm);
    matchState.score++;
    // Award XP
    if (typeof awardXP === 'function') awardXP(15, 1);
    setTimeout(() => {
      matchState.selectedTerm = null;
      matchState.selectedDef  = null;
      if (matchState.matched.length === matchState.total) {
        showMatchResults();
      } else {
        renderMatchGame();
      }
    }, 600);
  } else {
    termBtn?.classList.add('match-wrong');
    defBtn?.classList.add('match-wrong');
    setTimeout(() => {
      termBtn?.classList.remove('match-wrong', 'match-selected');
      defBtn?.classList.remove('match-wrong', 'match-selected');
      matchState.selectedTerm = null;
      matchState.selectedDef  = null;
    }, 700);
  }
}

function showMatchResults() {
  document.querySelector('.match-run').style.display = 'none';
  document.querySelector('.match-results').style.display = 'block';
  const pct = Math.round(matchState.score / matchState.total * 100);
  document.querySelector('.match-res-score').textContent = matchState.score + '/' + matchState.total;
  document.querySelector('.match-res-pct').textContent = pct + '%';
  document.querySelector('.match-res-msg').textContent = pct === 100 ? '🎉 مثالي! أتقنت كل الربط!' : pct >= 70 ? '✅ ممتاز! كمّل التدريب.' : '📚 راجع المصطلحات وحاول مرة ثانية.';
  if (typeof updateGameHUD === 'function') updateGameHUD();
}

function resetMatch() {
  document.querySelector('.match-setup').style.display = 'block';
  document.querySelector('.match-run').style.display = 'none';
  document.querySelector('.match-results').style.display = 'none';
}

// ── NOTES ─────────────────────────────────
function saveNote(ch) {
  const val = document.getElementById('note-' + ch)?.value || '';
  localStorage.setItem('mkt201_note_' + ch, val);
}
function loadNotes() {
  ['ch1','ch2','ch3','ch5'].forEach(ch => {
    const el = document.getElementById('note-' + ch);
    if (el) el.value = localStorage.getItem('mkt201_note_' + ch) || '';
  });
}
function clearNote(ch) {
  if (!confirm('حذف ملاحظات هذا الفصل؟')) return;
  localStorage.removeItem('mkt201_note_' + ch);
  const el = document.getElementById('note-' + ch);
  if (el) el.value = '';
}

// ── LO ACCORDION ──────────────────────────
function toggleLO(el) {
  const section = el.closest('.lo-section');
  section.classList.toggle('open');
}
// Open first LO of each chapter by default on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page[id^="page-ch"] .lo-section:first-of-type').forEach(s => s.classList.add('open'));
});

function toggleSidebar() {
  const sb  = document.getElementById('sidebar');
  const ov  = document.getElementById('sidebar-overlay');
  if (!sb) return;
  if (window.innerWidth > 768) {
    document.body.classList.toggle('sidebar-collapsed');
  } else {
    const open = sb.classList.toggle('open');
    if (ov) ov.classList.toggle('visible', open);
  }
}

// ── CHAPTER QUIZ (BUS214 style) ───────────────
function handleChQ(btn, isCorrect) {
  const item = btn.closest('.chq-item');
  if (item.dataset.answered) return;
  item.dataset.answered = '1';
  if (isCorrect) item.dataset.correct = '1';
  item.querySelectorAll('.chq-btn').forEach(b => {
    b.disabled = true;
    if (b === btn) b.classList.add(isCorrect ? 'chq-correct' : 'chq-wrong');
  });
  if (!isCorrect) {
    item.querySelectorAll('.chq-btn').forEach(b => {
      if (b.getAttribute('onclick') && b.getAttribute('onclick').includes('true')) b.classList.add('chq-correct');
    });
  }
  const block    = item.closest('.ch-quiz-block');
  const items    = block.querySelectorAll('.chq-item');
  const answered = block.querySelectorAll('.chq-item[data-answered]');
  if (answered.length === items.length) {
    const correct = block.querySelectorAll('.chq-item[data-correct]').length;
    const scoreEl = block.querySelector('.chq-score');
    const pct     = Math.round(correct / items.length * 100);
    scoreEl.textContent = 'Score: ' + correct + '/' + items.length + ' — ' + pct + '% ' + (pct===100?'🏆':pct>=80?'🥇':pct>=60?'👍':'📚');
    scoreEl.style.display = 'block';
  }
}

// ── THEME SYSTEM ──────────────────────────────
function initTheme() {
  // فقط طبّق الثيم المحفوظ — منتقي الثيم يظهر بعد تسجيل الدخول
  const saved = localStorage.getItem('mkt201_theme');
  if (saved) applyTheme(saved, false);
}

function showThemePickerIfNeeded() {
  // يُستدعى بعد إغلاق auth — يظهر الـ picker إذا لم يختر المستخدم ثيماً بعد
  if (!localStorage.getItem('mkt201_theme')) {
    const picker = document.getElementById('theme-picker');
    if (picker) {
      picker.style.opacity   = '1';
      picker.style.transform = '';
      picker.style.pointerEvents = '';
      picker.style.display   = 'flex';
    }
  }
}

function applyTheme(theme, save) {
  if (save === undefined) save = true;
  document.body.classList.remove('theme-teal', 'theme-rose');
  if (theme === 'rose') document.body.classList.add('theme-rose');
  if (save) localStorage.setItem('mkt201_theme', theme);
  // حدّث زر الثيم في السايدبار
  const btn = document.getElementById('theme-switch-btn');
  if (btn) btn.innerHTML = theme === 'rose'
    ? '<span class="theme-dot" style="background:#14b8a6;box-shadow:0 0 8px rgba(20,184,166,0.9)"></span>'
    : '<span class="theme-dot" style="background:#e11d48;box-shadow:0 0 8px rgba(225,29,72,0.9)"></span>';
}

function pickTheme(theme) {
  applyTheme(theme);
  const picker = document.getElementById('theme-picker');
  if (picker) {
    picker.style.opacity       = '0';
    picker.style.pointerEvents = 'none';
    picker.style.transform     = 'scale(0.97)';
    setTimeout(() => {
      picker.style.display = 'none';
      initOnboarding();
    }, 420);
  }
}

function openThemePicker() {
  const picker = document.getElementById('theme-picker');
  if (picker) {
    picker.style.opacity       = '1';
    picker.style.pointerEvents = '';
    picker.style.transform     = '';
    picker.style.display       = 'flex';
  }
}

// ── DARK MODE ─────────────────────────────────
function toggleDark() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('mkt201_dark', isDark ? '1' : '0');
  document.querySelectorAll('.dark-toggle').forEach(btn => {
    btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
  // icon handled by CSS (.icon-moon / .icon-sun)
}

// ── ARABIC TOGGLE ─────────────────────────────
function toggleArabic() {
  arabicVisible = !arabicVisible;
  document.body.classList.toggle('arabic-hidden', !arabicVisible);
  localStorage.setItem('mkt201_arabic', arabicVisible ? '1' : '0');
  updateArFab();
}

function updateArFab() {
  const arBtn = document.getElementById('ar-btn-float');
  if (!arBtn) return;
  arBtn.classList.toggle('ar-off', !arabicVisible);
  // Bounce feedback on click
  arBtn.classList.remove('fab-bounce');
  void arBtn.offsetWidth; // force reflow
  arBtn.classList.add('fab-bounce');
  arBtn.addEventListener('animationend', () => arBtn.classList.remove('fab-bounce'), { once: true });
}

// ══════════════════════════════════════════════
//  SEARCH
// ══════════════════════════════════════════════
const searchIndex = [];

function buildSearchIndex() {
  allQuestions.forEach((q, i) => {
    const fullText = [q.q, ...(q.opts||[]), q.exp||''].join(' ');
    searchIndex.push({ type: 'quiz', ch: q.ch, text: q.q, fullText, idx: i });
  });
  flashCards.forEach((c, i) => {
    const fullText = c.front + ' — ' + c.back + ' ' + (c.exp||'');
    searchIndex.push({ type: 'flash', ch: c.ch, text: c.front + ' — ' + c.back, fullText, idx: i });
  });
}

function startSingleQuestion(idx) {
  const q = allQuestions[idx];
  if (!q) return;
  showPage('page-quiz');
  setTimeout(() => {
    quizState = { questions: [q], originals: [{ q, i: idx }], current: 0, answers: {}, ch: q.ch, mode: 'single', startTime: Date.now() };
    renderQuizQuestion();
  }, 80);
}
function jumpToFlashCard(idx) {
  const fc = document.getElementById('flashcard-container');
  if (!fc) return;
  showPage('page-flash');
}

function openSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) { overlay.style.display = 'flex'; setTimeout(()=>document.getElementById('search-input').focus(),50); }
}
function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) overlay.style.display = 'none';
}
function runSearch(val) {
  const res = document.getElementById('search-results');
  if (!res) return;
  if (!val || val.length < 2) {
    res.innerHTML = '<p style="color:var(--muted);font-size:.85rem;text-align:center;margin:0;">اكتب للبحث في المحتوى</p>';
    return;
  }
  const q = val.toLowerCase();
  const hits = searchIndex.filter(item => (item.fullText||item.text).toLowerCase().includes(q)).slice(0, 12);
  if (!hits.length) { res.innerHTML = '<p style="color:var(--muted);font-size:.85rem;text-align:center;margin:0;">لا توجد نتائج</p>'; return; }
  res.innerHTML = hits.map(h => {
    const action = h.type === 'quiz'
      ? `closeSearch();startSingleQuestion(${h.idx})`
      : `closeSearch();showPage('page-${h.ch}');setTimeout(()=>jumpToFlashCard(${h.idx}),200)`;
    return `<div class="search-result-item" onclick="${action}">
      <strong>${h.ch.toUpperCase()}</strong> · ${h.type === 'quiz' ? '❓ سؤال' : '🃏 فلاش كارد'}
      <div style="font-size:.88rem;color:var(--ink);margin-top:2px;">${h.text.substring(0,120)}...</div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════
//  MASTERY TRACKING
// ══════════════════════════════════════════════
const MASTERY_KEY = 'mkt201_mastery';

function getMastery() {
  try { return JSON.parse(localStorage.getItem(MASTERY_KEY)) || {}; }
  catch { return {}; }
}

function saveMastery(data) {
  localStorage.setItem(MASTERY_KEY, JSON.stringify(data));
}

function markQuestion(qText, correct) {
  const m = getMastery();
  const key = qText.slice(0, 60);
  if (!m[key]) m[key] = { correct: 0, wrong: 0 };
  if (correct) m[key].correct++;
  else m[key].wrong++;
  saveMastery(m);
}

function getMasteryStatus(qText) {
  const m = getMastery();
  const key = qText.slice(0, 60);
  const rec = m[key];
  if (!rec) return 'unseen';
  if (rec.correct > 0 && rec.wrong === 0) return 'mastered';
  if (rec.wrong > 0) return 'review';
  return 'unseen';
}

function getChapterMasteryStats(ch) {
  const m = getMastery();
  const chQs = allQuestions.filter(q => q.ch === ch);
  let mastered = 0, review = 0, unseen = 0;
  chQs.forEach(q => {
    const s = getMasteryStatus(q.q);
    if (s === 'mastered') mastered++;
    else if (s === 'review') review++;
    else unseen++;
  });
  return { total: chQs.length, mastered, review, unseen };
}

let masteryDisplayMode = localStorage.getItem('masteryDisplay') || 'num'; // 'num' | 'pct'

function toggleMasteryDisplay() {
  masteryDisplayMode = masteryDisplayMode === 'num' ? 'pct' : 'num';
  localStorage.setItem('masteryDisplay', masteryDisplayMode);
  const btn = document.getElementById('mastery-toggle-btn');
  if (btn) btn.textContent = masteryDisplayMode === 'num' ? '%' : '#';
  renderMasteryBars();
}

function renderMasteryBars() {
  // sync toggle button label
  const btn = document.getElementById('mastery-toggle-btn');
  if (btn) btn.textContent = masteryDisplayMode === 'num' ? '%' : '#';

  ['ch1','ch2','ch3','ch5'].forEach(ch => {
    const el = document.getElementById('mastery-' + ch);
    if (!el) return;
    const s = getChapterMasteryStats(ch);
    const masteredPct = Math.round(s.mastered / s.total * 100);
    const reviewPct = Math.round(s.review / s.total * 100);
    el.querySelector('.mb-mastered').style.width = masteredPct + '%';
    el.querySelector('.mb-review').style.width = reviewPct + '%';

    if (masteryDisplayMode === 'pct') {
      el.querySelector('.mb-count').textContent = `${masteredPct}% أتقنت`;
      el.querySelector('.mb-review-count').textContent = s.review > 0 ? `· ${reviewPct}% مراجعة` : '';
    } else {
      el.querySelector('.mb-count').textContent = `${s.mastered}/${s.total} أتقنت`;
      el.querySelector('.mb-review-count').textContent = s.review > 0 ? `· ${s.review} تحتاج مراجعة` : '';
    }
  });
}

function setQuizMode(mode, btn) {
  document.getElementById('quiz-mode-select').value = mode;
  document.querySelectorAll('.quiz-mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── Smart chapter selection ──
function onChapterChange(changed) {
  const allCb   = document.querySelector('.quiz-ch-item input[value="all"]');
  const indCbs  = [...document.querySelectorAll('.quiz-ch-item input:not([value="all"])')];

  if (changed.value === 'all') {
    // اختار "All" ← ألغِ كل الفصول الفردية
    if (changed.checked) indCbs.forEach(cb => cb.checked = false);
  } else {
    // اختار فصل فردي ← ألغِ "All"
    if (allCb) allCb.checked = false;
    // إذا اختار كل الفصول الفردية ← حوّل لـ "All" تلقائياً
    const allIndChecked = indCbs.every(cb => cb.checked);
    if (allIndChecked && allCb) {
      allCb.checked = true;
      indCbs.forEach(cb => cb.checked = false);
    }
  }
  // تأكد دائماً إن في شيء مختار — إذا ما في شيء، ارجع لـ "All"
  const anyChecked = [...document.querySelectorAll('.quiz-ch-item input:checked')].length;
  if (!anyChecked && allCb) allCb.checked = true;
}

function setQuizCount(count, btn) {
  document.getElementById('quiz-count-select').value = count;
  document.querySelectorAll('.quiz-count-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ══════════════════════════════════════════════
//  QUIZ MODE
// ══════════════════════════════════════════════
let quizState = {
  questions: [], current: 0, answers: [], startTime: null, ch: 'all',
  trainingMode: false, _levelIdx: undefined
};

// Heuristic baseline when no explicit diff tag exists yet
function inferDiff(q) {
  if (q.diff) return q.diff;
  const t = (q.q || '').toLowerCase();
  const hasNot  = /\b(not|except|least likely|never|incorrect)\b/.test(t);
  const scenario = /[A-Z][a-z]+(?: Company| Inc\.?| Corp\.?| Airlines| Soups| Healthcare| Pharmaceut)/.test(q.q || '');
  if (hasNot)                 return 'hard';
  if (scenario && q.past)    return 'hard';
  if (q.past || scenario)    return 'medium';
  const directDef = /^(which term|what is|________ is defined|________ refers|________ is the)/.test(t);
  return directDef ? 'easy' : 'medium';
}

// Returns effective difficulty: mastery data overrides baseline
function getEffectiveDiff(q) {
  const baseline = inferDiff(q);
  const m = getMastery()[q.q];
  if (!m) return baseline;
  const attempts = (m.correct || 0) + (m.wrong || 0);
  if (attempts < 2) return baseline; // need ≥2 attempts before adaptive override
  const rate = m.correct / attempts;
  if (rate >= 0.8)  return 'easy';
  if (rate >= 0.45) return 'medium';
  return 'hard';
}

function setDiffFilter(diff, btn) {
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('quiz-diff-select').value = diff;
  // Hint: use full question pool (all chapters) so count is always meaningful
  const pastOnly = document.getElementById('past-only-filter')?.checked;
  let pool = pastOnly ? allQuestions.filter(q => q.past === true) : [...allQuestions];
  const count = diff === 'all' ? pool.length : pool.filter(q => getEffectiveDiff(q) === diff).length;
  const hint = document.getElementById('diff-count-hint');
  if (hint) hint.textContent = diff === 'all' ? '' : `${count} سؤال بهذا المستوى (من كل الفصول)`;
}

function startQuiz() {
  const checked = [...document.querySelectorAll('.quiz-ch-item input:checked')].map(el => el.value);
  if (!checked.length) { alert('Please select at least one chapter!'); return; }
  const pastOnly = document.getElementById('past-only-filter')?.checked;
  const diffFilter = document.getElementById('quiz-diff-select')?.value || 'all';
  let pool = (() => {
    const chMatch = checked.includes('all')
      ? [...allQuestions]
      : allQuestions.filter(q => checked.includes(q.ch));
    let filtered = pastOnly ? chMatch.filter(q => q.past === true) : chMatch;
    if (diffFilter !== 'all') filtered = filtered.filter(q => getEffectiveDiff(q) === diffFilter);
    return filtered.length > 0 ? filtered : (pastOnly ? chMatch.filter(q => q.past === true) : chMatch);
  })();

  // Smart mode: sort by priority (review first, then unseen, then mastered)
  const quizMode = document.getElementById('quiz-mode-select')?.value;
  if (quizMode === 'smart') {
    pool.sort((a, b) => {
      const order = { review: 0, unseen: 1, mastered: 2 };
      return order[getMasteryStatus(a.q)] - order[getMasteryStatus(b.q)];
    });
  }

  // Review mode: only questions previously answered wrong
  if (quizMode === 'review') {
    const reviewPool = pool.filter(q => getMasteryStatus(q.q) === 'review');
    pool = reviewPool.length > 0 ? reviewPool : pool;
  }

  const qCount = parseInt(document.getElementById('quiz-count-select')?.value) || 20;
  const finalPool = quizMode === 'smart' ? pool : shuffle(pool);
  const seenQKeys = new Set();
  const dedupedPool = finalPool.filter(q => {
    const key = q.q.slice(0, 80);
    if (seenQKeys.has(key)) return false;
    seenQKeys.add(key);
    return true;
  });
  quizState.questions    = qCount === 9999 ? dedupedPool : dedupedPool.slice(0, Math.min(qCount, dedupedPool.length));
  quizState.current      = 0;
  quizState.answers      = new Array(quizState.questions.length).fill(null);
  quizState.startTime    = Date.now();
  quizState.ch           = checked.length === 1 ? checked[0] : 'all';
  quizState.trainingMode = (quizMode === 'train');
  document.querySelector('.quiz-setup').classList.remove('active');
  document.querySelector('.quiz-run').classList.add('active');
  document.querySelector('.quiz-result').classList.remove('active');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const qs = quizState.questions;
  const ci = quizState.current;
  const q  = qs[ci];
  const originalCount = qs.filter(q => !q._retry).length;
  const retryCount    = qs.filter(q =>  q._retry).length;
  // ── Segmented progress bar: green=correct, red=wrong, gray=remaining ──
  const totalQ = qs.length;
  let greenPct = 0, redPct = 0;
  for (let k = 0; k < ci; k++) {
    if (quizState.answers[k] === qs[k].ans) greenPct++; else redPct++;
  }
  const barEl = document.querySelector('.quiz-progress-fill');
  if (barEl) {
    const g = Math.round((greenPct / totalQ) * 100);
    const r = Math.round((redPct   / totalQ) * 100);
    barEl.style.width      = '100%';
    barEl.style.background = `linear-gradient(to right, #16a34a ${g}%, #dc2626 ${g}% ${g+r}%, var(--line) ${g+r}%)`;
    barEl.style.transition = 'background 0.4s ease';
  }
  // وضع تدريب: اخفي العدد الكلي — يخفف الضغط النفسي
  const counterEl = document.querySelector('.quiz-counter');
  if (counterEl) {
    if (quizState.trainingMode) {
      counterEl.textContent = `سؤال ${ci + 1}`;
    } else {
      counterEl.textContent = retryCount > 0
        ? `${ci + 1} / ${qs.length} (${retryCount} 🔁)`
        : `${ci + 1} / ${originalCount}`;
    }
  }
  window._currentReportQ = q.q;
  const qTextEl = document.querySelector('.quiz-q-text');
  if (qTextEl) {
    const pastBadge = q.past ? `<span class="past-exam-badge">🔥 من الامتحانات السابقة</span>` : '';
    qTextEl.innerHTML =
      pastBadge +
      highlightKeywords(q.q) +
      `<button class="report-q-btn" onclick="reportQuestion(window._currentReportQ,'Quiz')">🚩 إبلاغ</button>`;
  }
  const optWrap = document.querySelector('.quiz-options');
  if (optWrap) optWrap.innerHTML = q.opts.map((opt, i) =>
    `<button class="quiz-opt-btn" onclick="selectQuizAnswer(${i})">${String.fromCharCode(65+i)}. ${opt}</button>`
  ).join('');
  const prevBtn = document.getElementById('quiz-prev-btn');
  if (prevBtn) prevBtn.style.display = ci === 0 ? 'none' : '';
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) nextBtn.textContent = ci === qs.length - 1 ? 'Finish Quiz' : 'Next →';
  // Reset explanation panel
  const expEl = document.getElementById('quiz-explanation');
  if (expEl) expEl.style.display = 'none';
  if (quizState.answers[ci] !== null) {
    highlightAnswer(quizState.answers[ci], q.ans);
    showExplanation(q, quizState.answers[ci]);
  }
  const dot = document.getElementById('quiz-mastery-dot');
  if (dot) {
    dot.style.color = '';
    if (q._retry) {
      dot.textContent = '🔁 غلطت فيها — حاول مرة ثانية!';
      dot.style.color = '#f59e0b';
    } else {
      const status = getMasteryStatus(q.q);
      dot.textContent = status === 'mastered' ? '✅ سبق وأتقنتها' : status === 'review' ? '🔴 غلطت فيها من قبل' : '';
    }
  }
}

function selectQuizAnswer(idx) {
  const q = quizState.questions[quizState.current];
  if (quizState.answers[quizState.current] !== null) return;
  quizState.answers[quizState.current] = idx;
  const isCorrect = idx === q.ans;
  markQuestion(q.q, isCorrect);
  const combo = updateCombo(isCorrect);
  const multiplier = getComboMultiplier(combo);
  if (isCorrect) awardXP(10, multiplier);
  showQuizEncouragement(isCorrect);

  // Show combo indicator in quiz
  const comboEl = document.getElementById('quiz-combo');
  if (comboEl) {
    if (combo >= 3) { comboEl.textContent = `⚡ ${combo} متتالية! (x${multiplier} XP)`; comboEl.style.display = 'block'; }
    else comboEl.style.display = 'none';
  }
  highlightAnswer(idx, q.ans);
  showExplanation(q, idx);

  // إذا غلط — أعد السؤال لاحقاً في نفس الجلسة
  if (!isCorrect && !q._retry) {
    const retryQ = { ...q, _retry: true };
    const insertAt = Math.min(
      quizState.current + 3 + Math.floor(Math.random() * 3),
      quizState.questions.length
    );
    quizState.questions.splice(insertAt, 0, retryQ);
    quizState.answers.splice(insertAt, 0, null);
    // أظهر تنبيه
    const dot = document.getElementById('quiz-mastery-dot');
    if (dot) { dot.textContent = '🔁 سيعود هذا السؤال لاحقاً'; dot.style.color = '#f59e0b'; }
  }
}

function highlightAnswer(chosen, correct) {
  const btns = document.querySelectorAll('.quiz-run .quiz-opt-btn');
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    else if (i === chosen && chosen !== correct) btn.classList.add('wrong');
  });
}

function showExplanation(q, chosen) {
  const expEl  = document.getElementById('quiz-explanation');
  const inner  = document.getElementById('quiz-exp-inner');
  if (!expEl || !inner) return;
  const letters = ['A','B','C','D','E'];
  const isCorrect = chosen === q.ans;
  let html = '';

  // ── Correct answer row ──────────────────────────────────────────
  const correctText = q.opts[q.ans];
  const expNote = q.exp ? ` — <span style="color:var(--fg);opacity:.9">${q.exp}</span>` : '';
  html += `<div class="exp-correct-row">
    <span class="exp-concept-tag">✅ صح</span>
    <strong>${letters[q.ans]}. ${correctText}</strong>${expNote}
  </div>`;

  // ── Wrong options (only show the chosen wrong one + all others compactly) ──
  q.opts.forEach((opt, i) => {
    if (i === q.ans) return; // skip correct
    const isChosen = (i === chosen && !isCorrect);
    const why = q.expW && q.expW[i] ? ` <span class="exp-why">— ${q.expW[i]}</span>` : '';
    html += `<div class="exp-wrong-row" ${isChosen ? 'style="background:rgba(239,68,68,.14);border-left-color:#ef4444;"' : ''}>
      <span style="color:#ef4444;font-weight:700;">✗</span> ${letters[i]}. ${opt}${why}
    </div>`;
  });

  inner.innerHTML = html;
  expEl.style.display = 'block';
}

function quizNext() {
  if (quizState.current < quizState.questions.length - 1) {
    quizState.current++;
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
}

function quizPrev() {
  if (quizState.current > 0) { quizState.current--; renderQuizQuestion(); }
}

function finishQuiz() {
  const qs      = quizState.questions;
  const elapsed = Math.round((Date.now() - quizState.startTime) / 1000);
  // Score only original questions (exclude _retry duplicates)
  const originals = qs.map((q, i) => ({ q, i })).filter(({ q }) => !q._retry);
  let correct = 0;
  originals.forEach(({ q, i }) => { if (quizState.answers[i] === q.ans) correct++; });
  const wrong   = originals.length - correct;
  if (wrong === 0) {
    const d = getGameData();
    d.perfectQuiz = true;
    saveGameData(d);
    checkBadges(d);
  }
  const score   = Math.round((correct / originals.length) * 100);

  // ── Check personal best BEFORE saving ──
  const prevBest = bestScores[quizState.ch] || 0;
  const isNewBest = score > prevBest;

  document.querySelector('.quiz-run').classList.remove('active');
  document.querySelector('.quiz-result').classList.add('active');
  document.getElementById('result-pct').textContent    = score + '%';
  document.getElementById('result-correct').textContent = correct;
  document.getElementById('result-wrong').textContent   = wrong;
  document.getElementById('result-time').textContent    = formatTime(elapsed);

  // ── Dynamic color for result circle based on score ──
  const circleEl = document.querySelector('.quiz-result .result-circle');
  if (circleEl) {
    const col = score >= 85 ? '#16a34a' : score >= 70 ? '#d97706' : score >= 55 ? '#ea580c' : '#dc2626';
    const shadow = score >= 85 ? 'rgba(22,163,74,0.3)' : score >= 70 ? 'rgba(217,119,6,0.3)' : score >= 55 ? 'rgba(234,88,12,0.3)' : 'rgba(220,38,38,0.3)';
    circleEl.style.background = `linear-gradient(135deg, ${col}dd, ${col})`;
    circleEl.style.boxShadow  = `0 12px 32px ${shadow}`;
  }

  const score_msgs = {
    great:  ['🌟 ممتاز جداً!', '🏆 أحسنت — هذا المستوى يكفي للاختبار', '🔥 استمر على هذا!'],
    good:   ['✅ كويس!', '💪 أداء جيد — الجلسة القادمة أحسن', '👍 على الطريق الصح'],
    ok:     ['📚 مقبول — الأسئلة اللي غلطت راجعها', '🎯 استمر — الممارسة تفرق', '💡 كل جلسة تحسّن'],
    low:    ['💪 مو مشكلة، هذا طبيعي في البداية', '🌱 البداية أصعب — يصير أسهل', '👊 كمّل — الفرق يجي بالتكرار'],
  };
  const bucket = score >= 85 ? 'great' : score >= 70 ? 'good' : score >= 55 ? 'ok' : 'low';
  const msg = score_msgs[bucket][Math.floor(Math.random() * 3)];
  document.getElementById('result-msg').textContent = isNewBest && prevBest > 0
    ? `🏆 أفضل نتيجة شخصية جديدة! (كانت ${prevBest}%)`
    : msg;

  // ── Chapter breakdown ──
  const chNames = { ch1:'الفصل 1', ch2:'الفصل 2', ch3:'الفصل 3', ch5:'الفصل 5' };
  const chBreak = {};
  originals.forEach(({ q, i }) => {
    const ch = q.ch || 'other';
    if (!chBreak[ch]) chBreak[ch] = { c: 0, w: 0 };
    if (quizState.answers[i] === q.ans) chBreak[ch].c++; else chBreak[ch].w++;
  });
  const hasMultiCh = Object.keys(chBreak).length > 1;
  let breakdownEl = document.getElementById('result-ch-breakdown');
  if (!breakdownEl) {
    breakdownEl = document.createElement('div');
    breakdownEl.id = 'result-ch-breakdown';
    breakdownEl.style.cssText = 'margin:12px 0;display:flex;gap:8px;flex-wrap:wrap;justify-content:center;';
    const progressNote = document.getElementById('result-progress-note');
    progressNote && progressNote.parentNode.insertBefore(breakdownEl, progressNote);
  }
  if (hasMultiCh) {
    breakdownEl.style.display = 'flex';
    breakdownEl.innerHTML = Object.entries(chBreak).sort().map(([ch, v]) =>
      `<span style="background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:5px 12px;font-size:.8rem;font-weight:700;">
        ${chNames[ch]||ch}: <span style="color:#16a34a">✓${v.c}</span> <span style="color:#dc2626">✗${v.w}</span>
      </span>`
    ).join('');
  } else {
    breakdownEl.style.display = 'none';
  }

  // ── Show session progress on result ──
  const nonRetry = quizState.questions.filter(q => !q._retry).length;
  recordDailySession(nonRetry);
  const dd = getDailyData();
  const progressNote = document.getElementById('result-progress-note');
  if (progressNote) {
    progressNote.textContent = `جلسة ${dd.sessions} اليوم · ${dd.qs} سؤال أجبت عليه 📈`;
  }
  saveQuizResult(quizState.ch, score, correct, wrong, elapsed);
  renderMasteryBars();
  updateResultLevelPanel(quizState._levelIdx);
}

// ══════════════════════════════════════════════
//  FEEDBACK
// ══════════════════════════════════════════════
function toggleFeedbackPanel() {
  const p = document.getElementById('feedback-panel');
  if (p) p.style.display = p.style.display === 'none' ? 'block' : 'none';
}

function reportQuestion(qText, section) {
  const msg = `مرحبا، لدي ملاحظة على سؤال في ${section}:\n\n"${qText}"\n\nالملاحظة: `;
  const wa = `https://wa.me/966594555022?text=${encodeURIComponent(msg)}`;
  window.open(wa, '_blank');
}

function resetQuiz() {
  quizState._levelIdx = undefined;
  document.querySelector('.quiz-setup').classList.add('active');
  document.querySelector('.quiz-run').classList.remove('active');
  document.querySelector('.quiz-result').classList.remove('active');
  const rl = document.getElementById('quiz-review-list');
  if (rl) { rl.style.display = 'none'; rl.innerHTML = ''; }
  const rb = document.getElementById('quiz-review-btn');
  if (rb) rb.textContent = '📋 مراجعة الإجابات';
}

// ══════════════════════════════════════════════
//  CONTENT LEVEL SYSTEM
// ══════════════════════════════════════════════
const CONTENT_LEVELS = [
  { id:0, name:'الأساسيات', icon:'🌱', diff:'easy',   desc:'تعريفات المصطلحات والمفاهيم الأساسية', color:'#16a34a', colorSoft:'rgba(22,163,74,0.12)'   },
  { id:1, name:'التطبيق',   icon:'⚙️', diff:'medium', desc:'فهم المفاهيم وتطبيقها في سياقات مختلفة', color:'#d97706', colorSoft:'rgba(217,119,6,0.12)'   },
  { id:2, name:'التحدي',    icon:'🔥', diff:'hard',   desc:'أسئلة NOT / EXCEPT والسيناريوهات المعقدة', color:'#dc2626', colorSoft:'rgba(220,38,38,0.12)'  },
];
const LVL_SESSION_SIZE  = 20;
const LVL_UNLOCK_PCT    = 0.40; // 40% of pool answered correctly → unlock next level
const LVL_COMPLETE_PCT  = 0.80; // 80% → level complete

// Returns questions for a given content level
function getLevelPool(idx) {
  return allQuestions.filter(q => q.diff === CONTENT_LEVELS[idx].diff);
}

// Returns progress stats for a level (no raw counts exposed to UI)
function getLevelStats(idx) {
  const pool    = getLevelPool(idx);
  const mastery = getMastery();
  let correct = 0, seen = 0;
  pool.forEach(q => {
    const m = mastery[q.q.slice(0, 60)];
    if (!m) return;
    const attempts = (m.correct || 0) + (m.wrong || 0);
    if (attempts > 0) seen++;
    if ((m.correct || 0) > 0) correct++;
  });
  const unlockTarget  = Math.ceil(pool.length * LVL_UNLOCK_PCT);
  const completeTarget= Math.ceil(pool.length * LVL_COMPLETE_PCT);
  const pct           = pool.length > 0 ? Math.round((correct / completeTarget) * 100) : 0;
  const sessionsCompleted = Math.ceil(seen / LVL_SESSION_SIZE);
  // Estimate sessions remaining to unlock (assumes ~65% accuracy)
  const sessionsToUnlock = correct >= unlockTarget ? 0
    : Math.ceil((unlockTarget - correct) / (LVL_SESSION_SIZE * 0.65));
  return { total: pool.length, seen, correct, pct: Math.min(pct, 100),
           sessionsCompleted, sessionsToUnlock, unlockTarget, completeTarget };
}

function isLevelUnlocked(idx) {
  if (idx === 0) return true;
  return getLevelStats(idx - 1).correct >= getLevelStats(idx - 1).unlockTarget;
}

function isLevelComplete(idx) {
  const s = getLevelStats(idx);
  return s.correct >= s.completeTarget;
}

// ─── 1. MOTIVATING PROGRESS MESSAGE ─────────────────────
// Session-focused, proximity-first ("only 2 sessions away")
function getLevelProgressMsg(stats, complete, idx) {
  if (complete) return '✅ أتقنت هذا المستوى!';
  if (stats.sessionsCompleted === 0) return 'ابدأ أول جلسة الآن 🚀';
  // Proximity framing — "only X sessions away"
  const n = stats.sessionsToUnlock;
  if (n > 0) {
    if (n === 1) return 'أنت على بُعد جلسة واحدة فقط من المستوى التالي 🔥';
    if (n <= 3)  return `أنت على بُعد ${n} جلسات فقط من المستوى التالي 💪`;
  }
  if (stats.pct >= 80) return 'قريب جداً من الإكمال! جلسة أو اثنتين 🏆';
  if (stats.pct >= 50) return 'تقدم رائع — استمر على هذا الإيقاع! 🔥';
  if (stats.pct >= 25) return 'على الطريق الصح 👍';
  return `${stats.sessionsCompleted} ${stats.sessionsCompleted === 1 ? 'جلسة' : 'جلسات'} مكتملة — كمّل!`;
}

// ─── 2. CONFETTI ──────────────────────────────────────────
function showConfetti(durationMs = 3000) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
  document.body.appendChild(wrap);
  const colors = ['#16a34a','#0d9488','#d97706','#dc2626','#6366f1','#f59e0b','#ec4899'];
  for (let i = 0; i < 70; i++) {
    const el   = document.createElement('div');
    const clr  = colors[i % colors.length];
    const size = 6 + Math.random() * 9;
    const left = Math.random() * 100;
    const del  = (Math.random() * 0.9).toFixed(2);
    const dur  = (1.4 + Math.random() * 1.4).toFixed(2);
    const rot  = Math.round(Math.random() * 360);
    el.style.cssText = `position:absolute;left:${left}%;top:-15px;width:${size}px;height:${(size*0.55).toFixed(1)}px;background:${clr};border-radius:2px;animation:confettiFall ${dur}s ${del}s ease-in forwards, confettiSway ${(dur*0.7).toFixed(2)}s ${del}s ease-in-out infinite alternate;transform:rotate(${rot}deg);`;
    wrap.appendChild(el);
  }
  setTimeout(() => wrap.remove(), durationMs);
}

// ─── 3. LEVEL-UNLOCK CELEBRATION ─────────────────────────
function showLevelUnlockCelebration(newLevelIdx) {
  const lvl = CONTENT_LEVELS[newLevelIdx];
  showConfetti(3200);
  // Big centered toast
  const toast = document.createElement('div');
  toast.className = 'lc-unlock-toast';
  toast.style.background = `linear-gradient(135deg, ${lvl.color}, ${lvl.color}bb)`;
  toast.innerHTML = `
    <div style="font-size:3.5rem;margin-bottom:10px;">${lvl.icon}</div>
    <div style="font-size:.75rem;font-weight:800;opacity:.85;text-transform:uppercase;letter-spacing:.12em;margin-bottom:6px;">مستوى جديد مفتوح 🔓</div>
    <div style="font-size:1.5rem;font-weight:900;">المستوى ${newLevelIdx + 1} — ${lvl.name}</div>
    <div style="font-size:.85rem;opacity:.8;margin-top:8px;">${lvl.desc}</div>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 380);
  }, 2600);
}

// ─── 4. START LEVEL SESSION ───────────────────────────────
function startLevelSession(idx) {
  const pool    = getLevelPool(idx);
  const mastery = getMastery();
  // Record snapshot of unlock state to detect newly-unlocked levels later
  window._lvlUnlockSnapshot = CONTENT_LEVELS.map((_, i) => isLevelUnlocked(i));
  // Record XP at session start to show XP gained in result panel
  window._sessionStartXP = getGameData().xp;

  // Smart bucket: unseen → wrong → correct
  const unseen = [], inProg = [], correct = [];
  pool.forEach(q => {
    const m = mastery[q.q.slice(0, 60)];
    if (!m || (m.correct || 0) + (m.wrong || 0) === 0) { unseen.push(q); return; }
    if ((m.wrong || 0) > 0) { inProg.push(q); return; }
    correct.push(q);
  });

  const pick = [
    ...shuffle([...unseen]),
    ...shuffle([...inProg]),
    ...shuffle([...correct]),
  ].slice(0, LVL_SESSION_SIZE);

  quizState.questions    = pick;
  quizState.current      = 0;
  quizState.answers      = new Array(pick.length).fill(null);
  quizState.startTime    = Date.now();
  quizState.ch           = 'all';
  quizState.trainingMode = false;
  quizState._levelIdx    = idx;

  showPage('page-quiz');
  document.querySelector('.quiz-setup').classList.remove('active');
  document.querySelector('.quiz-run').classList.add('active');
  document.querySelector('.quiz-result').classList.remove('active');
  renderQuizQuestion();
}

// ─── 5. BACK TO LEVELS (with unlock detection) ───────────
function backToLevels() {
  const idx      = quizState._levelIdx;
  const snapshot = window._lvlUnlockSnapshot || [];
  quizState._levelIdx = undefined;
  showPage('page-levels');
  renderLevels();
  // Detect newly unlocked levels and celebrate
  if (idx !== undefined) {
    const newlyUnlocked = CONTENT_LEVELS.findIndex((_, i) => isLevelUnlocked(i) && !snapshot[i]);
    if (newlyUnlocked >= 0) {
      setTimeout(() => showLevelUnlockCelebration(newlyUnlocked), 350);
    }
  }
}

// ─── 6. RESULT PANEL (XP gained + progress) ──────────────
function updateResultLevelPanel(idx) {
  const panel  = document.getElementById('result-level-panel');
  const backBtn= document.getElementById('result-back-levels');
  const newBtn = document.getElementById('result-new-session-btn');
  if (!panel) return;

  if (idx === undefined) {
    panel.style.display = 'none';
    if (backBtn) backBtn.style.display = 'none';
    if (newBtn)  { newBtn.textContent = '🔄 جلسة جديدة'; newBtn.onclick = null; }
    return;
  }

  const lvl          = CONTENT_LEVELS[idx];
  const stats        = getLevelStats(idx);
  const complete     = isLevelComplete(idx);
  const nextUnlocked = idx + 1 < CONTENT_LEVELS.length && isLevelUnlocked(idx + 1);
  const sessionXP    = Math.max(0, getGameData().xp - (window._sessionStartXP || 0));

  // Progress message
  let msg = getLevelProgressMsg(stats, complete, idx);
  if (nextUnlocked && !complete) msg = `🔓 المستوى التالي أصبح مفتوحاً!`;

  // XP chip
  const xpChip = sessionXP > 0
    ? `<div class="result-xp-chip">+${sessionXP} XP 🎯</div>`
    : '';

  const nameEl = document.getElementById('result-level-name');
  const barEl  = document.getElementById('result-level-bar');
  const msgEl  = document.getElementById('result-level-msg');
  if (nameEl) nameEl.innerHTML = `${xpChip}${lvl.icon} ${lvl.name} — التقدم`;
  if (barEl)  { barEl.style.background = lvl.color; barEl.style.width = stats.pct + '%'; }
  if (msgEl)  msgEl.textContent = msg;

  panel.style.display = 'block';
  if (backBtn) backBtn.style.display = 'inline-block';
  if (newBtn)  {
    newBtn.textContent = '🔄 جلسة أخرى';
    newBtn.onclick = () => startLevelSession(idx);
  }
}

// ─── 7. RENDER LEVELS PAGE ───────────────────────────────
function renderLevels() {
  renderLevelSummary();
  renderLevelCards();
}

function renderLevelSummary() {
  const el = document.getElementById('levels-summary');
  if (!el) return;
  const allStats     = CONTENT_LEVELS.map((_, i) => getLevelStats(i));
  const totalSessions= allStats.reduce((s, st) => s + st.sessionsCompleted, 0);
  const completeCount= CONTENT_LEVELS.filter((_, i) => isLevelComplete(i)).length;
  const streak       = getGameData().streak || 0;
  const xp           = getGameData().xp || 0;

  // Streak banner (shown above summary if streak > 0)
  const streakContainer = document.getElementById('levels-streak-container');
  if (streakContainer) {
    if (streak > 0) {
      streakContainer.innerHTML = `
        <div class="levels-streak-row">
          <span class="levels-streak-fire">🔥</span>
          <span class="levels-streak-text">${streak === 1 ? 'يوم واحد على التوالي!' : `${streak} أيام متتالية — استمر!`}</span>
          <span class="levels-streak-days">${streak} 🔥</span>
        </div>`;
    } else {
      streakContainer.innerHTML = '';
    }
  }

  el.innerHTML = `
    <div class="levels-summary-item">
      <div class="levels-summary-val">${totalSessions}</div>
      <div class="levels-summary-lbl">جلسات مكتملة</div>
    </div>
    <div class="levels-summary-item">
      <div class="levels-summary-val" style="color:#16a34a;">${completeCount}/${CONTENT_LEVELS.length}</div>
      <div class="levels-summary-lbl">مستويات مكتملة</div>
    </div>
    <div class="levels-summary-item">
      <div class="levels-summary-val" style="color:var(--accent);">${xp.toLocaleString()}</div>
      <div class="levels-summary-lbl">XP مجموع</div>
    </div>`;
}

function renderLevelCards() {
  const container = document.getElementById('levels-grid');
  if (!container) return;
  // Find the first unlocked+incomplete level to put pulse on its CTA
  const primaryIdx = CONTENT_LEVELS.findIndex((_, i) => isLevelUnlocked(i) && !isLevelComplete(i));

  container.innerHTML = CONTENT_LEVELS.map((lvl, idx) => {
    const stats    = getLevelStats(idx);
    const unlocked = isLevelUnlocked(idx);
    const complete = isLevelComplete(idx);
    const isPrimary= idx === primaryIdx;

    const stateClass  = complete ? 'lc-complete' : !unlocked ? 'lc-locked' : '';
    const statusIcon  = complete ? '✅' : !unlocked ? '🔒' : '▶️';
    const progressMsg = getLevelProgressMsg(stats, complete, idx);

    // Unlock hint — proximity framing ("only X sessions away")
    let unlockHint = '';
    if (!unlocked && idx > 0) {
      const n = getLevelStats(idx - 1).sessionsToUnlock;
      if (n <= 1) {
        unlockHint = `<div class="lc-unlock-hint">🔥 أنت على بُعد جلسة واحدة فقط من فتح <strong>${lvl.name}</strong>!</div>`;
      } else {
        unlockHint = `<div class="lc-unlock-hint">أنت على بُعد <strong>${n} جلسات فقط</strong> من فتح <strong>${lvl.name}</strong> 🚀</div>`;
      }
    }

    // CTA button
    const btnLabel    = !unlocked ? '🔒 مقفل'
      : complete       ? '🔄 مراجعة'
      : stats.sessionsCompleted === 0 ? '▶️ ابدأ الجلسة'
      : '▶️ استمر';
    const pulseClass  = isPrimary ? 'lc-pulse' : '';

    return `
      <div class="level-card ${stateClass}">
        <div class="lc-header">
          <div class="lc-icon">${lvl.icon}</div>
          <div class="lc-info">
            <div class="lc-title">المستوى ${idx + 1} — ${lvl.name}</div>
            <div class="lc-desc">${lvl.desc}</div>
          </div>
          <div class="lc-status-badge" style="background:${lvl.colorSoft};">${statusIcon}</div>
        </div>
        <div class="lc-progress-row">
          <div class="lc-progress-track">
            <div class="lc-progress-fill" style="width:${stats.pct}%;background:${complete ? '#16a34a' : lvl.color};"></div>
          </div>
        </div>
        <div class="lc-footer">
          <span class="lc-meta">${progressMsg}</span>
          <button type="button" class="lc-start-btn ${pulseClass}"
            style="background:${unlocked ? lvl.color : '#9ca3af'};color:#fff;"
            onclick="startLevelSession(${idx})"
            ${!unlocked ? 'disabled' : ''}>${btnLabel}</button>
        </div>
        ${unlockHint}
      </div>`;
  }).join('');
}

// ══════════════════════════════════════════════
//  MOCK EXAM (30 questions, 30 minutes)
// ══════════════════════════════════════════════
let mockState = {
  questions: [], current: 0, answers: [], timer: null, timeLeft: 30 * 60
};

function startMock() {
  const ch1 = shuffle(allQuestions.filter(q => q.ch === 'ch1')).slice(0, 8);
  const ch2 = shuffle(allQuestions.filter(q => q.ch === 'ch2')).slice(0, 7);
  const ch3 = shuffle(allQuestions.filter(q => q.ch === 'ch3')).slice(0, 8);
  const ch5 = shuffle(allQuestions.filter(q => q.ch === 'ch5')).slice(0, 7);
  mockState.questions = shuffle([...ch1, ...ch2, ...ch3, ...ch5]);
  mockState.current   = 0;
  mockState.answers   = new Array(mockState.questions.length).fill(null);
  mockState.timeLeft  = 30 * 60;
  document.getElementById('mock-setup').style.display    = 'none';
  document.getElementById('mock-run').style.display      = 'block';
  document.getElementById('mock-result').style.display   = 'none';
  renderMockQuestion();
  if (mockState.timer) clearInterval(mockState.timer);
  mockState.timer = setInterval(mockTick, 1000);
}

function mockTick() {
  mockState.timeLeft--;
  const el = document.getElementById('mock-timer-val');
  if (el) el.textContent = formatTime(mockState.timeLeft);
  if (mockState.timeLeft <= 0) { clearInterval(mockState.timer); finishMock(); }
}

function renderMockQuestion() {
  const qs = mockState.questions;
  const ci = mockState.current;
  const q  = qs[ci];
  const pct = Math.round((ci / qs.length) * 100);
  const fill = document.getElementById('mock-progress-fill');
  if (fill) fill.style.width = pct + '%';
  const counter = document.getElementById('mock-counter');
  if (counter) counter.textContent = `${ci + 1} / ${qs.length}`;
  const qtxt = document.getElementById('mock-q-text');
  if (qtxt) qtxt.textContent = q.q;
  const chBadge = document.getElementById('mock-ch-badge');
  if (chBadge) { chBadge.textContent = q.ch.toUpperCase(); }
  const optWrap = document.getElementById('mock-options');
  if (optWrap) optWrap.innerHTML = q.opts.map((opt, i) =>
    `<button class="quiz-opt-btn" onclick="selectMockAnswer(${i})">${String.fromCharCode(65+i)}. ${opt}</button>`
  ).join('');
  const prevBtn = document.getElementById('mock-prev-btn');
  if (prevBtn) prevBtn.style.display = ci === 0 ? 'none' : '';
  const nextBtn = document.getElementById('mock-next-btn');
  if (nextBtn) nextBtn.textContent = ci === qs.length - 1 ? 'Finish Exam' : 'Next →';
  if (mockState.answers[ci] !== null) highlightMockAnswer(mockState.answers[ci], q.ans);
}

function selectMockAnswer(idx) {
  if (mockState.answers[mockState.current] !== null) return;
  mockState.answers[mockState.current] = idx;
  const isCorrect = idx === mockState.questions[mockState.current].ans;
  showQuizEncouragement(isCorrect);
  highlightMockAnswer(idx, mockState.questions[mockState.current].ans);
}

function highlightMockAnswer(chosen, correct) {
  const btns = document.querySelectorAll('#mock-options .quiz-opt-btn');
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    else if (i === chosen && chosen !== correct) btn.classList.add('wrong');
  });
}

function mockNext() {
  if (mockState.current < mockState.questions.length - 1) {
    mockState.current++;
    renderMockQuestion();
  } else { finishMock(); }
}

function mockPrev() {
  if (mockState.current > 0) { mockState.current--; renderMockQuestion(); }
}

function finishMock() {
  if (mockState.timer) clearInterval(mockState.timer);
  const qs = mockState.questions;
  let correct = 0;
  qs.forEach((q, i) => { if (mockState.answers[i] === q.ans) correct++; });
  const wrong   = qs.length - correct;
  const score   = Math.round((correct / qs.length) * 100);
  const elapsed = 30*60 - mockState.timeLeft;
  document.getElementById('mock-run').style.display    = 'none';
  document.getElementById('mock-result').style.display = 'block';
  document.getElementById('mock-result-pct').textContent    = score + '%';
  document.getElementById('mock-result-correct').textContent = correct;
  document.getElementById('mock-result-wrong').textContent   = wrong;
  document.getElementById('mock-result-time').textContent    = formatTime(elapsed);
  const msg = score >= 90 ? '🌟 Excellent performance!' : score >= 75 ? '✅ Good work! Review your mistakes.' : score >= 60 ? '📚 Passing — focus on weak chapters.' : '💪 Keep studying — you can pass!';
  document.getElementById('mock-result-msg').textContent = msg;
  saveQuizResult('all', score, correct, wrong, elapsed);
}

function resetMock() {
  if (mockState.timer) clearInterval(mockState.timer);
  document.getElementById('mock-setup').style.display    = 'block';
  document.getElementById('mock-run').style.display      = 'none';
  document.getElementById('mock-result').style.display   = 'none';
  const rl = document.getElementById('mock-review-list');
  if (rl) { rl.style.display = 'none'; rl.innerHTML = ''; }
}

function buildReviewHTML(questions, answers) {
  let html = '<div class="review-list">';
  questions.forEach((q, i) => {
    const userAns = answers[i];
    const isCorrect = userAns === q.ans;
    const skipped = userAns === null || userAns === undefined;
    html += `<div class="review-item ${isCorrect ? 'review-correct' : 'review-wrong'}">
      <div class="review-item-header">
        <span class="review-icon">${isCorrect ? '✓' : (skipped ? '—' : '✗')}</span>
        <span class="review-qnum">Q${i + 1}</span>
        ${q.ch ? `<span class="review-ch-badge">${q.ch.toUpperCase()}</span>` : ''}
      </div>
      <div class="review-qtext">${q.q}</div>
      <div class="review-opts">`;
    q.opts.forEach((opt, j) => {
      const isRight = j === q.ans;
      const isPicked = j === userAns;
      const cls = isRight ? 'review-opt-correct' : (isPicked && !isRight ? 'review-opt-wrong' : '');
      html += `<div class="review-opt ${cls}">${String.fromCharCode(65+j)}. ${opt}${isRight ? ' ✓' : (isPicked && !isRight ? ' ✗' : '')}</div>`;
    });
    html += '</div>';
    if (q.exp) html += `<div class="review-exp">${q.exp}</div>`;
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function toggleMockReview() {
  const el = document.getElementById('mock-review-list');
  const btn = document.getElementById('mock-review-btn');
  if (!el) return;
  if (el.style.display === 'none') {
    if (!el.innerHTML) el.innerHTML = buildReviewHTML(mockState.questions, mockState.answers);
    el.style.display = 'block';
    if (btn) btn.textContent = '✕ Hide Review';
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    el.style.display = 'none';
    if (btn) btn.textContent = '📋 Review Answers';
  }
}

function toggleQuizReview() {
  const el = document.getElementById('quiz-review-list');
  const btn = document.getElementById('quiz-review-btn');
  if (!el) return;
  if (el.style.display !== 'block') {
    if (!el.innerHTML) el.innerHTML = buildReviewHTML(quizState.questions, quizState.answers);
    el.style.display = 'block';
    if (btn) btn.textContent = '✕ إخفاء المراجعة';
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    el.style.display = 'none';
    if (btn) btn.textContent = '📋 مراجعة الإجابات';
  }
}

// ══════════════════════════════════════════════
//  FLASH CARDS
// ══════════════════════════════════════════════
let flashState = { cards: [], current: 0, filter: 'all' };

function initFlashCards() {
  setFlashFilter('all');
}

function setFlashFilter(ch) {
  flashState.filter  = ch;
  flashState.current = 0;
  flashState.cards   = ch === 'all' ? shuffle([...flashCards]) : shuffle(flashCards.filter(c => c.ch === ch));
  document.querySelectorAll('.flash-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.ch === ch);
  });
  renderFlashCard();
}

function renderFlashCard() {
  const card = document.getElementById('flash-card');
  if (!card) return;
  if (!flashState.cards.length) {
    document.getElementById('flash-term').textContent = 'No cards';
    document.getElementById('flash-def').textContent  = '';
    return;
  }
  card.classList.remove('flipped');
  const c = flashState.cards[flashState.current];
  const frontCh = document.getElementById('flash-front-chapter');
  const backCh  = document.getElementById('flash-back-chapter');
  if (frontCh) frontCh.textContent = c.ch.toUpperCase();
  if (backCh)  backCh.textContent  = c.ch.toUpperCase();
  document.getElementById('flash-term').textContent = c.front;
  document.getElementById('flash-def').textContent  = c.back;
  document.getElementById('flash-counter').textContent = `${flashState.current + 1} / ${flashState.cards.length}`;
}

function flipCard() {
  const card = document.getElementById('flash-card');
  if (card) card.classList.toggle('flipped');
}

function flashNext() {
  if (flashState.current < flashState.cards.length - 1) {
    flashState.current++;
  } else {
    flashState.current = 0;
    flashState.cards = shuffle(flashState.cards);
  }
  renderFlashCard();
}

function flashPrev() {
  if (flashState.current > 0) { flashState.current--; renderFlashCard(); }
}

// ══════════════════════════════════════════════
//  CHAPTER INLINE MCQ
// ══════════════════════════════════════════════
function selectMCQ(btn, correctIdx) {
  const container = btn.closest('.mcq-question-block');
  if (!container || container.dataset.answered === '1') return;
  container.dataset.answered = '1';
  const opts   = container.querySelectorAll('.mcq-opt');
  const chosen = parseInt(btn.dataset.idx);
  const feedback = container.querySelector('.mcq-feedback');
  opts.forEach((opt, i) => {
    opt.disabled = true;
    if (i === correctIdx) opt.classList.add('correct-opt');
    else if (i === chosen) opt.classList.add('wrong-opt');
  });
  if (feedback) {
    if (chosen === correctIdx) { feedback.textContent = '✅ Correct!'; feedback.className = 'mcq-feedback correct'; }
    else { feedback.textContent = `❌ Incorrect — correct answer: ${String.fromCharCode(65+correctIdx)}`; feedback.className = 'mcq-feedback wrong'; }
  }
}

// ══════════════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════════════
function renderDashboard() {
  const best     = JSON.parse(localStorage.getItem('mkt201_bestScores') || '{}');
  const total    = parseInt(localStorage.getItem('mkt201_totalQuizzes') || '0');
  const correct   = parseInt(localStorage.getItem('mkt201_totalCorrect')  || '0');
  const answered  = parseInt(localStorage.getItem('mkt201_totalAnswered') || '0');
  const accuracy  = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  el('dash-total-quizzes', total);
  el('dash-accuracy',      accuracy + '%');
  el('dash-best-all',      best.all  !== undefined ? best.all  + '%' : '—');
  el('dash-best-ch1',      best.ch1  !== undefined ? best.ch1  + '%' : '—');
  el('dash-best-ch2',      best.ch2  !== undefined ? best.ch2  + '%' : '—');
  el('dash-best-ch3',      best.ch3  !== undefined ? best.ch3  + '%' : '—');
  el('dash-best-ch5',      best.ch5  !== undefined ? best.ch5  + '%' : '—');
  ['ch1','ch2','ch3','ch5'].forEach(ch => {
    const bar = document.getElementById('bar-' + ch);
    if (bar) bar.style.width = (best[ch] || 0) + '%';
    const lbl = document.getElementById('bar-lbl-' + ch);
    if (lbl) lbl.textContent = best[ch] !== undefined ? best[ch] + '%' : '0%';
  });
}

// ══════════════════════════════════════════════
//  COUNTDOWN (30 days placeholder)
// ══════════════════════════════════════════════
function startCountdown() {
  const examDate = new Date('2026-04-20T09:00:00'); // MKT 201 Midterm
  function update() {
    const diff = examDate - new Date();
    if (diff <= 0) { ['cd-days','cd-hours','cd-mins'].forEach(id => { const e = document.getElementById(id); if(e) e.textContent='0'; }); return; }
    const days  = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const mins  = Math.floor((diff % (1000*60*60)) / (1000*60));
    const vals  = [days, hours, mins];
    ['cd-days','cd-hours','cd-mins'].forEach((id,i) => { const e = document.getElementById(id); if(e) e.textContent = vals[i]; });
  }
  update();
  setInterval(update, 60000);
}

// ══════════════════════════════════════════════
//  QUICK REVIEW
// ══════════════════════════════════════════════
function renderQuickReview(filterCh) {
  const grid = document.getElementById('quick-terms-grid');
  if (!grid) return;
  const cards = filterCh === 'all' ? flashCards : flashCards.filter(c => c.ch === filterCh);
  grid.innerHTML = cards.map(c => `
    <div class="quick-term-card">
      <span class="quick-ch-badge">${c.ch.toUpperCase()}</span>
      <div class="quick-term-word">${c.front}</div>
      <div class="quick-term-def">${c.back}</div>
    </div>`).join('');
}

function filterQuickReview(ch) {
  document.querySelectorAll('.quick-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.ch === ch));
  renderQuickReview(ch);
}

// ══════════════════════════════════════════════
//  TERMS QUIZ ENGINE
// ══════════════════════════════════════════════
let tqState = {
  ch: 'all', mode: 'def', count: 10,
  questions: [], current: 0, correct: 0, wrong: 0,
  answered: false, startTime: null,
  missed: []   // stores {question, userAnswer, correct, type, ch}
};
let _tqTimer = null; // Bug #1/#2/#3 fix: track auto-advance timer to cancel on manual advance/quit

function tqSetCh(ch, btn) {
  tqState.ch = ch;
  document.querySelectorAll('.tq-ch-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function tqSetMode(mode, btn) {
  tqState.mode = mode;
  ['tqmode-def','tqmode-term','tqmode-mix'].forEach(id => {
    const el = document.getElementById(id); if (el) el.classList.remove('active');
  });
  btn.classList.add('active');
}

function tqSetCount(n, btn) {
  tqState.count = n;
  ['tqcount-10','tqcount-20','tqcount-all'].forEach(id => {
    const el = document.getElementById(id); if (el) el.classList.remove('active');
  });
  btn.classList.add('active');
}

function startTermsQuiz() {
  const pool = tqState.ch === 'all' ? flashCards : flashCards.filter(c => c.ch === tqState.ch);
  if (pool.length < 4) { alert('مب عندك كروت كافية لهذا الفصل!'); return; }

  const shuffled = shuffle(pool);
  const count = Math.min(tqState.count, shuffled.length);

  tqState.questions = shuffled.slice(0, count).map(card => {
    let qMode = tqState.mode === 'mix' ? (Math.random() < 0.5 ? 'def' : 'term') : tqState.mode;
    const others = shuffle(pool.filter(c => c.front !== card.front)).slice(0, 3);

    if (qMode === 'def') {
      // Show definition → pick term
      const opts = shuffle([card.front, ...others.map(c => c.front)]);
      return { question: card.back, correct: card.front, options: opts, type: 'def', ch: card.ch };
    } else {
      // Show term → pick definition (truncated)
      const trunc = s => s.length > 130 ? s.slice(0, 127) + '…' : s;
      const opts = shuffle([trunc(card.back), ...others.map(c => trunc(c.back))]);
      return { question: card.front, correct: trunc(card.back), options: opts, type: 'term', ch: card.ch };
    }
  });

  tqState.current = 0; tqState.correct = 0; tqState.wrong = 0;
  tqState.missed = [];
  tqState.startTime = Date.now();
  document.getElementById('tq-setup').style.display = 'none';
  document.getElementById('tq-run').style.display   = '';
  document.getElementById('tq-result').style.display = 'none';
  tqRenderQuestion();
}

function tqRenderQuestion() {
  const q = tqState.questions[tqState.current];
  const total = tqState.questions.length;
  document.getElementById('tq-progress-fill').style.width = ((tqState.current + 1) / total * 100) + '%';
  document.getElementById('tq-counter').textContent = (tqState.current + 1) + ' / ' + total;
  document.getElementById('tq-badge').textContent =
    q.ch.toUpperCase() + ' · ' + (q.type === 'def' ? 'ما هو هذا المصطلح؟' : 'ما هو التعريف الصحيح؟');
  document.getElementById('tq-question').textContent = q.question;
  document.getElementById('tq-explanation').style.display = 'none';
  document.getElementById('tq-next-btn').style.display = 'none';
  tqState.answered = false;

  document.getElementById('tq-options').innerHTML = q.options.map((opt, i) =>
    `<button class="quiz-opt-btn" onclick="tqAnswer(${i})" style="text-align:left;">${opt}</button>`
  ).join('');
}

function tqAnswer(idx) {
  if (tqState.answered) return;
  tqState.answered = true;
  const q = tqState.questions[tqState.current];
  const isCorrect = q.options[idx] === q.correct;

  if (isCorrect) { tqState.correct++; if (typeof addXP === 'function') addXP(5); }
  else {
    tqState.wrong++;
    tqState.missed.push({
      question: q.question,
      userAnswer: q.options[idx],
      correct: q.correct,
      type: q.type,
      ch: q.ch
    });
  }
  // Bug #5 fix: update mastery data so Terms Quiz feeds into SRS + mastery bar
  if (typeof markQuestion === 'function') markQuestion(q.question, isCorrect);
  if (typeof showQuizEncouragement === 'function') showQuizEncouragement(isCorrect);

  document.querySelectorAll('#tq-options .quiz-opt-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (q.options[i] === q.correct) btn.classList.add('correct');
    else if (i === idx && !isCorrect) btn.classList.add('wrong');
  });

  if (!isCorrect) {
    const exp = document.getElementById('tq-explanation');
    exp.style.display = '';
    exp.innerHTML = '<strong>✅ الجواب الصح:</strong><br>' + q.correct;
  }

  const isLast = tqState.current >= tqState.questions.length - 1;
  // Bug #1/#2 fix: on correct non-last answers, hide the button (auto-advance handles it).
  // Only show the button on wrong answers OR the last correct answer.
  const nextBtn = document.getElementById('tq-next-btn');
  nextBtn.style.display = (!isCorrect || isLast) ? '' : 'none';

  if (isCorrect && !isLast) {
    // Bug #1 fix: cancel any previous pending timer before setting a new one
    clearTimeout(_tqTimer);
    _tqTimer = setTimeout(() => { _tqTimer = null; tqNext(); }, 1300);
  }
}

function tqNext() {
  // Bug #1 fix: cancel pending auto-advance timer before manually advancing
  clearTimeout(_tqTimer);
  _tqTimer = null;
  tqState.current++;
  if (tqState.current >= tqState.questions.length) tqShowResult();
  else tqRenderQuestion();
}

function tqShowResult() {
  const total = tqState.questions.length;
  const pct   = Math.round(tqState.correct / total * 100);
  const secs  = Math.round((Date.now() - tqState.startTime) / 1000);

  document.getElementById('tq-run').style.display    = 'none';
  document.getElementById('tq-result').style.display = '';
  document.getElementById('tq-result-pct').textContent = pct + '%';
  document.getElementById('tq-correct').textContent  = tqState.correct;
  document.getElementById('tq-wrong').textContent    = tqState.wrong;
  document.getElementById('tq-time').textContent     = formatTime(secs);

  const msgs = [[90,'🔥 ممتاز! مصطلحاتك قوية جداً!'],[70,'👍 كويس! راجع اللي غلطت فيه'],[50,'📚 ذاكر أكثر وارجع حاول'],[0,'💪 راجع الكويك ريفيو وحاول مرة ثانية']];
  document.getElementById('tq-result-msg').textContent = msgs.find(([m]) => pct >= m)[1];

  const key = 'mkt201_tq_best_' + tqState.ch;
  if (pct > parseInt(localStorage.getItem(key) || '0')) localStorage.setItem(key, pct);
  if (typeof addXP === 'function') addXP(Math.round(pct / 10));
  // Bug #6 fix: record as a daily session so streak + home card update correctly
  if (typeof recordDailySession === 'function') recordDailySession(tqState.questions.length);

  // Render missed questions review
  const reviewEl = document.getElementById('tq-review-list');
  const reviewWrap = document.getElementById('tq-review-wrap');
  const reviewBtn  = document.getElementById('tq-review-toggle-btn');
  if (!reviewEl || !reviewWrap) return;

  if (tqState.missed.length === 0) {
    reviewWrap.style.display = 'none';
    if (reviewBtn) reviewBtn.style.display = 'none';
  } else {
    reviewWrap.style.display = '';
    if (reviewBtn) { reviewBtn.style.display = ''; reviewBtn.textContent = `📋 مراجعة الأخطاء (${tqState.missed.length})`; }
    reviewEl.innerHTML = tqState.missed.map((m, i) => `
      <div style="border:1.5px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:10px;background:var(--paper);">
        <div style="font-size:.72rem;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">
          ${m.ch.toUpperCase()} · ${m.type === 'def' ? 'ما هو هذا المصطلح؟' : 'ما هو التعريف الصحيح؟'}
        </div>
        <div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-bottom:10px;line-height:1.5;">${m.question}</div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <div style="padding:8px 12px;border-radius:8px;background:rgba(239,68,68,.12);border:1.5px solid rgba(239,68,68,.35);font-size:.85rem;color:#ef4444;">
            ❌ إجابتك: ${m.userAnswer}
          </div>
          <div style="padding:8px 12px;border-radius:8px;background:rgba(16,185,129,.12);border:1.5px solid rgba(16,185,129,.35);font-size:.85rem;color:#10b981;">
            ✅ الصح: ${m.correct}
          </div>
        </div>
      </div>
    `).join('');
  }
}

function tqToggleReview() {
  const sec = document.getElementById('tq-review-section');
  const btn = document.getElementById('tq-review-toggle-btn');
  if (!sec) return;
  const showing = sec.style.display !== 'none';
  sec.style.display = showing ? 'none' : '';
  if (btn) btn.textContent = showing
    ? `📋 مراجعة الأخطاء (${tqState.missed.length})`
    : `▲ إخفاء المراجعة`;
}

function tqRestart() {
  document.getElementById('tq-result').style.display  = 'none';
  const sec = document.getElementById('tq-review-section');
  if (sec) sec.style.display = 'none';
  document.getElementById('tq-setup').style.display   = '';
}

function tqQuit() {
  // Bug #3 fix: cancel pending auto-advance timer so it doesn't fire after quitting
  clearTimeout(_tqTimer);
  _tqTimer = null;
  document.getElementById('tq-run').style.display   = 'none';
  document.getElementById('tq-setup').style.display = '';
}

// ══════════════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════════════
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2,'0');
  const s = (sec % 60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  loadNotes();
  // Restore theme choice
  initTheme();
  // Restore dark mode
  if (localStorage.getItem('mkt201_dark') === '1') {
    document.body.classList.add('dark');
    document.querySelectorAll('.dark-toggle').forEach(b => b.textContent = '☀️ Light Mode');
    // float button icon handled by CSS
  }
  // Restore Arabic pref — default ON (visible)
  if (localStorage.getItem('mkt201_arabic') === '0') {
    arabicVisible = false;
    document.body.classList.add('arabic-hidden');
    const arBtn = document.getElementById('ar-btn-float');
    if (arBtn) arBtn.classList.add('ar-off');
  }
  buildSearchIndex();
  startCountdown();
  renderDashboard();
  renderQuickReview('all');
  renderMasteryBars();
  updateGameHUD();
  // Set Home as active nav link on first load (without re-triggering page logic)
  document.querySelectorAll('.sidebar-menu li a').forEach(a => {
    const oc = a.getAttribute('onclick') || '';
    if (oc.includes("'page-home'") || oc.includes('"page-home"')) {
      a.classList.add('active');
    }
  });

  // Keyboard navigation for flash cards
  document.addEventListener('keydown', e => {
    const flashPage = document.getElementById('page-flash');
    if (!flashPage || !flashPage.classList.contains('active')) return;
    if (e.key === 'ArrowRight') flashNext();
    else if (e.key === 'ArrowLeft') flashPrev();
    else if (e.key === ' ') { e.preventDefault(); flipCard(); }
  });

  // Keyboard shortcuts A–E / 1–5 for quiz answers
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const quizPage = document.getElementById('page-quiz');
    if (!quizPage || !quizPage.classList.contains('active')) return;
    // Only when a question is active (options are enabled)
    const opts = document.querySelectorAll('.quiz-run .quiz-opt-btn:not(:disabled)');
    if (!opts.length) return;
    let idx = -1;
    if (e.key >= 'a' && e.key <= 'e') idx = e.key.charCodeAt(0) - 97;
    else if (e.key >= 'A' && e.key <= 'E') idx = e.key.charCodeAt(0) - 65;
    else if (e.key >= '1' && e.key <= '5') idx = parseInt(e.key) - 1;
    if (idx >= 0 && idx < opts.length) {
      e.preventDefault();
      opts[idx].focus();
      opts[idx].click();
    }
  });
});


// ═══════════════════════════════════════════════
//  DAILY SESSION TRACKING — No Fear UX
// ═══════════════════════════════════════════════
const SESSION_KEY = 'mkt201_daily';

function getDailyData() {
  try {
    const d = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
    const today = new Date().toDateString();
    if (d.date !== today) return { date: today, sessions: 0, qs: 0, streak: (d.streak||0) };
    return d;
  } catch(e) { return { date: new Date().toDateString(), sessions: 0, qs: 0, streak: 0 }; }
}

function recordDailySession(qCount) {
  const d = getDailyData();
  d.sessions = (d.sessions || 0) + 1;
  d.qs = (d.qs || 0) + qCount;
  // Use game data as the single authoritative streak source
  d.streak = getGameData().streak || 1;
  localStorage.setItem(SESSION_KEY, JSON.stringify(d));
  recordActivityDay();
  updateTodayCard();
}

function getDaysToExam() {
  const exam = new Date('2026-04-20T09:00:00');
  const now  = new Date();
  return Math.max(0, Math.ceil((exam - now) / (1000*60*60*24)));
}

function getDailyTarget() {
  const daysLeft = getDaysToExam();
  const total = allQuestions.length;
  const mastered = Object.values(getMastery()).filter(v => v.correct >= 2).length;
  const remaining = Math.max(1, total - mastered);
  if (daysLeft <= 0) return total;
  return Math.ceil(remaining / daysLeft);
}

function updateTodayCard() {
  const d       = getDailyData();
  const daysLeft = getDaysToExam();
  const msgEl   = document.getElementById('today-msg');
  const streakEl = document.getElementById('today-streak');
  const doneEl  = document.getElementById('today-sessions-done');
  const cardEl  = document.getElementById('today-session-card');
  if (!msgEl) return;

  // Card color: calm green always (no red scary mode)
  if (cardEl) cardEl.style.background = 'linear-gradient(135deg,#134e4a,#0f766e)';

  // Streak badge
  if (streakEl) {
    streakEl.textContent = d.streak > 1 ? `🔥 ${d.streak} أيام متواصلة` : '';
  }

  // Main message — celebrate progress, never show deficit
  if (daysLeft <= 0) {
    msgEl.textContent = '🤲 يوم الاختبار — التوكل على الله';
    if (doneEl) doneEl.textContent = 'وفقك الله ✨';
  } else if (d.sessions === 0) {
    const msgs = [
      'جاهز تذاكر؟ 10 دقائق تكفي ⚡',
      'ابدأ بجلسة صغيرة — أي جلسة أفضل من لا شيء 🎯',
      'كل سؤال تجاوب عليه يثبت في الذاكرة تلقائياً 🧠',
    ];
    msgEl.textContent = msgs[new Date().getDate() % msgs.length];
    if (doneEl) doneEl.textContent = daysLeft <= 7 ? `⏰ تبقى ${daysLeft} يوم` : '';
  } else {
    const s = d.sessions, q = d.qs || 0;
    const congrats = s >= 3
      ? [`🔥 ${s} جلسات اليوم — يوم استثنائي!`, 'انت من أكثر الناس مذاكرة اليوم 🏆'][0]
      : s >= 2
      ? `💪 جلستين اليوم — ${q} سؤال! ممتاز`
      : `✅ جلسة اليوم مكتملة — ${q} سؤال في الذاكرة!`;
    msgEl.textContent = congrats;
    if (doneEl) doneEl.textContent = s < 3 ? 'جلسة أخرى؟ 👆' : '';
  }
}





function updateSessionBadge() {
  const d   = getDailyData();
  const el  = document.getElementById('session-today-badge');
  if (!el) return;
  if (d.sessions === 0)    el.textContent = 'ابدأ اليوم 🌅';
  else if (d.sessions >= 3) el.textContent = `🔥 ${d.sessions} جلسات اليوم`;
  else                      el.textContent = `✅ ${d.sessions} جلسة اليوم`;
}

function quickStart20() {
  showPage('page-quiz');
  setTimeout(() => {
    // All chapters checked
    document.querySelectorAll('.quiz-ch-item input[type=checkbox]').forEach(cb => {
      cb.checked = (cb.value === 'all');
    });
    // Always 20 — comfortable session
    document.querySelectorAll('.quiz-count-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
    document.getElementById('quiz-count-select').value = '20';
    // Smart mode — shows harder questions first, more efficient
    document.getElementById('quiz-mode-select').value = 'smart';
    document.querySelectorAll('.quiz-mode-btn').forEach(b => b.classList.remove('active'));
    const s = document.getElementById('qmode-smart');
    if (s) s.classList.add('active');
    // Scroll to start button
    setTimeout(() => {
      const btn = document.querySelector('.quiz-start-btn');
      if (btn) btn.scrollIntoView({ behavior:'smooth', block:'center' });
    }, 150);
  }, 80);
}


// ═══════════════════════════════════════════════
//  CHAPTER HIGHLIGHTS — أبرز ما في التيست بانك
// ═══════════════════════════════════════════════
const CH_HIGHLIGHTS = {
  ch1: {
    title: 'Chapter 1 — Test Bank Highlights',
    items: [
      {
        star: true,
        topic: 'The Five-Step Marketing Process',
        explain: 'In order: (1) Understand the marketplace & customer needs, (2) Design a customer-driven marketing strategy, (3) Construct an integrated marketing program, (4) Build profitable relationships, (5) Capture value from customers (profits). Step 5 — "capturing value" — appears frequently in exams.',
        ar: 'الخطوات بالترتيب: ١- فهم السوق، ٢- تصميم الاستراتيجية، ٣- بناء البرنامج التسويقي، ٤- بناء العلاقات، ٥- الحصول على القيمة (الأرباح). الخطوة الأخيرة "capturing value" تتكرر كثيراً.'
      },
      {
        star: true,
        topic: 'Needs vs. Wants vs. Demands',
        explain: 'Needs = basic felt deprivation (hunger, safety). Wants = needs shaped by culture & personality (pizza instead of bread). Demands = Want + buying power. Common trap: "the newest iPhone" → Want, NOT a Need.',
        ar: 'Needs = حاجة أساسية. Wants = الحاجة بعد تشكيلها بالثقافة. Demands = Want + قدرة شرائية. الفخ الشائع: iPhone الجديد → Want وليس Need.'
      },
      {
        star: true,
        topic: 'The Five Marketing Management Orientations',
        explain: 'Production (cheap & available) → Product (quality focus) → Selling (push sales) → Marketing (understand customer needs first) → Societal (customer + society + company). Exam question: which orientation focuses on the customer? Answer: Marketing Concept.',
        ar: 'Production → Product → Selling → Marketing → Societal. السؤال الدائم: أي توجه يركز على العميل؟ الجواب: Marketing Concept.'
      },
      {
        star: false,
        topic: 'Marketing Myopia',
        explain: 'When a company focuses too narrowly on its product and loses sight of the underlying customer need. Example: railroad companies thought they were in the "railroad business," not the "transportation business" — and lost to airlines.',
        ar: 'التركيز على المنتج وإهمال الحاجة الأساسية للعميل. مثال: شركات القطارات فكرت أنها في صناعة القطارات لا النقل.'
      },
      {
        star: false,
        topic: 'Value Proposition',
        explain: 'The set of benefits a company promises to deliver to satisfy customer needs. It answers: "Why should the customer choose us over competitors?" — it must be compelling and differentiated.',
        ar: 'مجموعة الفوائد التي تعد بها الشركة للعميل. هي الإجابة على: "ليش تختارنا؟"'
      },
      {
        star: false,
        topic: 'Customer Equity & Share of Customer',
        explain: 'Customer Equity = combined lifetime values of all customers. Share of Customer = the portion of the customer\'s purchases in your category — not just market share, but wallet share.',
        ar: 'Customer Equity = مجموع قيم كل العملاء مستقبلاً. Share of Customer = نسبة ما تحصل عليه من مشتريات العميل في فئتك.'
      },
    ]
  },
  ch2: {
    title: 'Chapter 2 — Test Bank Highlights',
    items: [
      {
        star: true,
        topic: 'BCG Matrix — Stars / Cash Cows / Question Marks / Dogs',
        explain: 'Stars = high growth + high share (invest). Cash Cows = low growth + high share (generate cash). Question Marks = high growth + low share (risky). Dogs = low growth + low share (divest). Exam question: what do you do with each?',
        ar: 'Stars = استثمر. Cash Cows = احلب النقود. Question Marks = مخاطرة. Dogs = تخلص منها.'
      },
      {
        star: true,
        topic: 'Growth Strategies — Ansoff Matrix',
        explain: 'Market Penetration = existing product, existing market (grow sales). Market Development = existing product, new market. Product Development = new product, existing market. Diversification = new product, new market (highest risk).',
        ar: 'Market Penetration = منتج موجود، سوق موجود. Market Development = منتج موجود، سوق جديد. Product Development = منتج جديد، سوق موجود. Diversification = كل شيء جديد.'
      },
      {
        star: true,
        topic: 'Mission Statement',
        explain: 'Must be market-oriented (focused on customer value), NOT product-oriented. Wrong: "We make shoes." Right: "We help people move comfortably and stylishly." The mission should inspire and guide the company.',
        ar: 'لازم يكون Market-oriented لا Product-oriented. خاطئ: "نصنع أحذية". صحيح: "نساعد الناس على التنقل براحة."'
      },
      {
        star: false,
        topic: 'SWOT Analysis',
        explain: 'Strengths & Weaknesses = internal factors the company controls. Opportunities & Threats = external forces from the environment. Goal: match strengths with market opportunities.',
        ar: 'Strengths وWeaknesses = داخلية. Opportunities وThreats = خارجية. الهدف: مطابقة نقاط القوة مع الفرص.'
      },
      {
        star: false,
        topic: 'Business Portfolio Management',
        explain: 'The collection of all businesses and products the company owns. Goal: allocate resources to promising units and divest weak ones. The BCG Matrix is the most common tool for this.',
        ar: 'مجموعة كل أعمال الشركة. الهدف: استثمر في الواعد وتخلص من الضعيف. BCG Matrix هي الأداة الأشهر.'
      },
      {
        star: false,
        topic: 'Value Chain',
        explain: 'The series of internal activities (design → production → distribution → sales → service) that add value to the product. A strong value chain = strong competitive advantage.',
        ar: 'سلسلة الأنشطة الداخلية التي تضيف قيمة للمنتج. قوة السلسلة = قوة الميزة التنافسية.'
      },
    ]
  },
  ch3: {
    title: 'Chapter 3 — Test Bank Highlights',
    items: [
      {
        star: true,
        topic: 'Microenvironment vs. Macroenvironment',
        explain: 'Microenvironment = forces close to the company that directly affect it: (Company, Suppliers, Intermediaries, Competitors, Publics, Customers). Macroenvironment = larger societal forces: (Demographic, Economic, Natural, Technological, Political, Cultural). Exam question: which environment does this example describe?',
        ar: 'Micro = قريب ومباشر (الشركة، الموردون، الوسطاء، المنافسون، Publics، العملاء). Macro = قوى مجتمعية أكبر (DENPTC).'
      },
      {
        star: true,
        topic: 'The Six Types of Publics',
        explain: 'Financial (banks, investors) · Media (newspapers, TV) · Government (regulatory agencies) · Citizen-action (consumer groups, environmental groups) · Local (neighborhood community) · Internal (employees). Exam: match the example to the correct public type.',
        ar: 'Financial · Media · Government · Citizen-action · Local · Internal. السؤال: أي نوع ينطبق على المثال؟'
      },
      {
        star: true,
        topic: 'Demographic Environment — The Generations',
        explain: 'Baby Boomers (1946–1964): TV-oriented, brand loyal. Gen X (1965–1980): independent, pragmatic. Millennials (1981–1996): digitally savvy, purpose-driven. Gen Z (after 1997): fully digital natives. Exam: which generation fits the description?',
        ar: 'Baby Boomers → Gen X → Millennials → Gen Z. السؤال: أي جيل يناسب الوصف؟'
      },
      {
        star: false,
        topic: 'The Six Microenvironment Actors',
        explain: 'The Company (internal departments) · Suppliers · Marketing Intermediaries (resellers, distributors) · Competitors · Publics · Customers (five types: consumer, business, reseller, government, international).',
        ar: 'الشركة · الموردون · الوسطاء · المنافسون · Publics · العملاء (خمسة أنواع).'
      },
      {
        star: false,
        topic: 'Cultural Environment',
        explain: 'Core beliefs = deeply held values that are hard to change (honesty, family). Secondary beliefs = more open to influence (fashion trends, hobbies). Companies target secondary beliefs because they\'re easier to shift.',
        ar: 'Core beliefs = ثابتة (الأمانة، الأسرة). Secondary beliefs = قابلة للتغيير. الشركات تستهدف Secondary لأنها أسهل.'
      },
      {
        star: false,
        topic: 'Economic Environment',
        explain: 'Affects the consumer\'s purchasing power. During recessions → value marketing (emphasize affordability and quality). Smart companies redefine their value proposition rather than cutting quality.',
        ar: 'يؤثر على القوة الشرائية. في الركود → Value marketing. أعد تعريف قيمتك بدل تخفيض الجودة.'
      },
    ]
  },
  ch5: {
    title: 'Chapter 5 — Test Bank Highlights',
    items: [
      {
        star: true,
        topic: 'The Four Factors Influencing Consumer Behavior',
        explain: 'Cultural (culture, subculture, social class) → Social (reference groups, family, roles) → Personal (age, occupation, income, lifestyle) → Psychological (motivation, perception, learning, beliefs). Ordered from broadest influence (Cultural) to most specific (Psychological).',
        ar: 'Cultural → Social → Personal → Psychological. من الأعمق تأثيراً (Cultural) للأكثر تفصيلاً (Psychological).'
      },
      {
        star: true,
        topic: 'Reference Groups & Family',
        explain: 'Reference Groups = groups a person compares themselves to and that influence their decisions. Types: Membership groups (belongs to) vs. Aspirational groups (wants to join). Family = the single most influential reference group, especially for major purchase decisions.',
        ar: 'Reference Groups = جماعات التأثير. الأسرة = أقوى مجموعة مرجعية، خاصة في القرارات الكبيرة.'
      },
      {
        star: true,
        topic: 'The Five-Step Buyer Decision Process',
        explain: '(1) Need Recognition → (2) Information Search → (3) Evaluation of Alternatives → (4) Purchase Decision → (5) Post-purchase Behavior. Exam question: which step does this example describe?',
        ar: '١- الشعور بالحاجة ٢- البحث عن معلومات ٣- مقارنة الخيارات ٤- قرار الشراء ٥- التقييم بعد الشراء.'
      },
      {
        star: false,
        topic: 'Culture vs. Subculture',
        explain: 'Culture = shared values and behaviors of an entire society. Subculture = a smaller group within the larger culture with its own identity (nationalities, religions, geographic regions). Companies often target subcultures with tailored products.',
        ar: 'Culture = قيم المجتمع الكبير. Subculture = مجموعة أصغر بهويتها الخاصة. الشركات تستهدف Subcultures بمنتجات مخصصة.'
      },
      {
        star: false,
        topic: 'The Four Psychological Factors',
        explain: 'Motivation (what drives the person to act). Perception (how they interpret information). Learning (how experience changes their behavior). Beliefs & Attitudes (hard-to-change mental positions toward things).',
        ar: 'Motivation · Perception · Learning · Beliefs & Attitudes.'
      },
      {
        star: false,
        topic: 'Lifestyle & Psychographics (AIO)',
        explain: 'A consumer classification system based on: Activities + Interests + Opinions. Gives a deeper profile than just age or income — captures how a person actually lives.',
        ar: 'تصنيف المستهلك بناءً على: Activities + Interests + Opinions. أعمق من العمر أو الدخل.'
      },
    ]
  }
};

function renderChapterHighlights(ch) {
  const el = document.getElementById(ch + '-highlights');
  if (!el) return;
  const data = CH_HIGHLIGHTS[ch];
  if (!data) return;

  const chQs = allQuestions.filter(q => q.ch === ch);
  const pastCount = chQs.filter(q => q.past).length;

  let html = `<div class="ch-highlights">
    <div class="ch-hl-header">
      <span class="ch-hl-title">⭐ ${data.title}</span>
    </div>
    <div class="ch-hl-list">`;

  data.items.forEach((item, i) => {
    html += `<div class="ch-hl-item ${item.star ? 'ch-hl-star' : ''}">
      <div class="ch-hl-num">${i + 1}</div>
      <div class="ch-hl-content">
        <div class="ch-hl-topic">${item.star ? '⭐ ' : ''}${item.topic}</div>
        <div class="ch-hl-explain">${item.explain}${item.ar ? `<span class="ar-line"> — ${item.ar}</span>` : ''}</div>
      </div>
    </div>`;
  });

  html += `</div></div>`;
  el.innerHTML = html;
}


// ═══════════════════════════════════════════════
//  SIMPLE TOAST UTILITY
// ═══════════════════════════════════════════════
function showToast(msg, durationMs) {
  const t = document.createElement('div');
  t.className = 'lc-unlock-toast';
  t.style.cssText = 'background:var(--accent);font-size:1rem;padding:16px 28px;border-radius:20px;max-width:320px;';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.classList.add('hide'); setTimeout(() => t.remove(), 380); }, durationMs || 2400);
}


// ═══════════════════════════════════════════════
//  ACTIVITY / STREAK CALENDAR
// ═══════════════════════════════════════════════
const ACTIVITY_KEY = 'mkt201_activity';

function recordActivityDay() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const days = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]');
    if (!days.includes(today)) {
      days.push(today);
      // keep only last 90 days to avoid bloat
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 90);
      const cutoffStr = cutoff.toISOString().slice(0, 10);
      const trimmed = days.filter(d => d >= cutoffStr);
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(trimmed));
    }
  } catch(e) {}
}

function renderStreakCalendar() {
  const container = document.getElementById('streak-calendar-container');
  if (!container) return;

  let activeDays;
  try { activeDays = new Set(JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]')); }
  catch(e) { activeDays = new Set(); }

  // Build last 35 days (5 weeks)
  const today = new Date();
  const days = [];
  for (let i = 34; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }

  const dayNames = ['أحد','اث','ثل','أر','خم','جم','سب'];

  let html = `<div class="streak-calendar">
    <h3 class="streak-cal-title">📅 سجل نشاطك — آخر 5 أسابيع</h3>
    <div class="streak-cal-header">`;
  dayNames.forEach(n => { html += `<div class="streak-cal-day-name">${n}</div>`; });
  html += `</div><div class="streak-cal-grid">`;

  // pad start so first day aligns with correct column
  const firstDayOfWeek = new Date(days[0]).getDay(); // 0=Sun
  for (let p = 0; p < firstDayOfWeek; p++) {
    html += `<div class="streak-cal-cell empty"></div>`;
  }

  days.forEach(dateStr => {
    const active = activeDays.has(dateStr);
    const isToday = dateStr === today.toISOString().slice(0, 10);
    html += `<div class="streak-cal-cell ${active ? 'active' : ''} ${isToday ? 'today' : ''}" title="${dateStr}"></div>`;
  });

  html += `</div><div class="streak-cal-legend">
    <span class="streak-cal-cell active legend-cell"></span><span>يوم نشاط</span>
    <span class="streak-cal-cell legend-cell" style="margin-right:12px"></span><span>بدون نشاط</span>
  </div></div>`;

  container.innerHTML = html;
}


// ═══════════════════════════════════════════════
//  EXAM READINESS INDICATOR
// ═══════════════════════════════════════════════
function getExamReadiness() {
  if (!allQuestions || !allQuestions.length) return { pct: 0, label: 'غير محدد', color: '#6b7280' };

  const mastery = getMastery();
  let masteredCount = 0;
  allQuestions.forEach(q => {
    const key = (q.q || '').slice(0, 60);
    const rec = mastery[key];
    if (rec && rec.correct > 0 && rec.wrong === 0) masteredCount++;
  });
  const pct = Math.round((masteredCount / allQuestions.length) * 100);

  let label, color;
  if (pct >= 80)      { label = 'جاهز للاختبار 🏆'; color = '#16a34a'; }
  else if (pct >= 60) { label = 'تقدم ممتاز 💪';    color = '#2563eb'; }
  else if (pct >= 40) { label = 'تقدم جيد 📈';       color = '#d97706'; }
  else if (pct >= 20) { label = 'في البداية 🌱';    color = '#7c3aed'; }
  else                { label = 'ابدأ المذاكرة 🚀';  color = '#dc2626'; }

  return { pct, label, color };
}

function renderReadinessCard() {
  const el = document.getElementById('home-readiness');
  if (!el) return;
  const r = getExamReadiness();
  el.innerHTML = `
    <div class="readiness-card" style="border-left:4px solid ${r.color}">
      <div class="readiness-label">مستوى الاستعداد للاختبار</div>
      <div class="readiness-bar-wrap">
        <div class="readiness-bar-fill" style="width:${r.pct}%;background:${r.color}"></div>
      </div>
      <div class="readiness-status" style="color:${r.color}">${r.label} — ${r.pct}%</div>
    </div>`;
}


// ═══════════════════════════════════════════════
//  WEAK SPOTS PANEL
// ═══════════════════════════════════════════════
function renderWeakSpots() {
  const el = document.getElementById('home-weak-spots');
  if (!el) return;

  // Group questions by chapter, find weakest chapters
  const mastery = getMastery();
  const chapters = {};
  allQuestions.forEach(q => {
    const ch = q.ch || 'other';
    if (!chapters[ch]) chapters[ch] = { total: 0, mastered: 0 };
    chapters[ch].total++;
    const key = (q.q || '').slice(0, 60);
    const rec = mastery[key];
    if (rec && rec.correct > 0 && rec.wrong === 0) chapters[ch].mastered++;
  });

  const chapterNames = {
    'ch1':'الفصل 1','ch2':'الفصل 2','ch3':'الفصل 3',
    'ch4':'الفصل 4','ch5':'الفصل 5','ch6':'الفصل 6',
    'ch7':'الفصل 7','ch8':'الفصل 8','ch9':'الفصل 9',
    'ch10':'الفصل 10','ch11':'الفصل 11','ch12':'الفصل 12',
    'ch13':'الفصل 13','ch14':'الفصل 14',
  };

  const sorted = Object.entries(chapters)
    .map(([ch, s]) => ({ ch, pct: s.total ? Math.round((s.mastered / s.total) * 100) : 0 }))
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 4);

  if (!sorted.length || sorted[0].pct > 70) {
    el.innerHTML = '';
    return;
  }

  let html = `<div class="weak-spots-panel">
    <div class="weak-spots-title">⚠️ نقاط تحتاج مراجعة</div>`;
  sorted.forEach(item => {
    const name = chapterNames[item.ch] || item.ch;
    html += `<div class="weak-spot-item">
      <div class="weak-spot-name">${name}</div>
      <div class="weak-spot-bar-wrap">
        <div class="weak-spot-bar-fill" style="width:${item.pct}%"></div>
      </div>
      <button type="button" class="weak-spot-btn" onclick="startWeakSpotSession('${item.ch}')">تدرب 🎯</button>
    </div>`;
  });
  html += `</div>`;
  el.innerHTML = html;
}

function startWeakSpotSession(ch) {
  showPage('page-quiz');
  setTimeout(() => {
    // Select only the weak chapter
    document.querySelectorAll('.quiz-ch-item input[type=checkbox]').forEach(cb => {
      cb.checked = (cb.value === ch || cb.value === 'all');
      // uncheck 'all' if individual chapter
      if (cb.value === 'all') cb.checked = false;
      if (cb.value === ch) cb.checked = true;
    });
    document.getElementById('quiz-count-select').value = '20';
    document.querySelectorAll('.quiz-count-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
    document.getElementById('quiz-mode-select').value = 'smart';
    document.querySelectorAll('.quiz-mode-btn').forEach(b => b.classList.remove('active'));
    const s = document.getElementById('qmode-smart');
    if (s) s.classList.add('active');
    setTimeout(() => {
      const btn = document.querySelector('.quiz-start-btn');
      if (btn) btn.scrollIntoView({ behavior:'smooth', block:'center' });
    }, 150);
  }, 80);
}


function toggleNotesTranslation(btn) {
  const grid = btn.closest('.ch-notes-header').nextElementSibling;
  const spans = grid.querySelectorAll('.note-ar');
  const show = spans[0] && spans[0].style.display !== 'block';
  spans.forEach(s => s.style.display = show ? 'block' : 'none');
  btn.textContent = show ? '🌐 إخفاء' : '🌐 ترجمة';
}

// ═══════════════════════════════════════════════
//  CRAM MODE
// ═══════════════════════════════════════════════
// ═══════════════════════════════════════════════
//  LAST NIGHT SESSION — الليلة قبل الامتحان
// ═══════════════════════════════════════════════
function startLastNightSession() {
  const pastPool = allQuestions.filter(q => q.past === true);
  if (pastPool.length < 5) { showToast('ما في أسئلة كافية! 😮'); return; }
  const shuffled = pastPool.sort(() => Math.random() - 0.5).slice(0, 40);
  quizState.questions    = shuffled;
  quizState.current      = 0;
  quizState.answers      = new Array(shuffled.length).fill(null);
  quizState.startTime    = Date.now();
  quizState.ch           = 'all';
  quizState.trainingMode = false;
  quizState._levelIdx    = undefined;
  quizState._isLastNight = true;
  window._sessionStartXP = getGameData().xp;
  showPage('page-quiz');
  document.querySelector('.quiz-setup').classList.remove('active');
  document.querySelector('.quiz-run').classList.add('active');
  document.querySelector('.quiz-result').classList.remove('active');
  renderQuizQuestion();
  showToast('🔥 ' + pastPool.length + ' سؤال من الامتحانات السابقة — موفق!', 3000);
}

// ═══════════════════════════════════════════════
//  STUDY PLAN — خطة مراجعة 5 أيام
// ═══════════════════════════════════════════════
function renderStudyPlan() {
  const el = document.getElementById('study-plan-card');
  if (!el) return;
  const EXAM = new Date('2026-04-20T12:00:00');
  const now  = new Date();
  const daysLeft = Math.ceil((EXAM - now) / (1000 * 60 * 60 * 24));

  const plan = [
    { day: 'الأربعاء', label: 'Ch1', sub: 'قيمة العميل', action: "showPage('page-ch1')", ch: 'ch1' },
    { day: 'الخميس',   label: 'Ch2', sub: 'التخطيط الاستراتيجي', action: "showPage('page-ch2')", ch: 'ch2' },
    { day: 'الجمعة',   label: 'Ch3', sub: 'البيئة التسويقية', action: "showPage('page-ch3')", ch: 'ch3' },
    { day: 'السبت',    label: 'Ch5', sub: 'سلوك المستهلك', action: "showPage('page-ch5')", ch: 'ch5' },
    { day: 'الأحد',    label: 'مراجعة شاملة', sub: 'كل الفصول + أسئلة سابقة', action: 'startLastNightSession()', ch: 'all' },
    { day: 'الاثنين',  label: '🎓 الامتحان', sub: 'الظهر — وفقك الله', action: '', ch: 'exam' },
  ];

  // Figure out today's index
  const todayDay = now.getDay(); // 0=Sun,1=Mon,...,6=Sat
  const dayMap = { 3: 0, 4: 1, 5: 2, 6: 3, 0: 4, 1: 5 }; // Wed=3,Thu=4,Fri=5,Sat=6,Sun=0,Mon=1
  const todayIdx = dayMap[todayDay] ?? -1;

  if (daysLeft <= 0) {
    el.innerHTML = `<div style="text-align:center;padding:14px;font-weight:800;font-size:1rem;color:var(--accent);">🎓 يوم الامتحان — التوكل على الله ✨</div>`;
    return;
  }

  let html = `<div class="sp-header"><span class="sp-title">📅 خطة المراجعة — باقي <strong>${daysLeft}</strong> يوم${daysLeft === 1 ? '' : 'اً'}</span></div><div class="sp-days">`;

  plan.forEach((item, i) => {
    const isToday  = i === todayIdx;
    const isPast   = i < todayIdx;
    const isExam   = item.ch === 'exam';
    html += `<div class="sp-day ${isToday ? 'sp-today' : ''} ${isPast ? 'sp-past' : ''} ${isExam ? 'sp-exam' : ''}" ${item.action && !isExam ? `onclick="${item.action}"` : ''}>
      <div class="sp-day-label">${item.day}</div>
      <div class="sp-day-chapter">${item.label}</div>
      <div class="sp-day-sub">${item.sub}</div>
      ${isToday ? '<div class="sp-today-badge">اليوم ⚡</div>' : ''}
      ${isPast  ? '<div class="sp-done-badge">✓</div>' : ''}
    </div>`;
  });

  html += `</div>`;
  el.innerHTML = html;
}

function startCramSession() {
  // Cram = hard questions + previously wrong answers, 20 questions
  const mastery = getMastery();
  const cramPool = allQuestions.filter(q => {
    const key = (q.q || '').slice(0, 60);
    const rec = mastery[key];
    const isWrong = rec && rec.wrong > 0;
    return isWrong || q.diff === 'hard' || inferDiff(q) === 'hard';
  });

  if (cramPool.length < 5) {
    showToast('ما في أسئلة صعبة كافية — ممتاز! 🎉');
    return;
  }

  // Shuffle and take 20
  const shuffled = cramPool.sort(() => Math.random() - 0.5).slice(0, 20);

  // Inject directly into quiz engine using same pattern as startLevelSession
  quizState.questions = shuffled;
  quizState.current = 0;
  quizState.answers = new Array(shuffled.length).fill(null);
  quizState.startTime = Date.now();
  quizState.ch = 'all';
  quizState.trainingMode = false;
  quizState._levelIdx = undefined;
  window._sessionStartXP = getGameData().xp;

  showPage('page-quiz');
  document.querySelector('.quiz-setup').classList.remove('active');
  document.querySelector('.quiz-run').classList.add('active');
  document.querySelector('.quiz-result').classList.remove('active');
  renderQuizQuestion();
}


// ═══════════════════════════════════════════════
//  MOCK EXAM LOCK
// ═══════════════════════════════════════════════
function checkMockExamLock() {
  const lockEl = document.getElementById('mock-lock-state');
  const setupEl = document.getElementById('mock-setup');
  if (!lockEl) return;

  // Unlock conditions: at least 60 questions mastered (answered correctly with no wrong)
  const MOCK_UNLOCK_THRESHOLD = 60;
  const mastery = getMastery();
  const masteredCount = allQuestions.filter(q => {
    const key = (q.q || '').slice(0, 60);
    const rec = mastery[key];
    return rec && rec.correct > 0 && rec.wrong === 0;
  }).length;
  const isUnlocked = masteredCount >= MOCK_UNLOCK_THRESHOLD;

  if (isUnlocked) {
    lockEl.style.display = 'none';
    if (setupEl) setupEl.style.display = '';
  } else {
    const remaining = MOCK_UNLOCK_THRESHOLD - masteredCount;
    lockEl.style.display = '';
    lockEl.innerHTML = `
      <div class="mock-lock-banner">
        <div class="mock-lock-icon">🔒</div>
        <div class="mock-lock-title">الاختبار التجريبي مقفل</div>
        <div class="mock-lock-msg">أتقن ${remaining} سؤال إضافي لفتح الاختبار التجريبي</div>
        <div class="mock-lock-progress">
          <div class="mock-lock-bar">
            <div class="mock-lock-bar-fill" style="width:${Math.min(100, Math.round((masteredCount/MOCK_UNLOCK_THRESHOLD)*100))}%"></div>
          </div>
          <div class="mock-lock-count">${masteredCount} / ${MOCK_UNLOCK_THRESHOLD}</div>
        </div>
        <button type="button" class="mock-lock-cta" onclick="quickStart20()">🚀 تدرب الآن</button>
      </div>`;
    if (setupEl) setupEl.style.display = 'none';
  }
}


// ═══════════════════════════════════════════════
//  RESET PROGRESS
// ═══════════════════════════════════════════════
function confirmResetProgress() {
  const confirmed = confirm('⚠️ هل أنت متأكد؟\n\nسيتم حذف كل بيانات الإتقان والتقدم.\nلا يمكن التراجع عن هذا الإجراء.');
  if (confirmed) resetProgress();
}

function resetProgress() {
  localStorage.removeItem('mkt201_mastery');
  localStorage.removeItem('mkt201_game');
  localStorage.removeItem('mkt201_daily');
  localStorage.removeItem(ACTIVITY_KEY);
  showToast('تم إعادة ضبط بيانات الإتقان 🗑️');
  // Refresh current page visuals
  renderMasteryBars();
  updateGameHUD();
  renderReadinessCard();
  renderWeakSpots();
  renderDashboard();
  renderStreakCalendar();
}


// ═══════════════════════════════════════════════
//  ONBOARDING WALKTHROUGH
// ═══════════════════════════════════════════════
const ONBOARDING_KEY = 'mkt201_onboarded';

const ONBOARDING_STEPS = [
  {
    title: 'مرحبًا بك في HOSAM Study Hub 🎓',
    body: 'منصتك الشخصية للاستعداد لاختبار التسويق.\nدعنا نأخذك في جولة سريعة.',
    icon: '🎓'
  },
  {
    title: '❓ اختبارات ذكية',
    body: 'تبدأ بالأسئلة الأصعب وتتكيف مع مستواك تلقائياً.\nكل إجابة صحيحة تبني مستوى إتقانك.',
    icon: '🧠'
  },
  {
    title: '🎖️ نظام المستويات',
    body: 'ثلاثة مستويات: سهل، متوسط، صعب.\nأتقن كل مستوى لفتح التالي وتتبع تقدمك.',
    icon: '🏆'
  },
  {
    title: '🔥 حافظ على سلسلتك',
    body: 'ذاكر يومياً لبناء سلسلة انتصارات.\nكل يوم مذاكرة يضيف إلى سجلك.',
    icon: '📅'
  },
  {
    title: '✅ جاهز!',
    body: 'ابدأ بجلسة سريعة — 20 سؤال في 10 دقائق. بالتوفيق!',
    icon: '🚀'
  }
];

let _onboardingStep = 0;

function initOnboarding() {
  // Show only once
  if (localStorage.getItem(ONBOARDING_KEY)) return;
  _onboardingStep = 0;
  renderOnboardingStep();
  const overlay = document.getElementById('onboarding-overlay');
  if (overlay) overlay.style.display = 'flex';
}

function renderOnboardingStep() {
  const overlay = document.getElementById('onboarding-overlay');
  if (!overlay) return;
  const step = ONBOARDING_STEPS[_onboardingStep];
  const isLast = _onboardingStep === ONBOARDING_STEPS.length - 1;
  const dots = ONBOARDING_STEPS.map((_, i) =>
    `<span class="ob-dot ${i === _onboardingStep ? 'active' : ''}"></span>`
  ).join('');

  overlay.innerHTML = `
    <div class="onboarding-modal">
      <div class="ob-icon">${step.icon}</div>
      <div class="ob-title">${step.title}</div>
      <div class="ob-body">${step.body.replace(/\n/g, '<br>')}</div>
      <div class="ob-dots">${dots}</div>
      <div class="ob-actions">
        ${_onboardingStep > 0 ? `<button type="button" class="ob-btn ob-btn-secondary" onclick="prevOnboardingStep()">السابق</button>` : ''}
        <button type="button" class="ob-btn ob-btn-primary" onclick="${isLast ? 'closeOnboarding()' : 'nextOnboardingStep()'}">${isLast ? 'ابدأ المذاكرة 🚀' : 'التالي →'}</button>
      </div>
      <button type="button" class="ob-skip" onclick="closeOnboarding()">تخطي</button>
    </div>`;
}

function nextOnboardingStep() {
  if (_onboardingStep < ONBOARDING_STEPS.length - 1) {
    _onboardingStep++;
    renderOnboardingStep();
  }
}

function prevOnboardingStep() {
  if (_onboardingStep > 0) {
    _onboardingStep--;
    renderOnboardingStep();
  }
}

function closeOnboarding() {
  const overlay = document.getElementById('onboarding-overlay');
  if (overlay) overlay.style.display = 'none';
  localStorage.setItem(ONBOARDING_KEY, '1');
}


// ═══════════════════════════════════════════════
//  FEATURE: PDF EXPORT (wrong answers summary)
// ═══════════════════════════════════════════════
function exportWrongAnswersPDF(mode) {
  let questions, answers;
  if (mode === 'mock') {
    questions = mockState.questions;
    answers   = mockState.answers;
  } else {
    questions = quizState.questions;
    answers   = quizState.answers;
  }
  const wrong = questions.map((q, i) => ({ q, chosen: answers[i] }))
    .filter(({ q, chosen }) => chosen !== q.ans && !q._retry);
  const chNames = { ch1:'Chapter 1', ch2:'Chapter 2', ch3:'Chapter 3', ch5:'Chapter 5' };
  const w = window.open('', '_blank');
  w.document.write(`<!DOCTYPE html><html dir="ltr"><head><meta charset="UTF-8">
    <title>MKT 201 — Wrong Answers Review</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', sans-serif; padding: 32px; color: #1a1a1a; max-width: 800px; margin: 0 auto; }
      h1 { font-size: 1.5rem; margin-bottom: 4px; color: #0d9488; }
      .meta { color: #666; font-size: .85rem; margin-bottom: 24px; }
      .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 14px; page-break-inside: avoid; }
      .q-text { font-weight: 600; margin-bottom: 8px; line-height: 1.6; }
      .opts { list-style: none; padding: 0; }
      .opts li { padding: 4px 8px; border-radius: 6px; margin: 3px 0; font-size: .9rem; }
      .opts li.correct { background: #dcfce7; color: #166534; font-weight: 700; }
      .opts li.wrong   { background: #fee2e2; color: #991b1b; text-decoration: line-through; }
      .exp { background: #f0fdfa; border-right: 3px solid #14b8a6; padding: 8px 12px; margin-top: 8px; font-size: .85rem; color: #334155; direction: rtl; border-radius: 6px; }
      .ch-tag { display: inline-block; background: #f0fdfa; color: #0d9488; font-size: .75rem; font-weight: 700; padding: 2px 8px; border-radius: 6px; margin-bottom: 8px; }
      .no-print { margin-bottom: 20px; }
      @media print { .no-print { display: none; } }
    </style></head><body>
    <div class="no-print"><button onclick="window.print()" style="background:#0d9488;color:#fff;border:none;padding:10px 24px;border-radius:8px;font-weight:600;cursor:pointer;font-size:.95rem;">🖨️ Print / Save as PDF</button></div>
    <h1>MKT 201 — Wrong Answers Review</h1>
    <p class="meta">${wrong.length} wrong answers · ${new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</p>`);
  if (wrong.length === 0) {
    w.document.write('<p style="text-align:center;padding:40px;color:#16a34a;font-size:1.2rem;font-weight:700;">🎉 No wrong answers — Perfect score!</p>');
  } else {
    wrong.forEach(({ q, chosen }, idx) => {
      const optsHtml = q.opts.map((opt, i) => {
        let cls = '';
        if (i === q.ans) cls = 'correct';
        else if (i === chosen) cls = 'wrong';
        return `<li class="${cls}">${String.fromCharCode(65+i)}. ${opt}</li>`;
      }).join('');
      w.document.write(`<div class="card">
        <span class="ch-tag">${chNames[q.ch] || q.ch || 'Mixed'}</span>
        <div class="q-text">${idx+1}. ${q.q}</div>
        <ul class="opts">${optsHtml}</ul>
        ${q.exp ? `<div class="exp">${q.exp}</div>` : ''}
      </div>`);
    });
  }
  w.document.write('</body></html>');
  w.document.close();
}

// ═══════════════════════════════════════════════
//  FEATURE: EXPORT CHAPTER SUMMARY AS PDF
// ═══════════════════════════════════════════════
function exportChapterPDF(pageId, chapterName) {
  const page = document.getElementById(pageId);
  if (!page) return;

  // Detect current theme and mode
  const isRose = document.body.classList.contains('theme-rose');
  const isDark = document.body.classList.contains('dark');

  // Color palettes for each combination
  const palettes = {
    tealLight: {
      c1: '#0d9488', c2: '#0f766e', c3: '#134e4a',
      bg1: '#f0fdfa', bg2: '#f8fffe', bg3: '#ecfdf5',
      line: '#d1e7e4', ink: '#1e293b', muted: '#64748b',
      paper: '#ffffff', tipBg: '#fffbeb', tipBorder: '#fde68a', tipAccent: '#f59e0b', tipText: '#92400e',
      memoBg: '#eff6ff', memoBorder: '#bfdbfe', memoAccent: '#3b82f6', memoText: '#1e40af',
      exBg: '#ecfdf5', exBorder: '#a7f3d0', exAccent: '#10b981',
      coverGrad: 'linear-gradient(160deg, #042f2e 0%, #0a3d39 30%, #0d9488 70%, #2dd4bf 100%)',
      svgStops: ['#042f2e','#0a3d39','#0d9488','#2dd4bf'],
      bodyBg: '#ffffff',
    },
    tealDark: {
      c1: '#14b8a6', c2: '#2dd4bf', c3: '#5eead4',
      bg1: '#0a1c1a', bg2: '#0d2521', bg3: '#071f1c',
      line: '#0d2c29', ink: '#e4f5f3', muted: '#6aada8',
      paper: '#0a1c1a', tipBg: '#1a1506', tipBorder: '#78350f', tipAccent: '#fbbf24', tipText: '#fde68a',
      memoBg: '#0c1929', memoBorder: '#1e3a5f', memoAccent: '#60a5fa', memoText: '#93c5fd',
      exBg: '#071f1c', exBorder: '#064e3b', exAccent: '#34d399',
      coverGrad: 'linear-gradient(160deg, #021a19 0%, #042f2e 30%, #0d9488 70%, #14b8a6 100%)',
      svgStops: ['#021a19','#042f2e','#0d9488','#14b8a6'],
      bodyBg: '#030d0c',
    },
    roseLight: {
      c1: '#e11d48', c2: '#be185d', c3: '#9f1239',
      bg1: '#fff1f2', bg2: '#fff5f7', bg3: '#fce7f3',
      line: '#fecdd3', ink: '#1a0208', muted: '#8b6070',
      paper: '#ffffff', tipBg: '#fffbeb', tipBorder: '#fde68a', tipAccent: '#f59e0b', tipText: '#92400e',
      memoBg: '#fdf2f8', memoBorder: '#fbcfe8', memoAccent: '#ec4899', memoText: '#9d174d',
      exBg: '#fff1f2', exBorder: '#fda4af', exAccent: '#fb7185',
      coverGrad: 'linear-gradient(160deg, #4c0519 0%, #881337 30%, #e11d48 70%, #fb7185 100%)',
      svgStops: ['#4c0519','#881337','#e11d48','#fb7185'],
      bodyBg: '#ffffff',
    },
    roseDark: {
      c1: '#fb7185', c2: '#f43f5e', c3: '#fda4af',
      bg1: '#1a0510', bg2: '#210815', bg3: '#2d0a14',
      line: 'rgba(225,29,72,0.22)', ink: '#fde8ec', muted: '#c08090',
      paper: '#1a0510', tipBg: '#1a1506', tipBorder: '#78350f', tipAccent: '#fbbf24', tipText: '#fde68a',
      memoBg: '#1f0618', memoBorder: '#831843', memoAccent: '#f472b6', memoText: '#fbcfe8',
      exBg: '#2d0a14', exBorder: '#9f1239', exAccent: '#fb7185',
      coverGrad: 'linear-gradient(160deg, #1a0005 0%, #4c0519 30%, #9f1239 70%, #fb7185 100%)',
      svgStops: ['#1a0005','#4c0519','#9f1239','#fb7185'],
      bodyBg: '#0d0308',
    }
  };

  const key = (isRose ? 'rose' : 'teal') + (isDark ? 'Dark' : 'Light');
  const p = palettes[key];

  const w = window.open('', '_blank');
  const dateStr = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });

  w.document.write(`<!DOCTYPE html><html dir="ltr"><head><meta charset="UTF-8">
    <title>MKT 201 — ${chapterName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
      @page {
        size: A4;
        margin: 12mm 14mm 12mm 14mm;
      }
      :root {
        --c1: ${p.c1}; --c2: ${p.c2}; --c3: ${p.c3};
        --bg1: ${p.bg1}; --bg2: ${p.bg2}; --bg3: ${p.bg3};
        --line: ${p.line}; --ink: ${p.ink}; --muted: ${p.muted};
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Inter', -apple-system, system-ui, sans-serif;
        color: var(--ink); line-height: 1.55; font-size: 11.5px;
        max-width: 780px; margin: 0 auto; padding: 0;
        -webkit-font-smoothing: antialiased;
        background: ${p.bodyBg};
      }

      /* ═══ TOOLBAR (screen only) ═══ */
      .toolbar {
        position: sticky; top: 0; z-index: 100;
        background: ${isDark ? p.paper : '#fff'}; padding: 14px 32px;
        border-bottom: 1px solid ${isDark ? p.line : '#e2e8f0'};
        display: flex; align-items: center; gap: 14px;
        box-shadow: 0 2px 12px rgba(0,0,0,${isDark ? '.15' : '.04'});
      }
      .toolbar-btn {
        background: linear-gradient(135deg, var(--c1), var(--c2));
        color: #fff; border: none; padding: 10px 28px;
        border-radius: 10px; font-weight: 700; cursor: pointer;
        font-size: .92rem; font-family: inherit;
        box-shadow: 0 4px 14px ${isRose ? 'rgba(225,29,72,.25)' : 'rgba(13,148,136,.25)'};
        transition: transform .15s, box-shadow .15s;
      }
      .toolbar-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px ${isRose ? 'rgba(225,29,72,.35)' : 'rgba(13,148,136,.35)'}; }
      .toolbar .hint { color: var(--muted); font-size: .82rem; }

      /* ═══ CONTENT AREA ═══ */
      .content { padding: 20px 24px 36px; }

      /* ═══ SECTION DIVIDER ═══ */
      .lo-section-pdf {
        margin-bottom: 20px; page-break-inside: avoid;
      }
      .lo-header-pdf {
        display: flex; align-items: center; gap: 12px;
        padding: 8px 12px; margin-bottom: 10px;
        background: var(--bg1); border: 1.5px solid var(--line);
        border-radius: 12px; border-left: 5px solid var(--c1);
        box-shadow: 0 3px 12px ${isDark ? 'rgba(0,0,0,.25)' : 'rgba(0,0,0,.05)'};
      }
      .lo-badge-pdf {
        background: var(--c1); color: #fff;
        font-size: .68rem; font-weight: 800; padding: 4px 12px;
        border-radius: 6px; letter-spacing: .04em; white-space: nowrap;
      }
      .lo-title-pdf {
        font-size: 1.05rem; font-weight: 800; color: var(--c3);
        line-height: 1.3;
      }

      /* ═══ CHAPTER SECTION (no LO header) ═══ */
      .ch-section-pdf {
        margin-bottom: 14px;
      }
      .ch-section-pdf h2 {
        font-size: 1rem; font-weight: 800; color: var(--c2);
        margin-bottom: 12px; padding-bottom: 6px;
        border-bottom: 1.5px solid var(--line);
      }
      .ch-section-pdf h3 {
        font-size: .92rem; font-weight: 700; color: var(--c3);
        margin: 10px 0 6px;
      }

      /* ═══ DEFINITION ═══ */
      .def {
        background: ${isDark ? p.paper : '#fff'}; border: 1.5px solid var(--line);
        border-left: 5px solid var(--c1); border-radius: 12px;
        padding: 10px 14px; margin: 6px 0;
        page-break-inside: avoid;
        box-shadow: 0 4px 16px ${isDark ? 'rgba(0,0,0,.3)' : 'rgba(0,0,0,.06)'}, 0 1px 3px ${isDark ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.04)'};
      }
      .def-t {
        font-weight: 800; color: var(--c1); font-size: .88rem;
        margin-bottom: 3px; letter-spacing: -.01em;
      }
      .def-b { font-size: .86rem; color: ${isDark ? p.muted : '#334155'}; line-height: 1.7; }
      .def-b strong { color: var(--c2); font-weight: 700; }
      .def-ar {
        direction: rtl; text-align: right;
        font-family: 'Cairo', sans-serif; color: var(--c2);
        font-size: .82rem; font-weight: 600; line-height: 1.8;
        margin-top: 4px; padding: 4px 10px;
        background: var(--bg1); border-radius: 8px;
        border-right: 3px solid var(--c1);
      }

      /* ═══ CONCEPT CARD ═══ */
      .cpt {
        background: var(--bg2); border: 1.5px solid var(--line);
        border-radius: 12px; padding: 8px 12px; margin: 5px 0;
        page-break-inside: avoid;
        box-shadow: 0 3px 12px ${isDark ? 'rgba(0,0,0,.25)' : 'rgba(0,0,0,.05)'}, 0 1px 2px ${isDark ? 'rgba(0,0,0,.15)' : 'rgba(0,0,0,.03)'};
      }
      .cpt strong { color: var(--c2); font-size: .88rem; }
      .cpt p { font-size: .84rem; color: ${isDark ? p.muted : '#475569'}; margin-top: 3px; line-height: 1.7; }
      .cpt .ar { direction: rtl; text-align: right; font-family: 'Cairo', sans-serif; color: var(--c2); font-size: .8rem; font-weight: 600; margin-top: 4px; }

      /* ═══ PROCESS STEPS (Learning Objectives list) ═══ */
      .step {
        display: flex; gap: 14px; align-items: flex-start;
        padding: 7px 12px; margin: 4px 0;
        background: var(--bg2); border-radius: 12px;
        border-left: 4px solid var(--c1);
        page-break-inside: avoid;
        box-shadow: 0 3px 12px ${isDark ? 'rgba(0,0,0,.25)' : 'rgba(0,0,0,.05)'}, 0 1px 2px ${isDark ? 'rgba(0,0,0,.15)' : 'rgba(0,0,0,.03)'};
      }
      .step-n {
        background: var(--c1); color: #fff;
        min-width: 30px; height: 22px; border-radius: 5px;
        display: flex; align-items: center; justify-content: center;
        font-size: .7rem; font-weight: 800; flex-shrink: 0; margin-top: 2px;
      }
      .step-body { font-size: .86rem; line-height: 1.7; }
      .step-body strong { color: var(--ink); }
      .step-body .ar {
        display: block; direction: rtl; text-align: right;
        font-family: 'Cairo', sans-serif; color: var(--c1);
        font-size: .8rem; font-weight: 600; margin-top: 2px;
      }

      /* ═══ MASTER CARD ═══ */
      .mcard {
        background: var(--bg1); border: 1.5px solid var(--line);
        border-radius: 12px; padding: 8px 12px; margin: 5px 0;
        page-break-inside: avoid;
        box-shadow: 0 3px 12px ${isDark ? 'rgba(0,0,0,.25)' : 'rgba(0,0,0,.05)'}, 0 1px 2px ${isDark ? 'rgba(0,0,0,.15)' : 'rgba(0,0,0,.03)'};
      }
      .mcard strong { color: var(--c2); font-size: .88rem; }
      .mcard .ar { direction: rtl; text-align: right; font-family: 'Cairo', sans-serif; color: var(--c2); font-size: .8rem; font-weight: 600; margin-top: 4px; display: block; }

      /* ═══ EXAM TIP ═══ */
      .tip {
        background: ${p.tipBg}; border: 1.5px solid ${p.tipBorder};
        border-left: 5px solid ${p.tipAccent}; border-radius: 12px;
        padding: 8px 14px; margin: 6px 0; font-size: .86rem;
        page-break-inside: avoid; color: ${p.tipText};
        box-shadow: 0 4px 16px ${isDark ? 'rgba(0,0,0,.3)' : 'rgba(245,158,11,.1)'}, 0 1px 3px ${isDark ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.04)'};
      }
      .tip strong { color: ${p.tipAccent}; }
      .tip .ar { direction: rtl; text-align: right; font-family: 'Cairo', sans-serif; color: ${p.tipAccent}; font-size: .8rem; font-weight: 600; display: block; margin-top: 4px; }

      /* ═══ MEMORY BOX ═══ */
      .memo {
        background: ${p.memoBg}; border: 1.5px solid ${p.memoBorder};
        border-left: 5px solid ${p.memoAccent}; border-radius: 12px;
        padding: 8px 14px; margin: 6px 0; font-size: .86rem;
        page-break-inside: avoid; color: ${p.memoText};
        box-shadow: 0 4px 16px ${isDark ? 'rgba(0,0,0,.3)' : 'rgba(59,130,246,.08)'}, 0 1px 3px ${isDark ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.04)'};
      }

      /* ═══ HIGHLIGHT / SUMMARY BOX ═══ */
      .hbox {
        background: var(--bg1); border: 1.5px solid var(--line);
        border-radius: 12px; padding: 10px 14px; margin: 6px 0;
        page-break-inside: avoid;
        box-shadow: 0 3px 12px ${isDark ? 'rgba(0,0,0,.25)' : 'rgba(0,0,0,.05)'}, 0 1px 2px ${isDark ? 'rgba(0,0,0,.15)' : 'rgba(0,0,0,.03)'};
      }
      .hbox strong { color: var(--c2); }

      /* ═══ EXAMPLE BOX ═══ */
      .ebox {
        background: var(--bg3); border: 1.5px solid ${p.exBorder};
        border-left: 5px solid ${p.exAccent}; border-radius: 12px;
        padding: 8px 14px; margin: 6px 0;
        page-break-inside: avoid;
        box-shadow: 0 4px 16px ${isDark ? 'rgba(0,0,0,.3)' : 'rgba(16,185,129,.08)'}, 0 1px 3px ${isDark ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.04)'};
      }
      .ebox strong { color: ${p.exAccent}; }

      /* ═══ NOTE ITEMS ═══ */
      .note {
        display: flex; gap: 14px; align-items: flex-start;
        padding: 8px 12px; margin: 4px 0;
        background: ${isDark ? p.paper : '#fff'};
        border: 1.5px solid var(--line); border-radius: 12px;
        page-break-inside: avoid;
        box-shadow: 0 3px 10px ${isDark ? 'rgba(0,0,0,.25)' : 'rgba(0,0,0,.04)'}, 0 1px 2px ${isDark ? 'rgba(0,0,0,.15)' : 'rgba(0,0,0,.03)'};
      }
      .note-n {
        background: linear-gradient(135deg, var(--c1), var(--c2));
        color: #fff; width: 28px; height: 28px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: .72rem; font-weight: 800; flex-shrink: 0; margin-top: 1px;
      }
      .note-b { font-size: .86rem; color: ${isDark ? p.muted : '#334155'}; line-height: 1.7; }
      .note-b strong { color: var(--ink); }

      /* ═══ TABLES ═══ */
      table {
        width: 100%; border-collapse: separate; border-spacing: 0;
        margin: 6px 0; font-size: .82rem;
        border-radius: 12px; overflow: hidden;
        border: 1.5px solid var(--line);
        box-shadow: 0 4px 16px ${isDark ? 'rgba(0,0,0,.3)' : 'rgba(0,0,0,.06)'}, 0 1px 3px ${isDark ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.04)'};
      }
      th {
        background: var(--c2); color: #fff;
        padding: 10px 14px; text-align: left;
        font-weight: 700; font-size: .78rem;
        letter-spacing: .02em;
      }
      td {
        padding: 9px 14px; border-bottom: 1px solid ${isDark ? p.line : '#e5e7eb'};
        color: ${isDark ? p.muted : '#334155'}; vertical-align: top;
      }
      tr:nth-child(even) td { background: var(--bg2); }
      tr:last-child td { border-bottom: none; }

      /* ═══ ARABIC INLINE ═══ */
      .ar-inline {
        direction: rtl; text-align: right;
        font-family: 'Cairo', sans-serif;
        color: var(--c1); font-size: .8rem; font-weight: 600;
      }

      /* ═══ FOOTER ═══ */
      .footer {
        text-align: center; color: var(--muted); font-size: .72rem;
        padding: 24px 0; border-top: 1.5px solid ${isDark ? p.line : '#e2e8f0'};
        margin-top: 24px;
      }

      /* ═══ PRINT STYLES ═══ */
      @media print {
        .toolbar { display: none !important; }
        body { padding: 0; max-width: none; font-size: 11px; }
        .content { padding: 16px 0 32px; }
        .def, .cpt, .step, .mcard, .tip, .memo, .hbox, .ebox, .note {
          break-inside: avoid;
          box-shadow: none !important;
        }
        .lo-section-pdf { break-inside: avoid; }
        .lo-header-pdf { background: ${isRose ? '#fff1f2' : '#f0fdfa'} !important; box-shadow: none !important; }
        table { box-shadow: none !important; }
        td { color: #334155 !important; }
      }
    </style>
  </head><body>

    <div class="toolbar">
      <button class="toolbar-btn" onclick="window.print()">🖨️ طباعة / حفظ كـ PDF</button>
      <span class="hint">اختر "Save as PDF" في خيارات الطابعة للحفظ كملف</span>
    </div>

    <div style="padding:28px 32px 20px;border-bottom:4px solid ${p.c1};margin-bottom:24px;">
      <div style="display:inline-block;border:1.5px solid ${p.c1};color:${p.c1};padding:4px 14px;border-radius:20px;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px;">MKT 201 — Principles of Marketing</div>
      <h1 style="font-size:1.5rem;font-weight:900;color:${isDark ? p.c1 : p.c3};margin:0 0 6px;line-height:1.3;">${chapterName}</h1>
      <div style="font-size:.88rem;color:#64748b;">Kotler & Armstrong · Principles of Marketing · 19th Edition</div>
      <div style="margin-top:12px;padding-top:10px;border-top:1px solid ${p.line};display:flex;gap:20px;font-size:.78rem;color:#94a3b8;">
        <span>📅 ${dateStr}</span>
        <span>📖 ملخص شامل</span>
        <span>🌐 mkt201.vercel.app</span>
      </div>
    </div>

    <div class="content">
  `);

  // ── Process each section ──
  const sections = page.querySelectorAll('.lo-section, .chapter');
  sections.forEach(section => {
    const loHeader = section.querySelector('.lo-header');

    if (loHeader) {
      const badge = loHeader.querySelector('.lo-badge')?.textContent || '';
      const title = loHeader.querySelector('.lo-title')?.textContent || '';
      w.document.write('<div class="lo-section-pdf">');
      w.document.write('<div class="lo-header-pdf"><span class="lo-badge-pdf">' + badge + '</span><span class="lo-title-pdf">' + title.trim() + '</span></div>');
    } else {
      w.document.write('<div class="ch-section-pdf">');
    }

    // Process ALL children in order to maintain document flow
    const body = section.querySelector('.lo-body') || section;
    const children = body.children;

    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      const cls = el.className || '';

      // ── H2 / H3 headings ──
      if (el.tagName === 'H2' || el.tagName === 'H3') {
        const arSpan = el.querySelector('.ar-line');
        const arText = arSpan ? arSpan.textContent : '';
        const mainText = el.textContent.replace(arText, '').trim();
        const tag = el.tagName === 'H2' ? 'h2' : 'h3';
        w.document.write('<' + tag + '>' + mainText);
        if (arText) w.document.write(' <span class="ar-inline">' + arText + '</span>');
        w.document.write('</' + tag + '>');
      }

      // ── Definitions ──
      else if (cls.includes('def-spotlight')) {
        const term = el.querySelector('.def-term')?.textContent || '';
        const bodyHTML = el.querySelector('.def-body')?.innerHTML || '';
        const ar = el.querySelector('.ar-line')?.textContent || '';
        w.document.write('<div class="def"><div class="def-t">' + term + '</div><div class="def-b">' + bodyHTML + '</div>');
        if (ar) w.document.write('<div class="def-ar">' + ar + '</div>');
        w.document.write('</div>');
      }

      // ── Concept rows (multiple concept cards) ──
      else if (cls.includes('concept-row')) {
        el.querySelectorAll('.concept-card').forEach(card => {
          const strong = card.querySelector('strong')?.textContent || '';
          const pEl = card.querySelector('p');
          let pText = '', arText = '';
          if (pEl) {
            const arSpan = pEl.querySelector('.ar-line');
            arText = arSpan ? arSpan.textContent : '';
            pText = pEl.innerHTML;
            if (arSpan) pText = pText.replace(arSpan.outerHTML, '');
          }
          w.document.write('<div class="cpt"><strong>' + strong + '</strong>');
          if (pText) w.document.write('<p>' + pText.trim() + '</p>');
          if (arText) w.document.write('<div class="ar">' + arText + '</div>');
          w.document.write('</div>');
        });
      }

      // ── Process flow (numbered steps) ──
      else if (cls.includes('process-flow')) {
        el.querySelectorAll('.process-step').forEach(step => {
          const num = step.querySelector('.process-num')?.textContent || '';
          const contentEl = step.querySelector('.process-content');
          if (!contentEl) return;
          const strong = contentEl.querySelector('strong')?.textContent || '';
          const arLines = contentEl.querySelectorAll('.ar-line');
          const arMain = arLines[0]?.textContent || '';
          // Get paragraph text
          const pEl = contentEl.querySelector('p');
          let pText = '', pAr = '';
          if (pEl) {
            const pArSpan = pEl.querySelector('.ar-line');
            pAr = pArSpan ? pArSpan.textContent : '';
            pText = pEl.textContent.replace(pAr, '').trim();
          }
          w.document.write('<div class="step"><span class="step-n">' + num + '</span><div class="step-body"><strong>' + strong + '</strong>');
          if (arMain) w.document.write('<span class="ar">' + arMain + '</span>');
          if (pText) w.document.write('<div style="margin-top:4px;font-size:.84rem;color:var(--muted);">' + pText + '</div>');
          if (pAr) w.document.write('<span class="ar">' + pAr + '</span>');
          w.document.write('</div></div>');
        });
      }

      // ── Exam tip ──
      else if (cls.includes('exam-tip')) {
        const arSpan = el.querySelector('.ar-line');
        const arText = arSpan ? arSpan.textContent : '';
        let mainHTML = el.innerHTML;
        if (arSpan) mainHTML = mainHTML.replace(arSpan.outerHTML, '');
        w.document.write('<div class="tip">' + mainHTML);
        if (arText) w.document.write('<span class="ar">' + arText + '</span>');
        w.document.write('</div>');
      }

      // ── Memory box ──
      else if (cls.includes('memory-box')) {
        w.document.write('<div class="memo">' + el.innerHTML + '</div>');
      }

      // ── Master grid / Master cards ──
      else if (cls.includes('master-grid')) {
        el.querySelectorAll('.master-card').forEach(card => {
          const strong = card.querySelector('strong')?.textContent || '';
          const arSpan = card.querySelector('.ar-line');
          const arText = arSpan ? arSpan.textContent : '';
          let bodyText = card.textContent.replace(strong, '').replace(arText, '').trim();
          w.document.write('<div class="mcard"><strong>' + strong + '</strong><div style="font-size:.84rem;color:var(--muted);margin-top:2px;">' + bodyText + '</div>');
          if (arText) w.document.write('<span class="ar">' + arText + '</span>');
          w.document.write('</div>');
        });
      }

      // ── Standalone master card ──
      else if (cls.includes('master-card')) {
        const strong = el.querySelector('strong')?.textContent || '';
        const arSpan = el.querySelector('.ar-line');
        const arText = arSpan ? arSpan.textContent : '';
        let bodyText = el.textContent.replace(strong, '').replace(arText, '').trim();
        w.document.write('<div class="mcard"><strong>' + strong + '</strong><div style="font-size:.84rem;color:var(--muted);margin-top:2px;">' + bodyText + '</div>');
        if (arText) w.document.write('<span class="ar">' + arText + '</span>');
        w.document.write('</div>');
      }

      // ── Summary / Key points boxes ──
      else if (cls.includes('summary-box') || cls.includes('key-points-box')) {
        w.document.write('<div class="hbox">' + el.innerHTML + '</div>');
      }

      // ── Example box ──
      else if (cls.includes('example-box')) {
        w.document.write('<div class="ebox">' + el.innerHTML + '</div>');
      }

      // ── Pro tip ──
      else if (cls.includes('pro-tip')) {
        const arSpan = el.querySelector('.ar-line');
        const arText = arSpan ? arSpan.textContent : '';
        let mainHTML = el.innerHTML;
        if (arSpan) mainHTML = mainHTML.replace(arSpan.outerHTML, '');
        w.document.write('<div class="ebox">' + mainHTML);
        if (arText) w.document.write('<span class="ar" style="color:' + p.exAccent + ';">' + arText + '</span>');
        w.document.write('</div>');
      }

      // ── Tables ──
      else if (cls.includes('ref-table') || el.tagName === 'TABLE') {
        w.document.write(el.outerHTML);
      }

      // ── Notes grid ──
      else if (cls.includes('ch-notes-grid')) {
        el.querySelectorAll('.ch-note-item').forEach(note => {
          const num = note.querySelector('.ch-note-num')?.textContent || '';
          const div = note.querySelector('div');
          const content = div ? div.innerHTML : note.innerHTML;
          w.document.write('<div class="note"><span class="note-n">' + num + '</span><div class="note-b">' + content + '</div></div>');
        });
      }

      // ── Slide bullets ──
      else if (cls.includes('slide-bullets')) {
        w.document.write('<div class="hbox">' + el.innerHTML + '</div>');
      }

      // ── Bilingual box ──
      else if (cls.includes('bilingual')) {
        w.document.write('<div class="hbox">' + el.innerHTML + '</div>');
      }
    }

    w.document.write('</div>');
  });

  w.document.write('<div class="footer">MKT 201 Study Hub — ملخص شامل · mkt201.vercel.app · ' + dateStr + '</div>');
  w.document.write('</div></body></html>');
  w.document.close();
}

// ═══════════════════════════════════════════════
//  FEATURE: SHARE RESULT AS IMAGE
// ═══════════════════════════════════════════════
function shareResult(mode) {
  const canvas = document.getElementById('share-canvas');
  const ctx    = canvas.getContext('2d');
  const W = 600, H = 400;
  canvas.width = W; canvas.height = H;

  // Get data
  let score, correct, wrong, timeText;
  if (mode === 'mock') {
    score   = document.getElementById('mock-result-pct')?.textContent || '—';
    correct = document.getElementById('mock-result-correct')?.textContent || '—';
    wrong   = document.getElementById('mock-result-wrong')?.textContent || '—';
    timeText = document.getElementById('mock-result-time')?.textContent || '—';
  } else if (mode === 'challenge') {
    score   = document.getElementById('challenge-result-pct')?.textContent || '—';
    correct = document.getElementById('challenge-result-correct')?.textContent || '—';
    wrong   = document.getElementById('challenge-result-wrong')?.textContent || '—';
    timeText = document.getElementById('challenge-result-time')?.textContent || '—';
  } else {
    score   = document.getElementById('result-pct')?.textContent || '—';
    correct = document.getElementById('result-correct')?.textContent || '—';
    wrong   = document.getElementById('result-wrong')?.textContent || '—';
    timeText = document.getElementById('result-time')?.textContent || '—';
  }
  const scoreNum = parseInt(score) || 0;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#062320');
  grad.addColorStop(1, '#0d3d38');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Decorative circles
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = '#14b8a6';
  ctx.beginPath(); ctx.arc(500, 80, 120, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(100, 350, 80, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 1;

  // Title
  ctx.fillStyle = '#14b8a6';
  ctx.font = 'bold 18px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MKT 201 Study Hub', W/2, 45);

  const modeLabel = mode === 'mock' ? 'Mock Exam' : mode === 'challenge' ? 'Challenge' : 'Quiz';
  ctx.fillStyle = '#5eead4';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText(modeLabel + ' Result', W/2, 70);

  // Score circle
  const cx = W/2, cy = 175, r = 65;
  const scoreColor = scoreNum >= 85 ? '#16a34a' : scoreNum >= 70 ? '#d97706' : scoreNum >= 55 ? '#ea580c' : '#dc2626';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
  ctx.fillStyle = scoreColor; ctx.globalAlpha = 0.2; ctx.fill();
  ctx.globalAlpha = 1;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
  ctx.strokeStyle = scoreColor; ctx.lineWidth = 4; ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 42px Inter, sans-serif';
  ctx.fillText(score, cx, cy + 12);
  ctx.font = '13px Inter, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Score', cx, cy + 32);

  // Stats
  const stats = [
    { label: 'Correct', value: correct, color: '#4ade80' },
    { label: 'Wrong', value: wrong, color: '#f87171' },
    { label: 'Time', value: timeText, color: '#67e8f9' },
  ];
  stats.forEach((s, i) => {
    const sx = 120 + i * 180;
    ctx.fillStyle = s.color;
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillText(s.value, sx, 300);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText(s.label, sx, 320);
  });

  // Footer
  ctx.fillStyle = '#475569';
  ctx.font = '11px Inter, sans-serif';
  ctx.fillText('mkt201.vercel.app', W/2, 375);

  // Download or share
  canvas.toBlob(async (blob) => {
    const file = new File([blob], 'mkt201-result.png', { type: 'image/png' });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'MKT 201 Result', text: `حصلت على ${score} في MKT 201! 🎓` });
      } catch (e) { downloadShareImage(blob); }
    } else {
      downloadShareImage(blob);
    }
  }, 'image/png');
}

function downloadShareImage(blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'mkt201-result.png';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ═══════════════════════════════════════════════
//  FEATURE: PERFORMANCE ANALYSIS (Charts)
// ═══════════════════════════════════════════════
const SESSION_LOG_KEY = 'mkt201_sessionLog';

function logSession(ch, score, correct, wrong) {
  const log = JSON.parse(localStorage.getItem(SESSION_LOG_KEY) || '[]');
  log.push({ ch, score, correct, wrong, date: Date.now() });
  if (log.length > 100) log.splice(0, log.length - 100);
  localStorage.setItem(SESSION_LOG_KEY, JSON.stringify(log));
}

function renderPerformancePage() {
  renderPerformanceChart();
  renderWeakConcepts();
  renderSessionLog();
}

function renderPerformanceChart() {
  const canvas = document.getElementById('perf-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const log = JSON.parse(localStorage.getItem(SESSION_LOG_KEY) || '[]');
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.clientWidth, H = 300;
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.scale(dpr, dpr);

  const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  ctx.fillStyle = isDark ? '#0a1c1a' : '#fff';
  ctx.fillRect(0, 0, W, H);

  if (log.length < 2) {
    ctx.fillStyle = isDark ? '#6aada8' : '#666';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('أكمل كويزين على الأقل لترى الرسم البياني', W/2, H/2);
    return;
  }

  const pad = { top: 30, right: 20, bottom: 40, left: 45 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const last20 = log.slice(-20);

  // Grid lines
  ctx.strokeStyle = isDark ? '#0d2c29' : '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (ch / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cw, y); ctx.stroke();
    ctx.fillStyle = isDark ? '#6aada8' : '#999';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText((100 - i * 25) + '%', pad.left - 6, y + 4);
  }

  // Line chart
  ctx.beginPath();
  ctx.strokeStyle = '#14b8a6'; ctx.lineWidth = 2.5;
  last20.forEach((s, i) => {
    const x = pad.left + (cw / (last20.length - 1)) * i;
    const y = pad.top + ch - (s.score / 100) * ch;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Dots
  last20.forEach((s, i) => {
    const x = pad.left + (cw / (last20.length - 1)) * i;
    const y = pad.top + ch - (s.score / 100) * ch;
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI*2);
    ctx.fillStyle = s.score >= 85 ? '#16a34a' : s.score >= 70 ? '#d97706' : '#dc2626';
    ctx.fill();
  });

  // X axis labels
  ctx.fillStyle = isDark ? '#6aada8' : '#999';
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'center';
  last20.forEach((s, i) => {
    if (last20.length <= 10 || i % 2 === 0) {
      const x = pad.left + (cw / (last20.length - 1)) * i;
      const d = new Date(s.date);
      ctx.fillText(`${d.getMonth()+1}/${d.getDate()}`, x, H - 10);
    }
  });
}

function renderWeakConcepts() {
  const el = document.getElementById('perf-weak-concepts');
  if (!el) return;
  const m = getMastery();
  const weak = [];
  allQuestions.forEach(q => {
    const key = q.q.slice(0, 60);
    const rec = m[key];
    if (rec && rec.wrong > 0) {
      weak.push({ q: q.q, ch: q.ch, wrong: rec.wrong, correct: rec.correct, exp: q.exp });
    }
  });
  weak.sort((a, b) => b.wrong - a.wrong);
  const top10 = weak.slice(0, 10);
  const chNames = { ch1:'Ch1', ch2:'Ch2', ch3:'Ch3', ch5:'Ch5' };
  if (top10.length === 0) {
    el.innerHTML = '<p style="color:var(--muted);text-align:center;padding:20px;">لا يوجد أسئلة غلطت فيها بعد 👏</p>';
    return;
  }
  el.innerHTML = top10.map((w, i) => `
    <div style="background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:14px;margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-size:.75rem;font-weight:700;color:var(--accent);background:var(--accent-soft);padding:2px 8px;border-radius:6px;">${chNames[w.ch]||w.ch}</span>
        <span style="font-size:.8rem;color:#dc2626;font-weight:700;">✗ ${w.wrong} مرة</span>
      </div>
      <p style="font-size:.9rem;font-weight:600;line-height:1.6;">${w.q.substring(0,120)}${w.q.length>120?'...':''}</p>
      ${w.exp ? `<p style="font-size:.8rem;color:var(--muted);margin-top:6px;direction:rtl;">${w.exp.substring(0,150)}...</p>` : ''}
    </div>
  `).join('');
}

function renderSessionLog() {
  const el = document.getElementById('perf-session-log');
  if (!el) return;
  const log = JSON.parse(localStorage.getItem(SESSION_LOG_KEY) || '[]');
  if (log.length === 0) {
    el.innerHTML = '<p style="color:var(--muted);text-align:center;padding:20px;">لا يوجد جلسات مسجلة بعد</p>';
    return;
  }
  const chNames = { ch1:'الفصل 1', ch2:'الفصل 2', ch3:'الفصل 3', ch5:'الفصل 5', all:'الكل' };
  el.innerHTML = '<div style="display:flex;flex-direction:column;gap:8px;">' +
    log.slice().reverse().slice(0, 20).map(s => {
      const d = new Date(s.date);
      const dateStr = d.toLocaleDateString('ar-SA', { month:'short', day:'numeric' }) + ' · ' + d.toLocaleTimeString('en', { hour:'2-digit', minute:'2-digit' });
      const col = s.score >= 85 ? '#16a34a' : s.score >= 70 ? '#d97706' : '#dc2626';
      return `<div style="display:flex;justify-content:space-between;align-items:center;background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:10px 14px;">
        <div><span style="font-weight:700;color:${col};">${s.score}%</span> <span style="color:var(--muted);font-size:.8rem;">· ${chNames[s.ch]||s.ch}</span></div>
        <div style="font-size:.8rem;color:var(--muted);">${dateStr}</div>
      </div>`;
    }).join('') + '</div>';
}

// ═══════════════════════════════════════════════
//  FEATURE: SPACED REPETITION
// ═══════════════════════════════════════════════
const SPACED_KEY = 'mkt201_spaced';

function getSpacedData() {
  try { return JSON.parse(localStorage.getItem(SPACED_KEY)) || {}; } catch { return {}; }
}

function saveSpacedData(data) {
  localStorage.setItem(SPACED_KEY, JSON.stringify(data));
}

function markSpacedQuestion(qText, correct) {
  const data = getSpacedData();
  const key  = qText.slice(0, 60);
  const now  = Date.now();
  if (!data[key]) data[key] = { interval: 1, nextReview: now, correct: 0, wrong: 0 };
  if (correct) {
    data[key].correct++;
    data[key].interval = Math.min(data[key].interval * 2, 30);
    data[key].nextReview = now + data[key].interval * 24 * 60 * 60 * 1000;
  } else {
    data[key].wrong++;
    data[key].interval = 1;
    data[key].nextReview = now + 24 * 60 * 60 * 1000;
  }
  saveSpacedData(data);
}

function getDueQuestions() {
  const data = getSpacedData();
  const now  = Date.now();
  const due  = [];
  allQuestions.forEach(q => {
    const key = q.q.slice(0, 60);
    const rec = data[key];
    if (rec && rec.nextReview <= now && rec.wrong > 0) {
      due.push(q);
    }
  });
  return due;
}

function getNewWrongQuestions() {
  const data = getSpacedData();
  const m    = getMastery();
  const newWrong = [];
  allQuestions.forEach(q => {
    const key = q.q.slice(0, 60);
    const rec = m[key];
    if (rec && rec.wrong > 0 && !data[key]) {
      newWrong.push(q);
    }
  });
  return newWrong;
}

function renderSpacedPage() {
  const due     = getDueQuestions();
  const newWrong = getNewWrongQuestions();
  const all     = [...due, ...newWrong];
  const countEl = document.getElementById('spaced-due-count');
  const cardsEl = document.getElementById('spaced-cards');
  const emptyEl = document.getElementById('spaced-empty');
  const startBtn = document.getElementById('spaced-start-btn');

  if (countEl) countEl.textContent = all.length > 0 ? `📋 ${all.length} سؤال يحتاج مراجعة` : '';
  if (all.length === 0) {
    if (cardsEl) cardsEl.style.display = 'none';
    if (emptyEl) emptyEl.style.display = 'block';
    if (startBtn) startBtn.style.display = 'none';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  if (cardsEl) cardsEl.style.display = 'flex';
  if (startBtn) startBtn.style.display = '';

  const chNames = { ch1:'Ch1', ch2:'Ch2', ch3:'Ch3', ch5:'Ch5' };
  const spacedData = getSpacedData();
  if (cardsEl) cardsEl.innerHTML = all.slice(0, 10).map(q => {
    const key = q.q.slice(0, 60);
    const rec = spacedData[key];
    const interval = rec ? `كل ${rec.interval} يوم` : 'جديد';
    return `<div style="background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:14px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span style="font-size:.75rem;font-weight:700;color:var(--accent);background:var(--accent-soft);padding:2px 8px;border-radius:6px;">${chNames[q.ch]||q.ch}</span>
        <span style="font-size:.75rem;color:var(--muted);">🔄 ${interval}</span>
      </div>
      <p style="font-size:.9rem;font-weight:600;line-height:1.6;">${q.q.substring(0,100)}${q.q.length>100?'...':''}</p>
    </div>`;
  }).join('');
}

function startSpacedQuiz() {
  const due     = getDueQuestions();
  const newWrong = getNewWrongQuestions();
  const all     = shuffle([...due, ...newWrong]);
  if (all.length === 0) { alert('لا يوجد أسئلة للمراجعة حالياً!'); return; }
  const pick = all.slice(0, Math.min(20, all.length));
  quizState.questions    = pick;
  quizState.current      = 0;
  quizState.answers      = new Array(pick.length).fill(null);
  quizState.startTime    = Date.now();
  quizState.ch           = 'all';
  quizState.trainingMode = false;
  quizState._levelIdx    = undefined;
  showPage('page-quiz');
  document.querySelector('.quiz-setup')?.classList.remove('active');
  document.querySelector('.quiz-run')?.classList.add('active');
  document.querySelector('.quiz-result')?.classList.remove('active');
  renderQuizQuestion();
}

// ═══════════════════════════════════════════════
//  FEATURE: CHALLENGE MODE
// ═══════════════════════════════════════════════
let challengeState = {
  questions: [], current: 0, answers: [], startTime: null,
  timeLimit: 0, timer: null, seed: 0
};

function seededRandom(seed) {
  return function() {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function seededShuffle(arr, seed) {
  const rng = seededRandom(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createChallenge() {
  const count = parseInt(document.getElementById('challenge-count')?.value || '15');
  const time  = parseInt(document.getElementById('challenge-time')?.value || '10');
  const seed  = Math.floor(Math.random() * 999999) + 1;
  const questions = seededShuffle(allQuestions, seed).slice(0, count);

  challengeState = {
    questions, current: 0, answers: new Array(questions.length).fill(null),
    startTime: null, timeLimit: time * 60, timer: null, seed
  };

  const params = `seed=${seed}&count=${count}&time=${time}`;
  const url = window.location.origin + window.location.pathname + '?' + params;

  const linkInput = document.getElementById('challenge-link-input');
  const linkBox   = document.getElementById('challenge-link-box');
  if (linkInput) linkInput.value = url;
  if (linkBox) linkBox.style.display = 'block';
  document.getElementById('challenge-setup').style.display = '';
  document.getElementById('challenge-run').style.display = 'none';
  document.getElementById('challenge-result').style.display = 'none';
}

function copyChallengeLink() {
  const input = document.getElementById('challenge-link-input');
  if (input) {
    navigator.clipboard.writeText(input.value).then(() => {
      const btn = event.target;
      btn.textContent = '✅ تم النسخ!';
      setTimeout(() => btn.textContent = '📋 نسخ الرابط', 2000);
    });
  }
}

function shareChallengeLink() {
  const input = document.getElementById('challenge-link-input');
  if (navigator.share && input) {
    navigator.share({ title: 'MKT 201 Challenge', text: 'تحداني في MKT 201! 🎓⚔️', url: input.value });
  } else {
    copyChallengeLink();
  }
}

function startChallengeFromURL() {
  const params = new URLSearchParams(window.location.search);
  const seed  = parseInt(params.get('seed'));
  const count = parseInt(params.get('count'));
  const time  = parseInt(params.get('time'));
  if (!seed || !count) return false;

  const questions = seededShuffle(allQuestions, seed).slice(0, count);
  challengeState = {
    questions, current: 0, answers: new Array(questions.length).fill(null),
    startTime: Date.now(), timeLimit: time * 60, timer: null, seed
  };

  showPage('page-challenge');
  document.getElementById('challenge-setup').style.display = 'none';
  document.getElementById('challenge-run').style.display = '';
  document.getElementById('challenge-result').style.display = 'none';

  if (time > 0) {
    challengeState.timer = setInterval(challengeTick, 1000);
  }
  renderChallengeQuestion();
  return true;
}

function challengeTick() {
  const elapsed = Math.round((Date.now() - challengeState.startTime) / 1000);
  const remaining = challengeState.timeLimit - elapsed;
  const timerEl = document.getElementById('challenge-timer');
  if (timerEl) {
    if (remaining <= 0) {
      finishChallenge();
    } else {
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      timerEl.textContent = `⏱️ ${m}:${String(s).padStart(2,'0')}`;
      if (remaining <= 30) timerEl.style.color = '#dc2626';
    }
  }
}

function renderChallengeQuestion() {
  const q  = challengeState.questions[challengeState.current];
  const ci = challengeState.current;
  const total = challengeState.questions.length;

  const counterEl = document.getElementById('challenge-counter');
  if (counterEl) counterEl.textContent = `سؤال ${ci+1} / ${total}`;

  const qTextEl = document.getElementById('challenge-q-text');
  if (qTextEl) qTextEl.innerHTML = q.q;

  const optEl = document.getElementById('challenge-options');
  if (optEl) optEl.innerHTML = q.opts.map((opt, i) =>
    `<button class="quiz-opt-btn" onclick="selectChallengeAnswer(${i})" style="margin-bottom:8px;">${String.fromCharCode(65+i)}. ${opt}</button>`
  ).join('');
}

function selectChallengeAnswer(idx) {
  if (challengeState.answers[challengeState.current] !== null) return;
  challengeState.answers[challengeState.current] = idx;
  const q = challengeState.questions[challengeState.current];
  const btns = document.querySelectorAll('#challenge-options .quiz-opt-btn');
  btns.forEach((btn, i) => {
    btn.onclick = null;
    if (i === q.ans) btn.classList.add('correct');
    else if (i === idx && idx !== q.ans) btn.classList.add('wrong');
  });
  setTimeout(() => {
    challengeState.current++;
    if (challengeState.current >= challengeState.questions.length) {
      finishChallenge();
    } else {
      renderChallengeQuestion();
    }
  }, 800);
}

function finishChallenge() {
  if (challengeState.timer) { clearInterval(challengeState.timer); challengeState.timer = null; }
  const qs = challengeState.questions;
  let correct = 0;
  qs.forEach((q, i) => { if (challengeState.answers[i] === q.ans) correct++; });
  const wrong = qs.length - correct;
  const score = Math.round((correct / qs.length) * 100);
  const elapsed = Math.round((Date.now() - challengeState.startTime) / 1000);

  document.getElementById('challenge-run').style.display = 'none';
  document.getElementById('challenge-result').style.display = '';
  document.getElementById('challenge-result-pct').textContent = score + '%';
  document.getElementById('challenge-result-correct').textContent = correct;
  document.getElementById('challenge-result-wrong').textContent = wrong;
  document.getElementById('challenge-result-time').textContent = formatTime(elapsed);

  const col = score >= 85 ? '#16a34a' : score >= 70 ? '#d97706' : score >= 55 ? '#ea580c' : '#dc2626';
  const circle = document.getElementById('challenge-result-circle');
  if (circle) {
    circle.style.background = `linear-gradient(135deg, ${col}dd, ${col})`;
    circle.style.boxShadow = `0 12px 32px ${col}44`;
  }
  const msg = score >= 85 ? '🌟 أداء ممتاز!' : score >= 70 ? '✅ أداء جيد!' : score >= 55 ? '📚 لا بأس، راجع أكثر' : '💪 حاول مرة ثانية';
  document.getElementById('challenge-result-msg').textContent = msg;
}

// ═══════════════════════════════════════════════
//  FEATURE: SMART REMINDERS
// ═══════════════════════════════════════════════
const LAST_VISIT_KEY  = 'mkt201_lastVisit';
const EXAM_DATE_MKT   = new Date('2026-04-20T00:00:00');

function checkReminders() {
  const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_KEY) || '0');
  const now = Date.now();
  localStorage.setItem(LAST_VISIT_KEY, now);
  if (!lastVisit) return;

  const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  const daysToExam = Math.ceil((EXAM_DATE_MKT.getTime() - now) / (1000 * 60 * 60 * 24));

  let msg = '';
  if (daysToExam <= 0) return;
  if (daysSince >= 3) {
    msg = `⏰ ما راجعت من ${daysSince} أيام! باقي ${daysToExam} يوم على الاختبار`;
  } else if (daysToExam <= 3) {
    msg = `🔥 باقي ${daysToExam} يوم فقط على الاختبار! وقت المراجعة النهائية`;
  } else if (daysToExam <= 7) {
    msg = `📚 باقي ${daysToExam} أيام على الاختبار — استمر بالمراجعة!`;
  }

  if (msg) {
    const toast = document.getElementById('reminder-toast');
    const textEl = document.getElementById('reminder-toast-text');
    if (toast && textEl) {
      textEl.textContent = msg;
      toast.style.display = 'flex';
      setTimeout(() => { toast.style.display = 'none'; }, 10000);
    }
  }
}

// ═══════════════════════════════════════════════
//  FEATURE: "EXPLAIN MORE" BUTTON ON WRONG ANSWERS
// ═══════════════════════════════════════════════
// Enhance showExplanation to include expW (wrong explanations)
const _origShowExplanation = typeof showExplanation === 'function' ? showExplanation : null;

// ═══════════════════════════════════════════════
//  HOOK: Log sessions for performance tracking
// ═══════════════════════════════════════════════
const _origSaveQuizResult = saveQuizResult;
saveQuizResult = async function(ch, score, correct, wrong, elapsed) {
  logSession(ch, score, correct, wrong);
  // Update spaced repetition data
  const qs = quizState.questions || [];
  const ans = quizState.answers || [];
  qs.forEach((q, i) => {
    if (q._retry) return;
    if (ans[i] !== null && ans[i] !== undefined) {
      markSpacedQuestion(q.q, ans[i] === q.ans);
    }
  });
  return _origSaveQuizResult(ch, score, correct, wrong, elapsed);
};

// ═══════════════════════════════════════════════
//  FEATURE: POMODORO TIMER
// ═══════════════════════════════════════════════
const POMO_KEY = 'mkt201_pomo';
const POMO_DURATIONS = { work: 25*60, short: 5*60, long: 15*60 };
let pomoState = { mode: 'work', timeLeft: POMO_DURATIONS.work, running: false, timer: null, session: 1, totalSessions: 4 };

function pomoGetStats() {
  try { return JSON.parse(localStorage.getItem(POMO_KEY)) || { today: '', sessions: 0, minutes: 0, total: 0 }; } catch { return { today: '', sessions: 0, minutes: 0, total: 0 }; }
}
function pomoSaveStats(s) { localStorage.setItem(POMO_KEY, JSON.stringify(s)); }

function pomoRenderStats() {
  const s = pomoGetStats();
  const today = new Date().toDateString();
  if (s.today !== today) { s.sessions = 0; s.minutes = 0; s.today = today; pomoSaveStats(s); }
  const el = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  el('pomo-today-sessions', s.sessions);
  el('pomo-today-minutes', s.minutes);
  el('pomo-total-sessions', s.total);
  // Render dots
  const dotsEl = document.getElementById('pomo-dots');
  if (dotsEl) {
    dotsEl.innerHTML = Array.from({length: pomoState.totalSessions}, (_, i) =>
      `<div style="width:12px;height:12px;border-radius:50%;${i < pomoState.session - 1 ? 'background:var(--accent);' : 'background:var(--line);'}"></div>`
    ).join('');
  }
}

function pomoUpdateDisplay() {
  const m = Math.floor(pomoState.timeLeft / 60);
  const s = pomoState.timeLeft % 60;
  const el = document.getElementById('pomo-time');
  if (el) el.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  const btn = document.getElementById('pomo-start-btn');
  if (btn) btn.textContent = pomoState.running ? '⏸️ إيقاف' : '▶️ ابدأ';
  const statusEl = document.getElementById('pomo-status');
  if (statusEl) {
    if (pomoState.mode === 'work') statusEl.textContent = pomoState.running ? '🎯 وقت الدراسة' : 'جاهز للدراسة';
    else if (pomoState.mode === 'short') statusEl.textContent = pomoState.running ? '☕ استراحة قصيرة' : 'استراحة قصيرة';
    else statusEl.textContent = pomoState.running ? '🌴 استراحة طويلة' : 'استراحة طويلة';
  }
  const countEl = document.getElementById('pomo-session-count');
  if (countEl) countEl.textContent = `الجلسة ${pomoState.session} من ${pomoState.totalSessions}`;
}

function pomoToggle() {
  if (pomoState.running) {
    clearInterval(pomoState.timer);
    pomoState.running = false;
  } else {
    pomoState.running = true;
    pomoState.timer = setInterval(pomoTick, 1000);
  }
  pomoUpdateDisplay();
}

function pomoTick() {
  pomoState.timeLeft--;
  if (pomoState.timeLeft <= 0) {
    clearInterval(pomoState.timer);
    pomoState.running = false;
    // Play notification sound
    try { const a = new AudioContext(); const o = a.createOscillator(); const g = a.createGain(); o.connect(g); g.connect(a.destination); o.frequency.value = 800; g.gain.value = 0.3; o.start(); setTimeout(() => { o.stop(); a.close(); }, 300); } catch(e) {}
    if (pomoState.mode === 'work') {
      // Complete a work session
      const s = pomoGetStats();
      const today = new Date().toDateString();
      if (s.today !== today) { s.sessions = 0; s.minutes = 0; s.today = today; }
      s.sessions++;
      s.minutes += 25;
      s.total++;
      pomoSaveStats(s);
      pomoRenderStats();
      // Auto switch to break
      if (pomoState.session >= pomoState.totalSessions) {
        pomoSetMode('long');
        pomoState.session = 1;
      } else {
        pomoSetMode('short');
        pomoState.session++;
      }
      alert('🎉 أحسنت! خلص وقت الدراسة — خذ استراحة');
    } else {
      // Break finished
      pomoSetMode('work');
      alert('⏰ خلصت الاستراحة — يلا نرجع ندرس!');
    }
    pomoRenderStats();
  }
  pomoUpdateDisplay();
}

function pomoSetMode(mode) {
  clearInterval(pomoState.timer);
  pomoState.running = false;
  pomoState.mode = mode;
  pomoState.timeLeft = POMO_DURATIONS[mode];
  pomoUpdateDisplay();
  // Update button styles
  ['work','short','long'].forEach(m => {
    const btn = document.getElementById('pomo-btn-' + m);
    if (btn) {
      if (m === mode) { btn.style.borderColor = 'var(--accent)'; btn.style.color = 'var(--accent)'; }
      else { btn.style.borderColor = ''; btn.style.color = ''; }
    }
  });
}

function pomoReset() {
  clearInterval(pomoState.timer);
  pomoState = { mode: 'work', timeLeft: POMO_DURATIONS.work, running: false, timer: null, session: 1, totalSessions: 4 };
  pomoUpdateDisplay();
  pomoRenderStats();
  pomoSetMode('work');
}

function pomoToggleWidget() {
  const w = document.getElementById('pomo-widget');
  if (!w) return;
  const visible = w.style.display !== 'none';
  w.style.display = visible ? 'none' : 'block';
  if (!visible) { pomoUpdateDisplay(); pomoRenderStats(); }
}

// ═══════════════════════════════════════════════
//  CHAPTER BINDER PDF EXPORT
// ═══════════════════════════════════════════════
function exportChapterBinder(pageId, chapterTitle) {
  const page = document.getElementById(pageId);
  if (!page) return;

  const dateStr = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});

  // ── Color palette (teal-adapted from BUS 214) ──────────────────
  const C = {
    c1:'#0F766E', c2:'#0D9488',
    bg1:'#F0FDFA', bg2:'#CCFBF1', line:'#99F6E4',
    ink:'#1C1917', muted:'#78716C',
    tipBg:'#FFFBEB', tipBorder:'#FDE68A', tipAccent:'#D97706', tipText:'#92400E',
    memoBg:'#F0FDFA', memoBorder:'#99F6E4', memoAccent:'#0F766E', memoText:'#134E4A',
    shadow:'rgba(0,0,0,.06)', shadowSm:'rgba(0,0,0,.03)'
  };

  // ── Helpers ────────────────────────────────────────────────────
  // Extract .ar-line spans from a cloned element, return {mainHtml, arText}
  function extractAr(el) {
    const c = el.cloneNode(true);
    c.querySelectorAll('[data-lucide], i[class*="lucide"]').forEach(e => e.remove());
    const arLines = c.querySelectorAll('.ar-line');
    const arParts = [];
    arLines.forEach(a => { arParts.push(a.textContent.trim()); a.remove(); });
    return { mainHtml: c.innerHTML, arText: arParts.join(' ') };
  }

  function arDiv(text) {
    if (!text || !text.trim()) return '';
    return `<div class="ar">${text}</div>`;
  }

  // ── DOM walker: converts children of a container to PDF HTML ───
  function walkChildren(container) {
    let html = '';
    for (const el of container.children) {
      const tag = el.tagName;
      const cls = el.className || '';

      // Skip interactive / header elements
      if (tag === 'BUTTON' || cls.includes('lo-arrow') || cls.includes('notes-binder-btn')) continue;
      if (tag === 'SECTION' || cls.includes('hero')) continue;

      if (tag === 'H3') {
        const { mainHtml, arText } = extractAr(el);
        html += `<h3>${mainHtml}${arText ? ` <span class="ar-inline">${arText}</span>` : ''}</h3>`;
      }

      else if (cls.includes('def-spotlight')) {
        const termEl = el.querySelector('.def-term');
        const bodyEl = el.querySelector('.def-body');
        const arSpan = el.querySelector('.ar-line');
        const termHtml = termEl ? termEl.innerHTML : '';
        let bodyHtml = '';
        if (bodyEl) {
          const bc = bodyEl.cloneNode(true);
          bc.querySelectorAll('.ar-line').forEach(a => a.remove());
          bodyHtml = bc.innerHTML;
        }
        const arText = arSpan ? arSpan.textContent.trim() : '';
        html += `<div class="block"><div class="block-term">${termHtml}</div><div class="block-body">${bodyHtml}</div>${arDiv(arText)}</div>`;
      }

      else if (cls.includes('concept-row')) {
        html += '<div class="concept-row">';
        for (const card of el.querySelectorAll('.concept-card')) {
          const color = ['teal','blue','purple','amber','rose','green'].find(c => card.classList.contains(c)) || '';
          const { mainHtml, arText } = extractAr(card);
          html += `<div class="block concept-block ${color}">${mainHtml}${arDiv(arText)}</div>`;
        }
        html += '</div>';
      }

      else if (cls.includes('concept-card')) {
        const color = ['teal','blue','purple','amber','rose','green'].find(c => el.classList.contains(c)) || '';
        const { mainHtml, arText } = extractAr(el);
        html += `<div class="block concept-block ${color}">${mainHtml}${arDiv(arText)}</div>`;
      }

      else if (cls.includes('process-flow')) {
        for (const step of el.querySelectorAll('.process-step')) {
          const numEl = step.querySelector('.process-num');
          const contentEl = step.querySelector('.process-content') || step;
          const numText = numEl ? numEl.textContent.trim() : '';
          const cc = contentEl.cloneNode(true);
          cc.querySelectorAll('.process-num, .ar-line').forEach(a => a.remove());
          const arSpan = contentEl.querySelector('.ar-line');
          const arText = arSpan ? arSpan.textContent.trim() : '';
          html += `<div class="step-card"><div class="step-badge">${numText}</div><div class="step-body">${cc.innerHTML}${arDiv(arText)}</div></div>`;
        }
      }

      else if (cls.includes('process-step')) {
        const numEl = el.querySelector('.process-num');
        const contentEl = el.querySelector('.process-content') || el;
        const numText = numEl ? numEl.textContent.trim() : '';
        const cc = contentEl.cloneNode(true);
        cc.querySelectorAll('.process-num, .ar-line').forEach(a => a.remove());
        const arSpan = contentEl.querySelector('.ar-line');
        const arText = arSpan ? arSpan.textContent.trim() : '';
        html += `<div class="step-card"><div class="step-badge">${numText}</div><div class="step-body">${cc.innerHTML}${arDiv(arText)}</div></div>`;
      }

      else if (cls.includes('memory-box')) {
        const { mainHtml, arText } = extractAr(el);
        html += `<div class="memo">💡 ${mainHtml}${arDiv(arText)}</div>`;
      }

      else if (cls.includes('exam-tip')) {
        const { mainHtml, arText } = extractAr(el);
        html += `<div class="tip">⭐ ${mainHtml}${arDiv(arText)}</div>`;
      }

      else if (cls.includes('master-card')) {
        const { mainHtml, arText } = extractAr(el);
        html += `<div class="block">${mainHtml}${arDiv(arText)}</div>`;
      }

      else if (tag === 'TABLE') {
        html += el.outerHTML;
      }

      else if (cls.includes('bcg-grid') || cls.includes('swot-grid')) {
        html += '<div class="two-col">';
        for (const cell of el.children) {
          const { mainHtml, arText } = extractAr(cell);
          html += `<div class="hbox">${mainHtml}${arDiv(arText)}</div>`;
        }
        html += '</div>';
      }

      else if (tag === 'UL' || tag === 'OL') {
        const { mainHtml } = extractAr(el);
        html += `<div class="block">${mainHtml}</div>`;
      }

      else if (tag === 'P') {
        const { mainHtml, arText } = extractAr(el);
        if (mainHtml.trim()) html += `<p>${mainHtml}${arDiv(arText)}</p>`;
      }

      else if (tag === 'H4') {
        const { mainHtml, arText } = extractAr(el);
        html += `<h4>${mainHtml}${arText ? ` <span class="ar-inline">${arText}</span>` : ''}</h4>`;
      }

      else if (cls.includes('example-box') || cls.includes('from-notes-wrap')) {
        // Notes-sourced content block — render as a styled card
        const badge = cls.includes('from-notes-wrap') ? '<span class="notes-badge">📝 من النوت</span>' : '';
        let inner = '';
        for (const child of el.children) {
          const ctag = child.tagName;
          const ccls = child.className || '';
          if (ccls.includes('from-notes-badge')) continue; // skip badge element itself
          if (ctag === 'H4') {
            const { mainHtml, arText } = extractAr(child);
            inner += `<h4>${mainHtml}${arText ? ` <span class="ar-inline">${arText}</span>` : ''}</h4>`;
          } else if (ctag === 'P') {
            const { mainHtml, arText } = extractAr(child);
            if (mainHtml.trim()) inner += `<p>${mainHtml}${arDiv(arText)}</p>`;
          } else if (ctag === 'UL' || ctag === 'OL') {
            const { mainHtml } = extractAr(child);
            inner += mainHtml;
          } else if (ccls.includes('ar-line')) {
            inner += arDiv(child.textContent.trim());
          } else if (ccls.includes('concept-row')) {
            inner += '<div class="concept-row">';
            for (const card of child.querySelectorAll('.concept-card')) {
              const color = ['teal','blue','purple','amber','rose','green'].find(c => card.classList.contains(c)) || '';
              const { mainHtml, arText } = extractAr(card);
              inner += `<div class="block concept-block ${color}">${mainHtml}${arDiv(arText)}</div>`;
            }
            inner += '</div>';
          } else {
            const { mainHtml, arText } = extractAr(child);
            if (mainHtml.trim()) inner += `<div>${mainHtml}${arDiv(arText)}</div>`;
          }
        }
        if (inner.trim()) html += `<div class="example-block">${badge}${inner}</div>`;
      }

      else if (cls.includes('ref-table')) {
        html += el.outerHTML;
      }

      else if (tag === 'DIV' && el.children.length > 0 && !cls.includes('ch-quiz') && !cls.includes('chq-') && !cls.includes('ch-notes')) {
        // Generic div fallback — recurse into it
        const inner = walkChildren(el);
        if (inner.trim()) html += inner;
      }
    }
    return html;
  }

  // ── Build content by walking top-level page children ──────────
  let contentHtml = '';
  for (const el of page.children) {
    const tag = el.tagName;
    const cls = el.className || '';

    if (tag === 'SECTION' || cls.includes('hero')) continue;
    if (tag === 'BUTTON' || cls.includes('notes-binder-btn')) continue;

    if (cls.includes('chapter')) {
      // Check if this is the Key Takeaways wrapper (contains ch-notes-box)
      const notesBox = el.querySelector('.ch-notes-box');
      if (notesBox) {
        const titleEl = notesBox.querySelector('.ch-notes-title');
        const titleText = titleEl ? titleEl.textContent.trim() : '📌 Key Takeaways';
        contentHtml += `<div class="section notes-section"><h3>${titleText}</h3><div class="two-col">`;
        for (const item of notesBox.querySelectorAll('.ch-note-item')) {
          const numEl = item.querySelector('.ch-note-num');
          const numText = numEl ? numEl.textContent.trim() : '';
          const noteAr = item.querySelector('.note-ar');
          const arText = noteAr ? noteAr.textContent.trim() : '';
          const ic = item.cloneNode(true);
          ic.querySelectorAll('.ch-note-num, .note-ar').forEach(a => a.remove());
          contentHtml += `<div class="step-card"><div class="step-badge">${numText}</div><div class="step-body">${ic.innerHTML}${arDiv(arText)}</div></div>`;
        }
        contentHtml += '</div></div>';
      } else {
        // Learning Objectives block
        const h2 = el.querySelector('h2');
        let h2Text = 'Learning Objectives';
        let h2Ar = '';
        if (h2) {
          const arSpan = h2.querySelector('.ar-line');
          h2Ar = arSpan ? arSpan.textContent.trim() : '';
          const hc = h2.cloneNode(true);
          hc.querySelectorAll('.ar-line, i, svg').forEach(a => a.remove());
          h2Text = hc.textContent.trim();
        }
        contentHtml += `<div class="section"><h3>${h2Text}${h2Ar ? ` <span class="ar-inline">${h2Ar}</span>` : ''}</h3>`;
        contentHtml += walkChildren(el);
        contentHtml += '</div>';
      }
    }

    else if (cls.includes('lo-section')) {
      const header = el.querySelector('.lo-header');
      const body   = el.querySelector('.lo-body');
      const badge  = header ? header.querySelector('.lo-badge') : null;
      const titleEl = header ? header.querySelector('.lo-title') : null;
      const badgeText = badge ? badge.textContent.trim() : '';
      // lo-title may contain inline Arabic span — just grab textContent
      const titleText = titleEl ? titleEl.textContent.trim() : '';
      contentHtml += '<div class="section">';
      contentHtml += `<h3><span class="lo-badge-pdf">${badgeText}</span> ${titleText}</h3>`;
      if (body) contentHtml += walkChildren(body);
      contentHtml += '</div>';
    }

  }

  // ── Open window and write ──────────────────────────────────────
  const w = window.open('', '_blank');
  if (!w) { alert('السماح بالنوافذ المنبثقة لتصدير PDF'); return; }

  w.document.write(`<!DOCTYPE html><html dir="ltr"><head>
<meta charset="UTF-8">
<title>MKT 201 — ${chapterTitle}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
<style>
@page { size: A4; margin: 8mm 10mm; }
:root { --c1:${C.c1};--c2:${C.c2};--bg1:${C.bg1};--bg2:${C.bg2};--line:${C.line};--ink:${C.ink};--muted:${C.muted}; }
* { box-sizing:border-box;margin:0;padding:0; }
body { font-family:'Inter',system-ui,sans-serif;color:var(--ink);line-height:1.4;font-size:9.5px;max-width:790px;margin:0 auto;background:#fff;-webkit-font-smoothing:antialiased; }
p { margin:2px 0; }
ul,ol { padding-left:14px;margin:2px 0; }
li { margin:1px 0; }
strong { font-weight:700; }
em { font-style:italic;color:var(--muted); }

/* ── Toolbar ── */
.toolbar { position:sticky;top:0;z-index:100;background:#fff;padding:8px 20px;border-bottom:2px solid var(--c1);display:flex;align-items:center;gap:12px;box-shadow:0 2px 6px ${C.shadow}; }
.toolbar-btn { background:var(--c1);color:#fff;border:none;padding:7px 20px;border-radius:8px;font-weight:700;cursor:pointer;font-size:.85rem;font-family:inherit; }
.toolbar .hint { color:var(--muted);font-size:.75rem; }

/* ── Content wrapper ── */
.content { padding:10px 18px 20px; }

/* ── Cover ── */
.binder-cover { padding:8px 0 7px;border-bottom:2px solid var(--c1);margin-bottom:10px; }
.binder-tag { display:inline-block;background:var(--c1);color:#fff;padding:2px 9px;border-radius:20px;font-size:.62rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;margin-bottom:5px; }
.binder-cover h1 { font-size:1.1rem;font-weight:900;color:var(--ink);margin:0 0 2px;line-height:1.25; }
.binder-sub { font-size:.74rem;color:var(--muted); }
.binder-meta { display:flex;gap:14px;font-size:.66rem;color:#A8A29E;margin-top:5px;padding-top:5px;border-top:1px solid #E7E5E4; }

/* ── Section ── */
.section { margin-bottom:9px; }
.section h3 { font-size:.84rem;font-weight:700;color:var(--c2);margin:8px 0 4px;padding-bottom:3px;border-bottom:1.5px solid var(--line); }
.lo-badge-pdf { display:inline-block;background:var(--c1);color:#fff;padding:1px 6px;border-radius:4px;font-size:.62rem;font-weight:800;margin-right:5px;vertical-align:middle; }
.ar-inline { font-family:'Cairo',sans-serif;color:var(--c1);font-size:.72rem;font-weight:600;direction:rtl; }
.notes-section h3 { color:var(--c1); }

/* ── Block card ── */
.block { background:#fff;border:1px solid var(--line);border-left:4px solid var(--c1);border-radius:7px;padding:5px 9px;margin:3px 0;page-break-inside:avoid; }
.block strong { color:var(--c1); }
.block em { color:var(--muted);font-style:italic; }
.block-term { font-weight:800;color:var(--c1);font-size:.84rem;margin-bottom:2px; }
.block-body { font-size:.83rem;color:var(--ink);line-height:1.4; }

/* ── Concept grid ── */
.concept-row { display:grid;grid-template-columns:1fr 1fr;gap:4px;margin:3px 0; }
.concept-block p { color:#44403C;margin:1px 0;font-size:.81rem; }
.concept-block.teal { border-left-color:#0F766E; }
.concept-block.teal strong { color:#0F766E; }
.concept-block.blue { border-left-color:#3B82F6; }
.concept-block.blue strong { color:#1D4ED8; }
.concept-block.purple { border-left-color:#7C3AED; }
.concept-block.purple strong { color:#5B21B6; }
.concept-block.amber { border-left-color:#D97706; }
.concept-block.amber strong { color:#92400E; }
.concept-block.rose { border-left-color:#E11D48; }
.concept-block.rose strong { color:#9F1239; }
.concept-block.green { border-left-color:#16A34A; }
.concept-block.green strong { color:#14532D; }

/* ── h4 headings ── */
h4 { font-size:.82rem;font-weight:700;color:var(--c1);margin:5px 0 2px; }

/* ── Example / from-notes block ── */
.example-block { background:var(--bg1);border:1px solid var(--line);border-left:4px solid var(--c2);border-radius:7px;padding:5px 9px;margin:3px 0;page-break-inside:avoid; }
.example-block h4 { color:var(--c2);margin-bottom:3px; }
.example-block p { font-size:.83rem;color:var(--ink);margin:2px 0; }
.example-block ul,.example-block ol { padding-left:14px;font-size:.83rem;color:var(--ink); }
.notes-badge { display:inline-block;background:#fef3c7;color:#92400e;border:1px solid #fcd34d;border-radius:20px;padding:0px 6px;font-size:.6rem;font-weight:700;margin-bottom:3px; }

/* ── Arabic block ── */
.ar { direction:rtl;text-align:right;font-family:'Cairo',sans-serif;color:var(--c2);font-size:.79rem;font-weight:600;line-height:1.6;margin-top:3px;padding:3px 8px;background:var(--bg1);border-radius:5px;border-right:3px solid var(--c1); }

/* ── Tip (exam-tip) ── */
.tip { background:${C.tipBg};border:1px solid ${C.tipBorder};border-left:4px solid ${C.tipAccent};border-radius:7px;padding:5px 9px;margin:3px 0;font-size:.83rem;page-break-inside:avoid;color:${C.tipText}; }
.tip strong,.tip b { color:${C.tipAccent};font-weight:700; }
.tip em { color:${C.tipText};opacity:.75; }

/* ── Memo (memory-box) ── */
.memo { background:${C.memoBg};border:1px solid ${C.memoBorder};border-left:4px solid ${C.memoAccent};border-radius:7px;padding:5px 9px;margin:3px 0;font-size:.83rem;page-break-inside:avoid;color:${C.memoText}; }
.memo strong,.memo b { color:${C.memoAccent};font-weight:700; }

/* ── Step card ── */
.step-card { display:flex;align-items:flex-start;gap:8px;background:#fff;border:1px solid var(--line);border-left:4px solid var(--c1);border-radius:7px;padding:5px 9px;margin:3px 0;page-break-inside:avoid; }
.step-badge { background:var(--c1);color:#fff;min-width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.7rem;flex-shrink:0;margin-top:1px; }
.step-body { flex:1;font-size:.83rem;line-height:1.4; }
.step-body strong { color:var(--c1); }

/* ── Hbox ── */
.hbox { background:var(--bg1);border:1px solid var(--line);border-radius:7px;padding:5px 9px;margin:3px 0;page-break-inside:avoid;font-size:.83rem; }
.hbox strong { color:var(--c2); }

/* ── Two-column grid ── */
.two-col { display:grid;grid-template-columns:1fr 1fr;gap:4px;margin:3px 0; }

/* ── Tables ── */
table { width:100%;border-collapse:collapse;margin:4px 0;font-size:.79rem;border:1px solid var(--line);table-layout:fixed;word-wrap:break-word; }
th { background:var(--c2);color:#fff;padding:4px 8px;text-align:left;font-weight:700;font-size:.74rem; }
td { padding:3px 8px;border-bottom:1px solid #E5E7EB;color:#334155;vertical-align:top;word-wrap:break-word;line-height:1.35; }
tr:nth-child(even) td { background:var(--bg1); }
tr:last-child td { border-bottom:none; }

/* ── Footer ── */
.footer { text-align:center;color:var(--muted);font-size:.66rem;padding:10px 0;border-top:1px solid #E2E8F0;margin-top:10px; }

/* ── Print ── */
@media print {
  .toolbar { display:none !important; }
  body { font-size:9px;max-width:none; }
  .content { padding:6px 0 14px; }
  .block,.tip,.memo,.step-card,.hbox,.example-block { break-inside:avoid;box-shadow:none!important; }
  table { box-shadow:none!important; }
  td { color:#334155 !important; }
  .section { margin-bottom:6px; }
}
</style></head><body>
<div class="toolbar">
  <button class="toolbar-btn" onclick="window.print()">🖨️ طباعة / حفظ كـ PDF</button>
  <span class="hint">اختر "Save as PDF" في خيارات الطابعة</span>
</div>
<div class="content">
  <div class="binder-cover">
    <div class="binder-tag">MKT 201 — Principles of Marketing</div>
    <h1>${chapterTitle}</h1>
    <div class="binder-sub">Kotler &amp; Armstrong, 19th Edition</div>
    <div class="binder-meta"><span>📅 ${dateStr}</span><span>📖 ملخص شامل</span><span>🌐 mkt201.vercel.app</span></div>
  </div>
  ${contentHtml}
  <div class="footer">MKT 201 Study Hub &nbsp;·&nbsp; mkt201.vercel.app &nbsp;·&nbsp; ${dateStr}</div>
</div>
</body></html>`);
  w.document.close();
}

// ═══════════════════════════════════════════════
//  INIT HOOK — call new features on load
// ═══════════════════════════════════════════════
// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
  renderReadinessCard();
  renderWeakSpots();
  renderStudyPlan();
  checkReminders();
  // Check if URL has challenge params
  if (window.location.search.includes('seed=')) {
    setTimeout(() => startChallengeFromURL(), 500);
  }
  // initOnboarding() is called from pickTheme() after theme selection
  // so new users see: login → theme → onboarding

  // Auto-start tour for first-time visitors
  setTimeout(() => {
    if (!localStorage.getItem('mkt201_tour_seen')) {
      startTour();
    }
  }, 800);
});

// ═══════════════════════════════════════════════
//  INTERACTIVE TOUR
// ═══════════════════════════════════════════════

const TOUR_STEPS = [
  {
    selector: null,
    title: '👋 أهلاً بك في Hosam Study Hub!',
    body: 'هذا الموقع صُمِّم خصيصاً عشان تذاكر بكفاءة. خليني أوضح لك كيف تستفيد من كل أداة خلال دقيقتين.',
    position: 'center'
  },
  {
    selector: '.quick-nav-grid',
    title: '⚡ لوحة الانطلاق السريع',
    body: 'من هنا تصل لكل شيء بضغطة واحدة — الفصول، الفلاش كاردز، الكويز، Cram Mode، وأكثر.',
    position: 'bottom'
  },
  {
    selector: '.qn-card:first-child',
    title: '📖 ابدأ بالمحتوى (الفصول)',
    body: 'كل فصل مرتّب بنفس ترتيب السلايدات — LO بـ LO. فيه تعريفات، أمثلة، وتلميحات الامتحان الصفراء.',
    position: 'bottom'
  },
  {
    selector: '.qn-card:nth-child(5)',
    title: '🃏 الفلاش كاردز',
    body: '60 مصطلح أساسي. اضغط الكارد ترى الإجابة. مثالي للمراجعة السريعة بعد قراءة كل فصل.',
    position: 'bottom'
  },
  {
    selector: '.qn-card:nth-child(7)',
    title: '🏦 Test Bank — 434 سؤال',
    body: 'بنك الأسئلة الكامل مرتّب بالفصول. اختبر نفسك بعد ما تنهي الكويز العادي.',
    position: 'bottom'
  },
  {
    selector: '.qn-card:nth-child(8)',
    title: '🔥 Cram Mode',
    body: 'يجمع الأسئلة الصعبة + الأخطاء السابقة. مثالي لآخر يومين قبل الامتحان.',
    position: 'bottom'
  },
  {
    selector: '.qn-lastnight',
    title: '🌙 الليلة قبل الامتحان',
    body: '40 سؤال مُختار من الامتحانات السابقة الحقيقية. استخدمه فقط في ليلة الامتحان.',
    position: 'top'
  },
  {
    selector: '#study-plan-card',
    title: '📅 خطة المراجعة',
    body: 'خطتك اليومية من الآن حتى يوم الامتحان. اضغط على أي يوم للانتقال لمحتواه مباشرةً.',
    position: 'top'
  },
  {
    selector: null,
    title: '🎓 جاهز تذاكر!',
    body: 'المسار المقترح:\n① اقرأ نوتس الفصل\n② راجع بالفلاش كاردز\n③ اختبر نفسك بالكويز\n④ كرر الأخطاء بـ Cram\n⑤ ليلة الامتحان — 40 سؤال من اختبارات سابقة',
    position: 'center',
    isLast: true
  }
];

let _tourStep = 0;

function startTour() {
  showPage('page-home');
  _tourStep = 0;
  document.getElementById('tour-overlay').style.display = 'block';
  document.getElementById('tour-banner') && (document.getElementById('tour-banner').style.display = 'none');
  _renderTourStep();
}

function _tourNext() {
  if (_tourStep < TOUR_STEPS.length - 1) { _tourStep++; _renderTourStep(); }
  else _endTour();
}

function _tourPrev() {
  if (_tourStep > 0) { _tourStep--; _renderTourStep(); }
}

function _endTour() {
  document.getElementById('tour-overlay').style.display = 'none';
  const sp = document.getElementById('tour-spotlight');
  if (sp) sp.style.display = 'none';
  localStorage.setItem('mkt201_tour_seen', '1');
}

function _renderTourStep() {
  const step = TOUR_STEPS[_tourStep];
  const spotlight = document.getElementById('tour-spotlight');
  const card = document.getElementById('tour-card');
  const isFirst = _tourStep === 0;
  const isLast = step.isLast || _tourStep === TOUR_STEPS.length - 1;

  card.innerHTML = `
    <div class="tour-step-count">${_tourStep + 1} / ${TOUR_STEPS.length}</div>
    <div class="tour-title">${step.title}</div>
    <div class="tour-body">${step.body.replace(/\n/g, '<br>')}</div>
    <div class="tour-actions">
      ${isFirst
        ? `<button class="tour-btn tour-btn-sec" onclick="_endTour()">تخطي</button>`
        : `<button class="tour-btn tour-btn-sec" onclick="_tourPrev()">← السابق</button>`}
      <button class="tour-btn tour-btn-pri" onclick="${isLast ? '_endTour()' : '_tourNext()'}">${isLast ? '🚀 ابدأ الدراسة!' : 'التالي →'}</button>
    </div>`;

  if (step.selector && step.position !== 'center') {
    const target = document.querySelector(step.selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const r = target.getBoundingClientRect();
        const pad = 8;
        spotlight.style.cssText = `display:block;position:fixed;border-radius:12px;
          box-shadow:0 0 0 9999px rgba(0,0,0,.72),0 0 0 3px var(--accent);
          transition:all .35s cubic-bezier(.25,.46,.45,.94);pointer-events:none;z-index:9998;
          left:${r.left - pad}px;top:${r.top - pad}px;
          width:${r.width + pad * 2}px;height:${r.height + pad * 2}px;`;
        _positionTourCard(card, r, step.position);
      }, 420);
      return;
    }
  }
  spotlight.style.display = 'none';
  _centerTourCard(card);
}

function _positionTourCard(card, r, pos) {
  const cw = Math.min(320, window.innerWidth - 32);
  const margin = 16;
  let left = r.left + r.width / 2 - cw / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - cw - margin));
  card.style.maxWidth = cw + 'px';
  card.style.left = left + 'px';
  card.style.transform = '';

  const cardH = card.offsetHeight || 180;
  if (pos === 'bottom') {
    let top = r.bottom + 16;
    if (top + cardH > window.innerHeight - 20) top = r.top - cardH - 16;
    if (top < 20) top = window.innerHeight / 2 - cardH / 2;
    card.style.top = top + 'px';
  } else {
    let top = r.top - cardH - 16;
    if (top < 20) top = r.bottom + 16;
    if (top + cardH > window.innerHeight - 20) top = window.innerHeight / 2 - cardH / 2;
    card.style.top = top + 'px';
  }
}

function _centerTourCard(card) {
  card.style.left = '50%';
  card.style.top = '50%';
  card.style.transform = 'translate(-50%, -50%)';
  card.style.maxWidth = '340px';
}
