import { MediaSpec, QuizQuestion, CourseModule } from '../types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    moduleNumber: 1,
    title: 'Foundations of Data Communications',
    duration: '2.5 hrs',
    lessons: [
      { id: 'l-1-1', title: 'Data Flow: Simplex, Half & Full Duplex', route: '/data-flow', duration: '15 min', isCompleted: true },
      { id: 'l-1-2', title: 'Network Topologies: Mesh, Star, Bus, Ring', route: '/topologies', duration: '25 min', isCompleted: true },
      { id: 'l-1-3', title: 'The OSI 7-Layer Reference Model', route: '/osi-model', duration: '30 min', isCompleted: true },
      { id: 'l-1-4', title: 'Physical Layer Roles & Digital Signaling', route: '/physical-layer', duration: '20 min', isCompleted: true }
    ]
  },
  {
    id: 'mod-2',
    moduleNumber: 2,
    title: 'Transmission Media & Physical Layer',
    duration: '3.5 hrs',
    lessons: [
      { id: 'l-2-1', title: 'Transmission Media Overview & Taxonomy', route: '/transmission-media', duration: '15 min', isCompleted: false },
      { id: 'l-2-2', title: 'Guided Media: Twisted Pair (UTP vs STP)', route: '/transmission-media?tab=guided&media=twisted-pair', duration: '25 min', isCompleted: false },
      { id: 'l-2-3', title: 'Guided Media: Coaxial RG-6 & 75Ω Physics', route: '/transmission-media?tab=guided&media=coaxial', duration: '20 min', isCompleted: false },
      { id: 'l-2-4', title: 'Guided Media: Optical Fiber & TIR Snell’s Law', route: '/transmission-media?tab=guided&media=fiber-optic', duration: '35 min', isCompleted: false },
      { id: 'l-2-5', title: 'Unguided Media: Radio Waves & Ground Bounce', route: '/transmission-media?tab=unguided&media=radio', duration: '20 min', isCompleted: false },
      { id: 'l-2-6', title: 'Unguided Media: Directional Microwaves', route: '/transmission-media?tab=unguided&media=microwave', duration: '25 min', isCompleted: false },
      { id: 'l-2-7', title: 'Unguided Media: Infrared & Short-Range Optics', route: '/transmission-media?tab=unguided&media=infrared', duration: '15 min', isCompleted: false },
      { id: 'l-2-8', title: 'Transmission Impairments: Attenuation & Noise', route: '/transmission-media?tab=impairments', duration: '25 min', isCompleted: false },
      { id: 'l-2-9', title: 'Interactive Signal Telemetry Lab', route: '/transmission-media?tab=lab', duration: '30 min', isCompleted: false },
      { id: 'l-2-10', title: 'Unit 2 Comprehensive Knowledge Check', route: '/transmission-media?tab=quiz', duration: '20 min', isCompleted: false }
    ]
  },
  {
    id: 'mod-3',
    moduleNumber: 3,
    title: 'Data Link Layer & Framing Protocols',
    duration: '4.0 hrs',
    lessons: [
      { id: 'l-3-1', title: 'Framing, Bit Stuffing & Byte Stuffing', route: '/framing', duration: '25 min', isCompleted: false },
      { id: 'l-3-2', title: 'Error Detection: Parity, Checksum & CRC', route: '/error-detection', duration: '35 min', isCompleted: false },
      { id: 'l-3-3', title: 'MAC Protocols: CSMA/CD and CSMA/CA', route: '/mac-protocols', duration: '30 min', isCompleted: false }
    ]
  },
  {
    id: 'mod-4',
    moduleNumber: 4,
    title: 'Network Layer, IP Addressing & Routing',
    duration: '4.5 hrs',
    lessons: [
      { id: 'l-4-1', title: 'IPv4 Header Structure & Subnet Masks', route: '/ipv4-addressing', duration: '40 min', isCompleted: false },
      { id: 'l-4-2', title: 'CIDR & Variable Length Subnet Masking', route: '/cidr-subnetting', duration: '45 min', isCompleted: false },
      { id: 'l-4-3', title: 'Distance Vector vs. Link State Routing', route: '/routing-algorithms', duration: '35 min', isCompleted: false }
    ]
  }
];

export const IMPAIRMENTS_DATA = [
  {
    id: 'attenuation',
    title: 'Attenuation (Loss of Signal Energy)',
    cause: 'Resistance in conductive copper conductors or scattering/absorption in glass fibers converting electrical/optical signal into heat.',
    equation: 'Attenuation (dB) = 10 · log₁₀(P₁ / P₂)',
    remedy: 'Amplifiers for analog signals, repeaters / regenerators for digital bitstreams.',
    visualMetric: 'Reduces signal amplitude over distance'
  },
  {
    id: 'distortion',
    title: 'Distortion (Signal Shape Alteration)',
    cause: 'Composite signals contain multiple harmonic frequencies; each harmonic frequency travels at a slightly different velocity (dispersion) and arrives with a phase shift.',
    equation: 'Phase Shift: Δθ = 2π · f · Δt',
    remedy: 'Equalizers, dispersion-shifted optical fibers, and symbol synchronization filters.',
    visualMetric: 'Broadens and deforms rectangular clock pulses'
  },
  {
    id: 'noise',
    title: 'Noise (Unwanted External Energy)',
    cause: 'Thermal agitation of electrons (thermal noise), inductive motor spikes (impulse noise), and leakage between adjacent pairs (crosstalk).',
    equation: 'SNR = 10 · log₁₀(Signal Power / Noise Power)',
    remedy: 'Differential twisting, metallic foil shielding (STP/Coaxial), and fiber optics.',
    visualMetric: 'Adds random spike artifacts to waveform'
  }
];

export const TRANSMISSION_MEDIA_LIST: MediaSpec[] = [
  {
    id: 'twisted-pair',
    name: 'Twisted Pair Cable',
    shortName: 'Twisted Pair',
    category: 'guided',
    tagline: 'Balanced differential copper signaling with cancellation twisting',
    description: 'Composed of two insulated copper wires twisted around each other in a helical pattern. The twists ensure that both wires receive identical electromagnetic noise from external sources, allowing differential signaling at the receiver to subtract out common-mode interference.',
    keyPhysics: 'Differential Mode Rejection & Mutual Inductance Cancellation: By twisting conductors with varying twist rates (twists/meter), inductive loop areas alternate polarity, canceling out external EMI and reducing near-end crosstalk (NEXT).',
    bandwidthRange: '10 MHz – 2000 MHz (Cat 8)',
    typicalDataRate: '10 Mbps to 40 Gbps',
    maximumDistance: '100 meters (standard Ethernet channel)',
    attenuationRate: 'High (~20 to 45 dB / 100m at high freq)',
    propagationSpeed: '0.64 c (192,000 km/s)',
    velocityFactor: 0.64,
    emiImmunity: 'Moderate',
    costLevel: '$',
    securityLevel: 'Low',
    commonConnectors: ['RJ-45 (8P8C)', 'GG45', 'TERA'],
    standards: ['TIA/EIA-568-C.2', 'ISO/IEC 11801', 'IEEE 802.3ab / an'],
    typicalApplications: [
      'LAN office workstation cabling (1000BASE-T)',
      'Data center server top-of-rack interconnects',
      'Analog telephone lines (POTS)',
      'Power over Ethernet (PoE) IP cameras and APs'
    ],
    advantages: [
      'Most economical cabling infrastructure for buildings',
      'Flexible, lightweight, and very easy to terminate with crimp tools',
      'Supports Power over Ethernet (PoE up to 90W standard)',
      'Universal backward compatibility across Ethernet standards'
    ],
    disadvantages: [
      'Strict 100-meter segment limit before signal regeneration',
      'Susceptible to heavy electrical motor and radio interference unless shielded',
      'Signal radiates slightly, making it susceptible to passive eavesdropping'
    ],
    subtypes: [
      { name: 'UTP (Unshielded Twisted Pair)', description: 'No metallic shielding; relies strictly on twist rate to reject noise. Standard in office LANs (Cat 5e/Cat 6).', keyMetric: 'Cat 6: up to 10 Gbps (55m)' },
      { name: 'STP (Shielded Twisted Pair)', description: 'Each pair or overall bundle wrapped in aluminum foil/braid (F/UTP, S/FTP) for extreme industrial EMI protection.', keyMetric: 'Cat 7/8: up to 40 Gbps (30m)' },
      { name: 'Cat 6a vs Cat 8', description: 'Cat 6a operates at 500 MHz up to 100m; Cat 8 reaches 2000 MHz for ultra-short high-density switch fabrics.', keyMetric: 'Cat 8: 25G/40GBASE-T' }
    ],
    layers: [
      { id: 'tp-1', name: 'Solid Copper Conductor', material: '23–24 AWG Bare Annealed Copper', purpose: 'Carries electrical current pulses representing binary data', specs: '0.51–0.57 mm diameter', colorHex: '#B87333' },
      { id: 'tp-2', name: 'Color-Coded Insulation', material: 'HDPE / FEP Fluoropolymer', purpose: 'Electrical insulation and pair identification (Orange, Green, Blue, Brown)', specs: 'Dielectric strength > 2.5 kV', colorHex: '#3B82F6' },
      { id: 'tp-3', name: 'Central Spline (Pair Separator)', material: 'Cross-shaped Polyethylene Cross-filler', purpose: 'Separates the 4 pairs physically along the entire length to eliminate alien crosstalk', specs: 'Maintains 90° spatial isolation', colorHex: '#E2E8F0' },
      { id: 'tp-4', name: 'Outer Protective Jacket', material: 'PVC or Flame-Retardant LSZH', purpose: 'Protects inner conductors from moisture, abrasion, and tension forces', specs: 'Outer diameter ~6.0–7.5 mm', colorHex: '#1E3A8A' }
    ]
  },
  {
    id: 'coaxial',
    name: 'Coaxial Cable',
    shortName: 'Coaxial Cable',
    category: 'guided',
    tagline: 'Concentric copper conductor with continuous 360° cylindrical shield',
    description: 'Constructed with a central copper conductor surrounded by a concentric tubular insulating dielectric, surrounded by a tubular conducting shield (woven metallic braid and foil), wrapped in an insulating protective jacket.',
    keyPhysics: 'Uniform Waveguide Geometry: The shared central axis ("co-axial") confines the electric and magnetic fields entirely within the dielectric layer between the inner conductor and outer shield, preventing radiation leakage and blocking external EMI.',
    bandwidthRange: '50 MHz – 1000 MHz (Broadband)',
    typicalDataRate: '10 Mbps to 10 Gbps (DOCSIS 4.0)',
    maximumDistance: '500 meters (Thicknet) / 185 meters (Thinnet)',
    attenuationRate: 'Moderate (~5 to 15 dB / 100m depending on gauge)',
    propagationSpeed: '0.66 c – 0.82 c',
    velocityFactor: 0.75,
    emiImmunity: 'High',
    costLevel: '$$',
    securityLevel: 'Moderate',
    commonConnectors: ['BNC (Bayonet Neill–Concelman)', 'F-Type (Threaded)', 'N-Type', 'SMA'],
    standards: ['MIL-C-17', 'RG-6 / RG-11 / RG-59 Specs', 'DOCSIS 3.1 / 4.0'],
    typicalApplications: [
      'Cable TV (CATV) distribution and broadband cable internet',
      'RF antenna feedlines for radio transmitters and satellite LNBs',
      'Legacy 10BASE2 (Thinnet) and 10BASE5 (Thicknet) bus networks',
      'CCTV analog and HD-SDI video transmission'
    ],
    advantages: [
      'Much higher shielding and noise rejection than unshielded twisted pair',
      'Longer segment lengths without repeaters than standard UTP (up to 500m in Thicknet)',
      'High bandwidth over broad RF spectrum utilizing Frequency Division Multiplexing (FDM)'
    ],
    disadvantages: [
      'Bulky, stiffer, and more cumbersome to pull through tight conduits',
      'More expensive per meter and more complex termination than twisted pair',
      'Single cable failure in bus topology can take down the entire network segment'
    ],
    subtypes: [
      { name: 'RG-6 (75 Ω)', description: 'Standard consumer cable for modern satellite, cable television, and high-speed broadband cable modems.', keyMetric: 'Shielded up to 3 GHz' },
      { name: 'RG-59 (75 Ω)', description: 'Thinner, lower-cost cable traditionally used for short-run CCTV video and composite baseband signals.', keyMetric: 'Lighter gauge, higher attenuation' },
      { name: 'RG-11 (75 Ω)', description: 'Heavy-gauge thick cable engineered for long-run outdoor drops and commercial distribution trunk lines.', keyMetric: 'Lowest attenuation per 100m' }
    ],
    layers: [
      { id: 'coax-1', name: 'Center Conductor', material: 'Solid Bare Copper or Copper-Clad Steel (CCS)', purpose: 'Carries high-frequency RF signals; AC signals travel near surface due to skin effect', specs: '18 AWG (1.02 mm)', colorHex: '#B87333' },
      { id: 'coax-2', name: 'Dielectric Insulator', material: 'Foamed Polyethylene (FPE)', purpose: 'Maintains exact uniform distance between conductor and shield, dictating 75Ω impedance', specs: 'Dielectric constant ε ≈ 1.5', colorHex: '#F1F5F9' },
      { id: 'coax-3', name: 'Metallic Foil & Braided Shield', material: 'Aluminum Foil + Tinned Copper/Aluminum Braid', purpose: 'Provides 360-degree ground return path and total reflection of external RFI/EMI', specs: '60%–95% braid coverage', colorHex: '#94A3B8' },
      { id: 'coax-4', name: 'Outer Protective Jacket', material: 'UV-resistant Black Polyvinyl Chloride (PVC) / PE', purpose: 'Protects against environmental weather, water ingress, and mechanical abrasion', specs: 'Outdoor rated UV resistant', colorHex: '#0F172A' }
    ]
  },
  {
    id: 'fiber-optic',
    name: 'Fiber Optic Cable',
    shortName: 'Fiber Optic',
    category: 'guided',
    tagline: 'Dielectric glass waveguide transmitting encoded photons via total internal reflection',
    description: 'Constructed from ultrapure silica glass or plastic. Encoded data pulses are transmitted as light photons inside a central glass core surrounded by an optical cladding with a lower refractive index, achieving Total Internal Reflection (TIR).',
    keyPhysics: "Snell's Law & Total Internal Reflection (TIR): When light strikes the boundary between the core (refractive index n1) and cladding (refractive index n2) at an angle of incidence greater than the critical angle θc = arcsin(n2/n1), 100% of the light reflects back into the core without optical leakage.",
    bandwidthRange: 'Terahertz (> 50 THz optical window)',
    typicalDataRate: '1 Gbps to 800+ Gbps per wavelength (Tbps DWDM)',
    maximumDistance: '2 km (Multi-mode) to 100+ km (Single-mode without amplification)',
    attenuationRate: 'Extremely Low (~0.2 dB / km at 1550 nm)',
    propagationSpeed: '0.67 c – 0.69 c (~204,000 km/s in silica glass)',
    velocityFactor: 0.68,
    emiImmunity: 'Immune',
    costLevel: '$$$$',
    securityLevel: 'Ultra-High',
    commonConnectors: ['LC (Lucent Connector)', 'SC (Subscriber Connector)', 'ST (Straight Tip)', 'MPO / MTP (12-24 fibers)'],
    standards: ['ITU-T G.652 (SMF)', 'ISO/IEC 11801 (OM1–OM5)', 'IEEE 802.3ba / bs'],
    typicalApplications: [
      'Transoceanic submarine intercontinental data cables',
      'Telecommunications national fiber backbones and FTTH (Fiber to the Home)',
      'Data center high-speed spine-leaf 100G/400G interconnects',
      'High-voltage electric utility substations (zero ground loop risk)'
    ],
    advantages: [
      'Immense, practically boundless bandwidth over Dense Wavelength Division Multiplexing (DWDM)',
      '100% immune to electromagnetic interference, lightning strikes, and radio frequency interference',
      'Ultra-low attenuation allows transmission across 80–100 km without active repeaters',
      'Highest security: cannot be tapped inductively without breaking glass and causing detectable optical loss'
    ],
    disadvantages: [
      'Higher equipment cost (optical transceivers, laser diodes, photodetectors)',
      'Requires precision fusion splicing tools and cleanroom-level cleanliness',
      'Cannot carry direct DC electrical power (PoE) without hybrid copper lines'
    ],
    subtypes: [
      { name: 'Single-Mode Fiber (SMF, OS2)', description: 'Tiny core (8–9 μm) permits only one light mode to propagate, eliminating modal dispersion. Used for long-distance telecommunications.', keyMetric: 'Core: 9 μm | Range: 100+ km' },
      { name: 'Multi-Mode Fiber (MMF, OM3/OM4/OM5)', description: 'Wider core (50–62.5 μm) allows multiple light rays to bounce at different angles. Susceptible to modal dispersion, ideal for campus & data centers.', keyMetric: 'Core: 50 μm | Range: up to 550m' },
      { name: 'Step-Index vs Graded-Index', description: 'Step-index has abrupt refractive index step; Graded-index parabolic profile bends rays progressively to equalize travel times.', keyMetric: 'Graded reduces modal dispersion' }
    ],
    layers: [
      { id: 'fo-1', name: 'Silica Glass Core', material: 'Ultrapure Germanium-doped Silica Glass (SiO2)', purpose: 'High refractive index (n1 ≈ 1.47) transmission channel where photons propagate', specs: '9 μm (SMF) or 50 μm (MMF)', colorHex: '#06B6D4' },
      { id: 'fo-2', name: 'Optical Glass Cladding', material: 'Pure Silica Glass (SiO2)', purpose: 'Lower refractive index (n2 ≈ 1.45) causing Total Internal Reflection at the core boundary', specs: '125 μm uniform diameter', colorHex: '#E0F2FE' },
      { id: 'fo-3', name: 'Primary Buffer Coating', material: 'Dual-layer UV-cured Acrylate Resin', purpose: 'Protects the bare microscopic glass fiber from surface micro-cracks and moisture', specs: '250 μm diameter', colorHex: '#FBBF24' },
      { id: 'fo-4', name: 'Aramid Strength Yarn (Kevlar)', material: 'Woven Para-aramid Synthetic Fiber', purpose: 'Absorbs tensile pulling tension during cable installation so fragile glass does not stretch', specs: 'Tensile load rating > 600 N', colorHex: '#FACC15' },
      { id: 'fo-5', name: 'Outer Protective Jacket', material: 'Yellow (OS2) / Aqua (OM3/4) / Orange (OM1) LSZH', purpose: 'Color-coded flame retardant jacket indicating fiber mode and protecting core bundle', specs: 'Riser / Plenum certified', colorHex: '#F97316' }
    ]
  },
  {
    id: 'radio',
    name: 'Radio Waves',
    shortName: 'Radio Waves',
    category: 'unguided',
    tagline: 'Omnidirectional electromagnetic waves capable of penetrating structural obstacles',
    description: 'Electromagnetic waves spanning from 3 kHz up to 1 GHz. Because radio waves are omnidirectional, when an antenna transmits radio waves, they propagate through the atmosphere in all directions, allowing receiving antennas to pick up signals without strict alignment.',
    keyPhysics: 'Maxwell’s Equations & Omnidirectional Radiation: Alternating current in an antenna creates radiating electric and magnetic fields perpendicular to each other. At lower frequencies, waves undergo ground-wave diffraction following the Earth’s curvature; at MF/HF they reflect off the ionosphere.',
    bandwidthRange: '3 kHz – 1 GHz (VLF, LF, MF, HF, VHF, UHF)',
    typicalDataRate: 'Kbps to 100+ Mbps (e.g. Wi-Fi 2.4 GHz, LTE)',
    maximumDistance: 'Tens of meters (Wi-Fi) to thousands of kilometers (Shortwave)',
    attenuationRate: 'Proportional to inverse square of distance (1/d² in free space)',
    propagationSpeed: '1.0 c (300,000 km/s in vacuum / atmosphere)',
    velocityFactor: 1.0,
    emiImmunity: 'None',
    costLevel: '$',
    securityLevel: 'Low',
    commonConnectors: ['SMA / RP-SMA', 'Dipole Antenna', 'Whip Antenna', 'Loop Antenna'],
    standards: ['ITU Radio Regulations', 'IEEE 802.11b/g/n (2.4 GHz)', '3GPP LTE / 5G Sub-6'],
    typicalApplications: [
      'AM and FM radio broadcasting',
      'Television broadcast networks (VHF/UHF)',
      'Maritime and aviation communication (VHF airband)',
      'Cellular mobile communication and 2.4 GHz Wi-Fi / Bluetooth'
    ],
    advantages: [
      'Omnidirectional coverage: no physical line-of-sight pointing required between sender and receiver',
      'Can penetrate walls, foliage, and structural obstacles easily at lower frequencies',
      'Enables true untethered mobility for mobile users and vehicles'
    ],
    disadvantages: [
      'Easily intercepted by any receiver within range (low inherent privacy)',
      'Highly susceptible to electromagnetic interference from electric motors, weather, and competing channels',
      'Strict regulatory spectrum licensing required to prevent frequency jamming'
    ],
    subtypes: [
      { name: 'Ground Wave Propagation (VLF/LF)', description: 'Waves hug the contour of the Earth through diffraction. Used in submarine and long-wave navigation.', keyMetric: '< 2 MHz' },
      { name: 'Sky Wave Propagation (HF / Shortwave)', description: 'Waves bounce between the ionospheric atmospheric layer and Earth surface for intercontinental skip.', keyMetric: '3 MHz – 30 MHz' },
      { name: 'Line-of-Sight Space Waves (VHF/UHF)', description: 'Direct transmission through air. Obstacles and curvature of Earth limit horizon distance.', keyMetric: '30 MHz – 1 GHz' }
    ]
  },
  {
    id: 'microwave',
    name: 'Microwave Signals',
    shortName: 'Microwaves',
    category: 'unguided',
    tagline: 'High-frequency directional beam propagation for terrestrial and satellite links',
    description: 'Electromagnetic waves spanning frequencies between 1 GHz and 300 GHz. Due to their short wavelength, microwaves behave like light beams: they travel in narrow, focused straight lines and do not bend around obstacles, requiring precise line-of-sight alignment.',
    keyPhysics: 'Directional Beamforming & Free Space Path Loss (FSPL): Parabolic reflector dishes concentrate EM energy into narrow pencil beams, maximizing antenna gain G. Path loss follows FSPL = 20 log10(d) + 20 log10(f) + 92.45 dB.',
    bandwidthRange: '1 GHz – 300 GHz (L, S, C, X, Ku, Ka, V bands)',
    typicalDataRate: '100 Mbps to 10+ Gbps',
    maximumDistance: '40–50 km (Terrestrial towers) / 36,000 km (Geostationary Satellites)',
    attenuationRate: 'Increases rapidly with frequency; severe rain fade above 10 GHz',
    propagationSpeed: '1.0 c (300,000 km/s in atmosphere / space)',
    velocityFactor: 1.0,
    emiImmunity: 'Moderate',
    costLevel: '$$$',
    securityLevel: 'Moderate',
    commonConnectors: ['Parabolic Dish', 'Horn Antenna', 'Waveguide Flanges', 'Phased Array'],
    standards: ['ITU-R Satellite Bands', 'IEEE 802.11ac/ax/be (5 GHz / 6 GHz)', 'DVB-S2'],
    typicalApplications: [
      'Terrestrial relay links between telecommunication cell towers on mountain peaks',
      'Geostationary (GEO) and Low Earth Orbit (LEO Starlink) satellite Internet links',
      'Radar systems for air traffic control and weather monitoring',
      'Wireless point-to-point building-to-building enterprise bridges'
    ],
    advantages: [
      'Can span rough geographical terrain (oceans, mountains, ravines) where laying physical cable is cost-prohibitive',
      'Enormous bandwidth capacity compared to lower frequency radio bands',
      'Directional focus limits signal spillover and reduces accidental interference'
    ],
    disadvantages: [
      'Strict Line-of-Sight (LOS) requirement; blocked by terrain, buildings, and tree cover',
      'Terrestrial towers require repeaters every 40–50 km due to the Earth curvature',
      'Susceptible to atmospheric absorption and rain fade (water droplets absorb 10+ GHz waves)'
    ],
    subtypes: [
      { name: 'Terrestrial Microwave', description: 'Point-to-point line-of-sight relays on towers or hills with parabolic horn antennas. Relay hops compensate for Earth curvature.', keyMetric: '40–50 km hop distance' },
      { name: 'Satellite Microwave (GEO / LEO)', description: 'Ground station transceivers transmit uplink signals to orbital satellites, which amplify and shift frequencies for downlink broadcast.', keyMetric: 'GEO: 35,786 km (250ms latency)' },
      { name: 'Millimeter Wave (mmWave 30–300 GHz)', description: 'Ultra-high throughput 5G band offering multi-gigabit speeds over hundreds of meters.', keyMetric: 'High capacity, short range' }
    ]
  },
  {
    id: 'infrared',
    name: 'Infrared Transmission',
    shortName: 'Infrared (IR)',
    category: 'unguided',
    tagline: 'High-frequency optical wireless signals confined to single-room environments',
    description: 'Electromagnetic radiation spanning from 300 GHz to 400 THz (wavelengths 750 nm to 1 mm), positioned just below visible red light. Infrared cannot penetrate solid walls, making it exceptionally secure from unauthorized external eavesdropping.',
    keyPhysics: 'Photonic Emission & Opaque Barrier Absorption: Infrared LEDs emit incoherent optical wavelengths absorbed completely by drywall, glass coatings, and opaque matter, preventing radiation escape and eliminating inter-room interference.',
    bandwidthRange: '300 GHz – 400 THz',
    typicalDataRate: '115 Kbps to 16 Mbps (IrDA) / Gbps in Free Space Optics',
    maximumDistance: '1 to 10 meters (consumer) / up to 1 km (laser line-of-sight FSO)',
    attenuationRate: 'Very high; completely blocked by dust, fog, smoke, and solid walls',
    propagationSpeed: '1.0 c (300,000 km/s in air)',
    velocityFactor: 1.0,
    emiImmunity: 'High',
    costLevel: '$',
    securityLevel: 'High',
    commonConnectors: ['IR Transmitter Diode', 'Phototransistor Receiver', 'IrDA Port', 'FSO Laser Collimator'],
    standards: ['IrDA (Infrared Data Association)', 'RC-5 / NEC Protocol', 'IEEE 802.11 (legacy IR)'],
    typicalApplications: [
      'Consumer electronics remote controls (TV, AC, projectors)',
      'Short-range peer-to-peer data transfer between legacy mobile devices',
      'Wireless optical mice, keyboards, and headphone audio links',
      'Free Space Optics (FSO) rooftop optical links between financial buildings'
    ],
    advantages: [
      'High security: signals cannot leak through solid walls into neighboring rooms',
      'No spectrum licensing required from government regulatory bodies (FCC/ITU)',
      'Immune to standard RF electromagnetic noise from microwave ovens or radio towers'
    ],
    disadvantages: [
      'Strict line-of-sight or diffuse reflection required; easily obstructed by people walking',
      'Short operational range (typically under 10 meters for consumer gear)',
      'Direct sunlight and incandescent lighting introduce severe optical noise saturation'
    ],
    subtypes: [
      { name: 'Directed Line-of-Sight IR', description: 'Requires direct pointing between transmitter and receiver. Used in consumer TV remotes and barcode scanners.', keyMetric: 'Angle: ±15 degrees' },
      { name: 'Diffuse (Omnidirectional) IR', description: 'Transmitter floods the ceiling with infrared light; reflections allow receivers to pick up data without aiming.', keyMetric: 'Room-scale coverage' },
      { name: 'Free Space Optics (FSO)', description: 'High-power optical laser beams transmitted through open air between building rooftops for gigabit backhaul.', keyMetric: 'Up to 10 Gbps (1 km)' }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why are the copper wires in a Twisted Pair cable twisted around each other in pairs?',
    category: 'guided',
    options: [
      'To increase the physical strength and tensile durability of the cable',
      'To make both wires absorb equal electromagnetic noise so differential signaling cancels it out',
      'To accelerate the speed of electric current through the conductor',
      'To prevent the copper from oxidizing inside the plastic jacket'
    ],
    correctIndex: 1,
    explanation: 'By twisting the pairs, both conductors experience identical external electromagnetic noise. The receiving differential amplifier subtracts the two signals (V+ - V-), effectively eliminating common-mode noise and reducing crosstalk.',
    mediaReference: 'twisted-pair'
  },
  {
    id: 2,
    question: 'Which optical phenomenon enables light to travel through the glass core of a Fiber Optic cable without escaping?',
    category: 'guided',
    options: [
      'Optical Polarized Dispersion',
      'Total Internal Reflection (TIR) at the core-cladding boundary',
      'Electromagnetic Radiation Induction',
      'Photoelectric Electron Amplification'
    ],
    correctIndex: 1,
    explanation: 'Total Internal Reflection occurs when light in a denser medium (higher refractive index core) strikes the boundary with a less dense medium (lower refractive index cladding) at an angle greater than the critical angle, reflecting 100% of the light back.',
    mediaReference: 'fiber-optic'
  },
  {
    id: 3,
    question: 'Why can Radio Waves penetrate walls and buildings while Infrared signals cannot?',
    category: 'unguided',
    options: [
      'Radio waves have much higher energy per photon than infrared',
      'Radio waves have longer wavelengths and lower frequencies that undergo diffraction through non-conductive barriers',
      'Infrared signals are made of sound vibrations that bounce off solid walls',
      'Radio waves travel faster than the speed of light in vacuum'
    ],
    correctIndex: 1,
    explanation: 'Radio waves have long wavelengths (meters to centimeters), allowing them to pass through drywall and obstacles. Infrared has sub-millimeter wavelengths that are absorbed or reflected by opaque materials.',
    mediaReference: 'radio'
  },
  {
    id: 4,
    question: 'What is the primary factor limiting the maximum distance between terrestrial microwave relay towers?',
    category: 'unguided',
    options: [
      'The curvature of the Earth requiring towers to maintain direct optical Line-of-Sight (LOS)',
      'The speed of light slowing down in the lower troposphere',
      'Lack of electrical power in rural antenna locations',
      'Interference from solar wind cosmic rays'
    ],
    correctIndex: 0,
    explanation: 'Because microwaves travel in strict straight lines without bending around the Earth, towers must maintain line-of-sight. The curvature of the Earth limits ground-based relay hops to roughly 40–50 km before the horizon blocks the beam.',
    mediaReference: 'microwave'
  },
  {
    id: 5,
    question: 'Which transmission medium is completely immune to Electromagnetic Interference (EMI) and Radio Frequency Interference (RFI)?',
    category: 'guided',
    options: [
      'Shielded Twisted Pair (STP)',
      'Heavy RG-11 Coaxial Cable',
      'Fiber Optic Cable',
      'Directional Parabolic Microwave'
    ],
    correctIndex: 2,
    explanation: 'Fiber optic cables transmit data as pulses of light (photons) through non-conductive silica glass, making them intrinsically immune to electromagnetic induction, electrical ground loops, and radio interference.',
    mediaReference: 'fiber-optic'
  },
  {
    id: 6,
    question: 'In Coaxial Cable design, what is the crucial purpose of the foamed dielectric insulator between the core and the metallic braid?',
    category: 'guided',
    options: [
      'To provide a decorative cushion for the copper wire',
      'To maintain exact concentric separation to ensure uniform characteristic impedance (e.g., 75Ω)',
      'To generate magnetic fields that boost data transmission speed',
      'To dissolve heat generated by optical lasers'
    ],
    correctIndex: 1,
    explanation: 'The dielectric constant and the precise geometric ratio of outer conductor radius to inner conductor radius dictate the characteristic impedance (typically 50Ω or 75Ω) and prevent signal reflections.',
    mediaReference: 'coaxial'
  },
  {
    id: 7,
    question: 'What is the core diameter difference between Single-Mode Fiber (SMF) and Multi-Mode Fiber (MMF)?',
    category: 'guided',
    options: [
      'SMF has a tiny core (~9 μm) supporting one light ray mode; MMF has a wider core (50–62.5 μm) allowing multiple ray modes',
      'SMF core is made of pure copper, while MMF is made of glass',
      'SMF core is 500 μm, while MMF is 9 μm',
      'SMF only works with radio frequencies, while MMF works with lasers'
    ],
    correctIndex: 0,
    explanation: 'Single-Mode Fiber has an 8–9 μm core, forcing light along a single axial path and eliminating modal dispersion over long distances. Multi-mode fiber has a 50–62.5 μm core where multiple reflection angles cause modal dispersion.',
    mediaReference: 'fiber-optic'
  },
  {
    id: 8,
    question: 'Why are Infrared communication systems considered physically more secure than Radio wave systems inside an office?',
    category: 'unguided',
    options: [
      'Infrared data is encrypted automatically by atmospheric nitrogen',
      'Infrared signals cannot pass through opaque walls, restricting reception strictly to the room of origin',
      'Infrared travels at twice the speed of radio waves',
      'Infrared signals cannot be detected by electronic photodetectors'
    ],
    correctIndex: 1,
    explanation: 'Because infrared signals cannot penetrate solid walls, eavesdroppers in adjacent rooms or outside the building cannot intercept the transmission without physical presence in the room.',
    mediaReference: 'infrared'
  }
];
