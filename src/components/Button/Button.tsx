import styles from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button className={styles['main-btn']} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
