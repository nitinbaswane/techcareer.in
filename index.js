// Sample job data
const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Stringcode Technologies",
        location: "Pune, India",
        salary: "₹6-8 LPA",
        experience: "fresher",
        yearPassed: "2024",
        posted: 2,
        description: "We're looking for a skilled Frontend Developer with experience in React.js, Vue.js or Angular to join our growing team.",
        tags: ["React", "JavaScript", "CSS3", "Fresher"]
    },
    {
        id: 2,
        title: "Software Tester",
        company: "Tech Innovations Ltd",
        location: "Bangalore, India",
        salary: "₹4-6 LPA",
        experience: "fresher",
        yearPassed: "2023",
        posted: 1,
        description: "Looking for freshers with knowledge of Manual Testing, SQL, and API Testing. Training will be provided.",
        tags: ["Manual Testing", "SQL", "API Testing", "Fresher"]
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "Digital Solutions Inc",
        location: "Remote",
        salary: "₹10-15 LPA",
        experience: "mid",
        yearPassed: "2021",
        posted: 5,
        description: "Seeking a Full Stack Developer with experience in Node.js, Express, and MongoDB to work on innovative projects.",
        tags: ["Node.js", "Express", "MongoDB", "Mid-level"]
    },
    {
        id: 4,
        title: "Data Scientist",
        company: "Analytics Pro",
        location: "Hyderabad, India",
        salary: "₹12-18 LPA",
        experience: "senior",
        yearPassed: "2019",
        posted: 3,
        description: "Looking for an experienced Data Scientist to build machine learning models and analyze large datasets.",
        tags: ["Python", "Machine Learning", "TensorFlow", "Senior"]
    },
    {
        id: 5,
        title: "DevOps Engineer",
        company: "CloudTech Solutions",
        location: "Chennai, India",
        salary: "₹8-12 LPA",
        experience: "junior",
        yearPassed: "2022",
        posted: 10,
        description: "We need a DevOps Engineer with experience in CI/CD pipelines, Docker, and Kubernetes.",
        tags: ["Docker", "Kubernetes", "AWS", "Junior"]
    },
    {
        id: 6,
        title: "UI/UX Designer",
        company: "Creative Minds",
        location: "Delhi, India",
        salary: "₹5-8 LPA",
        experience: "fresher",
        yearPassed: "2025",
        posted: 15,
        description: "Looking for a creative UI/UX designer with proficiency in Figma and Adobe XD. Portfolio required.",
        tags: ["Figma", "UI Design", "UX Research", "Fresher"]
    },
    {
        id: 7,
        title: "Backend Developer",
        company: "ServerStack",
        location: "Mumbai, India",
        salary: "₹9-14 LPA",
        experience: "mid",
        yearPassed: "2020",
        posted: 20,
        description: "Seeking a backend developer with strong skills in Python, Django, and database management.",
        tags: ["Python", "Django", "PostgreSQL", "Mid-level"]
    },
    {
        id: 8,
        title: "Mobile App Developer",
        company: "AppCraft Studios",
        location: "Remote",
        salary: "₹7-10 LPA",
        experience: "junior",
        yearPassed: "2023",
        posted: 4,
        description: "We're looking for a React Native developer to build cross-platform mobile applications.",
        tags: ["React Native", "JavaScript", "Mobile Development", "Junior"]
    }
];

// DOM Elements
const jobList = document.getElementById('job-list');
const jobCount = document.getElementById('job-count');
const applyFilterBtn = document.getElementById('apply-filter');
const resetFilterBtn = document.getElementById('reset-filter');

// Filter elements
const designationFilter = document.getElementById('designation');
const dateFilter = document.getElementById('date');
const yearFilter = document.getElementById('year');
const experienceFilter = document.getElementById('experience');
const sortFilter = document.getElementById('sort');

// Display jobs function
function displayJobs(jobsToDisplay) {
    jobList.innerHTML = '';
    jobCount.textContent = jobsToDisplay.length;
    
    if(jobsToDisplay.length === 0) {
        jobList.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 4rem; color: var(--gray); margin-bottom: 1rem;"></i>
                <h3>No jobs found matching your criteria</h3>
                <p>Try adjusting your filters to see more results</p>
            </div>
        `;
        return;
    }
    
    jobsToDisplay.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        
        // Calculate days ago
        const daysAgo = job.posted === 1 ? "Today" : 
                       job.posted === 2 ? "Yesterday" : 
                       `${job.posted} days ago`;
        
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <div class="job-company">
                <div class="company-logo">${job.company.substring(0, 2)}</div>
                <div>
                    <div class="job-detail"><strong>${job.company}</strong></div>
                    <div class="job-detail"><i class="fas fa-map-marker-alt"></i> ${job.location}</div>
                </div>
            </div>
            <div class="job-info">
                <div class="job-detail">
                    <i class="fas fa-money-bill-wave"></i> ${job.salary}
                </div>
                <div class="job-detail">
                    <i class="fas fa-briefcase"></i> ${getExperienceLabel(job.experience)}
                </div>
                <div class="job-detail">
                    <i class="fas fa-graduation-cap"></i> ${job.yearPassed} Passout
                </div>
                <div class="job-detail">
                    <i class="fas fa-clock"></i> ${daysAgo}
                </div>
            </div>
            <div class="job-description">
                <p>${job.description}</p>
            </div>
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="#" class="btn">Apply Now</a>
            <div class="job-meta">
                <div>Job ID: TC-${job.id}</div>
                <div>${getExperienceLabel(job.experience)} Level</div>
            </div>
        `;
        
        jobList.appendChild(jobCard);
    });
}

// Get experience label
function getExperienceLabel(exp) {
    switch(exp) {
        case 'fresher': return 'Fresher';
        case 'junior': return 'Junior';
        case 'mid': return 'Mid-level';
        case 'senior': return 'Senior';
        default: return exp;
    }
}

// Filter jobs function
function filterJobs() {
    const designation = designationFilter.value.toLowerCase();
    const dateValue = parseInt(dateFilter.value);
    const yearValue = yearFilter.value;
    const experienceValue = experienceFilter.value;
    
    let filteredJobs = jobs.filter(job => {
        // Designation filter
        if(designation && !job.title.toLowerCase().includes(designation)) {
            return false;
        }
        
        // Date filter
        if(dateValue !== 'all' && job.posted > dateValue) {
            return false;
        }
        
        // Year passed out filter
        if(yearValue !== 'all' && job.yearPassed !== yearValue) {
            return false;
        }
        
        // Experience filter
        if(experienceValue !== 'all' && job.experience !== experienceValue) {
            return false;
        }
        
        return true;
    });
    
    // Sort jobs
    const sortValue = sortFilter.value;
    if(sortValue === 'newest') {
        filteredJobs.sort((a, b) => a.posted - b.posted);
    } else if(sortValue === 'salary') {
        filteredJobs.sort((a, b) => {
            const aSalary = parseInt(a.salary.match(/\d+/)[0]);
            const bSalary = parseInt(b.salary.match(/\d+/)[0]);
            return bSalary - aSalary;
        });
    }
    
    displayJobs(filteredJobs);
}

// Reset filters function
function resetFilters() {
    designationFilter.value = '';
    dateFilter.value = 'all';
    yearFilter.value = 'all';
    experienceFilter.value = 'all';
    sortFilter.value = 'newest';
    filterJobs();
}

// Event Listeners
applyFilterBtn.addEventListener('click', filterJobs);
resetFilterBtn.addEventListener('click', resetFilters);
sortFilter.addEventListener('change', filterJobs);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayJobs(jobs);
});