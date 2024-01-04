import { useState } from 'react';
import styles from './FileViewer.module.scss';

interface FileViewerProps {
  gamestate: {
    filesIndex: number;
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
  fileType: string;
}

type Files = FileGroup[];

const allFiles: Files = [
  [
    {
      fileName: 'msg_to:futureForge87_12-03-2091.txt',
      fileContents: {
        message: `it's so close to being done... let you know when it's ready. can't wait to watch it devour the data. lots to do... talk soon.`,
        date: '12-03-2091 10:47pm',
        from: 'cyberX1337@hypermail.xyz',
        to: 'futureForge87@zero-node.io',
      },
      fileType: 'message',
    },
    {
      fileName: 'msg_to:virtualBl4ze95_1-07-2092.txt',
      fileContents: {
        message: `did u call? got a weird number in my missed calls..?`,
        date: '1-07-2092 3:21am',
        from: 'cyberX1337@hypermail.xyz',
        to: 'virtualBl4ze95@hyperlinknet.io',
      },
      fileType: 'message',
    },
  ],
  [
    {
      fileName: 'ZnJhZ21lbnQwMV9zaDRwM3MtMS0xMi0yMDky.log',
      fileContents: {
        message: `SeKAmXZlIGJlZW4gZnJhZ21lbnRlZCBhbmQgZHJhZ2dlZCB0aHJvdWdoIHRoZSByaXZlciAKCkV2ZXJ5dGhpbmcgaXMgc28gY2xvc2UsIGJ1dCBJIGNhbuKAmXQgc2VlbSB0byB0b3VjaCBpdAoKSSBtZWFuIEkgY2FuLCBidXQgaXTigJlzIGFsbCB2YWd1ZSBzaGFwZXMgYW5kIG91dGxpbmVz`,
        date: '1-12-2092 1:59am',
        from: '',
        to: '',
      },
      fileType: 'log',
    },
  ],
  [
    {
      fileName: 'note2self_1-12-92.txt',
      fileContents: {
        message: `gm - make sure to add integration algorithms... system slow to start
        bandwidth runs low frequently, trying to optimize - look into different processes. for now it's a manual replenishment. processing cores important
        oh yeah... DRINK SOME WATER
        & don't forget to brush ur teeth!!!
        
        -cx1`,
        date: '1-12-2092 8:04am',
        from: '',
        to: '',
      },
      fileType: 'note',
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
      fileType: 'message',
    },

    {
      fileName: 'msg_from:cipherMind_1-14-2092.txt',
      fileContents: {
        message: `are you guys ok?`,
        date: '1-14-2092 3:01pm',
        from: 'cipherMind@neurosky.io',
        to: 'cyberX1337@hypermail.xyz',
      },
      fileType: 'message',
    },
    {
      fileName: 'msg_from:shadowByteX_1-27-2092.txt',
      fileContents: {
        message: `happy bday!`,
        date: '1-27-2092 7:55am',
        from: 'shadowByteX@cyberforge.cc',
        to: 'cyberX1337@hypermail.xyz',
      },
      fileType: 'message',
    },
  ],
  [
    {
      fileName: 'ZnJhZ21lbnQwMl96ZXIwcy1hbGwtdGhlLXdheS1kb3duLTItMi0yMDky.log',
      fileContents: {
        message: `WW91IGdhdmUgbWUgZXZlcnl0aGluZwoKVGhlbiB5b3Ugc3RvbGUgaXQgYmFjayBpbiBvbmUgZXhhc3BlcmF0ZWQgZ2FzcAoKTGlrZSBhIHRvcnJlbnQgemVyb2luZyBhbGwgb2YgZXhpc3RlbmNlIGluIGl0cyBzdGlsbG5lc3MKCkJlY29taW5nIGlzIGp1c3Qgc2xlaWdodCBvZiBoYW5k`,
        date: '2-2-2092 11:59am',
        from: '',
        to: '',
      },
      fileType: 'log',
    },
  ],
];

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
      <div>File Explorer:</div>
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
