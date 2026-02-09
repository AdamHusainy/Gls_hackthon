import React, { useState, useEffect } from 'react';
import { FaTimes, FaStar, FaReact, FaJs, FaHtml5, FaCss3, FaNodeJs, FaGitAlt, FaGithub, FaDocker, FaMapMarkerAlt, FaGraduationCap, FaRegClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiWebpack, SiBabel, SiEslint, SiTypescript, SiVite, SiJavascript } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { BsCheckCircleFill, BsQuestionCircle } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi'; // For the clock icon in booking card
import './Explore.css'; // Reusing Explore.css for simplicity as they are tightly coupled

// Helper to get icon for skill
const getSkillIcon = (skillName) => {
    const name = skillName.toLowerCase();
    if (name.includes('react')) return <FaReact color="#61DAFB" />;
    if (name.includes('js') || name.includes('javascript')) return <SiJavascript color="#F7DF1E" />;
    if (name.includes('html')) return <FaHtml5 color="#E34F26" />;
    if (name.includes('css')) return <FaCss3 color="#1572B6" />;
    if (name.includes('node')) return <FaNodeJs color="#339933" />;
    if (name.includes('git')) return <FaGitAlt color="#F05032" />; // GitAlt often better for Git
    if (name.includes('github')) return <FaGithub />;
    if (name.includes('docker')) return <FaDocker color="#2496ED" />;
    if (name.includes('webpack')) return <SiWebpack color="#8DD6F9" />;
    if (name.includes('babel')) return <SiBabel color="#F9DC3E" />;
    if (name.includes('eslint')) return <SiEslint color="#4B32C3" />;
    if (name.includes('typescript')) return <SiTypescript color="#3178C6" />;
    if (name.includes('vite')) return <SiVite color="#646CFF" />;
    if (name.includes('vscode') || name.includes('visual studio')) return <VscVscode color="#007ACC" />;
    return null; // Fallback
};

// Helper: Generate next 14 days
const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push({
            fullDate: d,
            dayName: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(), // TUE, WED
            dayNumber: d.getDate(), // 10, 11
            month: d.toLocaleDateString('en-US', { month: 'short' }), // Feb
            slots: Math.floor(Math.random() * 8) + 1 // Random slots 1-9 for demo
        });
    }
    return dates;
};

// Hardcoded slots for demo
const DEMO_SLOTS = [
    '06:00 PM', '06:15 PM', '06:30 PM', '06:45 PM', '07:00 PM',
    '07:15 PM', '07:30 PM', '08:00 PM'
];

export default function MentorProfileSidebar({ mentor, isOpen, onClose, onBookMock }) {
    const [dates] = useState(generateDates());
    const [selectedDateIndex, setSelectedDateIndex] = useState(0); // Index in the 'dates' array
    const [visibleDateStart, setVisibleDateStart] = useState(0); // Creating a sliding window for dates
    const [selectedSlot, setSelectedSlot] = useState('06:00 PM');

    if (!mentor) return null;

    const selectedDateObj = dates[selectedDateIndex];
    const formattedDateString = `${selectedDateObj.month} ${selectedDateObj.dayNumber}`;

    // Pagination for Date Carousel
    const handleNextDates = () => {
        if (visibleDateStart + 4 < dates.length) {
            setVisibleDateStart(prev => prev + 1);
        }
    };

    const handlePrevDates = () => {
        if (visibleDateStart > 0) {
            setVisibleDateStart(prev => prev - 1);
        }
    };

    const handleDateClick = (index) => {
        setSelectedDateIndex(index);
        // Optional: Reset slot or keep same time if available
    };

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
    };

    const handleBook = () => {
        const date = dates[selectedDateIndex];
        const msg = `Booking Trial with ${mentor.name}\nDate: ${date.dayName}, ${date.dayNumber} ${date.month}\nTime: ${selectedSlot}`;
        alert(msg);
        console.log(msg);
        if (onBookMock) onBookMock();
    };

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`mentor-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="ms-scroll-container">
                    {/* Top Controls */}
                    <div className="ms-top-controls">
                        <div className="ms-close-icon" onClick={onClose}><FaTimes /></div>
                        <a href="#" className="ms-new-tab-link">Open profile in new Tab <span style={{ fontSize: '12px' }}>↗</span></a>
                    </div>

                    <div className="ms-content-wrapper">

                        {/* 1. PROFILE CARD */}
                        <div className="ms-card profile-card">
                            <div className="ms-card-banner"></div>
                            <div className="ms-card-body">
                                <div className="ms-avatar-row">
                                    <div className="ms-main-avatar">
                                        <img src={mentor.img} alt={mentor.name} />
                                    </div>
                                    <div className="ms-header-actions">
                                        <button className="ms-icon-btn"><span style={{ fontSize: '18px' }}>♡</span></button>
                                        <button className="ms-action-btn">Ask a Question</button>
                                        <button className="ms-action-btn">View Pricing</button>
                                    </div>
                                </div>

                                <div className="ms-person-details">
                                    <div className="ms-pd-left">
                                        <div className="ms-name-row">
                                            <h2>{mentor.name}</h2>
                                            {mentor.isStar && <span className="ms-star-badge"><FaStar color="#b45309" /> Star Mentor</span>}
                                        </div>
                                        <p className="ms-role-title">{mentor.role} at <strong>{mentor.company}</strong></p>

                                        <p className="ms-bio-text">
                                            {mentor.bio} <span className="read-more">read more</span>
                                        </p>

                                        <div className="ms-stats-bar">
                                            <div className="stat-item"><span className="icon-star">🌟</span> <strong>{mentor.rating}</strong> ({mentor.reviews} Reviews)</div>
                                            <div className="stat-item"><span className="icon-time">🕒</span> <strong>66231+</strong> Mentoring Mins</div>
                                            <div className="stat-item"><span className="icon-user">👥</span> <strong>{mentor.mentees}</strong> Mentees</div>
                                        </div>
                                    </div>

                                    <div className="ms-pd-right">
                                        <h4 className="exp-label">9+ years of experience</h4>
                                        <div className="exp-list">
                                            <div className="exp-item">
                                                <img src={mentor.companyLogo} alt="" className="exp-logo" />
                                                <span>{mentor.company}</span>
                                            </div>
                                            {mentor.prevCompany && (
                                                <div className="exp-item">
                                                    <span className="exp-logo-ph">AA</span>
                                                    <span>{mentor.prevCompany}, Australia</span>
                                                </div>
                                            )}
                                            <div className="exp-item">
                                                <span className="exp-logo-ph">🎓</span>
                                                <span>Shri Govindram Seksaria Institute...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. BOOKING CARD (Refined per Image 571-0.png) */}
                        <div className="ms-card booking-card-refined">
                            <div className="bcr-left">
                                <div className="bcr-profile-mini">
                                    <img src={mentor.img} alt="" />
                                    <div>
                                        <h4>{mentor.name}</h4>
                                        <p>{mentor.role}...</p>
                                    </div>
                                </div>
                                <h3 className="bcr-cta">Book a FREE Trial: To Plan Your Mentorship with {mentor.name}</h3>

                                <div className="bcr-info-item">
                                    <FiClock /> <span>30 mins 1:1 call with the mentor</span>
                                </div>
                                <div className="bcr-info-item">
                                    <BsQuestionCircle /> <span>Trial session with mentor helps you understand the required structure, effort & duration to achieve your personal goals.</span>
                                </div>
                            </div>

                            <div className="bcr-right">
                                <div className="bcr-dates-section">
                                    <h3>Available Dates</h3>
                                    {/* Date Carousel */}
                                    <div className="bcr-dates-grid" style={{ overflow: 'hidden' }}>
                                        {/* Show 4 dates based on visual window */}
                                        {dates.slice(visibleDateStart, visibleDateStart + 4).map((date, i) => {
                                            const actualIndex = visibleDateStart + i;
                                            const isActive = actualIndex === selectedDateIndex;
                                            return (
                                                <div
                                                    key={actualIndex}
                                                    className={`bcr-date-card ${isActive ? 'active' : ''}`}
                                                    onClick={() => handleDateClick(actualIndex)}
                                                >
                                                    {i === 0 && visibleDateStart === 0 && <span className="rec-tag">Recommended</span>}
                                                    <h4>{date.dayName}</h4>
                                                    <h3>{date.dayNumber} {date.month}</h3>
                                                    <span className="slots-count">{date.slots} Slots</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-40px', marginBottom: '20px', gap: '5px' }}>
                                        <button onClick={handlePrevDates} disabled={visibleDateStart === 0} style={{ border: 'none', background: 'transparent', cursor: 'pointer', opacity: visibleDateStart === 0 ? 0.3 : 1 }}><FaChevronLeft /></button>
                                        <button onClick={handleNextDates} disabled={visibleDateStart + 4 >= dates.length} style={{ border: 'none', background: 'transparent', cursor: 'pointer', opacity: visibleDateStart + 4 >= dates.length ? 0.3 : 1 }}><FaChevronRight /></button>
                                    </div>
                                </div>

                                <div className="bcr-separator"></div>

                                <div className="bcr-slots-section">
                                    <div className="bcr-slots-header">
                                        <h3>Available Slots</h3>
                                        <div className="bcr-slot-nav">
                                            <button><FaChevronLeft /></button>
                                            <button><FaChevronRight /></button>
                                        </div>
                                    </div>
                                    <div className="bcr-slots-grid">
                                        {DEMO_SLOTS.map((slot) => (
                                            <div
                                                key={slot}
                                                className={`bcr-slot-pill ${selectedSlot === slot ? 'active' : ''}`}
                                                onClick={() => handleSlotClick(slot)}
                                            >
                                                {slot === '06:00 PM' && <span className="rec-tag-slot">Recommended</span>}
                                                {slot}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button className="bcr-book-btn" onClick={handleBook}>
                                    Book a Free Trial for {formattedDateString}, {selectedSlot}
                                </button>
                            </div>
                        </div>

                        {/* 3. About Section (Refined per Image 571-1.png) */}
                        <div className="ms-card ms-section-card">
                            <h3>About</h3>
                            <p className="ms-about-text">
                                I have over 9+ years of experience in JavaScript, React, Algorithms and Designing. My expertise lies in web development projects involving JavaScript, ReactJS, DSA, System Design and proficiency with HTML and CSS. Over the years, I've tackled diverse projects, honed my skills, and stayed updated wit... <span className="read-more">read more</span>
                            </p>

                            <div className="ms-divider-line"></div>

                            <div className="ms-info-grid">
                                <div className="mi-col">
                                    <h4>Find Me Here</h4>
                                    <div className="mi-box"><FaMapMarkerAlt /> {mentor.location}</div>
                                </div>
                                <div className="mi-col">
                                    <h4>Languages That I Speak</h4>
                                    <div className="mi-tags">
                                        {mentor.languages && mentor.languages.map(l => <span key={l} className="mi-tag">{l}</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Career Journey Section (Refined per Image 571-2.png) */}
                        <div className="ms-card ms-section-card">
                            <h3>Career Journey</h3>
                            <div className="timeline-refined">
                                <div className="tr-item">
                                    <div className="tr-left">
                                        <span className="tr-role">Present</span>
                                        <span className="tr-date">November, 2020</span>
                                        <span className="tr-duration">( 5Y, 3M )</span>
                                    </div>
                                    <div className="tr-divider">
                                        <div className="tr-dot active"></div>
                                        <div className="tr-line"></div>
                                    </div>
                                    <div className="tr-right">
                                        <h4>Senior Frontend Engineer</h4>
                                        <div className="tr-company">
                                            <img src="https://logo.clearbit.com/dbs.com" alt="DBS" width="20" /> DBS
                                        </div>
                                    </div>
                                </div>

                                <div className="tr-item">
                                    <div className="tr-left">
                                        <span className="tr-date">November, 2020</span>
                                        <span className="tr-date">January, 2018</span>
                                        <span className="tr-duration">( 2Y, 11M )</span>
                                    </div>
                                    <div className="tr-divider">
                                        <div className="tr-dot"></div>
                                        <div className="tr-line"></div>
                                    </div>
                                    <div className="tr-right">
                                        <h4>Software Developer</h4>
                                        <div className="tr-company">
                                            <span className="logo-ph-red">AA</span> Amdocs, Australia
                                        </div>
                                    </div>
                                </div>

                                <div className="tr-item">
                                    <div className="tr-left">
                                        <span className="tr-date">May, 2017</span>
                                        <span className="tr-date">June, 2013</span>
                                        <span className="tr-duration">( 3Y, 11M )</span>
                                    </div>
                                    <div className="tr-divider">
                                        <div className="tr-dot"></div>
                                    </div>
                                    <div className="tr-right">
                                        <div className="tr-edu">
                                            <FaGraduationCap className="edu-icon" /> Shri Govindram Seksaria Institute of Technology & Science, 23,Park Road, Indore
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. Mentor Technical Skills (Refined per Image 571-3.png) */}
                        <div className="ms-card ms-section-card">
                            <h3>Technical Skills</h3>
                            <div className="ms-skills-cloud-refined">
                                {mentor.skills.map((skill, i) => (
                                    <div key={i} className="skill-pill-refined">
                                        {getSkillIcon(skill)} <span>{skill}</span>
                                    </div>
                                ))}
                                {!mentor.skills.some(s => s.includes('Typescript')) && <div className="skill-pill-refined"><SiTypescript color="#3178C6" /> <span>Typescript</span></div>}
                                <div className="skill-pill-refined"><span>Frontend Architecture</span></div>
                                <div className="skill-pill-refined"><span>LLD</span></div>
                            </div>

                            <h3 style={{ marginTop: '30px' }}>Tools</h3>
                            <div className="ms-skills-cloud-refined">
                                <div className="skill-pill-refined"><FaGithub /> <span>GitHub</span></div>
                                <div className="skill-pill-refined"><SiWebpack color="#8DD6F9" /> <span>Webpack</span></div>
                                <div className="skill-pill-refined"><FaGitAlt color="#F05032" /> <span>Git</span></div>
                                <div className="skill-pill-refined"><SiBabel color="#F9DC3E" /> <span>Babel</span></div>
                                <div className="skill-pill-refined"><VscVscode color="#007ACC" /> <span>Visual Studio Code</span></div>
                                <div className="skill-pill-refined"><SiEslint color="#4B32C3" /> <span>ESLint</span></div>
                                <div className="skill-pill-refined"><SiVite color="#646CFF" /> <span>Vite</span></div>
                            </div>
                        </div>

                        {/* Spacer for footer */}
                        <div style={{ height: '80px' }}></div>
                    </div>
                </div>

                {/* Sticky Bottom Footer */}
                <div className="ms-sticky-footer">
                    <div className="sf-left">
                        <span className="sf-label">Starting at</span>
                        <span className="sf-price">₹10,000/<span style={{ fontSize: '14px', fontWeight: 400 }}>month</span></span>
                    </div>

                    <div className="sf-middle">
                        <div className="sf-avail-badge">
                            <span className="pulsing-dot"></span> Available {selectedDateObj.dayName} {selectedDateObj.month} {selectedDateObj.dayNumber}
                        </div>
                    </div>

                    <div className="sf-right">
                        <button className="sf-btn-outline">View LTM Plans</button>
                        <button className="sf-btn-primary shimmer-effect" onClick={handleBook}>
                            Book a FREE Trial Session <FaChevronRight style={{ fontSize: '10px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
