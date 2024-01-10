import styles from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, disabled }) => {
  return (
    <button
      className={styles['main-btn']}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
