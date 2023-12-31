import { HiHashtag } from '@react-icons/all-files/hi/HiHashtag';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Like from '@/app/_components/card/Like';
import Memorize from '@/app/_components/card/Memorize';
import User from '@/app/_components/card/User';
import Setting from '@/app/_components/Setting';
import { useTag } from '@/hook/useTag';
import { Init } from '@/redux/features/cardSlice';
import { tag_change } from '@/redux/features/tagSlice';
import { useAppDispatch } from '@/redux/hook';
import styles from '@/styles/CardDetail.module.css';
import { CardType, TagType } from '@/types/word_blog';

export default function Word({ item }: { item: CardType }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, error, tags, hasMore } = useTag(item.tag, 'one') as {
    loading: boolean;
    error: boolean;
    tags: TagType[];
    hasMore: boolean;
  };

  const Delete = async () => {
    try {
      await axios
        .delete(`/api/card`, { params: { id: item._id, author: item.author } })
        .then(res => {
          if (res.data.delete) {
            router.push('/');
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.card_container}>
      <div className={styles.card_profile}>
        <User
          id={item.author}
          date={item.updateDate ? item.updateDate : item.date}
        />
      </div>
      <div
        className={styles.card_tag}
        onClick={() => {
          dispatch(Init());
          dispatch(tag_change({ id: tags[0]._id, name: tags[0].name }));
          router.push('/');
        }}
      >
        {hasMore && !loading && !error && (
          <>
            <HiHashtag />
            <span>{tags[0].name}</span>
          </>
        )}
      </div>
      <div className={styles.card_info}>
        <div className={styles.card_info_inner}>
          {item.image === 'default' ? null : (
            <div className={styles.card_image_pic}>
              <Image
                src={item.image}
                alt={item.image}
                width={1000}
                height={1000}
                className={styles.card_image}
              />
            </div>
          )}

          <div className={styles.card_word}>
            <div>{item.word}</div>
            <div>{item.meaning}</div>
            <div>{item.sentence}</div>
          </div>

          <div className={`${styles.card_like} markdown`}>
            <Memorize
              memorize={item.memorize}
              id={item._id}
              author={item.author}
            />
            <div>
              <Like id={item._id} />
            </div>
          </div>
        </div>

        <Setting
          id={item._id}
          state={'card'}
          Delete={Delete}
          author={item.author}
        />
      </div>
    </div>
  );
}
