import { useState } from 'react';
import styles from './FileViewer.module.scss';
import { allFiles } from '../../data/files';
import { GameState } from '../../App';

interface FileViewerProps {
  gamestate: GameState;
}

const FileViewer: React.FC<FileViewerProps> = ({ gamestate }) => {
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
    .slice(0, gamestate.filesIndex)
    .flatMap((fileGroup) => fileGroup);

  return (
    <div>
      <div>
        <h3>File Explorer:</h3>
      </div>
      {filesToRender.map((file, index) => (
        <li
          className={`${styles['message-title']} ${
            activeFile === index ? styles['message-title-active'] : ''
          }`}
          onClick={() => showMessage(file.fileContents, index, file.fileType)}
          key={index}
        >
          {file.fileName}
        </li>
      ))}
      {isContentShowing && (
        <div>
          {contentType === 'message' && (
            <>
              <p>From: {content.from}</p>
              <p>To: {content.to}</p>
            </>
          )}
          <p>{content.date}</p>
          <p>{content.message}</p>
        </div>
      )}
      <button
        onClick={() => {
          setIsContentShowing(false);
          setActiveFile(null);
        }}
      >
        Hide Messages
      </button>
    </div>
  );
};

export default FileViewer;
