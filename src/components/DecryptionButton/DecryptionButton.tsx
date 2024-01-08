import styles from './DecryptionButton.module.scss';

interface DecryptionButtonProps {
  onClick: () => void;
  className: string;
}

const DecryptionButton: React.FC<DecryptionButtonProps> = ({
  onClick,
  className,
}) => (
  <button
    onClick={onClick}
    className={`${styles.btn} ${styles.white} ${className}`}
  ></button>
);

export default DecryptionButton;
