Design a complete, professional, high-fidelity UI/UX for a web-based Smart Expense Tracker application built for an AHCI/ HCI project. The design must look polished, modern, credible, human-made, and presentation-ready — absolutely NOT generic, NOT AI-slop, and NOT like a template dump. It should feel like a real product designed by an experienced product designer for a fintech dashboard. The entire experience should be visually impressive, easy to understand, and highly usable.

PROJECT CONTEXT
The application is a Smart Expense Tracker web app built using the MERN stack. It helps users manage income, expenses, financial summaries, and reports. The interface must support strong HCI principles:
- usability
- learnability
- memorability
- efficiency
- error tolerance
- accessibility
- consistency
- feedback
- error prevention

TARGET USERS
- Students managing monthly budgets
- Young professionals tracking income and expenses
- Anyone who wants a simple, attractive finance dashboard
Design the UI so it feels approachable for beginners but powerful enough for regular users.

PRIMARY GOAL
Create a complete multi-screen Figma UI for the app with a strong, cohesive visual system and clear flows between screens. The design should be suitable for a final academic project presentation and should impress the viewer immediately.

DESIGN STYLE DIRECTION
Create a premium, modern fintech interface with:
- elegant layout structure
- balanced whitespace
- clean card-based design
- subtle depth and layering
- refined shadows
- crisp typography
- soft gradients used sparingly
- strong visual hierarchy
- high contrast and accessibility
- professional color palette
- realistic interactive patterns
- polished charts and analytics visuals

The design should feel:
- modern but not flashy
- minimal but not empty
- sophisticated but easy to use
- friendly but professional
- visually rich but not cluttered

Avoid:
- cartoonish styling
- oversaturated colors
- generic dashboard clichés
- repetitive AI-looking cards
- random decorative elements with no purpose
- messy spacing
- unreadable tiny text
- fake complexity

VISUAL IDENTITY
Use a refined finance-app theme with a calm, trustworthy look. Suggested palette:
- Primary: deep navy / indigo
- Secondary: teal or blue-green
- Positive income color: green
- Expense color: red / coral
- Neutral background: soft off-white / light gray
- Text: dark slate
- Accent highlights: subtle gold or blue glow if needed

Typography:
- Use a modern sans-serif such as Inter, Manrope, SF Pro, or similar
- Strong hierarchy between headings, labels, values, and helper text
- Large clear numeric values
- Highly legible form labels and descriptions

LAYOUT PRINCIPLES
- Responsive desktop-first design, but also adapt cleanly to tablet and mobile
- Use a consistent grid system
- Align elements precisely
- Maintain generous spacing
- Make buttons and controls feel tactile and intuitive
- Use clearly separated sections and cards
- Keep navigation easy to scan
- Include clear states for hover, focus, active, loading, empty, success, warning, and delete confirmation

REQUIRED SCREENS TO DESIGN
Create at least 6 screens in Figma:

1. LOGIN SCREEN
Purpose: secure access with simple entry
Include:
- App logo and brand name
- Username/email field
- Password field
- Remember me checkbox
- Login button
- Sign-up navigation link
- Forgot password link
- Friendly hero/side panel or illustration area on desktop
- Strong visual trust cues
- Error state for invalid login
- Loading state for login button

Design this page to feel premium and calming, not generic.

2. DASHBOARD SCREEN
Purpose: give users an instant summary of finances
Include:
- Total Balance card
- Total Income card
- Total Expenses card
- Recent transactions section
- Summary chart section
- Small trend indicator showing up/down change
- Date filter or time range selector
- Quick action buttons for adding income and expense
- Clean insights panel or “financial health” note
- Visual distinction between income and expense
- Empty state if no transactions exist

Charts to include:
- line chart for balance trend
- bar or donut chart for income vs expense
- category breakdown chart or spending distribution

3. INCOME MANAGEMENT SCREEN
Purpose: manage all income entries
Include:
- Add income form
- Income list/table/cards
- Delete action
- Export income report button
- Search/filter by date or source
- Status feedback after adding income
- Confirmation modal before delete
- Category/source labels such as salary, freelance, gift, investment
- Total income summary at top
- Sorting controls

4. EXPENSE MANAGEMENT SCREEN
Purpose: manage expenses clearly and efficiently
Include:
- Add expense form
- Expense list/table/cards
- Delete action
- Category-based tracking
- Export expense report button
- Search/filter by category or date
- Monthly spend summary
- Clear warning when spending is high
- Confirmation modal before delete
- Category chips or visual tags such as food, transport, rent, shopping, utilities, education
- Pie chart or donut chart for category distribution

5. REPORTS / HISTORY SCREEN
Purpose: provide historical overview and export options
Include:
- All financial records
- Monthly summary cards
- Performance graphs
- Date range filter
- Downloadable report section
- PDF/CSV export area
- Timeline/history table
- Comparison of monthly income vs expense
- Trend insights
- Highlight best month / worst month
- Clear graph-heavy layout that still feels readable

6. USER PROFILE / SETTINGS SCREEN
Optional but recommended
Include:
- Profile image upload
- User name and email fields
- Password change section
- Notification preferences
- Theme or display preferences if relevant
- Logout option
- Save changes button
- Account deletion or security settings area if needed

INTERACTION FLOWS
Design clickable prototype connections between:
- Login → Dashboard
- Dashboard → Income screen
- Dashboard → Expense screen
- Dashboard → Reports screen
- Dashboard → Profile screen
- Delete button → confirmation modal → success feedback
- Add income form → success alert
- Add expense form → success alert
- Export buttons → report/download confirmation

HCI / UX REQUIREMENTS TO VISUALLY REFLECT
The design must clearly show these principles:

Usability
- fast to learn
- easy to remember
- efficient to use
- forgiving when errors happen

Feedback
- success toast after adding income/expense
- warning messages for invalid entries
- loading spinner or skeleton state during API calls
- confirmation after deleting records

Consistency
- same button style across all pages
- same input style across forms
- same card system
- same icon style
- consistent spacing and color usage

Error Prevention
- form validation with helpful inline messages
- required field indicators
- delete confirmation dialog
- disabled state when forms are incomplete
- protection for authenticated-only access

Pointer Design Concepts
- clear clickable buttons
- hover states
- active states
- visible focus outlines
- delete icon with safe affordance
- cards that look tappable / interactive

Keyboard / Accessibility
- show accessible structure
- readable font sizes
- strong contrast
- logical tab order
- clear labels
- optional shortcut hints if useful

WIREFRAMES
First create low-fidelity wireframes for:
- Login
- Dashboard
- Income page
- Expense page
- Reports page

Wireframes should show:
- layout structure
- spacing
- hierarchy
- component placement
- navigation structure
Do not make them look polished; keep them rough, simple, and grayscale.

HIGH-FIDELITY UI
Then create final polished versions of all screens with:
- refined color palette
- consistent design system
- modern fintech aesthetic
- realistic content
- improved alignment
- sophisticated charts
- icons where needed
- subtle motion-ready presentation
- strong visual emphasis on important numbers

COMPONENT SYSTEM TO CREATE
Create reusable components such as:
- top navigation bar
- side navigation menu
- summary cards
- transaction cards
- input fields
- primary / secondary / danger buttons
- dropdown filters
- date picker style control
- chart cards
- table rows
- chip tags for categories
- toast notifications
- modal dialog
- empty state card
- loading skeleton
- profile avatar component

CONTENT GUIDELINES
Use realistic sample data, such as:
Income examples:
- Salary
- Freelance Project
- Dividends
- Bonus
- Gift

Expense examples:
- Rent
- Groceries
- Transport
- Internet
- Utilities
- Dining
- Education
- Shopping

Make numbers believable and visually balanced.
Use currency values consistently.
Show positive and negative indicators clearly.

RESPONSIVE DESIGN
Design for:
- Desktop 1440px
- Tablet 768px
- Mobile 390px

The desktop version should be the main polished experience. Tablet and mobile should preserve clarity and hierarchy without feeling squeezed.

MOBILE EXPERIENCE
On mobile:
- use bottom or collapsed navigation if needed
- stack cards vertically
- simplify charts
- keep actions thumb-friendly
- keep forms easy to complete
- preserve readability and spacing

DASHBOARD LAYOUT PREFERENCE
The dashboard should feel especially impressive:
- top greeting with user name
- summary cards in a clean row
- main chart area with strong hierarchy
- recent transactions on one side or below
- a side panel for insights or goals
- nice spacing and professional composition

REPORTS SCREEN VISUAL PREFERENCE
Make reports visually analytical:
- strong chart presentation
- timeline or trend graph
- monthly comparison
- downloadable reports section
- report cards with insights
- a clean information hierarchy so the page does not feel crowded

DESIGN QUALITY REQUIREMENTS
This must look like a final professional case-study-ready product, not a student draft.
It should:
- feel premium
- feel trustworthy
- feel modern
- feel practical
- feel elegant
- be visually memorable
- be easy to explain in a presentation
- look hand-crafted and polished

Do not make it look like an overused AI-generated dashboard. Add subtle personality through:
- unique spacing rhythm
- thoughtful card proportions
- refined icon usage
- tasteful gradients or highlights
- balanced asymmetry where appropriate
- realistic content structure

DELIVERABLE EXPECTATION
Build the full Figma design system and all main screens with prototype connections. Ensure the result is cohesive and presentation-ready across the entire app. The final output should clearly demonstrate:
- a complete expense management workflow
- strong HCI application
- visual professionalism
- usability and accessibility
- a beautiful finance dashboard experience

If you need to make design assumptions, choose the most professional, modern, and user-friendly option. Prioritize clarity, elegance, and usability above decoration.