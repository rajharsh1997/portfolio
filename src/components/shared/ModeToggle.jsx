import { useNavigate, useLocation } from 'react-router-dom';

export default function ModeToggle() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDevMode = location.pathname === '/dev';

  const handleToggle = () => {
    const next = isDevMode ? '/' : '/dev';
    localStorage.setItem('preferred-mode', next);
    navigate(next);
  };

  return (
    <button
      className={`mode-toggle${isDevMode ? ' mode-toggle--dev' : ''}`}
      onClick={handleToggle}
      title={isDevMode ? 'Switch to Recruiter View' : 'Switch to Dev Mode'}
    >
      <div className="mode-toggle__track">
        <span className="mode-toggle__thumb" />
      </div>
      <span className="mode-toggle__text">
        {isDevMode ? '<dev />' : '{ / dev }'}
      </span>
    </button>
  );
}
