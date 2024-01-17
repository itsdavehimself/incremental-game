import styles from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  upgradeName: string;
  upgradeCost: string;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  upgradeName,
  upgradeCost,
  disabled,
}) => {
  return (
    <>
      <button
        className={styles['main-btn']}
        onClick={onClick}
        disabled={disabled}
      >
        <div className={styles['btn-text']}>
          <h4>{upgradeName}</h4>
          <p>{upgradeCost}</p>
        </div>
      </button>
      {/* <div className={styles['line-container']}>
        <div className={styles.line}></div>
        <div className={styles.rectangle}></div>
      </div> */}
    </>
  );
};

export default Button;
