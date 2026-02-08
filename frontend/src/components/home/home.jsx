import { FaVideo, FaRegEnvelope, FaFileAlt, FaRegClock, FaRocket, FaCertificate, FaStar, FaDesktop, FaServer, FaLayerGroup, FaInfinity, FaChartLine, FaAtom, FaCogs, FaBrain, FaChalkboardTeacher, FaChartBar, FaChartPie, FaRupeeSign, FaCube, FaPalette, FaTasks, FaUserTie } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

export default function Home() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("Engineering");

    const categories = ["Engineering", "Data Science", "Business", "Product"];

    const mentorsData = [
        {
            id: 1,
            name: "Manivannan",
            role: "Senior Software Engineer",
            experience: "16 Years of Experience",
            company: "Microsoft",
            category: "Engineering",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/1.jpg" // Placeholder
        },
        {
            id: 2,
            name: "Aman Kumar",
            role: "SSE",
            experience: "8 Years of Experience",
            company: "Walmart Global Tech India",
            category: "Engineering",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        {
            id: 3,
            name: "Shubham Khanna",
            role: "Senior Software Engineer",
            experience: "7 Years of Experience",
            company: "Booking Holdings - Agoda",
            category: "Engineering",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/3.jpg"
        },
        {
            id: 4,
            name: "Vikas Bharti",
            role: "Senior Software Engineering Manager",
            experience: "17 Years of Experience",
            company: "Walmart Global Tech India",
            category: "Engineering",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/4.jpg"
        },
        {
            id: 5,
            name: "Aman Jaiswal",
            role: "Senior Frontend Engineer",
            experience: "9 Years of Experience",
            company: "DBS",
            category: "Engineering",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/5.jpg"
        },
        {
            id: 6,
            name: "Manish Batheja",
            role: "DevOps Engineer",
            experience: "7 Years of Experience",
            company: "JPMorgan Chase & Co.",
            category: "Engineering",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/6.jpg"
        },
        // Mock data for other categories
        {
            id: 7,
            name: "Sarah Data",
            role: "Data Scientist",
            experience: "5 Years of Experience",
            company: "Google",
            category: "Data Science",
            rating: 4.9,
            image: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
            id: 8,
            name: "John Business",
            role: "Business Analyst",
            experience: "10 Years of Experience",
            company: "Amazon",
            category: "Business",
            rating: 4.8,
            image: "https://randomuser.me/api/portraits/men/7.jpg"
        },
        {
            id: 9,
            name: "Emily Product",
            role: "Product Manager",
            experience: "6 Years of Experience",
            company: "Meta",
            category: "Product",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/women/2.jpg"
        }
    ];

    const filteredMentors = mentorsData.filter(mentor => mentor.category === activeCategory);

    const featuresData = [
        {
            icon: <FaVideo />,
            title: "1:1 Live Session",
            desc: "Never question your progress with frequent One on One session."
        },
        {
            icon: <FaRegEnvelope />,
            title: "Unlimited Chat with Mentor",
            desc: "Doubt? Get the right advice from your mentor via Chat."
        },
        {
            icon: <FaFileAlt />,
            title: "Task & Curated Resources",
            desc: "Yes! You will be certified for this mentorship program."
        },
        {
            icon: <FaRegClock />,
            title: "Regular Followups",
            desc: "Stay motivated and consistent with regular follow-ups."
        },
        {
            icon: <FaRocket />,
            title: "Job Referrals",
            desc: "Get Referrals from mentor community to top product and service based companies."
        },
        {
            icon: <FaCertificate />,
            title: "Certified",
            desc: "Yes! You will be certified for this mentorship program."
        }
    ];

    const starMentors = [
        {
            id: 1,
            name: "Manivannan",
            role: "Senior Software Engineer",
            experience: "16 Years of Experience",
            company: "Microsoft",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/10.jpg"
        },
        {
            id: 2,
            name: "Aman Kumar",
            role: "SSE",
            experience: "8 Years of Experience",
            company: "Walmart Global Tech India",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/11.jpg"
        },
        {
            id: 3,
            name: "Akkshay Sharma",
            role: "Product Manager",
            experience: "11 Years of Experience",
            company: "Microsoft",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/12.jpg"
        },
        {
            id: 4,
            name: "Vikas Bharti",
            role: "Senior Software Engineering Manager",
            experience: "17 Years of Experience",
            company: "Walmart Global Tech India",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/13.jpg"
        },
        {
            id: 5,
            name: "Aman Jaiswal",
            role: "Senior Frontend Engineer",
            experience: "9 Years of Experience",
            company: "DBS",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/14.jpg"
        },
        {
            id: 6,
            name: "Shubham Khanna",
            role: "Senior Software Engineer",
            experience: "7 Years of Experience",
            company: "Booking Holdings - Agoda",
            rating: 5.0,
            image: "https://randomuser.me/api/portraits/men/15.jpg"
        }
    ];

    const industryDomains = [
        { icon: <FaDesktop />, title: "Frontend Developer", mentors: "27+" },
        { icon: <FaServer />, title: "Backend Developer", mentors: "120+" },
        { icon: <FaLayerGroup />, title: "Fullstack Developer", mentors: "86+" },
        { icon: <FaInfinity />, title: "DevOps / SRE", mentors: "22+" },
        { icon: <FaChartLine />, title: "Data Analyst", mentors: "17+" },
        { icon: <FaAtom />, title: "Data Scientist", mentors: "48+" },
        { icon: <FaCogs />, title: "Data Engineer", mentors: "21+" },
        { icon: <FaBrain />, title: "AI / ML", mentors: "48+" },
        { icon: <FaChalkboardTeacher />, title: "Marketing", mentors: "13+" },
        { icon: <FaChartBar />, title: "Sales", mentors: "10+" },
        { icon: <FaChartPie />, title: "Business Analyst", mentors: "27+" },
        { icon: <FaRupeeSign />, title: "Finance", mentors: "6+" },
        { icon: <FaCube />, title: "Product Manager", mentors: "32+" },
        { icon: <FaPalette />, title: "UI/UX Designer", mentors: "4+" },
        { icon: <FaTasks />, title: "Project Manager", mentors: "11+" },
        { icon: <FaUserTie />, title: "Program Manager", mentors: "11+" }
    ];

    return (
        <>
            <div className="page-wrapper">
                <Navbar />

                {/* HERO */}

                {/* HERO */}
                <section className="hero">
                    <h1>
                        Supercharge your career with <br />
                        <span>Long Term Mentorship</span>
                    </h1>

                    <p>
                        Land your dream job, role, and company faster than ever with
                        1:1 long term mentorship.
                    </p>

                    <div className="hero-actions">
                        <button className="btn-outline" onClick={() => navigate('/explore')}>Book a FREE Trial</button>
                        <button className="btn-primary" onClick={() => navigate('/explore')}>Find your Mentor →</button>
                    </div>

                    <div className="hero-features">
                        <span>No Payment Required</span>
                        <span>Verified Mentors Only</span>
                        <span>Reschedule Anytime</span>
                    </div>
                </section>

                {/* THREE COLUMN SECTION */}
                <section className="section-wrapper">
                    <div className="three-cols">

                        {/* COMPANIES */}
                        <div className="col">
                            <div className="col-header">
                                <h3>Companies</h3>
                                <div className="circle-arrow">→</div>
                            </div>

                            <ul className="col-list">
                                <li>
                                    <span>Uber</span>
                                    <span><div className="circle-arrow">→</div></span>
                                </li>
                                <li>
                                    <span>Airbnb</span>
                                    <span><div className="circle-arrow">→</div></span>
                                </li>
                                <li>
                                    <span>Google</span>
                                    <span><div className="circle-arrow">→</div></span>
                                </li>
                                <li>
                                    <span>Amazon</span>
                                    <span><div className="circle-arrow">→</div></span>
                                </li>
                                <li>
                                    <span>Microsoft</span>
                                    <span><div className="circle-arrow">→</div></span>
                                </li>
                                <li>
                                    <span>Netflix</span>
                                    <span><div className="circle-arrow">→</div></span>
                                </li>
                            </ul>

                            <button className="explore-btn">Explore All Companies →</button>
                        </div>

                        <div className="divider" />

                        {/* DOMAINS */}
                        <div className="col">
                            <div className="col-header">
                                <h3>Domains</h3>
                                <div className="circle-arrow">→</div>
                            </div>

                            <ul className="col-list">
                                <li>💻 Frontend Developer <span>›</span></li>
                                <li>🖥 Backend Developer <span>›</span></li>
                                <li>📊 Data Scientist <span>›</span></li>
                                <li>🧩 Fullstack Developer <span>›</span></li>
                                <li>🧪 QA Engineer <span>›</span></li>
                                <li>⚙ Data Engineer <span>›</span></li>
                                <li>🎨 UI/UX Designer <span>›</span></li>
                            </ul>

                            <button className="explore-btn">Explore All Domains →</button>
                        </div>

                        <div className="divider" />

                        {/* SKILLS */}
                        <div className="col">
                            <div className="col-header">
                                <h3>Skills</h3>
                                <div className="circle-arrow">→</div>
                            </div>

                            <ul className="col-list">
                                <li>🐍 Python <span>›</span></li>
                                <li>☕ Java <span>›</span></li>
                                <li>🧪 Software Testing <span>›</span></li>
                                <li>🧠 System Design <span>›</span></li>
                                <li>📘 DSA <span>›</span></li>
                                <li>🅰 Angular <span>›</span></li>
                                <li>⚛ React <span>›</span></li>
                            </ul>

                            <button className="explore-btn">Explore All Skills →</button>
                        </div>

                    </div>
                </section>
            </div>

            {/* GET STARTED SECTION */}
            <section className="get-started">
                <div className="section-header">
                    <h2>Get Started in 3 Easy Steps</h2>
                    <p>Follow these three simple steps to get started with Long Term Mentorship</p>
                </div>

                <div className="steps-container">
                    {/* STEP 1 */}
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>Find Your Ideal Mentor</h3>
                        <p>
                            Browse from 600+ vested mentors and get to
                            choose your ideal mentor according to your
                            preferences and aspiration.
                        </p>
                        <button className="step-btn" onClick={() => navigate('/explore')}>Find Your Mentor →</button>
                    </div>

                    {/* STEP 2 */}
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>Book a FREE Trial</h3>
                        <p>
                            Connect with mentor and see how mentor will help
                            you achieve your goal faster & avoid asking for
                            referrals, etc.
                        </p>
                        <button className="step-btn" onClick={() => navigate('/explore')}>Book a FREE Trial</button>
                    </div>

                    {/* STEP 3 */}
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>Start 1:1 Long Term Mentorship</h3>
                        <p>
                            Bravo!! Get started with your personalised
                            mentorship in the right direction with a mentor of
                            your choice.
                        </p>
                        <button className="step-btn" onClick={() => navigate('/explore')}>Start Preparing →</button>
                    </div>
                </div>
            </section>

            {/* MENTORS SECTION */}
            <section
                className="mentors-section"
            >
                <div className="section-header">
                    <h2>600+ mentors are just a Free Trial Session away!</h2>
                    <p>Choose your ideal mentor and get started with a FREE trial session</p>
                </div>

                <div className="filter-buttons">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="mentors-grid">
                    {filteredMentors.map((mentor) => (
                        <div className="mentor-card" key={mentor.id}>
                            <div className="mentor-header">
                                <img src={mentor.image} alt={mentor.name} className="mentor-img" />
                                <div className="mentor-rating">
                                    <FaStar color="#FFD700" /> {mentor.rating}
                                </div>
                            </div>
                            <h3>{mentor.name}</h3>
                            <p className="mentor-role">{mentor.role}</p>
                            <p className="mentor-exp">{mentor.experience}</p>
                            <div className="mentor-company">
                                <span>🏢</span> {mentor.company}
                            </div>
                            <button className="book-trial-btn" onClick={() => navigate('/explore')}>Book a FREE Trial</button>
                        </div>
                    ))}
                </div>

                <div className="explore-all-container">
                    <button className="explore-all-mentors-btn" onClick={() => navigate('/explore')}>Explore All Mentors →</button>
                </div>
            </section>

            {/* STRUGGLE SECTION */}
            <section className="struggle-section">
                <div className="section-header">
                    <h2>No need to Struggle Alone Anymore</h2>
                    <p>Long term mentorship gets fully covered</p>
                </div>

                <div className="features-grid">
                    {featuresData.map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* STAR MENTORS SECTION */}
            <section
                className="star-mentors-section"
            >
                <div className="section-header">
                    <h2>Get Mentored By The Star Mentors</h2>
                    <p>Connect with our star mentors, distinguished leaders in their fields, to receive personalized mentorship.</p>
                </div>

                <div className="star-mentors-grid">
                    {starMentors.map((mentor) => (
                        <div className="star-mentor-card" key={mentor.id}>
                            <div className="star-mentor-header">
                                <img src={mentor.image} alt={mentor.name} className="star-mentor-img" />
                                <div className="star-rating">
                                    <FaStar color="#FFD700" size={14} /> {mentor.rating}
                                </div>
                            </div>
                            <h3>{mentor.name}</h3>
                            <p className="star-mentor-role">{mentor.role}</p>
                            <p className="star-mentor-exp">{mentor.experience}</p>
                            <div className="star-mentor-company">
                                {mentor.company.includes("Microsoft") && <span style={{ color: '#f35022' }}>❖</span>}
                                {mentor.company.includes("Walmart") && <span style={{ color: '#ffc220' }}>✱</span>}
                                {mentor.company.includes("Booking") && <span style={{ color: '#003580' }}>B.</span>}
                                {mentor.company.includes("DBS") && <span style={{ color: '#ff0000' }}>dbs</span>}
                                <span className="company-name">{mentor.company}</span>
                            </div>
                            <button className="book-trial-btn-dark" onClick={() => navigate('/explore')}>Book a FREE Trial</button>
                        </div>
                    ))}
                </div>

                <div className="explore-all-container">
                    <button className="explore-all-mentors-btn" onClick={() => navigate('/explore')}>Explore All Mentors ›</button>
                </div>

                {/* Decorative Stars */}
                <div className="decorative-star star-1"><FaStar /></div>
                <div className="decorative-star star-2"><FaStar /></div>
                <div className="decorative-star star-3"><FaStar /></div>
                <div className="decorative-star star-4"><FaStar /></div>
                <div className="decorative-star star-5"><FaStar /></div>
                <div className="decorative-star star-6"><FaStar /></div>
            </section>

            {/* INDUSTRY COVERED SECTION */}
            <section className="industry-section">
                <div className="section-header">
                    <h2>Every Domain Every Industry Covered</h2>
                    <p>Our mentors are equipped to guide you in any field you're passionate about</p>
                </div>

                <div className="industry-grid">
                    {industryDomains.map((domain, index) => (
                        <div className="industry-card" key={index}>
                            <div className="industry-icon">{domain.icon}</div>
                            <div className="industry-info">
                                <h3>{domain.title}</h3>
                                <p>Browse {domain.mentors} Mentors</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
}