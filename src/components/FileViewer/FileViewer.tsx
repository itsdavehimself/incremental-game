import { useState, useEffect, useRef } from 'react';
import styles from './FileViewer.module.scss';
import { allFiles } from '../../data/files';
import { GameState } from '../../types';

interface FileViewerProps {
  gameState: GameState;
}

const FileViewer: React.FC<FileViewerProps> = ({ gameState }) => {
  const [isContentShowing, setIsContentShowing] = useState(false);
  const [activeFile, setActiveFile] = useState<number | null>(null);
  const [contentType, setContentType] = useState('');
  const [content, setContent] = useState<{
    message: string;
    date: string;
    from: string;
    to: string;
  }>({
    message: '',
    date: '',
    from: '',
    to: '',
  });

  const showMessage = (
    contents: {
      message: string;
      date: string;
      from: string;
      to: string;
    },
    index: number,
    type: string,
  ) => {
    setIsContentShowing(true);
    setActiveFile(index);
    setContent(contents);
    setContentType(type);
  };

  const filesToRender = allFiles
    .slice(0, gameState.filesIndex)
    .flatMap((fileGroup) => fileGroup);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [gameState.filesIndex]);

  return (
    <>
      <div className={styles['explorer-container']}>
        <div className={styles['explorer-header']}>
          <h5>FILE EXPLORER</h5>
          <div className={styles.square}></div>
        </div>
        <div ref={containerRef} className={styles['file-list']}>
          {filesToRender.map((file, index) => (
            <li
              className={`${styles['message-title']} ${
                activeFile === index ? styles['message-title-active'] : ''
              }`}
              onClick={() =>
                showMessage(file.fileContents, index, file.fileType)
              }
              key={index}
            >
              {file.fileType !== 'log' && (
                <span className={styles['message-type']}>
                  {file.fileType === 'message'
                    ? 'msg: '
                    : file.fileType === 'note'
                      ? 'note: '
                      : ''}
                </span>
              )}
              {file.fileName}
            </li>
          ))}
        </div>
      </div>
      {isContentShowing && (
        <div className={styles['message-container']}>
          <div className={styles.message}>
            {contentType === 'message' && (
              <div className={styles.communicators}>
                <div>
                  <h5>From: </h5>
                  <p>{content.from}</p>
                </div>
                <div>
                  <h5>To:</h5>
                  <p>{content.to}</p>
                </div>
              </div>
            )}
            <p className={styles['message-date']}>{content.date}</p>
            <p
              className={`${
                contentType === 'log'
                  ? styles['message-log-contents']
                  : styles['message-contents']
              }`}
            >
              {content.message}
            </p>
          </div>
          <button
            className={styles['message-close-btn']}
            onClick={() => {
              setIsContentShowing(false);
              setActiveFile(null);
            }}
          >
            Close Message
          </button>
        </div>
      )}
    </>
  );
};

export default FileViewer;
