// src/components/LoadingSpinner.jsx
import '../styles/LoadingSpinner.css'; // CSS 파일은 직접 작성해야 함

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
