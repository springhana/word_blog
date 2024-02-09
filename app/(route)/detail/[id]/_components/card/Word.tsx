import { HiHashtag } from '@react-icons/all-files/hi/HiHashtag';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

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

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/card`, {
        params: { id: item._id, author: item.author },
      });
    },
    onSuccess: () => {
      router.push('/');
      toast.success('카드 삭제 성공');

      queryClient.invalidateQueries({ queryKey: [`card-detail-${item._id}`] });
    },
    onError: () => {
      toast.error('카드 에러');
    },
  });

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
                layout="responsive"
                width={1000}
                height={1000}
                className={styles.card_image}
              />
            </div>
          )}

          <div className={styles.card_word}>
            <div>단어: {item.word}</div>
            <div>뜻: {item.meaning}</div>
            <div>어휘: {item.sentence}</div>
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
          Delete={() => {
            mutate();
          }}
          author={item.author}
        />
      </div>
    </div>
  );
}
