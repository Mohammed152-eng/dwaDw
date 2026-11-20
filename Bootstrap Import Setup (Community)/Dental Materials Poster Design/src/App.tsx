import tensileHero from "./assets/tensile-test-hero.png";

const palette = {
  ink: "#171C1A",
  bone: "#F1EEE5",
  red: "#E8573F",
  lime: "#C8D273",
  blue: "#4F7580",
  muted: "#72766F",
};

function HeroCurve() {
  return (
    <svg
      className="hero-curve"
      viewBox="0 0 1500 660"
      role="img"
      aria-label="Stress strain curve annotated with proportional limit, elastic limit, yield strength, ultimate strength and fracture"
    >
      <defs>
        <pattern id="resilienceHatch" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 12 12 0" stroke={palette.blue} strokeWidth="2" opacity=".4" />
        </pattern>
        <linearGradient id="toughnessFill" x1="0" x2="1">
          <stop offset="0" stopColor={palette.lime} stopOpacity=".28" />
          <stop offset="1" stopColor={palette.red} stopOpacity=".08" />
        </linearGradient>
      </defs>

      <g stroke="#171C1A" strokeOpacity=".11">
        {[150, 270, 390, 510].map((y) => (
          <line key={y} x1="110" x2="1410" y1={y} y2={y} />
        ))}
        {[320, 560, 800, 1040, 1280].map((x) => (
          <line key={x} x1={x} x2={x} y1="55" y2="560" />
        ))}
      </g>

      <path
        d="M110 560 438 308C470 281 502 270 540 267C665 256 790 218 930 151C1020 108 1128 77 1212 98C1314 124 1367 221 1380 344L1380 560Z"
        fill="url(#toughnessFill)"
      />
      <path d="M110 560 438 308 438 560Z" fill="url(#resilienceHatch)" />

      <path d="M110 560H1435M110 560V42" stroke={palette.ink} strokeWidth="3" />
      <path
        d="M110 560 438 308C470 281 502 270 540 267C665 256 790 218 930 151C1020 108 1128 77 1212 98C1314 124 1367 221 1380 344"
        fill="none"
        stroke={palette.red}
        strokeWidth="15"
        strokeLinecap="round"
      />

      <path
        d="M188 560 501 320"
        fill="none"
        stroke={palette.ink}
        strokeWidth="3"
        strokeDasharray="12 10"
      />
      <line x1="188" x2="188" y1="560" y2="583" stroke={palette.ink} strokeWidth="3" />
      <text x="155" y="612" className="graph-mono">
        0.2%
      </text>

      {[
        { x: 438, y: 308, label: "P.L.", sub: "proportionality ends", dx: -115, dy: -42 },
        { x: 472, y: 279, label: "E.L.", sub: "elastic recovery ends", dx: -24, dy: -95 },
        { x: 540, y: 267, label: "Y.S.", sub: "plastic flow begins", dx: 24, dy: 34 },
        { x: 1212, y: 98, label: "U.S.", sub: "maximum stress", dx: -20, dy: -50 },
        { x: 1380, y: 344, label: "FRACTURE", sub: "final endpoint", dx: -30, dy: 52 },
      ].map((point) => (
        <g key={point.label}>
          <circle
            cx={point.x}
            cy={point.y}
            r="15"
            fill={palette.bone}
            stroke={palette.ink}
            strokeWidth="4"
          />
          <circle cx={point.x} cy={point.y} r="5" fill={palette.red} />
          <text x={point.x + point.dx} y={point.y + point.dy} className="graph-label">
            {point.label}
          </text>
          <text x={point.x + point.dx} y={point.y + point.dy + 22} className="graph-note">
            {point.sub}
          </text>
        </g>
      ))}

      <g>
        <path d="M190 485 380 340" stroke={palette.ink} strokeWidth="2" />
        <text x="205" y="430" className="graph-equation">
          E = σ / ε
        </text>
        <text x="205" y="456" className="graph-note">
          SLOPE = RIGIDITY
        </text>
      </g>

      <text x="215" y="535" className="graph-area">
        RESILIENCE
      </text>
      <text x="810" y="520" className="graph-area">
        TOUGHNESS = TOTAL AREA TO FRACTURE
      </text>
      <text x="18" y="32" className="axis-label">
        STRESS / σ
      </text>
      <text x="1290" y="625" className="axis-label">
        STRAIN / ε
      </text>
    </svg>
  );
}

type PropertyProps = {
  number: string;
  title: string;
  kicker: string;
  children: React.ReactNode;
  accent?: boolean;
};

function Property({ number, title, kicker, children, accent = false }: PropertyProps) {
  return (
    <article className={`property ${accent ? "property-accent" : ""}`}>
      <div className="property-index">{number}</div>
      <div>
        <span className="property-kicker">{kicker}</span>
        <h3>{title}</h3>
        {children}
      </div>
    </article>
  );
}

const classifications = [
  ["1", "STIFF · DUCTILE", "STRONG · TOUGH", "M7 43 29 12C40 4 56 7 67 27"],
  ["2", "STIFF · BRITTLE", "STRONG", "M7 43 34 8 38 23"],
  ["3", "STIFF · DUCTILE", "WEAK", "M7 43 22 26C35 17 52 25 66 34"],
  ["4", "STIFF · BRITTLE", "WEAK", "M7 43 24 26 28 36"],
  ["5", "FLEXIBLE · DUCTILE", "STRONG · RESILIENT", "M7 43 48 11C58 6 68 14 70 27"],
  ["6", "FLEXIBLE · BRITTLE", "STRONG · RESILIENT", "M7 43 49 11 53 24"],
  ["7", "FLEXIBLE · DUCTILE", "WEAK", "M7 43 39 29C49 24 61 30 68 37"],
  ["8", "FLEXIBLE · BRITTLE", "WEAK", "M7 43 40 29 44 38"],
];

function MaterialAtlas() {
  return (
    <div className="atlas">
      {classifications.map(([number, title, subtitle, path]) => (
        <div className="atlas-item" key={number}>
          <span>{number}</span>
          <svg viewBox="0 0 76 50" aria-hidden="true">
            <path d="M5 45H73M5 45V4" className="atlas-axis" />
            <path d={path} className="atlas-line" />
          </svg>
          <div>
            <b>{title}</b>
            <small>{subtitle}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

function TwoCurves() {
  return (
    <svg
      className="two-curves"
      viewBox="0 0 320 155"
      role="img"
      aria-label="Revision comparison of two stress strain curves"
    >
      <path d="M22 132H304M22 132V14" className="compare-axis" />
      <path d="M22 132 72 50 78 84" className="compare-one" />
      <path d="M22 132 112 42C128 24 152 29 166 57L180 112" className="compare-two" />
      <text x="48" y="40">
        01 / STEEP + SHORT
      </text>
      <text x="151" y="23">
        02 / LONGER STRAIN
      </text>
      <text x="195" y="62">
        COMPARE
      </text>
      <text x="195" y="79">
        peak = strength
      </text>
      <text x="195" y="95">
        slope = rigidity
      </text>
      <text x="195" y="111">
        length = ductility
      </text>
      <text x="195" y="127">
        elastic area = resilience
      </text>
    </svg>
  );
}

const roles = [
  "Research + content writing",
  "Design + layout",
  "Figures + illustrations",
  "Clinical examples + visual research",
  "Verification + proofreading",
];

export default function App() {
  return (
    <main className="stage">
      <article className="poster">
        <header className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span>THE BRITISH UNIVERSITY IN EGYPT</span>
              <span>FACULTY OF DENTISTRY · DENTAL MATERIALS I</span>
            </div>
            <p className="project-label">PROJECT 07 / MECHANICAL BEHAVIOUR</p>
            <h1>
              STRESS
              <br />
              <i>meets</i> STRAIN.
            </h1>
            <p className="hero-subtitle">Properties obtained from the stress–strain curve</p>
            <p className="hero-intro">
              One test records an entire material story—from reversible deformation to permanent
              change, energy absorption and fracture.
            </p>
          </div>
          <figure className="hero-image">
            <img src={tensileHero} alt="Metal tensile test specimen held between testing grips" />
            <figcaption>TENSILE SPECIMEN / FORCE → DEFORMATION → FRACTURE</figcaption>
          </figure>
          <div className="hero-number">07</div>
          <div className="hero-rail">
            <span>A1 · 594 × 841 MM</span>
            <span>10 PROPERTIES</span>
            <span>1 CURVE</span>
          </div>
        </header>

        <section className="curve-section">
          <div className="curve-title">
            <div>
              <span>01 / THE MASTER DIAGRAM</span>
              <h2>READ THE CURVE AS A JOURNEY.</h2>
            </div>
            <p>
              The shape and magnitude of stress and strain classify stiffness, strength, ductility,
              brittleness, resilience and toughness.
            </p>
          </div>
          <HeroCurve />
          <div className="curve-key">
            <span>
              <b>ELASTIC</b> returns to shape
            </span>
            <span>
              <b>PLASTIC</b> permanent change
            </span>
            <span>
              <b>FAILURE</b> fracture or rupture
            </span>
          </div>
        </section>

        <section className="properties-section">
          <div className="section-heading vertical">
            <span>02</span>
            <h2>WHAT THE CURVE REVEALS</h2>
          </div>

          <div className="property-flow">
            <Property number="01" title="PROPORTIONAL LIMIT" kicker="RELATIONSHIP / σ ↔ ε">
              <p>
                Maximum stress without deviation from proportionality between stress and strain.
              </p>
              <p className="signal">P.L. describes the relationship.</p>
            </Property>

            <Property number="02" title="ELASTIC LIMIT" kicker="BEHAVIOUR / RECOVERY">
              <p>Maximum stress without permanent deformation after the load is removed.</p>
              <p className="signal">E.L. describes behaviour. In practice: P.L. ≈ E.L.</p>
            </Property>

            <Property number="03" title="YIELD STRENGTH" kicker="FUNCTIONAL FAILURE" accent>
              <p>
                Stress at which marked plastic behaviour begins, found using 0.1–0.2% permanent
                strain.
              </p>
              <div className="offset-rule">
                <span>0.2%</span>
                <i />
                <b>OFFSET METHOD</b>
              </div>
              <p className="clinical">
                A bridge loaded beyond Y.S. can remain displaced and lose opposing contact.
              </p>
            </Property>

            <Property number="04" title="ULTIMATE STRENGTH" kicker="MAXIMUM STRESS">
              <p>
                Maximum stress just before failure—tensile in tension or compressive in compression.
              </p>
              <div className="formula">σ = LOAD / ORIGINAL AREA</div>
              <p className="signal">
                The peak is U.S.; fracture is the final endpoint. Clinically, Y.S. matters first.
              </p>
            </Property>

            <Property number="05" title="YOUNG’S MODULUS" kicker="RIGIDITY / SLOPE" accent>
              <div className="formula large">E = STRESS / STRAIN</div>
              <p>
                The constant ratio within the proportional region. High E = stiff; low E = flexible.
              </p>
              <p className="clinical">
                <b>2× STIFFER:</b> Co–Cr denture bases can be half the thickness of gold alloy while
                distributing masticatory load.
              </p>
            </Property>

            <Property number="06" title="DUCTILITY" kicker="TENSION / DRAWN INTO WIRE">
              <p>Plastic deformation under tensile stress without fracture.</p>
              <div className="formula">
                ELONGATION = [(L<sub>f</sub> − L<sub>0</sub>) / L<sub>0</sub>] × 100
              </div>
              <div className="numbers">
                <span>
                  <b>50%</b>A · 10→15 mm
                </span>
                <span>
                  <b>10%</b>B · 10→11 mm
                </span>
              </div>
              <p className="clinical">
                Gold alloy ≈20%. Above 5% is ductile and burnishable; below 5% is brittle.
              </p>
            </Property>

            <Property number="07" title="MALLEABILITY" kicker="COMPRESSION / HAMMERED INTO SHEET">
              <p>Plastic deformation under compressive stress without fracture.</p>
              <div className="force-pair">
                <span>→</span>
                <i>METAL</i>
                <span>←</span>
              </div>
            </Property>

            <Property number="08" title="BRITTLENESS" kicker="LITTLE OR NO PLASTIC FLOW">
              <p>Fracture occurs at or near P.L.; no necking—cracks propagate until failure.</p>
              <p className="signal">Brittle / amalgam · porcelain · composites</p>
              <p className="signal">Ductile / gold alloys · stainless steel</p>
              <div className="six">
                <b>≈6×</b>
                <span>amalgam compressive strength versus tensile strength</span>
              </div>
            </Property>
          </div>

          <aside className="energy-panel">
            <span className="energy-label">ENERGY / AREA UNDER THE CURVE</span>
            <Property number="09" title="RESILIENCE" kicker="TO THE PROPORTIONAL LIMIT">
              <p>Energy absorbed through the elastic region.</p>
              <div className="formula inverse">R = ½ × STRESS × STRAIN</div>
              <p className="units">JOULE / m³</p>
              <p className="clinical inverse-copy">
                Orthodontic wire: work available from a spring during tooth movement.
              </p>
              <p className="clinical inverse-copy">
                Acrylic teeth absorb more force than porcelain and transmit less to bone.
              </p>
            </Property>
            <div className="energy-divider">ELASTIC AREA ⊂ TOTAL AREA</div>
            <Property number="10" title="TOUGHNESS" kicker="ALL THE WAY TO FRACTURE">
              <p>Total energy absorbed through elastic + plastic regions.</p>
              <p className="units">JOULE / m³</p>
              <p className="signal-light">HIGH P.L. + GOOD DUCTILITY = HIGH TOUGHNESS</p>
            </Property>
          </aside>
        </section>

        <section className="evidence-section">
          <div className="applications">
            <div className="evidence-title">
              <span>03 / WHY DENTISTS CARE</span>
              <h2>THE CURVE BECOMES A CLINICAL DECISION.</h2>
            </div>
            <div className="application-grid">
              {[
                ["BRIDGE", "Yield strength", "Resist permanent displacement"],
                ["DENTURE BASE", "Modulus", "Rigid, thin, load-distributing"],
                ["GOLD MARGIN", "Ductility", "Burnish without fracture"],
                ["ORTHODONTIC WIRE", "Resilience", "Store useful spring work"],
                ["DENTURE TEETH", "Resilience", "Acrylic transmits less force"],
              ].map(([item, property, outcome]) => (
                <div key={item}>
                  <b>{item}</b>
                  <span>{property}</span>
                  <p>{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="classification">
            <div className="evidence-title compact">
              <span>04 / EIGHT IDEALIZED MATERIALS</span>
              <h2>PROPERTIES ARE INDEPENDENT.</h2>
            </div>
            <MaterialAtlas />
            <p className="atlas-key">
              <b>Strong</b> 1–4 · <b>Ductile</b> 1, 3, 5, 7 · <b>Stiff</b> 1–4 · stiffness +
              strength → 1 or 2 · add ductility → <b>1</b>
            </p>
          </div>

          <div className="revision">
            <div className="evidence-title compact">
              <span>05 / REVISION</span>
              <h2>COMPARE THE FEATURE.</h2>
            </div>
            <TwoCurves />
          </div>
        </section>

        <footer>
          <div className="references">
            <b>SOURCES</b>
            <p>
              01 / <i>Mechanical Properties</i>, lecture pp. 38–45.
            </p>
            <p>
              02 / <i>Relation Between Stress &amp; Strain</i>, supplied lecture slides.
            </p>
            <p>
              Scientific diagrams redrawn from the supplied teaching material. Hero image generated
              as visual context; not experimental data.
            </p>
          </div>

          <div className="roles">
            <div className="roles-head">
              <b>GROUP CONTRIBUTIONS / WRITE NAMES</b>
              <span>MAX. 5 STUDENTS</span>
            </div>
            {roles.map((role, index) => (
              <div className="role" key={role}>
                <span>0{index + 1}</span>
                <p>NAME ____________________</p>
                <small>{role}</small>
              </div>
            ))}
          </div>

          <div className="submission">
            <b>PROJECT 07</b>
            <span>MARKS / 10</span>
            <span>DEADLINE / 17 NOV 2027</span>
            <span>SUBMIT / LAB SUPERVISOR</span>
          </div>
        </footer>
      </article>
    </main>
  );
}
