import React, { useState } from 'react';
import styles from './FileViewer.module.scss';

interface FileViewerProps {}

type Files = File[];

interface File {
  fileName: string;
  fileContents: {
    message: string;
    date: string;
    from: string;
    to: string;
  };
}

const decryptedFiles: Files = [
  {
    fileName: 'email_to:futureForge87_12-03-2091.txt',
    fileContents: {
      message: `it's so close to being done... let you know when it's ready. can't wait to watch it process the data. lot's to do... talk soon.`,
      date: '12-03-2091',
      from: 'cyberX1337@hypermail.xyz',
      to: 'futureForge87@zero-node.io',
    },
  },
  {
    fileName: 'email_to:virtualBl4ze95_1-07-2091.txt',
    fileContents: {
      message: `did u call? got a weird number in my missed calls..?`,
      date: '1-07-2092',
      from: 'cyberX1337@hypermail.xyz',
      to: 'virtualBl4ze95@hyperlinknet.io',
    },
  },
];

const FileViewer: React.FC<FileViewerProps> = () => {
  const [isContentShowing, setIsContentShowing] = useState(false);
  const [activeFile, setActiveFile] = useState<number | null>(null);
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
  ) => {
    setIsContentShowing(true);
    setActiveFile(index);
    setContent(contents);
  };

  return (
    <div>
      <div>Decrypted Files:</div>
      {decryptedFiles.map((file, index) => (
        <li
          className={`${styles['message-title']} ${
            activeFile === index ? styles['message-title-active'] : ''
          }`}
          onClick={() => showMessage(file.fileContents, index)}
          key={index}
        >
          {file.fileName}
        </li>
      ))}
      {isContentShowing && (
        <div>
          <h2>Content:</h2>
          <p>From: {content.from}</p>
          <p>To: {content.to}</p>
          <p>Date: {content.date}</p>
          <p>Message: {content.message}</p>
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
