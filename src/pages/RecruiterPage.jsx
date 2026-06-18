import { usePortfolioData } from '../hooks/usePortfolioData';
import RecruiterNav from '../components/recruiter/RecruiterNav';
import HeroSection from '../components/recruiter/HeroSection';
import CompanyMarquee from '../components/recruiter/CompanyMarquee';
import ExperienceSection from '../components/recruiter/ExperienceSection';
import SkillsSection from '../components/recruiter/SkillsSection';
import ProjectsSection from '../components/recruiter/ProjectsSection';
import ContactSection from '../components/recruiter/ContactSection';
import TickerBar from '../components/recruiter/TickerBar';

export default function RecruiterPage() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text-muted)' }}>
        Failed to load portfolio data.
      </div>
    );
  }

  return (
    <div className="rc-page">
      <RecruiterNav profile={data?.profile} />
      <HeroSection profile={data?.profile} projects={data?.projects} />
      <CompanyMarquee companies={data?.companies} />
      <ExperienceSection experience={data?.experience} />
      <ProjectsSection projects={data?.projects} />
      <SkillsSection skills={data?.skills} />
      <ContactSection profile={data?.profile} />
      <footer className="rc-footer">
        <span>© 2026 Harsh Raj · Built with React</span>
        <a href="mailto:rajharsh1997@gmail.com">rajharsh1997@gmail.com</a>
      </footer>
      <TickerBar profile={data?.profile} ticker={data?.ticker} />
    </div>
  );
}
