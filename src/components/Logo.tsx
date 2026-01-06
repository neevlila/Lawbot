import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface LogoProps {
  className?: string;
}

const LawLogo: React.FC<LogoProps> = ({ className }) => {
  // Use the theme context to determine the current theme correctly
  const { isDark } = useTheme();

  const darkLogoSrc =
    "https://i.ibb.co/k20cqYyS/Whats-App-Image-2025-09-15-at-11-38-16-222116aa-removebg-preview-1.png";
  const lightLogoSrc =
    "https://i.ibb.co/dwBjhTRW/6-60553-advocate-logos-related-to-law-removebg-preview.png";

  return (
    <img
      src={isDark ? darkLogoSrc : lightLogoSrc}
      alt="AI Legal Assistant Logo"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
    />
  );
};

export default LawLogo;
