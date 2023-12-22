'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import { useState } from 'react';

import memo from '@/public/image/memo/memo.png';
import memo_false from '@/public/image/memo/memo_false.png';
import { useAppSelector } from '@/redux/hook';
import styles from '@/styles/Card.module.css';

export default function Memorize({
  memorize,
  id,
  author,
}: {
  memorize: boolean;
  id: string | ObjectId;
  author: string;
}) {
  const [memori, setMemori] = useState(memorize);
  const _id = useAppSelector(state => state.idReducer.id);
  const MemorizeEvent = async () => {
    if (author === _id) {
      try {
        await axios.put('/api/update/memorize', { id: id }).then(res => {
          if (res.data.update) {
            setMemori(res.data.memorize);
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div onClick={MemorizeEvent} className={styles.memo}>
      {memori ? (
        <>
          <Image
            src={memo}
            alt="memo"
            width={10000}
            height={10000}
            className={styles.memo_image}
          />
          <span>외웠어요</span>
        </>
      ) : (
        <>
          <Image
            src={memo_false}
            alt="memo_flase"
            width={10000}
            height={10000}
            className={styles.memo_image}
          />
          <span>못외웠어요</span>
        </>
      )}
    </div>
  );
}
