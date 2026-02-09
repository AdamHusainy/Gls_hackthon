import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import './Explore.css';
import { FaSearch, FaChevronDown, FaBriefcase, FaStar, FaTrophy, FaChevronRight, FaTimes, FaCrown, FaArrowRight, FaMapMarkerAlt, FaCommentAlt, FaRegClock } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import MentorProfileSidebar from './MentorProfileSidebar';

export default function Explore() {
    const filters = {
        domain: ["Frontend", "Backend", "Fullstack", "DevOps / SRE / Cloud", "QA / Automation Testing", "Data Scientist / AI/ML", "Data Analyst"],
        companies: ["Amazon", "Microsoft", "Google", "Preplaced", "Salesforce", "Uber", "Airbnb"],
        skills: ["Javascript", "CSS", "DSA", "HTML", "System Design", "React", "Java", "Python"],
        tools: ["Git", "Visual Studio Code", "Postman", "GitHub", "Docker"],
        languages: ["English", "Hindi", "Telugu", "Bengali", "Marathi"],
        mentorshipFor: ["Freshers", "Working Professionals"]
    };

    // Enhanced Mentors Data
    const mentors = [
        {
            id: 1,
            name: "Aman Jaiswal",
            role: "Senior Frontend Engineer",
            company: "DBS",
            companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/DBS_Bank_logo.svg/2560px-DBS_Bank_logo.svg.png",
            prevCompany: "Amdocs",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            exp: "7+ years",
            rating: 5.0,
            reviews: 130, // converted to number for better handling if needed
            mentees: "10+",
            placements: 19,
            isStar: true,
            location: "Telangana, India",
            languages: ["English", "Hindi"],
            sessionsPerWeek: "1x",
            referrals: true,
            referralCompanies: "Top Companies",
            bio: "I have already given and taken 450+ interviews. I have clear picture in my mind what all things you have to prepare to achieve your dream job. With my guidance, I can assure you gu...",
            skills: ["JavaScript", "React", "DSA", "System Design", "Frontend Architecture", "LLD", "HTML", "CSS"],
            moreSkills: "+4 More",
            targetDomains: ["Frontend Developer"],
            plans: {
                "1 Month": { price: 10000, currency: "₹", total: 10000 },
                "3 Month": { price: 10000, currency: "₹", total: 30000, discount: "" },
                "6 Months": { price: 10000, currency: "₹", total: 60000, discount: "" }
            },
            nextAvailable: "Tomorrow, 07:00 PM"
        },
        {
            id: 2,
            name: "Shubham Khanna",
            role: "Senior Software Engineer",
            company: "Booking Holdings - Agoda",
            companyLogo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Booking.com_logo.svg",
            prevCompany: "ex-CRED",
            img: "https://randomuser.me/api/portraits/men/45.jpg",
            exp: "7+ Years",
            rating: 5.0,
            reviews: 60,
            mentees: "10+",
            placements: 10,
            isStar: true,
            location: "Haryana, India",
            languages: ["English", "Hindi"],
            sessionsPerWeek: "1x",
            referrals: true,
            referralCompanies: "Top Companies",
            bio: "🚀 Senior Software Engineer @Booking.com | ex-CRED, Arcesium (D.E. Shaw) | 6+ yrs mentoring | 500+ tech interviews | DSA, LLD, HLD, mock interviews & custom prep to help you crack...",
            skills: ["DSA", "System Design", "LLD", "HLD", "Machine Coding", "Java", "Java Springboot"],
            targetDomains: ["Frontend Developer", "Backend Developer"],
            plans: {
                "1 Month": { price: 15000, currency: "₹", total: 15000 },
                "3 Month": { price: 15000, currency: "₹", total: 45000 },
                "6 Months": { price: 15000, currency: "₹", total: 90000 }
            },
            nextAvailable: "Sat Feb 14 2026"
        },
        {
            id: 3,
            name: "Rengaraj Narayanasamy",
            role: "Senior consultant",
            company: "Ernst and young",
            companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Ernst_%26_Young_logo.svg/1200px-Ernst_%26_Young_logo.svg.png",
            prevCompany: "HCL | IVL",
            img: "https://randomuser.me/api/portraits/men/22.jpg",
            exp: "9+ Years",
            rating: 0,
            reviews: 0,
            mentees: "0",
            placements: 0,
            isStar: false,
            location: "Karnataka, India",
            languages: ["English", "Tamil", "Telugu"],
            sessionsPerWeek: "2x",
            referrals: true,
            referralCompanies: "Top Companies",
            bio: "Hi, I'm a Frontend Developer with 8 years of experience working with React.js, JavaScript, HTML, CSS, and modern frontend architecture. I help students and early-career developers...",
            skills: ["HTML", "CSS", "React", "Typescript", "Javascript", "NodeJS", "System Design", "Frontend Architecture"],
            moreSkills: "+3 More",
            targetDomains: ["Frontend Developer"],
            plans: {
                "1 Month": { price: 2500, currency: "₹", total: 2500 },
                "3 Month": { price: 2500, currency: "₹", total: 7500, discount: "Extra 40% OFF" },
                "6 Months": { price: 2500, currency: "₹", total: 15000 }
            },
            nextAvailable: "Tomorrow, 04:00 AM"
        },
        {
            id: 4,
            name: "Bhagirath Auti",
            role: "Technology Apprentice",
            company: "Morgan Stanley",
            companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Morgan_Stanley_Logo_1.svg/1200px-Morgan_Stanley_Logo_1.svg.png",
            prevCompany: "Aspivision",
            img: "https://randomuser.me/api/portraits/men/15.jpg",
            exp: "3+ Years",
            rating: 0,
            reviews: 0,
            mentees: "0",
            placements: 0,
            isStar: false,
            location: "Maharashtra, India",
            languages: ["English", "Hindi", "Marathi"],
            sessionsPerWeek: "2x",
            referrals: true,
            referralCompanies: "Top Companies",
            bio: "🚀 Hey there! I'm excited to be your mentor on this journey. With hands-on experience in MERN stack development, full-stack web technologies, and building real-world applications i...",
            skills: ["React", "ReactJS", "Python", "Java", "JavaScript", "HTML", "CSS", "MERN Stack Development", "Angular"],
            moreSkills: "+6 More",
            targetDomains: ["Fullstack Developer"],
            plans: {
                "1 Month": { price: 5000, currency: "₹", total: 5000 },
                "3 Month": { price: 5000, currency: "₹", total: 15000, discount: "Extra 30% OFF" },
                "6 Months": { price: 5000, currency: "₹", total: 30000 }
            },
            nextAvailable: "Sat Feb 14 2026"
        }
    ];

    const [showModal, setShowModal] = useState(false);
    const [selectedMentorForTrial, setSelectedMentorForTrial] = useState(null);

    // Sidebar State
    const [sidebarMentor, setSidebarMentor] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openTrialModal = (mentor, e) => {
        if (e) e.stopPropagation(); // Prevent Sidebar from opening if clicking Book directly
        setSelectedMentorForTrial(mentor);
        setShowModal(true);
    };

    const openSidebar = (mentor) => {
        setSidebarMentor(mentor);
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        setTimeout(() => setSidebarMentor(null), 300); // Wait for animation
    };

    const [selectedDuration, setSelectedDuration] = useState("6 Months");
    const [showStarOnly, setShowStarOnly] = useState(false);
    const [sortBy, setSortBy] = useState("Recommended");

    // Sidebar States
    const [priceRange, setPriceRange] = useState(15000);
    const [expRange, setExpRange] = useState(5);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedTools, setSelectedTools] = useState([]);
    const [selectedDomains, setSelectedDomains] = useState([]); // Added Domain State

    // Toggles
    const toggleCompany = (c) => {
        if (selectedCompanies.includes(c)) setSelectedCompanies(selectedCompanies.filter(item => item !== c));
        else setSelectedCompanies([...selectedCompanies, c]);
    };
    const toggleSkill = (s) => {
        if (selectedSkills.includes(s)) setSelectedSkills(selectedSkills.filter(item => item !== s));
        else setSelectedSkills([...selectedSkills, s]);
    };
    const toggleTool = (t) => {
        if (selectedTools.includes(t)) setSelectedTools(selectedTools.filter(item => item !== t));
        else setSelectedTools([...selectedTools, t]);
    };
    const toggleDomain = (d) => { // Added Domain Toggle
        if (selectedDomains.includes(d)) setSelectedDomains(selectedDomains.filter(item => item !== d));
        else setSelectedDomains([...selectedDomains, d]);
    };

    // Clear Filters
    const clearFilters = () => {
        setPriceRange(5000); // Reset to min
        setExpRange(0);      // Reset to min
        setSelectedCompanies([]);
        setSelectedSkills([]);
        setSelectedTools([]);
        setSelectedDomains([]);
        setShowStarOnly(false);
    };

    // Filter Logic
    const filteredMentors = mentors.filter(mentor => {
        if (showStarOnly && !mentor.isStar) return false;

        // ** Domain Filter Logic **
        if (selectedDomains.length > 0) {
            const hasMatchingDomain = mentor.targetDomains.some(domain =>
                selectedDomains.some(filter => domain.toLowerCase().includes(filter.toLowerCase()))
            );
            if (!hasMatchingDomain) return false;
        }

        return true;
    });

    // Sort Logic
    const sortedMentors = [...filteredMentors].sort((a, b) => {
        if (sortBy === "Price: Low to High") {
            return a.plans[selectedDuration].price - b.plans[selectedDuration].price;
        }
        if (sortBy === "Price: High to Low") {
            return b.plans[selectedDuration].price - a.plans[selectedDuration].price;
        }
        // Simple string comparison for now, functionally would need real dates
        if (sortBy === "Availability") {
            return a.nextAvailable.localeCompare(b.nextAvailable);
        }
        return 0; // Recommended (Default order)
    });

    return (
        <div className="explore-page">
            <Navbar />

            {/* Trial Booking Modal */}
            {showModal && selectedMentorForTrial && (
                <div className="modal-overlay" style={{ zIndex: 10000 }}>
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setShowModal(false)}><FaTimes /></button>
                        <TrialModalContent mentor={selectedMentorForTrial} />
                    </div>
                </div>
            )}

            {/* Mentor Profile Slide-in Sidebar */}
            <MentorProfileSidebar
                mentor={sidebarMentor}
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
                onBookMock={() => openTrialModal(sidebarMentor)}
            />

            <div className="explore-container">
                {/* MAIN CONTENT SIDE (LEFT) */}
                <main className="explore-content">
                    <div className="explore-header-actions">
                        <div className="search-bar">
                            <FaSearch className="search-icon" />
                            <input type="text" placeholder="Search for any Skill, domain or name..." />
                        </div>
                        <div className="sort-dropdown-container">
                            <span className="sort-label">Sort by:</span>
                            <div className="custom-sort-select">
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option>Recommended</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Availability</option>
                                </select>
                                <FaChevronDown className="sort-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="mentors-list">
                        {sortedMentors.map(mentor => (
                            <div
                                key={mentor.id}
                                className={`explore-mentor-card ${mentor.isStar ? 'star-mentor' : ''}`}
                                onClick={() => openSidebar(mentor)}
                                style={{ cursor: 'pointer' }}
                            >
                                {/* Left Column: Mentor Info */}
                                <div className="mentor-info-col">
                                    <div className="mentor-header">
                                        <div className="mentor-image-container">
                                            <img src={mentor.img} alt={mentor.name} className="explore-mentor-img" />
                                            {mentor.isStar && <div className="star-badge"><FaStar color="#FFD700" size={10} /> {mentor.rating} ({mentor.mentees} mentees)</div>}
                                        </div>
                                        <div className="mentor-basic">
                                            <div className="name-row">
                                                <h3>{mentor.name}</h3>
                                                {mentor.placements > 0 && <span className="placements-badge">🏆 {mentor.placements} Placements</span>}
                                            </div>
                                            <div className="location-row">
                                                <span><FaMapMarkerAlt /> {mentor.location}</span>
                                                <span className="dot">•</span>
                                                <span><FaStar size={10} /> {mentor.reviews} reviews</span>
                                                <span className="dot">•</span>
                                                <span><FaCommentAlt size={10} /> {mentor.languages.join(", ")}</span>
                                            </div>

                                            <div className="current-role-box">
                                                <div className="role-company">
                                                    <img src={mentor.companyLogo} alt={mentor.company} className="company-logo-sm" />
                                                    <div>
                                                        <div className="role-title">{mentor.role}</div>
                                                        <div className="company-name">{mentor.company}</div>
                                                    </div>
                                                </div>
                                                {mentor.prevCompany && (
                                                    <div className="prev-company">
                                                        <div className="exp-years">{mentor.exp}</div>
                                                        <div className="prev-name">{mentor.prevCompany}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="mentor-bio">{mentor.bio} <span className="read-more">Read More</span></p>

                                    <div className="mentor-skills">
                                        {mentor.skills.map((skill, i) => (
                                            <span key={i} className="skill-tag">{skill}</span>
                                        ))}
                                        {mentor.moreSkills && <span className="skill-tag more">{mentor.moreSkills}</span>}
                                    </div>

                                    <div className="mentor-footer">
                                        <p><FaBriefcase /> For: Fresher | Working Professional</p>
                                        <p><BsCheckCircleFill /> Targeting Domains: {mentor.targetDomains.join(", ")} | <a href="#" onClick={(e) => e.preventDefault()}>More</a></p>
                                    </div>
                                </div>

                                {/* Right Column: Pricing & Actions */}
                                <div className="mentor-action-col">
                                    <div className="duration-tabs" onClick={(e) => e.stopPropagation()}>
                                        {["6 Months", "3 Month", "1 Month"].map(d => (
                                            <button
                                                key={d}
                                                className={`tab-btn ${selectedDuration === d ? 'active' : ''}`}
                                                onClick={() => setSelectedDuration(d)}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="session-features">
                                        <div className="feature-row"><span className="icon">📞</span> {mentor.sessionsPerWeek} Sessions Per Week</div>
                                        <div className="feature-row"><span className="icon">💼</span> Referrals in {mentor.referralCompanies} <span className="more-link">+12 More</span></div>
                                        {mentor.isStar && <div className="feature-row"><span className="icon">💎</span> Detailed Curriculum Available <span className="view-link">View ↗</span></div>}
                                    </div>

                                    <div className="price-section">
                                        <div className="price-row">
                                            <span className="price-amount">{mentor.plans[selectedDuration].currency}{mentor.plans[selectedDuration].price.toLocaleString()}</span>
                                            <span className="price-period">/Month</span>
                                        </div>
                                        {mentor.plans[selectedDuration].discount && <div className="discount-badge">{mentor.plans[selectedDuration].discount}</div>}
                                    </div>

                                    <button className="view-profile-btn" onClick={(e) => { e.stopPropagation(); openSidebar(mentor); }}>View Profile</button>
                                    <button className="explore-book-btn" onClick={(e) => openTrialModal(mentor, e)}>Book a Free Trial</button>
                                    <div className="next-available">Next Available: <span>{mentor.nextAvailable}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* SIDEBAR SIDE (RIGHT) */}
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <h3>Filter By</h3>
                        <button className="clear-btn" onClick={clearFilters}><FaTimes /> Clear Filters</button>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Domain</div>
                        <div className="filter-chips">
                            {filters.domain.map((item, idx) => (
                                <button
                                    key={idx}
                                    className={`filter-chip ${selectedDomains.includes(item) ? 'active' : ''}`}
                                    onClick={() => toggleDomain(item)}
                                >
                                    {item}
                                    {selectedDomains.includes(item) && <FaTimes className="chip-close" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Offering Mentorship For</div>
                        <div className="custom-select">
                            <select>
                                <option>Freshers</option>
                                <option>Working Professionals</option>
                            </select>
                            <FaChevronDown className="select-icon" />
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Pricing</div>
                        <div className="custom-range-slider">
                            <div className="range-labels">
                                <span>₹5,000</span>
                                <span>₹{priceRange.toLocaleString()}</span>
                            </div>
                            <div className="range-track-container">
                                <input
                                    type="range"
                                    min="5000"
                                    max="40000"
                                    step="1000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="styled-range"
                                />
                                <div className="range-dots">
                                    {[...Array(9)].map((_, i) => <div key={i} className="dot"></div>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Experience</div>
                        <div className="custom-range-slider">
                            <div className="range-labels">
                                <span>0 Years</span>
                                <span>{expRange} Years</span>
                            </div>
                            <div className="range-track-container">
                                <input
                                    type="range"
                                    min="0"
                                    max="15"
                                    value={expRange}
                                    onChange={(e) => setExpRange(Number(e.target.value))}
                                    className="styled-range"
                                />
                                <div className="range-dots">
                                    {[...Array(9)].map((_, i) => <div key={i} className="dot"></div>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Companies <FaChevronDown /></div>
                        {/* Selected Tags Area (Visual Searchbox) */}
                        <div className="filter-searchbox-container">
                            {selectedCompanies.map(c => (
                                <span key={c} className="selected-tag">
                                    {c} <FaTimes className="remove-tag" onClick={() => toggleCompany(c)} />
                                </span>
                            ))}
                            <input type="text" placeholder={selectedCompanies.length === 0 ? "eg: amazon, google..." : ""} />
                        </div>
                        {/* Suggestions */}
                        <div className="filter-chips-row">
                            {filters.companies.slice(0, 4).map((c, i) => (
                                <div key={i} className={`mini-chip ${selectedCompanies.includes(c) ? 'active' : ''}`} onClick={() => toggleCompany(c)}>
                                    <img src="" alt="" className="mini-logo" /> {c}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Skills <FaChevronDown /></div>
                        <div className="filter-searchbox-container">
                            {selectedSkills.map(s => (
                                <span key={s} className="selected-tag">
                                    {s} <FaTimes className="remove-tag" onClick={() => toggleSkill(s)} />
                                </span>
                            ))}
                            <input type="text" placeholder={selectedSkills.length === 0 ? "eg: java, dsa..." : ""} />
                        </div>
                        <div className="filter-chips-row">
                            {filters.skills.slice(0, 5).map((s, i) => (
                                <div key={i} className={`mini-chip ${selectedSkills.includes(s) ? 'active' : ''}`} onClick={() => toggleSkill(s)}>
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Tools <FaChevronDown /></div>
                        <div className="filter-searchbox-container">
                            {selectedTools.map(t => (
                                <span key={t} className="selected-tag">
                                    {t} <FaTimes className="remove-tag" onClick={() => toggleTool(t)} />
                                </span>
                            ))}
                            <input type="text" placeholder={selectedTools.length === 0 ? "eg: git, postman..." : ""} />
                        </div>
                        {/* Suggested Tools (Implied from request) */}
                        <div className="filter-chips-row">
                            {filters.tools.map((t, i) => (
                                <div key={i} className={`mini-chip ${selectedTools.includes(t) ? 'active' : ''}`} onClick={() => toggleTool(t)}>
                                    <img src="" alt="" className="mini-logo" /> {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="toggle-row">
                            <span><FaStar color="#f59e0b" /> Show Only Star Mentors</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={showStarOnly}
                                    onChange={(e) => setShowStarOnly(e.target.checked)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <p className="toggle-subtext">Mentor with high placement/success rate at Preplaced</p>
                    </div>

                </aside>
            </div>
            <Footer />
        </div>
    );
}

// Sub-component for the Modal Content to keep things clean
function TrialModalContent({ mentor }) {
    const [trialType, setTrialType] = useState('free'); // 'free' or 'golden'

    return (
        <div className="trial-modal-inner">
            <div className="trial-header">
                <h2>Select Date and Time</h2>
                <p>Book a trial session with <img src={mentor.img} alt="" className="tiny-avatar" /> <strong>{mentor.name}</strong></p>
            </div>

            <div className="trial-type-selector">
                <h3>Choose Your Trial Type</h3>
                <div className="trial-options-row">
                    {/* FREE OPTION */}
                    <div
                        className={`trial-option-card ${trialType === 'free' ? 'selected free' : ''}`}
                        onClick={() => setTrialType('free')}
                    >
                        <div className="option-header">
                            <span className="icon-clock"><FaRegClock /> Free Trial</span>
                            <span className="price-tag free">Free</span>
                        </div>
                        <ul className="option-benefits">
                            <li><BsCheckCircleFill className="check-icon" /> Basic mentorship session</li>
                            <li><BsCheckCircleFill className="check-icon" /> 30 minutes session duration</li>
                        </ul>
                    </div>

                    {/* GOLDEN OPTION */}
                    <div
                        className={`trial-option-card ${trialType === 'golden' ? 'selected golden' : ''}`}
                        onClick={() => setTrialType('golden')}
                    >
                        <div className="option-header">
                            <span className="icon-crown"><FaStar /> Golden Trial</span>
                            <span className="price-tag golden">₹199</span>
                        </div>
                        <ul className="option-benefits">
                            <li><BsCheckCircleFill className="check-icon" /> 100% show up by mentor</li>
                            <li><BsCheckCircleFill className="check-icon" /> Priority Slot within 24hrs</li>
                            <li><BsCheckCircleFill className="check-icon" /> Personalised mentorship plan and much more..</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* DYNAMIC CONTENT AREA */}
            <div className="trial-dynamic-content">
                {trialType === 'free' ? (
                    <div className="date-time-selection">
                        <h3>Select Date</h3>
                        <div className="date-cards">
                            {/* Mock Dates */}
                            {['MON\n9 Feb', 'TUE\n10 Feb', 'WED\n11 Feb', 'THU\n12 Feb'].map((d, i) => (
                                <div key={i} className={`date-card ${i === 1 ? 'active' : ''}`}> {/* highlighting 2nd for demo */}
                                    {i === 1 && <span className="rec-badge">RECOMMENDED</span>}
                                    <div className="date-text">{d}</div>
                                    <div className="slots-text">5 Slots</div>
                                </div>
                            ))}
                        </div>

                        <h3>Select Time</h3>
                        <div className="time-cards">
                            <div className="time-card active">
                                <span className="rec-badge">RECOMMENDED</span>
                                06:00 PM
                            </div>
                            <div className="time-card">06:15 PM</div>
                            <div className="time-card">06:30 PM</div>
                            <div className="time-card">06:45 PM</div>
                            <div className="time-card">07:00 PM</div>
                        </div>

                        <div className="modal-footer-action">
                            <div className="booking-summary-row">
                                <div className="summary-item"><FaBriefcase /> 10 Feb 2026</div>
                                <div className="summary-item"><FaRegClock /> 06:00 PM to 06:30 PM</div>
                                <div className="summary-item"><FaRegClock /> 30min (Session Time Slot)</div>
                            </div>
                            <button className="continue-btn">Continue <FaArrowRight /></button>
                        </div>
                    </div>
                ) : (
                    <div className="golden-details-view">
                        <div className="golden-card-main">
                            <div className="golden-hero-head">
                                <span className="bolt-icon">⚡</span>
                                <h3>Priority Scheduling within next 24 hours</h3>
                            </div>

                            <div className="golden-benefits-grid">
                                <div className="benefit-item">
                                    <span className="b-icon-box">📅</span>
                                    <div>
                                        <h4>100% Mentor Show-up</h4>
                                        <p>Guaranteed mentor attendance</p>
                                    </div>
                                </div>
                                <div className="benefit-item">
                                    <span className="b-icon-box red">🛡️</span>
                                    <div>
                                        <h4>No Cancellation by Mentor</h4>
                                        <p>Or repeated rescheduling</p>
                                    </div>
                                </div>
                                <div className="benefit-item">
                                    <span className="b-icon-box green">⏱️</span>
                                    <div>
                                        <h4>≥ 30+ mins session</h4>
                                        <p>Often gets extended</p>
                                    </div>
                                </div>
                                <div className="benefit-item">
                                    <span className="b-icon-box blue">📄</span>
                                    <div>
                                        <h4>Personalised Mentorship Plan</h4>
                                        <p>Sent to you after the session</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="how-it-works-card">
                            <h4><span className="sun-icon">☀️</span> How It Works</h4>

                            <div className="steps-list">
                                <div className="step-item">
                                    <span className="step-icon">🎧</span>
                                    <div>
                                        <h4>Dedicated Relationship Manager (RM)</h4>
                                        <p>Get a call within 30 mins of booking—your RM handles everything for you from here.</p>
                                    </div>
                                </div>
                                <div className="step-item">
                                    <span className="step-icon">🕒</span>
                                    <div>
                                        <h4>Mutually Available Time</h4>
                                        <p>Your RM coordinates a time that works for both you and your mentor within the next 24 hours.</p>
                                    </div>
                                </div>
                                <div className="step-item">
                                    <span className="step-icon">📅</span>
                                    <div>
                                        <h4>Scheduling & Reminders</h4>
                                        <p>Your RM schedules the session and sends reminder calls to you and your mentor.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer-action">
                            <button className="continue-btn golden-btn"><FaCrown /> Continue with Golden Trial</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

