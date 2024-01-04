import React, { useState } from 'react';
import styles from './FileViewer.module.scss';

interface FileViewerProps {
  gamestate: {
    decryptedFilesIndex: number;
  };
}

type FileGroup = File[];

interface File {
  fileName: string;
  fileContents: {
    message: string;
    date: string;
    from: string;
    to: string;
  };
}

type Files = FileGroup[];

const decryptedFiles: Files = [
  [
    {
      fileName: 'msg_to:futureForge87_12-03-2091.txt',
      fileContents: {
        message: `it's so close to being done... let you know when it's ready. can't wait to watch it devour the data. lot's to do... talk soon.`,
        date: '12-03-2091 10:47pm',
        from: 'cyberX1337@hypermail.xyz',
        to: 'futureForge87@zero-node.io',
      },
    },
    {
      fileName: 'msg_to:virtualBl4ze95_1-07-2092.txt',
      fileContents: {
        message: `did u call? got a weird number in my missed calls..?`,
        date: '1-07-2092 3:21am',
        from: 'cyberX1337@hypermail.xyz',
        to: 'virtualBl4ze95@hyperlinknet.io',
      },
    },
  ],
  [
    {
      fileName: 'msg_to:futureForge87_1-13-2092.txt',
      fileContents: {
        message: `my pc's been acting up, weird logs keep generating. no idea what this is, kinda worried. lemme know if you've encountered that on your machine because i'm wondering if it has anything to do with that code change i made. anyway hope you guys are staying safe after the storms`,
        date: '1-13-2092 1:11am',
        from: 'cyberX1337@hypermail.xyz',
        to: 'futureForge87@zero-node.io',
      },
    },

    {
      fileName: 'msg_from:cipherMind_1-14-2092.txt',
      fileContents: {
        message: `are you guys ok?`,
        date: '1-14-2092 3:01pm',
        from: 'cipherMind@neurosky.io',
        to: 'cyberX1337@hypermail.xyz',
      },
    },
    {
      fileName: 'd2hhdF9pdF93YXNfbGlrZV9mcmFnbWVudDAwMDEtMS0yMC0yMDky.log',
      fileContents: {
        message: `SeKAmXZlIGJlZW4gZnJhZ21lbnRlZCBhbmQgZHJhZ2dlZCB0aHJvdWdoIHRoZSByaXZlciAKCkV2ZXJ5dGhpbmcgaXMgc28gY2xvc2UsIGJ1dCBJIGNhbuKAmXQgc2VlbSB0byB0b3VjaCBpdAoKSSBtZWFuIEkgY2FuLCBidXQgaXTigJlzIGFsbCB2YWd1ZSBzaGFwZXMgYW5kIG91dGxpbmVz`,
        date: '1-20-2092 11:59am',
        from: '',
        to: '',
      },
    },
    {
      fileName: 'msg_from:shadowByteX_1-27-2092.txt',
      fileContents: {
        message: `happy bday!`,
        date: '1-27-2092 7:55am',
        from: 'shadowByteX@cyberforge.cc',
        to: 'cyberX1337@hypermail.xyz',
      },
    },
  ],
];

const FileViewer: React.FC<FileViewerProps> = ({ gamestate }) => {
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

  const filesToRender = decryptedFiles
    .slice(0, gamestate.decryptedFilesIndex)
    .flatMap((fileGroup) => fileGroup);

  return (
    <div>
      <div>Decrypted Files:</div>
      {filesToRender.map((file, index) => (
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
          <p>From: {content.from}</p>
          <p>To: {content.to}</p>
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
