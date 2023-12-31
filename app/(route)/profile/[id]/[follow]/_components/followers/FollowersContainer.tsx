import { useEffect } from 'react';

import User from '@/app/_components/card/User';
import { useSubscribe } from '@/hook/useSubscribe';
import { setTitle } from '@/redux/features/headerSlice';
import { useAppDispatch } from '@/redux/hook';
import styles from '@/styles/Profile.module.css';
import { SubscribeType } from '@/types/word_blog';

import FollowersBtn from './FollowersBtn';

export default function FollowersContainer({ id }: { id: string }) {
  const dispatch = useAppDispatch();

  const { loading, error, subscribe, hasMore } = useSubscribe(id, 'user') as {
    loading: boolean;
    error: boolean;
    subscribe: SubscribeType[];
    hasMore: boolean;
  };

  useEffect(() => {
    dispatch(setTitle('followers'));
  }, []);

  return (
    <div className={styles.follow}>
      {!loading && !error && hasMore && subscribe
        ? subscribe.map((item, index) => (
            <div key={index} className={styles.follow_item}>
              <User id={item._id} />
              <FollowersBtn id={id} userId={item._id} />
            </div>
          ))
        : null}
    </div>
  );
}
